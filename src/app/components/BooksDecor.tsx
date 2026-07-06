/**
 * BooksDecor — editorial block shapes.
 * Pass animate=true to make each block float independently.
 */
interface BooksDecorProps {
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  animate?: boolean;
}

export function BooksDecor({ color = '#1c2814', className = '', style, animate = false }: BooksDecorProps) {
  const base = 295;

  const blocks = [
    { x: 8,   w: 17,  h: 145 },
    { x: 31,  w: 24,  h: 192 },
    { x: 130, w: 108, h: 258 },
    { x: 248, w: 36,  h: 172, tilt: -9 },
    { x: 295, w: 29,  h: 235 },
    { x: 331, w: 70,  h: 178 },
    { x: 410, w: 22,  h: 122 },
    { x: 439, w: 34,  h: 80  },
  ];

  const stripeX = 61, stripeH = 224, stripes = 16, sw = 2.5, sg = 2.6;

  return (
    <svg
      viewBox="0 0 490 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {animate && (
        <style>{`
          .bk { animation: bkFloat var(--d,3s) var(--dl,0s) infinite ease-in-out; }
          @keyframes bkFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(var(--lift,-6px))} }
        `}</style>
      )}

      {blocks.map((b, i) => {
        const y = base - b.h;
        const mid = b.x + b.w / 2;
        return (
          <rect
            key={i}
            x={b.x} y={y} width={b.w} height={b.h} rx="2"
            fill={color}
            transform={b.tilt ? `rotate(${b.tilt} ${mid} ${base})` : undefined}
            className={animate ? 'bk' : undefined}
            style={animate ? {
              '--d': `${2.4 + i * 0.22}s`,
              '--dl': `${i * 0.14}s`,
              '--lift': `${-(4 + (i % 4) * 2)}px`,
            } as React.CSSProperties : undefined}
          />
        );
      })}

      {/* Striped pages block */}
      {Array.from({ length: stripes }, (_, i) => (
        <rect
          key={`s${i}`}
          x={stripeX + i * (sw + sg)}
          y={base - stripeH}
          width={sw} height={stripeH}
          rx="0.5"
          fill={color}
          className={animate ? 'bk' : undefined}
          style={animate ? { '--d': '2.8s', '--dl': '0.1s', '--lift': '-5px' } as React.CSSProperties : undefined}
        />
      ))}

      <rect x="138" y={base - 258 - 32} width="24" height="28" rx="2" fill={color} opacity="0.5" />
      <rect x="412" y={base - 48} width="16" height="44" rx="1.5"
        fill="none" stroke={color} strokeWidth="1.5" opacity="0.35" />
    </svg>
  );
}
