'use client';

import Link from 'next/link';
import Button from './Button';

export default function NoteCard({ note, onDelete }) {
  return (
    <div className="p-4 bg-white/90 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-2 text-yellow-600">{note.title}</h2>
        <p className="text-gray-700 mb-4 line-clamp-2">{note.content}</p>
        <Link
          href={`/notes/${note.id}`}
          className="text-sm text-pink-500 hover:underline font-semibold"
        >
          View Details
        </Link>
      </div>

      {/* <div className="mt-4 flex justify-end">
        <Button
          onClick={() => onDelete(note.id)}
          className="bg-red-500 text-white hover:bg-red-600"
        >
          Delete
        </Button>
      </div> */}
    </div>
  );
}
