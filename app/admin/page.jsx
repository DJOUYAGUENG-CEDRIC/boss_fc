'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      setError('Mot de passe incorrect.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0f1e' }}>
      <div
        className="w-full max-w-sm mx-4 rounded-2xl p-8 shadow-xl"
        style={{ background: '#0d1428', border: '1px solid #1e2d4d' }}
      >
        <div className="text-center mb-8">
          <p className="text-xl font-bold text-white tracking-wide">Boos FC</p>
          <p className="text-sm mt-1" style={{ color: '#facc15' }}>Panel Administrateur</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
            className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2"
            style={{
              background: '#111c35',
              border: '1px solid #1e2d4d',
              '--tw-ring-color': '#facc15',
              caretColor: '#facc15',
            }}
          />
          {error && <p className="text-xs text-red-400 text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-xl text-sm font-bold text-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: '#facc15' }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
