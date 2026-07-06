const CheckCircle = ({ color = '#6a9830' }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="8.5" stroke={color} strokeWidth="1.2" fill="none" />
    <path d="M5.5 9L8 11.5L12.5 7" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="11" r="5.5" stroke="#c8a955" strokeWidth="1.3" fill="none" />
    <path d="M6.5 5L9 2L11.5 5" stroke="#c8a955" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <line x1="7" y1="5" x2="9" y2="5.5" stroke="#c8a955" strokeWidth="1.1" />
    <line x1="11" y1="5" x2="9" y2="5.5" stroke="#c8a955" strokeWidth="1.1" />
    <text x="9" y="13" textAnchor="middle" fontSize="6" fill="#c8a955" fontFamily="Inter, sans-serif" fontWeight="700">★</text>
  </svg>
);

type TagColor = 'blue' | 'amber' | 'purple';

const Tag = ({ label, color = 'blue' }: { label: string; color?: TagColor }) => {
  const colors: Record<TagColor, { bg: string; text: string }> = {
    blue:   { bg: '#dbeafe', text: '#1e40af' },
    amber:  { bg: '#fef3c7', text: '#92400e' },
    purple: { bg: '#ede9fe', text: '#5b21b6' },
  };
  const c = colors[color];
  return (
    <span
      className="inline-block rounded uppercase"
      style={{
        backgroundColor: c.bg,
        color: c.text,
        fontSize: '9px',
        fontWeight: 600,
        padding: '1px 5px',
        letterSpacing: '0.04em',
      }}
    >
      {label}
    </span>
  );
};

const tasks = [
  {
    icon: <CheckCircle />,
    name: 'Chapters 1–4 Review',
    badge: '3',
    tag: 'MIDTERM PREP' as const,
    tagColor: 'blue' as TagColor,
    dates: 'Sep 2 – Sep 15, 2024',
    duration: '13d',
    cost: '45 pages',
  },
  {
    icon: <CheckCircle />,
    name: 'Lab Report #1',
    badge: null,
    tag: 'LAB WORK' as const,
    tagColor: 'purple' as TagColor,
    dates: 'Sep 16 – Sep 22, 2024',
    duration: '7d',
    cost: '8 pages',
  },
  {
    icon: <CheckCircle />,
    name: 'Midterm Exam Prep',
    badge: null,
    tag: 'MIDTERM PREP' as const,
    tagColor: 'blue' as TagColor,
    dates: 'Oct 1 – Oct 14, 2024',
    duration: '14d',
    cost: '3 practice tests',
  },
  {
    icon: <CheckCircle />,
    name: 'Group Research Project',
    badge: null,
    tag: 'COURSEWORK' as const,
    tagColor: 'amber' as TagColor,
    dates: 'Oct 15 – Nov 10, 2024',
    duration: '26d',
    cost: '4 contributors',
  },
];

const MilestoneRow = () => (
  <div className="flex flex-col py-3" style={{ borderBottom: '1px solid #f0f0f0' }}>
    <div className="flex items-center gap-3 w-full px-3">
      <div className="shrink-0">
        <StarIcon />
      </div>
      <div>
        <div className="font-semibold" style={{ fontSize: '12px', color: '#1a2e25' }}>
          Final Exam Milestone
        </div>
        <div style={{ fontSize: '10px', color: '#888', marginTop: '1px' }}>NOV 20 2024, WED</div>
      </div>
    </div>
  </div>
);

const LastRow = () => (
  <div className="flex flex-col py-2.5 px-3">
    <div className="flex items-start gap-3">
      <div className="shrink-0 pt-0.5">
        <CheckCircle color="#6a9830" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold" style={{ fontSize: '12px', color: '#1a2e25' }}>
            Essay Submission
          </span>
          <Tag label="ASSESSMENT" color="amber" />
        </div>
        <div className="flex items-center gap-2 flex-wrap mt-0.5" style={{ fontSize: '10px', color: '#888' }}>
          <span>Nov 25 – Dec 5, 2024</span>
          <span className="px-1.5 rounded" style={{ backgroundColor: '#f0f0f0', color: '#555' }}>10d</span>
        </div>
        <div style={{ fontSize: '10px', color: '#888', marginTop: '1px' }}>3,500 words</div>
      </div>
    </div>
  </div>
);

export function DashboardCard() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden shadow-xl"
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e8e8e8',
        fontFamily: 'Inter, sans-serif',
        maxWidth: '520px',
      }}
    >
      {/* Card header */}
      <div className="px-4 py-3 flex items-center gap-2" style={{ borderBottom: '1px solid #f0f0f0' }}>
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ff5f57' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#febc2e' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#28c840' }} />
        </div>
        <span className="ml-2" style={{ fontSize: '12px', fontWeight: 600, color: '#1a2e25' }}>
          Biology 301 — Fall Semester
        </span>
        <span
          className="ml-1 rounded"
          style={{ fontSize: '9px', color: '#64748b', backgroundColor: '#f1f5f9', padding: '1px 5px' }}
        >
          CORE SCIENCE
        </span>
      </div>

      <div className="flex" style={{ minHeight: '320px' }}>
        {/* Left panel — schedule graph */}
        <div
          className="shrink-0 flex flex-col items-center justify-center p-4"
          style={{ width: '140px', borderRight: '1px solid #f0f0f0', backgroundColor: '#fafafa' }}
        >
          <svg width="110" height="200" viewBox="0 0 110 200" fill="none">
            <line x1="55" y1="20" x2="55" y2="180" stroke="#e2e8e2" strokeWidth="1.5" />
            <circle cx="55" cy="30"  r="5" fill="#6a9830" stroke="white" strokeWidth="1.5" />
            <circle cx="55" cy="70"  r="5" fill="#6a9830" stroke="white" strokeWidth="1.5" />
            <circle cx="55" cy="110" r="5" fill="#6a9830" stroke="white" strokeWidth="1.5" />
            <circle cx="55" cy="148" r="10" fill="#fef3c7" stroke="#c8a955" strokeWidth="1.5" />
            <text x="55" y="152" textAnchor="middle" fontSize="9" fill="#92400e" fontFamily="Inter,sans-serif" fontWeight="700">★</text>
            <circle cx="55" cy="180" r="5" fill="#6a9830" stroke="white" strokeWidth="1.5" />
            <line x1="55" y1="30"  x2="90" y2="30"  stroke="#e2e8e2" strokeWidth="1" />
            <line x1="55" y1="70"  x2="90" y2="70"  stroke="#e2e8e2" strokeWidth="1" />
            <line x1="55" y1="110" x2="90" y2="110" stroke="#e2e8e2" strokeWidth="1" />
            <line x1="55" y1="180" x2="90" y2="180" stroke="#e2e8e2" strokeWidth="1" />
            <circle cx="90" cy="30"  r="2" fill="#c8d8c8" />
            <circle cx="90" cy="70"  r="2" fill="#c8d8c8" />
            <circle cx="90" cy="110" r="2" fill="#c8d8c8" />
            <circle cx="90" cy="180" r="2" fill="#c8d8c8" />
            <text x="55" y="165" textAnchor="middle" fontSize="7" fill="#92400e" fontFamily="Inter,sans-serif">NOV 20</text>
            <text x="55" y="173" textAnchor="middle" fontSize="6" fill="#92400e" fontFamily="Inter,sans-serif">2024</text>
          </svg>
          <div
            className="text-center rounded-lg px-2 py-1.5"
            style={{ backgroundColor: '#fef3c7', fontSize: '10px', color: '#92400e', fontWeight: 600, marginTop: '-8px' }}
          >
            Final Exam
          </div>
        </div>

        {/* Right panel — task list */}
        <div className="flex-1 overflow-auto">
          {tasks.map((task, i) => (
            <div
              key={i}
              className="flex items-start gap-3 px-3 py-2.5"
              style={{ borderBottom: '1px solid #f0f0f0' }}
            >
              <div className="shrink-0 pt-0.5">{task.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold" style={{ fontSize: '12px', color: '#1a2e25' }}>
                    {task.name}
                  </span>
                  {task.badge && (
                    <span
                      className="w-4 h-4 rounded flex items-center justify-center text-white"
                      style={{ backgroundColor: '#6a9830', fontSize: '9px', fontWeight: 700 }}
                    >
                      {task.badge}
                    </span>
                  )}
                  <Tag label={task.tag} color={task.tagColor} />
                </div>
                <div className="flex items-center gap-2 flex-wrap mt-0.5" style={{ fontSize: '10px', color: '#888' }}>
                  <span>{task.dates}</span>
                  <span className="px-1.5 rounded" style={{ backgroundColor: '#f0f0f0', color: '#555' }}>
                    {task.duration}
                  </span>
                </div>
                <div style={{ fontSize: '10px', color: '#888', marginTop: '1px' }}>{task.cost}</div>
              </div>
            </div>
          ))}
          <MilestoneRow />
          <LastRow />
        </div>
      </div>
    </div>
  );
}
