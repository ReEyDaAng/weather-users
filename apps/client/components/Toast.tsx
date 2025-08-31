'use client';

import { create } from 'zustand';
import { useEffect } from 'react';

type Toast = {
  id: number;
  message: string;
};

type ToastStore = {
  toasts: Toast[];
  add: (msg: string) => void;
  remove: (id: number) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  add: (msg) =>
    set((state) => ({
      toasts: [...state.toasts, { id: Date.now(), message: msg }],
    })),
  remove: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

export function ToastContainer() {
  const { toasts, remove } = useToastStore();

  useEffect(() => {
    if (toasts.length > 0) {
      const timers = toasts.map((t) =>
        setTimeout(() => remove(t.id), 3000)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [toasts, remove]);

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="px-4 py-2 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-black shadow-lg animate-fadeIn"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
