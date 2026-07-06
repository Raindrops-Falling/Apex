/**
 * CurvedLines — alternates between straight diagonal lines and gentle
 * bezier curves so the background feels organic rather than ruled.
 */
export type LineDir = 'tr-bl' | 'tl-br' | 'bl-tr' | 'br-tl';

interface CurvedLinesProps {
  direction?: LineDir;
  opacity?: number;
  stroke?: string;
  count?: number;
  spacing?: number;
  className?: string;
}

/**
 * For a given direction and parallel offset `o`, return either a straight
 * line or a bezier curve (alternated by index `i`).
 */
function makePath(dir: LineDir, o: number, i: number): string {
  const W = 1440, H = 950;
  const curved = i % 3 !== 0; // every 3rd line is straight, rest curved

  // Endpoint pairs for each direction
  type Pt = [number, number];
  let p1: Pt, p2: Pt;
  switch (dir) {
    case 'tr-bl': p1 = [W + o, -50];       p2 = [o,       H + 50]; break;
    case 'tl-br': p1 = [o - 150, -50];     p2 = [o + W - 150, H + 50]; break;
    case 'bl-tr': p1 = [o - 50,  H + 50];  p2 = [o + W - 50, -50]; break;
    case 'br-tl': p1 = [W + o + 50, H + 50]; p2 = [o - 200, -50]; break;
  }

  if (!curved) {
    return `M ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]}`;
  }

  // Control points offset perpendicular to the line direction
  // Alternate bulge direction by line index
  const bulge = (i % 6 < 3 ? 1 : -1) * (80 + (i % 4) * 30);
  const midX = (p1[0] + p2[0]) / 2;
  const midY = (p1[1] + p2[1]) / 2;

  // Perpendicular to each direction
  let px = 0, py = 0;
  switch (dir) {
    case 'tr-bl': case 'bl-tr': px = bulge; py = 0; break;
    case 'tl-br': case 'br-tl': px = 0; py = bulge; break;
  }

  const cp1x = p1[0] * 0.3 + midX * 0.7 + px * 0.6;
  const cp1y = p1[1] * 0.3 + midY * 0.7 + py * 0.6;
  const cp2x = p2[0] * 0.3 + midX * 0.7 - px * 0.6;
  const cp2y = p2[1] * 0.3 + midY * 0.7 - py * 0.6;

  return `M ${p1[0]} ${p1[1]} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2[0]} ${p2[1]}`;
}

export function CurvedLines({
  direction = 'tr-bl',
  opacity = 0.13,
  stroke = '#1c2814',
  count = 15,
  spacing = 105,
  className = '',
}: CurvedLinesProps) {
  const paths = Array.from({ length: count }, (_, idx) => {
    const i = idx - 3;
    return { d: makePath(direction, i * spacing, idx), sw: idx % 4 === 0 ? 1.1 : 0.7 };
  });

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox="0 0 1440 950"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      style={{ opacity }}
    >
      {paths.map((p, i) => (
        <path key={i} d={p.d} stroke={stroke} strokeWidth={p.sw} />
      ))}
    </svg>
  );
}
