import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700
                 px-3 py-1.5 text-sm font-medium
                 hover:bg-zinc-100 dark:hover:bg-zinc-800
                 active:translate-y-[1px] transition"
      title={theme === "dark" ? "Switch to light" : "Switch to dark"}
      aria-pressed={theme === "dark"}
    >
      <span>{theme === "dark" ? "🌙" : "☀️"}</span>
      <span className="hidden sm:inline">
        {theme === "dark" ? "Dark" : "Light"}
      </span>
    </button>
  );
}
