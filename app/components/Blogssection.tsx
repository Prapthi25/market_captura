
// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import {
//   collection, getDocs, query, orderBy, where, limit, Timestamp,
// } from 'firebase/firestore';
// import { db } from '@/lib/firebase';

// // ── Types ─────────────────────────────────────────────────────────────────────
// interface Blog {
//   id:         string;
//   title:      string;
//   slug:       string;
//   excerpt:    string;
//   content:    string;
//   coverImage: string;
//   category:   string;
//   tags:       string[];
//   author:     string;
//   readTime:   number;
//   enabled:    boolean;
//   featured:   boolean;
//   metaTitle:  string;
//   metaDesc:   string;
//   createdAt:  Timestamp | null;
//   updatedAt:  Timestamp | null;
// }

// // ── Helpers ───────────────────────────────────────────────────────────────────
// const fmtDate = (ts: Timestamp | null) =>
//   ts
//     ? new Date(ts.seconds * 1000).toLocaleDateString('en-IN', {
//         day: '2-digit', month: 'short', year: 'numeric',
//       })
//     : '';

// const readingTime = (content: string) =>
//   Math.max(1, Math.ceil(content.split(/\s+/).length / 200));

// // ── Category accent colours ───────────────────────────────────────────────────
// const CAT_COLOR: Record<string, { bg: string; text: string }> = {
//   'SEO':              { bg: '#EEF3FC', text: '#2352FF' },
//   'Digital Marketing':{ bg: '#FFF0ED', text: '#FF4F17' },
//   'Content Marketing':{ bg: '#E8F9F0', text: '#1A8C4E' },
//   'Social Media':     { bg: '#FFF7E6', text: '#D97706' },
//   'Paid Ads':         { bg: '#F3EEFF', text: '#7C3AED' },
//   'Analytics':        { bg: '#E0F7FA', text: '#0288D1' },
//   'Branding':         { bg: '#FCE8F3', text: '#C2185B' },
//   'Technology':       { bg: '#E8F5E9', text: '#2E7D32' },
// };
// const catStyle = (cat: string) =>
//   CAT_COLOR[cat] ?? { bg: '#F1F3F5', text: '#6B7280' };


// // ═════════════════════════════════════════════════════════════════════════════
// // MODAL
// // ═════════════════════════════════════════════════════════════════════════════
// function BlogModal({ blog, onClose }: { blog: Blog; onClose: () => void }) {
//   const cs = catStyle(blog.category);

//   // Lock body scroll
//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => { document.body.style.overflow = ''; };
//   }, []);

//   // Escape key
//   useEffect(() => {
//     const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
//     window.addEventListener('keydown', handler);
//     return () => window.removeEventListener('keydown', handler);
//   }, [onClose]);

//   return (
//     <>
//       <style>{`
//         @keyframes bsModalIn {
//           from { opacity:0; transform:translateY(30px) scale(.97); }
//           to   { opacity:1; transform:translateY(0)    scale(1);   }
//         }
//         @keyframes bsBackdropIn { from{opacity:0} to{opacity:1} }
//         .bsModal::-webkit-scrollbar { width:5px }
//         .bsModal::-webkit-scrollbar-thumb { background:#E4ECF7; border-radius:10px }
//         .bsModalContent p { line-height:1.9; color:#374151; margin-bottom:14px; font-size:.93rem }
//         .bsModalContent h2,.bsModalContent h3 { font-family:'Syne',sans-serif; color:#0D1B3E; margin:24px 0 10px; font-weight:800 }
//         .bsModalContent ul,.bsModalContent ol { padding-left:20px; color:#374151; margin-bottom:14px; font-size:.93rem; line-height:1.9 }
//         .bsModalContent strong { color:#0D1B3E }
//         .bsModalContent code { background:#EEF3FC; color:#2352FF; padding:2px 6px; border-radius:5px; font-size:.85em; font-family:monospace }
//         .bsModalContent blockquote { border-left:3px solid #2352FF; padding:4px 16px; margin:16px 0; background:#F8FAFF; border-radius:0 8px 8px 0 }
//       `}</style>

//       {/* Backdrop */}
//       <div
//         onClick={onClose}
//         style={{
//           position: 'fixed', inset: 0,
//           background: 'rgba(13,27,62,0.45)',
//           backdropFilter: 'blur(6px)',
//           zIndex: 1000,
//           animation: 'bsBackdropIn .25s ease',
//         }}
//       />

//       {/* Panel */}
//       <div
//         className="bsModal"
//         style={{
//           position: 'fixed', top: 0, right: 0, bottom: 0,
//           width: 'min(680px, 100vw)',
//           background: '#fff',
//           zIndex: 1001,
//           overflowY: 'auto',
//           boxShadow: '-20px 0 60px rgba(13,27,62,0.15)',
//           animation: 'bsModalIn .35s cubic-bezier(.22,1,.36,1)',
//         }}
//       >
//         {/* Cover image */}
//         {blog.coverImage ? (
//           <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
//             <img
//               src={blog.coverImage}
//               alt={blog.title}
//               style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//               onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//             />
//             <div style={{
//               position: 'absolute', inset: 0,
//               background: 'linear-gradient(to bottom, transparent 40%, rgba(13,27,62,0.5) 100%)',
//             }} />
//             {/* Close on image */}
//             <button onClick={onClose} style={{
//               position: 'absolute', top: 16, right: 16,
//               background: 'rgba(255,255,255,0.9)',
//               border: 'none', borderRadius: 30, width: 36, height: 36,
//               cursor: 'pointer', fontSize: 16, fontWeight: 700,
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               color: '#0D1B3E', backdropFilter: 'blur(8px)',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
//             }}>✕</button>
//           </div>
//         ) : (
//           <div style={{
//             height: 140, background: 'linear-gradient(135deg,#EEF3FC,#dce6fa)',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             position: 'relative',
//           }}>
//             <span style={{ fontSize: 52, opacity: 0.4 }}>📝</span>
//             <button onClick={onClose} style={{
//               position: 'absolute', top: 16, right: 16,
//               background: '#fff', border: '1.5px solid #E4ECF7',
//               borderRadius: 30, width: 36, height: 36,
//               cursor: 'pointer', fontSize: 16, fontWeight: 700,
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               color: '#0D1B3E',
//             }}>✕</button>
//           </div>
//         )}

//         {/* Content */}
//         <div style={{ padding: '28px 32px 48px' }}>
//           {/* Meta row */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
//             <span style={{
//               background: cs.bg, color: cs.text,
//               borderRadius: 20, padding: '3px 12px',
//               fontSize: '.72rem', fontWeight: 700, letterSpacing: '.04em',
//             }}>{blog.category}</span>
//             {blog.featured && (
//               <span style={{
//                 background: '#FFF7E6', color: '#D97706',
//                 borderRadius: 20, padding: '3px 12px',
//                 fontSize: '.72rem', fontWeight: 700,
//               }}>⭐ Featured</span>
//             )}
//             <span style={{ fontSize: '.78rem', color: '#9AA5B4', marginLeft: 'auto' }}>
//               {fmtDate(blog.createdAt)}
//             </span>
//           </div>

//           {/* Title */}
//           <h1 style={{
//             fontFamily: 'Syne, sans-serif',
//             fontSize: 'clamp(1.4rem,3vw,2rem)',
//             fontWeight: 800, color: '#0D1B3E',
//             lineHeight: 1.15, marginBottom: 14,
//             letterSpacing: '-.02em',
//           }}>{blog.title}</h1>

//           {/* Author + read time */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
//             <div style={{
//               width: 34, height: 34, borderRadius: '50%',
//               background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               fontSize: '.8rem', color: '#fff', fontWeight: 700, flexShrink: 0,
//             }}>{blog.author.charAt(0).toUpperCase()}</div>
//             <div>
//               <div style={{ fontSize: '.82rem', fontWeight: 700, color: '#0D1B3E' }}>{blog.author}</div>
//               <div style={{ fontSize: '.72rem', color: '#9AA5B4' }}>
//                 {blog.readTime || readingTime(blog.content)} min read
//               </div>
//             </div>
//           </div>

//           {/* Divider */}
//           <div style={{ height: 1, background: '#E4ECF7', marginBottom: 20 }} />

//           {/* Excerpt callout */}
//           <div style={{
//             background: 'linear-gradient(135deg,#EEF3FC,#F5F8FF)',
//             border: '1.5px solid #d4e0f7',
//             borderRadius: 14, padding: '14px 18px', marginBottom: 24,
//           }}>
//             <p style={{
//               fontSize: '.9rem', color: '#374151', lineHeight: 1.7,
//               fontStyle: 'italic', margin: 0,
//             }}>{blog.excerpt}</p>
//           </div>

//           {/* Main content */}
//           <div
//             className="bpModalContent"
//             dangerouslySetInnerHTML={{
//               __html: blog.content
//                 .replace(/^### (.+)$/gm, '<h3>$1</h3>')
//                 .replace(/^## (.+)$/gm, '<h2>$1</h2>')
//                 .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
//                 .replace(/`(.+?)`/g, '<code>$1</code>')
//                 .replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>')
//                 .replace(/^- (.+)$/gm, '<li>$1</li>')
//                 // ✅ wrap consecutive <li> items into <ul>
//                 .replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>')
//                 .replace(/\n\n/g, '</p><p>')
//                 // ✅ removed lookbehind (fixes build error)
//                 .replace(/^(?!<[hubl])/gm, '<p>')
//                 .replace(/$/gm, '</p>')
//                 // cleanup fixes
//                 .replace(/<p><\/p>/g, '')
//                 .replace(/<p>(<[hul])/g, '$1')
//                 .replace(/(<\/[hul][^>]*>)<\/p>/g, '$1'),
//             }}
//           />

//           {/* Tags */}
//           {blog.tags?.length > 0 && (
//             <div style={{ marginTop: 28, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
//               {blog.tags.map(t => (
//                 <span key={t} style={{
//                   background: '#EEF3FC', color: '#2352FF',
//                   borderRadius: 20, padding: '4px 12px',
//                   fontSize: '.72rem', fontWeight: 700,
//                 }}>#{t}</span>
//               ))}
//             </div>
//           )}

//           {/* Close footer */}
//           <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid #E4ECF7', textAlign: 'center' }}>
//             <button
//               onClick={onClose}
//               style={{
//                 background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
//                 color: '#fff', border: 'none', borderRadius: 40,
//                 padding: '12px 32px', fontFamily: 'Manrope,sans-serif',
//                 fontWeight: 700, fontSize: '.9rem', cursor: 'pointer',
//                 boxShadow: '0 4px 16px rgba(35,82,255,0.25)',
//               }}
//             >← Back to Blogs</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


// // ═════════════════════════════════════════════════════════════════════════════
// // BLOG CARD
// // ═════════════════════════════════════════════════════════════════════════════
// function BlogCard({ blog, onClick, index }: { blog: Blog; onClick: () => void; index: number }) {
//   const [hovered, setHovered] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const cs = catStyle(blog.category);

//   useEffect(() => {
//     const t = setTimeout(() => setMounted(true), index * 100);
//     return () => clearTimeout(t);
//   }, [index]);

//   return (
//     <div
//       onClick={onClick}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         flexShrink: 0,
//         width: 'clamp(280px, 32vw, 340px)',
//         background: '#fff',
//         border: `1.5px solid ${hovered ? '#2352FF' : '#E4ECF7'}`,
//         borderRadius: 24,
//         overflow: 'hidden',
//         cursor: 'pointer',
//         boxShadow: hovered
//           ? '0 16px 48px rgba(35,82,255,0.15)'
//           : '0 4px 20px rgba(35,82,255,0.06)',
//         transition: 'all .3s cubic-bezier(.22,1,.36,1)',
//         transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
//         opacity: mounted ? 1 : 0,
//         animation: mounted ? `bsCardIn .5s ${index * 0.1}s ease both` : 'none',
//       }}
//     >
//       {/* Cover */}
//       <div style={{
//         height: 190,
//         background: 'linear-gradient(135deg,#EEF3FC,#dce6fa)',
//         position: 'relative', overflow: 'hidden',
//       }}>
//         {blog.coverImage ? (
//           <img
//             src={blog.coverImage}
//             alt={blog.title}
//             style={{
//               width: '100%', height: '100%', objectFit: 'cover',
//               transition: 'transform .5s ease',
//               transform: hovered ? 'scale(1.06)' : 'scale(1)',
//             }}
//             onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
//           />
//         ) : (
//           <div style={{
//             width: '100%', height: '100%',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             fontSize: 48, opacity: 0.3,
//           }}>📝</div>
//         )}
//         {/* Gradient overlay */}
//         <div style={{
//           position: 'absolute', inset: 0,
//           background: 'linear-gradient(to bottom, transparent 50%, rgba(13,27,62,0.25) 100%)',
//           opacity: hovered ? 1 : 0, transition: 'opacity .3s',
//         }} />
//         {/* Category badge */}
//         <div style={{
//           position: 'absolute', top: 14, left: 14,
//           background: cs.bg, color: cs.text,
//           borderRadius: 20, padding: '4px 12px',
//           fontSize: '.68rem', fontWeight: 700, letterSpacing: '.04em',
//           boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//         }}>{blog.category}</div>
//         {/* Featured */}
//         {blog.featured && (
//           <div style={{
//             position: 'absolute', top: 14, right: 14,
//             background: 'rgba(255,255,255,0.9)',
//             borderRadius: 20, padding: '4px 10px',
//             fontSize: '.68rem', fontWeight: 700,
//             backdropFilter: 'blur(8px)',
//           }}>⭐ Featured</div>
//         )}
//       </div>

//       {/* Body */}
//       <div style={{ padding: '20px 22px 22px' }}>
//         {/* Title */}
//         <h3 style={{
//           fontFamily: 'Syne, sans-serif',
//           fontSize: '1rem', fontWeight: 800,
//           color: '#0D1B3E', lineHeight: 1.3,
//           marginBottom: 10, letterSpacing: '-.01em',
//           display: '-webkit-box',
//           WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
//           overflow: 'hidden',
//         }}>{blog.title}</h3>

//         {/* Excerpt */}
//         <p style={{
//           fontSize: '.82rem', color: '#6B7280',
//           lineHeight: 1.65, marginBottom: 16,
//           display: '-webkit-box',
//           WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
//           overflow: 'hidden',
//         }}>{blog.excerpt}</p>

//         {/* Divider */}
//         <div style={{ height: 1, background: '#F0F4FB', marginBottom: 14 }} />

//         {/* Footer */}
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//             <div style={{
//               width: 28, height: 28, borderRadius: '50%',
//               background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               fontSize: '.68rem', color: '#fff', fontWeight: 700,
//             }}>{blog.author.charAt(0).toUpperCase()}</div>
//             <div>
//               <div style={{ fontSize: '.75rem', fontWeight: 700, color: '#0D1B3E' }}>{blog.author}</div>
//               <div style={{ fontSize: '.68rem', color: '#9AA5B4' }}>{fmtDate(blog.createdAt)}</div>
//             </div>
//           </div>
//           <div style={{
//             display: 'flex', alignItems: 'center', gap: 5,
//             color: hovered ? '#2352FF' : '#9AA5B4',
//             fontSize: '.75rem', fontWeight: 700,
//             transition: 'color .25s',
//           }}>
//             <span>📖</span>
//             <span>{blog.readTime || readingTime(blog.content)} min</span>
//           </div>
//         </div>

//         {/* Read CTA */}
//         <div style={{
//           marginTop: 14,
//           background: hovered ? 'linear-gradient(135deg,#2352FF,#1a3fd4)' : '#EEF3FC',
//           color: hovered ? '#fff' : '#2352FF',
//           borderRadius: 40, padding: '9px 0',
//           textAlign: 'center', fontSize: '.8rem', fontWeight: 700,
//           transition: 'all .3s',
//         }}>
//           {hovered ? 'Read Article →' : 'Read More'}
//         </div>
//       </div>
//     </div>
//   );
// }


// // ═════════════════════════════════════════════════════════════════════════════
// // MAIN SECTION
// // ═════════════════════════════════════════════════════════════════════════════
// export default function BlogsSection() {
//   const router = useRouter();
//   const goToBlogs = () => router.push('/blogs');

//   const [blogs,       setBlogs]       = useState<Blog[]>([]);
//   const [loading,     setLoading]     = useState(true);
//   const [selected,    setSelected]    = useState<Blog | null>(null);
//   const [mounted,     setMounted]     = useState(false);
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [canScrollL, setCanScrollL]  = useState(false);
//   const [canScrollR, setCanScrollR]  = useState(false);

//   useEffect(() => { setMounted(true); }, []);

//   // Fetch latest 4 enabled blogs
//   useEffect(() => {
//     const fetch = async () => {
//       setLoading(true);
//       try {
//         const snap = await getDocs(
//           query(
//             collection(db, 'blogs'),
//             where('enabled', '==', true),
//             orderBy('createdAt', 'desc'),
//             limit(4),
//           ),
//         );
//         setBlogs(snap.docs.map(d => ({ id: d.id, ...d.data() } as Blog)));
//       } catch (e) {
//         console.error('Failed to fetch blogs', e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetch();
//   }, []);

//   // Track scroll arrows
//   const updateArrows = () => {
//     const el = scrollRef.current;
//     if (!el) return;
//     setCanScrollL(el.scrollLeft > 10);
//     setCanScrollR(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
//   };
//   useEffect(() => {
//     const el = scrollRef.current;
//     if (!el) return;
//     el.addEventListener('scroll', updateArrows, { passive: true });
//     updateArrows();
//     return () => el.removeEventListener('scroll', updateArrows);
//   }, [blogs]);

//   const scroll = (dir: 'l' | 'r') => {
//     scrollRef.current?.scrollBy({ left: dir === 'r' ? 360 : -360, behavior: 'smooth' });
//   };

//   if (!loading && blogs.length === 0) return null;

//   return (
//     <>
//       <style>{`
//         @keyframes bsCardIn {
//           from { opacity:0; transform:translateY(24px); }
//           to   { opacity:1; transform:translateY(0);    }
//         }
//         @keyframes bsFadeUp {
//           from { opacity:0; transform:translateY(20px); }
//           to   { opacity:1; transform:translateY(0);    }
//         }
//         .bsScroll::-webkit-scrollbar { display:none }
//         .bsScroll { -ms-overflow-style:none; scrollbar-width:none }
//         .bsArrow { width:42px; height:42px; border-radius:50%; border:1.5px solid #E4ECF7; background:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:16px; box-shadow:0 2px 12px rgba(35,82,255,0.08); transition:all .2s; color:#0D1B3E; flex-shrink:0 }
//         .bsArrow:hover { background:#2352FF; color:#fff; border-color:#2352FF; box-shadow:0 4px 18px rgba(35,82,255,0.25); }
//         .bsArrow:disabled { opacity:.3; cursor:default }
//         .bsArrow:hover:disabled { background:#fff; color:#0D1B3E; border-color:#E4ECF7; box-shadow:none }
//       `}</style>

//       <section
//         id="blogs"
//         style={{
//           padding: '80px 0 80px',
//           position: 'relative',
//           overflow: 'hidden',
//           background: 'transparent',
//         }}
//       >
//         {/* Subtle ambient blobs matching hero */}
//         <div style={{
//           position: 'absolute', width: 420, height: 420, borderRadius: '50%',
//           background: 'radial-gradient(circle, rgba(35,82,255,0.055) 0%, transparent 70%)',
//           top: -80, right: -60, zIndex: 0, pointerEvents: 'none',
//         }} />
//         <div style={{
//           position: 'absolute', width: 300, height: 300, borderRadius: '50%',
//           background: 'radial-gradient(circle, rgba(255,79,23,0.04) 0%, transparent 70%)',
//           bottom: 40, left: -60, zIndex: 0, pointerEvents: 'none',
//         }} />

//         <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

//           {/* ── Header ── */}
//           <div style={{
//             display: 'flex', alignItems: 'flex-end',
//             justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
//             marginBottom: 40,
//             animation: mounted ? 'bsFadeUp .7s ease both' : 'none',
//           }}>
//             <div>
//               {/* Section label pill */}
//               <div style={{
//                 display: 'inline-flex', alignItems: 'center', gap: 8,
//                 background: '#fff', border: '1.5px solid #E4ECF7',
//                 borderRadius: 60, padding: '6px 16px 6px 10px',
//                 marginBottom: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//               }}>
//                 <span style={{ fontSize: 14 }}>📝</span>
//                 <span style={{
//                   fontSize: '.72rem', fontWeight: 700, color: '#0D1B3E',
//                   letterSpacing: '.07em', textTransform: 'uppercase',
//                 }}>Our Blog</span>
//               </div>

//               <h2 style={{
//                 fontFamily: 'Syne, sans-serif',
//                 fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
//                 fontWeight: 800, color: '#0D1B3E',
//                 lineHeight: 1.1, letterSpacing: '-.025em', margin: 0,
//               }}>
//                 Insights &amp;{' '}
//                 <span style={{ color: '#2352FF', position: 'relative', display: 'inline-block' }}>
//                   Expert Tips
//                   <svg viewBox="0 0 180 10" xmlns="http://www.w3.org/2000/svg"
//                     style={{ position: 'absolute', bottom: -4, left: 0, width: '100%', height: 7, opacity: 0.35 }}>
//                     <path d="M2 7 Q45 2 90 7 Q135 12 178 7"
//                       stroke="#2352FF" strokeWidth="3" fill="none" strokeLinecap="round" />
//                   </svg>
//                 </span>
//               </h2>
//               <p style={{ color: '#6B7280', fontSize: '.9rem', marginTop: 8 }}>
//                 Strategy, trends and actionable advice from our team.
//               </p>
//             </div>

//             {/* Arrow nav only */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//               <button
//                 className="bsArrow"
//                 disabled={!canScrollL}
//                 onClick={() => scroll('l')}
//                 aria-label="Scroll left"
//               >←</button>
//               <button
//                 className="bsArrow"
//                 disabled={!canScrollR}
//                 onClick={() => scroll('r')}
//                 aria-label="Scroll right"
//               >→</button>
//             </div>
//           </div>

//           {/* ── Cards ── */}
//           {loading ? (
//             <div style={{ display: 'flex', gap: 20 }}>
//               {[0, 1, 2, 3].map(i => (
//                 <div key={i} style={{
//                   flexShrink: 0, width: 'clamp(280px,32vw,340px)', height: 360,
//                   background: '#fff', borderRadius: 24,
//                   border: '1.5px solid #E4ECF7',
//                   animation: 'pulse 1.5s ease-in-out infinite',
//                   opacity: 1 - i * 0.15,
//                 }} />
//               ))}
//               <style>{`@keyframes pulse{0%,100%{opacity:.6}50%{opacity:.3}}`}</style>
//             </div>
//           ) : (
//             <div
//               ref={scrollRef}
//               className="bsScroll"
//               style={{
//                 display: 'flex', gap: 20,
//                 overflowX: 'auto', paddingBottom: 8,
//                 cursor: 'grab',
//               }}
//               onMouseDown={e => {
//                 const el = scrollRef.current!;
//                 const startX = e.pageX - el.offsetLeft;
//                 const startScroll = el.scrollLeft;
//                 el.style.cursor = 'grabbing';
//                 const move = (ev: MouseEvent) => {
//                   const x = ev.pageX - el.offsetLeft;
//                   el.scrollLeft = startScroll - (x - startX);
//                 };
//                 const up = () => {
//                   el.style.cursor = 'grab';
//                   window.removeEventListener('mousemove', move);
//                   window.removeEventListener('mouseup', up);
//                 };
//                 window.addEventListener('mousemove', move);
//                 window.addEventListener('mouseup', up);
//               }}
//             >
//               {blogs.map((blog, i) => (
//                 <BlogCard
//                   key={blog.id}
//                   blog={blog}
//                   index={i}
//                   onClick={() => setSelected(blog)}
//                 />
//               ))}

//               {/* View All card at end */}
//               <div
//                 onClick={goToBlogs}
//                   style={{
//                     flexShrink: 0,
//                     width: 'clamp(200px,22vw,240px)',
//                     minHeight: 360,
//                     border: '2px dashed #C8D8F0',
//                     borderRadius: 24,
//                     display: 'flex', flexDirection: 'column',
//                     alignItems: 'center', justifyContent: 'center',
//                     gap: 14, cursor: 'pointer',
//                     background: 'linear-gradient(135deg,#F8FAFF,#EEF3FC)',
//                     transition: 'all .3s',
//                   }}
//                   onMouseEnter={e => {
//                     (e.currentTarget as HTMLDivElement).style.borderColor = '#2352FF';
//                     (e.currentTarget as HTMLDivElement).style.background = 'linear-gradient(135deg,#EEF3FC,#dce6fa)';
//                     (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
//                   }}
//                   onMouseLeave={e => {
//                     (e.currentTarget as HTMLDivElement).style.borderColor = '#C8D8F0';
//                     (e.currentTarget as HTMLDivElement).style.background = 'linear-gradient(135deg,#F8FAFF,#EEF3FC)';
//                     (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
//                   }}
//                 >
//                   <div style={{
//                     width: 56, height: 56, borderRadius: '50%',
//                     background: '#EEF3FC', border: '1.5px solid #d4e0f7',
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     fontSize: 24,
//                   }}>📚</div>
//                   <div style={{
//                     fontFamily: 'Syne, sans-serif',
//                     fontSize: '1rem', fontWeight: 800,
//                     color: '#0D1B3E', textAlign: 'center', lineHeight: 1.3,
//                   }}>See All<br />Blogs</div>
//                   <div style={{
//                     width: 36, height: 36, borderRadius: '50%',
//                     background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     color: '#fff', fontSize: 16, fontWeight: 700,
//                   }}>→</div>
//                 </div>
//             </div>
//           )}

//           {/* ── View All CTA — always visible below cards ── */}
//           {!loading && (
//             <div style={{
//               marginTop: 40,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               gap: 20,
//               flexWrap: 'wrap',
//               animation: mounted ? 'bsFadeUp .7s .4s ease both' : 'none',
//             }}>
//               <div style={{ flex: 1, minWidth: 40, maxWidth: 200, height: 1, background: 'linear-gradient(to right,transparent,#E4ECF7)' }} />

//               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
//                 <p style={{ fontSize: '.82rem', color: '#9AA5B4', fontWeight: 600, margin: 0 }}>
//                   Want to read more? We publish weekly.
//                 </p>
//                 <button
//                   onClick={goToBlogs}
//                   onMouseEnter={e => {
//                     (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.04)';
//                     (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 32px rgba(35,82,255,0.35)';
//                   }}
//                   onMouseLeave={e => {
//                     (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
//                     (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(35,82,255,0.25)';
//                   }}
//                   style={{
//                     background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
//                     color: '#fff', border: 'none', borderRadius: 40,
//                     padding: '14px 36px',
//                     fontFamily: 'Manrope, sans-serif',
//                     fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
//                     boxShadow: '0 4px 20px rgba(35,82,255,0.25)',
//                     transition: 'all .25s cubic-bezier(.22,1,.36,1)',
//                     display: 'flex', alignItems: 'center', gap: 10,
//                     letterSpacing: '-.01em',
//                   }}
//                 >
//                   <span>📚</span>
//                   <span>View All Blogs</span>
//                   <span style={{
//                     background: 'rgba(255,255,255,0.2)',
//                     borderRadius: 20, padding: '2px 10px',
//                     fontSize: '.8rem',
//                   }}>→</span>
//                 </button>
//               </div>

//               <div style={{ flex: 1, minWidth: 40, maxWidth: 200, height: 1, background: 'linear-gradient(to left,transparent,#E4ECF7)' }} />
//             </div>
//           )}

//         </div>
//       </section>

//       {/* Modal */}
//       {selected && <BlogModal blog={selected} onClose={() => setSelected(null)} />}
//     </>
//   );
// }



'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  collection, getDocs, query, orderBy, where, limit, Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmtDate = (ts: Timestamp | null) =>
  ts
    ? new Date(ts.seconds * 1000).toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
      })
    : '';

const readingTime = (content: string) =>
  Math.max(1, Math.ceil(content.split(/\s+/).length / 200));

// ── Category accent colours ───────────────────────────────────────────────────
const CAT_COLOR: Record<string, { bg: string; text: string }> = {
  'SEO':              { bg: '#EEF3FC', text: '#2352FF' },
  'Digital Marketing':{ bg: '#FFF0ED', text: '#FF4F17' },
  'Content Marketing':{ bg: '#E8F9F0', text: '#1A8C4E' },
  'Social Media':     { bg: '#FFF7E6', text: '#D97706' },
  'Paid Ads':         { bg: '#F3EEFF', text: '#7C3AED' },
  'Analytics':        { bg: '#E0F7FA', text: '#0288D1' },
  'Branding':         { bg: '#FCE8F3', text: '#C2185B' },
  'Technology':       { bg: '#E8F5E9', text: '#2E7D32' },
};
const catStyle = (cat: string) =>
  CAT_COLOR[cat] ?? { bg: '#F1F3F5', text: '#6B7280' };

// ── Shared markdown → HTML (no ES2018 flags) ─────────────────────────────────
const mdToHtml = (content: string) =>
  content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm,  '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>')   // ✅ no /s flag
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hubl])/gm, '<p>')               // ✅ no lookbehind
    .replace(/$/gm, '</p>')
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<[hul])/g, '$1')
    .replace(/(<\/[hul][^>]*>)<\/p>/g, '$1');


// ═════════════════════════════════════════════════════════════════════════════
// MODAL
// ═════════════════════════════════════════════════════════════════════════════
function BlogModal({ blog, onClose }: { blog: Blog; onClose: () => void }) {
  const cs = catStyle(blog.category);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <>
      <style>{`
        @keyframes bsModalIn {
          from { opacity:0; transform:translateY(30px) scale(.97); }
          to   { opacity:1; transform:translateY(0)    scale(1);   }
        }
        @keyframes bsBackdropIn { from{opacity:0} to{opacity:1} }
        .bsModal::-webkit-scrollbar { width:5px }
        .bsModal::-webkit-scrollbar-thumb { background:#E4ECF7; border-radius:10px }
        .bsModalContent p { line-height:1.9; color:#374151; margin-bottom:14px; font-size:.93rem }
        .bsModalContent h2,.bsModalContent h3 { font-family:'Syne',sans-serif; color:#0D1B3E; margin:24px 0 10px; font-weight:800 }
        .bsModalContent ul,.bsModalContent ol { padding-left:20px; color:#374151; margin-bottom:14px; font-size:.93rem; line-height:1.9 }
        .bsModalContent strong { color:#0D1B3E }
        .bsModalContent code { background:#EEF3FC; color:#2352FF; padding:2px 6px; border-radius:5px; font-size:.85em; font-family:monospace }
        .bsModalContent blockquote { border-left:3px solid #2352FF; padding:4px 16px; margin:16px 0; background:#F8FAFF; border-radius:0 8px 8px 0 }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(13,27,62,0.45)',
          backdropFilter: 'blur(6px)',
          zIndex: 1000,
          animation: 'bsBackdropIn .25s ease',
        }}
      />

      {/* Panel */}
      <div
        className="bsModal"
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: 'min(680px, 100vw)',
          background: '#fff',
          zIndex: 1001,
          overflowY: 'auto',
          boxShadow: '-20px 0 60px rgba(13,27,62,0.15)',
          animation: 'bsModalIn .35s cubic-bezier(.22,1,.36,1)',
        }}
      >
        {/* Cover image */}
        {blog.coverImage ? (
          <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
            <img
              src={blog.coverImage}
              alt={blog.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, transparent 40%, rgba(13,27,62,0.5) 100%)',
            }} />
            <button onClick={onClose} style={{
              position: 'absolute', top: 16, right: 16,
              background: 'rgba(255,255,255,0.9)',
              border: 'none', borderRadius: 30, width: 36, height: 36,
              cursor: 'pointer', fontSize: 16, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#0D1B3E', backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }}>✕</button>
          </div>
        ) : (
          <div style={{
            height: 140, background: 'linear-gradient(135deg,#EEF3FC,#dce6fa)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <span style={{ fontSize: 52, opacity: 0.4 }}>📝</span>
            <button onClick={onClose} style={{
              position: 'absolute', top: 16, right: 16,
              background: '#fff', border: '1.5px solid #E4ECF7',
              borderRadius: 30, width: 36, height: 36,
              cursor: 'pointer', fontSize: 16, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#0D1B3E',
            }}>✕</button>
          </div>
        )}

        {/* Content */}
        <div style={{ padding: '28px 32px 48px' }}>
          {/* Meta row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            <span style={{
              background: cs.bg, color: cs.text,
              borderRadius: 20, padding: '3px 12px',
              fontSize: '.72rem', fontWeight: 700, letterSpacing: '.04em',
            }}>{blog.category}</span>
            {blog.featured && (
              <span style={{
                background: '#FFF7E6', color: '#D97706',
                borderRadius: 20, padding: '3px 12px',
                fontSize: '.72rem', fontWeight: 700,
              }}>⭐ Featured</span>
            )}
            <span style={{ fontSize: '.78rem', color: '#9AA5B4', marginLeft: 'auto' }}>
              {fmtDate(blog.createdAt)}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(1.4rem,3vw,2rem)',
            fontWeight: 800, color: '#0D1B3E',
            lineHeight: 1.15, marginBottom: 14,
            letterSpacing: '-.02em',
          }}>{blog.title}</h1>

          {/* Author + read time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '.8rem', color: '#fff', fontWeight: 700, flexShrink: 0,
            }}>{blog.author.charAt(0).toUpperCase()}</div>
            <div>
              <div style={{ fontSize: '.82rem', fontWeight: 700, color: '#0D1B3E' }}>{blog.author}</div>
              <div style={{ fontSize: '.72rem', color: '#9AA5B4' }}>
                {blog.readTime || readingTime(blog.content)} min read
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: '#E4ECF7', marginBottom: 20 }} />

          {/* Excerpt callout */}
          <div style={{
            background: 'linear-gradient(135deg,#EEF3FC,#F5F8FF)',
            border: '1.5px solid #d4e0f7',
            borderRadius: 14, padding: '14px 18px', marginBottom: 24,
          }}>
            <p style={{
              fontSize: '.9rem', color: '#374151', lineHeight: 1.7,
              fontStyle: 'italic', margin: 0,
            }}>{blog.excerpt}</p>
          </div>

          {/* Main content */}
          <div
            className="bsModalContent"
            dangerouslySetInnerHTML={{ __html: mdToHtml(blog.content) }}
          />

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div style={{ marginTop: 28, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {blog.tags.map(t => (
                <span key={t} style={{
                  background: '#EEF3FC', color: '#2352FF',
                  borderRadius: 20, padding: '4px 12px',
                  fontSize: '.72rem', fontWeight: 700,
                }}>#{t}</span>
              ))}
            </div>
          )}

          {/* Close footer */}
          <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid #E4ECF7', textAlign: 'center' }}>
            <button
              onClick={onClose}
              style={{
                background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
                color: '#fff', border: 'none', borderRadius: 40,
                padding: '12px 32px', fontFamily: 'Manrope,sans-serif',
                fontWeight: 700, fontSize: '.9rem', cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(35,82,255,0.25)',
              }}
            >← Back to Blogs</button>
          </div>
        </div>
      </div>
    </>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// BLOG CARD
// ═════════════════════════════════════════════════════════════════════════════
function BlogCard({ blog, onClick, index }: { blog: Blog; onClick: () => void; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cs = catStyle(blog.category);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), index * 100);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: 'clamp(280px, 32vw, 340px)',
        background: '#fff',
        border: `1.5px solid ${hovered ? '#2352FF' : '#E4ECF7'}`,
        borderRadius: 24,
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: hovered
          ? '0 16px 48px rgba(35,82,255,0.15)'
          : '0 4px 20px rgba(35,82,255,0.06)',
        transition: 'all .3s cubic-bezier(.22,1,.36,1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        opacity: mounted ? 1 : 0,
        animation: mounted ? `bsCardIn .5s ${index * 0.1}s ease both` : 'none',
      }}
    >
      {/* Cover */}
      <div style={{
        height: 190,
        background: 'linear-gradient(135deg,#EEF3FC,#dce6fa)',
        position: 'relative', overflow: 'hidden',
      }}>
        {blog.coverImage ? (
          <img
            src={blog.coverImage}
            alt={blog.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform .5s ease',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 48, opacity: 0.3,
          }}>📝</div>
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 50%, rgba(13,27,62,0.25) 100%)',
          opacity: hovered ? 1 : 0, transition: 'opacity .3s',
        }} />
        <div style={{
          position: 'absolute', top: 14, left: 14,
          background: cs.bg, color: cs.text,
          borderRadius: 20, padding: '4px 12px',
          fontSize: '.68rem', fontWeight: 700, letterSpacing: '.04em',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}>{blog.category}</div>
        {blog.featured && (
          <div style={{
            position: 'absolute', top: 14, right: 14,
            background: 'rgba(255,255,255,0.9)',
            borderRadius: 20, padding: '4px 10px',
            fontSize: '.68rem', fontWeight: 700,
            backdropFilter: 'blur(8px)',
          }}>⭐ Featured</div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '20px 22px 22px' }}>
        <h3 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '1rem', fontWeight: 800,
          color: '#0D1B3E', lineHeight: 1.3,
          marginBottom: 10, letterSpacing: '-.01em',
          display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>{blog.title}</h3>

        <p style={{
          fontSize: '.82rem', color: '#6B7280',
          lineHeight: 1.65, marginBottom: 16,
          display: '-webkit-box',
          WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>{blog.excerpt}</p>

        <div style={{ height: 1, background: '#F0F4FB', marginBottom: 14 }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '.68rem', color: '#fff', fontWeight: 700,
            }}>{blog.author.charAt(0).toUpperCase()}</div>
            <div>
              <div style={{ fontSize: '.75rem', fontWeight: 700, color: '#0D1B3E' }}>{blog.author}</div>
              <div style={{ fontSize: '.68rem', color: '#9AA5B4' }}>{fmtDate(blog.createdAt)}</div>
            </div>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            color: hovered ? '#2352FF' : '#9AA5B4',
            fontSize: '.75rem', fontWeight: 700,
            transition: 'color .25s',
          }}>
            <span>📖</span>
            <span>{blog.readTime || readingTime(blog.content)} min</span>
          </div>
        </div>

        <div style={{
          marginTop: 14,
          background: hovered ? 'linear-gradient(135deg,#2352FF,#1a3fd4)' : '#EEF3FC',
          color: hovered ? '#fff' : '#2352FF',
          borderRadius: 40, padding: '9px 0',
          textAlign: 'center', fontSize: '.8rem', fontWeight: 700,
          transition: 'all .3s',
        }}>
          {hovered ? 'Read Article →' : 'Read More'}
        </div>
      </div>
    </div>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
// MAIN SECTION
// ═════════════════════════════════════════════════════════════════════════════
export default function BlogsSection() {
  const router = useRouter();
  const goToBlogs = () => router.push('/blogs');

  const [blogs,    setBlogs]    = useState<Blog[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState<Blog | null>(null);
  const [mounted,  setMounted]  = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollL, setCanScrollL] = useState(false);
  const [canScrollR, setCanScrollR] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const snap = await getDocs(
          query(
            collection(db, 'blogs'),
            where('enabled', '==', true),
            orderBy('createdAt', 'desc'),
            limit(4),
          ),
        );
        setBlogs(snap.docs.map(d => ({ id: d.id, ...d.data() } as Blog)));
      } catch (e) {
        console.error('Failed to fetch blogs', e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollL(el.scrollLeft > 10);
    setCanScrollR(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows, { passive: true });
    updateArrows();
    return () => el.removeEventListener('scroll', updateArrows);
  }, [blogs]);

  const scroll = (dir: 'l' | 'r') => {
    scrollRef.current?.scrollBy({ left: dir === 'r' ? 360 : -360, behavior: 'smooth' });
  };

  if (!loading && blogs.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes bsCardIn {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes bsFadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        .bsScroll::-webkit-scrollbar { display:none }
        .bsScroll { -ms-overflow-style:none; scrollbar-width:none }
        .bsArrow { width:42px; height:42px; border-radius:50%; border:1.5px solid #E4ECF7; background:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:16px; box-shadow:0 2px 12px rgba(35,82,255,0.08); transition:all .2s; color:#0D1B3E; flex-shrink:0 }
        .bsArrow:hover { background:#2352FF; color:#fff; border-color:#2352FF; box-shadow:0 4px 18px rgba(35,82,255,0.25); }
        .bsArrow:disabled { opacity:.3; cursor:default }
        .bsArrow:hover:disabled { background:#fff; color:#0D1B3E; border-color:#E4ECF7; box-shadow:none }
      `}</style>

      <section
        id="blogs"
        style={{
          padding: '80px 0 80px',
          position: 'relative',
          overflow: 'hidden',
          background: 'transparent',
        }}
      >
        <div style={{
          position: 'absolute', width: 420, height: 420, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(35,82,255,0.055) 0%, transparent 70%)',
          top: -80, right: -60, zIndex: 0, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,79,23,0.04) 0%, transparent 70%)',
          bottom: 40, left: -60, zIndex: 0, pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

          {/* ── Header ── */}
          <div style={{
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
            marginBottom: 40,
            animation: mounted ? 'bsFadeUp .7s ease both' : 'none',
          }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#fff', border: '1.5px solid #E4ECF7',
                borderRadius: 60, padding: '6px 16px 6px 10px',
                marginBottom: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}>
                <span style={{ fontSize: 14 }}>📝</span>
                <span style={{
                  fontSize: '.72rem', fontWeight: 700, color: '#0D1B3E',
                  letterSpacing: '.07em', textTransform: 'uppercase',
                }}>Our Blog</span>
              </div>

              <h2 style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                fontWeight: 800, color: '#0D1B3E',
                lineHeight: 1.1, letterSpacing: '-.025em', margin: 0,
              }}>
                Insights &amp;{' '}
                <span style={{ color: '#2352FF', position: 'relative', display: 'inline-block' }}>
                  Expert Tips
                  <svg viewBox="0 0 180 10" xmlns="http://www.w3.org/2000/svg"
                    style={{ position: 'absolute', bottom: -4, left: 0, width: '100%', height: 7, opacity: 0.35 }}>
                    <path d="M2 7 Q45 2 90 7 Q135 12 178 7"
                      stroke="#2352FF" strokeWidth="3" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
              <p style={{ color: '#6B7280', fontSize: '.9rem', marginTop: 8 }}>
                Strategy, trends and actionable advice from our team.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                className="bsArrow"
                disabled={!canScrollL}
                onClick={() => scroll('l')}
                aria-label="Scroll left"
              >←</button>
              <button
                className="bsArrow"
                disabled={!canScrollR}
                onClick={() => scroll('r')}
                aria-label="Scroll right"
              >→</button>
            </div>
          </div>

          {/* ── Cards ── */}
          {loading ? (
            <div style={{ display: 'flex', gap: 20 }}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} style={{
                  flexShrink: 0, width: 'clamp(280px,32vw,340px)', height: 360,
                  background: '#fff', borderRadius: 24,
                  border: '1.5px solid #E4ECF7',
                  animation: 'pulse 1.5s ease-in-out infinite',
                  opacity: 1 - i * 0.15,
                }} />
              ))}
              <style>{`@keyframes pulse{0%,100%{opacity:.6}50%{opacity:.3}}`}</style>
            </div>
          ) : (
            <div
              ref={scrollRef}
              className="bsScroll"
              style={{
                display: 'flex', gap: 20,
                overflowX: 'auto', paddingBottom: 8,
                cursor: 'grab',
              }}
              onMouseDown={e => {
                const el = scrollRef.current!;
                const startX = e.pageX - el.offsetLeft;
                const startScroll = el.scrollLeft;
                el.style.cursor = 'grabbing';
                const move = (ev: MouseEvent) => {
                  const x = ev.pageX - el.offsetLeft;
                  el.scrollLeft = startScroll - (x - startX);
                };
                const up = () => {
                  el.style.cursor = 'grab';
                  window.removeEventListener('mousemove', move);
                  window.removeEventListener('mouseup', up);
                };
                window.addEventListener('mousemove', move);
                window.addEventListener('mouseup', up);
              }}
            >
              {blogs.map((blog, i) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  index={i}
                  onClick={() => setSelected(blog)}
                />
              ))}

              {/* View All card */}
              <div
                onClick={goToBlogs}
                style={{
                  flexShrink: 0,
                  width: 'clamp(200px,22vw,240px)',
                  minHeight: 360,
                  border: '2px dashed #C8D8F0',
                  borderRadius: 24,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: 14, cursor: 'pointer',
                  background: 'linear-gradient(135deg,#F8FAFF,#EEF3FC)',
                  transition: 'all .3s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#2352FF';
                  (e.currentTarget as HTMLDivElement).style.background = 'linear-gradient(135deg,#EEF3FC,#dce6fa)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#C8D8F0';
                  (e.currentTarget as HTMLDivElement).style.background = 'linear-gradient(135deg,#F8FAFF,#EEF3FC)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: '#EEF3FC', border: '1.5px solid #d4e0f7',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24,
                }}>📚</div>
                <div style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '1rem', fontWeight: 800,
                  color: '#0D1B3E', textAlign: 'center', lineHeight: 1.3,
                }}>See All<br />Blogs</div>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 16, fontWeight: 700,
                }}>→</div>
              </div>
            </div>
          )}

          {/* ── View All CTA ── */}
          {!loading && (
            <div style={{
              marginTop: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              flexWrap: 'wrap',
              animation: mounted ? 'bsFadeUp .7s .4s ease both' : 'none',
            }}>
              <div style={{ flex: 1, minWidth: 40, maxWidth: 200, height: 1, background: 'linear-gradient(to right,transparent,#E4ECF7)' }} />

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <p style={{ fontSize: '.82rem', color: '#9AA5B4', fontWeight: 600, margin: 0 }}>
                  Want to read more? We publish weekly.
                </p>
                <button
                  onClick={goToBlogs}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.04)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 32px rgba(35,82,255,0.35)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(35,82,255,0.25)';
                  }}
                  style={{
                    background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
                    color: '#fff', border: 'none', borderRadius: 40,
                    padding: '14px 36px',
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(35,82,255,0.25)',
                    transition: 'all .25s cubic-bezier(.22,1,.36,1)',
                    display: 'flex', alignItems: 'center', gap: 10,
                    letterSpacing: '-.01em',
                  }}
                >
                  <span>📚</span>
                  <span>View All Blogs</span>
                  <span style={{
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: 20, padding: '2px 10px',
                    fontSize: '.8rem',
                  }}>→</span>
                </button>
              </div>

              <div style={{ flex: 1, minWidth: 40, maxWidth: 200, height: 1, background: 'linear-gradient(to left,transparent,#E4ECF7)' }} />
            </div>
          )}

        </div>
      </section>

      {selected && <BlogModal blog={selected} onClose={() => setSelected(null)} />}
    </>
  );
}