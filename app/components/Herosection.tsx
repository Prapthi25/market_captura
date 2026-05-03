


'use client';

import { useEffect, useState } from 'react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const STATS = [
  { num: '150+',   label: 'Projects'      },
  { num: '50+',    label: 'Clients'       },
  { num: '3.8×',   label: 'Avg ROI'       },
];

const message = "Hi 😀, I'm looking to grow my business online. Can you help me with digital marketing services like social media, ads, or website promotion?";
const whatsappUrl = `https://wa.me/919187564672?text=${encodeURIComponent(message)}`;

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      {/* ── Page background ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: -1,
        background: '#F7F9FE',
      }} />

      {/* Subtle dot-grid texture */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: -1,
        backgroundImage: 'radial-gradient(rgba(35,82,255,0.07) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      <section
        id="hero"
        style={{
          minHeight:     '100vh',
          paddingTop:    120,
          paddingBottom: 80,
          display:       'flex',
          alignItems:    'center',
          position:      'relative',
          overflow:      'hidden',
        }}
      >
        {/* Ambient colour splashes */}
        <div style={{
          position: 'absolute', width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(35,82,255,0.06) 0%, transparent 65%)',
          top: -160, left: -160, zIndex: 0, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', width: 420, height: 420, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,79,23,0.05) 0%, transparent 65%)',
          bottom: -60, right: '20%', zIndex: 0, pointerEvents: 'none',
        }} />

        {/* ── Main layout ── */}
        <div
          className="mx-hero-grid"
          style={{
            maxWidth:   1160,
            margin:     '0 auto',
            padding:    '0 28px',
            display:    'flex',
            alignItems: 'center',
            gap:        56,
            width:      '100%',
            position:   'relative',
            zIndex:     1,
          }}
        >

          {/* ════ LEFT ════ */}
          <div style={{ flex: '1 1 54%', maxWidth: 600 }}>

            {/* Eyebrow badge */}
            <div style={{
              display:      'inline-flex',
              alignItems:   'center',
              gap:          7,
              background:   '#fff',
              border:       '1.5px solid #E4ECF7',
              borderRadius: 60,
              padding:      '6px 16px 6px 10px',
              marginBottom: 26,
              boxShadow:    '0 2px 12px rgba(35,82,255,0.06)',
              animation:    mounted ? 'mxUp 0.6s 0.1s ease both' : 'none',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#FF4F17',
                display: 'inline-block',
                boxShadow: '0 0 0 3px rgba(255,79,23,0.15)',
              }} />
              <span style={{
                fontSize:      '0.73rem',
                fontWeight:    700,
                color:         '#0D1B3E',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                India&apos;s Next-Gen Marketing Agency
              </span>
            </div>

            {/* Headline — 2 lines max */}
            <h1
              style={{
                fontSize:      'clamp(2.4rem, 4.8vw, 3.8rem)',
                fontWeight:    800,
                lineHeight:    1.06,
                color:         '#0D1B3E',
                marginBottom:  20,
                fontFamily:    'Syne, sans-serif',
                letterSpacing: '-0.03em',
                animation:     mounted ? 'mxUp 0.6s 0.18s ease both' : 'none',
              }}
            >
             Your In-House Growth Team<br />
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{ color: '#2352FF' }}></span>
                {/* Underline arc */}
                <svg viewBox="0 0 160 10" style={{
                  position: 'absolute', bottom: -4, left: 0,
                  width: '100%', height: 9, opacity: 0.35,
                }} preserveAspectRatio="none">
                  <path d="M2 7 Q80 1 158 7" stroke="#2352FF" strokeWidth="3.5"
                    fill="none" strokeLinecap="round"/>
                </svg>
              </span>
              
              <span style={{ color: '#FF4F17' }}> Without Hiring One.</span>
            </h1>

            {/* One-liner sub */}
            <p style={{
              fontSize:     '1.05rem',
              color:        '#5A6479',
              lineHeight:   1.75,
              marginBottom: 36,
              maxWidth:     500,
              animation:    mounted ? 'mxUp 0.6s 0.26s ease both' : 'none',
            }}>
             We help D2C & service brands scale using Meta Ads, high-converting creatives, and full-funnel execution — managing lakhs in ad spend with a focus on real revenue, not just clicks.
            </p>

            {/* CTAs */}
            <div style={{
              display:  'flex',
              gap:      12,
              flexWrap: 'wrap',
              animation: mounted ? 'mxUp 0.6s 0.34s ease both' : 'none',
            }}>
              <button
                onClick={onGetStarted}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 32px rgba(35,82,255,0.32)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 18px rgba(35,82,255,0.22)';
                }}
                style={{
                  background:    'linear-gradient(135deg,#2352FF,#1a3fd4)',
                  color:         '#fff',
                  border:        'none',
                  borderRadius:  60,
                  padding:       '14px 30px',
                  fontWeight:    700,
                  fontSize:      '0.92rem',
                  cursor:        'pointer',
                  display:       'flex',
                  alignItems:    'center',
                  gap:           7,
                  transition:    'all 0.22s ease',
                  boxShadow:     '0 4px 18px rgba(35,82,255,0.22)',
                  letterSpacing: '-0.01em',
                  fontFamily:    'Syne, sans-serif',
                }}
              >
                Get Your Free Growth Audit 
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <a
                href="#services"
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = '#FF4F17';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#FF4F17';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = '#CBD5E1';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#0D1B3E';
                }}
                style={{
                  background:     'transparent',
                  color:          '#0D1B3E',
                  border:         '1.8px solid #CBD5E1',
                  borderRadius:   60,
                  padding:        '13px 26px',
                  fontWeight:     600,
                  fontSize:       '0.92rem',
                  cursor:         'pointer',
                  display:        'flex',
                  alignItems:     'center',
                  gap:            7,
                  textDecoration: 'none',
                  transition:     'all 0.22s ease',
                }}
              >
                View Our Service
              </a>
            </div>

            {/* Stats strip */}
            <div style={{
              display:    'flex',
              gap:        36,
              marginTop:  44,
              paddingTop: 32,
              borderTop:  '1px solid #E4ECF7',
              flexWrap:   'wrap',
              animation:  mounted ? 'mxUp 0.6s 0.42s ease both' : 'none',
            }}>
              {STATS.map(s => (
                <div key={s.label}>
                  <div style={{
                    fontSize:      'clamp(1.5rem, 2.5vw, 2rem)',
                    fontWeight:    800,
                    color:         '#0D1B3E',
                    fontFamily:    'Syne, sans-serif',
                    lineHeight:    1,
                    letterSpacing: '-0.02em',
                  }}>{s.num}</div>
                  <div style={{ fontSize: '0.75rem', color: '#9AA5B4', marginTop: 5, fontWeight: 500, letterSpacing: '0.04em' }}>
                    {s.label}
                  </div>
                </div>
              ))}

              {/* India trust */}
             
            </div>
          </div>

          {/* ════ RIGHT — Premium visual card ════ */}
          <div
            className="mx-hero-right"
            style={{
              flex:          '1 1 42%',
              position:      'relative',
              animation:     mounted ? 'mxLeft 0.8s 0.3s ease both' : 'none',
            }}
          >
            {/* Outer glow ring */}
            <div style={{
              position:     'absolute',
              inset:        -20,
              borderRadius: 36,
              background:   'radial-gradient(ellipse at 50% 0%, rgba(35,82,255,0.10) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Main card */}
            <div style={{
              background:   '#fff',
              borderRadius: 28,
              padding:      32,
              boxShadow:    '0 24px 64px rgba(13,27,62,0.10), 0 2px 0 #E4ECF7',
              border:       '1.5px solid #EDF1FA',
              position:     'relative',
              overflow:     'hidden',
            }}>

              {/* Top accent line */}
              <div style={{
                position:     'absolute',
                top:          0, left: 32, right: 32, height: 3,
                background:   'linear-gradient(90deg, #2352FF, #FF4F17)',
                borderRadius: '0 0 4px 4px',
              }} />

              {/* Card header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, marginTop: 8 }}>
                <div>
                  <div style={{ fontSize: '0.68rem', color: '#9AA5B4', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>
                    Live Dashboard
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0D1B3E', fontFamily: 'Syne, sans-serif' }}>
                    Campaign Overview
                  </div>
                </div>
                <div style={{
                  background:   'linear-gradient(135deg,#2352FF,#1a3fd4)',
                  borderRadius: 12,
                  padding:      '6px 14px',
                  fontSize:     '0.7rem',
                  fontWeight:   700,
                  color:        '#fff',
                  letterSpacing: '0.06em',
                }}>LIVE</div>
              </div>

              {/* ROI big number */}
              <div style={{
                background:   'linear-gradient(135deg,#EEF3FF,#F5F8FF)',
                borderRadius: 20,
                padding:      '22px 24px',
                marginBottom: 16,
                display:      'flex',
                alignItems:   'center',
                justifyContent: 'space-between',
                border:       '1px solid #E4ECF7',
              }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#9AA5B4', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Avg Return on Ad Spend
                  </div>
                  <div style={{
                    fontSize:   'clamp(2rem, 3vw, 2.6rem)',
                    fontWeight: 800,
                    color:      '#2352FF',
                    fontFamily: 'Syne, sans-serif',
                    lineHeight: 1.1,
                    marginTop:  4,
                  }}>3.8×</div>
                </div>
                {/* Mini spark chart */}
                <svg width="80" height="42" viewBox="0 0 80 42" fill="none">
                  <polyline
                    points="0,38 15,28 28,32 40,18 52,22 64,10 80,4"
                    stroke="#2352FF" strokeWidth="2.5" fill="none"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                  <circle cx="80" cy="4" r="4" fill="#2352FF" />
                </svg>
              </div>

              {/* Service rows */}
              {[
                { icon: '📣', label: 'Paid Ads',       pct: 92, color: '#2352FF' },
                { icon: '✍️', label: 'Content',        pct: 95, color: '#FF4F17' },
                { icon: '🔍', label: 'SEO / Analytics', pct: 85, color: '#2352FF' },
              ].map((s, i) => (
                <div key={s.label} style={{
                  display:       'flex',
                  alignItems:    'center',
                  gap:           12,
                  marginBottom:  i < 2 ? 12 : 0,
                }}>
                  <div style={{
                    width:         34, height: 34,
                    borderRadius:  10,
                    background:    `${s.color}12`,
                    display:       'flex',
                    alignItems:    'center',
                    justifyContent: 'center',
                    fontSize:      16,
                    flexShrink:    0,
                  }}>{s.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#0D1B3E' }}>{s.label}</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: s.color }}>{s.pct}%</span>
                    </div>
                    <div style={{
                      height: 5, borderRadius: 99,
                      background: '#F0F4FA',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width:        `${s.pct}%`,
                        height:       '100%',
                        borderRadius: 99,
                        background:   s.color,
                        animation:    mounted ? `mxBar 0.8s ${0.6 + i * 0.12}s ease both` : 'none',
                        transformOrigin: 'left',
                      }} />
                    </div>
                  </div>
                </div>
              ))}

              {/* Bottom rating pill */}
              <div style={{
                display:      'flex',
                alignItems:   'center',
                gap:          8,
                marginTop:    22,
                padding:      '10px 16px',
                background:   '#FFFAF8',
                border:       '1px solid #FFE5D8',
                borderRadius: 14,
              }}>
                <span style={{ fontSize: 15 }}>⭐</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0D1B3E' }}>4.8 Rating</span>
                <span style={{ fontSize: '0.7rem', color: '#9AA5B4', marginLeft: 4 }}>— 150+ projects delivered</span>
              </div>
            </div>

            {/* Floating badge — projects */}
            <div style={{
              position:      'absolute',
              bottom:        -18,
              left:          -20,
              background:    '#fff',
              borderRadius:  16,
              padding:       '10px 18px',
              display:       'flex',
              alignItems:    'center',
              gap:           10,
              boxShadow:     '0 8px 28px rgba(0,0,0,0.10)',
              border:        '1.5px solid #EDF1FA',
              animation:     mounted ? 'mxFloat 4s 0.5s ease-in-out infinite' : 'none',
            }}>
              <div style={{
                width:         32, height: 32,
                borderRadius:  10,
                background:    'linear-gradient(135deg,#FF4F17,#ff7043)',
                display:       'flex',
                alignItems:    'center',
                justifyContent: 'center',
                fontSize:      15,
              }}>🚀</div>
              
            </div>
          </div>
        </div>

        {/* ── WhatsApp FAB ── */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.1)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'; }}
          style={{
            position:       'fixed',
            bottom:         28, right: 28,
            width:          54, height: 54,
            borderRadius:   '50%',
            background:     '#25D366',
            color:          '#fff',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            boxShadow:      '0 4px 20px rgba(37,211,102,0.38)',
            zIndex:         999,
            textDecoration: 'none',
            transition:     'transform 0.22s ease',
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </section>

      {/* ── Keyframe animations ── */}
      <style>{`
        @keyframes mxUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes mxLeft {
          from { opacity: 0; transform: translateX(36px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        @keyframes mxFloat {
          0%, 100% { transform: translateY(0px);  }
          50%      { transform: translateY(-9px); }
        }
        @keyframes mxBar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .mx-hero-grid {
            flex-direction: column !important;
            gap: 48px !important;
          }
        }

        /* Hide right panel on small mobile, show only text */
        @media (max-width: 560px) {
          .mx-hero-right {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}