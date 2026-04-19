



'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  collection, addDoc, getDocs, doc, updateDoc, deleteDoc,
  serverTimestamp, query, orderBy, Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

// ── Styles ────────────────────────────────────────────────────────────────────
const CSS = `
  *,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }

  :root {
    --primary: #2352FF;
    --primary-dark: #1a3fd4;
    --primary-soft: rgba(35,82,255,0.08);
    --primary-border: rgba(35,82,255,0.22);
    --accent: #FF4F17;
    --surface: #fff;
    --border: #E4ECF7;
    --bg: linear-gradient(160deg,#EEF3FC 0%,#F5F8FF 50%,#EBF0FA 100%);
    --text-dark: #0D1B3E;
    --text-muted: #6B7280;
    --text-hint: #9AA5B4;
    --green: #1A8C4E;
    --radius-card: 20px;
    --radius-btn: 40px;
    --radius-input: 14px;
  }

  /* ── Animations ── */
  @keyframes bm-spin    { to { transform: rotate(360deg); } }
  @keyframes bm-fadeUp  { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
  @keyframes bm-float   { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
  @keyframes bm-toast   { from { opacity:0; transform:translateX(-50%) translateY(20px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
  @keyframes bm-modal   { from { opacity:0; transform:translateY(24px) scale(0.96); } to { opacity:1; transform:translateY(0) scale(1); } }
  @keyframes bm-form    { from { opacity:0; transform:translateY(-14px); } to { opacity:1; transform:translateY(0); } }
  @keyframes bm-shimmer { 0% { background-position:-200% center; } 100% { background-position:200% center; } }
  @keyframes bm-pulse   { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.5; transform:scale(1.4); } }

  /* ── Layout ── */
  .bm-page { min-height:100vh; background:var(--bg); position:relative; overflow-x:hidden; }
  .bm-main  { max-width:1200px; margin:0 auto; padding:36px 24px 100px; position:relative; z-index:1; }

  /* ── Grid overlay ── */
  .bm-page::before {
    content:''; position:fixed; inset:0; z-index:0; pointer-events:none;
    background-image:
      linear-gradient(rgba(35,82,255,.04) 1px,transparent 1px),
      linear-gradient(90deg,rgba(35,82,255,.04) 1px,transparent 1px);
    background-size:60px 60px;
  }

  /* ── Header ── */
  .bm-header {
    position:sticky; top:0; z-index:100;
    background:rgba(245,248,255,0.88);
    backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);
    border-bottom:1px solid var(--border);
    height:64px;
    box-shadow:0 1px 0 var(--border);
  }
  .bm-header-inner {
    max-width:1200px; margin:0 auto;
    padding:0 24px; height:100%;
    display:flex; align-items:center; justify-content:space-between; gap:14px;
  }
  .bm-header-left  { display:flex; align-items:center; gap:12px; min-width:0; flex:1; }
  .bm-breadcrumb   { display:flex; align-items:center; gap:8px; }
  .bm-breadcrumb-short { display:none; font-family:'Syne',sans-serif; font-size:.85rem; font-weight:700; color:var(--text-dark); }
  .bm-back-label   { display:inline; }

  /* ── Stats grid ── */
  .bm-stats {
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:14px;
    margin-bottom:28px;
  }
  .bm-stat {
    background:var(--surface); border:1.5px solid var(--border); border-radius:var(--radius-card);
    padding:20px 20px; box-shadow:0 2px 12px rgba(35,82,255,.06);
    transition:transform .22s ease, box-shadow .22s ease;
  }
  .bm-stat:hover { transform:translateY(-3px); box-shadow:0 10px 28px rgba(35,82,255,.10); }
  .bm-stat-num { font-family:'Syne',sans-serif; font-size:1.9rem; font-weight:800; line-height:1; }
  .bm-stat-lbl { font-size:.7rem; color:var(--text-hint); font-weight:700; margin-top:6px; text-transform:uppercase; letter-spacing:.06em; }

  /* ── Buttons ── */
  .btn-p {
    background:linear-gradient(135deg,var(--primary),var(--primary-dark));
    color:#fff; border:none; border-radius:var(--radius-btn);
    padding:10px 22px; font-family:'Syne',sans-serif; font-weight:700; font-size:.88rem;
    cursor:pointer; display:flex; align-items:center; gap:7px;
    box-shadow:0 4px 16px rgba(35,82,255,.25);
    transition:all .2s; white-space:nowrap; flex-shrink:0;
  }
  .btn-p:hover:not(:disabled) { transform:scale(1.04); box-shadow:0 8px 24px rgba(35,82,255,.35); }
  .btn-p:disabled { opacity:.6; cursor:not-allowed; transform:none; }

  .btn-o {
    background:transparent; color:var(--primary); border:1.5px solid var(--primary);
    border-radius:14px; padding:9px 16px;
    font-family:'Syne',sans-serif; font-weight:700; font-size:.84rem;
    cursor:pointer; transition:all .2s; white-space:nowrap; flex-shrink:0;
  }
  .btn-o:hover { background:var(--primary); color:#fff; }

  .btn-ghost {
    background:#F1F3F5; color:var(--text-muted); border:none;
    border-radius:var(--radius-btn); padding:10px 22px;
    font-family:'Syne',sans-serif; font-weight:700; font-size:.88rem;
    cursor:pointer; transition:all .2s; white-space:nowrap;
  }
  .btn-ghost:hover { background:#E4ECF7; }

  /* ── Toolbar ── */
  .bm-toolbar { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:20px; }
  .bm-search {
    flex:1; min-width:200px;
    border:1.5px solid var(--border); border-radius:var(--radius-btn);
    padding:10px 18px; font-family:'DM Sans',sans-serif; font-size:.88rem;
    color:var(--text-dark); background:var(--surface); outline:none;
    transition:border-color .2s, box-shadow .2s;
  }
  .bm-search:focus { border-color:var(--primary); box-shadow:0 0 0 3px rgba(35,82,255,.08); }
  .bm-cat-filter {
    border:1.5px solid var(--border); border-radius:var(--radius-btn);
    padding:10px 14px; font-family:'DM Sans',sans-serif; font-size:.85rem;
    color:var(--text-dark); background:var(--surface); outline:none; cursor:pointer;
    max-width:180px;
  }

  /* ── Form ── */
  .bm-form {
    background:var(--surface); border:1.5px solid var(--border);
    border-radius:28px; padding:32px; margin-bottom:28px;
    box-shadow:0 8px 40px rgba(35,82,255,.10);
    animation:bm-form .32s ease;
  }
  .bm-g2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .bm-g3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; }
  .bm-fg { display:flex; flex-direction:column; gap:6px; }
  .bm-lbl { font-size:.72rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:.06em; }
  .bm-lbl span.req { color:var(--accent); }
  .bm-lbl span.opt { color:var(--text-hint); font-weight:400; text-transform:none; font-size:.68rem; }
  .bm-input, .bm-select, .bm-ta {
    border:1.5px solid var(--border); border-radius:var(--radius-input);
    padding:11px 15px; font-family:'DM Sans',sans-serif; font-size:.88rem;
    color:var(--text-dark); background:#FAFBFF; outline:none;
    transition:border-color .2s, box-shadow .2s, background .2s; width:100%;
  }
  .bm-input:focus,.bm-select:focus,.bm-ta:focus {
    border-color:var(--primary); box-shadow:0 0 0 3px rgba(35,82,255,.08); background:var(--surface);
  }
  .bm-ta { resize:vertical; min-height:96px; line-height:1.7; }
  .bm-img-preview { width:100%; height:170px; border-radius:var(--radius-input); object-fit:cover; border:1.5px solid var(--border); margin-top:10px; background:#EEF3FC; }
  .bm-img-ph {
    width:100%; height:170px; border-radius:var(--radius-input);
    border:2px dashed #C8D8F0; margin-top:10px;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    gap:8px; color:var(--text-hint); font-size:.8rem; font-weight:600; background:#F8FAFF;
  }
  .bm-tags-row { display:flex; flex-wrap:wrap; gap:8px; margin-top:8px; }
  .bm-tag { display:flex; align-items:center; gap:5px; background:#EEF3FC; color:var(--primary); border-radius:20px; padding:4px 11px; font-size:.74rem; font-weight:700; }
  .bm-tag-rm { background:none; border:none; color:var(--primary); cursor:pointer; font-size:14px; line-height:1; padding:0; opacity:.6; }
  .bm-tag-rm:hover { opacity:1; }
  .bm-toggle-row {
    display:flex; align-items:center; gap:12px;
    padding:14px 16px; background:#F8FAFF; border:1.5px solid var(--border);
    border-radius:var(--radius-input); cursor:pointer; transition:border-color .2s;
  }
  .bm-toggle-row:hover { border-color:var(--primary-border); }
  .bm-section-sep {
    font-family:'Syne',sans-serif; font-size:.74rem; font-weight:700;
    color:var(--text-hint); letter-spacing:.12em; text-transform:uppercase;
    margin:24px 0 14px; display:flex; align-items:center; gap:12px;
  }
  .bm-section-sep::after { content:''; flex:1; height:1px; background:var(--border); }

  /* ── Toggle ── */
  .bm-tg {
    width:40px; height:22px; border-radius:11px; border:none; cursor:pointer;
    position:relative; transition:background .25s; flex-shrink:0;
  }
  .bm-tg::after {
    content:''; position:absolute; top:3px; left:3px;
    width:16px; height:16px; border-radius:50%; background:#fff;
    transition:transform .25s; box-shadow:0 1px 4px rgba(0,0,0,.2);
  }
  .bm-tg.on  { background:var(--primary); }
  .bm-tg.off { background:#D1D9E6; }
  .bm-tg.on::after { transform:translateX(18px); }

  /* ── Table ── */
  .bm-table-wrap {
    background:var(--surface); border:1.5px solid var(--border);
    border-radius:24px; overflow:hidden;
    box-shadow:0 4px 24px rgba(35,82,255,.07);
  }
  .bm-table { width:100%; border-collapse:collapse; }
  .bm-table th {
    text-align:left; padding:13px 18px;
    font-size:.68rem; color:var(--text-hint); font-weight:700;
    letter-spacing:.08em; text-transform:uppercase;
    background:#F8FAFF; border-bottom:1px solid var(--border);
    white-space:nowrap;
  }
  .bm-table td {
    padding:15px 18px; border-bottom:1px solid #F0F4FB;
    vertical-align:middle; font-size:.86rem;
  }
  .bm-table tr:last-child td { border-bottom:none; }
  .bm-table tbody tr { transition:background .15s; }
  .bm-table tbody tr:hover td { background:#F8FAFF; }

  .bm-cover-img { width:52px; height:38px; border-radius:9px; object-fit:cover; border:1px solid var(--border); display:block; }
  .bm-cover-ph  { width:52px; height:38px; border-radius:9px; background:linear-gradient(135deg,#EEF3FC,#dce6fa); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0; }

  /* ── Badges ── */
  .badge { display:inline-flex; align-items:center; gap:4px; border-radius:20px; padding:3px 10px; font-size:.7rem; font-weight:700; letter-spacing:.03em; white-space:nowrap; }
  .badge-live  { background:#E8F9F0; color:#1A8C4E; }
  .badge-draft { background:#F1F3F5; color:#9AA5B4; }
  .badge-cat   { background:#EEF3FC; color:#2352FF; }

  /* ── Action buttons ── */
  .bm-edit-btn, .bm-del-btn {
    border:none; border-radius:10px; padding:7px 13px;
    font-family:'Syne',sans-serif; font-weight:700; font-size:.76rem;
    cursor:pointer; transition:all .2s; white-space:nowrap;
  }
  .bm-edit-btn { background:#EEF3FC; color:var(--primary); }
  .bm-edit-btn:hover { background:var(--primary); color:#fff; }
  .bm-del-btn  { background:#FFF0ED; color:var(--accent); }
  .bm-del-btn:hover { background:var(--accent); color:#fff; }

  /* ── Toast ── */
  .bm-toast {
    position:fixed; bottom:28px; left:50%; transform:translateX(-50%);
    background:var(--text-dark); color:#fff;
    padding:12px 24px; border-radius:var(--radius-btn);
    font-family:'Syne',sans-serif; font-size:.84rem; font-weight:700;
    z-index:9999; box-shadow:0 8px 32px rgba(13,27,62,.25);
    animation:bm-toast .28s ease; white-space:nowrap;
    max-width:calc(100vw - 32px);
    text-overflow:ellipsis; overflow:hidden;
  }
  .bm-toast.err { background:#C0392B; }

  /* ── Modal ── */
  .bm-modal-bg {
    position:fixed; inset:0; background:rgba(13,27,62,.35);
    backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px);
    z-index:900; display:flex; align-items:center; justify-content:center; padding:20px;
  }
  .bm-modal-box {
    background:var(--surface); border-radius:24px; padding:36px;
    max-width:380px; width:100%;
    box-shadow:0 20px 60px rgba(13,27,62,.2); text-align:center;
    animation:bm-modal .25s cubic-bezier(0.16,1,0.3,1);
  }

  /* ── Empty state ── */
  .bm-empty { text-align:center; padding:64px 20px; color:var(--text-hint); }

  /* ── Skeleton ── */
  .bm-skel {
    background:linear-gradient(90deg,#EEF3FC 25%,#dde8f8 50%,#EEF3FC 75%);
    background-size:200% 100%; animation:bm-shimmer 1.6s infinite;
    border-radius:var(--radius-card); height:64px;
  }

  /* ── Badge dot ── */
  .bm-dot { width:6px; height:6px; border-radius:50%; background:var(--primary); animation:bm-pulse 2s infinite; flex-shrink:0; }

  /* ══════════════════════════════════════════
     RESPONSIVE — Tablet ≤ 900px
  ══════════════════════════════════════════ */
  @media (max-width: 900px) {
    .bm-stats { grid-template-columns:repeat(2,1fr); gap:12px; }
    .bm-g3 { grid-template-columns:1fr 1fr; }
  }

  /* ══════════════════════════════════════════
     RESPONSIVE — Mobile ≤ 640px
  ══════════════════════════════════════════ */
  @media (max-width: 640px) {
    /* Header */
    .bm-header-inner { padding:0 14px; }
    .bm-back-label   { display:none !important; }
    .bm-breadcrumb   { display:none !important; }
    .bm-breadcrumb-short { display:block !important; }

    /* Main */
    .bm-main { padding:22px 14px 80px; }

    /* Page title row */
    .bm-page-title-row { flex-direction:column !important; align-items:flex-start !important; gap:14px !important; }
    .bm-page-title-row h1 { font-size:1.65rem !important; }

    /* Stats */
    .bm-stats { grid-template-columns:repeat(2,1fr); gap:10px; margin-bottom:22px; }
    .bm-stat  { padding:16px 14px; }
    .bm-stat-num { font-size:1.55rem !important; }

    /* Form */
    .bm-form { padding:20px 16px; border-radius:20px; }
    .bm-g2, .bm-g3 { grid-template-columns:1fr !important; gap:12px; }
    .bm-form-header { flex-direction:column !important; align-items:flex-start !important; gap:12px !important; }
    .bm-form-actions { flex-direction:column !important; }
    .bm-form-actions button { width:100% !important; justify-content:center !important; }
    .bm-toggle-grid { grid-template-columns:1fr !important; }

    /* Toolbar */
    .bm-toolbar { gap:8px; }
    .bm-search { min-width:0; width:100%; flex:1 1 100%; order:-1; }
    .bm-cat-filter { max-width:none; flex:1; }

    /* Table → card view on mobile */
    .bm-table thead { display:none; }
    .bm-table tr {
      display:block;
      border-bottom:2px solid var(--border);
      padding:14px 16px;
    }
    .bm-table tr:last-child { border-bottom:none; }
    .bm-table td {
      display:flex; justify-content:space-between; align-items:center;
      border:none; padding:5px 0; font-size:.82rem;
    }
    .bm-table td::before {
      content:attr(data-label);
      font-weight:700; color:var(--text-hint);
      font-size:.68rem; text-transform:uppercase; letter-spacing:.06em;
      flex-shrink:0; margin-right:10px;
    }
    .bm-table td:first-child { justify-content:flex-start; gap:10px; }
    .bm-table td:first-child::before { display:none; }
    .bm-actions-cell { flex-wrap:wrap; gap:8px !important; }

    /* Modal */
    .bm-modal-box { padding:24px 20px; border-radius:20px; }

    /* Toast */
    .bm-toast { bottom:20px; font-size:.8rem; padding:10px 18px; }
  }

  /* ══════════════════════════════════════════
     RESPONSIVE — Very small ≤ 380px
  ══════════════════════════════════════════ */
  @media (max-width: 380px) {
    .bm-stats { grid-template-columns:1fr 1fr; gap:8px; }
    .bm-edit-btn, .bm-del-btn { padding:6px 10px; font-size:.72rem; }
  }
`;

// ═════════════════════════════════════════════════════════════════════════════
export default function BlogManagement() {
  const router = useRouter();

  const [blogs,         setBlogs]         = useState<Blog[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [saving,        setSaving]        = useState(false);
  const [showForm,      setShowForm]      = useState(false);
  const [editId,        setEditId]        = useState<string|null>(null);
  const [form,          setForm]          = useState<BlogForm>(EMPTY);
  const [tagInput,      setTagInput]      = useState('');
  const [imgError,      setImgError]      = useState(false);
  const [toast,         setToast]         = useState<{msg:string;ok:boolean}|null>(null);
  const [search,        setSearch]        = useState('');
  const [filterCat,     setFilterCat]     = useState('All');
  const [deleteConfirm, setDeleteConfirm] = useState<string|null>(null);
  const [deleting,      setDeleting]      = useState<string|null>(null);
  const [mounted,       setMounted]       = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // ── Fetch ───────────────────────────────────────────────────────────────────
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db,'blogs'), orderBy('createdAt','desc')));
      setBlogs(snap.docs.map(d => ({id:d.id, ...d.data()} as Blog)));
    } catch { showToast('Failed to load blogs', false); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    fetchBlogs();
    setTimeout(() => setMounted(true), 60);
  }, []);

  // ── Toast ───────────────────────────────────────────────────────────────────
  const showToast = (msg: string, ok = true) => {
    setToast({msg,ok});
    setTimeout(() => setToast(null), 3200);
  };

  // ── Form open/close ─────────────────────────────────────────────────────────
  const openCreate = () => {
    setEditId(null); setForm(EMPTY); setTagInput(''); setImgError(false); setShowForm(true);
    setTimeout(() => formRef.current?.scrollIntoView({behavior:'smooth',block:'start'}), 80);
  };
  const openEdit = (b: Blog) => {
    setEditId(b.id);
    setForm({title:b.title,slug:b.slug,excerpt:b.excerpt,content:b.content,
      coverImage:b.coverImage,category:b.category,tags:b.tags,author:b.author,
      readTime:b.readTime,enabled:b.enabled,featured:b.featured,
      metaTitle:b.metaTitle,metaDesc:b.metaDesc});
    setTagInput(''); setImgError(false); setShowForm(true);
    setTimeout(() => formRef.current?.scrollIntoView({behavior:'smooth',block:'start'}), 80);
  };

  // ── Field helpers ───────────────────────────────────────────────────────────
  const setF = (k: keyof BlogForm, v: unknown) => setForm(f => ({...f,[k]:v}));
  const onTitle = (v: string) => setForm(f => ({...f,title:v,slug:toSlug(v)}));
  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !form.tags.includes(t)) setF('tags',[...form.tags,t]);
    setTagInput('');
  };
  const removeTag = (t: string) => setF('tags', form.tags.filter(x => x!==t));

  // ── Save (optimistic) ───────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.title.trim()||!form.excerpt.trim()||!form.content.trim()||!form.author.trim()) {
      showToast('Please fill all required fields', false); return;
    }
    const merged: BlogForm = {
      ...form,
      metaTitle: form.metaTitle||form.title,
      metaDesc:  form.metaDesc||form.excerpt,
    };
    const now = Timestamp.now();
    setSaving(true);
    setShowForm(false);

    if (editId) {
      setBlogs(prev => prev.map(b => b.id===editId ? {...b,...merged,updatedAt:now} : b));
      showToast('Blog updated ✓');
      setSaving(false);
      updateDoc(doc(db,'blogs',editId), {...merged, updatedAt:serverTimestamp()})
        .catch(() => showToast('Sync failed — please refresh', false));
    } else {
      const tempId = `_tmp_${Date.now()}`;
      const optimistic: Blog = {...merged, id:tempId, createdAt:now, updatedAt:now};
      setBlogs(prev => [optimistic,...prev]);
      showToast('Blog created ✓');
      setSaving(false);
      addDoc(collection(db,'blogs'), {...merged, createdAt:serverTimestamp(), updatedAt:serverTimestamp()})
        .then(ref => setBlogs(prev => prev.map(b => b.id===tempId ? {...b,id:ref.id} : b)))
        .catch(() => {
          setBlogs(prev => prev.filter(b => b.id!==tempId));
          showToast('Save failed — please try again', false);
        });
    }
  };

  // ── Toggle enabled (optimistic) ─────────────────────────────────────────────
  const toggleEnabled = (b: Blog) => {
    const next = !b.enabled;
    setBlogs(prev => prev.map(x => x.id===b.id ? {...x,enabled:next} : x));
    showToast(next ? 'Blog is now live ✓' : 'Blog hidden from homepage');
    updateDoc(doc(db,'blogs',b.id),{enabled:next,updatedAt:serverTimestamp()})
      .catch(() => {
        setBlogs(prev => prev.map(x => x.id===b.id ? {...x,enabled:b.enabled} : x));
        showToast('Toggle failed', false);
      });
  };

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    setDeleting(id);
    setBlogs(prev => prev.filter(b => b.id!==id));
    setDeleteConfirm(null);
    try {
      await deleteDoc(doc(db,'blogs',id));
      showToast('Blog deleted');
    } catch {
      fetchBlogs();
      showToast('Delete failed', false);
    } finally { setDeleting(null); }
  };

  // ── Filtered ────────────────────────────────────────────────────────────────
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
      <style>{CSS}</style>
      <div className="bm-page">

        {/* ── Ambient blobs ── */}
        <div style={{position:'fixed',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(35,82,255,0.08) 0%,transparent 70%)',top:-100,left:-100,zIndex:0,pointerEvents:'none'}} />
        <div style={{position:'fixed',width:400,height:400,borderRadius:'50%',background:'radial-gradient(circle,rgba(255,79,23,0.06) 0%,transparent 70%)',bottom:-80,right:'20%',zIndex:0,pointerEvents:'none'}} />

        {/* ══════════════════════════════════════════
            HEADER
        ══════════════════════════════════════════ */}
        <header className="bm-header">
          <div className="bm-header-inner">
            {/* Left */}
            <div className="bm-header-left">
              <button
                onClick={() => router.push('/admin')}
                style={{
                  background:'#fff', border:'1.5px solid var(--border)',
                  borderRadius:50, padding:'6px 14px',
                  color:'var(--text-muted)', fontFamily:'DM Sans,sans-serif',
                  fontSize:'.8rem', fontWeight:600, cursor:'pointer',
                  display:'flex', alignItems:'center', gap:5,
                  transition:'all .2s', flexShrink:0,
                  boxShadow:'0 1px 4px rgba(13,27,62,.06)',
                }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(35,82,255,0.3)';e.currentTarget.style.color='#2352FF';e.currentTarget.style.background='#F0F4FF';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--text-muted)';e.currentTarget.style.background='#fff';}}
              >
                ←<span className="bm-back-label"> Dashboard</span>
              </button>

              {/* Breadcrumb — hidden on mobile */}
              <div className="bm-breadcrumb">
                <div style={{width:30,height:30,borderRadius:9,flexShrink:0,background:'linear-gradient(135deg,#2352FF,#1a3fd4)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Syne,sans-serif',fontSize:'.8rem',fontWeight:800,color:'#fff',boxShadow:'0 4px 12px rgba(35,82,255,.25)'}}>M</div>
                <span style={{fontFamily:'DM Sans,sans-serif',fontSize:'.78rem',color:'var(--text-hint)'}}>Admin</span>
                <span style={{color:'#D1DBE8',fontSize:'.85rem'}}>/</span>
                <span style={{fontFamily:'Syne,sans-serif',fontSize:'.84rem',fontWeight:700,color:'var(--text-dark)',letterSpacing:'-.01em',whiteSpace:'nowrap'}}>Blog Management</span>
              </div>

              {/* Short label — mobile only */}
              <span className="bm-breadcrumb-short">Blog Manager</span>
            </div>

            {/* Right: count pill */}
            <div style={{display:'flex',alignItems:'center',gap:7,padding:'5px 14px',borderRadius:50,flexShrink:0,background:'rgba(35,82,255,0.07)',border:'1.5px solid rgba(35,82,255,0.18)'}}>
              <div className="bm-dot" />
              <span style={{fontFamily:'Syne,sans-serif',fontSize:'.74rem',fontWeight:700,color:'#2352FF',whiteSpace:'nowrap'}}>
                {loading ? '…' : `${stats.live} Live`}
              </span>
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════════════
            MAIN
        ══════════════════════════════════════════ */}
        <div className="bm-main">

          {/* ── Page header ── */}
          <div style={{marginBottom:28,opacity:mounted?1:0,transform:mounted?'none':'translateY(16px)',transition:'all .55s cubic-bezier(0.16,1,0.3,1)'}}>
            <div
              className="bm-page-title-row"
              style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16,marginBottom:0}}
            >
              <div>
                {/* Badge */}
                <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'#fff',border:'1.5px solid var(--border)',borderRadius:60,padding:'5px 15px 5px 10px',marginBottom:14,boxShadow:'0 2px 8px rgba(0,0,0,.05)'}}>
                  <div className="bm-dot" />
                  <span style={{fontFamily:'DM Sans,sans-serif',fontSize:'.7rem',fontWeight:700,color:'var(--text-dark)',letterSpacing:'.07em',textTransform:'uppercase'}}>Content Studio</span>
                </div>
                <h1 style={{fontFamily:'Syne,sans-serif',fontSize:'clamp(1.7rem,3vw,2.5rem)',fontWeight:800,color:'var(--text-dark)',lineHeight:1.1,letterSpacing:'-.025em'}}>
                  Blog Management
                </h1>
                <p style={{color:'var(--text-muted)',fontSize:'.88rem',marginTop:6,maxWidth:440,lineHeight:1.6}}>
                  Create, manage and publish blogs that appear on your homepage.
                </p>
              </div>
              <button className="btn-p" onClick={openCreate} style={{alignSelf:'flex-start'}}>
                <span style={{fontSize:18,lineHeight:1}}>+</span> Create Blog
              </button>
            </div>
          </div>

          {/* ── Stats ── */}
          <div className="bm-stats" style={{opacity:mounted?1:0,transform:mounted?'none':'translateY(14px)',transition:'all .55s .07s cubic-bezier(0.16,1,0.3,1)'}}>
            {[
              {label:'Total Blogs',  num:stats.total,    icon:'📚', color:'#2352FF'},
              {label:'Live on Site', num:stats.live,     icon:'🟢', color:'#1A8C4E'},
              {label:'Drafts',       num:stats.draft,    icon:'📋', color:'#9AA5B4'},
              {label:'Featured',     num:stats.featured, icon:'⭐', color:'#D97706'},
            ].map((s,i) => (
              <div className="bm-stat" key={s.label} style={{animationDelay:`${i*.06}s`}}>
                <div style={{fontSize:22,marginBottom:10}}>{s.icon}</div>
                <div className="bm-stat-num" style={{color:s.color}}>{s.num}</div>
                <div className="bm-stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>

          {/* ════════════════════ FORM ════════════════════ */}
          {showForm && (
            <div className="bm-form" ref={formRef}>
              {/* Form header */}
              <div className="bm-form-header" style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24,gap:12}}>
                <div>
                  <h2 style={{fontFamily:'Syne,sans-serif',fontSize:'1.3rem',fontWeight:800,color:'var(--text-dark)'}}>
                    {editId ? '✏️ Edit Blog' : '✨ Create New Blog'}
                  </h2>
                  <p style={{color:'var(--text-hint)',fontSize:'.8rem',marginTop:4}}>
                    {editId ? 'Update the blog details below.' : 'Fill in the details to publish your blog post.'}
                  </p>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  style={{background:'#F1F3F5',color:'var(--text-muted)',border:'none',borderRadius:30,padding:'8px 13px',fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:'1rem',cursor:'pointer',flexShrink:0,lineHeight:1}}
                >✕</button>
              </div>

              {/* Basic Info */}
              <div className="bm-section-sep">Basic Info</div>
              <div className="bm-g2" style={{marginBottom:14}}>
                <div className="bm-fg">
                  <label className="bm-lbl">Title <span className="req">*</span></label>
                  <input className="bm-input" placeholder="e.g. How to 10× Your ROI with Google Ads"
                    value={form.title} onChange={e=>onTitle(e.target.value)} />
                </div>
                <div className="bm-fg">
                  <label className="bm-lbl">Slug <span className="opt">(auto-generated)</span></label>
                  <input className="bm-input" value={form.slug} onChange={e=>setF('slug',e.target.value)}
                    style={{fontFamily:'monospace',fontSize:'.82rem',color:'#2352FF'}} />
                </div>
              </div>
              <div className="bm-g3" style={{marginBottom:14}}>
                <div className="bm-fg">
                  <label className="bm-lbl">Author <span className="req">*</span></label>
                  <input className="bm-input" placeholder="e.g. Rohit Sharma" value={form.author} onChange={e=>setF('author',e.target.value)} />
                </div>
                <div className="bm-fg">
                  <label className="bm-lbl">Category</label>
                  <select className="bm-select" value={form.category} onChange={e=>setF('category',e.target.value)}>
                    {CATEGORIES.map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="bm-fg">
                  <label className="bm-lbl">Read Time (mins)</label>
                  <input className="bm-input" type="number" min={1} max={60} value={form.readTime} onChange={e=>setF('readTime',Number(e.target.value))} />
                </div>
              </div>
              <div className="bm-fg" style={{marginBottom:14}}>
                <label className="bm-lbl">Excerpt / Summary <span className="req">*</span></label>
                <textarea className="bm-ta" rows={3} placeholder="A compelling 1–2 line summary shown on the blog card…"
                  value={form.excerpt} onChange={e=>setF('excerpt',e.target.value)} />
                <span style={{fontSize:'.7rem',color:'var(--text-hint)',textAlign:'right',marginTop:2}}>{form.excerpt.length} / 200 recommended</span>
              </div>

              {/* Cover Image */}
              <div className="bm-section-sep">Cover Image</div>
              <div className="bm-fg" style={{marginBottom:14}}>
                <label className="bm-lbl">Image URL</label>
                <input className="bm-input" placeholder="https://images.unsplash.com/…" value={form.coverImage}
                  onChange={e=>{ setF('coverImage',e.target.value); setImgError(false); }} />
                {form.coverImage && !imgError
                  ? <img src={form.coverImage} className="bm-img-preview" alt="preview" onError={()=>setImgError(true)} />
                  : form.coverImage && imgError
                    ? <div className="bm-img-ph" style={{borderColor:'#FFC9C9',background:'#FFF5F5'}}><span style={{fontSize:26}}>⚠️</span><span style={{color:'#C0392B',fontSize:'.8rem'}}>Could not load image — check the URL.</span></div>
                    : <div className="bm-img-ph"><span style={{fontSize:30}}>🖼️</span><span>Paste a URL above to preview</span><span style={{fontSize:'.7rem',color:'#C8D8F0'}}>Recommended: 1200 × 630 px</span></div>
                }
              </div>

              {/* Content */}
              <div className="bm-section-sep">Content</div>
              <div className="bm-fg" style={{marginBottom:14}}>
                <label className="bm-lbl">Blog Content <span className="req">*</span></label>
                <textarea className="bm-ta" rows={10} placeholder="Write your full blog content here. Markdown supported."
                  value={form.content} onChange={e=>setF('content',e.target.value)}
                  style={{minHeight:200,fontFamily:'monospace',fontSize:'.86rem',lineHeight:1.8}} />
              </div>

              {/* Tags */}
              <div className="bm-section-sep">Tags</div>
              <div className="bm-fg" style={{marginBottom:14}}>
                <label className="bm-lbl">Add Tags</label>
                <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
                  <input className="bm-input" placeholder="e.g. seo, google-ads — press Enter"
                    value={tagInput} onChange={e=>setTagInput(e.target.value)}
                    onKeyDown={e=>{ if(e.key==='Enter'){e.preventDefault();addTag();} }}
                    style={{flex:1,minWidth:160}} />
                  <button className="btn-o" onClick={addTag}>+ Add</button>
                </div>
                {form.tags.length>0 && (
                  <div className="bm-tags-row">
                    {form.tags.map(t=>(
                      <span className="bm-tag" key={t}>#{t}<button className="bm-tag-rm" onClick={()=>removeTag(t)}>×</button></span>
                    ))}
                  </div>
                )}
              </div>

              {/* SEO */}
              <div className="bm-section-sep">SEO Settings</div>
              <div className="bm-g2" style={{marginBottom:14}}>
                <div className="bm-fg">
                  <label className="bm-lbl">Meta Title <span className="opt">(defaults to title)</span></label>
                  <input className="bm-input" placeholder="SEO-optimised title…" value={form.metaTitle} onChange={e=>setF('metaTitle',e.target.value)} />
                </div>
                <div className="bm-fg">
                  <label className="bm-lbl">Meta Description <span className="opt">(defaults to excerpt)</span></label>
                  <input className="bm-input" placeholder="Short description for search engines…" value={form.metaDesc} onChange={e=>setF('metaDesc',e.target.value)} />
                </div>
              </div>

              {/* Visibility */}
              <div className="bm-section-sep">Visibility &amp; Publishing</div>
              <div className="bm-g2 bm-toggle-grid" style={{marginBottom:24}}>
                <div className="bm-toggle-row" onClick={()=>setF('enabled',!form.enabled)}>
                  <button className={`bm-tg ${form.enabled?'on':'off'}`} onClick={e=>{e.stopPropagation();setF('enabled',!form.enabled);}} />
                  <div>
                    <div style={{fontSize:'.86rem',fontWeight:700,color:'var(--text-dark)'}}>Publish to Homepage</div>
                    <div style={{fontSize:'.74rem',color:'var(--text-hint)',marginTop:2}}>{form.enabled?'Visible on the site.':'Saved as draft — hidden.'}</div>
                  </div>
                </div>
                <div className="bm-toggle-row" onClick={()=>setF('featured',!form.featured)}>
                  <button className={`bm-tg ${form.featured?'on':'off'}`} onClick={e=>{e.stopPropagation();setF('featured',!form.featured);}} />
                  <div>
                    <div style={{fontSize:'.86rem',fontWeight:700,color:'var(--text-dark)'}}>⭐ Featured Post</div>
                    <div style={{fontSize:'.74rem',color:'var(--text-hint)',marginTop:2}}>{form.featured?'Highlighted at top.':'Standard listing.'}</div>
                  </div>
                </div>
              </div>

              {/* Form actions */}
              <div className="bm-form-actions" style={{display:'flex',gap:12,justifyContent:'flex-end',flexWrap:'wrap'}}>
                <button className="btn-ghost" onClick={()=>setShowForm(false)}>Cancel</button>
                <button className="btn-p" onClick={handleSave} disabled={saving}>
                  {saving ? '⏳ Saving…' : editId ? '💾 Update Blog' : '🚀 Publish Blog'}
                </button>
              </div>
            </div>
          )}

          {/* ── Toolbar ── */}
          <div className="bm-toolbar" style={{opacity:mounted?1:0,transition:'all .55s .14s cubic-bezier(0.16,1,0.3,1)'}}>
            <input className="bm-search" placeholder="🔍  Search by title or author…" value={search} onChange={e=>setSearch(e.target.value)} />
            <select className="bm-cat-filter" value={filterCat} onChange={e=>setFilterCat(e.target.value)}>
              <option>All</option>
              {CATEGORIES.map(c=><option key={c}>{c}</option>)}
            </select>
            <span style={{fontSize:'.78rem',color:'var(--text-hint)',whiteSpace:'nowrap',fontFamily:'DM Sans,sans-serif'}}>
              {filtered.length} / {blogs.length}
            </span>
          </div>

          {/* ════════════════════ TABLE ════════════════════ */}
          <div className="bm-table-wrap" style={{opacity:mounted?1:0,transition:'all .55s .2s cubic-bezier(0.16,1,0.3,1)'}}>
            {loading ? (
              <div style={{padding:'20px 20px',display:'flex',flexDirection:'column',gap:12}}>
                {[1,2,3].map(i=><div key={i} className="bm-skel" style={{animationDelay:`${i*.12}s`}} />)}
              </div>
            ) : filtered.length===0 ? (
              <div className="bm-empty">
                <div style={{fontSize:46,marginBottom:14,animation:'bm-float 1.8s ease-in-out infinite'}}>📭</div>
                <div style={{fontFamily:'Syne,sans-serif',fontSize:'1.1rem',fontWeight:800,color:'var(--text-dark)',marginBottom:8}}>
                  {search ? 'No results found' : 'No blogs yet'}
                </div>
                <p style={{fontSize:'.84rem',maxWidth:280,margin:'0 auto 20px',lineHeight:1.6}}>
                  {search ? 'Try a different search or category.' : 'Click "Create Blog" to write your first post.'}
                </p>
                {!search && <button className="btn-p" onClick={openCreate} style={{margin:'0 auto'}}>+ Create Blog</button>}
              </div>
            ) : (
              <table className="bm-table">
                <thead>
                  <tr>
                    <th>Cover</th>
                    <th>Title &amp; Tags</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Live</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(b => (
                    <tr key={b.id}>
                      {/* Cover */}
                      <td data-label="Cover">
                        {b.coverImage
                          ? <img src={b.coverImage} className="bm-cover-img" alt="" onError={e=>{(e.target as HTMLImageElement).style.display='none';}} />
                          : <div className="bm-cover-ph">🖼️</div>}
                      </td>

                      {/* Title */}
                      <td data-label="Title">
                        <div style={{maxWidth:260}}>
                          <div style={{fontWeight:700,color:'var(--text-dark)',fontSize:'.88rem',marginBottom:3,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                            {b.featured && <span style={{marginRight:4}}>⭐</span>}{b.title}
                          </div>
                          <div style={{fontSize:'.7rem',color:'var(--text-hint)',fontFamily:'monospace'}}>/{b.slug}</div>
                          <div style={{display:'flex',gap:5,flexWrap:'wrap',marginTop:5}}>
                            {b.tags.slice(0,3).map(t=>(
                              <span key={t} style={{background:'#EEF3FC',color:'#2352FF',borderRadius:20,padding:'2px 8px',fontSize:'.65rem',fontWeight:700}}>#{t}</span>
                            ))}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td data-label="Category"><span className="badge badge-cat">{b.category}</span></td>

                      {/* Author */}
                      <td data-label="Author">
                        <div style={{display:'flex',alignItems:'center',gap:8}}>
                          <div style={{width:28,height:28,borderRadius:'50%',background:'linear-gradient(135deg,#2352FF,#1a3fd4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.7rem',color:'#fff',fontWeight:800,flexShrink:0}}>
                            {b.author.charAt(0).toUpperCase()}
                          </div>
                          <span style={{fontWeight:600,color:'var(--text-dark)',fontSize:'.83rem',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:100}}>{b.author}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td data-label="Status">
                        {b.enabled
                          ? <span className="badge badge-live">● Live</span>
                          : <span className="badge badge-draft">○ Draft</span>}
                      </td>

                      {/* Toggle */}
                      <td data-label="Visible">
                        <div style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer'}} onClick={()=>toggleEnabled(b)}>
                          <button className={`bm-tg ${b.enabled?'on':'off'}`} />
                          <span style={{fontSize:'.78rem',color:b.enabled?'#1A8C4E':'var(--text-hint)',fontWeight:600,whiteSpace:'nowrap'}}>
                            {b.enabled?'On':'Off'}
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td data-label="Created" style={{color:'var(--text-hint)',fontSize:'.78rem',whiteSpace:'nowrap'}}>{fmtDate(b.createdAt)}</td>

                      {/* Actions */}
                      <td data-label="Actions">
                        <div className="bm-actions-cell" style={{display:'flex',gap:8,flexWrap:'nowrap'}}>
                          <button className="bm-edit-btn" onClick={()=>openEdit(b)}>✏️ Edit</button>
                          <button className="bm-del-btn" onClick={()=>setDeleteConfirm(b.id)} disabled={deleting===b.id}>
                            {deleting===b.id ? '…' : '🗑️ Del'}
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
      </div>

      {/* ── Delete Confirm Modal ── */}
      {deleteConfirm && (
        <div className="bm-modal-bg" onClick={()=>setDeleteConfirm(null)}>
          <div className="bm-modal-box" onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:44,marginBottom:14}}>🗑️</div>
            <h3 style={{fontFamily:'Syne,sans-serif',fontSize:'1.15rem',fontWeight:800,color:'var(--text-dark)',marginBottom:10}}>
              Delete Blog?
            </h3>
            <p style={{fontSize:'.85rem',color:'var(--text-muted)',marginBottom:26,lineHeight:1.6}}>
              This is <strong>permanent</strong> and cannot be undone.
            </p>
            <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
              <button className="btn-ghost" onClick={()=>setDeleteConfirm(null)} style={{flex:1,justifyContent:'center',minWidth:100}}>
                Cancel
              </button>
              <button
                onClick={()=>handleDelete(deleteConfirm)}
                style={{flex:1,minWidth:100,background:'#FF4F17',color:'#fff',border:'none',borderRadius:40,padding:'11px 20px',fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:'.88rem',cursor:'pointer',boxShadow:'0 4px 16px rgba(255,79,23,.3)',transition:'all .2s'}}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className={`bm-toast ${toast.ok?'':'err'}`}>
          {toast.ok ? '✓ ' : '⚠ '}{toast.msg}
        </div>
      )}
    </>
  );
}