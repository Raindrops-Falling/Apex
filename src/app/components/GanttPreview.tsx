/*
 * Animated gantt preview on a light background.
 * Rows scroll left/right alternately, looping seamlessly.
 */

const STRIP = 1800;

const rows = [
  { segs: [{ x: 8,  w: 20, c: '#7aaa38' }, { x: 55, w: 16, c: '#7aaa38' }], dots: [7, 30, 54, 78], speed: 14, rtl: false },
  { segs: [{ x: 5,  w: 18, c: '#c8906a' }, { x: 60, w: 24, c: '#7aaa38' }], dots: [4, 24, 59, 86], speed: 19, rtl: true  },
  { segs: [{ x: 12, w: 22, c: '#c8906a' }, { x: 44, w: 20, c: '#c8906a' }], dots: [11, 35, 66],     speed: 13, rtl: false },
  { segs: [{ x: 18, w: 24, c: '#7aaa38' }],                                  dots: [3, 19, 43, 73, 90], speed: 22, rtl: true },
  { segs: [{ x: 10, w: 28, c: '#c8906a' }, { x: 58, w: 20, c: '#7aaa38' }], dots: [9, 40, 57, 83], speed: 16, rtl: false },
  { segs: [{ x: 25, w: 22, c: '#7aaa38' }],                                  dots: [6, 26, 49, 71, 93], speed: 25, rtl: true },
];

interface RowData { segs: { x: number; w: number; c: string }[]; dots: number[]; speed: number; rtl: boolean; }

function Strip({ segs, dots }: Pick<RowData, 'segs' | 'dots'>) {
  return (
    <div style={{ position: 'relative', width: STRIP, height: '100%', flexShrink: 0 }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, backgroundColor: 'rgba(28,40,20,0.1)' }} />
      {segs.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${s.x}%`, width: `${s.w}%`,
          height: 8, top: '50%', transform: 'translateY(-50%)',
          backgroundColor: s.c, borderRadius: 4, opacity: 0.8,
        }} />
      ))}
      {dots.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${p}%`, top: '50%',
          transform: 'translate(-50%,-50%)', width: 9, height: 9,
          borderRadius: '50%', backgroundColor: '#f5f0e8',
          border: '1.5px solid rgba(28,40,20,0.45)', zIndex: 2,
        }} />
      ))}
    </div>
  );
}

function AnimatedRow({ segs, dots, speed, rtl }: RowData) {
  return (
    <div style={{ height: 36, overflow: 'hidden', position: 'relative', marginBottom: 2 }}>
      <div style={{
        display: 'flex', height: '100%',
        animation: `${rtl ? 'apexScrollRight' : 'apexScrollLeft'} ${speed}s linear infinite`,
      }}>
        <Strip segs={segs} dots={dots} />
        <Strip segs={segs} dots={dots} />
      </div>
    </div>
  );
}

export function GanttPreview() {
  return (
    <div className="w-full px-6 md:px-12">
      <style>{`
        @keyframes apexScrollLeft  { from { transform: translateX(0px); }        to { transform: translateX(-${STRIP}px); } }
        @keyframes apexScrollRight { from { transform: translateX(-${STRIP}px); } to { transform: translateX(0px); } }
      `}</style>
      {rows.map((row, i) => <AnimatedRow key={i} {...row} />)}
    </div>
  );
}
