import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AlignSection } from './components/AlignSection';
import { IntelligentSection } from './components/IntelligentSection';
import { GallerySection } from './components/GallerySection';
import { MetricsSection } from './components/MetricsSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { FooterSection } from './components/FooterSection';
import { LoginPage } from './components/LoginPage';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey,
);

const API = `https://${projectId}.supabase.co/functions/v1/make-server-0158a663`;

export default function App() {
  const [session, setSession] = useState<{ access_token: string } | null | undefined>(undefined);

  useEffect(() => {
    // Restore session on mount (handles OAuth redirect)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.access_token) upsertProfile(session.access_token);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.access_token) upsertProfile(session.access_token);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function upsertProfile(accessToken: string) {
    try {
      await fetch(`${API}/auth/upsert-profile`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (e) {
      console.log('Profile upsert error:', e);
    }
  }

  // Still loading session
  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f0e8' }}>
        <div style={{ width: 32, height: 32, border: '2px solid rgba(28,40,20,0.2)', borderTopColor: '#1c2814', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    );
  }

  // Not logged in — show login page
  //if (!session) {
    //return <LoginPage onLogin={() => {}} />;
  //}

  // Logged in — show landing
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f0e8' }}>
      <Navbar />
      <HeroSection />
      <AlignSection />
      <IntelligentSection />
      <GallerySection />
      <MetricsSection />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
