import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { GanttPreview } from './GanttPreview';
import { CurvedLines } from './CurvedLines';

export function HeroSection() {
  return (
    <section
      className="relative flex flex-col overflow-hidden"
      style={{ backgroundColor: '#f5f0e8', minHeight: '100vh' }}
    >
      <CurvedLines direction="tl-br" opacity={0.11} count={14} spacing={108} />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 flex-1">
        <h1
          className="max-w-3xl"
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(42px, 7vw, 88px)',
            fontWeight: 400, lineHeight: 1.08,
            letterSpacing: '-0.02em', color: '#1c2814',
          }}
        >
          Manage the
          <br />
          business of learning.
        </h1>

        <p className="mt-6 max-w-sm md:max-w-md"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 400, color: 'rgba(28,40,20,0.55)', lineHeight: 1.6 }}>
          Apex is the agentic study platform for scheduling, cognitive load management, and applied learning
        </p>

        <Link
          to="/upload"
          className="mt-8 flex items-center gap-2 px-7 py-3 rounded-full text-sm no-underline transition-all hover:opacity-80"
          style={{ fontFamily: 'Inter, sans-serif', border: '1px solid rgba(28,40,20,0.3)', fontWeight: 500, color: '#1c2814' }}
        >
          Get started <ArrowRight size={14} />
        </Link>
      </div>

      <div className="relative z-10 w-full mt-auto">
        <div className="w-full pt-6" style={{ borderTop: '1px solid rgba(28,40,20,0.1)' }}>
          <GanttPreview />
        </div>
      </div>
    </section>
  );
}
