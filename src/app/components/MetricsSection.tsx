import { CurvedLines } from './CurvedLines';

const STRIP = 1600;

const vizRows = [
  { segs: [{ x: 3,  w: 40, c: '#7aaa38' }, { x: 58, w: 38, c: '#7aaa38' }], dots: [44, 97],     speed: 16, rtl: false },
  { segs: [{ x: 0,  w: 52, c: '#c8906a' }, { x: 67, w: 28, c: '#7aaa38' }], dots: [53, 96],     speed: 20, rtl: true  },
  { segs: [{ x: 42, w: 56, c: '#d4aa58' }],                                  dots: [0, 41, 99],  speed: 14, rtl: false },
  { segs: [{ x: 0,  w: 48, c: '#c8906a' }],                                  dots: [49, 80, 99], speed: 23, rtl: true  },
];

interface VRow { segs: { x: number; w: number; c: string }[]; dots: number[]; speed: number; rtl: boolean; }

function VStrip({ segs, dots }: Pick<VRow, 'segs' | 'dots'>) {
  return (
    <div style={{ position: 'relative', width: STRIP, height: '100%', flexShrink: 0 }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, backgroundColor: 'rgba(28,40,20,0.12)' }} />
      {segs.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${s.x}%`, width: `${s.w}%`,
          height: 9, top: '50%', transform: 'translateY(-50%)',
          backgroundColor: s.c, borderRadius: 5, opacity: 0.8,
        }} />
      ))}
      {dots.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${p}%`, top: '50%',
          transform: 'translate(-50%,-50%)', width: 10, height: 10,
          borderRadius: '50%', backgroundColor: 'transparent',
          border: '1.5px solid rgba(28,40,20,0.4)', zIndex: 2,
        }} />
      ))}
    </div>
  );
}

function AnimatedVRow({ segs, dots, speed, rtl }: VRow) {
  return (
    <div style={{ height: 36, overflow: 'hidden', position: 'relative', marginBottom: 4 }}>
      <div style={{
        display: 'flex', height: '100%',
        animation: `${rtl ? 'mvRight' : 'mvLeft'} ${speed}s linear infinite`,
      }}>
        <VStrip segs={segs} dots={dots} />
        <VStrip segs={segs} dots={dots} />
      </div>
    </div>
  );
}

const features = [
  {
    icon: '⚡',
    title: 'FSRS Spaced Repetition',
    desc: 'Apex uses the Free Spaced Repetition Scheduler to calculate the exact moment each concept needs review — maximising retention with minimum study time.',
  },
  {
    icon: '🧠',
    title: 'Cognitive Load Tracking',
    desc: 'Every session is measured for mental effort. Apex redistributes heavy topics automatically so you never hit a wall mid-week.',
  },
  {
    icon: '📄',
    title: 'PDF → Concept Extraction',
    desc: 'Upload any lecture note or textbook. Apex reads it, identifies the core concepts, and builds a reviewable knowledge graph instantly.',
  },
  {
    icon: '📅',
    title: 'Deadline-Aware Scheduling',
    desc: 'Enter your exam dates and Apex reverse-engineers a revision plan that reaches full coverage with buffer time — never cramming again.',
  },
  {
    icon: '📊',
    title: 'Progress Analytics',
    desc: 'Confidence scores, retention curves, and grade trend forecasts — all updated after every session so you know exactly where you stand.',
  },
  {
    icon: '🔗',
    title: 'Concept Linking',
    desc: 'Related ideas across different subjects are automatically connected. See how calculus links to physics, or how history informs literature.',
  },
];

export function MetricsSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: '#f5f0e8', fontFamily: 'Inter, sans-serif' }}
    >
      <style>{`
        @keyframes mvLeft  { from{transform:translateX(0px)}         to{transform:translateX(-${STRIP}px)} }
        @keyframes mvRight { from{transform:translateX(-${STRIP}px)} to{transform:translateX(0px)} }
      `}</style>

      <CurvedLines direction="tr-bl" opacity={0.12} count={16} spacing={105} />

      <div
        className="max-w-7xl mx-auto px-6 pt-20 md:pt-28 pb-16 relative z-10"
        style={{ borderTop: '1px solid rgba(28,40,20,0.1)' }}
      >
        {/* Heading */}
        <div
          className="flex flex-col gap-4 pl-5 mb-14 text-center md:text-left items-center md:items-start"
          style={{ borderLeft: '2px solid rgba(28,40,20,0.3)' }}
        >
          <h2 style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 400, color: '#1c2814',
            lineHeight: 1.18, letterSpacing: '-0.015em',
          }}>
            Built for the<br />long road.
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(28,40,20,0.52)', lineHeight: 1.7, maxWidth: 560 }}>
            Quality learning is not a sprint. Apex is designed to grow with your ambition — not just your timetable.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 p-6 rounded-2xl"
              style={{
                backgroundColor: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(28,40,20,0.08)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <span style={{ fontSize: 22 }}>{f.icon}</span>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1c2814', lineHeight: 1.3 }}>
                {f.title}
              </h4>
              <p style={{ fontSize: 13, color: 'rgba(28,40,20,0.58)', lineHeight: 1.65 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Full-width animated viz rows */}
      <div className="relative z-10 w-full">
        <div className="w-full rounded-t-2xl overflow-hidden"
          style={{ backgroundColor: 'white', padding: '20px 0 0' }}>
          {vizRows.map((row, i) => <AnimatedVRow key={i} {...row} />)}
        </div>
      </div>
    </section>
  );
}
