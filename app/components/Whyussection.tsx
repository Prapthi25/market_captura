
// 'use client';

// import { useEffect, useRef } from 'react';

// const REASONS = [
//   {
//     icon: '🏆',
//     title: 'End-to-End Ownership',
//     desc: 'From strategy to results — we take full accountability for your growth, not just task execution.',
//     accent: '#2352FF',
//   },
//   {
//     icon: '🎯',
//     title: 'Unified Strategy',
//     desc: 'Every ad, post and creative works toward one compounding goal — no scattered efforts.',
//     accent: '#FF4F17',
//   },
//   {
//     icon: '⚡',
//     title: 'Faster Execution',
//     desc: 'One team, one conversation. No agency hand-offs, no bottlenecks — just speed.',
//     accent: '#2352FF',
//   },
//   {
//     icon: '📈',
//     title: 'Data-Driven Decisions',
//     desc: 'Every move is backed by real performance data. We optimise relentlessly — no guesswork.',
//     accent: '#FF4F17',
//   },
//   {
//     icon: '🤝',
//     title: 'True Partnership',
//     desc: 'We grow only when you grow. Our incentives are completely aligned with yours.',
//     accent: '#2352FF',
//   },
//   {
//     icon: '💡',
//     title: 'In-House Feel',
//     desc: "Feels like a dedicated marketing team inside your business — not an outside vendor.",
//     accent: '#FF4F17',
//   },
// ];

// const STEPS = [
//   { n: '01', title: 'Discovery Call',     desc: 'Deep-dive into your goals and competitive landscape.' },
//   { n: '02', title: 'Growth Blueprint',   desc: 'A tailored 90-day roadmap built for your brand.'      },
//   { n: '03', title: 'Execution Sprint',   desc: 'Full-channel execution with brand consistency.'        },
//   { n: '04', title: 'Measure & Scale',    desc: 'Weekly reporting and continuous optimisation.'         },
// ];

// const STATS = [
//   { num: '150+', label: 'Projects', sub: 'Delivered'     },
//   { num: '50+',  label: 'Clients',  sub: 'Worldwide'     },
//   { num: '3.8×', label: 'Avg ROAS', sub: 'In 90 days'    },
//   { num: '4.8★', label: 'Rating',   sub: 'Verified'      },
// ];

// interface WhyUsSectionProps {
//   onGetStarted?: () => void;
// }

// export default function WhyUsSection({ onGetStarted }: WhyUsSectionProps) {
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const io = new IntersectionObserver(
//       entries => entries.forEach(e => {
//         if (e.isIntersecting) e.target.classList.add('wu2-in');
//       }),
//       { threshold: 0.08 }
//     );
//     ref.current?.querySelectorAll('.wu2-anim').forEach(el => io.observe(el));
//     return () => io.disconnect();
//   }, []);

//   return (
//     <section
//       id="why-us"
//       ref={ref}
//       style={{
//         background: '#F7F9FE',
//         padding: 'clamp(80px, 10vw, 130px) 0',
//         position: 'relative',
//         overflow: 'hidden',
//         fontFamily: "'DM Sans', sans-serif",
//       }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

//         /* ── Reveal animations ── */
//         .wu2-anim {
//           opacity: 0;
//           transform: translateY(22px);
//           transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
//                       transform 0.7s cubic-bezier(0.22,1,0.36,1);
//         }
//         .wu2-anim.wu2-in {
//           opacity: 1;
//           transform: translateY(0);
//         }

//         /* ── Reason cards ── */
//         .wu2-card {
//           background: #fff;
//           border: 1.5px solid #E8EEF8;
//           border-radius: 20px;
//           padding: 28px 26px;
//           position: relative;
//           overflow: hidden;
//           transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
//           cursor: default;
//         }
//         .wu2-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 16px 44px rgba(35,82,255,0.10);
//           border-color: rgba(35,82,255,0.18);
//         }
//         .wu2-card::after {
//           content: '';
//           position: absolute;
//           bottom: 0; left: 0; right: 0;
//           height: 2px;
//           border-radius: 0 0 20px 20px;
//           opacity: 0;
//           transition: opacity 0.25s ease;
//         }
//         .wu2-card:hover::after { opacity: 1; }
//         .wu2-card.blue::after  { background: linear-gradient(90deg, #2352FF, transparent); }
//         .wu2-card.orange::after { background: linear-gradient(90deg, #FF4F17, transparent); }

//         /* ── Step cards ── */
//         .wu2-step {
//           background: #fff;
//           border: 1.5px solid #E8EEF8;
//           border-radius: 18px;
//           padding: 26px 22px;
//           transition: transform 0.25s ease, box-shadow 0.25s ease;
//           position: relative;
//           overflow: hidden;
//         }
//         .wu2-step:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 14px 36px rgba(35,82,255,0.09);
//         }
//         .wu2-step:hover .wu2-step-n {
//           background: #2352FF;
//           color: #fff;
//           border-color: transparent;
//         }
//         .wu2-step-n {
//           width: 38px; height: 38px;
//           border-radius: 11px;
//           background: rgba(35,82,255,0.07);
//           border: 1.5px solid rgba(35,82,255,0.15);
//           display: flex; align-items: center; justify-content: center;
//           font-size: 0.72rem; font-weight: 800;
//           color: #2352FF; margin-bottom: 16px;
//           letter-spacing: 0.05em;
//           transition: background 0.25s, color 0.25s, border-color 0.25s;
//           font-family: 'Syne', sans-serif;
//         }

//         /* ── Stat cells ── */
//         .wu2-stat {
//           flex: 1 1 130px;
//           padding: clamp(20px,2.5vw,30px) clamp(16px,2vw,26px);
//           text-align: center;
//           position: relative;
//         }
//         .wu2-stat + .wu2-stat {
//           border-left: 1px solid #E8EEF8;
//         }

//         /* ── CTA buttons ── */
//         .wu2-btn-main {
//           display: inline-flex; align-items: center; gap: 8px;
//           background: linear-gradient(135deg, #2352FF, #1a3fd4);
//           color: #fff; border: none; border-radius: 60px;
//           padding: 14px 30px;
//           font-family: 'Syne', sans-serif;
//           font-weight: 700; font-size: 0.92rem;
//           cursor: pointer; letter-spacing: -0.01em;
//           box-shadow: 0 4px 18px rgba(35,82,255,0.25);
//           transition: transform 0.22s ease, box-shadow 0.22s ease;
//           white-space: nowrap;
//         }
//         .wu2-btn-main:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 32px rgba(35,82,255,0.36);
//         }
//         .wu2-btn-ghost {
//           display: inline-flex; align-items: center; gap: 8px;
//           background: transparent; color: #2352FF;
//           border: 1.8px solid rgba(35,82,255,0.3);
//           border-radius: 60px; padding: 13px 26px;
//           font-family: 'Syne', sans-serif;
//           font-weight: 700; font-size: 0.92rem;
//           cursor: pointer; letter-spacing: -0.01em;
//           transition: all 0.22s ease; white-space: nowrap;
//         }
//         .wu2-btn-ghost:hover {
//           background: #2352FF; color: #fff;
//           border-color: #2352FF;
//         }

//         /* ── Responsive ── */
//         @media (max-width: 860px) {
//           .wu2-reasons-grid { grid-template-columns: repeat(2, 1fr) !important; }
//           .wu2-steps-grid   { grid-template-columns: repeat(2, 1fr) !important; }
//         }
//         @media (max-width: 540px) {
//           .wu2-reasons-grid { grid-template-columns: 1fr !important; }
//           .wu2-steps-grid   { grid-template-columns: 1fr !important; }
//           .wu2-stat + .wu2-stat { border-left: none; border-top: 1px solid #E8EEF8; }
//           .wu2-stats-row { flex-direction: column !important; }
//         }
//       `}</style>

//       {/* Subtle dot grid */}
//       <div style={{
//         position: 'absolute', inset: 0, pointerEvents: 'none',
//         backgroundImage: 'radial-gradient(rgba(35,82,255,0.055) 1px, transparent 1px)',
//         backgroundSize: '28px 28px',
//       }} />

//       {/* Ambient blobs */}
//       <div style={{
//         position: 'absolute', width: 500, height: 500, borderRadius: '50%',
//         background: 'radial-gradient(circle, rgba(35,82,255,0.06) 0%, transparent 65%)',
//         top: -150, right: -120, pointerEvents: 'none',
//       }} />
//       <div style={{
//         position: 'absolute', width: 360, height: 360, borderRadius: '50%',
//         background: 'radial-gradient(circle, rgba(255,79,23,0.05) 0%, transparent 65%)',
//         bottom: -80, left: '15%', pointerEvents: 'none',
//       }} />

//       {/* ── Container ── */}
//       <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>

//         {/* ════ SECTION HEADER ════ */}
//         <div className="wu2-anim" style={{ maxWidth: 620, marginBottom: 64 }}>
//           {/* Eyebrow */}
//           <div style={{
//             display: 'inline-flex', alignItems: 'center', gap: 8,
//             background: '#fff', border: '1.5px solid #E8EEF8',
//             borderRadius: 60, padding: '6px 16px 6px 11px',
//             marginBottom: 22, boxShadow: '0 2px 10px rgba(35,82,255,0.06)',
//           }}>
//             <span style={{
//               width: 7, height: 7, borderRadius: '50%',
//               background: '#2352FF', display: 'inline-block',
//               boxShadow: '0 0 0 3px rgba(35,82,255,0.15)', flexShrink: 0,
//             }} />
//             <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
//               Why Market Captura
//             </span>
//           </div>

//           <h2 style={{
//             fontFamily: "'Syne', sans-serif",
//             fontSize: 'clamp(2rem, 4vw, 3.1rem)',
//             fontWeight: 800, color: '#0D1B3E',
//             lineHeight: 1.08, letterSpacing: '-0.03em',
//             marginBottom: 18,
//           }}>
//             Built for brands that{' '}
//             <span style={{ color: '#FF4F17' }}>demand results.</span>
//           </h2>

//           <p style={{ color: '#6B7280', lineHeight: 1.8, fontSize: '0.97rem', margin: 0 }}>
//             We think like owners, not marketers. One accountable team managing strategy, content, execution, and analytics — so you stop juggling and start scaling.
//           </p>
//         </div>

//         {/* ════ REASON CARDS ════ */}
//         <div
//           className="wu2-reasons-grid"
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(3, 1fr)',
//             gap: 16,
//             marginBottom: 72,
//           }}
//         >
//           {REASONS.map((r, i) => (
//             <div
//               key={r.title}
//               className={`wu2-anim wu2-card ${r.accent === '#2352FF' ? 'blue' : 'orange'}`}
//               style={{ transitionDelay: `${i * 70}ms` }}
//             >
//               {/* Corner accent */}
//               <div style={{
//                 position: 'absolute', top: 0, right: 0,
//                 width: 72, height: 72, borderRadius: '0 20px 0 72px',
//                 background: r.accent === '#2352FF'
//                   ? 'radial-gradient(circle at top right, rgba(35,82,255,0.05) 0%, transparent 70%)'
//                   : 'radial-gradient(circle at top right, rgba(255,79,23,0.05) 0%, transparent 70%)',
//                 pointerEvents: 'none',
//               }} />

//               {/* Icon */}
//               <div style={{
//                 width: 44, height: 44, borderRadius: 13,
//                 background: r.accent === '#2352FF' ? 'rgba(35,82,255,0.08)' : 'rgba(255,79,23,0.08)',
//                 border: `1.5px solid ${r.accent === '#2352FF' ? 'rgba(35,82,255,0.13)' : 'rgba(255,79,23,0.13)'}`,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 fontSize: 20, marginBottom: 20,
//               }}>
//                 {r.icon}
//               </div>

//               <h3 style={{
//                 fontFamily: "'Syne', sans-serif",
//                 fontSize: '0.97rem', fontWeight: 700,
//                 color: '#0D1B3E', marginBottom: 10,
//                 letterSpacing: '-0.015em',
//               }}>
//                 {r.title}
//               </h3>

//               <p style={{ color: '#6B7280', fontSize: '0.845rem', lineHeight: 1.72, margin: 0 }}>
//                 {r.desc}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* ════ HOW IT WORKS ════ */}
//         <div style={{ marginBottom: 72 }}>
//           {/* Sub-header */}
//           <div className="wu2-anim" style={{ marginBottom: 36 }}>
//             <div style={{
//               display: 'inline-flex', alignItems: 'center', gap: 8,
//               background: '#fff', border: '1.5px solid #E8EEF8',
//               borderRadius: 60, padding: '6px 16px 6px 11px',
//               marginBottom: 16, boxShadow: '0 2px 10px rgba(35,82,255,0.05)',
//             }}>
//               <span style={{
//                 width: 7, height: 7, borderRadius: '50%',
//                 background: '#FF4F17', display: 'inline-block', flexShrink: 0,
//                 boxShadow: '0 0 0 3px rgba(255,79,23,0.15)',
//               }} />
//               <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
//                 How It Works
//               </span>
//             </div>
//             <h3 style={{
//               fontFamily: "'Syne', sans-serif",
//               fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
//               fontWeight: 800, color: '#0D1B3E',
//               letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0,
//             }}>
//               From first call to{' '}
//               <span style={{ color: '#2352FF' }}>compounding results.</span>
//             </h3>
//           </div>

//           <div
//             className="wu2-steps-grid"
//             style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}
//           >
//             {STEPS.map((s, i) => (
//               <div
//                 key={s.n}
//                 className="wu2-anim wu2-step"
//                 style={{ transitionDelay: `${i * 80}ms` }}
//               >
//                 {/* Connector dot top-right */}
//                 {i < STEPS.length - 1 && (
//                   <div style={{
//                     position: 'absolute', top: 33, right: -8,
//                     width: 14, height: 2,
//                     background: 'linear-gradient(90deg, #E8EEF8, transparent)',
//                     zIndex: 2,
//                   }} />
//                 )}
//                 <div className="wu2-step-n">{s.n}</div>
//                 <h4 style={{
//                   fontFamily: "'Syne', sans-serif",
//                   fontSize: '0.92rem', fontWeight: 700,
//                   color: '#0D1B3E', marginBottom: 8, letterSpacing: '-0.01em',
//                 }}>
//                   {s.title}
//                 </h4>
//                 <p style={{ color: '#6B7280', fontSize: '0.82rem', lineHeight: 1.7, margin: 0 }}>
//                   {s.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ════ STATS STRIP ════ */}
//         <div className="wu2-anim" style={{ marginBottom: 52 }}>
//           <div style={{
//             background: '#fff',
//             border: '1.5px solid #E8EEF8',
//             borderRadius: 22,
//             overflow: 'hidden',
//             boxShadow: '0 4px 24px rgba(35,82,255,0.07)',
//           }}>
//             <div className="wu2-stats-row" style={{ display: 'flex', flexWrap: 'wrap' }}>
//               {STATS.map((s, i) => (
//                 <div key={s.label} className="wu2-stat">
//                   {/* Top accent line */}
//                   <div style={{
//                     position: 'absolute', top: 0, left: '25%', right: '25%', height: 2,
//                     background: i % 2 === 0
//                       ? 'linear-gradient(90deg, transparent, rgba(35,82,255,0.35), transparent)'
//                       : 'linear-gradient(90deg, transparent, rgba(255,79,23,0.30), transparent)',
//                   }} />
//                   <div style={{
//                     fontFamily: "'Syne', sans-serif",
//                     fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)',
//                     fontWeight: 800, color: '#0D1B3E',
//                     letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 6,
//                   }}>
//                     {s.num}
//                   </div>
//                   <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0D1B3E' }}>{s.label}</div>
//                   <div style={{ fontSize: '0.7rem', color: '#B0B7C3', marginTop: 2 }}>{s.sub}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ════ CTA ════ */}
//         <div className="wu2-anim" style={{ textAlign: 'center' }}>
//           <p style={{ color: '#9AA5B4', fontSize: '0.88rem', marginBottom: 20 }}>
//             Ready to stop juggling agencies and start growing?
//           </p>
//           <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
//             <button className="wu2-btn-main" onClick={onGetStarted}>
//               Book a Free Strategy Call →
//             </button>
//             <button className="wu2-btn-ghost" onClick={() => document.getElementById('blogs')?.scrollIntoView({ behavior: 'smooth' })}>
//               See Our Work
//             </button>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }


// 'use client';

// import { useEffect, useRef } from 'react';

// /* ─────────── BRANDS ─────────── */
// const BRANDS = [
//   { name: 'AJ Grand',             handle: 'ajgrandelitehotel'              },
//   { name: 'Neelambari',           handle: 'neelambariestatehomestay'        },
//   { name: 'Oxyrich',              handle: 'oxyrich_coorg'                   },
//   { name: 'Sasyakashi',           handle: 'sasyakashihomestay'              },
//   { name: 'Shree Durga',          handle: 'shreedurgaparadise'              },
//   { name: 'Grand Vista',          handle: 'hotelgrandvista.rjn'             },
//   { name: 'RK Foodscape',         handle: 'rk.foodscape'                    },
//   { name: 'Malnad Mist',          handle: 'malnad_mist_vintage_homestay'    },
//   { name: 'Caligo Resort',        handle: 'caligoresortcoorg_'              },
//   { name: 'Vedanth Veg',          handle: 'vedanth.veg'                     },
//   { name: 'Southern Star Dvg',    handle: 'southernstardvg'                 },
//   { name: 'Southern Star Blr',    handle: 'southern_star_blr'               },
//   { name: 'Southern Star Mysore', handle: 'southernstar.mysore'             },
//   { name: 'Dew Drops Dandeli',    handle: 'dewdropsdandeli'                 },
//   { name: 'Supriya Intl',         handle: 'hotel_supriyainternational'      },
//   { name: 'Kadumakki Camp',       handle: 'kadumakkinaturecamp'             },
//   { name: 'Kadumakki Resort',     handle: 'kadumakkiresort'                 },
//   { name: 'Discovery Plantation', handle: 'discoveryplantationdelights'     },
//   { name: 'Nature Valley',        handle: 'naturevalley.resort'             },
//   { name: 'Suraj Inn',            handle: 'hotelsurajinnbelman'             },
//   { name: 'Ashok Inn',            handle: 'ashokinn.dvg'                    },
//   { name: 'Tulip Inn',            handle: 'tulipsinn.kalaburagi'            },
//   { name: 'Urban Sky',            handle: 'the_urban_sky_'                  },
//   { name: 'Suvidha Resort',       handle: 'suvida_resort_wedding_destiny'   },
//   { name: 'Royal Roots',          handle: 'royalrootsresorts'               },
//   { name: 'Knipex Tools',         handle: 'knipextoolsindia'                },
//   { name: 'MT Store',             handle: 'mtstore_in'                      },
//   { name: 'Rivora Coorg',         handle: 'rivora_coorg'                    },
//   { name: 'Namma Tours',          handle: 'namma.tours'                     },
//   { name: 'Namma Hotels',         handle: 'namma.hotels'                    },
//   { name: 'Namma Events',         handle: 'namma_events___'                 },
//   { name: 'Geluvu',               handle: 'geluvu.in'                       },
//   { name: 'Coorg Bungee',         handle: 'coorg_bungyjump'                 },
//   { name: 'Drustic Creations',    handle: 'drusticreations'                 },
// ];

// /* ─────────── TESTIMONIALS ─────────── */
// const TESTIMONIALS = [
//   {
//     name:    'Rahul Shetty',
//     role:    'General Manager',
//     brand:   'AJ Grand Elite Hotel',
//     handle:  'ajgrandelitehotel',
//     accent:  '#2352FF',
//     rating:  5,
//     quote:   "Market Captura completely transformed how we present AJ Grand online. Our Instagram engagement tripled in just 60 days, and direct booking inquiries went up by 40%. They don't just manage ads — they think like hotel owners.",
//   },
//   {
//     name:    'Priya Nair',
//     role:    'Co-owner',
//     brand:   'Southern Star Mysore',
//     handle:  'southernstar.mysore',
//     accent:  '#FF4F17',
//     rating:  5,
//     quote:   "We'd tried two agencies before with zero ROI. Market Captura built a unified strategy for all three of our Southern Star properties and finally gave us consistent brand storytelling. Occupancy is up 28% this quarter.",
//   },
//   {
//     name:    'Suresh Kumar',
//     role:    'Resort Director',
//     brand:   'Caligo Resort Coorg',
//     handle:  'caligoresortcoorg_',
//     accent:  '#2352FF',
//     rating:  5,
//     quote:   "The team understood the luxury experience we offer at Caligo from day one. Their content strategy and targeted Meta campaigns brought in a premium audience we simply weren't reaching before. Revenue from social has 4×'d.",
//   },
//   {
//     name:    'Anand Hegde',
//     role:    'Managing Partner',
//     brand:   'Kadumakki Resort',
//     handle:  'kadumakkiresort',
//     accent:  '#FF4F17',
//     rating:  5,
//     quote:   "Running both the nature camp and the resort is demanding. Market Captura handles all our digital presence seamlessly — it genuinely feels like an in-house team. Our off-season bookings have never been stronger.",
//   },
//   {
//     name:    'Deepa Murthy',
//     role:    'Founder',
//     brand:   'Namma Tours & Hotels',
//     handle:  'namma.tours',
//     accent:  '#2352FF',
//     rating:  5,
//     quote:   "They built an integrated strategy across Namma Tours, Hotels, and Events simultaneously — no confusion, no mixed messaging. Weekly reporting keeps us informed and the growth has been compounding every month.",
//   },
//   {
//     name:    'Vijay Rangaswamy',
//     role:    'Director of Sales',
//     brand:   'Royal Roots Resorts',
//     handle:  'royalrootsresorts',
//     accent:  '#FF4F17',
//     rating:  5,
//     quote:   "Market Captura's data-driven approach cut our cost-per-lead by half while doubling lead volume. The strategy calls are sharp, the execution is sharp — everything you want from a growth partner.",
//   },
//   {
//     name:    'Meghana Rao',
//     role:    'Brand Manager',
//     brand:   'Knipex Tools India',
//     handle:  'knipextoolsindia',
//     accent:  '#2352FF',
//     rating:  5,
//     quote:   "Breaking into the Indian B2B tools market digitally is not easy. Market Captura built our LinkedIn and Instagram presence from scratch, generated quality trade leads and helped us hit our H1 targets three weeks early.",
//   },
// ];

// /* ─── helpers ─── */
// const Stars = ({ count }: { count: number }) => (
//   <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
//     {Array.from({ length: count }).map((_, i) => (
//       <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#F59E0B">
//         <path d="M7 1l1.545 3.09L12 4.635l-2.5 2.41.59 3.41L7 8.9l-3.09 1.555L4.5 7.045 2 4.635l3.455-.545z" />
//       </svg>
//     ))}
//   </div>
// );

// /* ─── initials avatar ─── */
// const Avatar = ({ name, accent }: { name: string; accent: string }) => {
//   const initials = name.split(' ').map((w: string) => w[0]).join('').slice(0, 2);
//   return (
//     <div style={{
//       width: 42, height: 42, borderRadius: '50%',
//       background: accent === '#2352FF' ? 'rgba(35,82,255,0.10)' : 'rgba(255,79,23,0.10)',
//       border: `2px solid ${accent === '#2352FF' ? 'rgba(35,82,255,0.18)' : 'rgba(255,79,23,0.18)'}`,
//       display: 'flex', alignItems: 'center', justifyContent: 'center',
//       fontFamily: "'Syne', sans-serif",
//       fontSize: '0.78rem', fontWeight: 800,
//       color: accent, letterSpacing: '-0.01em', flexShrink: 0,
//     }}>
//       {initials}
//     </div>
//   );
// };

// interface WhyUsSectionProps {
//   onGetStarted?: () => void;
// }

// export default function WhyUsSection({ onGetStarted }: WhyUsSectionProps) {
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const io = new IntersectionObserver(
//       entries => entries.forEach(e => {
//         if (e.isIntersecting) e.target.classList.add('wu2-in');
//       }),
//       { threshold: 0.08 }
//     );
//     ref.current?.querySelectorAll('.wu2-anim').forEach(el => io.observe(el));
//     return () => io.disconnect();
//   }, []);

//   /* Duplicate for seamless loop */
//   const marqueeItems = [...BRANDS, ...BRANDS];

//   return (
//     <section
//       id="why-us"
//       ref={ref}
//       style={{
//         background: '#F7F9FE',
//         padding: 'clamp(80px, 10vw, 130px) 0',
//         position: 'relative',
//         overflow: 'hidden',
//         fontFamily: "'DM Sans', sans-serif",
//       }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

//         /* ── Reveal animations ── */
//         .wu2-anim {
//           opacity: 0;
//           transform: translateY(22px);
//           transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
//                       transform 0.7s cubic-bezier(0.22,1,0.36,1);
//         }
//         .wu2-anim.wu2-in { opacity: 1; transform: translateY(0); }

//         /* ── Marquee ── */
//         @keyframes wu2-scroll {
//           from { transform: translateX(0); }
//           to   { transform: translateX(-50%); }
//         }
//         .wu2-marquee-track {
//           display: flex;
//           width: max-content;
//           animation: wu2-scroll 38s linear infinite;
//         }
//         .wu2-marquee-track:hover { animation-play-state: paused; }
//         .wu2-brand-chip {
//           display: inline-flex; align-items: center; gap: 9px;
//           background: #fff; border: 1.5px solid #E8EEF8;
//           border-radius: 60px; padding: 9px 20px 9px 14px;
//           white-space: nowrap; margin-right: 12px;
//           transition: border-color 0.22s ease, box-shadow 0.22s ease;
//           cursor: default;
//         }
//         .wu2-brand-chip:hover {
//           border-color: rgba(35,82,255,0.22);
//           box-shadow: 0 4px 16px rgba(35,82,255,0.08);
//         }
//         .wu2-brand-dot {
//           width: 6px; height: 6px; border-radius: 50%;
//           background: linear-gradient(135deg, #2352FF, #FF4F17);
//           flex-shrink: 0;
//         }

//         /* ── Testimonial cards ── */
//         .wu2-tcard {
//           background: #fff;
//           border: 1.5px solid #E8EEF8;
//           border-radius: 20px;
//           padding: 28px 26px;
//           position: relative;
//           overflow: hidden;
//           transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
//           cursor: default;
//         }
//         .wu2-tcard:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 18px 48px rgba(35,82,255,0.11);
//           border-color: rgba(35,82,255,0.18);
//         }
//         .wu2-tcard.orange:hover { border-color: rgba(255,79,23,0.18); }
//         .wu2-tcard::after {
//           content: '';
//           position: absolute;
//           bottom: 0; left: 0; right: 0; height: 2px;
//           border-radius: 0 0 20px 20px;
//           opacity: 0; transition: opacity 0.25s ease;
//         }
//         .wu2-tcard:hover::after { opacity: 1; }
//         .wu2-tcard.blue::after  { background: linear-gradient(90deg, #2352FF, transparent); }
//         .wu2-tcard.orange::after { background: linear-gradient(90deg, #FF4F17, transparent); }

//         /* ── Grid ── */
//         @media (max-width: 900px) {
//           .wu2-tgrid { grid-template-columns: repeat(2, 1fr) !important; }
//         }
//         @media (max-width: 560px) {
//           .wu2-tgrid { grid-template-columns: 1fr !important; }
//         }
//       `}</style>

//       {/* Subtle dot grid */}
//       <div style={{
//         position: 'absolute', inset: 0, pointerEvents: 'none',
//         backgroundImage: 'radial-gradient(rgba(35,82,255,0.055) 1px, transparent 1px)',
//         backgroundSize: '28px 28px',
//       }} />

//       {/* Ambient blobs */}
//       <div style={{
//         position: 'absolute', width: 500, height: 500, borderRadius: '50%',
//         background: 'radial-gradient(circle, rgba(35,82,255,0.06) 0%, transparent 65%)',
//         top: -150, right: -120, pointerEvents: 'none',
//       }} />
//       <div style={{
//         position: 'absolute', width: 360, height: 360, borderRadius: '50%',
//         background: 'radial-gradient(circle, rgba(255,79,23,0.05) 0%, transparent 65%)',
//         bottom: -80, left: '15%', pointerEvents: 'none',
//       }} />

//       {/* ── Container ── */}
//       <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>

//         {/* ════ TRUSTED BRANDS HEADER ════ */}
//         <div className="wu2-anim" style={{ textAlign: 'center', marginBottom: 40 }}>
//           {/* Eyebrow */}
//           <div style={{
//             display: 'inline-flex', alignItems: 'center', gap: 8,
//             background: '#fff', border: '1.5px solid #E8EEF8',
//             borderRadius: 60, padding: '6px 16px 6px 11px',
//             marginBottom: 20, boxShadow: '0 2px 10px rgba(35,82,255,0.06)',
//           }}>
//             <span style={{
//               width: 7, height: 7, borderRadius: '50%',
//               background: '#2352FF', display: 'inline-block',
//               boxShadow: '0 0 0 3px rgba(35,82,255,0.15)', flexShrink: 0,
//             }} />
//             <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
//               Trusted by 34+ Brands
//             </span>
//           </div>

//           <h2 style={{
//             fontFamily: "'Syne', sans-serif",
//             fontSize: 'clamp(1.9rem, 3.8vw, 3rem)',
//             fontWeight: 800, color: '#0D1B3E',
//             lineHeight: 1.08, letterSpacing: '-0.03em',
//             marginBottom: 14,
//           }}>
//             Brands that{' '}
//             <span style={{ color: '#FF4F17' }}>trust us to grow.</span>
//           </h2>

//           <p style={{ color: '#6B7280', lineHeight: 1.8, fontSize: '0.95rem', maxWidth: 520, margin: '0 auto' }}>
//             From boutique homestays to hotel chains — we've driven measurable growth across hospitality, travel, and beyond.
//           </p>
//         </div>

//       </div>

//       {/* ════ MARQUEE — full bleed ════ */}
//       <div className="wu2-anim" style={{ overflow: 'hidden', padding: '8px 0 40px', position: 'relative', zIndex: 1 }}>
//         {/* Fade edges */}
//         <div style={{
//           position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
//           background: 'linear-gradient(to right, #F7F9FE, transparent)',
//           pointerEvents: 'none',
//         }} />
//         <div style={{
//           position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
//           background: 'linear-gradient(to left, #F7F9FE, transparent)',
//           pointerEvents: 'none',
//         }} />

//         <div className="wu2-marquee-track">
//           {marqueeItems.map((b, i) => (
//             <a
//               key={`${b.handle}-${i}`}
//               href={`https://www.instagram.com/${b.handle}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="wu2-brand-chip"
//               style={{ textDecoration: 'none' }}
//             >
//               <span className="wu2-brand-dot" />
//               <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0D1B3E', letterSpacing: '-0.01em' }}>
//                 {b.name}
//               </span>
//               <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.4 }}>
//                 <path d="M2 8L8 2M8 2H4M8 2V6" stroke="#0D1B3E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//             </a>
//           ))}
//         </div>
//       </div>

//       {/* ── Container ── */}
//       <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>

//         {/* ════ TESTIMONIALS HEADER ════ */}
//         <div className="wu2-anim" style={{ marginBottom: 40 }}>
//           <div style={{
//             display: 'inline-flex', alignItems: 'center', gap: 8,
//             background: '#fff', border: '1.5px solid #E8EEF8',
//             borderRadius: 60, padding: '6px 16px 6px 11px',
//             marginBottom: 16, boxShadow: '0 2px 10px rgba(255,79,23,0.06)',
//           }}>
//             <span style={{
//               width: 7, height: 7, borderRadius: '50%',
//               background: '#FF4F17', display: 'inline-block', flexShrink: 0,
//               boxShadow: '0 0 0 3px rgba(255,79,23,0.15)',
//             }} />
//             <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
//               Client Testimonials
//             </span>
//           </div>

//           <h3 style={{
//             fontFamily: "'Syne', sans-serif",
//             fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
//             fontWeight: 800, color: '#0D1B3E',
//             letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0,
//           }}>
//             Results that speak{' '}
//             <span style={{ color: '#2352FF' }}>for themselves.</span>
//           </h3>
//         </div>

//         {/* ════ TESTIMONIAL CARDS ════ */}
//         <div
//           className="wu2-tgrid"
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(3, 1fr)',
//             gap: 16,
//             marginBottom: 64,
//           }}
//         >
//           {TESTIMONIALS.map((t, i) => (
//             <div
//               key={t.handle}
//               className={`wu2-anim wu2-tcard ${t.accent === '#2352FF' ? 'blue' : 'orange'}`}
//               style={{ transitionDelay: `${i * 70}ms` }}
//             >
//               {/* Corner quote mark */}
//               <div style={{
//                 position: 'absolute', top: 18, right: 22,
//                 fontFamily: "'Syne', sans-serif",
//                 fontSize: '4rem', lineHeight: 1, fontWeight: 800,
//                 color: t.accent === '#2352FF' ? 'rgba(35,82,255,0.06)' : 'rgba(255,79,23,0.07)',
//                 userSelect: 'none', pointerEvents: 'none',
//               }}>
//                 "
//               </div>

//               {/* Stars */}
//               <Stars count={t.rating} />

//               {/* Quote */}
//               <p style={{
//                 color: '#374151',
//                 fontSize: '0.855rem',
//                 lineHeight: 1.78,
//                 margin: '0 0 22px',
//                 position: 'relative',
//               }}>
//                 "{t.quote}"
//               </p>

//               {/* Divider */}
//               <div style={{
//                 height: 1,
//                 background: 'linear-gradient(90deg, #E8EEF8, transparent)',
//                 marginBottom: 18,
//               }} />

//               {/* Author */}
//               <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//                 <Avatar name={t.name} accent={t.accent} />
//                 <div>
//                   <div style={{
//                     fontFamily: "'Syne', sans-serif",
//                     fontSize: '0.88rem', fontWeight: 700,
//                     color: '#0D1B3E', letterSpacing: '-0.01em',
//                   }}>
//                     {t.name}
//                   </div>
//                   <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: 2 }}>
//                     {t.role} · {t.brand}
//                   </div>
//                 </div>

//                 {/* Instagram pill */}
//                 <a
//                   href={`https://www.instagram.com/${t.handle}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{
//                     marginLeft: 'auto',
//                     display: 'inline-flex', alignItems: 'center', gap: 5,
//                     background: t.accent === '#2352FF' ? 'rgba(35,82,255,0.07)' : 'rgba(255,79,23,0.07)',
//                     border: `1.2px solid ${t.accent === '#2352FF' ? 'rgba(35,82,255,0.15)' : 'rgba(255,79,23,0.15)'}`,
//                     borderRadius: 60, padding: '5px 11px',
//                     textDecoration: 'none',
//                     fontSize: '0.67rem', fontWeight: 700,
//                     color: t.accent,
//                     letterSpacing: '0.02em', whiteSpace: 'nowrap',
//                     flexShrink: 0,
//                     transition: 'opacity 0.2s',
//                   }}
//                   onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
//                   onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
//                 >
//                   {/* Instagram icon */}
//                   <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
//                     <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
//                     <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
//                     <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
//                   </svg>
//                   View
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ════ CTA ════ */}
//         <div className="wu2-anim" style={{ textAlign: 'center' }}>
//           <p style={{ color: '#9AA5B4', fontSize: '0.88rem', marginBottom: 20 }}>
//             Ready to become our next success story?
//           </p>
//           <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
//             <button
//               onClick={onGetStarted}
//               style={{
//                 display: 'inline-flex', alignItems: 'center', gap: 8,
//                 background: 'linear-gradient(135deg, #2352FF, #1a3fd4)',
//                 color: '#fff', border: 'none', borderRadius: 60,
//                 padding: '14px 30px',
//                 fontFamily: "'Syne', sans-serif",
//                 fontWeight: 700, fontSize: '0.92rem',
//                 cursor: 'pointer', letterSpacing: '-0.01em',
//                 boxShadow: '0 4px 18px rgba(35,82,255,0.25)',
//                 transition: 'transform 0.22s ease, box-shadow 0.22s ease',
//                 whiteSpace: 'nowrap',
//               }}
//               onMouseEnter={e => {
//                 (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
//                 (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 32px rgba(35,82,255,0.36)';
//               }}
//               onMouseLeave={e => {
//                 (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
//                 (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 18px rgba(35,82,255,0.25)';
//               }}
//             >
//               Book a Free Strategy Call →
//             </button>
//             <button
//               onClick={() => document.getElementById('blogs')?.scrollIntoView({ behavior: 'smooth' })}
//               style={{
//                 display: 'inline-flex', alignItems: 'center', gap: 8,
//                 background: 'transparent', color: '#2352FF',
//                 border: '1.8px solid rgba(35,82,255,0.3)',
//                 borderRadius: 60, padding: '13px 26px',
//                 fontFamily: "'Syne', sans-serif",
//                 fontWeight: 700, fontSize: '0.92rem',
//                 cursor: 'pointer', letterSpacing: '-0.01em',
//                 transition: 'all 0.22s ease', whiteSpace: 'nowrap',
//               }}
//               onMouseEnter={e => {
//                 (e.currentTarget as HTMLElement).style.background = '#2352FF';
//                 (e.currentTarget as HTMLElement).style.color = '#fff';
//                 (e.currentTarget as HTMLElement).style.borderColor = '#2352FF';
//               }}
//               onMouseLeave={e => {
//                 (e.currentTarget as HTMLElement).style.background = 'transparent';
//                 (e.currentTarget as HTMLElement).style.color = '#2352FF';
//                 (e.currentTarget as HTMLElement).style.borderColor = 'rgba(35,82,255,0.3)';
//               }}
//             >
//               See Our Work
//             </button>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }



'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/* ─────────── BRANDS ─────────── */
const BRANDS = [
  { name: 'AJ Grand',             handle: 'ajgrandelitehotel',                category: 'Hotel'         },
  { name: 'Neelambari',           handle: 'neelambariestatehomestay',          category: 'Homestay'      },
  { name: 'Oxyrich',              handle: 'oxyrich_coorg',                     category: 'Homestay'      },
  { name: 'Sasyakashi',           handle: 'sasyakashihomestay',                category: 'Homestay'      },
  { name: 'Shree Durga',          handle: 'shreedurgaparadise',                category: 'Resort'        },
  { name: 'Grand Vista',          handle: 'hotelgrandvista.rjn',               category: 'Hotel'         },
  { name: 'RK Foodscape',         handle: 'rk.foodscape',                      category: 'F&B'           },
  { name: 'Malnad Mist',          handle: 'malnad_mist_vintage_homestay',      category: 'Homestay'      },
  { name: 'Caligo Resort',        handle: 'caligoresortcoorg_',                category: 'Resort'        },
  { name: 'Vedanth Veg',          handle: 'vedanth.veg',                       category: 'F&B'           },
  { name: 'Southern Star Dvg',    handle: 'southernstardvg',                   category: 'Hotel'         },
  { name: 'Southern Star Blr',    handle: 'southern_star_blr',                 category: 'Hotel'         },
  { name: 'Southern Star Mysore', handle: 'southernstar.mysore',               category: 'Hotel'         },
  { name: 'Dew Drops Dandeli',    handle: 'dewdropsdandeli',                   category: 'Resort'        },
  { name: 'Supriya Intl',         handle: 'hotel_supriyainternational',        category: 'Hotel'         },
  { name: 'Kadumakki Camp',       handle: 'kadumakkinaturecamp',               category: 'Nature Camp'   },
  { name: 'Kadumakki Resort',     handle: 'kadumakkiresort',                   category: 'Resort'        },
  { name: 'Discovery Plantation', handle: 'discoveryplantationdelights',       category: 'Resort'        },
  { name: 'Nature Valley',        handle: 'naturevalley.resort',               category: 'Resort'        },
  { name: 'Suraj Inn',            handle: 'hotelsurajinnbelman',               category: 'Hotel'         },
  { name: 'Ashok Inn',            handle: 'ashokinn.dvg',                      category: 'Hotel'         },
  { name: 'Tulip Inn',            handle: 'tulipsinn.kalaburagi',              category: 'Hotel'         },
  { name: 'Urban Sky',            handle: 'the_urban_sky_',                    category: 'Hotel'         },
  { name: 'Suvidha Resort',       handle: 'suvida_resort_wedding_destiny',     category: 'Resort'        },
  { name: 'Royal Roots',          handle: 'royalrootsresorts',                 category: 'Resort'        },
  { name: 'Knipex Tools',         handle: 'knipextoolsindia',                  category: 'Retail'        },
  { name: 'MT Store',             handle: 'mtstore_in',                        category: 'Retail'        },
  { name: 'Rivora Coorg',         handle: 'rivora_coorg',                      category: 'Resort'        },
  { name: 'Namma Tours',          handle: 'namma.tours',                       category: 'Travel'        },
  { name: 'Namma Hotels',         handle: 'namma.hotels',                      category: 'Hotel'         },
  { name: 'Namma Events',         handle: 'namma_events___',                   category: 'Events'        },
  { name: 'Geluvu',               handle: 'geluvu.in',                         category: 'Lifestyle'     },
  { name: 'Coorg Bungee',         handle: 'coorg_bungyjump',                   category: 'Adventure'     },
  { name: 'Drustic Creations',    handle: 'drusticreations',                   category: 'Creative'      },
];

const BRANDS_PER_PAGE = 8;

/* ─────────── TESTIMONIALS ─────────── */
const TESTIMONIALS = [
  {
    name:    'Rahul Shetty',
    role:    'General Manager',
    brand:   'AJ Grand Elite Hotel',
    handle:  'ajgrandelitehotel',
    accent:  '#2352FF',
    rating:  5,
    quote:   "Market Captura completely transformed how we present AJ Grand online. Our Instagram engagement tripled in just 60 days, and direct booking inquiries went up by 40%. They don't just manage ads — they think like hotel owners.",
    metric:  '+40% bookings',
  },
  {
    name:    'Priya Nair',
    role:    'Co-owner',
    brand:   'Southern Star Mysore',
    handle:  'southernstar.mysore',
    accent:  '#FF4F17',
    rating:  5,
    quote:   "We'd tried two agencies before with zero ROI. Market Captura built a unified strategy for all three of our Southern Star properties and finally gave us consistent brand storytelling. Occupancy is up 28% this quarter.",
    metric:  '+28% occupancy',
  },
  {
    name:    'Suresh Kumar',
    role:    'Resort Director',
    brand:   'Caligo Resort Coorg',
    handle:  'caligoresortcoorg_',
    accent:  '#2352FF',
    rating:  5,
    quote:   "The team understood the luxury experience we offer at Caligo from day one. Their content strategy and targeted Meta campaigns brought in a premium audience we simply weren't reaching before. Revenue from social has 4×'d.",
    metric:  '4× social revenue',
  },
  {
    name:    'Anand Hegde',
    role:    'Managing Partner',
    brand:   'Kadumakki Resort',
    handle:  'kadumakkiresort',
    accent:  '#FF4F17',
    rating:  5,
    quote:   "Running both the nature camp and the resort is demanding. Market Captura handles all our digital presence seamlessly — it genuinely feels like an in-house team. Our off-season bookings have never been stronger.",
    metric:  'Off-season record',
  },
  {
    name:    'Deepa Murthy',
    role:    'Founder',
    brand:   'Namma Tours & Hotels',
    handle:  'namma.tours',
    accent:  '#2352FF',
    rating:  5,
    quote:   "They built an integrated strategy across Namma Tours, Hotels, and Events simultaneously — no confusion, no mixed messaging. Weekly reporting keeps us informed and the growth has been compounding every month.",
    metric:  'Monthly compounding',
  },
  {
    name:    'Vijay Rangaswamy',
    role:    'Director of Sales',
    brand:   'Royal Roots Resorts',
    handle:  'royalrootsresorts',
    accent:  '#FF4F17',
    rating:  5,
    quote:   "Market Captura's data-driven approach cut our cost-per-lead by half while doubling lead volume. The strategy calls are sharp, the execution is sharp — everything you want from a growth partner.",
    metric:  '2× leads, –50% CPL',
  },
  {
    name:    'Meghana Rao',
    role:    'Brand Manager',
    brand:   'Knipex Tools India',
    handle:  'knipextoolsindia',
    accent:  '#2352FF',
    rating:  5,
    quote:   "Breaking into the Indian B2B tools market digitally is not easy. Market Captura built our LinkedIn and Instagram presence from scratch, generated quality trade leads and helped us hit our H1 targets three weeks early.",
    metric:  'H1 targets early',
  },
];

/* ─── helpers ─── */
const Stars = ({ count }: { count: number }) => (
  <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width="13" height="13" viewBox="0 0 14 14" fill="#F59E0B">
        <path d="M7 1l1.545 3.09L12 4.635l-2.5 2.41.59 3.41L7 8.9l-3.09 1.555L4.5 7.045 2 4.635l3.455-.545z" />
      </svg>
    ))}
  </div>
);

/* ─── Brand Logo with fallback ─── */
const BrandLogo = ({ handle, name, size = 56 }: { handle: string; name: string; size?: number }) => {
  const [err, setErr] = useState(false);
  const initials = name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();

  if (err) {
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(35,82,255,0.10), rgba(255,79,23,0.10))',
        border: '1.5px solid rgba(35,82,255,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Syne', sans-serif",
        fontSize: size * 0.28 + 'px', fontWeight: 800,
        color: '#2352FF', letterSpacing: '-0.01em', flexShrink: 0,
      }}>
        {initials}
      </div>
    );
  }

  return (
    <img
      src={`https://unavatar.io/instagram/${handle}`}
      alt={name}
      width={size}
      height={size}
      onError={() => setErr(true)}
      style={{
        width: size, height: size, borderRadius: '50%',
        objectFit: 'cover', border: '1.5px solid #E8EEF8',
        display: 'block', flexShrink: 0,
      }}
    />
  );
};

/* ─── Category tag color map ─── */
const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  Hotel:       { bg: 'rgba(35,82,255,0.07)',  text: '#2352FF' },
  Homestay:    { bg: 'rgba(16,185,129,0.08)', text: '#059669' },
  Resort:      { bg: 'rgba(139,92,246,0.08)', text: '#7C3AED' },
  'F&B':       { bg: 'rgba(245,158,11,0.10)', text: '#B45309' },
  'Nature Camp':{ bg: 'rgba(16,185,129,0.08)',text: '#059669' },
  Travel:      { bg: 'rgba(6,182,212,0.08)',  text: '#0284C7' },
  Events:      { bg: 'rgba(255,79,23,0.08)',  text: '#FF4F17' },
  Retail:      { bg: 'rgba(99,102,241,0.08)', text: '#4338CA' },
  Lifestyle:   { bg: 'rgba(236,72,153,0.08)', text: '#BE185D' },
  Adventure:   { bg: 'rgba(245,158,11,0.10)', text: '#B45309' },
  Creative:    { bg: 'rgba(255,79,23,0.08)',  text: '#FF4F17' },
};

interface WhyUsSectionProps {
  onGetStarted?: () => void;
}

export default function WhyUsSection({ onGetStarted }: WhyUsSectionProps) {
  const sectionRef       = useRef<HTMLElement>(null);
  const testimonialsRef  = useRef<HTMLDivElement>(null);

  /* Brand pagination */
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(BRANDS.length / BRANDS_PER_PAGE);
  const visibleBrands = BRANDS.slice(page * BRANDS_PER_PAGE, (page + 1) * BRANDS_PER_PAGE);

  /* Testimonial scroll arrows */
  const scrollTestimonials = (dir: 'left' | 'right') => {
    const el = testimonialsRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'right' ? 360 : -360, behavior: 'smooth' });
  };

  /* Intersection reveal */
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('wu2-in');
      }),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll('.wu2-anim').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Re-observe brand cards on page change */
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('wu2-in');
      }),
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll('.wu2-brand-card').forEach(el => {
      el.classList.remove('wu2-in');
      io.observe(el);
    });
    return () => io.disconnect();
  }, [page]);

  return (
    <section
      id="why-us"
      ref={sectionRef}
      style={{
        background: '#F7F9FE',
        padding: 'clamp(80px, 10vw, 130px) 0',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        /* ── Reveal ── */
        .wu2-anim {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1),
                      transform 0.65s cubic-bezier(0.22,1,0.36,1);
        }
        .wu2-anim.wu2-in { opacity: 1; transform: translateY(0); }

        /* ── Brand card ── */
        .wu2-brand-card {
          opacity: 0;
          transform: translateY(16px) scale(0.97);
          transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1),
                      transform 0.5s cubic-bezier(0.22,1,0.36,1),
                      border-color 0.22s ease,
                      box-shadow 0.22s ease;
          background: #fff;
          border: 1.5px solid #E8EEF8;
          border-radius: 16px;
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }
        .wu2-brand-card.wu2-in { opacity: 1; transform: translateY(0) scale(1); }
        .wu2-brand-card:hover {
          border-color: rgba(35,82,255,0.22);
          box-shadow: 0 12px 36px rgba(35,82,255,0.10);
          transform: translateY(-3px) scale(1.01) !important;
        }
        .wu2-brand-card:hover .wu2-insta-pill {
          opacity: 1;
          transform: translateY(0);
        }
        .wu2-insta-pill {
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        /* ── Pagination arrow ── */
        .wu2-arrow {
          width: 42px; height: 42px; border-radius: 50%;
          background: #fff; border: 1.5px solid #E8EEF8;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.22s ease;
          flex-shrink: 0;
        }
        .wu2-arrow:hover:not(:disabled) {
          background: #2352FF; border-color: #2352FF;
        }
        .wu2-arrow:hover:not(:disabled) svg { stroke: #fff; }
        .wu2-arrow:disabled { opacity: 0.3; cursor: not-allowed; }

        /* ── Testimonial scroll container ── */
        .wu2-tscroll {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding-bottom: 12px;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .wu2-tscroll::-webkit-scrollbar { display: none; }

        /* ── Testimonial card ── */
        .wu2-tcard {
          background: #fff;
          border: 1.5px solid #E8EEF8;
          border-radius: 20px;
          padding: 26px 24px;
          position: relative;
          overflow: hidden;
          flex: 0 0 340px;
          scroll-snap-align: start;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .wu2-tcard:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 42px rgba(35,82,255,0.10);
        }
        .wu2-tcard.blue:hover  { border-color: rgba(35,82,255,0.20); }
        .wu2-tcard.orange:hover { border-color: rgba(255,79,23,0.20); }

        /* ── Scroll arrow ── */
        .wu2-scroll-arrow {
          width: 40px; height: 40px; border-radius: 50%;
          background: #fff; border: 1.5px solid #E8EEF8;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; flex-shrink: 0;
          transition: all 0.22s ease;
        }
        .wu2-scroll-arrow:hover { background: #2352FF; border-color: #2352FF; }
        .wu2-scroll-arrow:hover svg { stroke: #fff; }

        /* ── Brand grid responsive ── */
        @media (max-width: 768px) {
          .wu2-brand-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .wu2-brand-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .wu2-tcard { flex: 0 0 290px; }
        }
      `}</style>

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(35,82,255,0.05) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Ambient blobs */}
      <div style={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(35,82,255,0.06) 0%, transparent 65%)',
        top: -150, right: -120, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: 360, height: 360, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,79,23,0.05) 0%, transparent 65%)',
        bottom: -80, left: '15%', pointerEvents: 'none',
      }} />

      {/* ── Container ── */}
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>

        {/* ════ BRANDS HEADER ════ */}
        <div className="wu2-anim" style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', border: '1.5px solid #E8EEF8',
            borderRadius: 60, padding: '6px 16px 6px 11px',
            marginBottom: 18, boxShadow: '0 2px 10px rgba(35,82,255,0.06)',
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%', background: '#2352FF',
              display: 'inline-block', boxShadow: '0 0 0 3px rgba(35,82,255,0.15)', flexShrink: 0,
            }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Trusted by 34+ Brands
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(1.9rem, 3.8vw, 3rem)',
            fontWeight: 800, color: '#0D1B3E',
            lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 12,
          }}>
            Brands that{' '}
            <span style={{ color: '#FF4F17' }}>trust us to grow.</span>
          </h2>

          <p style={{ color: '#6B7280', lineHeight: 1.8, fontSize: '0.95rem', maxWidth: 520, margin: '0 auto' }}>
            From boutique homestays to hotel chains — we've driven measurable growth across hospitality, travel, and beyond.
          </p>
        </div>

        {/* ════ BRAND GRID ════ */}
        <div className="wu2-anim" style={{ marginBottom: 48 }}>

          {/* Brand cards */}
          <div
            className="wu2-brand-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 14,
              marginBottom: 20,
            }}
          >
            {visibleBrands.map((b, i) => {
              const cat = CAT_COLORS[b.category] || { bg: 'rgba(35,82,255,0.07)', text: '#2352FF' };
              return (
                <a
                  key={b.handle}
                  href={`https://www.instagram.com/${b.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wu2-brand-card"
                  style={{ transitionDelay: `${i * 45}ms` }}
                >
                  {/* Instagram icon overlay */}
                  <div className="wu2-insta-pill" style={{
                    position: 'absolute', top: 10, right: 10,
                    background: 'rgba(35,82,255,0.08)',
                    border: '1px solid rgba(35,82,255,0.12)',
                    borderRadius: 60, padding: '3px 8px',
                    display: 'flex', alignItems: 'center', gap: 4,
                    fontSize: '0.6rem', fontWeight: 700, color: '#2352FF',
                    letterSpacing: '0.04em',
                  }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2.2"/>
                      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2.2"/>
                      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
                    </svg>
                    View
                  </div>

                  {/* Logo */}
                  <BrandLogo handle={b.handle} name={b.name} size={52} />

                  {/* Name */}
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '0.78rem', fontWeight: 700,
                    color: '#0D1B3E', letterSpacing: '-0.01em',
                    textAlign: 'center', lineHeight: 1.3,
                  }}>
                    {b.name}
                  </div>

                  {/* Handle */}
                  <div style={{
                    fontSize: '0.65rem', color: '#9CA3AF',
                    textAlign: 'center', letterSpacing: '0.01em',
                  }}>
                    @{b.handle.length > 18 ? b.handle.slice(0, 16) + '…' : b.handle}
                  </div>

                  {/* Category tag */}
                  <div style={{
                    background: cat.bg,
                    color: cat.text,
                    fontSize: '0.6rem', fontWeight: 700,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    padding: '3px 9px', borderRadius: 60,
                  }}>
                    {b.category}
                  </div>
                </a>
              );
            })}
          </div>

          {/* Pagination row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            {/* Prev */}
            <button
              className="wu2-arrow"
              disabled={page === 0}
              onClick={() => setPage(p => p - 1)}
              aria-label="Previous brands"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#0D1B3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 12L6 8l4-4" />
              </svg>
            </button>

            {/* Dots */}
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPage(idx)}
                  style={{
                    width: idx === page ? 20 : 7,
                    height: 7,
                    borderRadius: 60,
                    background: idx === page ? '#2352FF' : '#D1D5DB',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'all 0.25s ease',
                  }}
                  aria-label={`Page ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              className="wu2-arrow"
              disabled={page === totalPages - 1}
              onClick={() => setPage(p => p + 1)}
              aria-label="Next brands"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#0D1B3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 12l4-4-4-4" />
              </svg>
            </button>

            {/* Page counter */}
            <span style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 600, marginLeft: 4 }}>
              {page * BRANDS_PER_PAGE + 1}–{Math.min((page + 1) * BRANDS_PER_PAGE, BRANDS.length)} of {BRANDS.length}
            </span>
          </div>
        </div>

        {/* ════ TESTIMONIALS HEADER ════ */}
        <div className="wu2-anim" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#fff', border: '1.5px solid #E8EEF8',
                borderRadius: 60, padding: '6px 16px 6px 11px',
                marginBottom: 14, boxShadow: '0 2px 10px rgba(255,79,23,0.06)',
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%', background: '#FF4F17',
                  display: 'inline-block', flexShrink: 0, boxShadow: '0 0 0 3px rgba(255,79,23,0.15)',
                }} />
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Client Testimonials
                </span>
              </div>

              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                fontWeight: 800, color: '#0D1B3E',
                letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0,
              }}>
                Results that speak{' '}
                <span style={{ color: '#2352FF' }}>for themselves.</span>
              </h3>
            </div>

            {/* Scroll arrows */}
            <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
              <button
                className="wu2-scroll-arrow"
                onClick={() => scrollTestimonials('left')}
                aria-label="Scroll left"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="#0D1B3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 12L6 8l4-4" />
                </svg>
              </button>
              <button
                className="wu2-scroll-arrow"
                onClick={() => scrollTestimonials('right')}
                aria-label="Scroll right"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="#0D1B3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 12l4-4-4-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ════ TESTIMONIAL HORIZONTAL SCROLL ════ */}
        <div className="wu2-anim" style={{ marginBottom: 64, position: 'relative' }}>
          {/* Left fade */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 12, width: 32, zIndex: 2,
            background: 'linear-gradient(to right, #F7F9FE, transparent)',
            pointerEvents: 'none',
          }} />
          {/* Right fade */}
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 12, width: 32, zIndex: 2,
            background: 'linear-gradient(to left, #F7F9FE, transparent)',
            pointerEvents: 'none',
          }} />

          <div className="wu2-tscroll" ref={testimonialsRef}>
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.handle}
                className={`wu2-tcard ${t.accent === '#2352FF' ? 'blue' : 'orange'}`}
              >
                {/* Metric badge */}
                <div style={{
                  position: 'absolute', top: 18, right: 18,
                  background: t.accent === '#2352FF' ? 'rgba(35,82,255,0.08)' : 'rgba(255,79,23,0.08)',
                  border: `1px solid ${t.accent === '#2352FF' ? 'rgba(35,82,255,0.15)' : 'rgba(255,79,23,0.15)'}`,
                  borderRadius: 60, padding: '4px 10px',
                  fontSize: '0.65rem', fontWeight: 800, color: t.accent,
                  letterSpacing: '0.01em', fontFamily: "'Syne', sans-serif",
                }}>
                  {t.metric}
                </div>

                {/* Stars */}
                <Stars count={t.rating} />

                {/* Quote */}
                <p style={{
                  color: '#374151', fontSize: '0.855rem',
                  lineHeight: 1.78, margin: '0 0 20px', paddingRight: 8,
                }}>
                  "{t.quote}"
                </p>

                {/* Divider */}
                <div style={{
                  height: 1,
                  background: 'linear-gradient(90deg, #E8EEF8, transparent)',
                  marginBottom: 16,
                }} />

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <BrandLogo handle={t.handle} name={t.name} size={38} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: '0.85rem', fontWeight: 700,
                      color: '#0D1B3E', letterSpacing: '-0.01em',
                    }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: 1 }}>
                      {t.role} · {t.brand}
                    </div>
                  </div>
                  <a
                    href={`https://www.instagram.com/${t.handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      background: t.accent === '#2352FF' ? 'rgba(35,82,255,0.07)' : 'rgba(255,79,23,0.07)',
                      border: `1.2px solid ${t.accent === '#2352FF' ? 'rgba(35,82,255,0.15)' : 'rgba(255,79,23,0.15)'}`,
                      borderRadius: 60, padding: '5px 10px',
                      textDecoration: 'none', fontSize: '0.63rem', fontWeight: 700,
                      color: t.accent, letterSpacing: '0.02em', whiteSpace: 'nowrap', flexShrink: 0,
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                    </svg>
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ════ CTA ════ */}
        <div className="wu2-anim" style={{ textAlign: 'center' }}>
          <p style={{ color: '#9AA5B4', fontSize: '0.88rem', marginBottom: 20 }}>
            Ready to become our next success story?
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={onGetStarted}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg, #2352FF, #1a3fd4)',
                color: '#fff', border: 'none', borderRadius: 60,
                padding: '14px 30px',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700, fontSize: '0.92rem',
                cursor: 'pointer', letterSpacing: '-0.01em',
                boxShadow: '0 4px 18px rgba(35,82,255,0.25)',
                transition: 'transform 0.22s ease, box-shadow 0.22s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 32px rgba(35,82,255,0.36)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 18px rgba(35,82,255,0.25)';
              }}
            >
              Book a Free Strategy Call →
            </button>
            <button
              onClick={() => document.getElementById('blogs')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'transparent', color: '#2352FF',
                border: '1.8px solid rgba(35,82,255,0.3)',
                borderRadius: 60, padding: '13px 26px',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700, fontSize: '0.92rem',
                cursor: 'pointer', letterSpacing: '-0.01em',
                transition: 'all 0.22s ease', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#2352FF';
                (e.currentTarget as HTMLElement).style.color = '#fff';
                (e.currentTarget as HTMLElement).style.borderColor = '#2352FF';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = '#2352FF';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(35,82,255,0.3)';
              }}
            >
              See Our Work
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}