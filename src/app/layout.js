import "../styles/globals.css";

/* // aliasing
//import "@/styles/tailwind.css" */

export const metadata = {
  title: "Notepad App",
  description: "A fun, cartoon-style notepad app built with Next.js and Tailwind CSS",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
       className="font-sans bg-yellow-50"
      >
        {children}
      </body>
    </html>
  );
}
