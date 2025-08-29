import '../styles/global.css';
import Providers from './providers';
import { ToastContainer } from '@/components/Toast';
import type { Metadata } from 'next';
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Home | Weather Users',
  description: 'Random users with local weather',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <header className="border-b bg-white">
          <nav className="container mx-auto px-4 py-3 flex gap-4">
            <Link href="/" className="font-semibold">Home</Link>
            <Link href="/saved" className="text-slate-600 hover:text-slate-900">Saved</Link>
          </nav>
        </header>

        <Providers>
          <main className="container mx-auto p-4">{children}</main>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
