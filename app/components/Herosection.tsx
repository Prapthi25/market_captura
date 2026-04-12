
'use client';

import { useEffect, useState } from 'react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const STATS = [
  { num: '150+', label: 'Projects Delivered' },
  { num: '15+',  label: 'Global Clients'     },
  { num: '1 Roof', label: 'Everything Handled' },
];

const TAGS = ['SEO', 'ADS', 'CONTENT', 'ANALYTICS'];


const message = "Hi 😀, I’m looking to grow my business online. Can you help me with digital marketing services like social media, ads, or website promotion?";
const whatsappUrl = `https://wa.me/919187564672?text=${encodeURIComponent(message)}`;

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      {/* ── Page background ── */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: -1,
          background: 'linear-gradient(160deg, #EEF3FC 0%, #F5F8FF 50%, #EBF0FA 100%)',
        }}
      />

      <section
        id="hero"
        style={{
          minHeight:      '100vh',
          paddingTop:     100,
          paddingBottom:  60,
          display:        'flex',
          alignItems:     'center',
          position:       'relative',
          overflow:       'hidden',
        }}
      >
        {/* Subtle grid */}
        <div style={{
          position:   'absolute', inset: 0, zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(35,82,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(35,82,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />

        {/* Soft ambient blobs */}
        <div style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(35,82,255,0.08) 0%, transparent 70%)',
          top: -100, left: -100, zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,79,23,0.06) 0%, transparent 70%)',
          bottom: -80, right: '30%', zIndex: 0,
        }} />

        {/* ── Main two-column layout ── */}
        <div
          className="hero-grid"
          style={{
            maxWidth:   1200,
            margin:     '0 auto',
            padding:    '0 24px',
            display:    'flex',
            alignItems: 'center',
            gap:        60,
            width:      '100%',
            position:   'relative',
            zIndex:     1,
          }}
        >
          {/* ═══ LEFT: Text Content ═══════════════════════════════════════ */}
          <div
            className="hero-left"
            style={{ flex: '1 1 52%', maxWidth: 580 }}
          >
            {/* Badge */}
            <div
              style={{
                display:      'inline-flex',
                alignItems:   'center',
                gap:          8,
                background:   '#fff',
                border:       '1.5px solid #E4ECF7',
                borderRadius: 60,
                padding:      '7px 18px 7px 12px',
                marginBottom: 28,
                boxShadow:    '0 2px 8px rgba(0,0,0,0.05)',
                animation:    mounted ? 'mxFadeUp 0.7s 0.1s ease both' : 'none',
              }}
            >
              <span style={{ fontSize: 15 }}>⭐</span>
              <span style={{
                fontSize:      '0.76rem',
                fontWeight:    700,
                color:         '#0D1B3E',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
              }}>
                India&apos;s Next-Gen Marketing Agency
              </span>
            </div>

            {/* Headline */}
            <h1
              className="hero-headline"
              style={{
                fontSize:      'clamp(2.3rem, 4.5vw, 3.7rem)',
                fontWeight:    800,
                lineHeight:    1.08,
                color:         '#0D1B3E',
                marginBottom:  22,
                fontFamily:    'Syne, sans-serif',
                letterSpacing: '-0.025em',
                animation:     mounted ? 'mxFadeUp 0.7s 0.2s ease both' : 'none',
              }}
            >
              India&apos;s Marketing Agency<br />
              Helping Brands Grow<br />
              Through{' '}
              <span style={{
                color:      '#2352FF',
                display:    'inline-block',
                position:   'relative',
              }}>
                Strategy, Content
                {/* Blue underline squiggle */}
                <svg
                  viewBox="0 0 240 12" xmlns="http://www.w3.org/2000/svg"
                  style={{
                    position: 'absolute', bottom: -6, left: 0,
                    width: '100%', height: 8, opacity: 0.4,
                  }}
                >
                  <path d="M2 8 Q60 2 120 8 Q180 14 238 8"
                    stroke="#2352FF" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
              <br />
              <span style={{ color: '#2352FF' }}>&amp; Technology</span>
            </h1>

            {/* Subtext */}
            <p
              style={{
                fontSize:    '1rem',
                color:       '#6B7280',
                lineHeight:  1.8,
                marginBottom: 36,
                maxWidth:    520,
                animation:   mounted ? 'mxFadeUp 0.7s 0.3s ease both' : 'none',
              }}
            >
              Instead of spending ₹30,000 on one person for one task — get a{' '}
              <strong style={{ color: '#0D1B3E', fontWeight: 600 }}>
                complete in-house marketing team
              </strong>{' '}
              that handles strategy, content, execution, and analytics — all under one roof.
            </p>

            {/* CTAs */}
            <div
              style={{
                display:   'flex',
                gap:       14,
                flexWrap:  'wrap',
                animation: mounted ? 'mxFadeUp 0.7s 0.4s ease both' : 'none',
              }}
            >
              {/* Primary */}
              <button
                onClick={onGetStarted}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.04)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 28px rgba(35,82,255,0.35)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(35,82,255,0.25)';
                }}
                style={{
                  background:   'linear-gradient(135deg,#2352FF,#1a3fd4)',
                  color:        '#fff',
                  border:       'none',
                  borderRadius: 60,
                  padding:      '14px 32px',
                  fontWeight:   700,
                  fontSize:     '0.95rem',
                  cursor:       'pointer',
                  display:      'flex',
                  alignItems:   'center',
                  gap:          8,
                  transition:   'all 0.22s ease',
                  boxShadow:    '0 4px 16px rgba(35,82,255,0.25)',
                  letterSpacing: '-0.01em',
                }}
              >
                Talk to an expert <span>→</span>
              </button>

              {/* Outline */}
              <a
                href="#services"
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = '#2352FF';
                  (e.currentTarget as HTMLAnchorElement).style.color      = '#fff';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                  (e.currentTarget as HTMLAnchorElement).style.color      = '#2352FF';
                }}
                style={{
                  background:    'transparent',
                  color:         '#2352FF',
                  border:        '2px solid #2352FF',
                  borderRadius:  60,
                  padding:       '13px 28px',
                  fontWeight:    600,
                  fontSize:      '0.95rem',
                  cursor:        'pointer',
                  display:       'flex',
                  alignItems:    'center',
                  gap:           8,
                  textDecoration: 'none',
                  transition:    'all 0.22s ease',
                }}
              >
                🚀 Explore Our Services
              </a>
            </div>

            {/* Stats strip */}
            <div
              style={{
                display:      'flex',
                gap:          32,
                marginTop:    44,
                paddingTop:   32,
                borderTop:    '1px solid #E4ECF7',
                flexWrap:     'wrap',
                animation:    mounted ? 'mxFadeUp 0.7s 0.5s ease both' : 'none',
              }}
            >
              {STATS.map((s, i) => (
                <div key={s.label} style={{ textAlign: 'left' }}>
                  <div style={{
                    fontSize:      'clamp(1.5rem,2.5vw,2rem)',
                    fontWeight:    800,
                    color:         '#0D1B3E',
                    fontFamily:    'Syne, sans-serif',
                    lineHeight:    1,
                    letterSpacing: '-0.02em',
                  }}>{s.num}</div>
                  <div style={{ fontSize: '0.78rem', color: '#9AA5B4', marginTop: 5, fontWeight: 500 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ RIGHT: Animated Card ════════════════════════════════════ */}
          <div
            className="hero-right"
            style={{
              flex:          '1 1 44%',
              display:       'flex',
              flexDirection: 'column',
              alignItems:    'flex-end',
              gap:           18,
              animation:     mounted ? 'mxFadeLeft 0.8s 0.3s ease both' : 'none',
            }}
          >
            {/* ── Big blue card (Maxterz tablet mockup style) ── */}
            <div
              style={{
                background:   'linear-gradient(145deg,#2352FF 0%,#1235c5 100%)',
                borderRadius: 28,
                width:        '100%',
                maxWidth:     500,
                aspectRatio:  '4/3',
                position:     'relative',
                overflow:     'hidden',
                boxShadow:    '20px 20px 60px rgba(35,82,255,0.25), -4px -4px 0px #c0cef8',
                border:       '2.5px solid rgba(255,255,255,0.25)',
              }}
            >
              {/* Decorative rings */}
              <div style={{
                position: 'absolute', width: 380, height: 380, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.08)',
                top: -100, right: -100,
                animation: 'mxSpin 25s linear infinite',
              }} />
              <div style={{
                position: 'absolute', width: 280, height: 280, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.06)',
                bottom: -80, left: -80,
                animation: 'mxSpin 35s linear infinite reverse',
              }} />

              {/* Radial glow */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 60%)',
              }} />

              {/* Centre brand content */}
              <div style={{
                position:      'absolute',
                inset:         0,
                display:       'flex',
                flexDirection: 'column',
                alignItems:    'center',
                justifyContent: 'center',
                gap:           12,
              }}>
                {/* Logo mark */}
                <div style={{
                  width:         70,
                  height:        70,
                  borderRadius:  '50%',
                  background:    'rgba(255,255,255,0.15)',
                  border:        '2px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(10px)',
                  display:       'flex',
                  alignItems:    'center',
                  justifyContent: 'center',
                  fontSize:      30,
                  fontWeight:    800,
                  color:         '#fff',
                  fontFamily:    'Syne, sans-serif',
                  animation:     'mxFloat 3s ease-in-out infinite',
                  boxShadow:     '0 8px 32px rgba(0,0,0,0.15)',
                }}>M</div>

                {/* Wordmark */}
                <div style={{
                  fontSize:      'clamp(1.5rem,3vw,2.1rem)',
                  fontWeight:    800,
                  color:         '#fff',
                  fontFamily:    'Syne, sans-serif',
                  letterSpacing: '-0.03em',
                }}>
                  Market<span style={{ color: '#FF4F17' }}>Captura</span>
                </div>

                {/* Sub label */}
                <div style={{
                  fontSize:      '0.72rem',
                  color:         'rgba(255,255,255,0.65)',
                  fontWeight:    600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}>Full-Stack Marketing Agency</div>

                {/* Floating service tags */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
                  {TAGS.map((tag, i) => (
                    <span key={tag} style={{
                      background:    'rgba(255,255,255,0.15)',
                      border:        '1px solid rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(8px)',
                      borderRadius:  20,
                      padding:       '4px 12px',
                      fontSize:      '0.68rem',
                      color:         '#fff',
                      fontWeight:    700,
                      letterSpacing: '0.06em',
                      animation:     `mxFloat ${2.5 + i * 0.25}s ease-in-out infinite`,
                      animationDelay: `${i * 0.15}s`,
                    }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Carousel dots */}
              <div style={{
                position:  'absolute',
                bottom:    20,
                left:      '50%',
                transform: 'translateX(-50%)',
                display:   'flex',
                gap:       6,
              }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width:        i === 1 ? 26 : 8,
                    height:       8,
                    borderRadius: 4,
                    background:   i === 1 ? '#fff' : 'rgba(255,255,255,0.35)',
                    transition:   'width 0.3s',
                  }} />
                ))}
              </div>

              {/* Floating "Latest Projects" badge — bottom left */}
              <div style={{
                position:      'absolute',
                bottom:        52,
                left:          20,
                background:    '#fff',
                borderRadius:  14,
                padding:       '10px 16px',
                display:       'flex',
                alignItems:    'center',
                gap:           10,
                boxShadow:     '0 8px 24px rgba(0,0,0,0.18)',
                animation:     'mxFloat 4s ease-in-out infinite',
                animationDelay: '0.6s',
              }}>
                <div style={{
                  width:         34,
                  height:        34,
                  borderRadius:  10,
                  background:    'linear-gradient(135deg,#2352FF,#1a3fd4)',
                  display:       'flex',
                  alignItems:    'center',
                  justifyContent: 'center',
                  fontSize:      15,
                }}>🚀</div>
                <div>
                  <div style={{ fontSize: '0.62rem', color: '#9AA5B4', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Latest Projects
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#0D1B3E', fontWeight: 700 }}>
                    Explore Our Work
                  </div>
                </div>
              </div>

              {/* Metrics badge — top right */}
              <div style={{
                position:      'absolute',
                top:           20,
                right:         20,
                background:    'rgba(255,255,255,0.18)',
                border:        '1px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(12px)',
                borderRadius:  12,
                padding:       '8px 14px',
                animation:     'mxFloat 3.5s ease-in-out infinite',
                animationDelay: '1s',
              }}>
                <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Avg ROI</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', fontFamily: 'Syne, sans-serif' }}>3.8×</div>
              </div>
            </div>

            {/* ── Trust strip below card ── */}
            <div style={{
              display:    'flex',
              alignItems: 'center',
              gap:        20,
              paddingLeft: 4,
              flexWrap:   'wrap',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 18 }}>⭐</span>
                <span style={{ fontSize: '0.83rem', color: '#0D1B3E', fontWeight: 600 }}>
                  4.8★ Rating | 150+ Projects
                </span>
              </div>
              <div style={{ width: 1, height: 20, background: '#E4ECF7' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: '1rem' }}>🇮🇳</span>
                <span style={{ fontSize: '0.83rem', color: '#0D1B3E', fontWeight: 600 }}>
                  India Registered Company
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── WhatsApp FAB ── */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.1)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
          }}
          style={{
            position:       'fixed',
            bottom:         28,
            right:          28,
            width:          56,
            height:         56,
            borderRadius:   '50%',
            background:     '#25D366',
            color:          '#fff',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            boxShadow:      '0 4px 20px rgba(37,211,102,0.40)',
            zIndex:         999,
            textDecoration: 'none',
            transition:     'transform 0.22s ease',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </section>

      {/* ── Keyframe animations ── */}
      <style>{`
        @keyframes mxFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes mxFadeLeft {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        @keyframes mxFloat {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-10px); }
        }
        @keyframes mxSpin {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }

        /* Responsive */
        @media (max-width: 860px) {
          .hero-grid {
            flex-direction: column !important;
            gap: 40px !important;
          }
          .hero-left  { max-width: 100% !important; }
          .hero-right { align-items: center !important; }
        }
      `}</style>
    </>
  );
}