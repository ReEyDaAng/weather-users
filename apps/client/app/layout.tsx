// src/app/layout.tsx
import Navbar from '@/components/Navbar';
import '../styles/global.css';
import Providers from './providers';
import { ToastContainer } from '@/components/Toast';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Weather Users',
  description: 'Random users with local weather',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className="h-full bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
        <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800
                           bg-white/80 dark:bg-slate-900/80 backdrop-blur">
          <Navbar />
        </header>

        <Providers>
          <main className="container mx-auto p-4">{children}</main>

          {/* тости — низ праворуч, щоб не перекривати перемикач теми */}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
