'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { AppUser } from '@/lib/types';

export function useSaveUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (user: AppUser) => {
      const body = { id: user.login.uuid, payload: user };
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saved`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['saved'] }),
  });
}


export function useRemoveUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api(`/api/saved/${id}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['saved'] }),
  });
}
