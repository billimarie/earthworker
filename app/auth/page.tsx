'use client';

import { useState } from 'react';
import { createSupabaseClient } from '@/lib/supabase';

export default function AuthPage() {
  const supabase = createSupabaseClient();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/profile`,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for a Magic Link!');
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h1>Sign In / Sign Up</h1>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Magic Link'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
