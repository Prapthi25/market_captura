// 'use client';

// const links = {
//   Services: ['Social Media', 'Paid Ads', 'Brand Identity', 'Web Design', 'AI Systems'],
//   Company: ['About Us', 'Why Us', 'Case Studies', 'Contact'],
//   Connect: ['Instagram', 'LinkedIn', 'Twitter / X', 'YouTube'],
// };

// export default function Footer() {  
//   return (
//     <footer
//       style={{
//         borderTop: '1px solid var(--glass-border)',
//         background: 'var(--bg-2)',
//         padding: 'clamp(48px,6vw,80px) 24px 32px',
//       }}
//     >
//       <div style={{ maxWidth: 1200, margin: '0 auto' }}>
//         <div
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
//             gap: 40,
//             marginBottom: 56,
//           }}
//         >
//           {/* Brand */}
//           <div style={{ gridColumn: 'span 1' }}>
//             <div
//               className="font-syne"
//               style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.02em' }}
//             >
//               Market<span style={{ color: 'var(--primary)' }}>Captura</span>
//             </div>
//             <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7, maxWidth: 220 }}>
//               Capturing markets digitally. Your full-stack marketing team under one roof.
//             </p>
//             <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
//               {['in', 'tw', 'ig', 'yt'].map(s => (
//                 <div
//                   key={s}
//                   style={{
//                     width: 34,
//                     height: 34,
//                     borderRadius: 8,
//                     border: '1px solid var(--glass-border)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     fontSize: '0.75rem',
//                     fontWeight: 600,
//                     color: 'var(--text-muted)',
//                     cursor: 'none',
//                     transition: 'border-color 0.3s, color 0.3s, background 0.3s',
//                   }}
//                   className="social-icon"
//                   onMouseEnter={e => {
//                     const el = e.currentTarget;
//                     el.style.borderColor = 'var(--primary)';
//                     el.style.color = 'var(--light)';
//                     el.style.background = 'rgba(1,69,242,0.1)';
//                   }}
//                   onMouseLeave={e => {
//                     const el = e.currentTarget;
//                     el.style.borderColor = 'var(--glass-border)';
//                     el.style.color = 'var(--text-muted)';
//                     el.style.background = 'transparent';
//                   }}
//                 >
//                   {s.toUpperCase()}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Link columns */}
//           {Object.entries(links).map(([group, items]) => (
//             <div key={group}>
//               <h4
//                 className="font-syne"
//                 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--light)', marginBottom: 16 }}
//               >
//                 {group}
//               </h4>
//               <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
//                 {items.map(item => (
//                   <li key={item}>
//                     <a
//                       href="#"
//                       style={{
//                         color: 'var(--text-muted)',
//                         textDecoration: 'none',
//                         fontSize: '0.88rem',
//                         transition: 'color 0.2s',
//                         cursor: 'none',
//                       }}
//                       onMouseEnter={e => (e.currentTarget.style.color = 'var(--light)')}
//                       onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
//                     >
//                       {item}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Bottom bar */}
//         <div
//           style={{
//             borderTop: '1px solid var(--glass-border)',
//             paddingTop: 24,
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             flexWrap: 'wrap',
//             gap: 12,
//           }}
//         >
//           <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
//             © 2025 Market Captura. All rights reserved.
//           </p>
//           <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
//             Capturing markets digitally ✦
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }

'use client';

const links = {
  Services: ['Social Media', 'Paid Ads', 'Brand Identity', 'Web Design', 'AI Systems'],
  Company:  ['About Us', 'Why Us', 'Case Studies', 'Contact'],
  Connect:  ['Instagram', 'LinkedIn', 'Twitter / X', 'YouTube'],
};

const SOCIAL_MAP: Record<string, string> = {
  in: 'LI', tw: 'TW', ig: 'IG', yt: 'YT',
};

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1.5px solid #E4ECF7',
        background: 'linear-gradient(160deg,#EEF3FC 0%,#F5F8FF 100%)',
        padding: 'clamp(48px,6vw,80px) 24px 32px',
        fontFamily: 'Syne, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(35,82,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(35,82,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px', pointerEvents: 'none',
      }} />

      {/* Blob */}
      <div style={{
        position: 'absolute', width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(35,82,255,0.05) 0%,transparent 70%)',
        bottom: -120, right: -80, zIndex: 0, pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 40, marginBottom: 56,
        }}>

          {/* Brand column */}
          <div>
            <div style={{
              fontSize: '1.3rem', fontWeight: 800, marginBottom: 14,
              letterSpacing: '-0.02em', color: '#0D1B3E',
            }}>
              Market<span style={{ color: '#2352FF' }}>Captura</span>
            </div>

            <p style={{ color: '#9AA5B4', fontSize: '0.85rem', lineHeight: 1.75, maxWidth: 220, marginBottom: 20 }}>
              Capturing markets digitally. Your full-stack marketing team under one roof.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 8 }}>
              {Object.entries(SOCIAL_MAP).map(([key, label]) => (
                <div
                  key={key}
                  style={{
                    width: 34, height: 34, borderRadius: 10,
                    border: '1.5px solid #E4ECF7',
                    background: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 700, color: '#9AA5B4',
                    cursor: 'pointer',
                    boxShadow: '0 1px 6px rgba(35,82,255,0.05)',
                    transition: 'border-color 0.2s, color 0.2s, background 0.2s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.borderColor = 'rgba(35,82,255,0.35)';
                    el.style.color = '#2352FF';
                    el.style.background = 'rgba(35,82,255,0.06)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.borderColor = '#E4ECF7';
                    el.style.color = '#9AA5B4';
                    el.style.background = '#fff';
                  }}
                >{label}</div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 style={{
                fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase' as const, color: '#0D1B3E', marginBottom: 16,
              }}>
                {group}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' as const, gap: 11 }}>
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{
                        color: '#9AA5B4', textDecoration: 'none',
                        fontSize: '0.88rem', fontWeight: 500,
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#2352FF')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#9AA5B4')}
                    >{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #E4ECF7', paddingTop: 24,
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap' as const, gap: 12,
        }}>
          <p style={{ fontSize: '0.8rem', color: '#B0B7C3' }}>
            © 2025 Market Captura. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8rem', color: '#B0B7C3' }}>
            Capturing markets digitally ✦
          </p>
        </div>
      </div>
    </footer>
  );
}