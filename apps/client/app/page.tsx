'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import UserCard from '@/components/UserCard';

// Мінімальний тип користувача (поля, які реально юзаємо)
type User = {
  login: { uuid: string };
  name: { first: string; last: string };
  picture: { large: string };
  location?: { coordinates?: { latitude: string; longitude: string } };
};

type ApiUsersResponse = { results: User[] };

const RESULTS = 12 as const;
const SEED = 'demo' as const;

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [all, setAll] = useState<User[]>([]);

  const { data, isFetching, isError } = useQuery({
    queryKey: ['users', page],
    // типізуємо відповідь API
    queryFn: async (): Promise<ApiUsersResponse> =>
      api(`/api/users?page=${page}&results=${RESULTS}&seed=${SEED}`),
    // після select тип data стане User[]
    select: (d: ApiUsersResponse) => d.results,
  });

  useEffect(() => {
    if (data) setAll(prev => [...prev, ...data]);
  }, [data]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Just Random Users</h1>

      {isError && <div className="text-red-600 mb-2">Failed to load users</div>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {all.map(u => (
          <UserCard key={u.login.uuid} user={u} />
        ))}
      </div>

      <div className="flex justify-center my-6">
        <button
          className="px-4 py-2 rounded bg-slate-900 text-white disabled:opacity-50"
          disabled={isFetching}
          onClick={() => setPage(p => p + 1)}
        >
          {isFetching ? 'Loading…' : 'Load more'}
        </button>
      </div>
    </div>
  );
}
