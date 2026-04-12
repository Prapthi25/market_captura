




'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const SERVICES = [
  {
    icon: '📱',
    title: 'Social Media Marketing',
    desc: 'Scroll-stopping content that builds your brand presence and drives real engagement across every platform.',
    tag: 'Growth',
    image: 'https://res.cloudinary.com/dk05wqwo1/image/upload/q_auto/f_auto/v1775841261/download_3_irf7kl.jpg',
    accent: '#2352FF',
    tagBg: 'rgba(35,82,255,0.15)',
    tagColor: '#2352FF',
  },
  {
    icon: '🎯',
    title: 'Paid Advertising',
    desc: 'Data-backed ad campaigns on Meta, Google & beyond — maximising ROI with every rupee spent.',
    tag: 'Performance',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    accent: '#FF4F17',
    tagBg: 'rgba(255,79,23,0.12)',
    tagColor: '#FF4F17',
  },
  {
    icon: '🌐',
    title: 'Web Design & Dev',
    desc: 'High-converting, visually stunning websites that load fast, rank well, and represent your brand perfectly.',
    tag: 'Digital',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80',
    accent: '#2352FF',
    tagBg: 'rgba(35,82,255,0.15)',
    tagColor: '#2352FF',
  },
  {
    icon: '🎨',
    title: 'Brand Identity',
    desc: 'Logo, palette, voice, and visual language — a cohesive identity that makes your brand impossible to forget.',
    tag: 'Branding',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
    accent: '#FF4F17',
    tagBg: 'rgba(255,79,23,0.12)',
    tagColor: '#FF4F17',
  },
  {
    icon: '📊',
    title: 'Digital Strategy',
    desc: 'End-to-end marketing blueprints aligned to your business goals. No scattered efforts, just clear direction.',
    tag: 'Strategy',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    accent: '#2352FF',
    tagBg: 'rgba(35,82,255,0.15)',
    tagColor: '#2352FF',
  },
  {
    icon: '🤖',
    title: 'AI Growth Systems',
    desc: 'Leverage AI-powered automation, insights, and tools to scale faster than your competition.',
    tag: 'AI & Tech',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
    accent: '#FF4F17',
    tagBg: 'rgba(255,79,23,0.12)',
    tagColor: '#FF4F17',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal')
      .forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -7;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 7;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        padding: 'clamp(80px,10vw,130px) 24px',
        background: '#EEF2FF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background texture dots */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(35,82,255,0.12) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Blue glow top-left */}
      <div style={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(35,82,255,0.18) 0%, transparent 68%)',
        top: -180, left: -120, zIndex: 0, pointerEvents: 'none',
      }} />

      {/* Orange glow bottom-right */}
      <div style={{
        position: 'absolute', width: 480, height: 480, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,79,23,0.18) 0%, transparent 68%)',
        bottom: -140, right: -80, zIndex: 0, pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Section Header ── */}
        <div style={{ marginBottom: 64 }}>
          {/* Label pill */}
          <div
            className="reveal"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,79,23,0.12)',
              border: '1.5px solid rgba(255,79,23,0.35)',
              borderRadius: 60, padding: '5px 16px', marginBottom: 24,
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#FF4F17', display: 'inline-block',
            }} />
            <span style={{
              fontSize: '0.72rem', fontWeight: 700, color: '#FF4F17',
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>What We Do</span>
          </div>

          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-end', flexWrap: 'wrap', gap: 24,
          }}>
            <h2
              className="reveal"
              style={{
                fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 800,
                letterSpacing: '-0.03em', lineHeight: 1.08,
                maxWidth: 540, color: '#0D1B3E',
                fontFamily: 'Syne, sans-serif', margin: 0,
              }}
            >
              Everything your brand needs,{' '}
              <span style={{
                color: 'transparent',
                backgroundImage: 'linear-gradient(90deg, #2352FF 100%, #FF4F17 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}>under one roof</span>
            </h2>

            <p className="reveal" style={{
              color: 'rgba(13,27,62,0.55)', maxWidth: 320,
              lineHeight: 1.78, fontSize: '0.94rem', paddingBottom: 4, margin: 0,
            }}>
              No more juggling multiple agencies. Strategy, content, execution,
              and analytics — all seamlessly integrated.
            </p>
          </div>

          {/* Thin divider */}
          <div className="reveal" style={{
            marginTop: 40, height: 1,
            background: 'linear-gradient(90deg, rgba(35,82,255,0.6) 0%, rgba(255,79,23,0.6) 50%, transparent 100%)',
          }} />
        </div>

        {/* ── Cards Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 22,
        }}>
          {SERVICES.map((svc, i) => (
            <div
              key={svc.title}
              className="reveal"
              style={{
                transitionDelay: `${i * 80}ms`,
                background: '#EDF1F5',
                borderRadius: 20,
                border: `1.5px solid rgba(35,82,255,0.1)`,
                overflow: 'hidden',
                transition: 'transform 0.28s ease, box-shadow 0.28s ease, opacity 0.7s, translate 0.7s',
                boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                cursor: 'default',
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Image */}
              <div style={{ position: 'relative', width: '100%', height: 176, overflow: 'hidden' }}>
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.45s ease' }}
                  sizes="(max-width: 768px) 100vw, 340px"
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                />

                {/* Accent tint overlay on image */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(135deg, ${svc.accent}22 0%, transparent 60%)`,
                }} />

                {/* Bottom fade to card body */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 72,
                  background: 'linear-gradient(to top, #EDF1F5, transparent)',
                }} />
              </div>

              {/* Card body */}
              <div style={{ padding: '18px 22px 26px' }}>
                {/* Top row: icon + tag */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', marginBottom: 16,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 13,
                    background: `linear-gradient(135deg, ${svc.accent}18, ${svc.accent}08)`,
                    border: `1.5px solid ${svc.accent}30`,
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 20,
                  }}>
                    {svc.icon}
                  </div>
                  <span style={{
                    fontSize: '0.66rem', fontWeight: 700,
                    letterSpacing: '0.09em', textTransform: 'uppercase',
                    borderRadius: 60, padding: '4px 13px',
                    background: svc.tagBg,
                    color: svc.tagColor,
                    border: `1px solid ${svc.accent}30`,
                  }}>
                    {svc.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '1.05rem', fontWeight: 800,
                  marginBottom: 10, color: '#0D1B3E',
                  letterSpacing: '-0.02em', fontFamily: 'Syne, sans-serif',
                  margin: '0 0 10px',
                }}>
                  {svc.title}
                </h3>

                {/* Desc */}
                <p style={{
                  color: '#4A5568', lineHeight: 1.74,
                  fontSize: '0.87rem', margin: 0,
                }}>
                  {svc.desc}
                </p>

                {/* Divider */}
                <div style={{
                  height: 1, margin: '18px 0 16px',
                  background: `linear-gradient(90deg, ${svc.accent}30, transparent)`,
                }} />

                {/* Learn more */}
                <div
                  className="learn-more"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    fontSize: '0.82rem', fontWeight: 700,
                    color: svc.accent, cursor: 'pointer',
                    userSelect: 'none', letterSpacing: '0.01em',
                    transition: 'gap 0.2s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.gap = '12px'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.gap = '7px'; }}
                >
                  Learn more <span style={{ fontSize: '1rem' }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <div
          className="reveal"
          style={{
            marginTop: 56,
            borderRadius: 18,
            background: 'linear-gradient(110deg, rgba(35,82,255,0.18) 0%, rgba(255,79,23,0.14) 100%)',
            border: '1.5px solid rgba(35,82,255,0.25)',
            padding: '28px 36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
            backdropFilter: 'blur(8px)',
          }}
        >
          <div>
            <p style={{
              margin: '0 0 4px', color: '#0D1B3E', fontWeight: 700,
              fontSize: '1.05rem', fontFamily: 'Syne, sans-serif',
            }}>
              Not sure where to start?
            </p>
            <p style={{ margin: 0, color: 'rgba(13,27,62,0.55)', fontSize: '0.88rem' }}>
              Book a free strategy call — no strings attached.
            </p>
          </div>
          <button style={{
            background: 'linear-gradient(90deg, #FF4F17 0%, #ff6b3d 100%)',
            color: '#fff', border: 'none', borderRadius: 50,
            padding: '12px 28px', fontWeight: 700, fontSize: '0.88rem',
            cursor: 'pointer', letterSpacing: '0.02em',
            boxShadow: '0 6px 20px rgba(255,79,23,0.35)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 10px 28px rgba(255,79,23,0.45)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(255,79,23,0.35)';
            }}
          >
            Get Free Consultation →
          </button>
        </div>
      </div>

      {/* Reveal animation */}
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}