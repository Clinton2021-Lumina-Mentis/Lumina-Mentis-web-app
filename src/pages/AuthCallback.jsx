import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/api/base44Client';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    // supabase client with detectSessionInUrl:true automatically exchanges the
    // ?code= parameter from the OAuth callback URL.  We subscribe to auth
    // state changes so we can redirect as soon as the session is ready.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/', { replace: true });
      } else if (event === 'SIGNED_OUT') {
        setError('Authentication failed. Please try again.');
      }
    });

    // If the session was already established before this component mounted
    // (e.g., the auth state change fired synchronously), redirect immediately.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/', { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-center space-y-4 px-4">
          <p className="text-sm text-destructive">{error}</p>
          <button
            onClick={() => navigate('/', { replace: true })}
            className="text-sm text-primary underline"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-center px-4">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
        <p className="text-sm text-muted-foreground">Completing sign in…</p>
      </div>
    </div>
  );
}
