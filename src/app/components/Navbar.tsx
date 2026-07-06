import { ChevronDown, ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

const ApexIcon = () => (
  <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
    <rect x="0"  y="13" width="6" height="9"  rx="1.5" fill="#1c2814" opacity="0.9" />
    <rect x="11" y="7"  width="6" height="15" rx="1.5" fill="#1c2814" opacity="0.9" />
    <rect x="22" y="1"  width="6" height="21" rx="1.5" fill="#1c2814" opacity="0.9" />
  </svg>
);

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: '#f5f0e8', fontFamily: 'Inter, sans-serif', borderBottom: '1px solid rgba(28,40,20,0.08)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ApexIcon />
          <span style={{ color: '#1c2814', fontWeight: 700, fontSize: 15, letterSpacing: '-0.01em' }}>apex</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Product', 'Resources'].map((item) => (
            <button key={item} className="flex items-center gap-1 text-sm transition-colors" style={{ color: 'rgba(28,40,20,0.65)' }}>
              {item} <ChevronDown size={13} />
            </button>
          ))}
          <a href="#" className="text-sm" style={{ color: 'rgba(28,40,20,0.65)' }}>Blog</a>
        </div>

        <div className="hidden md:flex items-center gap-2.5">
          <button
            className="text-sm px-5 py-2 rounded-full transition-colors"
            style={{ border: '1px solid rgba(28,40,20,0.25)', color: '#1c2814' }}
          >
            Login
          </button>
          <button
            className="text-sm px-5 py-2 rounded-full flex items-center gap-2 transition-colors"
            style={{ backgroundColor: '#1c2814', color: '#f5f0e8' }}
          >
            Get started <ArrowRight size={13} />
          </button>
        </div>

        <button className="md:hidden p-1" style={{ color: '#1c2814' }} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div
          className="md:hidden px-6 py-5 flex flex-col gap-5 border-t"
          style={{ backgroundColor: '#f5f0e8', borderColor: 'rgba(28,40,20,0.1)' }}
        >
          {['Product', 'Resources'].map((item) => (
            <button key={item} className="text-sm text-left flex items-center gap-1" style={{ color: 'rgba(28,40,20,0.65)' }}>
              {item} <ChevronDown size={13} />
            </button>
          ))}
          <a href="#" className="text-sm" style={{ color: 'rgba(28,40,20,0.65)' }}>Blog</a>
          <div className="flex flex-col gap-2 pt-2 border-t" style={{ borderColor: 'rgba(28,40,20,0.1)' }}>
            <button className="text-sm py-2.5 rounded-full" style={{ border: '1px solid rgba(28,40,20,0.25)', color: '#1c2814' }}>
              Login
            </button>
            <button className="text-sm py-2.5 rounded-full flex items-center justify-center gap-2"
              style={{ backgroundColor: '#1c2814', color: '#f5f0e8' }}>
              Get started <ArrowRight size={13} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
