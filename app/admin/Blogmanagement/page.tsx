
'use client';

import { useEffect, useState, useRef } from 'react';
import {
  collection, addDoc, getDocs, doc, updateDoc, deleteDoc,
  serverTimestamp, query, orderBy, Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase'; // ← your existing firebase.ts / firebase.js

// ── Types ─────────────────────────────────────────────────────────────────────
export interface Blog {
  id:         string;
  title:      string;
  slug:       string;
  excerpt:    string;
  content:    string;
  coverImage: string;
  category:   string;
  tags:       string[];
  author:     string;
  readTime:   number;
  enabled:    boolean;
  featured:   boolean;
  metaTitle:  string;
  metaDesc:   string;
  createdAt:  Timestamp | null;
  updatedAt:  Timestamp | null;
}

type BlogForm = Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>;

const CATEGORIES = [
  'Digital Marketing','SEO','Content Marketing',
  'Social Media','Paid Ads','Analytics','Branding','Technology',
];

const EMPTY: BlogForm = {
  title:'', slug:'', excerpt:'', content:'', coverImage:'',
  category: CATEGORIES[0], tags:[], author:'', readTime:5,
  enabled:false, featured:false, metaTitle:'', metaDesc:'',
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const toSlug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');

const fmtDate = (ts: Timestamp | null) =>
  ts ? new Date(ts.seconds*1000).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : '—';

// ═════════════════════════════════════════════════════════════════════════════
export default function BlogManagement() {
  const [blogs,          setBlogs]          = useState<Blog[]>([]);
  const [loading,        setLoading]        = useState(true);
  const [saving,         setSaving]         = useState(false);
  const [showForm,       setShowForm]       = useState(false);
  const [editId,         setEditId]         = useState<string|null>(null);
  const [form,           setForm]           = useState<BlogForm>(EMPTY);
  const [tagInput,       setTagInput]       = useState('');
  const [imgError,       setImgError]       = useState(false);
  const [toast,          setToast]          = useState<{msg:string;ok:boolean}|null>(null);
  const [search,         setSearch]         = useState('');
  const [filterCat,      setFilterCat]      = useState('All');
  const [deleteConfirm,  setDeleteConfirm]  = useState<string|null>(null);
  const [deleting,       setDeleting]       = useState<string|null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // ── Fetch once on mount ─────────────────────────────────────────────────────
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db,'blogs'), orderBy('createdAt','desc')));
      setBlogs(snap.docs.map(d => ({id:d.id, ...d.data()} as Blog)));
    } catch { showToast('Failed to load blogs', false); }
    finally   { setLoading(false); }
  };
  useEffect(()=>{ fetchBlogs(); },[]);

  // ── Toast ───────────────────────────────────────────────────────────────────
  const showToast = (msg:string, ok=true) => {
    setToast({msg,ok});
    setTimeout(()=>setToast(null), 3200);
  };

  // ── Open form ───────────────────────────────────────────────────────────────
  const openCreate = () => {
    setEditId(null); setForm(EMPTY); setTagInput(''); setImgError(false); setShowForm(true);
    setTimeout(()=>formRef.current?.scrollIntoView({behavior:'smooth',block:'start'}),80);
  };
  const openEdit = (b:Blog) => {
    setEditId(b.id);
    setForm({title:b.title,slug:b.slug,excerpt:b.excerpt,content:b.content,
      coverImage:b.coverImage,category:b.category,tags:b.tags,author:b.author,
      readTime:b.readTime,enabled:b.enabled,featured:b.featured,
      metaTitle:b.metaTitle,metaDesc:b.metaDesc});
    setTagInput(''); setImgError(false); setShowForm(true);
    setTimeout(()=>formRef.current?.scrollIntoView({behavior:'smooth',block:'start'}),80);
  };

  // ── Field helpers ───────────────────────────────────────────────────────────
  const setF = (k:keyof BlogForm, v:unknown) => setForm(f=>({...f,[k]:v}));
  const onTitle = (v:string) => setForm(f=>({...f,title:v,slug:toSlug(v)}));
  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !form.tags.includes(t)) setF('tags',[...form.tags,t]);
    setTagInput('');
  };
  const removeTag = (t:string) => setF('tags', form.tags.filter(x=>x!==t));

  // ── Save — optimistic (UI updates instantly, Firestore writes in background) ─
  const handleSave = async () => {
    if (!form.title.trim()||!form.excerpt.trim()||!form.content.trim()||!form.author.trim()) {
      showToast('Please fill all required fields', false); return;
    }

    const merged:BlogForm = {
      ...form,
      metaTitle: form.metaTitle||form.title,
      metaDesc:  form.metaDesc||form.excerpt,
    };
    const now = Timestamp.now();

    setSaving(true);
    setShowForm(false); // close form immediately — feels instant

    if (editId) {
      // 1. Update UI right away
      setBlogs(prev => prev.map(b =>
        b.id===editId ? {...b,...merged,updatedAt:now} : b
      ));
      showToast('Blog updated ✓');
      setSaving(false);
      // 2. Write to Firestore silently in the background
      updateDoc(doc(db,'blogs',editId), {...merged, updatedAt:serverTimestamp()})
        .catch(()=>showToast('Sync failed — please refresh','false' as unknown as boolean));

    } else {
      // 1. Prepend optimistic row with temp id
      const tempId = `_tmp_${Date.now()}`;
      const optimistic:Blog = {...merged, id:tempId, createdAt:now, updatedAt:now};
      setBlogs(prev=>[optimistic,...prev]);
      showToast('Blog created ✓');
      setSaving(false);
      // 2. Write to Firestore and swap temp id → real id
      addDoc(collection(db,'blogs'), {...merged, createdAt:serverTimestamp(), updatedAt:serverTimestamp()})
        .then(ref => setBlogs(prev=>prev.map(b=>b.id===tempId ? {...b,id:ref.id} : b)))
        .catch(()=>{
          setBlogs(prev=>prev.filter(b=>b.id!==tempId)); // rollback
          showToast('Save failed — please try again', false);
        });
    }
  };

  // ── Toggle enabled (optimistic) ─────────────────────────────────────────────
  const toggleEnabled = (b:Blog) => {
    const next = !b.enabled;
    setBlogs(prev=>prev.map(x=>x.id===b.id ? {...x,enabled:next} : x));
    showToast(next ? 'Blog is now live ✓' : 'Blog hidden from homepage');
    updateDoc(doc(db,'blogs',b.id),{enabled:next,updatedAt:serverTimestamp()})
      .catch(()=>{
        setBlogs(prev=>prev.map(x=>x.id===b.id ? {...x,enabled:b.enabled} : x)); // rollback
        showToast('Toggle failed', false);
      });
  };

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = async (id:string) => {
    setDeleting(id);
    setBlogs(prev=>prev.filter(b=>b.id!==id)); // optimistic remove
    setDeleteConfirm(null);
    try {
      await deleteDoc(doc(db,'blogs',id));
      showToast('Blog deleted');
    } catch {
      fetchBlogs(); // refetch to restore on failure
      showToast('Delete failed', false);
    } finally { setDeleting(null); }
  };

  // ── Filtered list ───────────────────────────────────────────────────────────
  const filtered = blogs.filter(b => {
    const q = search.toLowerCase();
    return (b.title.toLowerCase().includes(q)||b.author.toLowerCase().includes(q))
      && (filterCat==='All'||b.category===filterCat);
  });

  const stats = {
    total:    blogs.length,
    live:     blogs.filter(b=>b.enabled).length,
    draft:    blogs.filter(b=>!b.enabled).length,
    featured: blogs.filter(b=>b.featured).length,
  };

  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <>
      <style>{`
       
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{background:linear-gradient(160deg,#EEF3FC 0%,#F5F8FF 50%,#EBF0FA 100%);min-height:100vh;color:#0D1B3E}
        .bm{max-width:1200px;margin:0 auto;padding:40px 24px 80px;position:relative}
        .bm::before{content:'';position:fixed;inset:0;z-index:-1;background-image:linear-gradient(rgba(35,82,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(35,82,255,.04) 1px,transparent 1px);background-size:60px 60px}

        /* Stats */
        .sg{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:32px}
        @media(max-width:700px){.sg{grid-template-columns:repeat(2,1fr)}}
        .sc{background:#fff;border:1.5px solid #E4ECF7;border-radius:20px;padding:20px 22px;box-shadow:0 2px 12px rgba(35,82,255,.06)}
        .sn{font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;line-height:1}
        .sl{font-size:.76rem;color:#9AA5B4;font-weight:600;margin-top:6px;text-transform:uppercase;letter-spacing:.06em}

        /* Buttons */
        .btn-p{background:linear-gradient(135deg,#2352FF,#1a3fd4);color:#fff;border:none;border-radius:40px;padding:11px 26px;font-family:'Manrope',sans-serif;font-weight:700;font-size:.9rem;cursor:pointer;display:flex;align-items:center;gap:7px;box-shadow:0 4px 16px rgba(35,82,255,.25);transition:all .2s;white-space:nowrap}
        .btn-p:hover{transform:scale(1.04);box-shadow:0 8px 24px rgba(35,82,255,.35)}
        .btn-p:disabled{opacity:.6;cursor:not-allowed;transform:none}
        .btn-o{background:transparent;color:#2352FF;border:2px solid #2352FF;border-radius:14px;padding:9px 18px;font-family:'Manrope',sans-serif;font-weight:600;font-size:.88rem;cursor:pointer;transition:all .2s}
        .btn-o:hover{background:#2352FF;color:#fff}

        /* Toolbar */
        .tb{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:24px}
        .sb{flex:1;min-width:220px;border:1.5px solid #E4ECF7;border-radius:40px;padding:10px 18px;font-family:'Manrope',sans-serif;font-size:.88rem;color:#0D1B3E;background:#fff;outline:none;transition:border-color .2s}
        .sb:focus{border-color:#2352FF}
        .fs{border:1.5px solid #E4ECF7;border-radius:40px;padding:10px 16px;font-family:'Manrope',sans-serif;font-size:.88rem;color:#0D1B3E;background:#fff;outline:none;cursor:pointer}

        /* Table */
        .tw{background:#fff;border:1.5px solid #E4ECF7;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(35,82,255,.07)}
        .bt{width:100%;border-collapse:collapse}
        .bt th{text-align:left;padding:14px 20px;font-size:.72rem;color:#9AA5B4;font-weight:700;letter-spacing:.08em;text-transform:uppercase;background:#F8FAFF;border-bottom:1px solid #E4ECF7}
        .bt td{padding:16px 20px;border-bottom:1px solid #F0F4FB;vertical-align:middle;font-size:.88rem}
        .bt tr:last-child td{border-bottom:none}
        .bt tr:hover td{background:#F8FAFF}

        .ct{width:56px;height:40px;border-radius:10px;object-fit:cover;border:1px solid #E4ECF7}
        .cp{width:56px;height:40px;border-radius:10px;background:linear-gradient(135deg,#EEF3FC,#dce6fa);border:1px solid #E4ECF7;display:flex;align-items:center;justify-content:center;font-size:18px}

        .badge{display:inline-flex;align-items:center;gap:4px;border-radius:20px;padding:3px 10px;font-size:.72rem;font-weight:700;letter-spacing:.04em}
        .bl{background:#E8F9F0;color:#1A8C4E}
        .bd{background:#F1F3F5;color:#9AA5B4}
        .bc{background:#EEF3FC;color:#2352FF}

        /* Toggle */
        .tgw{display:flex;align-items:center;gap:8px;cursor:pointer}
        .tg{width:42px;height:24px;border-radius:12px;border:none;cursor:pointer;position:relative;transition:background .25s;flex-shrink:0}
        .tg::after{content:'';position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:transform .25s;box-shadow:0 1px 4px rgba(0,0,0,.2)}
        .tg.on{background:#2352FF}
        .tg.off{background:#D1D9E6}
        .tg.on::after{transform:translateX(18px)}

        /* Form */
        .fo{background:#fff;border:1.5px solid #E4ECF7;border-radius:28px;padding:36px;margin-bottom:32px;box-shadow:0 8px 40px rgba(35,82,255,.10);animation:sd .35s ease}
        @keyframes sd{from{opacity:0;transform:translateY(-18px)}to{opacity:1;transform:translateY(0)}}
        .g2{display:grid;grid-template-columns:1fr 1fr;gap:18px}
        .g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px}
        @media(max-width:680px){.g2,.g3{grid-template-columns:1fr}}
        .fg{display:flex;flex-direction:column;gap:6px}
        .fl{font-size:.76rem;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:.06em}
        .fl span{color:#FF4F17}
        .fi,.fsl,.fta{border:1.5px solid #E4ECF7;border-radius:14px;padding:11px 16px;font-family:'Manrope',sans-serif;font-size:.9rem;color:#0D1B3E;background:#FAFBFF;outline:none;transition:border-color .2s,box-shadow .2s;width:100%}
        .fi:focus,.fsl:focus,.fta:focus{border-color:#2352FF;box-shadow:0 0 0 3px rgba(35,82,255,.08);background:#fff}
        .fta{resize:vertical;min-height:100px;line-height:1.7}
        .ip{width:100%;height:180px;border-radius:14px;object-fit:cover;border:1.5px solid #E4ECF7;margin-top:10px;background:#EEF3FC}
        .iph{width:100%;height:180px;border-radius:14px;border:2px dashed #C8D8F0;margin-top:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#9AA5B4;font-size:.82rem;font-weight:600;background:#F8FAFF}
        .tr{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
        .tc{display:flex;align-items:center;gap:5px;background:#EEF3FC;color:#2352FF;border-radius:20px;padding:4px 12px;font-size:.76rem;font-weight:700}
        .trm{background:none;border:none;color:#2352FF;cursor:pointer;font-size:14px;line-height:1;padding:0;opacity:.6}
        .trm:hover{opacity:1}
        .tf{display:flex;align-items:center;gap:12px;padding:14px 18px;background:#F8FAFF;border:1.5px solid #E4ECF7;border-radius:14px;cursor:pointer;transition:border-color .2s}
        .tf:hover{border-color:#2352FF}
        .sd{font-family:'Syne',sans-serif;font-size:.78rem;font-weight:700;color:#9AA5B4;letter-spacing:.12em;text-transform:uppercase;margin:28px 0 16px;display:flex;align-items:center;gap:12px}
        .sd::after{content:'';flex:1;height:1px;background:#E4ECF7}

        /* Toast */
        .toast{position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:#0D1B3E;color:#fff;padding:13px 28px;border-radius:40px;font-size:.88rem;font-weight:600;z-index:9999;box-shadow:0 8px 32px rgba(13,27,62,.25);animation:ti .3s ease;white-space:nowrap}
        .toast.err{background:#C0392B}
        @keyframes ti{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

        /* Modal */
        .mb{position:fixed;inset:0;background:rgba(13,27,62,.35);backdrop-filter:blur(4px);z-index:900;display:flex;align-items:center;justify-content:center}
        .mb-box{background:#fff;border-radius:24px;padding:36px;max-width:400px;width:90%;box-shadow:0 20px 60px rgba(13,27,62,.2);text-align:center;animation:sd .25s ease}

        /* Empty */
        .es{text-align:center;padding:60px 20px;color:#9AA5B4}

        @keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}

        @media(max-width:860px){
          .bt thead{display:none}
          .bt tr{display:block;border-bottom:2px solid #E4ECF7;padding:16px}
          .bt td{display:flex;justify-content:space-between;align-items:center;border:none;padding:6px 0;font-size:.84rem}
          .bt td::before{content:attr(data-label);font-weight:700;color:#9AA5B4;font-size:.72rem;text-transform:uppercase;letter-spacing:.06em}
        }
      `}</style>

      <div className="bm">

        {/* ── Header ── */}
        <div style={{marginBottom:32}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16}}>
            <div>
              <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'#fff',border:'1.5px solid #E4ECF7',borderRadius:60,padding:'6px 16px 6px 10px',marginBottom:14,boxShadow:'0 2px 8px rgba(0,0,0,.05)'}}>
                <span style={{fontSize:14}}>📝</span>
                <span style={{fontSize:'.72rem',fontWeight:700,color:'#0D1B3E',letterSpacing:'.07em',textTransform:'uppercase'}}>Content Studio</span>
              </div>
              <h1 style={{fontFamily:'Syne,sans-serif',fontSize:'clamp(1.8rem,3vw,2.6rem)',fontWeight:800,color:'#0D1B3E',lineHeight:1.1,letterSpacing:'-.025em'}}>Blog Management</h1>
              <p style={{color:'#6B7280',fontSize:'.9rem',marginTop:6}}>Create, manage and publish blogs that appear on your homepage.</p>
            </div>
            <button className="btn-p" onClick={openCreate}><span style={{fontSize:18}}>+</span> Create Blog</button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="sg">
          {[
            {label:'Total Blogs',   num:stats.total,    icon:'📚',color:'#2352FF'},
            {label:'Live on Site',  num:stats.live,     icon:'🟢',color:'#1A8C4E'},
            {label:'Drafts',        num:stats.draft,    icon:'📋',color:'#9AA5B4'},
            {label:'Featured',      num:stats.featured, icon:'⭐',color:'#D97706'},
          ].map(s=>(
            <div className="sc" key={s.label}>
              <div style={{fontSize:24,marginBottom:10}}>{s.icon}</div>
              <div className="sn" style={{color:s.color}}>{s.num}</div>
              <div className="sl">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ════════════════════════════════ FORM ════════════════════════════════ */}
        {showForm && (
          <div className="fo" ref={formRef}>
            {/* Form header */}
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:28}}>
              <div>
                <h2 style={{fontFamily:'Syne,sans-serif',fontSize:'1.4rem',fontWeight:800,color:'#0D1B3E'}}>
                  {editId ? '✏️ Edit Blog' : '✨ Create New Blog'}
                </h2>
                <p style={{color:'#9AA5B4',fontSize:'.82rem',marginTop:4}}>
                  {editId ? 'Update the blog details below.' : 'Fill in the details to publish your blog post.'}
                </p>
              </div>
              <button onClick={()=>setShowForm(false)}
                style={{background:'#F1F3F5',color:'#6B7280',border:'none',borderRadius:30,padding:'8px 14px',fontFamily:'Manrope,sans-serif',fontWeight:700,fontSize:'1rem',cursor:'pointer'}}>✕</button>
            </div>

            {/* ─ Basic Info ─ */}
            <div className="sd">Basic Info</div>
            <div className="g2" style={{marginBottom:18}}>
              <div className="fg">
                <label className="fl">Title <span>*</span></label>
                <input className="fi" placeholder="e.g. How to 10× Your ROI with Google Ads"
                  value={form.title} onChange={e=>onTitle(e.target.value)} />
              </div>
              <div className="fg">
                <label className="fl">Slug <span style={{color:'#9AA5B4',fontWeight:400,textTransform:'none',fontSize:'.7rem'}}>(auto-generated)</span></label>
                <input className="fi" value={form.slug} onChange={e=>setF('slug',e.target.value)}
                  style={{fontFamily:'monospace',fontSize:'.84rem',color:'#2352FF'}} />
              </div>
            </div>
            <div className="g3" style={{marginBottom:18}}>
              <div className="fg">
                <label className="fl">Author <span>*</span></label>
                <input className="fi" placeholder="e.g. Rohit Sharma" value={form.author} onChange={e=>setF('author',e.target.value)} />
              </div>
              <div className="fg">
                <label className="fl">Category</label>
                <select className="fsl" value={form.category} onChange={e=>setF('category',e.target.value)}>
                  {CATEGORIES.map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="fg">
                <label className="fl">Read Time (mins)</label>
                <input className="fi" type="number" min={1} max={60} value={form.readTime} onChange={e=>setF('readTime',Number(e.target.value))} />
              </div>
            </div>
            <div className="fg" style={{marginBottom:18}}>
              <label className="fl">Excerpt / Summary <span>*</span></label>
              <textarea className="fta" rows={3} placeholder="A compelling 1–2 line summary shown on the blog card…"
                value={form.excerpt} onChange={e=>setF('excerpt',e.target.value)} />
              <span style={{fontSize:'.72rem',color:'#9AA5B4',textAlign:'right'}}>{form.excerpt.length} / 200 recommended</span>
            </div>

            {/* ─ Cover Image ─ */}
            <div className="sd">Cover Image</div>
            <div className="fg" style={{marginBottom:18}}>
              <label className="fl">Image URL</label>
              <input className="fi" placeholder="https://images.unsplash.com/…" value={form.coverImage}
                onChange={e=>{ setF('coverImage',e.target.value); setImgError(false); }} />
              {form.coverImage && !imgError
                ? <img src={form.coverImage} className="ip" alt="preview" onError={()=>setImgError(true)} />
                : form.coverImage && imgError
                  ? <div className="iph" style={{borderColor:'#FFC9C9',background:'#FFF5F5'}}><span style={{fontSize:28}}>⚠️</span><span style={{color:'#C0392B'}}>Could not load image — check the URL.</span></div>
                  : <div className="iph"><span style={{fontSize:32}}>🖼️</span><span>Paste a URL above to preview</span><span style={{fontSize:'.72rem',color:'#C8D8F0'}}>Recommended: 1200 × 630 px</span></div>
              }
            </div>

            {/* ─ Content ─ */}
            <div className="sd">Content</div>
            <div className="fg" style={{marginBottom:18}}>
              <label className="fl">Blog Content <span>*</span></label>
              <textarea className="fta" rows={10} placeholder="Write your full blog content here. Markdown supported."
                value={form.content} onChange={e=>setF('content',e.target.value)}
                style={{minHeight:220,fontFamily:'monospace',fontSize:'.88rem',lineHeight:1.8}} />
            </div>

            {/* ─ Tags ─ */}
            <div className="sd">Tags</div>
            <div className="fg" style={{marginBottom:18}}>
              <label className="fl">Add Tags</label>
              <div style={{display:'flex',gap:10}}>
                <input className="fi" placeholder="e.g. seo, google-ads  — press Enter or click Add"
                  value={tagInput} onChange={e=>setTagInput(e.target.value)}
                  onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();addTag()}}}
                  style={{flex:1}} />
                <button className="btn-o" onClick={addTag}>+ Add</button>
              </div>
              {form.tags.length>0 && (
                <div className="tr">
                  {form.tags.map(t=>(
                    <span className="tc" key={t}>#{t}<button className="trm" onClick={()=>removeTag(t)}>×</button></span>
                  ))}
                </div>
              )}
            </div>

            {/* ─ SEO ─ */}
            <div className="sd">SEO Settings</div>
            <div className="g2" style={{marginBottom:18}}>
              <div className="fg">
                <label className="fl">Meta Title <span style={{color:'#9AA5B4',fontWeight:400,textTransform:'none',fontSize:'.7rem'}}>(defaults to title)</span></label>
                <input className="fi" placeholder="SEO-optimised title…" value={form.metaTitle} onChange={e=>setF('metaTitle',e.target.value)} />
              </div>
              <div className="fg">
                <label className="fl">Meta Description <span style={{color:'#9AA5B4',fontWeight:400,textTransform:'none',fontSize:'.7rem'}}>(defaults to excerpt)</span></label>
                <input className="fi" placeholder="Short description for search engines…" value={form.metaDesc} onChange={e=>setF('metaDesc',e.target.value)} />
              </div>
            </div>

            {/* ─ Visibility ─ */}
            <div className="sd">Visibility &amp; Publishing</div>
            <div className="g2" style={{marginBottom:28}}>
              <div className="tf" onClick={()=>setF('enabled',!form.enabled)}>
                <button className={`tg ${form.enabled?'on':'off'}`} onClick={e=>{e.stopPropagation();setF('enabled',!form.enabled)}} />
                <div>
                  <div style={{fontSize:'.88rem',fontWeight:700,color:'#0D1B3E'}}>Publish to Homepage</div>
                  <div style={{fontSize:'.76rem',color:'#9AA5B4',marginTop:2}}>{form.enabled?'Visible on the site.':'Saved as draft — hidden.'}</div>
                </div>
              </div>
              <div className="tf" onClick={()=>setF('featured',!form.featured)}>
                <button className={`tg ${form.featured?'on':'off'}`} onClick={e=>{e.stopPropagation();setF('featured',!form.featured)}} />
                <div>
                  <div style={{fontSize:'.88rem',fontWeight:700,color:'#0D1B3E'}}>⭐ Featured Post</div>
                  <div style={{fontSize:'.76rem',color:'#9AA5B4',marginTop:2}}>{form.featured?'Highlighted at top.':'Standard listing.'}</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{display:'flex',gap:12,justifyContent:'flex-end',flexWrap:'wrap'}}>
              <button onClick={()=>setShowForm(false)}
                style={{background:'#F1F3F5',color:'#6B7280',border:'none',borderRadius:40,padding:'11px 24px',fontFamily:'Manrope,sans-serif',fontWeight:700,fontSize:'.9rem',cursor:'pointer'}}>
                Cancel
              </button>
              <button className="btn-p" onClick={handleSave} disabled={saving}>
                {saving ? '⏳ Saving…' : editId ? '💾 Update Blog' : '🚀 Publish Blog'}
              </button>
            </div>
          </div>
        )}

        {/* ── Toolbar ── */}
        <div className="tb">
          <input className="sb" placeholder="🔍  Search by title or author…" value={search} onChange={e=>setSearch(e.target.value)} />
          <select className="fs" value={filterCat} onChange={e=>setFilterCat(e.target.value)}>
            <option>All</option>
            {CATEGORIES.map(c=><option key={c}>{c}</option>)}
          </select>
          <span style={{fontSize:'.8rem',color:'#9AA5B4',whiteSpace:'nowrap'}}>{filtered.length} / {blogs.length}</span>
        </div>

        {/* ═══════════════════════════════ TABLE ═══════════════════════════════ */}
        <div className="tw">
          {loading ? (
            <div style={{padding:'60px 20px',textAlign:'center',color:'#9AA5B4'}}>
              <div style={{fontSize:36,marginBottom:12,animation:'fl 1.5s ease-in-out infinite'}}>⏳</div>
              <div style={{fontWeight:600}}>Loading blogs…</div>
            </div>
          ) : filtered.length===0 ? (
            <div className="es">
              <div style={{fontSize:52,marginBottom:16}}>📭</div>
              <div style={{fontFamily:'Syne,sans-serif',fontSize:'1.2rem',fontWeight:700,color:'#0D1B3E',marginBottom:8}}>{search?'No results found':'No blogs yet'}</div>
              <p style={{fontSize:'.85rem',maxWidth:300,margin:'0 auto 20px'}}>{search?'Try a different search or category.':'Click "Create Blog" to write your first post.'}</p>
              {!search && <button className="btn-p" onClick={openCreate}>+ Create Blog</button>}
            </div>
          ) : (
            <table className="bt">
              <thead>
                <tr>
                  <th>Cover</th><th>Title &amp; Tags</th><th>Category</th>
                  <th>Author</th><th>Status</th><th>Live on Site</th>
                  <th>Created</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(b=>(
                  <tr key={b.id}>
                    {/* Cover */}
                    <td data-label="Cover">
                      {b.coverImage
                        ? <img src={b.coverImage} className="ct" alt="" onError={e=>{(e.target as HTMLImageElement).style.display='none'}} />
                        : <div className="cp">🖼️</div>}
                    </td>

                    {/* Title */}
                    <td data-label="Title">
                      <div style={{maxWidth:260}}>
                        <div style={{fontWeight:700,color:'#0D1B3E',fontSize:'.9rem',marginBottom:3,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                          {b.featured && <span style={{marginRight:5}}>⭐</span>}{b.title}
                        </div>
                        <div style={{fontSize:'.72rem',color:'#9AA5B4',fontFamily:'monospace'}}>/{b.slug}</div>
                        <div style={{display:'flex',gap:5,flexWrap:'wrap',marginTop:5}}>
                          {b.tags.slice(0,3).map(t=>(
                            <span key={t} style={{background:'#EEF3FC',color:'#2352FF',borderRadius:20,padding:'2px 8px',fontSize:'.68rem',fontWeight:700}}>#{t}</span>
                          ))}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td data-label="Category"><span className="badge bc">{b.category}</span></td>

                    {/* Author */}
                    <td data-label="Author">
                      <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <div style={{width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,#2352FF,#1a3fd4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.72rem',color:'#fff',fontWeight:700,flexShrink:0}}>
                          {b.author.charAt(0).toUpperCase()}
                        </div>
                        <span style={{fontWeight:600,color:'#0D1B3E',fontSize:'.85rem'}}>{b.author}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td data-label="Status">
                      {b.enabled ? <span className="badge bl">● Live</span> : <span className="badge bd">○ Draft</span>}
                    </td>

                    {/* Toggle */}
                    <td data-label="Live on Site">
                      <div className="tgw" onClick={()=>toggleEnabled(b)}>
                        <button className={`tg ${b.enabled?'on':'off'}`} />
                        <span style={{fontSize:'.8rem',color:b.enabled?'#1A8C4E':'#9AA5B4',fontWeight:600}}>
                          {b.enabled?'Visible':'Hidden'}
                        </span>
                      </div>
                    </td>

                    {/* Date */}
                    <td data-label="Created" style={{color:'#9AA5B4',fontSize:'.8rem',whiteSpace:'nowrap'}}>{fmtDate(b.createdAt)}</td>

                    {/* Actions */}
                    <td data-label="Actions">
                      <div style={{display:'flex',gap:8}}>
                        <button onClick={()=>openEdit(b)}
                          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#2352FF';(e.currentTarget as HTMLElement).style.color='#fff'}}
                          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='#EEF3FC';(e.currentTarget as HTMLElement).style.color='#2352FF'}}
                          style={{background:'#EEF3FC',color:'#2352FF',border:'none',borderRadius:10,padding:'7px 14px',fontFamily:'Manrope,sans-serif',fontWeight:700,fontSize:'.8rem',cursor:'pointer',transition:'all .2s'}}>
                          ✏️ Edit
                        </button>
                        <button onClick={()=>setDeleteConfirm(b.id)} disabled={deleting===b.id}
                          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#FF4F17';(e.currentTarget as HTMLElement).style.color='#fff'}}
                          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='#FFF0ED';(e.currentTarget as HTMLElement).style.color='#FF4F17'}}
                          style={{background:'#FFF0ED',color:'#FF4F17',border:'none',borderRadius:10,padding:'7px 14px',fontFamily:'Manrope,sans-serif',fontWeight:700,fontSize:'.8rem',cursor:'pointer',transition:'all .2s'}}>
                          {deleting===b.id?'…':'🗑️ Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ── Delete Confirm Modal ── */}
      {deleteConfirm && (
        <div className="mb" onClick={()=>setDeleteConfirm(null)}>
          <div className="mb-box" onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:48,marginBottom:16}}>🗑️</div>
            <h3 style={{fontFamily:'Syne,sans-serif',fontSize:'1.2rem',fontWeight:800,color:'#0D1B3E',marginBottom:10}}>Delete Blog?</h3>
            <p style={{fontSize:'.88rem',color:'#6B7280',marginBottom:28,lineHeight:1.6}}>
              This is <strong>permanent</strong> and cannot be undone.
            </p>
            <div style={{display:'flex',gap:12,justifyContent:'center'}}>
              <button onClick={()=>setDeleteConfirm(null)}
                style={{background:'#F1F3F5',color:'#6B7280',border:'none',borderRadius:40,padding:'11px 24px',fontFamily:'Manrope,sans-serif',fontWeight:700,fontSize:'.9rem',cursor:'pointer'}}>
                Cancel
              </button>
              <button onClick={()=>handleDelete(deleteConfirm)}
                style={{background:'#FF4F17',color:'#fff',border:'none',borderRadius:40,padding:'11px 26px',fontFamily:'Manrope,sans-serif',fontWeight:700,fontSize:'.9rem',cursor:'pointer',boxShadow:'0 4px 16px rgba(255,79,23,.3)'}}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className={`toast ${toast.ok?'':'err'}`}>
          {toast.ok?'✓ ':'⚠ '}{toast.msg}
        </div>
      )}
    </>
  );
}