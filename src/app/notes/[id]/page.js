'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import notesData from '@/data/notes.json';

export default function NoteDetailPage() {
  const router = useRouter();
  const params = useParams();
  const noteId = params.id;

  const [note, setNote] = useState({ title: '', content: '' });
  const [message, setMessage] = useState('');

  // protect route
useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
  }, [router]);

  // Load note by id
  useEffect(() => {
    const found = notesData.find((n) => n.id === noteId);
    if (found) setNote(found);
    else setMessage('❌ Note not found');
  }, [noteId]);

    

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    console.log('Save clicked')
    try {
      const res = await fetch('/api/notes/' + noteId, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
         },
        body: JSON.stringify(note),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Note saved');
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (err) {
      setMessage('❌ Network error');
    }
  };

  const handleCancel = () => {
    router.push('/notes');
  };

  return (
    <div>
      <Navbar showAddNote={true} />

      <main className="min-h-screen p-8 bg-gradient-to-br from-yellow-100 to-pink-200">
        <div className="max-w-md mx-auto bg-white/80 p-8 rounded-2xl shadow-lg border border-yellow-300">
          <h1 className="text-3xl font-bold mb-6 text-yellow-600 text-center">
            📝 Edit Note
          </h1>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={note.title}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <textarea
              name="content"
              placeholder="Content"
              value={note.content}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none h-40"
            />

            <div className="flex gap-4 mt-2">
              <button
                onClick={handleSave}
                className="flex-1 bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Save
              </button>

              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>

            {message && <p className="mt-3 text-center text-sm">{message}</p>}
          </div>
        </div>
      </main>
    </div>
  );
}
