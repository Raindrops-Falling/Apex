import { useState, useEffect, useRef } from 'react';

const TABS = ['COURSES', 'SESSIONS', 'PROGRESS'] as const;
type Tab = (typeof TABS)[number];

const content: Record<Tab, { title: string; desc: string }> = {
  COURSES: {
    title: 'Smart Course Management',
    desc: 'See every course, deadline, and topic in one place. Apex maps your full curriculum so nothing slips through the gaps — from weekly lectures to end-of-term exams.',
  },
  SESSIONS: {
    title: 'Optimised Study Sessions',
    desc: 'Apex schedules your sessions using spaced repetition and cognitive load science, automatically spacing reviews at the moment your retention needs reinforcing.',
  },
  PROGRESS: {
    title: 'Real-Time Progress Tracking',
    desc: 'Connect effort to outcomes. Track completion, confidence scores, and grade trends across every subject — and get instant clarity on where your next hour should go.',
  },
};

// ── Force graph ───────────────────────────────────────────────────────────
interface SimNode { id: string; label: string; r: number; color: string; x: number; y: number; vx: number; vy: number; }
interface Edge { source: string; target: string; }

const NODES: SimNode[] = [
  { id: 'bio',   label: 'Biology',    r: 22, color: '#7aaa38', x: 200, y: 120, vx: 0.4,  vy: -0.3 },
  { id: 'chem',  label: 'Chemistry',  r: 18, color: '#c8906a', x: 420, y: 80,  vx: -0.2, vy: 0.4  },
  { id: 'math',  label: 'Math',       r: 21, color: '#7aaa38', x: 560, y: 170, vx: 0.3,  vy: 0.2  },
  { id: 'phys',  label: 'Physics',    r: 16, color: '#d4aa58', x: 330, y: 230, vx: -0.4, vy: -0.1 },
  { id: 'cs',    label: 'CS',         r: 20, color: '#7aaa38', x: 140, y: 260, vx: 0.2,  vy: 0.3  },
  { id: 'hist',  label: 'History',    r: 14, color: '#c8906a', x: 480, y: 270, vx: 0.1,  vy: -0.4 },
  { id: 'stats', label: 'Statistics', r: 17, color: '#7aaa38', x: 620, y: 230, vx: -0.3, vy: 0.2  },
];

const EDGES: Edge[] = [
  { source: 'bio',  target: 'chem'  },
  { source: 'bio',  target: 'phys'  },
  { source: 'chem', target: 'math'  },
  { source: 'math', target: 'stats' },
  { source: 'math', target: 'phys'  },
  { source: 'cs',   target: 'math'  },
  { source: 'cs',   target: 'stats' },
  { source: 'phys', target: 'hist'  },
];

const W = 700, H = 300;

function ForceGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  // Physics state lives entirely in a ref — never touches React state
  const sim = useRef<SimNode[]>(NODES.map(n => ({ ...n })));

  useEffect(() => {
    let raf: number;

    const tick = () => {
      const ns = sim.current;

      // Repulsion between all pairs
      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const dx = ns[j].x - ns[i].x;
          const dy = ns[j].y - ns[i].y;
          const distSq = Math.max(dx * dx + dy * dy, 1);
          const dist = Math.sqrt(distSq);
          const force = 3800 / distSq;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          ns[i].vx -= fx; ns[i].vy -= fy;
          ns[j].vx += fx; ns[j].vy += fy;
        }
      }

      // Edge spring attraction
      EDGES.forEach(e => {
        const s = ns.find(n => n.id === e.source)!;
        const t = ns.find(n => n.id === e.target)!;
        const dx = t.x - s.x, dy = t.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const restLen = 140;
        const force = (dist - restLen) * 0.007;
        const fx = (dx / dist) * force, fy = (dy / dist) * force;
        s.vx += fx; s.vy += fy;
        t.vx -= fx; t.vy -= fy;
      });

      // Center gravity + thermal noise + damping + boundary
      ns.forEach(n => {
        n.vx += (W / 2 - n.x) * 0.008;
        n.vy += (H / 2 - n.y) * 0.008;
        // Persistent thermal noise keeps nodes in perpetual gentle motion
        n.vx += (Math.random() - 0.5) * 0.55;
        n.vy += (Math.random() - 0.5) * 0.55;
        n.vx *= 0.88;
        n.vy *= 0.88;
        n.x = Math.max(n.r + 6, Math.min(W - n.r - 6, n.x + n.vx));
        n.y = Math.max(n.r + 6, Math.min(H - n.r - 6, n.y + n.vy));
      });

      // Imperatively update SVG DOM — zero React reconciliation overhead
      const svg = svgRef.current;
      if (svg) {
        ns.forEach(n => {
          const c = svg.querySelector<SVGCircleElement>(`[data-id="${n.id}"]`);
          const t = svg.querySelector<SVGTextElement>(`[data-label="${n.id}"]`);
          if (c) { c.setAttribute('cx', n.x.toFixed(1)); c.setAttribute('cy', n.y.toFixed(1)); }
          if (t) { t.setAttribute('x', n.x.toFixed(1)); t.setAttribute('y', (n.y + 4).toFixed(1)); }
        });
        EDGES.forEach((e, i) => {
          const line = svg.querySelector<SVGLineElement>(`[data-edge="${i}"]`);
          const s = ns.find(n => n.id === e.source);
          const t = ns.find(n => n.id === e.target);
          if (line && s && t) {
            line.setAttribute('x1', s.x.toFixed(1)); line.setAttribute('y1', s.y.toFixed(1));
            line.setAttribute('x2', t.x.toFixed(1)); line.setAttribute('y2', t.y.toFixed(1));
          }
        });
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      style={{ display: 'block', height: H }}
    >
      {/* Edges — initial positions, updated via DOM ref */}
      {EDGES.map((e, i) => {
        const s = NODES.find(n => n.id === e.source)!;
        const t = NODES.find(n => n.id === e.target)!;
        return (
          <line key={i} data-edge={String(i)}
            x1={s.x} y1={s.y} x2={t.x} y2={t.y}
            stroke="rgba(28,40,20,0.2)" strokeWidth="1.2" />
        );
      })}

      {/* Nodes — initial positions, updated via DOM ref */}
      {NODES.map(n => (
        <g key={n.id}>
          <circle data-id={n.id} cx={n.x} cy={n.y} r={n.r} fill={n.color} opacity="0.88" />
          <text data-label={n.id} x={n.x} y={n.y + 4}
            textAnchor="middle" fontSize="8" fontFamily="Inter, sans-serif"
            fontWeight="700" fill="white" style={{ pointerEvents: 'none', userSelect: 'none' }}>
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function GallerySection() {
  const [active, setActive] = useState<Tab>('COURSES');

  return (
    <section
      className="overflow-hidden"
      style={{ backgroundColor: '#ffffff', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Full-width force graph */}
      <div
        className="w-full px-4 md:px-10 pt-10 pb-4"
        style={{ borderTop: '1px solid rgba(28,40,20,0.08)', backgroundColor: '#faf8f4' }}
      >
        <ForceGraph />
      </div>

      {/* Tabs + full-width content */}
      <div className="w-full px-8 md:px-14 py-12 md:py-16">
        <div className="flex items-center gap-6 mb-8">
          {TABS.map(tab => {
            const isActive = tab === active;
            return (
              <button key={tab} onClick={() => setActive(tab)}
                className="flex items-center gap-1.5 text-xs transition-colors"
                style={{
                  fontWeight: 600, letterSpacing: '0.1em',
                  color: isActive ? '#1c2814' : 'rgba(28,40,20,0.35)',
                  paddingBottom: '3px',
                  borderBottom: isActive ? '1.5px solid #1c2814' : '1.5px solid transparent',
                }}>
                {isActive && <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: '#7aaa38' }} />}
                {tab}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start">
          <h3
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(24px, 3.5vw, 40px)',
              fontWeight: 400, color: '#1c2814', lineHeight: 1.2,
            }}
          >
            {content[active].title}
          </h3>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(28,40,20,0.6)', maxWidth: 520 }}>
            {content[active].desc}
          </p>
        </div>
      </div>
    </section>
  );
}
