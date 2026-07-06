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

// ── Force graph data ──────────────────────────────────────────────────────
interface Node { id: string; label: string; r: number; color: string; x: number; y: number; vx: number; vy: number; }
interface Edge { source: string; target: string; }

const initialNodes: Omit<Node, 'vx' | 'vy'>[] = [
  { id: 'bio',   label: 'Biology 301',    r: 22, color: '#7aaa38', x: 200, y: 120 },
  { id: 'chem',  label: 'Chemistry',      r: 18, color: '#c8906a', x: 380, y: 80  },
  { id: 'math',  label: 'Math Analysis',  r: 20, color: '#7aaa38', x: 520, y: 160 },
  { id: 'phys',  label: 'Physics',        r: 16, color: '#d4aa58', x: 320, y: 220 },
  { id: 'cs',    label: 'CS Algorithms',  r: 19, color: '#7aaa38', x: 160, y: 260 },
  { id: 'hist',  label: 'History',        r: 14, color: '#c8906a', x: 460, y: 280 },
  { id: 'lit',   label: 'Lit Review',     r: 13, color: '#d4aa58', x: 90,  y: 180 },
  { id: 'stats', label: 'Statistics',     r: 17, color: '#7aaa38', x: 600, y: 230 },
];

const edges: Edge[] = [
  { source: 'bio',  target: 'chem'  },
  { source: 'bio',  target: 'phys'  },
  { source: 'chem', target: 'math'  },
  { source: 'math', target: 'stats' },
  { source: 'math', target: 'phys'  },
  { source: 'cs',   target: 'math'  },
  { source: 'cs',   target: 'stats' },
  { source: 'phys', target: 'hist'  },
  { source: 'bio',  target: 'lit'   },
  { source: 'hist', target: 'lit'   },
];

function useForceGraph(W: number, H: number) {
  const [nodes, setNodes] = useState<Node[]>(() =>
    initialNodes.map(n => ({ ...n, vx: 0, vy: 0 }))
  );
  const frameRef = useRef<number>(0);

  useEffect(() => {
    let ns = nodes.map(n => ({ ...n }));

    const tick = () => {
      const k = 0.006; // spring constant
      const repulsion = 2800;
      const damping = 0.82;
      const centerStrength = 0.012;

      // Clone for mutation
      const next = ns.map(n => ({ ...n }));

      // Repulsion between every pair
      for (let i = 0; i < next.length; i++) {
        for (let j = i + 1; j < next.length; j++) {
          const dx = next[j].x - next[i].x;
          const dy = next[j].y - next[i].y;
          const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
          const force = repulsion / (dist * dist);
          next[i].vx -= (dx / dist) * force;
          next[i].vy -= (dy / dist) * force;
          next[j].vx += (dx / dist) * force;
          next[j].vy += (dy / dist) * force;
        }
      }

      // Spring attraction along edges
      edges.forEach(e => {
        const s = next.find(n => n.id === e.source)!;
        const t = next.find(n => n.id === e.target)!;
        const dx = t.x - s.x, dy = t.y - s.y;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        const target = 130;
        const force = (dist - target) * k;
        s.vx += (dx / dist) * force;
        s.vy += (dy / dist) * force;
        t.vx -= (dx / dist) * force;
        t.vy -= (dy / dist) * force;
      });

      // Gravity toward center
      next.forEach(n => {
        n.vx += (W / 2 - n.x) * centerStrength;
        n.vy += (H / 2 - n.y) * centerStrength;
        n.vx *= damping;
        n.vy *= damping;
        n.x = Math.max(n.r + 4, Math.min(W - n.r - 4, n.x + n.vx));
        n.y = Math.max(n.r + 4, Math.min(H - n.r - 4, n.y + n.vy));
      });

      ns = next;
      setNodes(next.map(n => ({ ...n })));
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [W, H]);

  return nodes;
}

function ForceGraph() {
  const W = 700, H = 320;
  const nodes = useForceGraph(W, H);
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      style={{ display: 'block', height: H }}
    >
      {/* Edges */}
      {edges.map((e, i) => {
        const s = nodeMap[e.source], t = nodeMap[e.target];
        if (!s || !t) return null;
        return (
          <line
            key={i}
            x1={s.x} y1={s.y} x2={t.x} y2={t.y}
            stroke="rgba(28,40,20,0.18)"
            strokeWidth="1"
          />
        );
      })}

      {/* Nodes */}
      {nodes.map(n => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} opacity="0.85" />
          <text
            x={n.x} y={n.y + 4}
            textAnchor="middle"
            fontSize="7.5"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
            fill="white"
          >
            {n.label.split(' ')[0]}
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
      {/* ── Top: force graph (full width) ─────────────────────────── */}
      <div
        className="w-full px-4 md:px-10 pt-10 pb-4"
        style={{ borderTop: '1px solid rgba(28,40,20,0.08)', backgroundColor: '#faf8f4' }}
      >
        <ForceGraph />
      </div>

      {/* ── Bottom: full-width text + tabs ────────────────────────── */}
      <div className="w-full px-8 md:px-14 py-12 md:py-16">
        {/* Tabs */}
        <div className="flex items-center gap-6 mb-8">
          {TABS.map((tab) => {
            const isActive = tab === active;
            return (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className="flex items-center gap-1.5 text-xs transition-colors"
                style={{
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: isActive ? '#1c2814' : 'rgba(28,40,20,0.35)',
                  paddingBottom: '3px',
                  borderBottom: isActive ? '1.5px solid #1c2814' : '1.5px solid transparent',
                }}
              >
                {isActive && (
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: '#7aaa38' }} />
                )}
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
              fontWeight: 400,
              color: '#1c2814',
              lineHeight: 1.2,
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
