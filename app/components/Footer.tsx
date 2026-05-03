

'use client';

import React from 'react';

const links = {

  Company:  ['About Us', 'Why Us',  'Contact'],
  Connect:  ['Instagram', 'LinkedIn', 'Twitter / X', 'YouTube'],
};

const SOCIAL_MAP: Record<string, React.ReactNode> = {
  in: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  tw: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
    </svg>
  ),
  ig: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  ),
  yt: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2h15a2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z"/>
      <path d="m10 15 5-3-5-3z"/>
    </svg>
  ),
};

interface FooterProps {
  onGetStarted?: () => void;
}

export default function Footer({ onGetStarted }: FooterProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

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
                    fontWeight: 700, color: '#9AA5B4',
                    cursor: 'pointer',
                    boxShadow: '0 1px 6px rgba(35,82,255,0.05)',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.borderColor = 'rgba(35,82,255,0.35)';
                    el.style.color = '#2352FF';
                    el.style.background = 'rgba(35,82,255,0.06)';
                    el.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.borderColor = '#E4ECF7';
                    el.style.color = '#9AA5B4';
                    el.style.background = '#fff';
                    el.style.transform = 'translateY(0)';
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
                {items.map(item => {
                  let onClick = () => {};
                  if (item === 'Why Us') onClick = () => scrollTo('why-us');
                  else if (item === 'Contact') onClick = () => onGetStarted?.();
                  else if (group === 'Services') onClick = () => scrollTo('services');
                  else if (item === 'About Us') onClick = () => scrollTo('hero');
                  
                  return (
                    <li key={item}>
                      <button
                        onClick={onClick}
                        style={{
                          background: 'none', border: 'none', padding: 0,
                          color: '#9AA5B4', textDecoration: 'none',
                          fontSize: '0.88rem', fontWeight: 500,
                          transition: 'color 0.2s',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#2352FF')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#9AA5B4')}
                      >{item}</button>
                    </li>
                  );
                })}
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
