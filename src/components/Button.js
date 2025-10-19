// src/components/Button.jsx
'use client';

export default function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold transition ${className}`}
    >
      {children}
    </button>
  );
}
