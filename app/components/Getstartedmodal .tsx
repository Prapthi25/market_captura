// 'use client';

// interface GetStartedModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {  
//   if (!isOpen) return null;

//   return (
//     <div
//       style={{
//         position: 'fixed',
//         inset: 0,
//         background: 'rgba(5,13,31,0.85)',
//         backdropFilter: 'blur(12px)',
//         zIndex: 5000,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 24,
//         animation: 'fadeIn 0.3s ease',
//       }}
//       onClick={e => e.target === e.currentTarget && onClose()}
//     >
//       <div
//         className="glass-card"
//         style={{
//           maxWidth: 480,
//           width: '100%',
//           padding: 'clamp(32px,5vw,52px)',
//           position: 'relative',
//           animation: 'heroEnter 0.4s cubic-bezier(0.16,1,0.3,1)',
//           borderColor: 'rgba(1,69,242,0.3)',
//         }}
//       >
//         {/* Close */}
//         <button
//           onClick={onClose}
//           style={{
//             position: 'absolute',
//             top: 20,
//             right: 20,
//             background: 'none',
//             border: 'none',
//             color: 'var(--text-muted)',
//             fontSize: 22,
//             cursor: 'none',
//             lineHeight: 1,
//             transition: 'color 0.2s',
//           }}
//           onMouseEnter={e => (e.currentTarget.style.color = 'var(--light)')}
//           onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
//         >
//           ×
//         </button>

//         <div className="floating-badge" style={{ marginBottom: 20 }}>
//           <span className="badge-dot" />
//           Free Consultation
//         </div>

//         <h3
//           className="font-syne"
//           style={{
//             fontSize: 'clamp(1.4rem,3vw,2rem)',
//             fontWeight: 800,
//             letterSpacing: '-0.02em',
//             lineHeight: 1.15,
//             marginBottom: 8,
//           }}
//         >
//           Let&apos;s talk about{' '}
//           <span className="gradient-text-blue">your growth</span>
//         </h3>
//         <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: 32 }}>
//           Tell us about your brand and we&apos;ll get back to you within 24 hours.
//         </p>

//         {/* Form placeholder — implement your Firebase form here */}
//         <div
//           style={{
//             border: '1px dashed rgba(1,69,242,0.3)',
//             borderRadius: 16,
//             padding: '40px 24px',
//             textAlign: 'center',
//             background: 'rgba(1,69,242,0.03)',
//           }}
//         >
//           <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
//             🔧 Form component goes here
//           </p>
//           <p style={{ color: 'rgba(237,241,245,0.3)', fontSize: '0.78rem', marginTop: 6 }}>
//             Connect your Firebase Firestore form
//           </p>
//         </div>

//         {/* Quick contact */}
//         <div style={{ marginTop: 24, textAlign: 'center' }}>
//           <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
//             Or reach us directly at{' '}
//             <a
//               href="mailto:marketcaptura@gmail.com"
//               style={{ color: 'var(--primary)', textDecoration: 'none', cursor: 'none' }}
//             >
//               marketcaptura@gmail.com
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



// 'use client';

// interface GetStartedModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
//   if (!isOpen) return null;

//   return (
//     <>
//       <style>{`   
//         @keyframes mc-fade-in  { from { opacity:0 } to { opacity:1 } }
//         @keyframes mc-slide-up { from { opacity:0; transform:translateY(24px) scale(0.98) } to { opacity:1; transform:translateY(0) scale(1) } }
//         .mc-close-btn { transition: color 0.2s, background 0.2s; }
//         .mc-close-btn:hover { color: #0D1B3E !important; background: rgba(35,82,255,0.06) !important; }
//         .mc-submit-btn { transition: transform 0.22s ease, box-shadow 0.22s ease; }
//         .mc-submit-btn:hover { transform: scale(1.03); box-shadow: 0 8px 28px rgba(35,82,255,0.35) !important; }
//         .mc-email-link { transition: color 0.2s; }
//         .mc-email-link:hover { color: #2352FF !important; }
//       `}</style>

//       {/* Backdrop */}
//       <div
//         style={{
//           position: 'fixed', inset: 0,
//           background: 'rgba(13,27,62,0.45)',
//           backdropFilter: 'blur(10px)',
//           zIndex: 5000,
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//           padding: 24,
//           animation: 'mc-fade-in 0.28s ease',
//         }}
//         onClick={e => e.target === e.currentTarget && onClose()}
//       >
//         {/* Modal card */}
//         <div
//           style={{
//             maxWidth: 480, width: '100%',
//             background: '#fff',
//             border: '1.5px solid #E4ECF7',
//             borderRadius: 28,
//             padding: 'clamp(32px,5vw,52px)',
//             position: 'relative',
//             boxShadow: '0 24px 80px rgba(35,82,255,0.14), 0 4px 16px rgba(0,0,0,0.06)',
//             animation: 'mc-slide-up 0.38s cubic-bezier(0.16,1,0.3,1)',
//             fontFamily: 'Syne, sans-serif',
//             overflow: 'hidden',
//           }}
//         >
//           {/* Left accent border */}
//           <div style={{
//             position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
//             background: 'linear-gradient(to bottom,#2352FF,#FF4F17)',
//             borderRadius: '28px 0 0 28px',
//           }} />

//           {/* Top mesh glow */}
//           <div style={{
//             position: 'absolute', inset: 0,
//             backgroundImage: 'radial-gradient(ellipse at 100% 0%, rgba(35,82,255,0.04) 0%, transparent 55%)',
//             pointerEvents: 'none',
//           }} />

//           {/* Close button */}
//           <button
//             className="mc-close-btn"
//             onClick={onClose}
//             style={{
//               position: 'absolute', top: 18, right: 18,
//               background: 'none', border: '1.5px solid #E4ECF7',
//               borderRadius: '50%', width: 32, height: 32,
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               color: '#9AA5B4', fontSize: 18, cursor: 'pointer', lineHeight: 1,
//               fontFamily: 'Syne, sans-serif',
//             }}
//           >×</button>

//           {/* Label pill */}
//           <div style={{
//             display: 'inline-flex', alignItems: 'center', gap: 8,
//             background: '#fff', border: '1.5px solid #E4ECF7',
//             borderRadius: 60, padding: '6px 16px 6px 10px',
//             marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//           }}>
//             <span style={{ width:7, height:7, borderRadius:'50%', background:'linear-gradient(135deg,#2352FF,#1a3fd4)', display:'inline-block', flexShrink:0 }} />
//             <span style={{ fontSize:'0.72rem', fontWeight:700, color:'#0D1B3E', letterSpacing:'0.07em', textTransform:'uppercase' as const }}>
//               Free Consultation
//             </span>
//           </div>

//           <h3 style={{
//             fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800,
//             letterSpacing: '-0.025em', lineHeight: 1.12,
//             color: '#0D1B3E', marginBottom: 8,
//           }}>
//             Let&apos;s talk about{' '}
//             <span style={{ position:'relative', display:'inline-block', color:'#2352FF' }}>
//               your growth
//               <svg viewBox="0 0 180 10" xmlns="http://www.w3.org/2000/svg"
//                 style={{ position:'absolute', bottom:-4, left:0, width:'100%', height:7, opacity:0.35 }}>
//                 <path d="M2 6 Q45 2 90 6 Q135 10 178 6" stroke="#2352FF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
//               </svg>
//             </span>
//           </h3>

//           <p style={{ color:'#6B7280', fontSize:'0.9rem', lineHeight:1.72, marginBottom:28 }}>
//             Tell us about your brand and we&apos;ll get back to you within 24 hours.
//           </p>

//           {/* Form placeholder */}
//           <div style={{
//             border: '1.5px dashed rgba(35,82,255,0.2)',
//             borderRadius: 18,
//             padding: '36px 24px',
//             textAlign: 'center' as const,
//             background: 'rgba(35,82,255,0.03)',
//             marginBottom: 20,
//           }}>
//             <p style={{ color:'#9AA5B4', fontSize:'0.88rem' }}>🔧 Form component goes here</p>
//             <p style={{ color:'#B0B7C3', fontSize:'0.76rem', marginTop:6 }}>
//               Connect your Firebase Firestore form
//             </p>
//           </div>

//           {/* Submit button */}
//           <button
//             className="mc-submit-btn"
//             style={{
//               width: '100%',
//               background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
//               color: '#fff', border: 'none', borderRadius: 60,
//               padding: '14px 24px', fontSize: '0.95rem', fontWeight: 700,
//               cursor: 'pointer', letterSpacing: '-0.01em',
//               boxShadow: '0 4px 16px rgba(35,82,255,0.28)',
//               fontFamily: 'Syne, sans-serif',
//               marginBottom: 16,
//             }}
//           >
//             Book Free Strategy Call →
//           </button>

//           {/* Direct contact */}
//           <div style={{ textAlign:'center' as const, paddingTop:16, borderTop:'1px solid #E4ECF7' }}>
//             <p style={{ color:'#9AA5B4', fontSize:'0.82rem' }}>
//               Or reach us at{' '}
//               <a
//                 href="mailto:marketcaptura@gmail.com"
//                 className="mc-email-link"
//                 style={{ color:'#2352FF', textDecoration:'none', fontWeight:600 }}
//               >
//                 marketcaptura@gmail.com
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



'use client';

import ConsultationForm from "./Consultationform"; // adjust path

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <style>{`   
        @keyframes mc-fade-in  { from { opacity:0 } to { opacity:1 } }
        @keyframes mc-slide-up { from { opacity:0; transform:translateY(24px) scale(0.98) } to { opacity:1; transform:translateY(0) scale(1) } }
        .mc-close-btn { transition: color 0.2s, background 0.2s; }
        .mc-close-btn:hover { color: #0D1B3E !important; background: rgba(35,82,255,0.06) !important; }
        .mc-email-link { transition: color 0.2s; }
        .mc-email-link:hover { color: #2352FF !important; }
      `}</style>

      {/* Backdrop */}
      <div
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(13,27,62,0.45)',
          backdropFilter: 'blur(10px)',
          zIndex: 5000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24,
          animation: 'mc-fade-in 0.28s ease',
          overflowY: 'auto',
        }}
        onClick={e => e.target === e.currentTarget && onClose()}
      >
        {/* Modal card */}
        <div
          style={{
            maxWidth: 520, width: '100%',
            background: '#fff',
            border: '1.5px solid #E4ECF7',
            borderRadius: 28,
            padding: 'clamp(28px,5vw,48px)',
            position: 'relative',
            boxShadow: '0 24px 80px rgba(35,82,255,0.14), 0 4px 16px rgba(0,0,0,0.06)',
            animation: 'mc-slide-up 0.38s cubic-bezier(0.16,1,0.3,1)',
            fontFamily: 'Syne, sans-serif',
            overflow: 'hidden',
            margin: 'auto',
          }}
        >
          {/* Left accent border */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
            background: 'linear-gradient(to bottom,#2352FF,#FF4F17)',
            borderRadius: '28px 0 0 28px',
          }} />

          {/* Top mesh glow */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(ellipse at 100% 0%, rgba(35,82,255,0.04) 0%, transparent 55%)',
            pointerEvents: 'none',
          }} />

          {/* Close button */}
          <button
            className="mc-close-btn"
            onClick={onClose}
            style={{
              position: 'absolute', top: 18, right: 18,
              background: 'none', border: '1.5px solid #E4ECF7',
              borderRadius: '50%', width: 32, height: 32,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#9AA5B4', fontSize: 18, cursor: 'pointer', lineHeight: 1,
              fontFamily: 'Syne, sans-serif',
            }}
          >×</button>

          {/* Label pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', border: '1.5px solid #E4ECF7',
            borderRadius: 60, padding: '6px 16px 6px 10px',
            marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'linear-gradient(135deg,#2352FF,#1a3fd4)', display:'inline-block', flexShrink:0 }} />
            <span style={{ fontSize:'0.72rem', fontWeight:700, color:'#0D1B3E', letterSpacing:'0.07em', textTransform:'uppercase' as const }}>
              Free Consultation
            </span>
          </div>

          <h3 style={{
            fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 800,
            letterSpacing: '-0.025em', lineHeight: 1.12,
            color: '#0D1B3E', marginBottom: 6,
          }}>
            Let&apos;s talk about{' '}
            <span style={{ position:'relative', display:'inline-block', color:'#2352FF' }}>
              your growth
              <svg viewBox="0 0 180 10" xmlns="http://www.w3.org/2000/svg"
                style={{ position:'absolute', bottom:-4, left:0, width:'100%', height:7, opacity:0.35 }}>
                <path d="M2 6 Q45 2 90 6 Q135 10 178 6" stroke="#2352FF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h3>

          <p style={{ color:'#6B7280', fontSize:'0.88rem', lineHeight:1.7, marginBottom:24 }}>
            Tell us about your brand and we&apos;ll get back to you within 24 hours.
          </p>

          {/* ✅ Real form */}
          <ConsultationForm onSuccess={onClose} />

          {/* Direct contact */}
          <div style={{ textAlign:'center' as const, paddingTop:16, marginTop:12, borderTop:'1px solid #E4ECF7' }}>
            <p style={{ color:'#9AA5B4', fontSize:'0.82rem' }}>
              Or reach us at{' '}
              <a
                href="mailto:marketcaptura@gmail.com"
                className="mc-email-link"
                style={{ color:'#2352FF', textDecoration:'none', fontWeight:600 }}
              >
                marketcaptura@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}