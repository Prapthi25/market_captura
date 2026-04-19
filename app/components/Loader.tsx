



'use client';

import { useEffect, useState } from 'react';

export default function Loader() {
  const [hidden,  setHidden]  = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return Math.min(p + Math.random() * 12, 100);
      });
    }, 80);

    const timer = setTimeout(() => setHidden(true), 2400);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, []);

  return (
    <>
      <div
        aria-hidden={hidden}
        style={{
          position:       'fixed',
          inset:          0,
          zIndex:         9999,
          background:     'linear-gradient(160deg,#EEF3FC 0%,#F5F8FF 50%,#EBF0FA 100%)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          flexDirection:  'column',
          gap:            24,
          transition:     'opacity 0.5s ease, visibility 0.5s ease',
          opacity:        hidden ? 0 : 1,
          visibility:     hidden ? 'hidden' : 'visible',
        }}
      >
        {/* Ambient blob */}
        <div style={{
          position:     'absolute',
          width:        400,
          height:       400,
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(35,82,255,0.09) 0%, transparent 70%)',
          top:          '50%',
          left:         '50%',
          transform:    'translate(-50%,-50%)',
        }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          {/* Logo pill */}
          <div style={{
            background:   '#fff',
            border:       '2px solid #E4ECF7',
            borderRadius: 60,
            padding:      '12px 28px',
            display:      'flex',
            alignItems:   'center',
            gap:          10,
            boxShadow:    '0 4px 20px rgba(35,82,255,0.10)',
            animation:    'mxLoaderPulse 2s ease-in-out infinite',
          }}>
            {/* M icon */}
            <div style={{
              width:          36,
              height:         36,
              borderRadius:   '50%',
              background:     'linear-gradient(135deg,#2352FF,#1a3fd4)',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              fontSize:       16,
              fontWeight:     800,
              color:          '#fff',
              fontFamily:     'Syne, sans-serif',
            }}>M</div>

            <span style={{
              fontFamily:    'Syne, sans-serif',
              fontWeight:    1000,
              fontSize:      '1.2rem',
              color:         '#0D1B3E',
              letterSpacing: '-0.02em',
            }}>
              Market<span style={{ color: '#2352FF' }}>Captura</span>
            </span>
          </div>

          {/* Progress bar track */}
          <div style={{
            width:        240,
            height:       4,
            borderRadius: 4,
            background:   '#E4ECF7',
            overflow:     'hidden',
          }}>
            <div style={{
              height:       '100%',
              borderRadius: 4,
              background:   'linear-gradient(90deg,#2352FF,#FF4F17)',
              width:        `${Math.min(percent, 100)}%`,
              transition:   'width 0.12s ease',
            }} />
          </div>

          {/* Tagline */}
          <p style={{
            fontSize:      '0.78rem',
            color:         '#9AA5B4',
            fontWeight:    500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Capturing markets digitally&hellip;
          </p>
        </div>
      </div>

      <style>{`
        @keyframes mxLoaderPulse {
          0%, 100% { transform: scale(1);    box-shadow: 0 4px 20px rgba(35,82,255,0.10); }
          50%       { transform: scale(1.03); box-shadow: 0 8px 32px rgba(35,82,255,0.18); }
        }
      `}</style>
    </>
  );
}