'use client';

import { useEffect, useState, useRef } from 'react';
import {
  collection, getDocs, query, orderBy, where, Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ── Types ─────────────────────────────────────────────────────────────────────
interface Blog {
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

const CATEGORIES = [
  'All','Digital Marketing','SEO','Content Marketing',
  'Social Media','Paid Ads','Analytics','Branding','Technology',
];

const CAT_COLOR: Record<string, { bg: string; text: string }> = {
  'SEO':               { bg: '#EEF3FC', text: '#2352FF' },
  'Digital Marketing': { bg: '#FFF0ED', text: '#FF4F17' },
  'Content Marketing': { bg: '#E8F9F0', text: '#1A8C4E' },
  'Social Media':      { bg: '#FFF7E6', text: '#D97706' },
  'Paid Ads':          { bg: '#F3EEFF', text: '#7C3AED' },
  'Analytics':         { bg: '#E0F7FA', text: '#0288D1' },
  'Branding':          { bg: '#FCE8F3', text: '#C2185B' },
  'Technology':        { bg: '#E8F5E9', text: '#2E7D32' },
};
const catStyle = (cat: string) => CAT_COLOR[cat] ?? { bg: '#F1F3F5', text: '#6B7280' };

const fmtDate = (ts: Timestamp | null) =>
  ts ? new Date(ts.seconds * 1000).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  }) : '';

const readingTime = (content: string) =>
  Math.max(1, Math.ceil(content.split(/\s+/).length / 200));


// ═════════════════════════════════════════════════════════════════════════════
// BLOG MODAL (reused from BlogsSection — same implementation)
// ═════════════════════════════════════════════════════════════════════════════
function BlogModal({ blog, onClose }: { blog: Blog; onClose: () => void }) {
  const cs = catStyle(blog.category);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <>
      <style>{`
        @keyframes bpModalIn { from{opacity:0;transform:translateY(30px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes bpBackdrop { from{opacity:0} to{opacity:1} }
        .bpModal::-webkit-scrollbar{width:5px}
        .bpModal::-webkit-scrollbar-thumb{background:#E4ECF7;border-radius:10px}
        .bpModalContent p{line-height:1.9;color:#374151;margin-bottom:14px;font-size:.93rem}
        .bpModalContent h2,.bpModalContent h3{font-family:'Syne',sans-serif;color:#0D1B3E;margin:24px 0 10px;font-weight:800}
        .bpModalContent ul,.bpModalContent ol{padding-left:20px;color:#374151;margin-bottom:14px;font-size:.93rem;line-height:1.9}
        .bpModalContent strong{color:#0D1B3E}
        .bpModalContent code{background:#EEF3FC;color:#2352FF;padding:2px 6px;border-radius:5px;font-size:.85em;font-family:monospace}
        .bpModalContent blockquote{border-left:3px solid #2352FF;padding:4px 16px;margin:16px 0;background:#F8FAFF;border-radius:0 8px 8px 0}
      `}</style>
      <div onClick={onClose} style={{
        position:'fixed',inset:0,background:'rgba(13,27,62,0.45)',
        backdropFilter:'blur(6px)',zIndex:1000,animation:'bpBackdrop .25s ease',
      }} />
      <div className="bpModal" style={{
        position:'fixed',top:0,right:0,bottom:0,
        width:'min(680px,100vw)',background:'#fff',zIndex:1001,
        overflowY:'auto',boxShadow:'-20px 0 60px rgba(13,27,62,0.15)',
        animation:'bpModalIn .35s cubic-bezier(.22,1,.36,1)',
      }}>
        {blog.coverImage ? (
          <div style={{position:'relative',height:260,overflow:'hidden'}}>
            <img src={blog.coverImage} alt={blog.title}
              style={{width:'100%',height:'100%',objectFit:'cover'}}
              onError={e=>{(e.target as HTMLImageElement).style.display='none'}} />
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,transparent 40%,rgba(13,27,62,0.5) 100%)'}} />
            <button onClick={onClose} style={{
              position:'absolute',top:16,right:16,background:'rgba(255,255,255,0.9)',
              border:'none',borderRadius:30,width:36,height:36,cursor:'pointer',
              fontSize:16,fontWeight:700,display:'flex',alignItems:'center',
              justifyContent:'center',color:'#0D1B3E',backdropFilter:'blur(8px)',
              boxShadow:'0 2px 8px rgba(0,0,0,0.12)',
            }}>✕</button>
          </div>
        ) : (
          <div style={{height:140,background:'linear-gradient(135deg,#EEF3FC,#dce6fa)',
            display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
            <span style={{fontSize:52,opacity:0.4}}>📝</span>
            <button onClick={onClose} style={{
              position:'absolute',top:16,right:16,background:'#fff',
              border:'1.5px solid #E4ECF7',borderRadius:30,width:36,height:36,
              cursor:'pointer',fontSize:16,fontWeight:700,display:'flex',
              alignItems:'center',justifyContent:'center',color:'#0D1B3E',
            }}>✕</button>
          </div>
        )}
        <div style={{padding:'28px 32px 48px'}}>
          <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap',marginBottom:16}}>
            <span style={{background:cs.bg,color:cs.text,borderRadius:20,padding:'3px 12px',
              fontSize:'.72rem',fontWeight:700,letterSpacing:'.04em'}}>{blog.category}</span>
            {blog.featured && <span style={{background:'#FFF7E6',color:'#D97706',
              borderRadius:20,padding:'3px 12px',fontSize:'.72rem',fontWeight:700}}>⭐ Featured</span>}
            <span style={{fontSize:'.78rem',color:'#9AA5B4',marginLeft:'auto'}}>{fmtDate(blog.createdAt)}</span>
          </div>
          <h1 style={{fontFamily:'Syne,sans-serif',fontSize:'clamp(1.4rem,3vw,2rem)',
            fontWeight:800,color:'#0D1B3E',lineHeight:1.15,marginBottom:14,letterSpacing:'-.02em'}}>
            {blog.title}
          </h1>
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
            <div style={{width:34,height:34,borderRadius:'50%',
              background:'linear-gradient(135deg,#2352FF,#1a3fd4)',
              display:'flex',alignItems:'center',justifyContent:'center',
              fontSize:'.8rem',color:'#fff',fontWeight:700}}>
              {blog.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{fontSize:'.82rem',fontWeight:700,color:'#0D1B3E'}}>{blog.author}</div>
              <div style={{fontSize:'.72rem',color:'#9AA5B4'}}>{blog.readTime||readingTime(blog.content)} min read</div>
            </div>
          </div>
          <div style={{height:1,background:'#E4ECF7',marginBottom:20}} />
          <div style={{background:'linear-gradient(135deg,#EEF3FC,#F5F8FF)',
            border:'1.5px solid #d4e0f7',borderRadius:14,padding:'14px 18px',marginBottom:24}}>
            <p style={{fontSize:'.9rem',color:'#374151',lineHeight:1.7,fontStyle:'italic',margin:0}}>
              {blog.excerpt}
            </p>
          </div>
          <div className="bpModalContent" dangerouslySetInnerHTML={{
            __html: blog.content
              .replace(/^### (.+)$/gm,'<h3>$1</h3>')
              .replace(/^## (.+)$/gm,'<h2>$1</h2>')
              .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
              .replace(/`(.+?)`/g,'<code>$1</code>')
              .replace(/^> (.+)$/gm,'<blockquote><p>$1</p></blockquote>')
              .replace(/^- (.+)$/gm,'<li>$1</li>')
              .replace(/(<li>.*<\/li>)/s,'<ul>$1</ul>')
              .replace(/\n\n/g,'</p><p>')
              .replace(/^(?!<[hublp])/gm,'<p>')
              .replace(/(?<![>])$/gm,'</p>')
              .replace(/<p><\/p>/g,'')
              .replace(/<p>(<[hul])/g,'$1')
              .replace(/(<\/[hul][^>]*>)<\/p>/g,'$1'),
          }} />
          {blog.tags?.length > 0 && (
            <div style={{marginTop:28,display:'flex',gap:8,flexWrap:'wrap'}}>
              {blog.tags.map(t=>(
                <span key={t} style={{background:'#EEF3FC',color:'#2352FF',
                  borderRadius:20,padding:'4px 12px',fontSize:'.72rem',fontWeight:700}}>#{t}</span>
              ))}
            </div>
          )}
          <div style={{marginTop:32,paddingTop:20,borderTop:'1px solid #E4ECF7',textAlign:'center'}}>
            <button onClick={onClose} style={{
              background:'linear-gradient(135deg,#2352FF,#1a3fd4)',color:'#fff',
              border:'none',borderRadius:40,padding:'12px 32px',
              fontFamily:'Manrope,sans-serif',fontWeight:700,fontSize:'.9rem',cursor:'pointer',
              boxShadow:'0 4px 16px rgba(35,82,255,0.25)',
            }}>← Back to Blogs</button>
          </div>
        </div>
      </div>
    </>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// BLOG CARD (full page version — slightly larger)
// ═════════════════════════════════════════════════════════════════════════════
function BlogCard({ blog, onClick, index }: { blog: Blog; onClick: () => void; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cs = catStyle(blog.category);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: `1.5px solid ${hovered ? '#2352FF' : '#E4ECF7'}`,
        borderRadius: 24, overflow: 'hidden', cursor: 'pointer',
        boxShadow: hovered ? '0 16px 48px rgba(35,82,255,0.14)' : '0 4px 20px rgba(35,82,255,0.06)',
        transition: 'all .3s cubic-bezier(.22,1,.36,1)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        animation: `bpCardIn .5s ${index * 0.07}s ease both`,
      }}
    >
      {/* Cover */}
      <div style={{height:210,background:'linear-gradient(135deg,#EEF3FC,#dce6fa)',
        position:'relative',overflow:'hidden'}}>
        {blog.coverImage ? (
          <img src={blog.coverImage} alt={blog.title}
            style={{width:'100%',height:'100%',objectFit:'cover',
              transform:hovered?'scale(1.06)':'scale(1)',transition:'transform .5s ease'}}
            onError={e=>{(e.target as HTMLImageElement).style.display='none'}} />
        ) : (
          <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',
            justifyContent:'center',fontSize:52,opacity:0.25}}>📝</div>
        )}
        <div style={{position:'absolute',inset:0,
          background:'linear-gradient(to bottom,transparent 50%,rgba(13,27,62,0.22) 100%)',
          opacity:hovered?1:0,transition:'opacity .3s'}} />
        <span style={{position:'absolute',top:14,left:14,
          background:cs.bg,color:cs.text,borderRadius:20,padding:'4px 12px',
          fontSize:'.68rem',fontWeight:700,letterSpacing:'.04em',
          boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
          {blog.category}
        </span>
        {blog.featured && (
          <span style={{position:'absolute',top:14,right:14,
            background:'rgba(255,255,255,0.9)',borderRadius:20,padding:'4px 10px',
            fontSize:'.68rem',fontWeight:700,backdropFilter:'blur(8px)'}}>
            ⭐ Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{padding:'22px 24px 24px'}}>
        <h3 style={{fontFamily:'Syne,sans-serif',fontSize:'1.05rem',fontWeight:800,
          color:'#0D1B3E',lineHeight:1.3,marginBottom:10,letterSpacing:'-.01em',
          display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
          {blog.title}
        </h3>
        <p style={{fontSize:'.84rem',color:'#6B7280',lineHeight:1.65,marginBottom:18,
          display:'-webkit-box',WebkitLineClamp:3,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
          {blog.excerpt}
        </p>
        <div style={{height:1,background:'#F0F4FB',marginBottom:14}} />
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{width:30,height:30,borderRadius:'50%',
              background:'linear-gradient(135deg,#2352FF,#1a3fd4)',
              display:'flex',alignItems:'center',justifyContent:'center',
              fontSize:'.72rem',color:'#fff',fontWeight:700}}>
              {blog.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{fontSize:'.78rem',fontWeight:700,color:'#0D1B3E'}}>{blog.author}</div>
              <div style={{fontSize:'.7rem',color:'#9AA5B4'}}>{fmtDate(blog.createdAt)}</div>
            </div>
          </div>
          <div style={{fontSize:'.75rem',color:hovered?'#2352FF':'#9AA5B4',
            fontWeight:700,display:'flex',alignItems:'center',gap:5,transition:'color .25s'}}>
            📖 {blog.readTime||readingTime(blog.content)} min
          </div>
        </div>
        <div style={{
          marginTop:14,
          background:hovered?'linear-gradient(135deg,#2352FF,#1a3fd4)':'#EEF3FC',
          color:hovered?'#fff':'#2352FF',
          borderRadius:40,padding:'9px 0',textAlign:'center',
          fontSize:'.82rem',fontWeight:700,transition:'all .3s',
        }}>
          {hovered?'Read Article →':'Read More'}
        </div>
      </div>
    </div>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// FEATURED HERO CARD (first featured blog — large format)
// ═════════════════════════════════════════════════════════════════════════════
function FeaturedCard({ blog, onClick }: { blog: Blog; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const cs = catStyle(blog.category);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: `1.5px solid ${hovered ? '#2352FF' : '#E4ECF7'}`,
        borderRadius: 28, overflow: 'hidden', cursor: 'pointer',
        boxShadow: hovered ? '0 24px 60px rgba(35,82,255,0.16)' : '0 8px 32px rgba(35,82,255,0.08)',
        transition: 'all .35s cubic-bezier(.22,1,.36,1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
        animation: 'bpCardIn .6s ease both',
        marginBottom: 40,
      }}
    >
      {/* Cover */}
      <div style={{height:340,background:'linear-gradient(135deg,#EEF3FC,#dce6fa)',
        position:'relative',overflow:'hidden',minHeight:280}}>
        {blog.coverImage ? (
          <img src={blog.coverImage} alt={blog.title}
            style={{width:'100%',height:'100%',objectFit:'cover',
              transform:hovered?'scale(1.05)':'scale(1)',transition:'transform .6s ease'}}
            onError={e=>{(e.target as HTMLImageElement).style.display='none'}} />
        ) : (
          <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',
            justifyContent:'center',fontSize:72,opacity:0.2}}>📝</div>
        )}
        <div style={{position:'absolute',inset:0,
          background:'linear-gradient(to right,transparent 60%,rgba(13,27,62,0.08) 100%)'}} />
        <div style={{position:'absolute',top:20,left:20,display:'flex',gap:8}}>
          <span style={{background:cs.bg,color:cs.text,borderRadius:20,padding:'5px 14px',
            fontSize:'.72rem',fontWeight:700,boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
            {blog.category}
          </span>
          <span style={{background:'#FFF7E6',color:'#D97706',borderRadius:20,padding:'5px 14px',
            fontSize:'.72rem',fontWeight:700,boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
            ⭐ Featured
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{padding:'36px 36px',display:'flex',flexDirection:'column',justifyContent:'center',gap:0}}>
        <div style={{fontSize:'.72rem',color:'#9AA5B4',fontWeight:600,
          letterSpacing:'.08em',textTransform:'uppercase',marginBottom:12}}>
          Featured Post · {fmtDate(blog.createdAt)}
        </div>
        <h2 style={{fontFamily:'Syne,sans-serif',fontSize:'clamp(1.4rem,2.5vw,1.9rem)',
          fontWeight:800,color:'#0D1B3E',lineHeight:1.2,marginBottom:16,letterSpacing:'-.025em'}}>
          {blog.title}
        </h2>
        <p style={{fontSize:'.9rem',color:'#6B7280',lineHeight:1.8,marginBottom:24,
          display:'-webkit-box',WebkitLineClamp:4,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
          {blog.excerpt}
        </p>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:24}}>
          <div style={{width:36,height:36,borderRadius:'50%',
            background:'linear-gradient(135deg,#2352FF,#1a3fd4)',
            display:'flex',alignItems:'center',justifyContent:'center',
            fontSize:'.85rem',color:'#fff',fontWeight:700}}>
            {blog.author.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{fontSize:'.85rem',fontWeight:700,color:'#0D1B3E'}}>{blog.author}</div>
            <div style={{fontSize:'.74rem',color:'#9AA5B4'}}>
              {blog.readTime||readingTime(blog.content)} min read
            </div>
          </div>
        </div>
        <div style={{
          display:'inline-flex',alignItems:'center',gap:8,
          background:hovered?'linear-gradient(135deg,#2352FF,#1a3fd4)':'#EEF3FC',
          color:hovered?'#fff':'#2352FF',
          borderRadius:40,padding:'12px 24px',fontFamily:'Manrope,sans-serif',
          fontWeight:700,fontSize:'.9rem',transition:'all .3s',
          alignSelf:'flex-start',
        }}>
          Read Article <span style={{transition:'transform .3s',transform:hovered?'translateX(4px)':'none',display:'inline-block'}}>→</span>
        </div>
      </div>
    </div>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═════════════════════════════════════════════════════════════════════════════
export default function BlogsPage() {
  const [blogs,      setBlogs]      = useState<Blog[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [selected,   setSelected]   = useState<Blog | null>(null);
  const [mounted,    setMounted]    = useState(false);
  const [search,     setSearch]     = useState('');
  const [filterCat,  setFilterCat]  = useState('All');

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const snap = await getDocs(
          query(collection(db,'blogs'), where('enabled','==',true), orderBy('createdAt','desc')),
        );
        setBlogs(snap.docs.map(d => ({ id: d.id, ...d.data() } as Blog)));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const featured = blogs.find(b => b.featured);
  const filtered = blogs.filter(b => {
    const q = search.toLowerCase();
    const matchQ  = b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q);
    const matchCat = filterCat === 'All' || b.category === filterCat;
    return matchQ && matchCat;
  });

  // Show featured separately only if no filter/search
  const showFeatured = !search && filterCat === 'All' && !!featured;
  const gridBlogs    = showFeatured ? filtered.filter(b => b.id !== featured!.id) : filtered;

  return (
    <>
      <style>{`
        @keyframes bpCardIn {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes bpFadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .bpSearch:focus { border-color:#2352FF !important; box-shadow:0 0 0 3px rgba(35,82,255,.08) !important; }
        .bpCatChip { border:1.5px solid #E4ECF7; background:#fff; border-radius:40px; padding:8px 18px; font-family:'Manrope',sans-serif; font-size:.82rem; font-weight:700; color:#6B7280; cursor:pointer; transition:all .2s; white-space:nowrap; }
        .bpCatChip.active,.bpCatChip:hover { background:#2352FF; color:#fff; border-color:#2352FF; }
        .bpGrid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
        @media(max-width:900px){ .bpGrid{grid-template-columns:repeat(2,1fr)} }
        @media(max-width:580px){ .bpGrid{grid-template-columns:1fr} }
        .bpChips::-webkit-scrollbar{display:none}
        .bpChips{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>

      {/* Page bg matching hero */}
      <Navbar onGetStarted={() => {}} />
      <div style={{
        position:'fixed',inset:0,zIndex:-1,
        background:'linear-gradient(160deg,#EEF3FC 0%,#F5F8FF 50%,#EBF0FA 100%)',
      }} />
      {/* Grid overlay */}
      <div style={{
        position:'fixed',inset:0,zIndex:-1,
        backgroundImage:'linear-gradient(rgba(35,82,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(35,82,255,.04) 1px,transparent 1px)',
        backgroundSize:'60px 60px',
      }} />

      <main style={{ minHeight:'100vh', paddingTop:100, paddingBottom:80 }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px' }}>

          {/* ── Page header ── */}
          <div style={{
            marginBottom:48,
            animation: mounted ? 'bpFadeUp .7s ease both' : 'none',
          }}>
            {/* Ambient blob */}
            <div style={{
              position:'absolute',width:460,height:460,borderRadius:'50%',
              background:'radial-gradient(circle,rgba(35,82,255,0.065) 0%,transparent 70%)',
              top:-80,right:-60,zIndex:0,pointerEvents:'none',
            }} />

            {/* Badge */}
            <div style={{
              display:'inline-flex',alignItems:'center',gap:8,
              background:'#fff',border:'1.5px solid #E4ECF7',
              borderRadius:60,padding:'6px 16px 6px 10px',
              marginBottom:18,boxShadow:'0 2px 8px rgba(0,0,0,.05)',
            }}>
              <span style={{fontSize:14}}>📚</span>
              <span style={{fontSize:'.72rem',fontWeight:700,color:'#0D1B3E',
                letterSpacing:'.07em',textTransform:'uppercase'}}>Blog &amp; Insights</span>
            </div>

            <h1 style={{
              fontFamily:'Syne,sans-serif',
              fontSize:'clamp(2rem,4vw,3.2rem)',
              fontWeight:800,color:'#0D1B3E',lineHeight:1.1,
              letterSpacing:'-.025em',marginBottom:14,
            }}>
              Marketing Insights<br />
              <span style={{color:'#2352FF',position:'relative',display:'inline-block'}}>
                &amp; Expert Strategies
                <svg viewBox="0 0 320 12" xmlns="http://www.w3.org/2000/svg"
                  style={{position:'absolute',bottom:-5,left:0,width:'100%',height:8,opacity:.35}}>
                  <path d="M2 8 Q80 2 160 8 Q240 14 318 8"
                    stroke="#2352FF" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p style={{color:'#6B7280',fontSize:'1rem',maxWidth:560,lineHeight:1.7}}>
              In-depth guides, actionable tips and industry perspectives from our marketing team.
            </p>
          </div>

          {/* ── Search + Category chips ── */}
          <div style={{
            marginBottom:36,
            animation: mounted ? 'bpFadeUp .7s .15s ease both' : 'none',
          }}>
            {/* Search */}
            <div style={{position:'relative',marginBottom:20,maxWidth:520}}>
              <span style={{
                position:'absolute',left:18,top:'50%',transform:'translateY(-50%)',
                fontSize:16,pointerEvents:'none',opacity:.5,
              }}>🔍</span>
              <input
                className="bpSearch"
                value={search}
                onChange={e=>setSearch(e.target.value)}
                placeholder="Search articles by title, author or topic…"
                style={{
                  width:'100%',border:'1.5px solid #E4ECF7',borderRadius:40,
                  padding:'13px 18px 13px 48px',
                  fontFamily:'Manrope,sans-serif',fontSize:'.9rem',
                  color:'#0D1B3E',background:'#fff',outline:'none',
                  transition:'border-color .2s,box-shadow .2s',
                  boxShadow:'0 2px 10px rgba(35,82,255,.05)',
                }}
              />
            </div>

            {/* Category chips */}
            <div className="bpChips" style={{
              display:'flex',gap:8,overflowX:'auto',paddingBottom:4,
            }}>
              {CATEGORIES.map(cat=>(
                <button
                  key={cat}
                  className={`bpCatChip ${filterCat===cat?'active':''}`}
                  onClick={()=>setFilterCat(cat)}
                >{cat}</button>
              ))}
            </div>
          </div>

          {/* ── Results count ── */}
          {!loading && (
            <div style={{
              marginBottom:24,fontSize:'.82rem',color:'#9AA5B4',fontWeight:600,
              animation: mounted ? 'bpFadeUp .7s .25s ease both' : 'none',
            }}>
              {filtered.length === 0
                ? 'No articles found'
                : `${filtered.length} article${filtered.length !== 1 ? 's' : ''}${filterCat !== 'All' ? ` in ${filterCat}` : ''}`
              }
            </div>
          )}

          {/* ── Loading skeleton ── */}
          {loading && (
            <div className="bpGrid">
              {[...Array(6)].map((_,i)=>(
                <div key={i} style={{
                  height:380,background:'#fff',borderRadius:24,
                  border:'1.5px solid #E4ECF7',
                  animation:'pulse 1.5s ease-in-out infinite',
                  opacity:1-i*0.1,
                }} />
              ))}
              <style>{`@keyframes pulse{0%,100%{opacity:.6}50%{opacity:.3}}`}</style>
            </div>
          )}

          {/* ── Empty ── */}
          {!loading && filtered.length === 0 && (
            <div style={{textAlign:'center',padding:'80px 20px',color:'#9AA5B4'}}>
              <div style={{fontSize:56,marginBottom:16}}>📭</div>
              <div style={{fontFamily:'Syne,sans-serif',fontSize:'1.3rem',fontWeight:800,
                color:'#0D1B3E',marginBottom:10}}>
                {search ? 'No matching articles' : 'No blogs published yet'}
              </div>
              <p style={{fontSize:'.88rem',maxWidth:320,margin:'0 auto 24px',lineHeight:1.6}}>
                {search ? `No articles matching "${search}". Try a different search.` : 'Check back soon for new content.'}
              </p>
              {(search || filterCat !== 'All') && (
                <button
                  onClick={()=>{setSearch('');setFilterCat('All');}}
                  style={{
                    background:'linear-gradient(135deg,#2352FF,#1a3fd4)',color:'#fff',
                    border:'none',borderRadius:40,padding:'11px 26px',
                    fontFamily:'Manrope,sans-serif',fontWeight:700,fontSize:'.9rem',cursor:'pointer',
                    boxShadow:'0 4px 16px rgba(35,82,255,.25)',
                  }}
                >Clear Filters</button>
              )}
            </div>
          )}

          {/* ── Featured ── */}
          {!loading && showFeatured && (
            <FeaturedCard blog={featured!} onClick={()=>setSelected(featured!)} />
          )}

          {/* ── Grid ── */}
          {!loading && gridBlogs.length > 0 && (
            <>
              {showFeatured && gridBlogs.length > 0 && (
                <div style={{
                  fontFamily:'Syne,sans-serif',fontSize:'.78rem',fontWeight:700,
                  color:'#9AA5B4',letterSpacing:'.12em',textTransform:'uppercase',
                  display:'flex',alignItems:'center',gap:12,marginBottom:24,
                }}>
                  <span>More Articles</span>
                  <div style={{flex:1,height:1,background:'#E4ECF7'}} />
                </div>
              )}
              <div className="bpGrid">
                {gridBlogs.map((blog, i)=>(
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    index={i}
                    onClick={()=>setSelected(blog)}
                  />
                ))}
              </div>
            </>
          )}

        </div>
        <Footer />
      </main>

      {/* Modal */}
      {selected && <BlogModal blog={selected} onClose={()=>setSelected(null)} />}
    </>
  );
}