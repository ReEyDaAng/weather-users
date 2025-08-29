'use client';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import UserCard from '@/components/UserCard';


const RESULTS = 12; const SEED = 'demo';

export default function Home() {
const [page, setPage] = useState(1);
const [all, setAll] = useState<any[]>([]);


const { data, isFetching, isError } = useQuery({
queryKey: ['users', page],
queryFn: () => api(`/api/users?page=${page}&results=${RESULTS}&seed=${SEED}`),
select: (d) => d.results,
});


useEffect(() => { if (data) setAll(prev => [...prev, ...data]); }, [data]);


return (
<div>
<h1 className="text-2xl font-semibold mb-4">Just Random Users</h1>
{isError && <div className="text-red-600 mb-2">Failed to load users</div>}
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
{all.map((u) => <UserCard key={u.login.uuid} user={u} />)}
</div>
<div className="flex justify-center my-6">
<button className="px-4 py-2 rounded bg-slate-900 text-white disabled:opacity-50" disabled={isFetching} onClick={() => setPage(p => p + 1)}>
{isFetching ? 'Loading…' : 'Load more'}
</button>
</div>
</div>
);
}