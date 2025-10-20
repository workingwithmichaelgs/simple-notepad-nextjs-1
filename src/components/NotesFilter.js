'use client';
import { Search, ChevronDown } from 'lucide-react';

export default function NotesFilter({ search, setSearch, sort, setSort }) {
  return (
    <div className="flex flex-col md:flex-row gap-3 max-w-6xl mx-auto mt-4 mb-4 items-center p-4 bg-yellow-50 rounded-2xl shadow-lg border-2 border-yellow-200">
      
      {/* Search Bar */}
      <div className="flex items-center flex-1 bg-yellow-100 border-2 border-yellow-300 rounded-xl p-2 focus-within:ring-2 focus-within:ring-pink-400 transition-all hover:scale-105">
        <Search className="text-yellow-600 mr-2" size={20} />
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none placeholder-yellow-500 text-yellow-700 font-medium text-lg"
        />
      </div>

      {/* Sort Dropdown */}
      <div className="relative">
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="appearance-none p-3 rounded-xl border-2 border-pink-300 bg-pink-50 text-pink-600 font-semibold text-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all hover:scale-105"
        >
          <option value="latest">Latest Updated</option>
          <option value="az">Title A-Z</option>
          <option value="za">Title Z-A</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-pink-500" size={20} />
      </div>
    </div>
  );
}
