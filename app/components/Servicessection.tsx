


// 'use client';

// import { useEffect, useRef } from 'react';
// import Image from 'next/image';

// const SERVICES = [
//   {
//     icon: '📱',
//     title: 'Social Media Marketing',
//     desc: 'Daily-optimised strategies that build audiences and convert followers into loyal customers.',
//     tag: 'Growth',
//     image: 'https://res.cloudinary.com/dk05wqwo1/image/upload/v1777824599/Gemini_Generated_Image_5zid8s5zid8s5zid_d739xi.png',
//     accent: '#2352FF',
//   },
//   {
//     icon: '🎯',
//     title: 'Paid Advertising',
//     desc: 'High-converting Meta & Google ads — creative hooks, precise targeting, relentless testing.',
//     tag: 'Performance',
//     image: 'https://res.cloudinary.com/dk05wqwo1/image/upload/v1777824616/Gemini_Generated_Image_g4g8rig4g8rig4g8_dnztmn.png',
//     accent: '#FF4F17',
//   },
//   {
//     icon: '🌐',
//     title: 'Web Design & Dev',
//     desc: 'Landing pages engineered for conversion — fast, beautiful, and built to sell.',
//     tag: 'Digital',
//     image: 'https://res.cloudinary.com/dk05wqwo1/image/upload/v1777824637/Gemini_Generated_Image_3ng7y23ng7y23ng7_lmroa9.png',
//     accent: '#2352FF',
//   },
//   {
//     icon: '🎨',
//     title: 'Brand Identity',
//     desc: 'Logo, palette, voice, and visual language — a cohesive identity that makes you unforgettable.',
//     tag: 'Branding',
//     image: 'https://res.cloudinary.com/dk05wqwo1/image/upload/v1777824660/Gemini_Generated_Image_b8j6uub8j6uub8j6_dfohns.png',
//     accent: '#FF4F17',
//   },
//   {
//     icon: '📊',
//     title: 'Digital Strategy',
//     desc: 'End-to-end marketing blueprints aligned to your goals. Clear direction, measurable outcomes.',
//     tag: 'Strategy',
//     image: 'https://res.cloudinary.com/dk05wqwo1/image/upload/v1777824681/Gemini_Generated_Image_izgqdaizgqdaizgq_igabvf.png',
//     accent: '#2352FF',
//   },
//   {
//     icon: '🤖',
//     title: 'AI Growth Systems',
//     desc: 'Automation and AI-powered insights that let you scale faster and outpace the competition.',
//     tag: 'AI & Tech',
//     image: 'https://res.cloudinary.com/dk05wqwo1/image/upload/v1777824703/Gemini_Generated_Image_5yobaj5yobaj5yob_x6vuv1.png',
//     accent: '#FF4F17',
//   },
// ];

// interface ServicesSectionProps {
//   onGetStarted?: () => void;
// }

// export default function ServicesSection({ onGetStarted }: ServicesSectionProps) {
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const io = new IntersectionObserver(
//       entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('sv2-in')),
//       { threshold: 0.07 }
//     );
//     ref.current?.querySelectorAll('.sv2-anim').forEach(el => io.observe(el));
//     return () => io.disconnect();
//   }, []);

//   return (
//     <section
//       id="services"
//       ref={ref}
//       style={{
//         background: '#F7F9FE',
//         padding: 'clamp(80px,10vw,120px) 0',
//         position: 'relative',
//         overflow: 'hidden',
//         fontFamily: "'DM Sans', sans-serif",
//       }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

//         .sv2-anim {
//           opacity: 0;
//           transform: translateY(20px);
//           transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1),
//                       transform 0.65s cubic-bezier(0.22,1,0.36,1);
//         }
//         .sv2-anim.sv2-in { opacity: 1; transform: translateY(0); }

//         .sv2-card {
//           background: #fff;
//           border: 1.5px solid #E8EEF8;
//           border-radius: 20px;
//           overflow: hidden;
//           transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
//           cursor: default;
//         }
//         .sv2-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 18px 48px rgba(13,27,62,0.10);
//           border-color: rgba(35,82,255,0.15);
//         }
//         .sv2-card:hover .sv2-img {
//           transform: scale(1.05);
//         }
//         .sv2-img {
//           transition: transform 0.48s ease;
//         }
//         .sv2-learn {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           font-size: 0.8rem;
//           font-weight: 700;
//           cursor: pointer;
//           letter-spacing: 0.01em;
//           transition: gap 0.2s ease;
//           text-decoration: none;
//           background: none;
//           border: none;
//           padding: 0;
//         }
//         .sv2-learn:hover { gap: 11px !important; }

//         .sv2-cta-btn {
//           display: inline-flex; align-items: center; gap: 7px;
//           background: linear-gradient(135deg, #FF4F17, #ff6b3d);
//           color: #fff; border: none; border-radius: 60px;
//           padding: 13px 26px;
//           font-family: 'Syne', sans-serif;
//           font-weight: 700; font-size: 0.9rem;
//           cursor: pointer;
//           box-shadow: 0 4px 16px rgba(255,79,23,0.24);
//           transition: transform 0.22s ease, box-shadow 0.22s ease;
//           white-space: nowrap;
//         }
//         .sv2-cta-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 28px rgba(255,79,23,0.36);
//         }

//         .sv2-grid {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 18px;
//         }

//         @media (max-width: 900px) {
//           .sv2-grid { grid-template-columns: repeat(2, 1fr) !important; }
//         }
//         @media (max-width: 560px) {
//           .sv2-grid { grid-template-columns: 1fr !important; }
//           .sv2-cta-strip {
//             flex-direction: column !important;
//             align-items: flex-start !important;
//           }
//         }
//       `}</style>

//       {/* Dot grid */}
//       <div style={{
//         position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
//         backgroundImage: 'radial-gradient(rgba(35,82,255,0.06) 1px, transparent 1px)',
//         backgroundSize: '28px 28px',
//       }} />

//       {/* Ambient blobs */}
//       <div style={{
//         position: 'absolute', width: 500, height: 500, borderRadius: '50%', zIndex: 0,
//         background: 'radial-gradient(circle, rgba(35,82,255,0.065) 0%, transparent 65%)',
//         top: -150, left: -120, pointerEvents: 'none',
//       }} />
//       <div style={{
//         position: 'absolute', width: 380, height: 380, borderRadius: '50%', zIndex: 0,
//         background: 'radial-gradient(circle, rgba(255,79,23,0.055) 0%, transparent 65%)',
//         bottom: -90, right: -60, pointerEvents: 'none',
//       }} />

//       <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>

//         {/* ════ HEADER ════ */}
//         <div style={{ marginBottom: 52 }}>

//           {/* Eyebrow */}
//           <div className="sv2-anim" style={{
//             display: 'inline-flex', alignItems: 'center', gap: 7,
//             background: '#fff', border: '1.5px solid #E8EEF8',
//             borderRadius: 60, padding: '6px 16px 6px 10px',
//             marginBottom: 22, boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
//           }}>
//             <span style={{
//               width: 7, height: 7, borderRadius: '50%', background: '#FF4F17',
//               display: 'inline-block', boxShadow: '0 0 0 3px rgba(255,79,23,0.15)', flexShrink: 0,
//             }} />
//             <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
//               What We Do
//             </span>
//           </div>

//           {/* Title + subtitle row */}
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
//             <h2
//               className="sv2-anim"
//               style={{
//                 fontFamily: "'Syne', sans-serif",
//                 fontSize: 'clamp(2rem, 3.8vw, 3rem)',
//                 fontWeight: 800, color: '#0D1B3E',
//                 letterSpacing: '-0.03em', lineHeight: 1.08,
//                 margin: 0, maxWidth: 480,
//               }}
//             >
//               We work like{' '}
//               <span style={{ color: '#2352FF' }}>your team,</span><br />
//               not an agency.
//             </h2>

//             <p className="sv2-anim" style={{
//               color: '#6B7280', maxWidth: 280, lineHeight: 1.78,
//               fontSize: '0.9rem', margin: 0, paddingBottom: 4,
//             }}>
//               Strategy, content, execution, analytics — seamlessly integrated under one roof.
//             </p>
//           </div>

//           {/* Gradient rule */}
//           <div className="sv2-anim" style={{
//             marginTop: 32, height: 1.5, borderRadius: 2,
//             background: 'linear-gradient(90deg, #2352FF 0%, #FF4F17 45%, transparent 100%)',
//           }} />
//         </div>

//         {/* ════ CARDS GRID ════ */}
//         <div className="sv2-grid" style={{ marginBottom: 40 }}>
//           {SERVICES.map((svc, i) => (
//             <div
//               key={svc.title}
//               className="sv2-anim sv2-card"
//               style={{ transitionDelay: `${i * 65}ms` }}
//             >
//               {/* Image */}
//               <div style={{ position: 'relative', width: '100%', height: 160, overflow: 'hidden' }}>
//                 <Image
//                   src={svc.image}
//                   alt={svc.title}
//                   fill
//                   className="sv2-img"
//                   style={{ objectFit: 'cover' }}
//                   sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
//                 />
//                 {/* Tint overlay */}
//                 <div style={{
//                   position: 'absolute', inset: 0,
//                   background: `linear-gradient(150deg, ${svc.accent}1A 0%, transparent 60%)`,
//                 }} />
//                 {/* Fade to card body */}
//                 <div style={{
//                   position: 'absolute', bottom: 0, left: 0, right: 0, height: 56,
//                   background: 'linear-gradient(to top, #fff, transparent)',
//                 }} />
//                 {/* Tag */}
//                 <span style={{
//                   position: 'absolute', top: 12, right: 12,
//                   fontSize: '0.62rem', fontWeight: 700,
//                   letterSpacing: '0.09em', textTransform: 'uppercase',
//                   borderRadius: 60, padding: '4px 11px',
//                   background: '#fff', color: svc.accent,
//                   border: `1px solid ${svc.accent}28`,
//                   boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
//                 }}>
//                   {svc.tag}
//                 </span>
//               </div>

//               {/* Body */}
//               <div style={{ padding: '16px 20px 22px' }}>
//                 {/* Icon */}
//                 <div style={{
//                   width: 40, height: 40, borderRadius: 12,
//                   background: `${svc.accent}0F`,
//                   border: `1.5px solid ${svc.accent}22`,
//                   display: 'flex', alignItems: 'center',
//                   justifyContent: 'center', fontSize: 18, marginBottom: 14,
//                 }}>
//                   {svc.icon}
//                 </div>

//                 <h3 style={{
//                   fontFamily: "'Syne', sans-serif",
//                   fontSize: '0.98rem', fontWeight: 700,
//                   color: '#0D1B3E', letterSpacing: '-0.018em',
//                   margin: '0 0 8px',
//                 }}>
//                   {svc.title}
//                 </h3>

//                 <p style={{
//                   color: '#6B7280', lineHeight: 1.72,
//                   fontSize: '0.835rem', margin: '0 0 16px',
//                 }}>
//                   {svc.desc}
//                 </p>

//                 {/* Bottom rule + CTA */}
//                 <div style={{
//                   height: 1, marginBottom: 14,
//                   background: `linear-gradient(90deg, ${svc.accent}28, transparent)`,
//                 }} />

//                 <button
//                   onClick={onGetStarted}
//                   className="sv2-learn"
//                   style={{ color: svc.accent }}
//                 >
//                   Learn more
//                   <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
//                     <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ════ CTA STRIP ════ */}
//         <div
//           className="sv2-anim sv2-cta-strip"
//           style={{
//             background: '#fff',
//             border: '1.5px solid #E8EEF8',
//             borderRadius: 20,
//             padding: '26px 30px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             gap: 20,
//             boxShadow: '0 4px 22px rgba(13,27,62,0.06)',
//             position: 'relative',
//             overflow: 'hidden',
//           }}
//         >
//           {/* Left accent bar */}
//           <div style={{
//             position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
//             background: 'linear-gradient(180deg, #2352FF, #FF4F17)',
//             borderRadius: '20px 0 0 20px',
//           }} />

//           <div style={{ paddingLeft: 16 }}>
//             <p style={{
//               margin: '0 0 3px', color: '#0D1B3E',
//               fontFamily: "'Syne', sans-serif",
//               fontWeight: 700, fontSize: '0.98rem',
//             }}>
//               Not sure where to start?
//             </p>
//             <p style={{ margin: 0, color: '#6B7280', fontSize: '0.85rem' }}>
              
//             </p>
//           </div>

//           <button className="sv2-cta-btn" onClick={onGetStarted}>
//            Get Your Free Growth Audit →
//             <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
//               <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           </button>
//         </div>

//       </div>
//     </section>
//   );
// }


// 'use client';

// import { useEffect, useRef } from 'react';
// import Image from 'next/image';

// const SERVICES = [
//   {
//     icon: '📱',
//     title: 'Social Media Marketing',
//     desc: 'Daily-optimised strategies that build audiences and convert followers into loyal customers.',
//     tag: 'Growth',
//     image: 'https://res.cloudinary.com/dk05wqwo1/image/upload/v1777824599/Gemini_Generated_Image_5zid8s5zid8s5zid_d739xi.png',
//     accent: '#2352FF',
//     num: '01',
//   },
//   {
//     icon: '🎯',
//     title: 'Paid Advertising',
//     desc: 'High-converting Meta & Google ads — creative hooks, precise targeting, relentless testing.',
//     tag: 'Performance',
//     image: 'https://res.cloudinary.com/dk05wqwo1/image/upload/v1777824616/Gemini_Generated_Image_g4g8rig4g8rig4g8_dnztmn.png',
//     accent: '#FF4F17',
//     num: '02',
//   },
//   {
//     icon: '🌐',
//     title: 'Web Design & Dev',
//     desc: 'Landing pages engineered for conversion — fast, beautiful, and built to sell.',
//     tag: 'Digital',
//     image: 'https://res.cloudinary.com/dk05wqwo1/image/upload/v1777824637/Gemini_Generated_Image_3ng7y23ng7y23ng7_lmroa9.png',
//     accent: '#2352FF',
//     num: '03',
//   },
//   {
//     icon: '🎨',
//     title: 'Brand Identity',
//     desc: 'Logo, palette, voice, and visual language — a cohesive identity that makes you unforgettable.',
//     tag: 'Branding',
//     image: 'https://res.cloudinary.com/dk05wqwo1/image/upload/v1777824660/Gemini_Generated_Image_b8j6uub8j6uub8j6_dfohns.png',
//     accent: '#FF4F17',
//     num: '04',
//   },
//   {
//     icon: '📊',
//     title: 'Digital Strategy',
//     desc: 'End-to-end marketing blueprints aligned to your goals. Clear direction, measurable outcomes.',
//     tag: 'Strategy',
//     image: 'https://res.cloudinary.com/dk05wqwo1/image/upload/v1777824681/Gemini_Generated_Image_izgqdaizgqdaizgq_igabvf.png',
//     accent: '#2352FF',
//     num: '05',
//   },
//   {
//     icon: '🤖',
//     title: 'AI Growth Systems',
//     desc: 'Automation and AI-powered insights that let you scale faster and outpace the competition.',
//     tag: 'AI & Tech',
//     image: 'https://res.cloudinary.com/dk05wqwo1/image/upload/v1777824703/Gemini_Generated_Image_5yobaj5yobaj5yob_x6vuv1.png',
//     accent: '#FF4F17',
//     num: '06',
//   },
// ];

// interface ServicesSectionProps {
//   onGetStarted?: () => void;
// }

// export default function ServicesSection({ onGetStarted }: ServicesSectionProps) {
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const io = new IntersectionObserver(
//       entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('sv2-in')),
//       { threshold: 0.07 }
//     );
//     ref.current?.querySelectorAll('.sv2-anim').forEach(el => io.observe(el));
//     return () => io.disconnect();
//   }, []);

//   const featured = SERVICES[0];
//   const rest = SERVICES.slice(1);

//   return (
//     <section
//       id="services"
//       ref={ref}
//       style={{
//         background: '#F7F9FE',
//         padding: 'clamp(80px,10vw,120px) 0',
//         position: 'relative',
//         overflow: 'hidden',
//         fontFamily: "'DM Sans', sans-serif",
//       }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

//         /* ── Animations ── */
//         .sv2-anim {
//           opacity: 0;
//           transform: translateY(24px);
//           transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
//                       transform 0.7s cubic-bezier(0.22,1,0.36,1);
//         }
//         .sv2-anim.sv2-in { opacity: 1; transform: translateY(0); }

//         /* ── Featured card ── */
//         .sv2-featured {
//           background: #0D1B3E;
//           border-radius: 24px;
//           overflow: hidden;
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           min-height: 340px;
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//           cursor: default;
//         }
//         .sv2-featured:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 24px 64px rgba(13,27,62,0.22);
//         }
//         .sv2-featured:hover .sv2-featured-img { transform: scale(1.06); }
//         .sv2-featured-img { transition: transform 0.5s ease; }

//         /* ── Small cards ── */
//         .sv2-card {
//           background: #fff;
//           border: 1.5px solid #E8EEF8;
//           border-radius: 20px;
//           overflow: hidden;
//           display: flex;
//           flex-direction: column;
//           transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
//           cursor: default;
//           position: relative;
//         }
//         .sv2-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 20px 50px rgba(13,27,62,0.11);
//           border-color: rgba(35,82,255,0.18);
//         }
//         .sv2-card:hover .sv2-thumb { transform: scale(1.07); }
//         .sv2-thumb { transition: transform 0.45s ease; }

//         /* Number label */
//         .sv2-num {
//           font-family: 'Syne', sans-serif;
//           font-weight: 800;
//           font-size: 0.65rem;
//           letter-spacing: 0.12em;
//           color: #C8D4F8;
//           line-height: 1;
//         }

//         /* Learn more link */
//         .sv2-learn {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           font-size: 0.78rem;
//           font-weight: 700;
//           cursor: pointer;
//           letter-spacing: 0.01em;
//           transition: gap 0.22s ease, opacity 0.22s ease;
//           text-decoration: none;
//           background: none;
//           border: none;
//           padding: 0;
//           font-family: 'DM Sans', sans-serif;
//         }
//         .sv2-learn:hover { gap: 11px; opacity: 0.75; }

//         /* CTA button */
//         .sv2-cta-btn {
//           display: inline-flex; align-items: center; gap: 7px;
//           background: linear-gradient(135deg, #FF4F17, #ff6b3d);
//           color: #fff; border: none; border-radius: 60px;
//           padding: 13px 26px;
//           font-family: 'Syne', sans-serif;
//           font-weight: 700; font-size: 0.88rem;
//           cursor: pointer;
//           box-shadow: 0 4px 16px rgba(255,79,23,0.24);
//           transition: transform 0.22s ease, box-shadow 0.22s ease;
//           white-space: nowrap;
//         }
//         .sv2-cta-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 28px rgba(255,79,23,0.36);
//         }

//         /* Divider line in small card */
//         .sv2-rule {
//           height: 1px;
//           margin: 14px 0 12px;
//         }

//         /* Small-card image strip */
//         .sv2-strip {
//           position: relative;
//           width: 100%;
//           height: 130px;
//           overflow: hidden;
//           flex-shrink: 0;
//         }

//         /* Layout grids */
//         .sv2-small-grid {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 16px;
//         }

//         /* Horizontal row for bottom 3 */
//         .sv2-bottom-row {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 16px;
//         }

//         /* ── Responsive ── */
//         @media (max-width: 900px) {
//           .sv2-featured { grid-template-columns: 1fr !important; min-height: auto !important; }
//           .sv2-featured-media { height: 220px !important; }
//           .sv2-small-grid { grid-template-columns: repeat(2, 1fr) !important; }
//           .sv2-bottom-row { grid-template-columns: repeat(2, 1fr) !important; }
//         }
//         @media (max-width: 560px) {
//           .sv2-small-grid { grid-template-columns: 1fr !important; }
//           .sv2-bottom-row { grid-template-columns: 1fr !important; }
//           .sv2-cta-strip { flex-direction: column !important; align-items: flex-start !important; }
//           .sv2-header-row { flex-direction: column !important; align-items: flex-start !important; }
//         }
//       `}</style>

//       {/* Dot grid background */}
//       <div style={{
//         position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
//         backgroundImage: 'radial-gradient(rgba(35,82,255,0.055) 1px, transparent 1px)',
//         backgroundSize: '28px 28px',
//       }} />

//       {/* Ambient blobs */}
//       <div style={{
//         position: 'absolute', width: 520, height: 520, borderRadius: '50%', zIndex: 0,
//         background: 'radial-gradient(circle, rgba(35,82,255,0.06) 0%, transparent 65%)',
//         top: -160, left: -130, pointerEvents: 'none',
//       }} />
//       <div style={{
//         position: 'absolute', width: 400, height: 400, borderRadius: '50%', zIndex: 0,
//         background: 'radial-gradient(circle, rgba(255,79,23,0.05) 0%, transparent 65%)',
//         bottom: -100, right: -70, pointerEvents: 'none',
//       }} />

//       <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>

//         {/* ══════════ HEADER ══════════ */}
//         <div style={{ marginBottom: 48 }}>
//           {/* Eyebrow pill */}
//           <div className="sv2-anim" style={{
//             display: 'inline-flex', alignItems: 'center', gap: 7,
//             background: '#fff', border: '1.5px solid #E8EEF8',
//             borderRadius: 60, padding: '6px 16px 6px 10px',
//             marginBottom: 22, boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
//           }}>
//             <span style={{
//               width: 7, height: 7, borderRadius: '50%', background: '#FF4F17',
//               display: 'inline-block', boxShadow: '0 0 0 3px rgba(255,79,23,0.15)', flexShrink: 0,
//             }} />
//             <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
//               What We Do
//             </span>
//           </div>

//           {/* Title + subtitle */}
//           <div className="sv2-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
//             <h2
//               className="sv2-anim"
//               style={{
//                 fontFamily: "'Syne', sans-serif",
//                 fontSize: 'clamp(2rem, 3.8vw, 3rem)',
//                 fontWeight: 800, color: '#0D1B3E',
//                 letterSpacing: '-0.03em', lineHeight: 1.08,
//                 margin: 0, maxWidth: 480,
//               }}
//             >
//               We work like{' '}
//               <span style={{ color: '#2352FF' }}>your team,</span><br />
//               not an agency.
//             </h2>

//             <p className="sv2-anim" style={{
//               color: '#6B7280', maxWidth: 280, lineHeight: 1.78,
//               fontSize: '0.9rem', margin: 0, paddingBottom: 4,
//             }}>
//               Strategy, content, execution, analytics — seamlessly integrated under one roof.
//             </p>
//           </div>

//           {/* Gradient rule */}
//           <div className="sv2-anim" style={{
//             marginTop: 32, height: 1.5, borderRadius: 2,
//             background: 'linear-gradient(90deg, #2352FF 0%, #FF4F17 45%, transparent 100%)',
//           }} />
//         </div>

//         {/* ══════════ FEATURED + 2-CARD ROW ══════════ */}
//         <div className="sv2-anim" style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: 16, marginBottom: 16 }}>

//           {/* ─ Featured card (dark, image right) ─ */}
//           <div className="sv2-featured">
//             {/* Left: content */}
//             <div style={{ padding: '36px 36px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
//               {/* Number + tag row */}
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'auto' }}>
//                 <span className="sv2-num">{featured.num}</span>
//                 <span style={{
//                   fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
//                   borderRadius: 60, padding: '4px 11px',
//                   background: 'rgba(35,82,255,0.18)', color: '#7B9FFF',
//                   border: '1px solid rgba(35,82,255,0.25)',
//                 }}>{featured.tag}</span>
//               </div>

//               <div style={{ marginTop: 40 }}>
//                 {/* Icon */}
//                 <div style={{
//                   width: 46, height: 46, borderRadius: 13,
//                   background: 'rgba(35,82,255,0.18)',
//                   border: '1.5px solid rgba(35,82,255,0.3)',
//                   display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   fontSize: 20, marginBottom: 18,
//                 }}>
//                   {featured.icon}
//                 </div>

//                 <h3 style={{
//                   fontFamily: "'Syne', sans-serif",
//                   fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
//                   fontWeight: 800, color: '#fff',
//                   letterSpacing: '-0.025em', lineHeight: 1.15,
//                   margin: '0 0 12px',
//                 }}>
//                   {featured.title}
//                 </h3>

//                 <p style={{
//                   color: 'rgba(255,255,255,0.55)', lineHeight: 1.72,
//                   fontSize: '0.86rem', margin: '0 0 28px', maxWidth: 260,
//                 }}>
//                   {featured.desc}
//                 </p>

//                 <button onClick={onGetStarted} className="sv2-learn" style={{ color: '#7B9FFF' }}>
//                   Learn more
//                   <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
//                     <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {/* Right: image */}
//             <div className="sv2-featured-media" style={{ position: 'relative', overflow: 'hidden' }}>
//               <Image
//                 src={featured.image}
//                 alt={featured.title}
//                 fill
//                 className="sv2-featured-img"
//                 style={{ objectFit: 'cover' }}
//                 sizes="(max-width: 900px) 100vw, 33vw"
//               />
//               {/* Dark gradient overlay */}
//               <div style={{
//                 position: 'absolute', inset: 0,
//                 background: 'linear-gradient(to right, #0D1B3E 0%, transparent 40%)',
//               }} />
//             </div>
//           </div>

//           {/* ─ Right column: 2 stacked small cards ─ */}
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//             {rest.slice(0, 2).map((svc, i) => (
//               <SmallCard key={svc.title} svc={svc} delay={i * 80} onGetStarted={onGetStarted} />
//             ))}
//           </div>
//         </div>

//         {/* ══════════ BOTTOM ROW: 3 equal cards ══════════ */}
//         <div className="sv2-bottom-row" style={{ marginBottom: 40 }}>
//           {rest.slice(2).map((svc, i) => (
//             <SmallCard key={svc.title} svc={svc} delay={i * 70} onGetStarted={onGetStarted} />
//           ))}
//         </div>

//         {/* ══════════ CTA STRIP ══════════ */}
//         <div
//           className="sv2-anim sv2-cta-strip"
//           style={{
//             background: '#fff',
//             border: '1.5px solid #E8EEF8',
//             borderRadius: 20,
//             padding: '26px 30px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             gap: 20,
//             boxShadow: '0 4px 22px rgba(13,27,62,0.06)',
//             position: 'relative',
//             overflow: 'hidden',
//           }}
//         >
//           {/* Left accent bar */}
//           <div style={{
//             position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
//             background: 'linear-gradient(180deg, #2352FF, #FF4F17)',
//             borderRadius: '20px 0 0 20px',
//           }} />

//           <div style={{ paddingLeft: 16 }}>
//             <p style={{
//               margin: '0 0 3px', color: '#0D1B3E',
//               fontFamily: "'Syne', sans-serif",
//               fontWeight: 700, fontSize: '0.98rem',
//             }}>
//               Not sure where to start?
//             </p>
//             <p style={{ margin: 0, color: '#6B7280', fontSize: '0.85rem' }}>
              
//             </p>
//           </div>

//           <button className="sv2-cta-btn" onClick={onGetStarted}>
//             Get Your Free Growth Audit →
//             <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
//               <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           </button>
//         </div>

//       </div>
//     </section>
//   );
// }

// /* ─────────────────────────────────────────────
//    Small Card sub-component
// ───────────────────────────────────────────── */
// function SmallCard({
//   svc,
//   delay,
//   onGetStarted,
// }: {
//   svc: (typeof SERVICES)[0];
//   delay: number;
//   onGetStarted?: () => void;
// }) {
//   return (
//     <div
//       className="sv2-anim sv2-card"
//       style={{ transitionDelay: `${delay}ms`, flexDirection: 'row', minHeight: 0 }}
//     >
//       {/* Thumbnail strip (left side) */}
//       <div style={{ position: 'relative', width: 110, flexShrink: 0, overflow: 'hidden' }}>
//         <Image
//           src={svc.image}
//           alt={svc.title}
//           fill
//           className="sv2-thumb"
//           style={{ objectFit: 'cover' }}
//           sizes="110px"
//         />
//         {/* Colour-tint overlay */}
//         <div style={{
//           position: 'absolute', inset: 0,
//           background: `linear-gradient(135deg, ${svc.accent}40 0%, transparent 70%)`,
//         }} />
//         {/* Fade to white on the right edge */}
//         <div style={{
//           position: 'absolute', top: 0, right: 0, bottom: 0, width: 32,
//           background: 'linear-gradient(to right, transparent, #fff)',
//         }} />
//         {/* Number watermark */}
//         <span style={{
//           position: 'absolute', bottom: 8, left: 10,
//           fontFamily: "'Syne', sans-serif",
//           fontWeight: 800, fontSize: '0.6rem',
//           letterSpacing: '0.12em', color: 'rgba(255,255,255,0.7)',
//         }}>{svc.num}</span>
//       </div>

//       {/* Body */}
//       <div style={{ padding: '16px 18px 16px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, minWidth: 0 }}>
//         {/* Tag pill */}
//         <span style={{
//           alignSelf: 'flex-start',
//           fontSize: '0.58rem', fontWeight: 700,
//           letterSpacing: '0.09em', textTransform: 'uppercase',
//           borderRadius: 60, padding: '3px 9px',
//           background: `${svc.accent}10`, color: svc.accent,
//           border: `1px solid ${svc.accent}25`,
//           marginBottom: 8, display: 'inline-block',
//         }}>
//           {svc.tag}
//         </span>

//         <div>
//           {/* Icon + title */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
//             <span style={{ fontSize: 15, lineHeight: 1 }}>{svc.icon}</span>
//             <h3 style={{
//               fontFamily: "'Syne', sans-serif",
//               fontSize: '0.88rem', fontWeight: 700,
//               color: '#0D1B3E', letterSpacing: '-0.015em',
//               margin: 0, lineHeight: 1.25,
//             }}>
//               {svc.title}
//             </h3>
//           </div>

//           <p style={{
//             color: '#6B7280', lineHeight: 1.65,
//             fontSize: '0.78rem', margin: '0 0 12px',
//           }}>
//             {svc.desc}
//           </p>
//         </div>

//         {/* Rule + Learn more */}
//         <div>
//           <div className="sv2-rule" style={{
//             background: `linear-gradient(90deg, ${svc.accent}28, transparent)`,
//           }} />
//           <button onClick={onGetStarted} className="sv2-learn" style={{ color: svc.accent }}>
//             Learn more
//             <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
//               <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const SERVICES = [
  {
    icon: '📱',
    title: 'Social Media Marketing',
    desc: 'Daily-optimised strategies that build audiences and convert followers into loyal customers.',
    tag: 'Growth',
    image: 'https://res.cloudinary.com/dk05wqwo1/image/upload/v1777824599/Gemini_Generated_Image_5zid8s5zid8s5zid_d739xi.png',
    accent: '#2352FF',
    num: '01',
  },
  {
    icon: '🎯',
    title: 'Paid Advertising',
    desc: 'High-converting Meta & Google ads — creative hooks, precise targeting, relentless testing.',
    tag: 'Performance',
    image: 'https://res.cloudinary.com/dk05wqwo1/image/upload/v1777824616/Gemini_Generated_Image_g4g8rig4g8rig4g8_dnztmn.png',
    accent: '#FF4F17',
    num: '02',
  },
  {
    icon: '🌐',
    title: 'Web Design & Dev',
    desc: 'Landing pages engineered for conversion — fast, beautiful, and built to sell.',
    tag: 'Digital',
    image: 'https://res.cloudinary.com/dk05wqwo1/image/upload/v1777824637/Gemini_Generated_Image_3ng7y23ng7y23ng7_lmroa9.png',
    accent: '#2352FF',
    num: '03',
  },
  {
    icon: '🎨',
    title: 'Brand Identity',
    desc: 'Logo, palette, voice, and visual language — a cohesive identity that makes you unforgettable.',
    tag: 'Branding',
    image: 'https://res.cloudinary.com/dk05wqwo1/image/upload/v1777824660/Gemini_Generated_Image_b8j6uub8j6uub8j6_dfohns.png',
    accent: '#FF4F17',
    num: '04',
  },
  {
    icon: '📊',
    title: 'Digital Strategy',
    desc: 'End-to-end marketing blueprints aligned to your goals. Clear direction, measurable outcomes.',
    tag: 'Strategy',
    image: 'https://res.cloudinary.com/dk05wqwo1/image/upload/v1777824681/Gemini_Generated_Image_izgqdaizgqdaizgq_igabvf.png',
    accent: '#2352FF',
    num: '05',
  },
  {
    icon: '🤖',
    title: 'AI Growth Systems',
    desc: 'Automation and AI-powered insights that let you scale faster and outpace the competition.',
    tag: 'AI & Tech',
    image: 'https://res.cloudinary.com/dk05wqwo1/image/upload/v1777824703/Gemini_Generated_Image_5yobaj5yobaj5yob_x6vuv1.png',
    accent: '#FF4F17',
    num: '06',
  },
];

interface ServicesSectionProps {
  onGetStarted?: () => void;
}

export default function ServicesSection({ onGetStarted }: ServicesSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('sv2-in')),
      { threshold: 0.07 }
    );
    ref.current?.querySelectorAll('.sv2-anim').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const featured = SERVICES[0];
  const rest = SERVICES.slice(1);

  return (
    <section
      id="services"
      ref={ref}
      style={{
        background: '#F7F9FE',
        padding: 'clamp(60px,10vw,120px) 0',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        /* ── Scroll-in ── */
        .sv2-anim {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                      transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .sv2-anim.sv2-in { opacity: 1; transform: translateY(0); }

        /* ── Header ── */
        .sv2-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 16px;
        }

        /* ── Featured wrapper (hero + side col) ── */
        .sv2-featured-wrap {
          display: grid;
          grid-template-columns: 1.45fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        /* ── Featured hero card ── */
        .sv2-featured {
          background: #0D1B3E;
          border-radius: 24px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 340px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: default;
        }
        .sv2-featured:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 64px rgba(13,27,62,0.22);
        }
        .sv2-featured:hover .sv2-feat-img { transform: scale(1.06); }
        .sv2-feat-img { transition: transform 0.5s ease; }

        .sv2-featured-body {
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          z-index: 1;
        }
        .sv2-featured-media {
          position: relative;
          overflow: hidden;
        }
        /* Desktop gradient: left edge bleeds into content */
        .sv2-feat-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, #0D1B3E 0%, transparent 45%);
        }

        /* ── Side column ── */
        .sv2-side-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* ── Bottom row ── */
        .sv2-bottom-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 40px;
        }

        /* ── Small card ── */
        .sv2-card {
          background: #fff;
          border: 1.5px solid #E8EEF8;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
          cursor: default;
          position: relative;
        }
        .sv2-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(13,27,62,0.11);
          border-color: rgba(35,82,255,0.18);
        }
        .sv2-card:hover .sv2-thumb { transform: scale(1.07); }
        .sv2-thumb { transition: transform 0.45s ease; }

        .sv2-card-thumb {
          position: relative;
          width: 110px;
          flex-shrink: 0;
          overflow: hidden;
        }
        .sv2-card-body {
          padding: 15px 18px 15px 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          min-width: 0;
        }

        /* ── Shared atoms ── */
        .sv2-num {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          color: #C8D4F8;
        }
        .sv2-learn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: gap 0.22s ease, opacity 0.22s ease;
          text-decoration: none;
          background: none;
          border: none;
          padding: 0;
          font-family: 'DM Sans', sans-serif;
        }
        .sv2-learn:hover { gap: 11px; opacity: 0.75; }
        .sv2-rule { height: 1px; margin: 11px 0 10px; }

        .sv2-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: linear-gradient(135deg, #FF4F17, #ff6b3d);
          color: #fff;
          border: none;
          border-radius: 60px;
          padding: 13px 24px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(255,79,23,0.24);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          white-space: nowrap;
        }
        .sv2-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(255,79,23,0.36);
        }
        .sv2-cta-strip {
          background: #fff;
          border: 1.5px solid #E8EEF8;
          border-radius: 20px;
          padding: 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          box-shadow: 0 4px 22px rgba(13,27,62,0.06);
          position: relative;
          overflow: hidden;
        }

        /* ════════════════════════════
           TABLET  ≤ 900px
        ════════════════════════════ */
        @media (max-width: 900px) {
          /* Hero + side col → single column */
          .sv2-featured-wrap {
            grid-template-columns: 1fr !important;
          }
          /* Hero card: image on top, content below */
          .sv2-featured {
            grid-template-columns: 1fr !important;
            grid-template-rows: 230px auto;
            min-height: auto !important;
          }
          .sv2-featured-media { order: -1; }
          /* Fix gradient direction for stacked layout */
          .sv2-feat-overlay {
            background: linear-gradient(to bottom, transparent 40%, #0D1B3E 95%) !important;
          }
          /* Side col: 2-column grid */
          .sv2-side-col {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            flex-direction: unset !important;
          }
          /* Bottom row: 2 columns */
          .sv2-bottom-row {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* ════════════════════════════
           MOBILE  ≤ 600px
        ════════════════════════════ */
        @media (max-width: 600px) {
          .sv2-header-row {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .sv2-header-subtitle { max-width: 100% !important; }

          .sv2-featured {
            grid-template-rows: 190px auto !important;
          }
          .sv2-featured-body {
            padding: 22px 20px !important;
          }

          /* Side col: 1 column */
          .sv2-side-col {
            grid-template-columns: 1fr !important;
          }

          /* Bottom row: 1 column */
          .sv2-bottom-row {
            grid-template-columns: 1fr !important;
            margin-bottom: 28px !important;
          }

          /* Thumbnail a bit narrower */
          .sv2-card-thumb { width: 90px !important; }

          /* CTA strip stacks */
          .sv2-cta-strip {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 20px !important;
          }
          .sv2-cta-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }

        /* ════════════════════════════
           VERY SMALL  ≤ 380px
        ════════════════════════════ */
        @media (max-width: 380px) {
          .sv2-card-thumb { width: 74px !important; }
          .sv2-card-body { padding: 12px 12px 12px 8px !important; }
          .sv2-featured-body { padding: 18px 16px !important; }
          .sv2-featured { grid-template-rows: 160px auto !important; }
        }
      `}</style>

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(rgba(35,82,255,0.055) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />
      {/* Blobs */}
      <div style={{
        position: 'absolute', width: 520, height: 520, borderRadius: '50%', zIndex: 0,
        background: 'radial-gradient(circle, rgba(35,82,255,0.06) 0%, transparent 65%)',
        top: -160, left: -130, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: 400, height: 400, borderRadius: '50%', zIndex: 0,
        background: 'radial-gradient(circle, rgba(255,79,23,0.05) 0%, transparent 65%)',
        bottom: -100, right: -70, pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>

        {/* ════ HEADER ════ */}
        <div style={{ marginBottom: 44 }}>
          {/* Eyebrow */}
          <div className="sv2-anim" style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: '#fff', border: '1.5px solid #E8EEF8',
            borderRadius: 60, padding: '6px 16px 6px 10px',
            marginBottom: 20, boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%', background: '#FF4F17',
              display: 'inline-block', boxShadow: '0 0 0 3px rgba(255,79,23,0.15)', flexShrink: 0,
            }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              What We Do
            </span>
          </div>

          <div className="sv2-header-row">
            <h2
              className="sv2-anim"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                fontWeight: 800, color: '#0D1B3E',
                letterSpacing: '-0.03em', lineHeight: 1.08,
                margin: 0, maxWidth: 480,
              }}
            >
              We work like{' '}
              <span style={{ color: '#2352FF' }}>your team,</span><br />
              not an agency.
            </h2>

            <p
              className="sv2-anim sv2-header-subtitle"
              style={{
                color: '#6B7280', maxWidth: 280, lineHeight: 1.78,
                fontSize: '0.9rem', margin: 0, paddingBottom: 4,
              }}
            >
              Strategy, content, execution, analytics — seamlessly integrated under one roof.
            </p>
          </div>

          <div className="sv2-anim" style={{
            marginTop: 28, height: 1.5, borderRadius: 2,
            background: 'linear-gradient(90deg, #2352FF 0%, #FF4F17 45%, transparent 100%)',
          }} />
        </div>

        {/* ════ FEATURED + SIDE COLUMN ════ */}
        <div className="sv2-featured-wrap sv2-anim">

          {/* Hero card */}
          <div className="sv2-featured">
            {/* Content pane */}
            <div className="sv2-featured-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="sv2-num">{featured.num}</span>
                <span style={{
                  fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                  borderRadius: 60, padding: '4px 11px',
                  background: 'rgba(35,82,255,0.18)', color: '#7B9FFF',
                  border: '1px solid rgba(35,82,255,0.25)',
                }}>{featured.tag}</span>
              </div>

              <div style={{ marginTop: 28 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'rgba(35,82,255,0.18)',
                  border: '1.5px solid rgba(35,82,255,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, marginBottom: 16,
                }}>
                  {featured.icon}
                </div>

                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(1.1rem, 2vw, 1.45rem)',
                  fontWeight: 800, color: '#fff',
                  letterSpacing: '-0.025em', lineHeight: 1.15,
                  margin: '0 0 10px',
                }}>
                  {featured.title}
                </h3>

                <p style={{
                  color: 'rgba(255,255,255,0.55)', lineHeight: 1.72,
                  fontSize: '0.85rem', margin: '0 0 22px', maxWidth: 260,
                }}>
                  {featured.desc}
                </p>

                <button onClick={onGetStarted} className="sv2-learn" style={{ color: '#7B9FFF' }}>
                  Learn more
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Image pane */}
            <div className="sv2-featured-media">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="sv2-feat-img"
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 900px) 100vw, 380px"
              />
              <div className="sv2-feat-overlay" />
            </div>
          </div>

          {/* Side column: cards 02 & 03 */}
          <div className="sv2-side-col">
            {rest.slice(0, 2).map((svc, i) => (
              <SmallCard key={svc.title} svc={svc} delay={i * 80} onGetStarted={onGetStarted} />
            ))}
          </div>
        </div>

        {/* ════ BOTTOM ROW: cards 04–06 ════ */}
        <div className="sv2-bottom-row">
          {rest.slice(2).map((svc, i) => (
            <SmallCard key={svc.title} svc={svc} delay={i * 70} onGetStarted={onGetStarted} />
          ))}
        </div>

        {/* ════ CTA STRIP ════ */}
        <div className="sv2-anim sv2-cta-strip">
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
            background: 'linear-gradient(180deg, #2352FF, #FF4F17)',
            borderRadius: '20px 0 0 20px',
          }} />
          <div style={{ paddingLeft: 16 }}>
            <p style={{
              margin: '0 0 2px', color: '#0D1B3E',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700, fontSize: '0.98rem',
            }}>
              Not sure where to start?
            </p>
          </div>
          <button className="sv2-cta-btn" onClick={onGetStarted}>
            Get Your Free Growth Audit →
          </button>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SmallCard
───────────────────────────────────────────── */
function SmallCard({
  svc,
  delay,
  onGetStarted,
}: {
  svc: (typeof SERVICES)[0];
  delay: number;
  onGetStarted?: () => void;
}) {
  return (
    <div className="sv2-anim sv2-card" style={{ transitionDelay: `${delay}ms` }}>
      {/* Thumbnail strip */}
      <div className="sv2-card-thumb">
        <Image
          src={svc.image}
          alt={svc.title}
          fill
          className="sv2-thumb"
          style={{ objectFit: 'cover' }}
          sizes="110px"
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(135deg, ${svc.accent}40 0%, transparent 70%)`,
        }} />
        {/* Feather right edge */}
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: 30,
          background: 'linear-gradient(to right, transparent, #fff)',
        }} />
        <span style={{
          position: 'absolute', bottom: 7, left: 9,
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800, fontSize: '0.57rem',
          letterSpacing: '0.12em', color: 'rgba(255,255,255,0.78)',
        }}>{svc.num}</span>
      </div>

      {/* Body */}
      <div className="sv2-card-body">
        <span style={{
          alignSelf: 'flex-start',
          fontSize: '0.57rem', fontWeight: 700,
          letterSpacing: '0.09em', textTransform: 'uppercase',
          borderRadius: 60, padding: '3px 9px',
          background: `${svc.accent}10`, color: svc.accent,
          border: `1px solid ${svc.accent}25`,
          marginBottom: 6, display: 'inline-block',
        }}>
          {svc.tag}
        </span>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
            <span style={{ fontSize: 14, lineHeight: 1, flexShrink: 0 }}>{svc.icon}</span>
            <h3 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '0.86rem', fontWeight: 700,
              color: '#0D1B3E', letterSpacing: '-0.015em',
              margin: 0, lineHeight: 1.25,
            }}>
              {svc.title}
            </h3>
          </div>

          <p style={{
            color: '#6B7280', lineHeight: 1.65,
            fontSize: '0.76rem', margin: '0 0 10px',
          }}>
            {svc.desc}
          </p>
        </div>

        <div>
          <div className="sv2-rule" style={{
            background: `linear-gradient(90deg, ${svc.accent}28, transparent)`,
          }} />
          <button onClick={onGetStarted} className="sv2-learn" style={{ color: svc.accent }}>
            Learn more
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
