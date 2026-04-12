


'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const ALLOWED_EMAIL = 'marketcaptura@gmail.com';

const FEATURES = [
  {
    id: 'consultationRequests',
    icon: '📋',
    title: 'Consultation Requests',
    desc: 'View, manage and confirm incoming client consultation requests.',
    badge: 'Leads',
    badgeColor: '#2352FF',
    href: '/admin/consultationRequests',
    accent: '#2352FF',
    disabled: false,
  },
  {
    id: 'Blogmanagement',
    icon: '📊',
    title: 'Blogmanagement',
    desc: 'Manage blog posts, categories, tags, and SEO metadata.',
    badge: 'Leads',
    badgeColor: '#2352FF',
    href: '/admin/Blogmanagement',
    accent: '#2352FF',
    disabled: false,
  },
  {
    id: 'clients',
    icon: '🏢',
    title: 'Client Profiles',
    desc: 'Manage all client data, contracts and project timelines.',
    badge: 'Coming Soon',
    badgeColor: '#9AA5B4',
    href: '#',
    accent: '#9AA5B4',
    disabled: false,
  },
  {
    id: 'campaigns',
    icon: '🚀',
    title: 'Campaigns',
    desc: 'Oversee active marketing campaigns, deliverables and deadlines.',
    badge: 'Coming Soon',
    badgeColor: '#9AA5B4',
    href: '#',
    accent: '#9AA5B4',
    disabled: false,
  },
];

const QUICK_STATS = [
  { label: 'Total Leads',    value: '—',    icon: '👥', color: '#2352FF', bg: 'rgba(35,82,255,0.08)',   border: 'rgba(35,82,255,0.18)' },
  { label: 'Converted',     value: '—',    icon: '✅', color: '#22C55E', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.18)' },
  { label: 'Pending Review', value: '—',    icon: '⏳', color: '#FF4F17', bg: 'rgba(255,79,23,0.08)',   border: 'rgba(255,79,23,0.18)' },
  { label: 'Avg ROI',        value: '3.8×', icon: '📈', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.18)' },
];

const CSS = `
  /* ── Font override: beat globals.css body { font-family: 'DM Sans' } ── */
  [data-adm-page],
  [data-adm-page] *,
  [data-adm-page] input,
  [data-adm-page] button,
  [data-adm-page] label,
  [data-adm-page] a {
    font-family: 'Syne', sans-serif !important;
    box-sizing: border-box;
  }

  @keyframes adm-spin    { to { transform: rotate(360deg); } }
  @keyframes adm-fadeUp  { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
  @keyframes adm-float   { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
  @keyframes adm-pulse   { 0%,100% { opacity:.5; transform:scale(1); } 50% { opacity:1; transform:scale(1.15); } }
  @keyframes adm-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes adm-blob1 {
    0%,100% { transform: translate(0,0) scale(1); }
    33%      { transform: translate(30px,-20px) scale(1.05); }
    66%      { transform: translate(-20px,15px) scale(0.97); }
  }
  @keyframes adm-blob2 {
    0%,100% { transform: translate(0,0) scale(1); }
    50%      { transform: translate(-25px,20px) scale(1.08); }
  }

  [data-adm-page] .adm-card {
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease;
    cursor: pointer;
  }
  [data-adm-page] .adm-card:hover:not(.disabled) {
    transform: translateY(-6px) scale(1.01);
    box-shadow: 0 24px 56px rgba(35,82,255,0.14) !important;
  }
  [data-adm-page] .adm-stat {
    transition: transform 0.22s ease, box-shadow 0.22s ease;
  }
  [data-adm-page] .adm-stat:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(35,82,255,0.10) !important;
  }
  [data-adm-page] .adm-logout {
    transition: all 0.18s ease;
  }
  [data-adm-page] .adm-logout:hover:not(:disabled) {
    background: rgba(255,79,23,0.07) !important;
    border-color: rgba(255,79,23,0.4) !important;
    color: #FF4F17 !important;
  }
  [data-adm-page] .adm-nav-link {
    transition: color 0.18s;
  }
  [data-adm-page] .adm-nav-link:hover {
    color: #2352FF !important;
  }
  [data-adm-page] .adm-mod-btn {
    transition: all 0.2s ease;
  }
  [data-adm-page] .adm-mod-btn:hover {
    background: #2352FF !important;
    color: #fff !important;
    border-color: #2352FF !important;
  }

  @media (max-width: 700px) {
    [data-adm-page] .adm-header-email { display: none !important; }
    [data-adm-page] .adm-stat-grid { grid-template-columns: 1fr 1fr !important; }
    [data-adm-page] .adm-feat-grid  { grid-template-columns: 1fr !important; }
  }
`;

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string | null } | null>(null);
  const [checking, setChecking] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      if (u && u.email === ALLOWED_EMAIL) {
        setUser({ email: u.email });
        setChecking(false);
        setTimeout(() => setMounted(true), 50);
      } else {
        router.replace('/login');
      }
    });
    return unsub;
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await signOut(auth);
    router.replace('/login');
  };

  if (checking) {
    return (
      <div data-adm-page style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg,#EEF3FC 0%,#F5F8FF 50%,#EBF0FA 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <style>{CSS}</style>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', border: '3px solid rgba(35,82,255,0.15)', borderTop: '3px solid #2352FF', animation: 'adm-spin 0.8s linear infinite' }} />
          <span style={{ fontSize: '0.75rem', color: '#9AA5B4', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Loading dashboard…</span>
        </div>
      </div>
    );
  }

  return (
    <div data-adm-page style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <style>{CSS}</style>

      {/* ── Page background — same as hero & login ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: -2,
        background: 'linear-gradient(160deg,#EEF3FC 0%,#F5F8FF 50%,#EBF0FA 100%)',
      }} />
      {/* Grid */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(35,82,255,0.04) 1px,transparent 1px),
          linear-gradient(90deg,rgba(35,82,255,0.04) 1px,transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />
      {/* Ambient blobs */}
      <div style={{
        position: 'fixed', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(35,82,255,0.09) 0%,transparent 70%)',
        top: -180, left: -150, zIndex: -1, pointerEvents: 'none',
        animation: 'adm-blob1 18s ease-in-out infinite',
      }} />
      <div style={{
        position: 'fixed', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(255,79,23,0.07) 0%,transparent 70%)',
        bottom: -160, right: '5%', zIndex: -1, pointerEvents: 'none',
        animation: 'adm-blob2 22s ease-in-out infinite',
      }} />

      {/* ══════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════ */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid #E8EEF8',
        padding: '0 36px',
        height: 66,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 2px 24px rgba(35,82,255,0.06)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 11,
            background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 800, color: '#fff',
            boxShadow: '0 4px 14px rgba(35,82,255,0.35)',
          }}>M</div>
          <span style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.025em', color: '#0D1B3E' }}>
            Market<span style={{ color: '#FF4F17' }}>Captura</span>
          </span>
          <div style={{
            marginLeft: 6, padding: '3px 11px', borderRadius: 20,
            background: 'rgba(35,82,255,0.08)', border: '1.5px solid rgba(35,82,255,0.18)',
            fontSize: '0.62rem', fontWeight: 700, color: '#2352FF',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>Admin</div>
        </div>

        {/* Right: user + logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 800, color: '#fff',
              boxShadow: '0 2px 10px rgba(35,82,255,0.3)',
            }}>
              {user?.email?.[0]?.toUpperCase() ?? 'M'}
            </div>
            <span className="adm-header-email" style={{ fontSize: '0.82rem', color: '#6B7280', fontWeight: 600 }}>
              {user?.email}
            </span>
          </div>

          <button
            className="adm-logout"
            onClick={handleLogout}
            disabled={loggingOut}
            style={{
              padding: '7px 16px', borderRadius: 20,
              background: 'transparent',
              border: '1.5px solid #E8EEF8',
              color: '#6B7280',
              fontSize: '0.78rem', fontWeight: 700,
              cursor: loggingOut ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            {loggingOut ? (
              <div style={{ width: 13, height: 13, borderRadius: '50%', border: '2px solid rgba(35,82,255,0.2)', borderTop: '2px solid #2352FF', animation: 'adm-spin 0.75s linear infinite' }} />
            ) : (
              <span style={{ fontSize: '0.9rem' }}>⎋</span>
            )}
            {loggingOut ? 'Logging out…' : 'Logout'}
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════ */}
      <main style={{ maxWidth: 1180, margin: '0 auto', padding: '44px 28px 100px', position: 'relative', zIndex: 1 }}>

        {/* ── Greeting ── */}
        <div style={{ marginBottom: 44, animation: mounted ? 'adm-fadeUp 0.6s ease both' : 'none' }}>
          {/* Label */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: '#fff', border: '1.5px solid #E4ECF7',
            borderRadius: 60, padding: '5px 16px 5px 10px',
            marginBottom: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', display: 'inline-block', animation: 'adm-pulse 2s infinite' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
              Dashboard · Live
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem,3.5vw,2.8rem)',
            fontWeight: 800,
            color: '#0D1B3E',
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            marginBottom: 10,
          }}>
            Welcome back 👋
          </h1>
          <p style={{ color: '#8A94A6', fontSize: '0.97rem', fontWeight: 500, lineHeight: 1.7 }}>
            Here&apos;s what&apos;s happening with{' '}
            <strong style={{ color: '#0D1B3E', fontWeight: 700 }}>MarketCaptura</strong> today.
          </p>
        </div>

        {/* ── Quick stats ── */}
        <div
          className="adm-stat-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
            gap: 16,
            marginBottom: 52,
            animation: mounted ? 'adm-fadeUp 0.6s 0.1s ease both' : 'none',
          }}
        >
          {QUICK_STATS.map((s, i) => (
            <div
              key={s.label}
              className="adm-stat"
              style={{
                background: '#fff',
                border: '1.5px solid #E8EEF8',
                borderRadius: 20,
                padding: '22px 24px',
                display: 'flex', alignItems: 'center', gap: 16,
                boxShadow: '0 4px 16px rgba(35,82,255,0.06)',
                animationDelay: `${i * 0.07}s`,
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                background: s.bg, border: `1.5px solid ${s.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
              }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0D1B3E', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#9AA5B4', marginTop: 5, fontWeight: 600, letterSpacing: '0.03em' }}>
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Section header ── */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: 24,
          animation: mounted ? 'adm-fadeUp 0.6s 0.18s ease both' : 'none',
        }}>
          <div>
            <div style={{
              width: 36, height: 3, borderRadius: 60,
              background: 'linear-gradient(90deg,#2352FF,#FF4F17)',
              marginBottom: 12,
            }} />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0D1B3E', letterSpacing: '-0.025em' }}>
              Management Modules
            </h2>
            <p style={{ fontSize: '0.83rem', color: '#9AA5B4', marginTop: 4, fontWeight: 500 }}>
              Select a module to get started
            </p>
          </div>
          {/* Module count pill */}
          <div style={{
            padding: '6px 14px', borderRadius: 20,
            background: '#fff', border: '1.5px solid #E8EEF8',
            fontSize: '0.74rem', fontWeight: 700, color: '#9AA5B4',
          }}>
            1 / {FEATURES.length} active
          </div>
        </div>

        {/* ── Feature cards ── */}
        <div
          className="adm-feat-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))',
            gap: 20,
            animation: mounted ? 'adm-fadeUp 0.6s 0.24s ease both' : 'none',
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.id}
              className={`adm-card${f.disabled ? ' disabled' : ''}`}
              onClick={() => !f.disabled && router.push(f.href)}
              style={{
                borderRadius: 24,
                background: '#fff',
                border: '1.5px solid #E8EEF8',
                overflow: 'hidden',
                opacity: f.disabled ? 0.62 : 1,
                cursor: f.disabled ? 'not-allowed' : 'pointer',
                boxShadow: f.disabled ? 'none' : '0 6px 28px rgba(35,82,255,0.07)',
              }}
            >
              {/* Card top accent strip */}
              <div style={{
                height: 4,
                background: f.disabled
                  ? 'linear-gradient(90deg,#E8EEF8,#E8EEF8)'
                  : `linear-gradient(90deg,${f.accent},#1a3fd4)`,
              }} />

              {/* Card body */}
              <div style={{ padding: '26px 24px 20px' }}>
                {/* Icon + badge row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: 15,
                    background: f.disabled ? '#F8FAFF' : `${f.accent}12`,
                    border: f.disabled ? '1.5px solid #E8EEF8' : `1.5px solid ${f.accent}28`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24,
                  }}>{f.icon}</div>

                  <div style={{
                    padding: '4px 11px', borderRadius: 20,
                    background: f.disabled ? '#F8FAFF' : `${f.accent}10`,
                    border: `1.5px solid ${f.disabled ? '#E8EEF8' : f.accent + '28'}`,
                    fontSize: '0.62rem', fontWeight: 700,
                    color: f.disabled ? '#C4CDD9' : f.accent,
                    letterSpacing: '0.07em', textTransform: 'uppercase',
                  }}>{f.badge}</div>
                </div>

                <h3 style={{
                  fontSize: '1.05rem', fontWeight: 800,
                  color: f.disabled ? '#9AA5B4' : '#0D1B3E',
                  letterSpacing: '-0.02em', marginBottom: 8,
                }}>{f.title}</h3>

                <p style={{
                  fontSize: '0.82rem',
                  color: f.disabled ? '#C4CDD9' : '#6B7280',
                  lineHeight: 1.65,
                  marginBottom: f.disabled ? 0 : 20,
                }}>{f.desc}</p>

                {/* CTA row */}
                {!f.disabled && (
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: 16, borderTop: '1px solid #F0F4FC',
                  }}>
                    <button
                      className="adm-mod-btn"
                      style={{
                        padding: '8px 18px', borderRadius: 20,
                        background: 'transparent',
                        border: `1.5px solid ${f.accent}`,
                        color: f.accent,
                        fontSize: '0.78rem', fontWeight: 700,
                        cursor: 'pointer', letterSpacing: '-0.01em',
                      }}
                    >
                      Open module
                    </button>
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%',
                      background: `${f.accent}10`,
                      border: `1.5px solid ${f.accent}25`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: f.accent, fontSize: '1.05rem', fontWeight: 700,
                    }}>→</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom info strip ── */}
        <div style={{
          marginTop: 56,
          padding: '22px 28px',
          background: '#fff',
          border: '1.5px solid #E8EEF8',
          borderRadius: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
          boxShadow: '0 4px 16px rgba(35,82,255,0.05)',
          animation: mounted ? 'adm-fadeUp 0.6s 0.3s ease both' : 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 11,
              background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 800, color: '#fff',
            }}>M</div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0D1B3E', letterSpacing: '-0.015em' }}>MarketCaptura Admin</div>
              <div style={{ fontSize: '0.72rem', color: '#9AA5B4', marginTop: 2, fontWeight: 500 }}>Internal management portal · Restricted access</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            {[{ icon: '⭐', text: '4.8★ · 150+ Projects' }, { icon: '🇮🇳', text: 'India Registered' }].map(item => (
              <div key={item.text} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 20,
                background: '#F8FAFF', border: '1.5px solid #E8EEF8',
                fontSize: '0.76rem', fontWeight: 700, color: '#0D1B3E',
              }}>
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}