import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Logo from '@/components/Logo';
import { useAuth } from '@/hooks/useAuth';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function AdminLogin() {
  const { signIn, session, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-950">
        <p className="text-navy-200">Loading…</p>
      </div>
    );
  }

  if (session) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error: err } = await signIn(email, password);
    setSubmitting(false);
    if (err) {
      setError(err);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo light />
        </div>
        <div className="rounded-sm border border-white/10 bg-navy-900/60 p-8 shadow-xl">
          <h1 className="text-center font-serif text-2xl font-semibold text-white">Admin Sign In</h1>
          <p className="mt-2 text-center text-sm text-navy-300">
            Sign in to manage Lea Valley School news &amp; events.
          </p>

          {!isSupabaseConfigured && (
            <div className="mt-6 rounded-sm border border-gold-400/40 bg-gold-400/10 p-4 text-sm text-gold-100">
              <p>Use presentation mode to explore the dashboard and prepare draft content.</p>
              <button type="button" onClick={() => navigate('/admin')} className="mt-4 w-full rounded-sm bg-gold-400 py-3 font-semibold text-navy-950 transition hover:bg-gold-300">Open Presentation Dashboard</button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-navy-100">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-sm border border-white/15 bg-navy-950/50 py-3 pl-11 pr-4 text-white outline-none transition focus:border-gold-400"
                  placeholder="admin@leavalleyschool.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-navy-100">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-sm border border-white/15 bg-navy-950/50 py-3 pl-11 pr-11 text-white outline-none transition focus:border-gold-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-white"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-sm border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-300">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-sm bg-gold-400 py-3 font-semibold text-navy-950 transition hover:bg-gold-300 disabled:opacity-60"
            >
              {submitting ? 'Signing in…' : 'Sign In'}
              {!submitting && <ArrowRight className="h-5 w-5" />}
            </button>
          </form>
        </div>
        <p className="mt-6 text-center text-xs text-navy-400">
          Admin access only. Contact the school administrator for credentials.
        </p>
      </div>
    </div>
  );
}
