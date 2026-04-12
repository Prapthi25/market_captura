



'use client';

const ITEMS = [
  'Social Media Marketing',
  'Paid Advertising',
  'Brand Identity',
  'Content Creation',
  'Digital Strategy',
  'Web Design & Dev',
  'AI Growth Systems',
  'Performance Analytics',
  'SEO & SEM',
  'Email Marketing',
];

export default function MarqueeStrip() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      style={{
        borderTop:    '1.5px solid #E4ECF7',
        borderBottom: '1.5px solid #E4ECF7',
        background:   '#fff',
        overflow:     'hidden',
        padding:      '15px 0',
        position:     'relative',
        zIndex:       2,
      }}
    >
      {/* Left fade */}
      <div style={{
        position:   'absolute', left: 0, top: 0, bottom: 0, width: 120,
        background: 'linear-gradient(to right, #fff, transparent)', zIndex: 1,
        pointerEvents: 'none',
      }} />
      {/* Right fade */}
      <div style={{
        position:   'absolute', right: 0, top: 0, bottom: 0, width: 120,
        background: 'linear-gradient(to left, #fff, transparent)', zIndex: 1,
        pointerEvents: 'none',
      }} />

      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           12,
              paddingRight:  44,
              fontSize:      '0.78rem',
              fontWeight:    600,
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              color:         i % 4 === 0 ? '#2352FF' : '#9AA5B4',
              whiteSpace:    'nowrap',
            }}
          >
            <span style={{
              width:        5,
              height:        5,
              borderRadius: '50%',
              background:   i % 4 === 0 ? '#2352FF' : '#D1DCF0',
              flexShrink:   0,
              display:      'inline-block',
            }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}