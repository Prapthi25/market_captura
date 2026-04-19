


'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const SERVICES = [
  {
    icon: '📱',
    title: 'Social Media Marketing',
    desc: 'Daily-optimised strategies that build audiences and convert followers into loyal customers.',
    tag: 'Growth',
    image: 'https://res.cloudinary.com/dk05wqwo1/image/upload/q_auto/f_auto/v1775841261/download_3_irf7kl.jpg',
    accent: '#2352FF',
  },
  {
    icon: '🎯',
    title: 'Paid Advertising',
    desc: 'High-converting Meta & Google ads — creative hooks, precise targeting, relentless testing.',
    tag: 'Performance',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    accent: '#FF4F17',
  },
  {
    icon: '🌐',
    title: 'Web Design & Dev',
    desc: 'Landing pages engineered for conversion — fast, beautiful, and built to sell.',
    tag: 'Digital',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80',
    accent: '#2352FF',
  },
  {
    icon: '🎨',
    title: 'Brand Identity',
    desc: 'Logo, palette, voice, and visual language — a cohesive identity that makes you unforgettable.',
    tag: 'Branding',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
    accent: '#FF4F17',
  },
  {
    icon: '📊',
    title: 'Digital Strategy',
    desc: 'End-to-end marketing blueprints aligned to your goals. Clear direction, measurable outcomes.',
    tag: 'Strategy',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    accent: '#2352FF',
  },
  {
    icon: '🤖',
    title: 'AI Growth Systems',
    desc: 'Automation and AI-powered insights that let you scale faster and outpace the competition.',
    tag: 'AI & Tech',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
    accent: '#FF4F17',
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('sv2-in')),
      { threshold: 0.07 }
    );
    ref.current?.querySelectorAll('.sv2-anim').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={ref}
      style={{
        background: '#F7F9FE',
        padding: 'clamp(80px,10vw,120px) 0',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .sv2-anim {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1),
                      transform 0.65s cubic-bezier(0.22,1,0.36,1);
        }
        .sv2-anim.sv2-in { opacity: 1; transform: translateY(0); }

        .sv2-card {
          background: #fff;
          border: 1.5px solid #E8EEF8;
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
          cursor: default;
        }
        .sv2-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 48px rgba(13,27,62,0.10);
          border-color: rgba(35,82,255,0.15);
        }
        .sv2-card:hover .sv2-img {
          transform: scale(1.05);
        }
        .sv2-img {
          transition: transform 0.48s ease;
        }
        .sv2-learn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: gap 0.2s ease;
          text-decoration: none;
        }
        .sv2-learn:hover { gap: 11px !important; }

        .sv2-cta-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: linear-gradient(135deg, #FF4F17, #ff6b3d);
          color: #fff; border: none; border-radius: 60px;
          padding: 13px 26px;
          font-family: 'Syne', sans-serif;
          font-weight: 700; font-size: 0.9rem;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(255,79,23,0.24);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          white-space: nowrap;
        }
        .sv2-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(255,79,23,0.36);
        }

        .sv2-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        @media (max-width: 900px) {
          .sv2-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .sv2-grid { grid-template-columns: 1fr !important; }
          .sv2-cta-strip {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(rgba(35,82,255,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Ambient blobs */}
      <div style={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%', zIndex: 0,
        background: 'radial-gradient(circle, rgba(35,82,255,0.065) 0%, transparent 65%)',
        top: -150, left: -120, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: 380, height: 380, borderRadius: '50%', zIndex: 0,
        background: 'radial-gradient(circle, rgba(255,79,23,0.055) 0%, transparent 65%)',
        bottom: -90, right: -60, pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>

        {/* ════ HEADER ════ */}
        <div style={{ marginBottom: 52 }}>

          {/* Eyebrow */}
          <div className="sv2-anim" style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: '#fff', border: '1.5px solid #E8EEF8',
            borderRadius: 60, padding: '6px 16px 6px 10px',
            marginBottom: 22, boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%', background: '#FF4F17',
              display: 'inline-block', boxShadow: '0 0 0 3px rgba(255,79,23,0.15)', flexShrink: 0,
            }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              What We Do
            </span>
          </div>

          {/* Title + subtitle row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <h2
              className="sv2-anim"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(2rem, 3.8vw, 3rem)',
                fontWeight: 800, color: '#0D1B3E',
                letterSpacing: '-0.03em', lineHeight: 1.08,
                margin: 0, maxWidth: 480,
              }}
            >
              We work like{' '}
              <span style={{ color: '#2352FF' }}>your team,</span><br />
              not an agency.
            </h2>

            <p className="sv2-anim" style={{
              color: '#6B7280', maxWidth: 280, lineHeight: 1.78,
              fontSize: '0.9rem', margin: 0, paddingBottom: 4,
            }}>
              Strategy, content, execution, analytics — seamlessly integrated under one roof.
            </p>
          </div>

          {/* Gradient rule */}
          <div className="sv2-anim" style={{
            marginTop: 32, height: 1.5, borderRadius: 2,
            background: 'linear-gradient(90deg, #2352FF 0%, #FF4F17 45%, transparent 100%)',
          }} />
        </div>

        {/* ════ CARDS GRID ════ */}
        <div className="sv2-grid" style={{ marginBottom: 40 }}>
          {SERVICES.map((svc, i) => (
            <div
              key={svc.title}
              className="sv2-anim sv2-card"
              style={{ transitionDelay: `${i * 65}ms` }}
            >
              {/* Image */}
              <div style={{ position: 'relative', width: '100%', height: 160, overflow: 'hidden' }}>
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  className="sv2-img"
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                />
                {/* Tint overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(150deg, ${svc.accent}1A 0%, transparent 60%)`,
                }} />
                {/* Fade to card body */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 56,
                  background: 'linear-gradient(to top, #fff, transparent)',
                }} />
                {/* Tag */}
                <span style={{
                  position: 'absolute', top: 12, right: 12,
                  fontSize: '0.62rem', fontWeight: 700,
                  letterSpacing: '0.09em', textTransform: 'uppercase',
                  borderRadius: 60, padding: '4px 11px',
                  background: '#fff', color: svc.accent,
                  border: `1px solid ${svc.accent}28`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                }}>
                  {svc.tag}
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: '16px 20px 22px' }}>
                {/* Icon */}
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: `${svc.accent}0F`,
                  border: `1.5px solid ${svc.accent}22`,
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 18, marginBottom: 14,
                }}>
                  {svc.icon}
                </div>

                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '0.98rem', fontWeight: 700,
                  color: '#0D1B3E', letterSpacing: '-0.018em',
                  margin: '0 0 8px',
                }}>
                  {svc.title}
                </h3>

                <p style={{
                  color: '#6B7280', lineHeight: 1.72,
                  fontSize: '0.835rem', margin: '0 0 16px',
                }}>
                  {svc.desc}
                </p>

                {/* Bottom rule + CTA */}
                <div style={{
                  height: 1, marginBottom: 14,
                  background: `linear-gradient(90deg, ${svc.accent}28, transparent)`,
                }} />

                <a
                  href="#contact"
                  className="sv2-learn"
                  style={{ color: svc.accent }}
                >
                  Learn more
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ════ CTA STRIP ════ */}
        <div
          className="sv2-anim sv2-cta-strip"
          style={{
            background: '#fff',
            border: '1.5px solid #E8EEF8',
            borderRadius: 20,
            padding: '26px 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
            boxShadow: '0 4px 22px rgba(13,27,62,0.06)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Left accent bar */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
            background: 'linear-gradient(180deg, #2352FF, #FF4F17)',
            borderRadius: '20px 0 0 20px',
          }} />

          <div style={{ paddingLeft: 16 }}>
            <p style={{
              margin: '0 0 3px', color: '#0D1B3E',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700, fontSize: '0.98rem',
            }}>
              Not sure where to start?
            </p>
            <p style={{ margin: 0, color: '#6B7280', fontSize: '0.85rem' }}>
              Get Your Free Growth Audit →
            </p>
          </div>

          <button className="sv2-cta-btn">
           View Our Work →
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}