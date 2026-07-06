import { ArrowRight } from 'lucide-react';
import { CurvedLines } from './CurvedLines';

export function CTASection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#f5f0e8', minHeight: '100vh' }}
    >
      {/* bottom-right to top-left — opposite of hero */}
      <CurvedLines direction="br-tl" opacity={0.12} count={15} spacing={108} />

      <div className="relative z-10 flex flex-col items-center text-center px-6 py-24 w-full max-w-4xl mx-auto">
        <p className="mb-8 tracking-widest uppercase"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: 'rgba(28,40,20,0.42)', letterSpacing: '0.18em' }}>
          Get started today
        </p>

        <h1 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(40px, 7vw, 84px)',
          lineHeight: 1.08, letterSpacing: '-0.02em', color: '#1c2814',
          width: '100%',
        }}>
          <span style={{ fontWeight: 300 }}>Make every </span>
          <span style={{ fontWeight: 700 }}>study</span>
          <br />
          <span style={{ fontWeight: 300 }}>hour count.</span>
        </h1>

        <p className="mt-7 w-full max-w-md"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 400, color: 'rgba(28,40,20,0.5)', lineHeight: 1.65 }}>
          Automate scheduling and reduce the cognitive load that derails deep learning
        </p>

        <button
          className="mt-9 flex items-center gap-2 px-7 py-3 rounded-full text-sm transition-all"
          style={{ fontFamily: 'Inter, sans-serif', border: '1px solid rgba(28,40,20,0.3)', fontWeight: 500, color: '#1c2814' }}
        >
          Get started <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}
