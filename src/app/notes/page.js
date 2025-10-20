"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NoteCard from '@/components/NoteCard';
import notesData from '@/data/notes.json';
import Navbar from '@/components/Navbar';

export default function NotesPage() {
const router = useRouter();
 const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState(notesData);


useEffect(() => {
    // protect route
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
    
     async function fetchNotes() {
      try {
        const res = await fetch('/api/notes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setMessage(data.message || 'Failed to load notes');
        } else {
          setNotes(data);
        }
      } catch (err) {
        setMessage('Network error');
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, [router]);




  const handleDelete = (id) => {
    const filtered = notes.filter((note) => note.id !== id);
    setNotes(filtered);
    // Later: update notes.json via API
  };


  return (
    <>
     <Navbar showAddNote={true}  />
     {loading ? <p className="text-center mt-10">Loading notes...</p>  :  <main className="min-h-screen p-8 bg-gradient-to-br from-yellow-100 to-pink-200">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-yellow-600 drop-shadow-sm">
        📝 Your Notes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={handleDelete} />
        ))}
      </div>
    </main> }
    </>
   
  );
}
