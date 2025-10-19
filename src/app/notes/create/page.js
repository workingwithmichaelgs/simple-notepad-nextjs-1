'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function CreateNotePage() {
    

// protect route
    const router = useRouter();
    useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
  }, []);


  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ ' + data.message);
        setTitle('');
        setContent('');
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (err) {
      setMessage('❌ Network error');
    }
  };

  return (
    <div>
      <Navbar  />

      <main className="min-h-screen p-8 bg-gradient-to-br from-yellow-100 to-pink-200">
        <div className="max-w-md mx-auto bg-white/80 p-8 rounded-2xl shadow-lg border border-yellow-300">
          <h1 className="text-3xl font-bold mb-6 text-yellow-600 text-center">
            📝 Create New Note
          </h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none h-40"
            />

            <button
              type="submit"
              className="mt-2 bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Save Note
            </button>

            {message && (
              <p className="mt-3 text-center text-sm">{message}</p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
