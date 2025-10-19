"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NoteCard from '@/components/NoteCard';
import notesData from '@/data/notes.json';
import Navbar from '@/components/Navbar';

export default function NotesPage() {
    const router = useRouter();

    useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
  }, []);


  const [notes, setNotes] = useState(notesData);

  const handleDelete = (id) => {
    const filtered = notes.filter((note) => note.id !== id);
    setNotes(filtered);
    // Later: update notes.json via API
  };

  return (
    <>
     <Navbar showAddNote={true}  />
    <main className="min-h-screen p-8 bg-gradient-to-br from-yellow-100 to-pink-200">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-yellow-600 drop-shadow-sm">
        📝 Your Notes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={handleDelete} />
        ))}
      </div>
    </main>
    </>
   
  );
}
