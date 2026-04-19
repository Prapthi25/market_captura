


'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection, query, where, onSnapshot,
  doc, updateDoc, orderBy, Timestamp,
} from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

const ALLOWED_EMAIL = 'marketcaptura@gmail.com';

// ─── Types ────────────────────────────────────────────────────────────────────
interface RequestDoc {
  id: string;
  company: {
    name: string;
    businessCategory: string;
    services: string[];
    websiteLink: string | null;
    instagramLink: string | null;
    turnover: string | null;
  };
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  meta: {
    source: string;
    createdAt: Timestamp | null;
    status: 'new' | 'accepted';
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(ts: Timestamp | null): string {
  if (!ts) return '—';
  return ts.toDate().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
function formatTime(ts: Timestamp | null): string {
  if (!ts) return '';
  return ts.toDate().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}
function whatsappLink(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  const normalized = digits.startsWith('91') ? digits : `91${digits}`;
  const msg = encodeURIComponent('Hi! This is MarketCaptura. We received your consultation request and would love to connect with you. When would be a good time to talk?');
  return `https://wa.me/${normalized}?text=${msg}`;
}
function initials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}
const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #2352FF, #6B8FFF)',
  'linear-gradient(135deg, #FF4F17, #FF8A60)',
  'linear-gradient(135deg, #2352FF, #1235c5)',
  'linear-gradient(135deg, #0D1B3E, #2352FF)',
  'linear-gradient(135deg, #FF4F17, #2352FF)',
];
function avatarGradient(name: string) {
  return AVATAR_GRADIENTS[name.charCodeAt(0) % AVATAR_GRADIENTS.length];
}

// ─── Global Styles ────────────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }

  :root {
    --primary: #2352FF;
    --primary-dark: #1235c5;
    --primary-soft: rgba(35,82,255,0.08);
    --primary-mid: rgba(35,82,255,0.15);
    --primary-border: rgba(35,82,255,0.25);
    --accent: #FF4F17;
    --bg-hero: linear-gradient(160deg,#EEF3FC 0%,#F5F8FF 50%,#EBF0FA 100%);
    --surface: #FFFFFF;
    --border: #E4ECF7;
    --border-hover: rgba(35,82,255,0.3);
    --text-dark: #0D1B3E;
    --text-muted: #6B7280;
    --text-hint: #9AA5B4;
    --green: #25D366;
  }

  @keyframes spin       { to { transform: rotate(360deg); } }
  @keyframes fadeUp     { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse      { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.5; transform:scale(1.4); } }
  @keyframes shimmer    { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
  @keyframes mc-backdrop-in { from { opacity:0; } to { opacity:1; } }
  @keyframes mc-modal-in {
    from { opacity:0; transform:translateY(28px) scale(0.96); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }

  /* ── Scrollbar ── */
  .cr-scroll::-webkit-scrollbar       { width: 3px; }
  .cr-scroll::-webkit-scrollbar-track { background: transparent; }
  .cr-scroll::-webkit-scrollbar-thumb { background: rgba(35,82,255,0.25); border-radius: 3px; }

  /* ── Tab buttons ── */
  .cr-tab-btn {
    padding: 9px 24px;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    background: transparent;
    color: var(--text-muted);
    transition: all 0.25s ease;
    white-space: nowrap;
  }
  .cr-tab-btn.active {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: #fff;
    box-shadow: 0 4px 16px rgba(35,82,255,0.25);
  }
  .cr-tab-btn:not(.active):hover {
    color: var(--text-dark);
    background: var(--primary-soft);
  }

  /* ── Cards ── */
  .cr-card {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 20px;
    padding: 22px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(13,27,62,0.04);
  }
  .cr-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), #6B8FFF);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 20px 20px 0 0;
  }
  .cr-card:hover { border-color: var(--border-hover); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(35,82,255,0.12), 0 2px 8px rgba(13,27,62,0.06); }
  .cr-card:hover::before { opacity: 1; }

  /* ── Chips ── */
  .cr-chip {
    padding: 4px 11px;
    border-radius: 50px;
    background: var(--primary-soft);
    border: 1px solid var(--primary-border);
    font-size: 0.68rem;
    font-weight: 600;
    color: var(--primary);
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  /* ── WhatsApp button ── */
  .cr-wa-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 13px;
    border-radius: 50px;
    background: rgba(37,211,102,0.08);
    border: 1.5px solid rgba(37,211,102,0.25);
    color: #1a9e4f;
    font-size: 0.73rem;
    font-weight: 600;
    text-decoration: none;
    font-family: 'DM Sans', sans-serif;
    transition: background 0.2s, border-color 0.2s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 160px;
  }
  .cr-wa-btn:hover { background: rgba(37,211,102,0.15); border-color: rgba(37,211,102,0.4); }

  /* ── Confirm button ── */
  .cr-confirm-btn {
    padding: 7px 16px;
    border-radius: 50px;
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    border: none;
    color: #fff;
    font-size: 0.76rem;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Syne', sans-serif;
    letter-spacing: 0.01em;
    display: flex;
    align-items: center;
    gap: 6px;
    box-shadow: 0 4px 14px rgba(35,82,255,0.25);
    transition: all 0.2s;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .cr-confirm-btn:hover:not(:disabled) { box-shadow: 0 8px 24px rgba(35,82,255,0.35); transform: scale(1.03); }
  .cr-confirm-btn:disabled { cursor: not-allowed; opacity: 0.6; }

  /* ── Accepted badge ── */
  .cr-accepted-badge {
    padding: 5px 13px;
    border-radius: 50px;
    background: rgba(35,82,255,0.08);
    border: 1.5px solid var(--primary-border);
    color: var(--primary);
    font-size: 0.71rem;
    font-weight: 700;
    font-family: 'DM Sans', sans-serif;
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* ── Badge dot ── */
  .badge-dot { width:6px; height:6px; border-radius:50%; background:var(--primary); animation:pulse 2s infinite; flex-shrink:0; }

  /* ── Skeleton ── */
  .skeleton {
    background: linear-gradient(90deg, #EEF3FC 25%, #dde8f8 50%, #EEF3FC 75%);
    background-size: 200% 100%;
    animation: shimmer 1.6s infinite;
  }

  /* ── Cards grid ── */
  .cr-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px), 1fr));
    gap: 16px;
  }

  /* ── Modal grid ── */
  .cr-modal-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px 20px;
    margin-top: 14px;
  }

  /* ── Header back button label ── */
  .cr-back-label { display: inline; }

  /* ── Header breadcrumb ── */
  .cr-breadcrumb-full { display: flex; align-items: center; gap: 8px; }
  .cr-breadcrumb-short { display: none; }

  /* ═══════════════════════════════════════
     RESPONSIVE — Tablet ≤ 768px
  ═══════════════════════════════════════ */
  @media (max-width: 768px) {
    .cr-cards-grid {
      grid-template-columns: 1fr;
      gap: 14px;
    }
    .cr-modal-grid {
      grid-template-columns: 1fr;
      gap: 10px;
    }
  }

  /* ═══════════════════════════════════════
     RESPONSIVE — Mobile ≤ 580px
  ═══════════════════════════════════════ */
  @media (max-width: 580px) {
    /* Header */
    .cr-header-inner { padding: 0 14px !important; gap: 10px !important; }
    .cr-back-label { display: none !important; }
    .cr-breadcrumb-full { display: none !important; }
    .cr-breadcrumb-short { display: block !important; font-family: 'Syne', sans-serif; font-size: 0.85rem; font-weight: 700; color: #0D1B3E; }
    .cr-count-pill { padding: 5px 11px !important; }
    .cr-count-pill span { font-size: 0.7rem !important; }

    /* Main content */
    .cr-main-pad { padding: 24px 14px 80px !important; }

    /* Tab strip */
    .cr-tab-strip { width: 100% !important; }
    .cr-tab-btn { flex: 1; padding: 9px 12px; font-size: 0.8rem; text-align: center; }

    /* Card internals */
    .cr-card { padding: 16px !important; border-radius: 16px; }
    .cr-card-footer { flex-wrap: wrap; gap: 8px !important; }
    .cr-wa-btn { max-width: none !important; flex: 1; justify-content: center; }

    /* Skeleton */
    .cr-skel { height: 150px !important; }

    /* Modal */
    .cr-modal-box {
      border-radius: 22px !important;
      max-height: 96vh !important;
      margin: 8px !important;
    }
    .cr-modal-header { padding: 16px 18px !important; }
    .cr-modal-body { padding: 18px !important; }
    .cr-modal-footer { padding: 14px 18px !important; gap: 8px !important; }
    .cr-modal-footer-btn { font-size: 0.82rem !important; padding: 11px !important; }
    .cr-modal-grid { grid-template-columns: 1fr !important; }
    .cr-modal-avatar { width: 40px !important; height: 40px !important; border-radius: 12px !important; font-size: 0.8rem !important; }
    .cr-modal-name { font-size: 0.93rem !important; }
  }

  /* ═══════════════════════════════════════
     RESPONSIVE — Very small ≤ 380px
  ═══════════════════════════════════════ */
  @media (max-width: 380px) {
    .cr-tab-btn { font-size: 0.75rem; padding: 8px 8px; }
    .cr-chip { font-size: 0.63rem; padding: 3px 9px; }
  }
`;

// ─── Detail Modal ─────────────────────────────────────────────────────────────
function DetailModal({ req, onClose, onConfirm, confirming }: {
  req: RequestDoc; onClose: () => void; onConfirm: () => void; confirming: boolean;
}) {
  const isAccepted = req.meta.status === 'accepted';

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(13,27,62,0.35)', backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        animation: 'mc-backdrop-in 0.22s ease',
      }}
    >
      <div
        className="cr-modal-box"
        style={{
          width: '100%', maxWidth: 560,
          background: '#fff',
          border: '1.5px solid #E4ECF7',
          borderRadius: 28,
          boxShadow: '0 32px 80px rgba(13,27,62,0.15), 0 4px 16px rgba(35,82,255,0.08)',
          animation: 'mc-modal-in 0.34s cubic-bezier(0.16,1,0.3,1)',
          maxHeight: '92vh', display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}
      >
        {/* Top accent */}
        <div style={{ height: 4, background: 'linear-gradient(90deg,#2352FF,#6B8FFF,#FF4F17)', flexShrink: 0, borderRadius: '28px 28px 0 0' }} />

        {/* Header */}
        <div
          className="cr-modal-header"
          style={{ padding: '20px 24px', borderBottom: '1px solid #F0F4FB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, gap: 12 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
            <div
              className="cr-modal-avatar"
              style={{
                width: 46, height: 46, borderRadius: 14, flexShrink: 0,
                background: avatarGradient(req.contact.name),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Syne, sans-serif', fontSize: '0.88rem', fontWeight: 800, color: '#fff',
                boxShadow: '0 4px 12px rgba(35,82,255,0.2)',
              }}
            >{initials(req.contact.name)}</div>
            <div style={{ minWidth: 0 }}>
              <div
                className="cr-modal-name"
                style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 800, color: '#0D1B3E', letterSpacing: '-0.02em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              >{req.contact.name}</div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', color: '#9AA5B4', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{req.company.name}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{
              padding: '4px 12px', borderRadius: 50,
              background: isAccepted ? 'rgba(35,82,255,0.08)' : 'rgba(255,79,23,0.08)',
              border: isAccepted ? '1.5px solid rgba(35,82,255,0.25)' : '1.5px solid rgba(255,79,23,0.25)',
              color: isAccepted ? '#2352FF' : '#FF4F17',
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem', fontWeight: 700,
              letterSpacing: '0.04em', textTransform: 'uppercase' as const,
              whiteSpace: 'nowrap',
            }}>{isAccepted ? '✦ Accepted' : '⏳ Pending'}</div>

            <button
              onClick={onClose}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                border: '1.5px solid #E4ECF7', background: 'transparent', color: '#9AA5B4',
                fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s', flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(35,82,255,0.08)'; e.currentTarget.style.color = '#2352FF'; e.currentTarget.style.borderColor = 'rgba(35,82,255,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9AA5B4'; e.currentTarget.style.borderColor = '#E4ECF7'; }}
            >×</button>
          </div>
        </div>

        {/* Body */}
        <div className="cr-scroll cr-modal-body" style={{ overflowY: 'auto', padding: '24px', flex: 1 }}>
          <ModalSection label="Company Details" />
          <div className="cr-modal-grid">
            <ModalField label="Company" value={req.company.name} />
            <ModalField label="Category" value={req.company.businessCategory} />
            {req.company.turnover && <ModalField label="Turnover" value={req.company.turnover} />}
            {req.company.websiteLink && <ModalField label="Website" value={req.company.websiteLink} link />}
            {req.company.instagramLink && <ModalField label="Instagram" value={req.company.instagramLink} />}
          </div>

          <ModalSection label="Services Requested" mt />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            {req.company.services.map(s => (
              <span key={s} className="cr-chip">{s}</span>
            ))}
          </div>

          <ModalSection label="Contact" mt />
          <div className="cr-modal-grid">
            <ModalField label="Name" value={req.contact.name} />
            <ModalField label="Email" value={req.contact.email} />
            <ModalField label="Phone" value={req.contact.phone} />
          </div>

          <ModalSection label="Submission" mt />
          <div className="cr-modal-grid">
            <ModalField label="Date" value={`${formatDate(req.meta.createdAt)} · ${formatTime(req.meta.createdAt)}`} />
            <ModalField label="Source" value={req.meta.source} />
          </div>
        </div>

        {/* Footer */}
        <div
          className="cr-modal-footer"
          style={{ padding: '16px 24px', borderTop: '1px solid #F0F4FB', display: 'flex', gap: 10, flexShrink: 0, background: '#FAFBFF', borderRadius: '0 0 28px 28px' }}
        >
          <a
            href={whatsappLink(req.contact.phone)}
            target="_blank" rel="noopener noreferrer"
            className="cr-wa-btn cr-modal-footer-btn"
            style={{ flex: 1, justifyContent: 'center', padding: '12px', maxWidth: 'none', fontSize: '0.84rem' }}
          >
            <WhatsAppIcon /> WhatsApp
          </a>

          {isAccepted ? (
            <div
              className="cr-modal-footer-btn"
              style={{
                flex: 2, padding: '12px', borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: 'rgba(35,82,255,0.06)', border: '1.5px solid rgba(35,82,255,0.2)',
                color: '#2352FF', fontFamily: 'Syne, sans-serif', fontSize: '0.86rem', fontWeight: 700,
              }}
            >✦ Request Accepted</div>
          ) : (
            <button
              onClick={onConfirm}
              disabled={confirming}
              className="cr-modal-footer-btn"
              style={{
                flex: 2, padding: '12px', borderRadius: 14,
                background: confirming ? 'rgba(35,82,255,0.12)' : 'linear-gradient(135deg,#2352FF,#1235c5)',
                border: 'none', color: confirming ? '#2352FF' : '#fff',
                fontFamily: 'Syne, sans-serif', fontSize: '0.86rem', fontWeight: 700,
                cursor: confirming ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: confirming ? 'none' : '0 4px 16px rgba(35,82,255,0.3)',
                transition: 'all 0.2s',
              }}
            >
              {confirming ? <><Spinner />Confirming…</> : '✦ Confirm Request'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Modal helpers ────────────────────────────────────────────────────────────
function ModalSection({ label, mt }: { label: string; mt?: boolean }) {
  return (
    <div style={{ marginTop: mt ? 26 : 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', fontWeight: 700, color: '#2352FF', letterSpacing: '0.12em', textTransform: 'uppercase' as const, whiteSpace: 'nowrap' }}>{label}</span>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(35,82,255,0.2),transparent)' }} />
      </div>
    </div>
  );
}
function ModalField({ label, value, link }: { label: string; value: string; link?: boolean }) {
  return (
    <div style={{ background: '#F7F9FF', border: '1.5px solid #E4ECF7', borderRadius: 12, padding: '10px 14px' }}>
      <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', fontWeight: 700, color: '#9AA5B4', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 4 }}>{label}</div>
      {link
        ? <a href={value} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.81rem', color: '#2352FF', fontWeight: 600, wordBreak: 'break-all', textDecoration: 'none' }}>{value}</a>
        : <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.81rem', color: '#0D1B3E', fontWeight: 500, wordBreak: 'break-all' }}>{value}</div>
      }
    </div>
  );
}

// ─── Request Card ─────────────────────────────────────────────────────────────
function RequestCard({ req, onOpen, onConfirm, confirming }: {
  req: RequestDoc;
  onOpen: () => void;
  onConfirm: (e: React.MouseEvent) => void;
  confirming: boolean;
}) {
  const isAccepted = req.meta.status === 'accepted';
  return (
    <div className="cr-card" onClick={onOpen}>
      {/* Accepted left accent bar */}
      {isAccepted && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: 4, bottom: 0, background: 'linear-gradient(to bottom,#2352FF,#6B8FFF)', borderRadius: '20px 0 0 20px' }} />
      )}

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, paddingLeft: isAccepted ? 8 : 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, flex: 1, minWidth: 0 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 13, flexShrink: 0,
            background: avatarGradient(req.contact.name),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Syne, sans-serif', fontSize: '0.85rem', fontWeight: 800, color: '#fff',
            boxShadow: '0 4px 12px rgba(35,82,255,0.2)',
          }}>{initials(req.contact.name)}</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.93rem', fontWeight: 800, color: '#0D1B3E', letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {req.contact.name}
            </div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.73rem', color: '#9AA5B4', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {req.company.name} · {req.company.businessCategory}
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', color: '#6B7280', fontWeight: 500 }}>{formatDate(req.meta.createdAt)}</div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', color: '#9AA5B4', marginTop: 2 }}>{formatTime(req.meta.createdAt)}</div>
        </div>
      </div>

      {/* Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '12px 0 14px', paddingLeft: isAccepted ? 8 : 0 }}>
        {req.company.services.slice(0, 3).map(s => (
          <span key={s} className="cr-chip">{s}</span>
        ))}
        {req.company.services.length > 3 && (
          <span style={{ padding: '4px 11px', borderRadius: 50, background: '#F0F4FB', border: '1px solid #E4ECF7', fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', fontWeight: 600, color: '#9AA5B4' }}>
            +{req.company.services.length - 3}
          </span>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#F0F4FB', marginBottom: 12 }} />

      {/* Footer */}
      <div className="cr-card-footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingLeft: isAccepted ? 8 : 0 }}>
        <a href={whatsappLink(req.contact.phone)} target="_blank" rel="noopener noreferrer" className="cr-wa-btn" onClick={e => e.stopPropagation()}>
          <WhatsAppIcon size={12} /> {req.contact.phone}
        </a>
        {!isAccepted ? (
          <button onClick={onConfirm} disabled={confirming} className="cr-confirm-btn">
            {confirming ? <Spinner size={12} /> : '✦'} Confirm
          </button>
        ) : (
          <div className="cr-accepted-badge">✦ Accepted</div>
        )}
      </div>
    </div>
  );
}

// ─── Micro-components ─────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
function Spinner({ size = 14 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', border: `2px solid rgba(35,82,255,0.2)`, borderTop: `2px solid #2352FF`, animation: 'spin 0.75s linear infinite', flexShrink: 0 }} />
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ tab }: { tab: 'pending' | 'accepted' }) {
  return (
    <div style={{ textAlign: 'center', padding: '64px 24px' }}>
      <div style={{
        width: 68, height: 68, borderRadius: 20, margin: '0 auto 18px',
        background: '#F0F4FB', border: '1.5px solid #E4ECF7',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
        boxShadow: '0 2px 8px rgba(35,82,255,0.06)',
      }}>
        {tab === 'pending' ? '📭' : '✦'}
      </div>
      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.05rem', fontWeight: 800, color: '#0D1B3E', marginBottom: 8, letterSpacing: '-0.02em' }}>
        {tab === 'pending' ? 'No pending requests' : 'No accepted requests'}
      </div>
      <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: '#6B7280' }}>
        {tab === 'pending' ? 'New consultation requests will appear here.' : 'Confirmed requests will show up here.'}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ConsultationRequestsPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [tab, setTab] = useState<'pending' | 'accepted'>('pending');
  const [requests, setRequests] = useState<RequestDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReq, setSelectedReq] = useState<RequestDoc | null>(null);
  const [confirming, setConfirming] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      if (u && u.email === ALLOWED_EMAIL) {
        setAuthChecked(true);
        setTimeout(() => setMounted(true), 60);
      } else {
        router.replace('/login');
      }
    });
    return unsub;
  }, [router]);

  useEffect(() => {
    if (!authChecked) return;
    setLoading(true);
    const status = tab === 'pending' ? 'new' : 'accepted';
    const q = query(
      collection(db, 'consultationRequests'),
      where('meta.status', '==', status),
      orderBy('meta.createdAt', 'desc'),
    );
    const unsub = onSnapshot(q, snap => {
      setRequests(snap.docs.map(d => ({ id: d.id, ...d.data() } as RequestDoc)));
      setLoading(false);
    }, err => { console.error(err); setLoading(false); });
    return unsub;
  }, [authChecked, tab]);

  const handleConfirm = useCallback(async (id: string) => {
    setConfirming(id);
    try {
      await updateDoc(doc(db, 'consultationRequests', id), { 'meta.status': 'accepted' });
      setSelectedReq(prev => prev?.id === id ? { ...prev, meta: { ...prev.meta, status: 'accepted' } } : prev);
    } catch (e) { console.error(e); }
    finally { setConfirming(null); }
  }, []);

  /* ── Loading auth ── */
  if (!authChecked) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#EEF3FC 0%,#F5F8FF 50%,#EBF0FA 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <style>{GLOBAL_STYLES}</style>
        <Spinner size={36} />
      </div>
    );
  }

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#EEF3FC 0%,#F5F8FF 50%,#EBF0FA 100%)', fontFamily: 'DM Sans, sans-serif', position: 'relative', overflow: 'hidden' }}>

        {/* ── Grid overlay ── */}
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(35,82,255,0.04) 1px,transparent 1px),
            linear-gradient(90deg,rgba(35,82,255,0.04) 1px,transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />

        {/* ── Ambient blobs ── */}
        <div style={{ position: 'fixed', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(35,82,255,0.08) 0%,transparent 70%)', top: -100, left: -100, zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'fixed', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,79,23,0.06) 0%,transparent 70%)', bottom: -80, right: '30%', zIndex: 0, pointerEvents: 'none' }} />

        {/* ══════════════════════════════════════════
            HEADER
        ══════════════════════════════════════════ */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: 'rgba(245,248,255,0.88)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid #E4ECF7',
          height: 64,
          boxShadow: '0 1px 0 #E4ECF7',
        }}>
          <div
            className="cr-header-inner"
            style={{
              maxWidth: 960, margin: '0 auto',
              padding: '0 24px', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
            }}
          >
            {/* Left: back + breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, flex: 1 }}>
              <button
                onClick={() => router.push('/admin')}
                style={{
                  background: '#fff', border: '1.5px solid #E4ECF7',
                  borderRadius: 50, padding: '6px 14px',
                  color: '#6B7280', fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 5,
                  transition: 'all 0.2s', flexShrink: 0,
                  boxShadow: '0 1px 4px rgba(13,27,62,0.06)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(35,82,255,0.3)'; e.currentTarget.style.color = '#2352FF'; e.currentTarget.style.background = '#F0F4FF'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E4ECF7'; e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.background = '#fff'; }}
              >
                ←<span className="cr-back-label"> Dashboard</span>
              </button>

              {/* Full breadcrumb — hidden on mobile */}
              <div className="cr-breadcrumb-full" style={{ minWidth: 0 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 9, flexShrink: 0,
                  background: 'linear-gradient(135deg,#2352FF,#1235c5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Syne, sans-serif', fontSize: '0.8rem', fontWeight: 800, color: '#fff',
                  boxShadow: '0 4px 12px rgba(35,82,255,0.25)',
                }}>M</div>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: '#9AA5B4' }}>Admin</span>
                <span style={{ color: '#D1DBE8', fontSize: '0.85rem' }}>/</span>
                <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.84rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Consultation Requests
                </span>
              </div>

              {/* Short label — shown only on mobile */}
              <span className="cr-breadcrumb-short">Consultations</span>
            </div>

            {/* Right: count pill */}
            <div
              className="cr-count-pill"
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '6px 14px', borderRadius: 50, flexShrink: 0,
                background: 'rgba(35,82,255,0.07)', border: '1.5px solid rgba(35,82,255,0.18)',
              }}
            >
              <div className="badge-dot" />
              <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.74rem', fontWeight: 700, color: '#2352FF', whiteSpace: 'nowrap' }}>
                {loading ? '…' : requests.length} {tab === 'pending' ? 'Pending' : 'Accepted'}
              </span>
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════════════
            MAIN
        ══════════════════════════════════════════ */}
        <main
          className="cr-main-pad"
          style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px 100px', position: 'relative', zIndex: 1 }}
        >

          {/* ── Page title ── */}
          <div style={{
            marginBottom: 32,
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'none' : 'translateY(18px)',
            transition: 'all 0.55s cubic-bezier(0.16,1,0.3,1)',
          }}>
            {/* Live badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14,
              background: '#fff', border: '1.5px solid #E4ECF7', borderRadius: 60,
              padding: '6px 16px 6px 10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}>
              <div className="badge-dot" />
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.07em', textTransform: 'uppercase' as const }}>
                Live Dashboard
              </span>
            </div>

            <h1 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(1.65rem,3.5vw,2.5rem)',
              fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1,
              marginBottom: 10, color: '#0D1B3E',
            }}>
              Consultation{' '}
              <span style={{ color: '#2352FF', position: 'relative', display: 'inline-block' }}>
                Requests
                <svg viewBox="0 0 220 12" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: -5, left: 0, width: '100%', height: 7, opacity: 0.3 }}>
                  <path d="M2 8 Q55 2 110 8 Q165 14 218 8" stroke="#2352FF" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#6B7280', fontSize: '0.9rem', fontWeight: 400, lineHeight: 1.7, maxWidth: 460 }}>
              Manage and respond to incoming client consultation requests.
            </p>
          </div>

          {/* ── Tab strip ── */}
          <div
            className="cr-tab-strip"
            style={{
              opacity: mounted ? 1 : 0,
              transition: 'all 0.55s 0.08s cubic-bezier(0.16,1,0.3,1)',
              display: 'inline-flex', gap: 4,
              background: '#fff', border: '1.5px solid #E4ECF7',
              borderRadius: 60, padding: 4, marginBottom: 28,
              boxShadow: '0 2px 8px rgba(13,27,62,0.05)',
            }}
          >
            {(['pending', 'accepted'] as const).map(t => (
              <button
                key={t}
                className={`cr-tab-btn${tab === t ? ' active' : ''}`}
                onClick={() => { setTab(t); setRequests([]); setLoading(true); }}
              >
                {t === 'pending' ? '⏳ Pending' : '✦ Accepted'}
              </button>
            ))}
          </div>

          {/* ── Cards ── */}
          <div style={{ opacity: mounted ? 1 : 0, transition: 'all 0.55s 0.16s cubic-bezier(0.16,1,0.3,1)' }}>
            {loading ? (
              <div className="cr-cards-grid">
                {[1, 2, 3].map(i => (
                  <div key={i} className="skeleton cr-skel" style={{ borderRadius: 20, height: 180, animationDelay: `${i * 0.12}s` }} />
                ))}
              </div>
            ) : requests.length === 0 ? (
              <EmptyState tab={tab} />
            ) : (
              <div className="cr-cards-grid">
                {requests.map(req => (
                  <RequestCard
                    key={req.id}
                    req={req}
                    onOpen={() => setSelectedReq(req)}
                    onConfirm={e => { e.stopPropagation(); handleConfirm(req.id); }}
                    confirming={confirming === req.id}
                  />
                ))}
              </div>
            )}
          </div>
        </main>

        {/* ── Detail Modal ── */}
        {selectedReq && (
          <DetailModal
            req={selectedReq}
            onClose={() => setSelectedReq(null)}
            onConfirm={() => handleConfirm(selectedReq.id)}
            confirming={confirming === selectedReq.id}
          />
        )}
      </div>
    </>
  );
}