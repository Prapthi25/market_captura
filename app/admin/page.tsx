

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
    title: 'Blog Management',
    desc: 'Manage blog posts, categories, tags, and SEO metadata.',
    badge: 'Blogs',
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
    disabled: true,
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
    disabled: true,
  },
];

const QUICK_STATS = [
  { label: 'Total Leads',    value: '—',    icon: '👥', color: '#2352FF', bg: 'rgba(35,82,255,0.08)',   border: 'rgba(35,82,255,0.18)' },
  { label: 'Converted',     value: '—',    icon: '✅', color: '#22C55E', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.18)' },
  { label: 'Pending Review', value: '—',    icon: '⏳', color: '#FF4F17', bg: 'rgba(255,79,23,0.08)',   border: 'rgba(255,79,23,0.18)' },
  { label: 'Avg ROI',        value: '3.8×', icon: '📈', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.18)' },
];

const CSS = `
  [data-adm-page],
  [data-adm-page] *,
  [data-adm-page] input,
  [data-adm-page] button,
  [data-adm-page] label,
  [data-adm-page] a {
    font-family: 'Syne', sans-serif !important;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  @keyframes adm-spin    { to { transform: rotate(360deg); } }
  @keyframes adm-fadeUp  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  @keyframes adm-pulse   { 0%,100% { opacity:.5; transform:scale(1); } 50% { opacity:1; transform:scale(1.15); } }
  @keyframes adm-blob1   { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-20px) scale(1.05); } 66% { transform: translate(-20px,15px) scale(0.97); } }
  @keyframes adm-blob2   { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-25px,20px) scale(1.08); } }

  /* ── Card hover ── */
  [data-adm-page] .adm-card {
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease;
    cursor: pointer;
    will-change: transform;
  }
  [data-adm-page] .adm-card:hover:not(.disabled) {
    transform: translateY(-5px) scale(1.01);
    box-shadow: 0 24px 56px rgba(35,82,255,0.14) !important;
  }
  [data-adm-page] .adm-card.disabled {
    cursor: not-allowed;
  }
  [data-adm-page] .adm-stat {
    transition: transform 0.22s ease, box-shadow 0.22s ease;
    will-change: transform;
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
  [data-adm-page] .adm-mod-btn {
    transition: all 0.2s ease;
  }
  [data-adm-page] .adm-mod-btn:hover {
    background: #2352FF !important;
    color: #fff !important;
    border-color: #2352FF !important;
  }

  /* ─────────────── RESPONSIVE ─────────────── */

  /* Stat grid: 4 cols default → 2 on tablet/mobile */
  [data-adm-page] .adm-stat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }

  /* Feature grid */
  [data-adm-page] .adm-feat-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  /* Bottom strip */
  [data-adm-page] .adm-bottom-strip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 14px;
  }

  /* Header */
  [data-adm-page] .adm-header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }

  /* ── Tablet: ≤ 900px ── */
  @media (max-width: 900px) {
    [data-adm-page] .adm-stat-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    [data-adm-page] .adm-feat-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
  }

  /* ── Mobile: ≤ 580px ── */
  @media (max-width: 580px) {
    [data-adm-page] .adm-header-email   { display: none !important; }
    [data-adm-page] .adm-header-logo-text { display: none !important; }

    [data-adm-page] .adm-stat-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    [data-adm-page] .adm-feat-grid {
      grid-template-columns: 1fr;
      gap: 14px;
    }

    [data-adm-page] .adm-section-header {
      flex-direction: column;
      align-items: flex-start !important;
      gap: 10px;
    }

    [data-adm-page] .adm-bottom-strip {
      flex-direction: column;
      align-items: flex-start;
    }

    [data-adm-page] .adm-bottom-badges {
      flex-wrap: wrap;
    }

    [data-adm-page] .adm-main-pad {
      padding: 28px 16px 80px !important;
    }

    [data-adm-page] .adm-greeting-h1 {
      font-size: 1.8rem !important;
    }

    [data-adm-page] .adm-stat-value {
      font-size: 1.45rem !important;
    }

    [data-adm-page] .adm-stat-inner {
      gap: 10px !important;
      padding: 16px 14px !important;
    }

    [data-adm-page] .adm-stat-icon {
      width: 40px !important;
      height: 40px !important;
      border-radius: 11px !important;
      font-size: 18px !important;
    }

    [data-adm-page] .adm-card-body {
      padding: 20px 18px 16px !important;
    }

    [data-adm-page] .adm-header-pad {
      padding: 0 16px !important;
    }

    [data-adm-page] .adm-logout-label { display: none !important; }
    [data-adm-page] .adm-logout-icon-only {
      padding: 7px 10px !important;
    }
  }

  /* ── Very small: ≤ 360px ── */
  @media (max-width: 360px) {
    [data-adm-page] .adm-stat-grid {
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
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

  /* ── Loading state ── */
  if (checking) {
    return (
      <div data-adm-page style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg,#EEF3FC 0%,#F5F8FF 50%,#EBF0FA 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <style>{CSS}</style>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            border: '3px solid rgba(35,82,255,0.15)',
            borderTop: '3px solid #2352FF',
            animation: 'adm-spin 0.8s linear infinite',
          }} />
          <span style={{
            fontSize: '0.75rem', color: '#9AA5B4', fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            Loading dashboard…
          </span>
        </div>
      </div>
    );
  }

  const activeCount = FEATURES.filter(f => !f.disabled).length;

  return (
    <div data-adm-page style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <style>{CSS}</style>

      {/* ── Background ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: -2,
        background: 'linear-gradient(160deg,#EEF3FC 0%,#F5F8FF 50%,#EBF0FA 100%)',
      }} />
      <div style={{
        position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(35,82,255,0.04) 1px,transparent 1px),
          linear-gradient(90deg,rgba(35,82,255,0.04) 1px,transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />
      {/* Blobs */}
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
        height: 64,
        boxShadow: '0 2px 24px rgba(35,82,255,0.06)',
      }}>
        <div
          className="adm-header-inner adm-header-pad"
          style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px' }}
        >
          {/* ── Logo ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15, fontWeight: 800, color: '#fff',
              boxShadow: '0 4px 14px rgba(35,82,255,0.35)',
            }}>M</div>

            <span
              className="adm-header-logo-text"
              style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.025em', color: '#0D1B3E', whiteSpace: 'nowrap' }}
            >
              Market<span style={{ color: '#FF4F17' }}>Captura</span>
            </span>

            <div style={{
              padding: '3px 10px', borderRadius: 20, flexShrink: 0,
              background: 'rgba(35,82,255,0.08)', border: '1.5px solid rgba(35,82,255,0.18)',
              fontSize: '0.6rem', fontWeight: 700, color: '#2352FF',
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>Admin</div>
          </div>

          {/* ── Right side ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            {/* Avatar + email */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800, color: '#fff',
                boxShadow: '0 2px 10px rgba(35,82,255,0.3)',
              }}>
                {user?.email?.[0]?.toUpperCase() ?? 'M'}
              </div>
              <span
                className="adm-header-email"
                style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 600, whiteSpace: 'nowrap' }}
              >
                {user?.email}
              </span>
            </div>

            {/* Logout */}
            <button
              className="adm-logout adm-logout-icon-only"
              onClick={handleLogout}
              disabled={loggingOut}
              style={{
                padding: '7px 15px', borderRadius: 20,
                background: 'transparent',
                border: '1.5px solid #E8EEF8',
                color: '#6B7280',
                fontSize: '0.78rem', fontWeight: 700,
                cursor: loggingOut ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
                whiteSpace: 'nowrap',
              }}
            >
              {loggingOut
                ? <div style={{ width: 13, height: 13, borderRadius: '50%', border: '2px solid rgba(35,82,255,0.2)', borderTop: '2px solid #2352FF', animation: 'adm-spin 0.75s linear infinite' }} />
                : <span style={{ fontSize: '1rem' }}>⎋</span>
              }
              <span className="adm-logout-label">
                {loggingOut ? 'Logging out…' : 'Logout'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          MAIN
      ══════════════════════════════════════════ */}
      <main
        className="adm-main-pad"
        style={{ maxWidth: 1180, margin: '0 auto', padding: '40px 28px 100px', position: 'relative', zIndex: 1 }}
      >

        {/* ── Greeting ── */}
        <div style={{ marginBottom: 40, animation: mounted ? 'adm-fadeUp 0.55s ease both' : 'none' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: '#fff', border: '1.5px solid #E4ECF7',
            borderRadius: 60, padding: '5px 15px 5px 10px',
            marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', display: 'inline-block', animation: 'adm-pulse 2s infinite' }} />
            <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
              Dashboard · Live
            </span>
          </div>

          <h1
            className="adm-greeting-h1"
            style={{
              fontSize: 'clamp(1.75rem,3.5vw,2.75rem)',
              fontWeight: 800,
              color: '#0D1B3E',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 8,
            }}
          >
            Welcome back 👋
          </h1>
          <p style={{ color: '#8A94A6', fontSize: '0.93rem', fontWeight: 500, lineHeight: 1.7, maxWidth: 480 }}>
            Here&apos;s what&apos;s happening with{' '}
            <strong style={{ color: '#0D1B3E', fontWeight: 700 }}>MarketCaptura</strong> today.
          </p>
        </div>

        {/* ── Quick Stats ── */}
        <div
          className="adm-stat-grid"
          style={{ marginBottom: 48, animation: mounted ? 'adm-fadeUp 0.55s 0.08s ease both' : 'none' }}
        >
          {QUICK_STATS.map((s, i) => (
            <div
              key={s.label}
              className="adm-stat adm-stat-inner"
              style={{
                background: '#fff',
                border: '1.5px solid #E8EEF8',
                borderRadius: 18,
                padding: '20px 20px',
                display: 'flex', alignItems: 'center', gap: 14,
                boxShadow: '0 4px 16px rgba(35,82,255,0.06)',
                animationDelay: `${i * 0.06}s`,
              }}
            >
              <div
                className="adm-stat-icon"
                style={{
                  width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                  background: s.bg, border: `1.5px solid ${s.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                }}
              >{s.icon}</div>
              <div style={{ minWidth: 0 }}>
                <div
                  className="adm-stat-value"
                  style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0D1B3E', letterSpacing: '-0.03em', lineHeight: 1 }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#9AA5B4', marginTop: 5, fontWeight: 600, letterSpacing: '0.03em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Section header ── */}
        <div
          className="adm-section-header"
          style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            marginBottom: 22,
            animation: mounted ? 'adm-fadeUp 0.55s 0.15s ease both' : 'none',
          }}
        >
          <div>
            <div style={{
              width: 34, height: 3, borderRadius: 60,
              background: 'linear-gradient(90deg,#2352FF,#FF4F17)',
              marginBottom: 10,
            }} />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0D1B3E', letterSpacing: '-0.025em' }}>
              Management Modules
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#9AA5B4', marginTop: 3, fontWeight: 500 }}>
              Select a module to get started
            </p>
          </div>
          <div style={{
            padding: '5px 14px', borderRadius: 20,
            background: '#fff', border: '1.5px solid #E8EEF8',
            fontSize: '0.72rem', fontWeight: 700, color: '#9AA5B4',
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            {activeCount} / {FEATURES.length} active
          </div>
        </div>

        {/* ── Feature cards ── */}
        <div
          className="adm-feat-grid"
          style={{ animation: mounted ? 'adm-fadeUp 0.55s 0.21s ease both' : 'none' }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.id}
              className={`adm-card${f.disabled ? ' disabled' : ''}`}
              onClick={() => !f.disabled && router.push(f.href)}
              style={{
                borderRadius: 22,
                background: '#fff',
                border: '1.5px solid #E8EEF8',
                overflow: 'hidden',
                opacity: f.disabled ? 0.58 : 1,
                cursor: f.disabled ? 'not-allowed' : 'pointer',
                boxShadow: f.disabled ? 'none' : '0 6px 28px rgba(35,82,255,0.07)',
                animationDelay: `${0.21 + i * 0.06}s`,
              }}
            >
              {/* Top accent strip */}
              <div style={{
                height: 4,
                background: f.disabled
                  ? '#E8EEF8'
                  : `linear-gradient(90deg,${f.accent},#1a3fd4)`,
              }} />

              {/* Card body */}
              <div className="adm-card-body" style={{ padding: '24px 22px 20px' }}>
                {/* Icon + badge */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14, gap: 8 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                    background: f.disabled ? '#F8FAFF' : `${f.accent}12`,
                    border: f.disabled ? '1.5px solid #E8EEF8' : `1.5px solid ${f.accent}28`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22,
                  }}>{f.icon}</div>

                  <div style={{
                    padding: '4px 10px', borderRadius: 20, flexShrink: 0,
                    background: f.disabled ? '#F8FAFF' : `${f.accent}10`,
                    border: `1.5px solid ${f.disabled ? '#E8EEF8' : f.accent + '28'}`,
                    fontSize: '0.6rem', fontWeight: 700,
                    color: f.disabled ? '#C4CDD9' : f.accent,
                    letterSpacing: '0.07em', textTransform: 'uppercase',
                    alignSelf: 'flex-start',
                  }}>{f.badge}</div>
                </div>

                <h3 style={{
                  fontSize: '1rem', fontWeight: 800,
                  color: f.disabled ? '#9AA5B4' : '#0D1B3E',
                  letterSpacing: '-0.02em', marginBottom: 6,
                }}>{f.title}</h3>

                <p style={{
                  fontSize: '0.8rem',
                  color: f.disabled ? '#C4CDD9' : '#6B7280',
                  lineHeight: 1.65,
                  marginBottom: f.disabled ? 0 : 18,
                }}>{f.desc}</p>

                {/* CTA */}
                {!f.disabled && (
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: 14, borderTop: '1px solid #F0F4FC',
                    gap: 8,
                  }}>
                    <button
                      className="adm-mod-btn"
                      style={{
                        padding: '8px 16px', borderRadius: 20,
                        background: 'transparent',
                        border: `1.5px solid ${f.accent}`,
                        color: f.accent,
                        fontSize: '0.76rem', fontWeight: 700,
                        cursor: 'pointer', letterSpacing: '-0.01em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Open module
                    </button>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                      background: `${f.accent}10`,
                      border: `1.5px solid ${f.accent}25`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: f.accent, fontSize: '1rem', fontWeight: 700,
                    }}>→</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom info strip ── */}
        <div
          className="adm-bottom-strip"
          style={{
            marginTop: 52,
            padding: '20px 24px',
            background: '#fff',
            border: '1.5px solid #E8EEF8',
            borderRadius: 20,
            boxShadow: '0 4px 16px rgba(35,82,255,0.05)',
            animation: mounted ? 'adm-fadeUp 0.55s 0.28s ease both' : 'none',
          }}
        >
          {/* Left: brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15, fontWeight: 800, color: '#fff',
            }}>M</div>
            <div>
              <div style={{ fontSize: '0.83rem', fontWeight: 800, color: '#0D1B3E', letterSpacing: '-0.015em' }}>
                MarketCaptura Admin
              </div>
              <div style={{ fontSize: '0.7rem', color: '#9AA5B4', marginTop: 2, fontWeight: 500 }}>
                Internal management portal · Restricted access
              </div>
            </div>
          </div>

          {/* Right: badges */}
          <div className="adm-bottom-badges" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {[
              { icon: '⭐', text: '4.8★ · 150+ Projects' },
             
            ].map(item => (
              <div key={item.text} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 13px', borderRadius: 20,
                background: '#F8FAFF', border: '1.5px solid #E8EEF8',
                fontSize: '0.74rem', fontWeight: 700, color: '#0D1B3E',
                whiteSpace: 'nowrap',
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