

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const navLinks = [
  { label: 'Home',     href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Why Us',   href: '#why-us' },
  { label: 'Blogs',    href: '#blogs' },
  { label: 'Contact',  href: '#contact' },
];

interface NavbarProps {
  logoUrl?: string;
  onGetStarted: () => void;
}

export default function Navbar({ logoUrl, onGetStarted }: NavbarProps) {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeLink,  setActiveLink]  = useState('Home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ─── Social icon SVGs ─────────────────────────────────────── */
  const SocialIcon = ({ d, isStroke }: { d: string; isStroke?: boolean }) => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill={isStroke ? 'none' : 'currentColor'}
      stroke={isStroke ? 'currentColor' : 'none'} strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );

  return (
    <>
      {/* ── Navbar shell ── */}
      <nav
        style={{
          position:   'fixed',
          top:        0,
          left:       0,
          right:      0,
          zIndex:     1000,
          padding:    scrolled ? '8px 20px' : '14px 20px',
          transition: 'padding 0.3s ease',
        }}
      >
        {/* ── Outer white pill ── */}
        <div
          style={{
            maxWidth:     1200,
            margin:       '0 auto',
            background:   '#fff',
            borderRadius: 60,
            padding:      '7px 10px 7px 18px',
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'space-between',
            boxShadow:    scrolled
              ? '0 4px 30px rgba(0,0,0,0.10)'
              : '0 2px 16px rgba(0,0,0,0.07)',
            border:       '1.5px solid #E4ECF7',
            transition:   'box-shadow 0.3s ease',
          }}
        >
          {/* ── Logo ── */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            {logoUrl ? (
              <Image
                src={logoUrl} alt="MarketCaptura"
                width={50} height={50}
                style={{ objectFit: 'cover', borderRadius: '50%', border: '2px solid #E4ECF7' }}
              />
            ) : (
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, fontWeight: 800, color: '#fff', fontFamily: 'Syne, sans-serif',
              }}>M</div>
            )}
            <span style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 1000,
              fontSize: '1.05rem', color: '#0D1B3E',
            }}>
              Market<span style={{ color: '#2352FF' }}>Captura</span>
            </span>
          </a>

          {/* ── Centre: nav links inside inner pill ── */}
          <div
            className="nav-pill-group"
            style={{
              background:   '#F0F4FB',
              borderRadius: 60,
              padding:      '4px 5px',
              display:      'flex',
              gap:          2,
              border:       '1.5px solid #E4ECF7',
            }}
          >
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActiveLink(link.label)}
                style={{
                  padding:      '8px 20px',
                  borderRadius: 60,
                  fontWeight:   600,
                  fontSize:     '0.86rem',
                  textDecoration: 'none',
                  color:        activeLink === link.label ? '#fff' : '#4A5568',
                  background:   activeLink === link.label
                    ? 'linear-gradient(135deg,#2352FF,#1a3fd4)'
                    : 'transparent',
                  transition:   'all 0.22s ease',
                  whiteSpace:   'nowrap',
                  letterSpacing: '-0.01em',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* ── Right: social + CTA ── */}
          <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <a href="#" aria-label="Facebook"  style={{ color: '#9AA5B4', display: 'flex', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#2352FF')}
                onMouseLeave={e => (e.currentTarget.style.color = '#9AA5B4')}>
                <SocialIcon d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </a>
              <a href="#" aria-label="Instagram" style={{ color: '#9AA5B4', display: 'flex', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#E4405F')}
                onMouseLeave={e => (e.currentTarget.style.color = '#9AA5B4')}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn"  style={{ color: '#9AA5B4', display: 'flex', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#0A66C2')}
                onMouseLeave={e => (e.currentTarget.style.color = '#9AA5B4')}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>

            {/* Orange CTA button */}
            <button
              onClick={onGetStarted}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.04)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
              style={{
                background:   'linear-gradient(135deg,#FF4F17,#e03d08)',
                color:        '#fff',
                border:       'none',
                borderRadius: 60,
                padding:      '11px 22px',
                fontWeight:   700,
                fontSize:     '0.86rem',
                cursor:       'pointer',
                display:      'flex',
                alignItems:   'center',
                gap:          7,
                transition:   'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow:    '0 4px 14px rgba(255,79,23,0.30)',
                letterSpacing: '-0.01em',
                whiteSpace:   'nowrap',
              }}
            >
              Get Started <span style={{ fontSize: 13 }}>→</span>
            </button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'none', flexDirection: 'column', gap: 5, padding: 4,
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 2.5,
                background: '#0D1B3E', borderRadius: 2, transition: 'all 0.3s ease',
                transform:
                  menuOpen && i === 0 ? 'rotate(45deg) translate(5px, 5px)'  :
                  menuOpen && i === 1 ? 'scaleX(0)'                           :
                  menuOpen && i === 2 ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }} />
            ))}
          </button>
        </div>

        {/* ── Mobile dropdown menu ── */}
        {menuOpen && (
          <div style={{
            maxWidth:     1200,
            margin:       '8px auto 0',
            background:   '#fff',
            borderRadius: 20,
            padding:      '14px 16px 20px',
            boxShadow:    '0 8px 30px rgba(0,0,0,0.10)',
            border:       '1.5px solid #E4ECF7',
            display:      'flex',
            flexDirection: 'column',
            gap:          4,
          }}>
            {navLinks.map(link => (
              <a key={link.label} href={link.href}
                onClick={() => { setActiveLink(link.label); setMenuOpen(false); }}
                style={{
                  padding: '12px 16px', borderRadius: 12,
                  textDecoration: 'none', color: '#0D1B3E',
                  fontWeight: 500, fontSize: '0.95rem',
                  background: activeLink === link.label ? '#F0F4FB' : 'transparent',
                }}>
                {link.label}
              </a>
            ))}
            <button onClick={onGetStarted} style={{
              background: 'linear-gradient(135deg,#FF4F17,#e03d08)',
              color: '#fff', border: 'none', borderRadius: 60,
              padding: '12px 24px', fontWeight: 700, fontSize: '0.9rem',
              cursor: 'pointer', marginTop: 10, alignSelf: 'flex-start',
            }}>Get Started →</button>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 900px) {
          .nav-pill-group { display: none !important; }
          .nav-right      { display: none !important; }
          .hamburger      { display: flex !important; }
        }
        @media (min-width: 901px) {
          .hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}