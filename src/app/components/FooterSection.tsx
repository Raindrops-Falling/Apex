import { ArrowRight } from 'lucide-react';

function HalftonePattern() {
  const points: { x: number; y: number; r: number }[] = [];
  const rings = 16;
  for (let ring = 1; ring <= rings; ring++) {
    const radius = ring * 22;
    const count = Math.round(ring * 4.5);
    const dotSize = Math.min(0.7 + ring * 0.22, 4.5);
    for (let i = 0; i < count; i++) {
      const angle = (i / (count - 1)) * Math.PI * 0.9;
      const x = 320 + radius * Math.cos(Math.PI - angle);
      const y = 320 - radius * Math.sin(angle);
      if (x >= 0 && x <= 640 && y >= 0 && y <= 340) {
        points.push({ x, y, r: dotSize });
      }
    }
  }
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 640 340"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="#1c2814" opacity="0.1" />
      ))}
    </svg>
  );
}

const ApexLogoMark = () => (
  <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
    <rect x="0"  y="13" width="6" height="9"  rx="1.5" fill="#1c2814" opacity="0.9" />
    <rect x="11" y="7"  width="6" height="15" rx="1.5" fill="#1c2814" opacity="0.9" />
    <rect x="22" y="1"  width="6" height="21" rx="1.5" fill="#1c2814" opacity="0.9" />
  </svg>
);

const links = {
  Menu:    ['Students', 'Educators', 'Institutions'],
  Company: ['About', 'Help', 'Security'],
  Social:  ['X', 'LinkedIn'],
};

export function FooterSection() {
  return (
    <footer style={{ backgroundColor: '#ede8d4', fontFamily: 'Inter, sans-serif' }}>
      {/* CTA zone */}
      <div className="relative overflow-hidden">
        <HalftonePattern />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-14 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(26px, 3.5vw, 42px)',
              fontWeight: 400,
              color: '#1a2010',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              maxWidth: 520,
            }}
          >
            We know the curriculum.
            <br />
            You know the goal.
          </h2>
          <div className="shrink-0 sm:pt-2">
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: '#1c2814', color: '#ede8d4', fontWeight: 500, whiteSpace: 'nowrap' }}
            >
              Get started <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div style={{ height: 1, backgroundColor: 'rgba(28,40,20,0.1)' }} />
      </div>

      {/* Links zone */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-start gap-10 md:gap-0">
        <div className="md:w-1/3 flex items-center gap-2.5 shrink-0">
          <ApexLogoMark />
          <span style={{ fontSize: 15, fontWeight: 600, color: '#1c2814', letterSpacing: '-0.01em' }}>apex</span>
        </div>

        <div className="flex flex-wrap gap-10 md:gap-0 md:flex-1 md:justify-end">
          {(Object.entries(links) as [string, string[]][]).map(([col, items]) => (
            <div key={col} className="min-w-[100px] md:w-1/3">
              <p className="mb-4" style={{ fontSize: 12, fontWeight: 500, color: '#8a7a58', letterSpacing: '0.05em' }}>
                {col}
              </p>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:opacity-70 transition-opacity" style={{ fontSize: 14, color: '#1a2010' }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        style={{ borderTop: '1px solid rgba(28,40,20,0.07)' }}
      >
        <div className="flex items-center gap-4">
          {['Terms', 'Privacy', 'Cookies'].map((item) => (
            <a key={item} href="#" style={{ fontSize: 12, color: '#8a7a58' }} className="hover:opacity-70 transition-opacity">
              {item}
            </a>
          ))}
        </div>
        <p style={{ fontSize: 12, color: '#8a7a58' }}>© 2026 Apex Inc. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
