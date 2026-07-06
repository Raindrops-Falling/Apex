import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { CurvedLines } from './CurvedLines';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey,
);

const ApexIcon = () => (
  <svg width="32" height="26" viewBox="0 0 28 22" fill="none">
    <rect x="0"  y="13" width="6" height="9"  rx="1.5" fill="#1c2814" opacity="0.9" />
    <rect x="11" y="7"  width="6" height="15" rx="1.5" fill="#1c2814" opacity="0.9" />
    <rect x="22" y="1"  width="6" height="21" rx="1.5" fill="#1c2814" opacity="0.9" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
    // On success the page redirects — no need to call onLogin() here.
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#f5f0e8', fontFamily: 'Inter, sans-serif' }}
    >
      <CurvedLines direction="tl-br" opacity={0.09} count={14} spacing={108} />

      {/* Card */}
      <div
        className="relative z-10 w-full mx-4"
        style={{ maxWidth: 400 }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-10 gap-3">
          <ApexIcon />
          <span style={{ fontSize: 22, fontWeight: 700, color: '#1c2814', letterSpacing: '-0.02em' }}>
            apex
          </span>
        </div>

        {/* Card body */}
        <div
          className="rounded-2xl p-8 flex flex-col gap-6"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid rgba(28,40,20,0.1)',
            boxShadow: '0 4px 32px rgba(28,40,20,0.07)',
          }}
        >
          <div className="text-center">
            <h1
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 26,
                fontWeight: 400,
                color: '#1c2814',
                lineHeight: 1.2,
                marginBottom: 8,
              }}
            >
              Welcome back
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(28,40,20,0.55)', lineHeight: 1.6 }}>
              Sign in to access your study dashboard
            </p>
          </div>

          {/* Google OAuth button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-xl transition-all"
            style={{
              border: '1px solid rgba(28,40,20,0.18)',
              backgroundColor: loading ? 'rgba(28,40,20,0.04)' : '#ffffff',
              color: '#1c2814',
              fontSize: 14,
              fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? (
              <span style={{ opacity: 0.6 }}>Redirecting…</span>
            ) : (
              <>
                <GoogleIcon />
                Continue with Google
              </>
            )}
          </button>

          {error && (
            <p style={{ fontSize: 13, color: '#c0392b', textAlign: 'center' }}>
              {error}
            </p>
          )}

          <p style={{ fontSize: 12, color: 'rgba(28,40,20,0.38)', textAlign: 'center', lineHeight: 1.6 }}>
            By continuing, you agree to Apex's{' '}
            <a href="#" style={{ color: '#1c2814', textDecoration: 'underline' }}>Terms</a>
            {' '}and{' '}
            <a href="#" style={{ color: '#1c2814', textDecoration: 'underline' }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
