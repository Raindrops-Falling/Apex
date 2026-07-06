/**
 * RaceTrack — animated oval with:
 *  • stroke-dashoffset arc sweeping the outer ring
 *  • orbiting dots (dark + grey + faint)
 *  • phrase label that follows the main dot
 * All in monochrome (white/black/grey) — no coloured arcs.
 */

type RaceTrackProps = {
  label: string;
  phrase?: string;   // label attached to the main orbiting dot
};

/** Generate cx;cy SMIL keyframe strings around an ellipse */
function ellipseKF(cx: number, cy: number, rx: number, ry: number, n = 60, startF = 0) {
  const pts = Array.from({ length: n + 1 }, (_, i) => {
    const a = (i / n + startF) * 2 * Math.PI;
    return { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
  });
  return {
    cxK: pts.map(p => p.x.toFixed(2)).join(';'),
    cyK: pts.map(p => p.y.toFixed(2)).join(';'),
  };
}

/** Shift every value in a semicolon-separated keyframes string by `delta` */
function shiftKF(kf: string, delta: number) {
  return kf.split(';').map(v => (parseFloat(v) + delta).toFixed(2)).join(';');
}

/** Approximate ellipse perimeter (Ramanujan) */
function ellipsePerim(rx: number, ry: number) {
  const h = ((rx - ry) / (rx + ry)) ** 2;
  return Math.PI * (rx + ry) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
}

export function RaceTrack({ label, phrase }: RaceTrackProps) {
  const W = 260, H = 150;
  const rx = W / 2 - 20;
  const ry = H / 2 - 22;
  const cx = W / 2;
  const cy = H / 2;

  const dot1 = ellipseKF(cx, cy, rx, ry, 60, 0);        // main dot (dark)
  const dot2 = ellipseKF(cx, cy, rx, ry, 60, 0.5);       // opposite dot (mid-grey)
  const dot3 = ellipseKF(cx, cy, rx - 12, ry - 10, 60, 0.25); // inner faint dot

  const perim = ellipsePerim(rx, ry);
  const dashLen = 55;
  const gap = perim - dashLen;

  /* phrase label geometry */
  const phraseW = phrase ? Math.max(62, phrase.length * 5.5 + 10) : 0;
  const phraseXK = phrase ? shiftKF(dot1.cxK, -phraseW / 2) : '';
  const phraseRectYK = phrase ? shiftKF(dot1.cyK, -26) : '';
  const phraseTextYK = phrase ? shiftKF(dot1.cyK, -15) : '';

  const rings = [
    { rx: rx,      ry: ry,      sw: 1.2, op: 0.28 },
    { rx: rx - 12, ry: ry - 10, sw: 1.0, op: 0.18 },
    { rx: rx - 24, ry: ry - 20, sw: 0.8, op: 0.13 },
    { rx: rx + 12, ry: ry + 10, sw: 0.8, op: 0.10 },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" style={{ display: 'block' }}>

        {/* Track rings */}
        {rings.map((r, i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={r.rx} ry={r.ry}
            stroke={`rgba(28,40,20,${r.op})`} strokeWidth={r.sw} />
        ))}

        {/* Animated arc — sweeps outer ring, monochrome */}
        <ellipse
          cx={cx} cy={cy} rx={rx} ry={ry}
          stroke="rgba(28,40,20,0.55)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${dashLen} ${gap}`}
          strokeDashoffset="0"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to={`-${perim.toFixed(1)}`}
            dur="7s"
            repeatCount="indefinite"
            calcMode="linear"
          />
        </ellipse>

        {/* Second shorter arc on inner ring */}
        <ellipse
          cx={cx} cy={cy} rx={rx - 12} ry={ry - 10}
          stroke="rgba(28,40,20,0.2)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`30 ${ellipsePerim(rx - 12, ry - 10) - 30}`}
          strokeDashoffset="0"
        >
          <animate
            attributeName="stroke-dashoffset"
            from={`-${(ellipsePerim(rx - 12, ry - 10) * 0.3).toFixed(1)}`}
            to={`-${(ellipsePerim(rx - 12, ry - 10) * 1.3).toFixed(1)}`}
            dur="11s"
            repeatCount="indefinite"
            calcMode="linear"
          />
        </ellipse>

        {/* Orbiting dot 1 — dark (main) */}
        <circle r="5" fill="#1c2814" opacity="0.9">
          <animate attributeName="cx" values={dot1.cxK} dur="7s" repeatCount="indefinite" calcMode="linear" />
          <animate attributeName="cy" values={dot1.cyK} dur="7s" repeatCount="indefinite" calcMode="linear" />
        </circle>

        {/* Orbiting dot 2 — mid grey */}
        <circle r="3.5" fill="rgba(28,40,20,0.45)">
          <animate attributeName="cx" values={dot2.cxK} dur="7s" repeatCount="indefinite" calcMode="linear" />
          <animate attributeName="cy" values={dot2.cyK} dur="7s" repeatCount="indefinite" calcMode="linear" />
        </circle>

        {/* Orbiting dot 3 — faint inner */}
        <circle r="2.5" fill="rgba(28,40,20,0.22)">
          <animate attributeName="cx" values={dot3.cxK} dur="11s" repeatCount="indefinite" calcMode="linear" />
          <animate attributeName="cy" values={dot3.cyK} dur="11s" repeatCount="indefinite" calcMode="linear" />
        </circle>

        {/* Phrase label — follows dot1 */}
        {phrase && (
          <g>
            {/* Pill background */}
            <rect width={phraseW} height={14} rx="4" fill="white" opacity="0.88"
              style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}>
              <animate attributeName="x" values={phraseXK} dur="7s" repeatCount="indefinite" calcMode="linear" />
              <animate attributeName="y" values={phraseRectYK} dur="7s" repeatCount="indefinite" calcMode="linear" />
            </rect>
            {/* Text */}
            <text fontSize="8" fontFamily="Inter, sans-serif" fill="#1c2814"
              textAnchor="middle" fontWeight="600">
              {phrase}
              <animate attributeName="x" values={dot1.cxK} dur="7s" repeatCount="indefinite" calcMode="linear" />
              <animate attributeName="y" values={phraseTextYK} dur="7s" repeatCount="indefinite" calcMode="linear" />
            </text>
          </g>
        )}

        {/* Center label */}
        <text x={cx} y={cy + 5} textAnchor="middle" fontSize="13"
          fontWeight="500" fill="#1c2814" fontFamily="Inter, sans-serif">
          {label}
        </text>
      </svg>
    </div>
  );
}
