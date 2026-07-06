import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { CurvedLines } from '../components/CurvedLines';
import { ArrowLeft, Upload, FileText, X, CheckCircle } from 'lucide-react';

const ApexIcon = () => (
  <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
    <rect x="0"  y="13" width="6" height="9"  rx="1.5" fill="#1c2814" opacity="0.9" />
    <rect x="11" y="7"  width="6" height="15" rx="1.5" fill="#1c2814" opacity="0.9" />
    <rect x="22" y="1"  width="6" height="21" rx="1.5" fill="#1c2814" opacity="0.9" />
  </svg>
);

type Status = 'idle' | 'uploading' | 'done' | 'error';

export function UploadPage() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // While auth is resolving, show spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f0e8' }}>
        <div style={{ width: 28, height: 28, border: '2px solid rgba(28,40,20,0.15)', borderTopColor: '#1c2814', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    );
  }

  // Not authed → redirect to login
  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center" style={{ backgroundColor: '#f5f0e8', fontFamily: 'Inter, sans-serif' }}>
        <ApexIcon />
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 28, fontWeight: 400, color: '#1c2814' }}>
          Sign in to upload notes
        </h2>
        <p style={{ fontSize: 14, color: 'rgba(28,40,20,0.55)', maxWidth: 340 }}>
          Create your Apex account to start uploading PDFs and building your knowledge graph.
        </p>
        <Link to="/login"
          className="flex items-center gap-2 px-7 py-3 rounded-full text-sm"
          style={{ backgroundColor: '#1c2814', color: '#f5f0e8', fontWeight: 500, textDecoration: 'none' }}>
          Sign in with Google
        </Link>
        <Link to="/" style={{ fontSize: 13, color: 'rgba(28,40,20,0.5)', textDecoration: 'none' }}>← Back to home</Link>
      </div>
    );
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.type === 'application/pdf') {
      setFile(f);
      if (!name) setName(f.name.replace(/\.pdf$/i, ''));
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setFile(f); if (!name) setName(f.name.replace(/\.pdf$/i, '')); }
  };

  const handleSubmit = async () => {
    if (!file || !name.trim()) return;
    setStatus('uploading');
    setErrorMsg('');
    // Placeholder — actual Supabase Storage upload will go here
    await new Promise(r => setTimeout(r, 1400));
    setStatus('done');
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: '#f5f0e8', fontFamily: 'Inter, sans-serif' }}
    >
      <CurvedLines direction="br-tl" opacity={0.09} count={13} spacing={112} />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5"
        style={{ borderBottom: '1px solid rgba(28,40,20,0.08)' }}>
        <Link to="/" className="flex items-center gap-2 no-underline">
          <ApexIcon />
          <span style={{ fontSize: 15, fontWeight: 700, color: '#1c2814', letterSpacing: '-0.01em' }}>apex</span>
        </Link>
        <Link to="/"
          className="flex items-center gap-1.5 text-sm hover:opacity-60 transition-opacity no-underline"
          style={{ color: 'rgba(28,40,20,0.55)', fontWeight: 500 }}>
          <ArrowLeft size={14} /> Back
        </Link>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(30px, 5vw, 46px)',
              fontWeight: 400, color: '#1c2814',
              lineHeight: 1.15, letterSpacing: '-0.02em',
              marginBottom: 10,
            }}
          >
            Upload your notes.
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(28,40,20,0.52)', lineHeight: 1.65 }}>
            Apex reads your PDF, extracts the key concepts, and builds a personalised revision schedule — instantly.
          </p>
        </div>

        {status === 'done' ? (
          <div
            className="rounded-2xl p-10 flex flex-col items-center gap-4 text-center"
            style={{ backgroundColor: '#ffffff', border: '1px solid rgba(28,40,20,0.1)' }}
          >
            <CheckCircle size={40} style={{ color: '#6a9830' }} />
            <h3 style={{ fontSize: 20, fontWeight: 600, color: '#1c2814' }}>Notebook created!</h3>
            <p style={{ fontSize: 14, color: 'rgba(28,40,20,0.55)' }}>
              We're extracting concepts from <strong>{name}</strong>. Your study plan will be ready shortly.
            </p>
            <button
              onClick={() => { setFile(null); setName(''); setStatus('idle'); }}
              className="mt-2 px-6 py-2.5 rounded-full text-sm"
              style={{ border: '1px solid rgba(28,40,20,0.25)', color: '#1c2814', fontWeight: 500 }}
            >
              Upload another
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {/* Notebook name */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: 13, fontWeight: 600, color: '#1c2814' }}>Notebook name</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Calc AB Notes 01"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                style={{
                  border: '1px solid rgba(28,40,20,0.18)',
                  backgroundColor: '#ffffff',
                  color: '#1c2814',
                  fontFamily: 'Inter, sans-serif',
                }}
              />
            </div>

            {/* Drop zone */}
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className="relative rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all"
              style={{
                border: `2px dashed ${dragging ? '#1c2814' : 'rgba(28,40,20,0.2)'}`,
                backgroundColor: dragging ? 'rgba(28,40,20,0.04)' : '#ffffff',
                padding: '48px 24px',
                minHeight: 200,
              }}
            >
              {file ? (
                <>
                  <FileText size={32} style={{ color: '#6a9830' }} />
                  <div className="text-center">
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#1c2814' }}>{file.name}</p>
                    <p style={{ fontSize: 12, color: 'rgba(28,40,20,0.45)', marginTop: 2 }}>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); setFile(null); }}
                    className="flex items-center gap-1 text-xs mt-1"
                    style={{ color: 'rgba(28,40,20,0.45)' }}
                  >
                    <X size={12} /> Remove
                  </button>
                </>
              ) : (
                <>
                  <Upload size={28} style={{ color: 'rgba(28,40,20,0.35)' }} />
                  <div className="text-center">
                    <p style={{ fontSize: 14, fontWeight: 500, color: '#1c2814' }}>
                      Drop your PDF here
                    </p>
                    <p style={{ fontSize: 13, color: 'rgba(28,40,20,0.45)', marginTop: 2 }}>
                      or click to browse — PDF files only
                    </p>
                  </div>
                </>
              )}
              <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={handleFile} />
            </div>

            {errorMsg && <p style={{ fontSize: 13, color: '#c0392b' }}>{errorMsg}</p>}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!file || !name.trim() || status === 'uploading'}
              className="w-full py-3.5 rounded-xl text-sm font-medium transition-all"
              style={{
                backgroundColor: file && name.trim() ? '#1c2814' : 'rgba(28,40,20,0.12)',
                color: file && name.trim() ? '#f5f0e8' : 'rgba(28,40,20,0.35)',
                cursor: file && name.trim() ? 'pointer' : 'not-allowed',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {status === 'uploading' ? 'Creating notebook…' : 'Create notebook'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
