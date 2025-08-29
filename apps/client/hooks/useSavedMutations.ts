'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useSaveUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (user: any) =>
      api('/api/saved', {
        method: 'POST',
        body: JSON.stringify({ id: user.login.uuid, payload: user }),
      }),
    onSuccess: () => {
      // оновити список /saved
      qc.invalidateQueries({ queryKey: ['saved'] });
    },
  });
}

export function useRemoveUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api(`/api/saved/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['saved'] });
    },
  });
}
