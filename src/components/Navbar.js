'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navbar({ showAddNote = false }) {
    const router = useRouter();
    const handleLogout = () => {
        console.log('Logout clicked');
        router.push('/');
      };
  return (
    <nav className="bg-yellow-200/90 backdrop-blur-sm p-4 flex justify-between items-center shadow-md border-b border-yellow-300">
      <Link href="/notes">
        <h1 className="text-2xl font-bold text-yellow-600">📝 Notepad App</h1>
      </Link>

      <div className="flex gap-4">
        {showAddNote && (
          <Link
            href="/notes/create"
            className="px-4 py-2 bg-pink-400 text-white rounded-lg font-semibold hover:bg-pink-500 transition"
          >
            + Add Note
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
