



'use client';

import { useEffect, useRef } from 'react';

interface CTASectionProps {
  onGetStarted: () => void;
}

export default function CTASection({ onGetStarted }: CTASectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('cta-visible')),
      { threshold: 0.2 }
    );
    sectionRef.current?.querySelectorAll('.cta-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        padding: 'clamp(80px,10vw,140px) 24px',
        background: 'linear-gradient(160deg, #EEF3FC 0%, #F5F8FF 100%)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Syne, sans-serif',
      }}
    >
      <style>{`
        .cta-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1);
        }
        .cta-reveal.cta-visible { opacity: 1; transform: translateY(0); }
        .cta-btn-primary { transition: transform 0.22s ease, box-shadow 0.22s ease; }
        .cta-btn-primary:hover { transform: scale(1.04); box-shadow: 0 8px 28px rgba(35,82,255,0.35) !important; }
        .cta-contact-link { transition: color 0.2s ease; color: #9AA5B4 !important; }
        .cta-contact-link:hover { color: #2352FF !important; }
      `}</style>

      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(35,82,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(35,82,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px', pointerEvents: 'none',
      }} />

      {/* Blobs */}
      <div style={{ position:'absolute', width:560, height:560, borderRadius:'50%', background:'radial-gradient(circle,rgba(35,82,255,0.07) 0%,transparent 70%)', top:-160, right:-120, zIndex:0, pointerEvents:'none' }} />
      <div style={{ position:'absolute', width:420, height:420, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,79,23,0.05) 0%,transparent 70%)', bottom:-100, left:'10%', zIndex:0, pointerEvents:'none' }} />

      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>

        {/* Card */}
        <div
          className="cta-reveal"
          style={{
            background: '#fff',
            border: '1.5px solid #E4ECF7',
            borderRadius: 28,
            padding: 'clamp(40px,6vw,72px)',
            boxShadow: '0 8px 48px rgba(35,82,255,0.09)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Left accent border */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
            background: 'linear-gradient(to bottom,#2352FF,#FF4F17)',
            borderRadius: '28px 0 0 28px',
          }} />

          {/* Top glow mesh */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              radial-gradient(ellipse at 50% 0%, rgba(35,82,255,0.05) 0%, transparent 55%)
            `,
            pointerEvents: 'none',
          }} />

          {/* Label pill */}
          <div className="cta-reveal" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', border: '1.5px solid #E4ECF7',
            borderRadius: 60, padding: '7px 18px 7px 12px',
            marginBottom: 26, boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'linear-gradient(135deg,#2352FF,#1a3fd4)', display:'inline-block', flexShrink:0 }} />
            <span style={{ fontSize:'0.76rem', fontWeight:700, color:'#0D1B3E', letterSpacing:'0.07em', textTransform:'uppercase' as const }}>
              Ready to Grow?
            </span>
          </div>

          <h2 className="cta-reveal" style={{
            fontSize: 'clamp(2rem,4.5vw,3.4rem)',
            fontWeight: 800, letterSpacing: '-0.028em', lineHeight: 1.08,
            color: '#0D1B3E', marginBottom: 20,
          }}>
            Let&apos;s build your brand&apos;s{' '}
            <span style={{ position:'relative', display:'inline-block', color:'#2352FF' }}>
              next chapter
              <svg viewBox="0 0 240 12" xmlns="http://www.w3.org/2000/svg"
                style={{ position:'absolute', bottom:-6, left:0, width:'100%', height:8, opacity:0.35 }}>
                <path d="M2 8 Q60 2 120 8 Q180 14 238 8" stroke="#2352FF" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h2>

          <p className="cta-reveal" style={{
            color: '#6B7280', fontSize: '0.97rem', lineHeight: 1.8,
            maxWidth: 480, margin: '0 auto 40px',
          }}>
            We&apos;re not just another agency. We&apos;re an extension of your team —
            fully committed to building your brand and driving{' '}
            <strong style={{ color:'#0D1B3E', fontWeight:600 }}>real, measurable impact.</strong>
          </p>

          {/* CTAs */}
          <div className="cta-reveal" style={{ display:'flex', justifyContent:'center', gap:14, flexWrap:'wrap' as const }}>
            <button
              className="cta-btn-primary"
              onClick={onGetStarted}
              style={{
                background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
                color: '#fff', border: 'none', borderRadius: 60,
                padding: '16px 44px', fontSize: '1rem', fontWeight: 700,
                cursor: 'pointer', letterSpacing: '-0.01em',
                boxShadow: '0 4px 16px rgba(35,82,255,0.28)',
                fontFamily: 'Syne, sans-serif',
              }}
            >
              Get Started — It&apos;s Free →
            </button>
          </div>

          <p className="cta-reveal" style={{ marginTop: 18, fontSize: '0.8rem', color: '#9AA5B4' }}>
            No commitment required · Free consultation call
          </p>

          {/* Divider + contacts */}
          <div className="cta-reveal" style={{
            marginTop: 40, paddingTop: 32,
            borderTop: '1px solid #E4ECF7',
            display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' as const,
          }}>
            <a href="mailto:marketcaptura@gmail.com" className="cta-contact-link"
              style={{ textDecoration:'none', fontSize:'0.88rem', fontWeight:500 }}>
              📧 marketcaptura@gmail.com
            </a>
            <a href="tel:+919187564672" className="cta-contact-link"
              style={{ textDecoration:'none', fontSize:'0.88rem', fontWeight:500 }}>
              📞 +91 91875 64672
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}