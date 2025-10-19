import { Pencil, NotebookPen } from "lucide-react";

export default function HomePage() {
   const metadata = {
   title: "Notepad - Simple & Fun Online Notes",
  description:
    "A colorful, cartoon-inspired notepad app to jot down your thoughts, ideas, and daily tasks instantly — no account required!",
  keywords: ["notepad", "notes app", "simple notes", "cartoon notepad", "nextjs app"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Notepad - Simple & Fun Online Notes",
    description:
      "A colorful, cartoon-inspired notepad app to jot down your thoughts, ideas, and daily tasks instantly — no account required!",
    url: "https://your-notepad-app.vercel.app",
    siteName: "Notepad App",
    images: [
      {
        url: "/notepad-preview.png",
        width: 800,
        height: 600,
        alt: "Notepad App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
  return (
   <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-100 via-pink-100 to-purple-200 text-gray-800">
      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 text-center max-w-lg mx-auto border-4 border-yellow-300">
        <div className="flex justify-center mb-4">
          <NotebookPen className="w-16 h-16 text-yellow-500 drop-shadow-md" />
        </div>

        <h1 className="text-4xl font-extrabold mb-2 text-yellow-600 drop-shadow-sm">
          Welcome to <span className="text-pink-500">Notepad!</span>
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          A simple, colorful, and fun way to keep your thoughts, ideas, and daily notes all in one place ✨
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/register"
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-transform hover:scale-105"
          >
            📝 Get Started
          </a>
          <a
            href="/login"
            className="bg-pink-400 hover:bg-pink-500 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-transform hover:scale-105"
          >
            🔑 Login
          </a>
        </div>

        <div className="mt-8 text-sm text-gray-600">
          <Pencil className="inline-block w-4 h-4 mr-1 text-gray-400" />
          Built with ❤️ using Next.js & Tailwind CSS
        </div>
      </div>
    </main>
  );
}
