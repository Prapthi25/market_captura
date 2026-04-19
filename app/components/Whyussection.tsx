



'use client';

import { useEffect, useRef } from 'react';

const REASONS = [
  {
    icon: '🏆',
    title: 'End-to-End Ownership',
    desc: 'From strategy to results — we take full accountability for your growth, not just task execution.',
    accent: '#2352FF',
  },
  {
    icon: '🎯',
    title: 'Unified Strategy',
    desc: 'Every ad, post and creative works toward one compounding goal — no scattered efforts.',
    accent: '#FF4F17',
  },
  {
    icon: '⚡',
    title: 'Faster Execution',
    desc: 'One team, one conversation. No agency hand-offs, no bottlenecks — just speed.',
    accent: '#2352FF',
  },
  {
    icon: '📈',
    title: 'Data-Driven Decisions',
    desc: 'Every move is backed by real performance data. We optimise relentlessly — no guesswork.',
    accent: '#FF4F17',
  },
  {
    icon: '🤝',
    title: 'True Partnership',
    desc: 'We grow only when you grow. Our incentives are completely aligned with yours.',
    accent: '#2352FF',
  },
  {
    icon: '💡',
    title: 'In-House Feel',
    desc: "Feels like a dedicated marketing team inside your business — not an outside vendor.",
    accent: '#FF4F17',
  },
];

const STEPS = [
  { n: '01', title: 'Discovery Call',     desc: 'Deep-dive into your goals and competitive landscape.' },
  { n: '02', title: 'Growth Blueprint',   desc: 'A tailored 90-day roadmap built for your brand.'      },
  { n: '03', title: 'Execution Sprint',   desc: 'Full-channel execution with brand consistency.'        },
  { n: '04', title: 'Measure & Scale',    desc: 'Weekly reporting and continuous optimisation.'         },
];

const STATS = [
  { num: '150+', label: 'Projects', sub: 'Delivered'     },
  { num: '15+',  label: 'Clients',  sub: 'Worldwide'     },
  { num: '3.8×', label: 'Avg ROAS', sub: 'In 90 days'    },
  { num: '4.8★', label: 'Rating',   sub: 'Verified'      },
];

export default function WhyUsSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('wu2-in');
      }),
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll('.wu2-anim').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="why-us"
      ref={ref}
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

        /* ── Reveal animations ── */
        .wu2-anim {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                      transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .wu2-anim.wu2-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Reason cards ── */
        .wu2-card {
          background: #fff;
          border: 1.5px solid #E8EEF8;
          border-radius: 20px;
          padding: 28px 26px;
          position: relative;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          cursor: default;
        }
        .wu2-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 44px rgba(35,82,255,0.10);
          border-color: rgba(35,82,255,0.18);
        }
        .wu2-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          border-radius: 0 0 20px 20px;
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .wu2-card:hover::after { opacity: 1; }
        .wu2-card.blue::after  { background: linear-gradient(90deg, #2352FF, transparent); }
        .wu2-card.orange::after { background: linear-gradient(90deg, #FF4F17, transparent); }

        /* ── Step cards ── */
        .wu2-step {
          background: #fff;
          border: 1.5px solid #E8EEF8;
          border-radius: 18px;
          padding: 26px 22px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .wu2-step:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 36px rgba(35,82,255,0.09);
        }
        .wu2-step:hover .wu2-step-n {
          background: #2352FF;
          color: #fff;
          border-color: transparent;
        }
        .wu2-step-n {
          width: 38px; height: 38px;
          border-radius: 11px;
          background: rgba(35,82,255,0.07);
          border: 1.5px solid rgba(35,82,255,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.72rem; font-weight: 800;
          color: #2352FF; margin-bottom: 16px;
          letter-spacing: 0.05em;
          transition: background 0.25s, color 0.25s, border-color 0.25s;
          font-family: 'Syne', sans-serif;
        }

        /* ── Stat cells ── */
        .wu2-stat {
          flex: 1 1 130px;
          padding: clamp(20px,2.5vw,30px) clamp(16px,2vw,26px);
          text-align: center;
          position: relative;
        }
        .wu2-stat + .wu2-stat {
          border-left: 1px solid #E8EEF8;
        }

        /* ── CTA buttons ── */
        .wu2-btn-main {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #2352FF, #1a3fd4);
          color: #fff; border: none; border-radius: 60px;
          padding: 14px 30px;
          font-family: 'Syne', sans-serif;
          font-weight: 700; font-size: 0.92rem;
          cursor: pointer; letter-spacing: -0.01em;
          box-shadow: 0 4px 18px rgba(35,82,255,0.25);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          white-space: nowrap;
        }
        .wu2-btn-main:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(35,82,255,0.36);
        }
        .wu2-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #2352FF;
          border: 1.8px solid rgba(35,82,255,0.3);
          border-radius: 60px; padding: 13px 26px;
          font-family: 'Syne', sans-serif;
          font-weight: 700; font-size: 0.92rem;
          cursor: pointer; letter-spacing: -0.01em;
          transition: all 0.22s ease; white-space: nowrap;
        }
        .wu2-btn-ghost:hover {
          background: #2352FF; color: #fff;
          border-color: #2352FF;
        }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .wu2-reasons-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .wu2-steps-grid   { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .wu2-reasons-grid { grid-template-columns: 1fr !important; }
          .wu2-steps-grid   { grid-template-columns: 1fr !important; }
          .wu2-stat + .wu2-stat { border-left: none; border-top: 1px solid #E8EEF8; }
          .wu2-stats-row { flex-direction: column !important; }
        }
      `}</style>

      {/* Subtle dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(35,82,255,0.055) 1px, transparent 1px)',
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

        {/* ════ SECTION HEADER ════ */}
        <div className="wu2-anim" style={{ maxWidth: 620, marginBottom: 64 }}>
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', border: '1.5px solid #E8EEF8',
            borderRadius: 60, padding: '6px 16px 6px 11px',
            marginBottom: 22, boxShadow: '0 2px 10px rgba(35,82,255,0.06)',
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#2352FF', display: 'inline-block',
              boxShadow: '0 0 0 3px rgba(35,82,255,0.15)', flexShrink: 0,
            }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Why Market Captura
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 3.1rem)',
            fontWeight: 800, color: '#0D1B3E',
            lineHeight: 1.08, letterSpacing: '-0.03em',
            marginBottom: 18,
          }}>
            Built for brands that{' '}
            <span style={{ color: '#FF4F17' }}>demand results.</span>
          </h2>

          <p style={{ color: '#6B7280', lineHeight: 1.8, fontSize: '0.97rem', margin: 0 }}>
            We think like owners, not marketers. One accountable team managing strategy, content, execution, and analytics — so you stop juggling and start scaling.
          </p>
        </div>

        {/* ════ REASON CARDS ════ */}
        <div
          className="wu2-reasons-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
            marginBottom: 72,
          }}
        >
          {REASONS.map((r, i) => (
            <div
              key={r.title}
              className={`wu2-anim wu2-card ${r.accent === '#2352FF' ? 'blue' : 'orange'}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              {/* Corner accent */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: 72, height: 72, borderRadius: '0 20px 0 72px',
                background: r.accent === '#2352FF'
                  ? 'radial-gradient(circle at top right, rgba(35,82,255,0.05) 0%, transparent 70%)'
                  : 'radial-gradient(circle at top right, rgba(255,79,23,0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              {/* Icon */}
              <div style={{
                width: 44, height: 44, borderRadius: 13,
                background: r.accent === '#2352FF' ? 'rgba(35,82,255,0.08)' : 'rgba(255,79,23,0.08)',
                border: `1.5px solid ${r.accent === '#2352FF' ? 'rgba(35,82,255,0.13)' : 'rgba(255,79,23,0.13)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, marginBottom: 20,
              }}>
                {r.icon}
              </div>

              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '0.97rem', fontWeight: 700,
                color: '#0D1B3E', marginBottom: 10,
                letterSpacing: '-0.015em',
              }}>
                {r.title}
              </h3>

              <p style={{ color: '#6B7280', fontSize: '0.845rem', lineHeight: 1.72, margin: 0 }}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ════ HOW IT WORKS ════ */}
        <div style={{ marginBottom: 72 }}>
          {/* Sub-header */}
          <div className="wu2-anim" style={{ marginBottom: 36 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#fff', border: '1.5px solid #E8EEF8',
              borderRadius: 60, padding: '6px 16px 6px 11px',
              marginBottom: 16, boxShadow: '0 2px 10px rgba(35,82,255,0.05)',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#FF4F17', display: 'inline-block', flexShrink: 0,
                boxShadow: '0 0 0 3px rgba(255,79,23,0.15)',
              }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                How It Works
              </span>
            </div>
            <h3 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
              fontWeight: 800, color: '#0D1B3E',
              letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0,
            }}>
              From first call to{' '}
              <span style={{ color: '#2352FF' }}>compounding results.</span>
            </h3>
          </div>

          <div
            className="wu2-steps-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}
          >
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className="wu2-anim wu2-step"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Connector dot top-right */}
                {i < STEPS.length - 1 && (
                  <div style={{
                    position: 'absolute', top: 33, right: -8,
                    width: 14, height: 2,
                    background: 'linear-gradient(90deg, #E8EEF8, transparent)',
                    zIndex: 2,
                  }} />
                )}
                <div className="wu2-step-n">{s.n}</div>
                <h4 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '0.92rem', fontWeight: 700,
                  color: '#0D1B3E', marginBottom: 8, letterSpacing: '-0.01em',
                }}>
                  {s.title}
                </h4>
                <p style={{ color: '#6B7280', fontSize: '0.82rem', lineHeight: 1.7, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ════ STATS STRIP ════ */}
        <div className="wu2-anim" style={{ marginBottom: 52 }}>
          <div style={{
            background: '#fff',
            border: '1.5px solid #E8EEF8',
            borderRadius: 22,
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(35,82,255,0.07)',
          }}>
            <div className="wu2-stats-row" style={{ display: 'flex', flexWrap: 'wrap' }}>
              {STATS.map((s, i) => (
                <div key={s.label} className="wu2-stat">
                  {/* Top accent line */}
                  <div style={{
                    position: 'absolute', top: 0, left: '25%', right: '25%', height: 2,
                    background: i % 2 === 0
                      ? 'linear-gradient(90deg, transparent, rgba(35,82,255,0.35), transparent)'
                      : 'linear-gradient(90deg, transparent, rgba(255,79,23,0.30), transparent)',
                  }} />
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)',
                    fontWeight: 800, color: '#0D1B3E',
                    letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 6,
                  }}>
                    {s.num}
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0D1B3E' }}>{s.label}</div>
                  <div style={{ fontSize: '0.7rem', color: '#B0B7C3', marginTop: 2 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════ CTA ════ */}
        <div className="wu2-anim" style={{ textAlign: 'center' }}>
          <p style={{ color: '#9AA5B4', fontSize: '0.88rem', marginBottom: 20 }}>
            Ready to stop juggling agencies and start growing?
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="wu2-btn-main">
              Book a Free Strategy Call →
            </button>
            <button className="wu2-btn-ghost">
              See Our Work
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}