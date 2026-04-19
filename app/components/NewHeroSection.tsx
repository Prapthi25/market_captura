'use client';

import { useEffect, useState } from 'react';

const MARQUEE_ITEMS = [
  'Meta Ads', 'D2C Brands', 'Revenue Growth', 'Full-Funnel Strategy',
  'High-Converting Creatives', 'SEO & Analytics', 'Scale Fast',
];

const TRUST_PILLS = [
  { icon: '🚀', text: '150+ Projects' },
  { icon: '💰', text: '3.8× Avg ROAS' },
  { icon: '⭐', text: '4.8 Rating' },
  { icon: '🇮🇳', text: 'India Registered' },
];

interface NewHeroSectionProps {
  onGetStarted: () => void;
}

export default function NewHeroSection({ onGetStarted }: NewHeroSectionProps) {
  const [mounted, setMounted] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Reset baseline ── */
        .nh-root *, .nh-root *::before, .nh-root *::after {
          box-sizing: border-box;
          margin: 0; padding: 0;
        }

        /* ── Root section ── */
        .nh-root {
          background: #FAFBFF;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        /* Ambient mesh blobs */
        .nh-blob-1 {
          position: absolute;
          width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(35,82,255,0.07) 0%, transparent 65%);
          top: -200px; right: -180px;
          pointer-events: none;
        }
        .nh-blob-2 {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,79,23,0.06) 0%, transparent 65%);
          bottom: 60px; left: -100px;
          pointer-events: none;
        }

        /* Dot grid */
        .nh-dotgrid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(35,82,255,0.055) 1px, transparent 1px);
          background-size: 30px 30px;
          pointer-events: none;
        }

        /* ── Nav strip ── */
        .nh-nav {
          position: relative;
          z-index: 10;
          padding: 22px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nh-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.35rem;
          color: #0D1B3E;
          letter-spacing: -0.03em;
        }
        .nh-logo span { color: #2352FF; }

        /* ── Content ── */
        .nh-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 40px 60px;
          position: relative;
          z-index: 5;
        }

        .nh-inner {
          max-width: 860px;
          width: 100%;
          text-align: center;
        }

        /* Eyebrow */
        .nh-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          border: 1.5px solid #E4ECF7;
          border-radius: 60px;
          padding: 7px 18px 7px 12px;
          margin-bottom: 32px;
          box-shadow: 0 2px 16px rgba(35,82,255,0.07);
          opacity: 0;
          animation: nhFadeUp 0.6s 0.1s ease forwards;
        }
        .nh-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #FF4F17;
          box-shadow: 0 0 0 3px rgba(255,79,23,0.18);
          flex-shrink: 0;
        }
        .nh-eyebrow-text {
          font-size: 0.7rem;
          font-weight: 700;
          color: #0D1B3E;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* Headline */
        .nh-headline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.2rem, 6.8vw, 5.2rem);
          font-weight: 800;
          color: #0D1B3E;
          line-height: 1.05;
          letter-spacing: -0.035em;
          margin-bottom: 24px;
          opacity: 0;
          animation: nhFadeUp 0.7s 0.2s ease forwards;
        }
        .nh-headline .nh-blue { color: #2352FF; }
        .nh-headline .nh-orange { color: #FF4F17; }

        /* Underline decoration */
        .nh-underline-wrap {
          position: relative;
          display: inline-block;
        }
        .nh-underline-wrap svg {
          position: absolute;
          bottom: -6px; left: 0;
          width: 100%; height: 12px;
          opacity: 0.4;
        }

        /* Sub */
        .nh-sub {
          font-size: clamp(1rem, 1.8vw, 1.15rem);
          color: #5A6479;
          line-height: 1.75;
          max-width: 580px;
          margin: 0 auto 40px;
          font-weight: 400;
          opacity: 0;
          animation: nhFadeUp 0.7s 0.32s ease forwards;
        }

        /* CTA row */
        .nh-ctas {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 52px;
          opacity: 0;
          animation: nhFadeUp 0.7s 0.44s ease forwards;
        }

        .nh-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #2352FF, #1a3fd4);
          color: #fff;
          border: none;
          border-radius: 60px;
          padding: 15px 32px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          box-shadow: 0 6px 24px rgba(35,82,255,0.28);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          letter-spacing: -0.01em;
          text-decoration: none;
          white-space: nowrap;
        }
        .nh-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(35,82,255,0.38);
        }
        .nh-btn-primary .nh-arrow {
          width: 20px; height: 20px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          flex-shrink: 0;
        }

        .nh-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          color: #0D1B3E;
          border: 1.8px solid #E4ECF7;
          border-radius: 60px;
          padding: 14px 28px;
          font-weight: 600;
          font-size: 0.92rem;
          cursor: pointer;
          transition: all 0.22s ease;
          text-decoration: none;
          white-space: nowrap;
        }
        .nh-btn-secondary:hover {
          border-color: #FF4F17;
          color: #FF4F17;
          box-shadow: 0 4px 16px rgba(255,79,23,0.12);
        }

        /* Trust pills */
        .nh-pills {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          opacity: 0;
          animation: nhFadeUp 0.7s 0.56s ease forwards;
        }
        .nh-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fff;
          border: 1.5px solid #E4ECF7;
          border-radius: 40px;
          padding: 7px 14px;
          font-size: 0.76rem;
          font-weight: 600;
          color: #0D1B3E;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          white-space: nowrap;
        }
        .nh-pill-icon { font-size: 14px; }

        /* ── Marquee strip ── */
        .nh-marquee-wrap {
          position: relative;
          z-index: 5;
          background: #0D1B3E;
          padding: 14px 0;
          overflow: hidden;
          opacity: 0;
          animation: nhFadeIn 0.5s 0.8s ease forwards;
        }
        .nh-marquee-track {
          display: flex;
          gap: 0;
          animation: nhMarquee 28s linear infinite;
          width: max-content;
        }
        .nh-marquee-set {
          display: flex;
          align-items: center;
          gap: 0;
          flex-shrink: 0;
        }
        .nh-marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 0 28px;
          font-size: 0.78rem;
          font-weight: 700;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .nh-marquee-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #2352FF;
          flex-shrink: 0;
        }
        .nh-marquee-item.nh-accent {
          color: #FF4F17;
        }

        /* ── Keyframes ── */
        @keyframes nhFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nhFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes nhMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes nhPulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(255,79,23,0.18); }
          50%       { box-shadow: 0 0 0 5px rgba(255,79,23,0.08); }
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .nh-nav { padding: 18px 20px; }
          .nh-content { padding: 16px 20px 48px; }
          .nh-eyebrow { margin-bottom: 22px; }
          .nh-sub { margin-bottom: 32px; }
          .nh-ctas { gap: 10px; margin-bottom: 40px; }
          .nh-btn-primary, .nh-btn-secondary { font-size: 0.85rem; padding: 13px 22px; }
        }
      `}</style>

      <section className="nh-root">
        {/* Backgrounds */}
        <div className="nh-blob-1" />
        <div className="nh-blob-2" />
        <div className="nh-dotgrid" />

        {/* Nav */}
        <nav className="nh-nav">
          {/* <div className="nh-logo">Market<span>Captura</span></div> */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#fff', border: '1.5px solid #E4ECF7',
            borderRadius: 40, padding: '6px 12px 6px 8px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 0 3px rgba(34,197,94,0.2)',
            }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0D1B3E' }}>Available for Projects</span>
          </div>
        </nav>

        {/* Main content */}
        <div className="nh-content">
          <div className="nh-inner">

            {/* Eyebrow */}
            <div className="nh-eyebrow">
              <div className="nh-dot" style={{ animation: mounted ? 'nhPulse 2s ease-in-out infinite' : 'none' }} />
              <span className="nh-eyebrow-text">India&apos;s Next-Gen Marketing Agency</span>
            </div>

            {/* Headline */}
            <h1 className="nh-headline">
              We Make Your Brand{' '}
              <span className="nh-blue nh-underline-wrap">
                Impossible
                <svg viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M2 9 Q100 2 198 9" stroke="#2352FF" strokeWidth="4" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
              {' '}to<br />
              <span className="nh-orange">Ignore Online.</span>
            </h1>


            {/* CTAs */}
            <div className="nh-ctas">
              <button className="nh-btn-primary" onClick={onGetStarted}>
                Get a Free Growth Audit
                <div className="nh-arrow">→</div>
              </button>
              <a className="nh-btn-secondary" href="#services">
                <span>See Our Work</span>
                <span style={{ fontSize: '0.9rem' }}>↓</span>
              </a>
            </div>

            {/* Trust pills */}
            <div className="nh-pills">
              {TRUST_PILLS.map((p) => (
                <div className="nh-pill" key={p.text}>
                  <span className="nh-pill-icon">{p.icon}</span>
                  {p.text}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Marquee strip */}
        <div className="nh-marquee-wrap">
          <div className="nh-marquee-track">
            {[0, 1].map((set) => (
              <div className="nh-marquee-set" key={set}>
                {MARQUEE_ITEMS.map((item, i) => (
                  <span
                    key={i}
                    className={`nh-marquee-item${i % 3 === 1 ? ' nh-accent' : ''}`}
                  >
                    {item}
                    <span className="nh-marquee-dot" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}