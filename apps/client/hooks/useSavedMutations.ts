import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AppUser, SaveResponse } from '@/lib/types';

const API = process.env.NEXT_PUBLIC_API_BASE ?? '';

export function useSaveUser() {
  const qc = useQueryClient();
  return useMutation<SaveResponse, Error, AppUser>({
    mutationFn: async (user) => {
      const res = await fetch(`${API}/api/saved`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.login.uuid, payload: user }),
      });
      if (!res.ok) throw new Error(`Save failed: ${res.status}`);
      return (await res.json()) as SaveResponse; // ← типізовано
    },
    onSuccess: () => {
      // оновимо список збережених, якщо є такий запит
      qc.invalidateQueries({ queryKey: ['saved'] });
    },
  });
}

export function useRemoveUser() {
  const qc = useQueryClient();
  return useMutation<{ ok: true }, Error, string>({
    mutationFn: async (id) => {
      const res = await fetch(`${API}/api/saved/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Remove failed: ${res.status}`);
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['saved'] }),
  });
}