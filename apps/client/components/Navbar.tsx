'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();

  const base = "px-3 py-2 rounded-xl text-sm font-medium transition text-zinc-900 dark:text-zinc-100";
  const hover = "hover:bg-zinc-100 dark:hover:bg-zinc-800";
  const active = "bg-zinc-100 dark:bg-zinc-800 ring-1 ring-inset ring-zinc-200 dark:ring-zinc-700";

  return (
    <nav className="flex items-center gap-2 p-3 border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur">
      <Link href="/" className={`${base} ${pathname === "/" ? active : hover}`}>Home</Link>
      <Link href="/saved" className={`${base} ${pathname === "/saved" ? active : hover}`}>Saved</Link>
      <div className="ml-auto" />
      <ThemeToggle />
    </nav>
  );
}
