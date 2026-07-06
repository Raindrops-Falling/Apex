import { ArrowRight } from 'lucide-react';
import { DashboardCard } from './DashboardCard';
import { CurvedLines } from './CurvedLines';

const CircleCheck = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="8" stroke="#6a9830" strokeWidth="1.4" fill="none" />
    <circle cx="9" cy="9" r="2.5" fill="#6a9830" />
  </svg>
);

const features = [
  {
    title: 'Smart Scheduling',
    desc: 'Build a centralized study plan across courses, topics, and revision goals — automatically balanced around your cognitive load and energy levels.',
  },
  {
    title: 'Adaptive Review Intervals',
    desc: 'Apex continuously adjusts when you revisit each concept using FSRS, so the hardest material gets the most attention without burning out.',
  },
  {
    title: 'Cross-Subject Linking',
    desc: 'Concepts that appear across multiple courses are automatically connected — understand calculus once and watch it click in physics and econ.',
  },
  {
    title: 'Session-Level Planning',
    desc: 'Each study session is pre-planned with a mix of new content and review, sized to the time you have — even if you have 20 minutes.',
  },
];

const stats = [
  { value: '3×', label: 'better long-term retention' },
  { value: '40%', label: 'less time wasted reviewing' },
  { value: '50K+', label: 'learners using Apex daily' },
];

export function AlignSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: '#ffffff', fontFamily: 'Inter, sans-serif' }}
    >
      <CurvedLines direction="bl-tr" opacity={0.09} count={14} spacing={108} />

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10">

        {/* Top grid: heading + dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start mb-20">
          <div className="flex flex-col gap-8 items-center md:items-start text-center md:text-left">
            <h2 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 800, color: '#1a2010',
              lineHeight: 1.1, letterSpacing: '-0.02em',
            }}>
              Align your
              <br />
              studying from
              <br />
              session to semester
            </h2>

            <p style={{ fontSize: 15, color: 'rgba(28,40,20,0.58)', lineHeight: 1.7, maxWidth: 360 }}>
              Apex connects your day-to-day study sessions to your long-term academic goals,
              so every hour you spend is an hour that compounds.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <span style={{ fontFamily: '"Playfair Display", serif', fontSize: 28, fontWeight: 600, color: '#1c2814', lineHeight: 1 }}>
                    {s.value}
                  </span>
                  <span style={{ fontSize: 12, color: 'rgba(28,40,20,0.5)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end w-full">
            <DashboardCard />
          </div>
        </div>

        {/* Feature list */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-px"
          style={{ border: '1px solid rgba(28,40,20,0.1)', borderRadius: 16, overflow: 'hidden', backgroundColor: 'rgba(28,40,20,0.1)' }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 p-8"
              style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#faf8f4' }}
            >
              <div className="flex items-center gap-2">
                <CircleCheck />
                <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1c2814' }}>{f.title}</h4>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(28,40,20,0.58)', lineHeight: 1.65, maxWidth: 340 }}>
                {f.desc}
              </p>
              <button className="flex items-center gap-1 mt-1 self-start"
                style={{ fontSize: 13, fontWeight: 500, color: '#6a9830' }}>
                Learn more <ArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
