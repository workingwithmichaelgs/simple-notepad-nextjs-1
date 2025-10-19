// src/app/register/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
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
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-200">
      <div className="p-8 bg-white/80 rounded-2xl shadow-lg border border-yellow-300 w-full max-w-md">
        <h1 className="text-3xl font-bold text-yellow-600 mb-6 text-center">📝 Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            className="mt-2 bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Register
          </button>

          {message && (
            <p className="mt-3 text-center text-sm">{message}</p>
          )}
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-pink-500 font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </main>
  );
}
