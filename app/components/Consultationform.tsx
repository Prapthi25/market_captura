'use client';

import { useState, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // adjust to your firebase config path

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  // Company
  companyName: string;
  businessCategory: string;
  businessCategoryOther: string;
  services: string[];
  servicesOther: string;
  websiteLink: string;
  instagramLink: string;
  turnover: string;
  // Contact
  contactName: string;
  email: string;
  phone: string;
}

const BUSINESS_CATEGORIES = [
  'D2C',
  'E-commerce',
  'Service',
  'Hospital',
  'Manufacturer',
  'Retail',
  'IT',
  'Real Estate',
  'Finance & Investment',
  'Fashion Design',
  'Architecture & Construction',
  'Local Business',
  'Other',
];

const SERVICES = [
  'Digital Marketing',
  'Social Media Marketing',
  'Web Development',
  'Paid Ads (Google Ads & Meta Ads)',
  'Business Analysis',
  'Personal Brand',
  'Branding',
  'Content Marketing',
  'Editing',
  'Other',
];

const INITIAL: FormData = {
  companyName: '',
  businessCategory: '',
  businessCategoryOther: '',
  services: [],
  servicesOther: '',
  websiteLink: '',
  instagramLink: '',
  turnover: '',
  contactName: '',
  email: '',
  phone: '',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildFirestorePayload(f: FormData) {
  const resolvedCategory =
    f.businessCategory === 'Other' ? f.businessCategoryOther.trim() : f.businessCategory;

  const resolvedServices = f.services.includes('Other')
    ? [...f.services.filter(s => s !== 'Other'), ...(f.servicesOther.trim() ? [f.servicesOther.trim()] : [])]
    : f.services;

  return {
    company: {
      name: f.companyName.trim(),
      businessCategory: resolvedCategory,
      services: resolvedServices,
      websiteLink: f.websiteLink.trim() || null,
      instagramLink: f.instagramLink.trim() || null,
      turnover: f.turnover.trim() || null,
    },
    contact: {
      name: f.contactName.trim(),
      email: f.email.trim().toLowerCase(),
      phone: f.phone.trim(),
    },
    meta: {
      source: 'GetStartedModal',
      createdAt: serverTimestamp(),
      status: 'new',          // new | contacted | converted | closed
    },
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Input({
  label,
  optional,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; optional?: boolean }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        {label}{optional && <span style={{ color: '#9AA5B4', marginLeft: 4, fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}>· optional</span>}
      </span>
      <input
        {...props}
        style={{
          padding: '11px 14px',
          border: '1.5px solid #E4ECF7',
          borderRadius: 12,
          fontSize: '0.91rem',
          color: '#0D1B3E',
          outline: 'none',
          fontFamily: 'Syne, sans-serif',
          background: '#FAFCFF',
          transition: 'border-color 0.18s',
          width: '100%',
          boxSizing: 'border-box',
          ...props.style,
        }}
        onFocus={e => { e.currentTarget.style.borderColor = '#2352FF'; }}
        onBlur={e => { e.currentTarget.style.borderColor = '#E4ECF7'; }}
      />
    </label>
  );
}

function CategoryDropdown({
  value,
  onChange,
  otherValue,
  onOtherChange,
}: {
  value: string;
  onChange: (v: string) => void;
  otherValue: string;
  onOtherChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        Business Category
      </span>

      <div ref={ref} style={{ position: 'relative' }}>
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          style={{
            width: '100%', padding: '11px 14px',
            border: `1.5px solid ${open ? '#2352FF' : '#E4ECF7'}`,
            borderRadius: 12, background: '#FAFCFF',
            fontSize: '0.91rem', color: value ? '#0D1B3E' : '#9AA5B4',
            textAlign: 'left', cursor: 'pointer', fontFamily: 'Syne, sans-serif',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            transition: 'border-color 0.18s',
          }}
        >
          <span>{value || 'Select category…'}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: '0.2s', flexShrink: 0 }}>
            <path d="M2 4l4 4 4-4" stroke="#9AA5B4" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
            background: '#fff', border: '1.5px solid #E4ECF7', borderRadius: 14,
            boxShadow: '0 12px 40px rgba(35,82,255,0.12)', zIndex: 100,
            maxHeight: 220, overflowY: 'auto', padding: 6,
          }}>
            {BUSINESS_CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => { onChange(cat); setOpen(false); }}
                style={{
                  width: '100%', textAlign: 'left', padding: '9px 12px',
                  border: 'none', borderRadius: 9, cursor: 'pointer',
                  fontFamily: 'Syne, sans-serif', fontSize: '0.88rem',
                  background: value === cat ? 'rgba(35,82,255,0.08)' : 'transparent',
                  color: value === cat ? '#2352FF' : '#0D1B3E',
                  fontWeight: value === cat ? 700 : 500,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { if (value !== cat) e.currentTarget.style.background = 'rgba(35,82,255,0.04)'; }}
                onMouseLeave={e => { if (value !== cat) e.currentTarget.style.background = 'transparent'; }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {value === 'Other' && (
        <input
          value={otherValue}
          onChange={e => onOtherChange(e.target.value)}
          placeholder="Describe your business category…"
          style={{
            padding: '11px 14px', border: '1.5px solid #2352FF', borderRadius: 12,
            fontSize: '0.91rem', color: '#0D1B3E', fontFamily: 'Syne, sans-serif',
            background: 'rgba(35,82,255,0.03)', outline: 'none', width: '100%', boxSizing: 'border-box',
          }}
        />
      )}
    </div>
  );
}

function ServicesSelector({
  selected,
  onChange,
  otherValue,
  onOtherChange,
}: {
  selected: string[];
  onChange: (v: string[]) => void;
  otherValue: string;
  onOtherChange: (v: string) => void;
}) {
  const toggle = (s: string) => {
    onChange(selected.includes(s) ? selected.filter(x => x !== s) : [...selected, s]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        Services Needed
        <span style={{ color: '#9AA5B4', marginLeft: 4, fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}>· pick all that apply</span>
      </span>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {SERVICES.map(s => {
          const active = selected.includes(s);
          return (
            <button
              key={s}
              type="button"
              onClick={() => toggle(s)}
              style={{
                padding: '7px 14px', borderRadius: 60, fontSize: '0.8rem', fontWeight: 600,
                cursor: 'pointer', fontFamily: 'Syne, sans-serif', transition: 'all 0.18s',
                border: active ? '1.5px solid #2352FF' : '1.5px solid #E4ECF7',
                background: active ? 'linear-gradient(135deg,#2352FF,#1a3fd4)' : '#FAFCFF',
                color: active ? '#fff' : '#6B7280',
                boxShadow: active ? '0 4px 12px rgba(35,82,255,0.22)' : 'none',
              }}
            >
              {s}
            </button>
          );
        })}
      </div>

      {selected.includes('Other') && (
        <input
          value={otherValue}
          onChange={e => onOtherChange(e.target.value)}
          placeholder="Describe the service you need…"
          style={{
            marginTop: 4, padding: '11px 14px', border: '1.5px solid #2352FF', borderRadius: 12,
            fontSize: '0.91rem', color: '#0D1B3E', fontFamily: 'Syne, sans-serif',
            background: 'rgba(35,82,255,0.03)', outline: 'none', width: '100%', boxSizing: 'border-box',
          }}
        />
      )}
    </div>
  );
}

// ─── Step indicators ──────────────────────────────────────────────────────────

function Steps({ current }: { current: 1 | 2 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 24 }}>
      {[
        { n: 1, label: 'Company' },
        { n: 2, label: 'Contact' },
      ].map((s, i) => {
        const done = current > s.n;
        const active = current === s.n;
        return (
          <div key={s.n} style={{ display: 'flex', alignItems: 'center', flex: i < 1 ? 1 : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.78rem', fontWeight: 800,
                background: done ? '#2352FF' : active ? 'linear-gradient(135deg,#2352FF,#1a3fd4)' : '#F3F6FB',
                color: done || active ? '#fff' : '#9AA5B4',
                boxShadow: active ? '0 4px 12px rgba(35,82,255,0.3)' : 'none',
                transition: 'all 0.3s',
                flexShrink: 0,
              }}>
                {done ? '✓' : s.n}
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: active ? 700 : 500, color: active ? '#0D1B3E' : '#9AA5B4', transition: 'color 0.3s' }}>
                {s.label}
              </span>
            </div>
            {i < 1 && (
              <div style={{ flex: 1, height: 1.5, margin: '0 12px', background: done ? '#2352FF' : '#E4ECF7', transition: 'background 0.3s' }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface ConsultationFormProps {
  onSuccess?: () => void;
}

export default function ConsultationForm({ onSuccess }: ConsultationFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const set = (key: keyof FormData, val: string | string[]) =>
    setForm(prev => ({ ...prev, [key]: val }));

  // ── Validation ──────────────────────────────────────────────────────────────

  const validateStep1 = () => {
    if (!form.companyName.trim()) return 'Please enter your company name.';
    if (!form.businessCategory) return 'Please select a business category.';
    if (form.businessCategory === 'Other' && !form.businessCategoryOther.trim())
      return 'Please describe your business category.';
    if (form.services.length === 0) return 'Please select at least one service.';
    if (form.services.includes('Other') && !form.servicesOther.trim())
      return 'Please describe the service you need.';
    return '';
  };

  const validateStep2 = () => {
    if (!form.contactName.trim()) return 'Please enter your name.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return 'Please enter a valid email address.';
    if (!form.phone.trim() || !/^\+?[\d\s\-]{7,15}$/.test(form.phone))
      return 'Please enter a valid phone number.';
    return '';
  };

  const handleNext = () => {
    const err = validateStep1();
    if (err) { setError(err); return; }
    setError('');
    setStep(2);
  };

  const handleSubmit = async () => {
    const err = validateStep2();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);
    try {
      await addDoc(collection(db, 'consultationRequests'), buildFirestorePayload(form));
      setDone(true);
      onSuccess?.();
    } catch (e) {
      console.error(e);
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ────────────────────────────────────────────────────────────

  if (done) {
    return (
      <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%', margin: '0 auto 16px',
          background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(35,82,255,0.3)',
          fontSize: 24,
        }}>✓</div>
        <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0D1B3E', marginBottom: 8 }}>
          You&apos;re all set!
        </h4>
        <p style={{ color: '#6B7280', fontSize: '0.88rem', lineHeight: 1.7 }}>
          We&apos;ve received your details and will get back to you within <strong>24 hours</strong>.
        </p>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────

  return (
    <div>
      <Steps current={step} />

      {/* Error banner */}
      {error && (
        <div style={{
          padding: '10px 14px', borderRadius: 10, marginBottom: 16,
          background: 'rgba(255,79,23,0.07)', border: '1.5px solid rgba(255,79,23,0.2)',
          color: '#C0370A', fontSize: '0.83rem', fontWeight: 600,
        }}>
          {error}
        </div>
      )}

      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Input
            label="Company Name"
            placeholder="Acme Corp"
            value={form.companyName}
            onChange={e => set('companyName', e.target.value)}
          />

          <CategoryDropdown
            value={form.businessCategory}
            onChange={v => set('businessCategory', v)}
            otherValue={form.businessCategoryOther}
            onOtherChange={v => set('businessCategoryOther', v)}
          />

          <ServicesSelector
            selected={form.services}
            onChange={v => set('services', v)}
            otherValue={form.servicesOther}
            onOtherChange={v => set('servicesOther', v)}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Input
              label="Website"
              optional
              placeholder="https://example.com"
              type="url"
              value={form.websiteLink}
              onChange={e => set('websiteLink', e.target.value)}
            />
            <Input
              label="Instagram"
              optional
              placeholder="@yourhandle"
              value={form.instagramLink}
              onChange={e => set('instagramLink', e.target.value)}
            />
          </div>

          <Input
            label="Annual Turnover"
            optional
            placeholder="e.g. ₹50L, ₹1Cr, $200K"
            value={form.turnover}
            onChange={e => set('turnover', e.target.value)}
          />

          <button
            type="button"
            onClick={handleNext}
            style={{
              width: '100%', background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
              color: '#fff', border: 'none', borderRadius: 60,
              padding: '13px 24px', fontSize: '0.93rem', fontWeight: 700,
              cursor: 'pointer', letterSpacing: '-0.01em',
              boxShadow: '0 4px 16px rgba(35,82,255,0.28)', fontFamily: 'Syne, sans-serif',
              marginTop: 4,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(35,82,255,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(35,82,255,0.28)'; }}
          >
            Continue →
          </button>
        </div>
      )}

      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Input
            label="Your Name"
            placeholder="Rahul Sharma"
            value={form.contactName}
            onChange={e => set('contactName', e.target.value)}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="rahul@company.com"
            value={form.email}
            onChange={e => set('email', e.target.value)}
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={e => set('phone', e.target.value)}
          />

          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button
              type="button"
              onClick={() => { setStep(1); setError(''); }}
              style={{
                flex: '0 0 auto', padding: '13px 20px',
                border: '1.5px solid #E4ECF7', borderRadius: 60,
                background: '#fff', color: '#6B7280', fontSize: '0.88rem',
                fontWeight: 600, cursor: 'pointer', fontFamily: 'Syne, sans-serif',
                transition: 'border-color 0.18s, color 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#2352FF'; e.currentTarget.style.color = '#2352FF'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#E4ECF7'; e.currentTarget.style.color = '#6B7280'; }}
            >
              ← Back
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              style={{
                flex: 1, background: loading ? '#9AA5B4' : 'linear-gradient(135deg,#2352FF,#1a3fd4)',
                color: '#fff', border: 'none', borderRadius: 60,
                padding: '13px 24px', fontSize: '0.93rem', fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '-0.01em',
                boxShadow: loading ? 'none' : '0 4px 16px rgba(35,82,255,0.28)',
                fontFamily: 'Syne, sans-serif', transition: 'background 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(35,82,255,0.35)'; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = loading ? 'none' : '0 4px 16px rgba(35,82,255,0.28)'; }}
            >
              {loading ? 'Submitting…' : 'Book Free Strategy Call →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}