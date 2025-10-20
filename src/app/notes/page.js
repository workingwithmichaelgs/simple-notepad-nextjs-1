"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NoteCard from '@/components/NoteCard';
import notesData from '@/data/notes.json';
import Navbar from '@/components/Navbar';
import NotesFilter from '@/components/NotesFilter';

export default function NotesPage() {
const router = useRouter();
const [loading, setLoading] = useState(true);
const [notes, setNotes] = useState(notesData);
const [search, setSearch] = useState('');
const [sort, setSort] = useState('latest');


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

 // filter
  let filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  // sort
  filteredNotes.sort((a, b) => {
    if (sort === 'latest') return new Date(b.updatedAt) - new Date(a.updatedAt);
    if (sort === 'az') return a.title.localeCompare(b.title);
    if (sort === 'za') return b.title.localeCompare(a.title);
    return 0;
  });


    const handleDelete = async (id) => {
      if (!confirm('Are you sure you want to delete this note?')) return;
      
    try {
        const token = localStorage.getItem('token');
        if (!token) return router.push('/login');
      const res = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Failed to delete note');
      } else {
        //   console.log("Note deleted:", id);
          setNotes((prev) => prev.filter((note) => note.id !== id));
          alert(data.message)
      }
    } catch (err) {
      alert('Network error');
    }
    };

    

let content;
if (loading) {
    content = <p className="text-center mt-10">Loading notes...</p>;
  } else if (!loading) {
    content = <main className="min-h-screen p-8 bg-gradient-to-br from-yellow-100 to-pink-200">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-yellow-600 drop-shadow-sm">
        📝 Your Notes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={handleDelete} />
        ))}
      </div>
    </main>;
  } else if (!filteredNotes.length) {
    content = <p className="text-center mt-10">No notes found</p>;
  }

  return (
    <>
    <Navbar showAddNote={true} />
          
    <div className="justify-content space-evenly">
    {/* Filter Component */}
      <NotesFilter
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
              />
    {content}
    </div>
    
    </>
   
  );
}
