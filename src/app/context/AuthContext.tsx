import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { Session } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey,
  {
    auth: {
      flowType: 'pkce',          // exchanges a short ?code= instead of exposing tokens in the hash
      detectSessionInUrl: true,  // automatically picks up the ?code= on redirect
    },
  },
);

const API = `https://${projectId}.supabase.co/functions/v1/make-server-0158a663`;

interface AuthCtx { session: Session | null; loading: boolean; }
const AuthContext = createContext<AuthCtx>({ session: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (session?.access_token) upsertProfile(session.access_token);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (s?.access_token) upsertProfile(s.access_token);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function upsertProfile(token: string) {
    try {
      await fetch(`${API}/auth/upsert-profile`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {
      console.log('Profile upsert error:', e);
    }
  }

  return <AuthContext.Provider value={{ session, loading }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
