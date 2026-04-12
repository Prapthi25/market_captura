
'use client';

import { useEffect, useRef } from 'react';

const REASONS = [
  {
    icon: '🏆',
    title: 'End-to-End Ownership',
    desc: "We don't just execute tasks — we take full responsibility for outcomes. From strategy to results, your growth is our singular mission.",
    accent: '#2352FF',
    tag: 'Core Promise',
  },
  {
    icon: '🎯',
    title: 'Unified Strategy',
    desc: 'No scattered efforts. Every piece of content, every ad, every post works toward a single, clear goal — compounding your brand equity over time.',
    accent: '#FF4F17',
    tag: 'Alignment',
  },
  {
    icon: '⚡',
    title: 'Faster Execution',
    desc: 'No back-and-forth between agencies. One team, one conversation — done right and done fast, so you can scale without bottlenecks.',
    accent: '#2352FF',
    tag: 'Speed',
  },
  {
    icon: '📈',
    title: 'Data-Driven Decisions',
    desc: 'Every move is backed by real performance data. We track, analyse, and optimise relentlessly — no guesswork, only growth signals.',
    accent: '#FF4F17',
    tag: 'Analytics',
  },
  {
    icon: '🤝',
    title: 'True Partnership',
    desc: "We grow only when your business grows. Our incentives are completely aligned with yours — making us the last agency you'll ever need.",
    accent: '#2352FF',
    tag: 'Aligned Goals',
  },
  {
    icon: '💡',
    title: 'In-House Feel',
    desc: "It doesn't feel like outsourcing. It feels like a dedicated marketing team woven into the fabric of your business, every single day.",
    accent: '#FF4F17',
    tag: 'Experience',
  },
];

const CHECKLIST = [
  { label: 'Strategy',  detail: 'Market research, positioning & roadmap'       },
  { label: 'Content',   detail: 'Copy, design, video & creative assets'         },
  { label: 'Execution', detail: 'Ads, campaigns & channel management'           },
  { label: 'Analytics', detail: 'Reporting, insights & continuous optimisation' },
];

const TESTIMONIALS = [
  {
    quote: 'Market Captura feels like hiring an entire marketing department at a fraction of the cost. Our leads tripled in 60 days.',
    name: 'Priya Sharma',
    role: 'Founder, LuminaHealth',
    avatar: '👩‍💼',
  },
  {
    quote: 'The speed and quality of execution is unmatched. They think like owners, not vendors. Best decision we made.',
    name: 'Rahul Mehta',
    role: 'CEO, ScaleStack',
    avatar: '👨‍💻',
  },
  {
    quote: 'We tried three agencies before. None came close to the clarity and ROI that Market Captura delivers.',
    name: 'Aisha Patel',
    role: 'CMO, NovaBrand',
    avatar: '👩‍🎨',
  },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Discovery Call',     desc: 'We deep-dive into your business, goals, and competitive landscape to map the full opportunity.'              },
  { step: '02', title: 'Strategy Blueprint', desc: 'A tailored 90-day growth roadmap built specifically for your brand — no generic templates.'                  },
  { step: '03', title: 'Execution Sprint',   desc: 'Our team executes across all channels simultaneously, maintaining brand consistency at every touchpoint.'     },
  { step: '04', title: 'Measure & Scale',    desc: 'Weekly reporting, live dashboards, and continuous iteration to compound your results over time.'              },
];

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('wu-visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current
      ?.querySelectorAll('.wu-reveal, .wu-reveal-up')
      .forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const c = e.currentTarget;
    const r = c.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 12;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -12;
    c.style.transform   = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-5px)`;
    c.style.boxShadow   = '0 20px 50px rgba(35,82,255,0.13), 0 2px 8px rgba(0,0,0,0.04)';
    c.style.borderColor = 'rgba(35,82,255,0.2)';
  };

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform   = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
    e.currentTarget.style.boxShadow   = '0 2px 14px rgba(35,82,255,0.07)';
    e.currentTarget.style.borderColor = '#E4ECF7';
  };

  return (
    <section
      id="why-us"
      ref={sectionRef}
      style={{
        padding:    'clamp(90px,11vw,140px) 24px',
        background: 'linear-gradient(160deg, #EEF3FC 0%, #F5F8FF 100%)',
        position:   'relative',
        overflow:   'hidden',
        fontFamily: 'Syne, sans-serif',
      }}
    >
      <style>{`
        .wu-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1);
        }
        .wu-reveal-up {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1);
        }
        .wu-reveal.wu-visible, .wu-reveal-up.wu-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .wu-card {
          transition: transform 0.26s cubic-bezier(0.22,1,0.36,1), box-shadow 0.26s ease, border-color 0.26s ease;
        }
        .wu-step {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .wu-step:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(35,82,255,0.11) !important;
        }
        .wu-step:hover .wu-step-num {
          background: linear-gradient(135deg,#2352FF,#1a3fd4) !important;
          color: #fff !important;
          border-color: transparent !important;
        }
        .wu-testi {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .wu-testi:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(35,82,255,0.10) !important;
        }
        .wu-cta-primary {
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .wu-cta-primary:hover {
          transform: scale(1.04);
          box-shadow: 0 8px 28px rgba(35,82,255,0.35) !important;
        }
        .wu-cta-outline {
          transition: background 0.22s ease, color 0.22s ease;
        }
        .wu-cta-outline:hover {
          background: #2352FF !important;
          color: #fff !important;
        }
      `}</style>

      {/* Grid */}
      <div style={{
        position:'absolute', inset:0, zIndex:0,
        backgroundImage:`
          linear-gradient(rgba(35,82,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(35,82,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize:'60px 60px', pointerEvents:'none',
      }} />

      {/* Blobs */}
      <div style={{ position:'absolute', width:560, height:560, borderRadius:'50%', background:'radial-gradient(circle,rgba(35,82,255,0.07) 0%,transparent 70%)', top:-160, right:-120, zIndex:0, pointerEvents:'none' }} />
      <div style={{ position:'absolute', width:420, height:420, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,79,23,0.05) 0%,transparent 70%)',  bottom:-100, left:'20%', zIndex:0, pointerEvents:'none' }} />
      <div style={{ position:'absolute', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle,rgba(35,82,255,0.05) 0%,transparent 70%)',  top:'40%', left:-80, zIndex:0, pointerEvents:'none' }} />

      <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:1 }}>

        {/* ══ HEADER ══ */}
        <div style={{ marginBottom:72, maxWidth:700 }}>

          <div className="wu-reveal" style={{
            display:'inline-flex', alignItems:'center', gap:8,
            background:'#fff', border:'1.5px solid #E4ECF7',
            borderRadius:60, padding:'7px 18px 7px 12px', marginBottom:26,
            boxShadow:'0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'linear-gradient(135deg,#2352FF,#1a3fd4)', display:'inline-block', flexShrink:0 }} />
            <span style={{ fontSize:'0.76rem', fontWeight:700, color:'#0D1B3E', letterSpacing:'0.07em', textTransform:'uppercase' as const }}>
              Why Market Captura
            </span>
          </div>

          <h2 className="wu-reveal" style={{
            fontSize:'clamp(2.1rem,4.2vw,3.4rem)', fontWeight:800,
            letterSpacing:'-0.028em', lineHeight:1.08, color:'#0D1B3E', marginBottom:20,
          }}>
            Not just an agency —{' '}
            <span style={{ position:'relative', display:'inline-block', color:'#2352FF' }}>
              your growth partner
              <svg viewBox="0 0 280 12" xmlns="http://www.w3.org/2000/svg"
                style={{ position:'absolute', bottom:-6, left:0, width:'100%', height:8, opacity:0.35 }}>
                <path d="M2 8 Q70 2 140 8 Q210 14 278 8" stroke="#2352FF" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h2>

          <p className="wu-reveal" style={{ color:'#6B7280', lineHeight:1.82, fontSize:'0.97rem', maxWidth:560, marginBottom:0 }}>
            Most brands juggle multiple agencies — one for content, another for execution, another for analytics.
            That creates gaps, delays, and misalignment.{' '}
            <strong style={{ color:'#0D1B3E', fontWeight:600 }}>We fix all of that</strong>{' '}
            under one roof, with one accountable team.
          </p>

          {/* Trust badges */}
          <div className="wu-reveal" style={{ display:'flex', flexWrap:'wrap', gap:10, marginTop:28 }}>
            {['150+ Projects', '15+ Countries', '4.8★ Rated', 'No Lock-in Contracts'].map((b, i) => (
              <span key={b} style={{
                background: i % 2 === 0 ? 'rgba(35,82,255,0.07)'  : 'rgba(255,79,23,0.07)',
                border:     `1.5px solid ${i % 2 === 0 ? 'rgba(35,82,255,0.15)' : 'rgba(255,79,23,0.15)'}`,
                color:      i % 2 === 0 ? '#2352FF' : '#FF4F17',
                borderRadius:60, padding:'5px 14px',
                fontSize:'0.76rem', fontWeight:700, letterSpacing:'0.04em',
              }}>{b}</span>
            ))}
          </div>
        </div>

        {/* ══ REASONS GRID ══ */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(310px, 1fr))', gap:18 }}>
          {REASONS.map((reason, i) => (
            <div
              key={reason.title}
              className="wu-reveal wu-card"
              style={{
                transitionDelay:`${i * 80}ms`,
                background:'#fff', border:'1.5px solid #E4ECF7',
                borderRadius:22, padding:'30px 28px 26px',
                boxShadow:'0 2px 14px rgba(35,82,255,0.07)',
                cursor:'default', position:'relative', overflow:'hidden',
              }}
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
            >
              <div style={{
                position:'absolute', top:0, right:0, width:90, height:90,
                borderRadius:'0 22px 0 90px',
                background: reason.accent === '#2352FF'
                  ? 'radial-gradient(circle at top right, rgba(35,82,255,0.06) 0%, transparent 70%)'
                  : 'radial-gradient(circle at top right, rgba(255,79,23,0.05) 0%, transparent 70%)',
                pointerEvents:'none',
              }} />

              {/* Tag pill */}
              <div style={{
                display:'inline-block',
                background: reason.accent === '#2352FF' ? 'rgba(35,82,255,0.08)' : 'rgba(255,79,23,0.08)',
                color: reason.accent,
                border:`1px solid ${reason.accent === '#2352FF' ? 'rgba(35,82,255,0.16)' : 'rgba(255,79,23,0.16)'}`,
                borderRadius:40, padding:'3px 10px',
                fontSize:'0.66rem', fontWeight:700, letterSpacing:'0.1em',
                textTransform:'uppercase' as const, marginBottom:18,
              }}>{reason.tag}</div>

              {/* Icon */}
              <div style={{
                width:48, height:48, borderRadius:14,
                background: reason.accent === '#2352FF'
                  ? 'linear-gradient(135deg,rgba(35,82,255,0.10),rgba(35,82,255,0.04))'
                  : 'linear-gradient(135deg,rgba(255,79,23,0.10),rgba(255,79,23,0.04))',
                border:`1.5px solid ${reason.accent === '#2352FF' ? 'rgba(35,82,255,0.14)' : 'rgba(255,79,23,0.14)'}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:21, marginBottom:18,
                boxShadow:`0 4px 12px ${reason.accent === '#2352FF' ? 'rgba(35,82,255,0.09)' : 'rgba(255,79,23,0.09)'}`,
              }}>{reason.icon}</div>

              <div style={{ fontSize:'0.66rem', fontWeight:700, letterSpacing:'0.15em', color:'rgba(35,82,255,0.28)', marginBottom:10 }}>
                {String(i + 1).padStart(2,'0')}
              </div>

              <h3 style={{ fontSize:'1.02rem', fontWeight:700, marginBottom:10, color:'#0D1B3E', letterSpacing:'-0.015em' }}>
                {reason.title}
              </h3>
              <p style={{ color:'#6B7280', lineHeight:1.76, fontSize:'0.87rem', margin:0 }}>
                {reason.desc}
              </p>

              <div style={{
                position:'absolute', bottom:0, left:28, right:28, height:2,
                borderRadius:'2px 2px 0 0',
                background:`linear-gradient(90deg, ${reason.accent}, transparent)`,
                opacity:0.18,
              }} />
            </div>
          ))}
        </div>

        {/* ══ HOW IT WORKS ══ */}
        <div style={{ marginTop:80 }}>
          <div className="wu-reveal" style={{ marginBottom:44 }}>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:8,
              background:'#fff', border:'1.5px solid #E4ECF7',
              borderRadius:60, padding:'7px 18px 7px 12px', marginBottom:20,
              boxShadow:'0 2px 8px rgba(0,0,0,0.05)',
            }}>
              <span style={{ width:8, height:8, borderRadius:'50%', background:'linear-gradient(135deg,#FF4F17,#e03d10)', display:'inline-block' }} />
              <span style={{ fontSize:'0.76rem', fontWeight:700, color:'#0D1B3E', letterSpacing:'0.07em', textTransform:'uppercase' as const }}>
                How It Works
              </span>
            </div>
            <h3 style={{ fontSize:'clamp(1.6rem,3vw,2.4rem)', fontWeight:800, color:'#0D1B3E', letterSpacing:'-0.025em', lineHeight:1.1 }}>
              From first call to{' '}
              <span style={{ color:'#2352FF' }}>compounding results</span>
            </h3>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap:16 }}>
            {HOW_IT_WORKS.map((s, i) => (
              <div key={s.step} className="wu-reveal-up wu-step" style={{
                transitionDelay:`${i * 90}ms`,
                background:'#fff', border:'1.5px solid #E4ECF7',
                borderRadius:20, padding:'28px 24px',
                boxShadow:'0 2px 14px rgba(35,82,255,0.06)',
                position:'relative', overflow:'hidden',
              }}>
                <div className="wu-step-num" style={{
                  width:40, height:40, borderRadius:12,
                  background:'rgba(35,82,255,0.07)',
                  border:'1.5px solid rgba(35,82,255,0.14)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'0.76rem', fontWeight:800, color:'#2352FF',
                  marginBottom:16, letterSpacing:'0.06em',
                  transition:'background 0.25s, color 0.25s, border-color 0.25s',
                }}>{s.step}</div>
                <h4 style={{ fontSize:'0.98rem', fontWeight:700, color:'#0D1B3E', marginBottom:8, letterSpacing:'-0.01em' }}>
                  {s.title}
                </h4>
                <p style={{ color:'#6B7280', fontSize:'0.845rem', lineHeight:1.74, margin:0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ COMPARISON CALLOUT ══ */}
        <div className="wu-reveal" style={{
          marginTop:64, background:'#fff', border:'1.5px solid #E4ECF7',
          borderRadius:28, padding:'clamp(32px,4.5vw,52px) clamp(28px,4vw,52px)',
          display:'flex', flexWrap:'wrap' as const, gap:40,
          alignItems:'center', justifyContent:'space-between',
          boxShadow:'0 8px 40px rgba(35,82,255,0.09)',
          position:'relative', overflow:'hidden',
        }}>
          <div style={{
            position:'absolute', inset:0,
            backgroundImage:`
              radial-gradient(ellipse at 0% 50%, rgba(35,82,255,0.04) 0%, transparent 55%),
              radial-gradient(ellipse at 100% 50%, rgba(255,79,23,0.03) 0%, transparent 55%)
            `,
            pointerEvents:'none',
          }} />
          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:4, background:'linear-gradient(to bottom,#2352FF,#FF4F17)', borderRadius:'28px 0 0 28px' }} />

          {/* Left */}
          <div style={{ paddingLeft:20, position:'relative', zIndex:1, flex:'1 1 320px' }}>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:8,
              background:'#fff', border:'1.5px solid #E4ECF7',
              borderRadius:60, padding:'5px 14px 5px 10px', marginBottom:20,
              boxShadow:'0 2px 6px rgba(0,0,0,0.04)',
            }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'linear-gradient(135deg,#FF4F17,#e03d10)', display:'inline-block' }} />
              <span style={{ fontSize:'0.72rem', fontWeight:700, color:'#0D1B3E', letterSpacing:'0.07em', textTransform:'uppercase' as const }}>
                The Market Captura Difference
              </span>
            </div>

            <p style={{
              fontSize:'clamp(1.5rem,3vw,2.2rem)', fontWeight:800,
              letterSpacing:'-0.025em', lineHeight:1.15, color:'#0D1B3E', marginBottom:14,
            }}>
              ₹30,000 for one hire.<br />
              <span style={{ color:'#2352FF' }}>Or an entire team.</span>
            </p>

            <p style={{ color:'#6B7280', maxWidth:460, lineHeight:1.8, fontSize:'0.92rem', marginBottom:24 }}>
              With Market Captura, you get strategy + content + execution + analytics —
              not a single hire with a single skill set. Multiply your output, not your headcount.
            </p>

            {/* Comparison table */}
            <div style={{
              background:'linear-gradient(135deg,#F5F8FF,#EEF3FC)',
              border:'1.5px solid #E4ECF7', borderRadius:14,
              overflow:'hidden', display:'inline-block',
            }}>
              {[
                { label:'Dedicated Full Team',  them:'❌', us:'✅' },
                { label:'Unified Strategy',      them:'❌', us:'✅' },
                { label:'Real-time Analytics',   them:'⚠️', us:'✅' },
                { label:'Predictable Cost',       them:'❌', us:'✅' },
              ].map((row, i) => (
                <div key={row.label} style={{
                  display:'flex', alignItems:'center',
                  padding:'10px 18px',
                  borderBottom: i < 3 ? '1px solid #E4ECF7' : 'none',
                  gap:24,
                }}>
                  <span style={{ fontSize:'0.82rem', color:'#6B7280', flex:1 }}>{row.label}</span>
                  <span style={{ fontSize:'0.82rem', width:70, textAlign:'center' as const, color:'#9AA5B4' }}>
                    {row.them} <span style={{ fontSize:'0.68rem', color:'#C4C9D4' }}>Others</span>
                  </span>
                  <span style={{ fontSize:'0.82rem', width:44, textAlign:'center' as const, color:'#2352FF', fontWeight:700 }}>
                    {row.us}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div style={{
            display:'flex', flexDirection:'column' as const, gap:18, flexShrink:0,
            position:'relative', zIndex:1,
            background:'linear-gradient(135deg,#F5F8FF,#EEF3FC)',
            border:'1.5px solid #E4ECF7', borderRadius:20,
            padding:'28px 30px', minWidth:240,
          }}>
            <div style={{ fontSize:'0.72rem', fontWeight:700, color:'#2352FF', letterSpacing:'0.1em', textTransform:'uppercase' as const, marginBottom:2 }}>
              All Included
            </div>
            {CHECKLIST.map((item, i) => (
              <div key={item.label} style={{ display:'flex', flexDirection:'column' as const, gap:3 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <span style={{
                    width:22, height:22, borderRadius:'50%',
                    background: i % 2 === 0 ? 'linear-gradient(135deg,#2352FF,#1a3fd4)' : 'linear-gradient(135deg,#FF4F17,#e03d10)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:10, color:'#fff', fontWeight:800, flexShrink:0,
                    boxShadow:`0 3px 10px ${i % 2 === 0 ? 'rgba(35,82,255,0.28)' : 'rgba(255,79,23,0.28)'}`,
                  }}>✓</span>
                  <span style={{ fontSize:'0.92rem', fontWeight:700, color:'#0D1B3E' }}>{item.label}</span>
                </div>
                <p style={{ margin:'0 0 0 34px', fontSize:'0.76rem', color:'#9AA5B4', lineHeight:1.5 }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ TESTIMONIALS ══ */}
        <div style={{ marginTop:72 }}>
          <div className="wu-reveal" style={{ marginBottom:40 }}>
            <h3 style={{ fontSize:'clamp(1.5rem,2.8vw,2.1rem)', fontWeight:800, color:'#0D1B3E', letterSpacing:'-0.025em' }}>
              Trusted by founders who{' '}
              <span style={{ color:'#2352FF' }}>mean business</span>
            </h3>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:18 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className="wu-reveal-up wu-testi" style={{
                transitionDelay:`${i * 110}ms`,
                background:'#fff', border:'1.5px solid #E4ECF7',
                borderRadius:22, padding:'30px 26px',
                boxShadow:'0 2px 14px rgba(35,82,255,0.06)',
                position:'relative', overflow:'hidden',
              }}>
                <div style={{
                  position:'absolute', top:16, right:20, fontSize:56, lineHeight:1,
                  color: i % 2 === 0 ? 'rgba(35,82,255,0.07)' : 'rgba(255,79,23,0.07)',
                  fontWeight:900,
                }}>"</div>

                <div style={{ marginBottom:14, color:'#FFB800', fontSize:13, letterSpacing:2 }}>★★★★★</div>

                <p style={{ color:'#6B7280', lineHeight:1.78, fontSize:'0.875rem', marginBottom:22, fontStyle:'italic' }}>
                  "{t.quote}"
                </p>

                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{
                    width:42, height:42, borderRadius:'50%',
                    background: i % 2 === 0 ? 'rgba(35,82,255,0.08)' : 'rgba(255,79,23,0.08)',
                    display:'flex', alignItems:'center', justifyContent:'center', fontSize:20,
                    border:`1.5px solid ${i % 2 === 0 ? 'rgba(35,82,255,0.15)' : 'rgba(255,79,23,0.15)'}`,
                  }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight:700, color:'#0D1B3E', fontSize:'0.88rem' }}>{t.name}</div>
                    <div style={{ color:'#9AA5B4', fontSize:'0.78rem' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ STATS STRIP ══ */}
        <div className="wu-reveal" style={{
          marginTop:52, display:'flex', background:'#fff',
          border:'1.5px solid #E4ECF7', borderRadius:22, overflow:'hidden',
          boxShadow:'0 4px 20px rgba(35,82,255,0.07)', flexWrap:'wrap' as const,
        }}>
          {[
            { num:'150+', label:'Projects Delivered', icon:'🚀', sub:'Across 12 industries' },
            { num:'15+',  label:'Global Clients',     icon:'🌏', sub:'From 3 continents'   },
            { num:'4.8★', label:'Average Rating',     icon:'⭐', sub:'Verified reviews'    },
            { num:'3.8×', label:'Average ROI',        icon:'📈', sub:'Within 90 days'      },
          ].map((stat, i) => (
            <div key={stat.label} style={{
              flex:'1 1 160px',
              padding:'clamp(22px,3vw,34px) clamp(18px,2.5vw,30px)',
              borderRight: i < 3 ? '1px solid #E4ECF7' : 'none',
              display:'flex', flexDirection:'column' as const,
              alignItems:'center', gap:5, position:'relative', overflow:'hidden',
            }}>
              <div style={{
                position:'absolute', top:0, left:'20%', right:'20%', height:2,
                background: i % 2 === 0
                  ? 'linear-gradient(90deg, transparent, rgba(35,82,255,0.32), transparent)'
                  : 'linear-gradient(90deg, transparent, rgba(255,79,23,0.28), transparent)',
              }} />
              <span style={{ fontSize:22 }}>{stat.icon}</span>
              <div style={{
                fontSize:'clamp(1.6rem,2.8vw,2.2rem)', fontWeight:800,
                color:'#0D1B3E', letterSpacing:'-0.025em', lineHeight:1,
              }}>{stat.num}</div>
              <div style={{ fontSize:'0.78rem', color:'#0D1B3E', fontWeight:600 }}>{stat.label}</div>
              <div style={{ fontSize:'0.7rem', color:'#B0B7C3' }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* ══ CTA ══ */}
        <div className="wu-reveal" style={{
          marginTop:52, textAlign:'center' as const,
          display:'flex', flexDirection:'column' as const, alignItems:'center', gap:18,
        }}>
          <p style={{ color:'#9AA5B4', fontSize:'0.9rem' }}>
            Ready to stop juggling agencies and start growing?
          </p>
          <div style={{ display:'flex', gap:14, flexWrap:'wrap' as const, justifyContent:'center' }}>
            <button className="wu-cta-primary" style={{
              background:'linear-gradient(135deg,#2352FF,#1a3fd4)',
              color:'#fff', border:'none', borderRadius:60,
              padding:'14px 32px', fontSize:'0.95rem', fontWeight:700,
              cursor:'pointer', letterSpacing:'-0.01em',
              boxShadow:'0 4px 16px rgba(35,82,255,0.28)',
              fontFamily:'Syne, sans-serif',
            }}>
              Book a Free Strategy Call →
            </button>
            <button className="wu-cta-outline" style={{
              background:'transparent', color:'#2352FF',
              border:'2px solid #2352FF', borderRadius:60,
              padding:'13px 28px', fontSize:'0.95rem', fontWeight:600,
              cursor:'pointer', fontFamily:'Syne, sans-serif',
            }}>
              See Our Work
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}