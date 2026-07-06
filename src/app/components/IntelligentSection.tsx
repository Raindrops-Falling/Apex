import { RaceTrack } from './RaceTrack';
import { CurvedLines } from './CurvedLines';

export function IntelligentSection() {
  return (
    <section
      className="overflow-hidden"
      style={{ backgroundColor: '#f5f0e8', fontFamily: 'Inter, sans-serif', position: 'relative' }}
    >
      <CurvedLines direction="br-tl" opacity={0.1} count={14} spacing={110} />

      <div
        className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10"
        style={{ borderTop: '1px solid rgba(28,40,20,0.1)' }}
      >
        <h2
          className="mb-16 md:mb-20 text-center md:text-left"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(26px, 3.5vw, 44px)',
            fontWeight: 700,
            color: '#1a2010',
            lineHeight: 1.2,
            letterSpacing: '-0.015em',
          }}
        >
          The intelligent management
          <br />
          system for applied learning
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-6 lg:gap-12">
          <RaceTrack label="Focus"    phrase="Missed revision" />
          <RaceTrack label="Schedule" phrase="Exam clash" />
          <RaceTrack label="Progress" phrase="Burnout risk" />
        </div>
      </div>
    </section>
  );
}
