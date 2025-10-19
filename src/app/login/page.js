// src/app/login/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    router.push('/notes');

    /* try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ ' + data.message);
        setEmail('');
        setPassword('');
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (err) {
      setMessage('❌ Network error');
    } */
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-200">
      <div className="p-8 bg-white/80 rounded-2xl shadow-lg border border-pink-300 w-full max-w-md">
        <h1 className="text-3xl font-bold text-pink-500 mb-6 text-center">🔑 Log In</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
                // console.log(e.target.value);
                setEmail(e.target.value)}
            }
            required
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button
            type="submit"
            className="mt-2 bg-pink-500 text-white font-semibold py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Log In
          </button>

          {message && (
            <p className="mt-3 text-center text-sm">{message}</p>
          )}
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?{' '}
          <Link href="/register" className="text-yellow-500 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
