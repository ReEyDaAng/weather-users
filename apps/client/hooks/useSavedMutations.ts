'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { AppUser } from '@/lib/types';

export function useSaveUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (user: AppUser) => api('/api/saved', { method: 'POST', body: JSON.stringify({ id: user.login.uuid, payload: user }) }),
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
