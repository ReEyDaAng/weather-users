'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import UserCard from '@/components/UserCard';


export default function Saved() {
const { data, isLoading, isError } = useQuery({ queryKey: ['saved'], queryFn: () => api('/api/saved') });
if (isLoading) return <div>Loading…</div>;
if (isError) return <div className="text-red-600">Failed to load</div>;
const users = data ?? [];
return (
<div>
<h1 className="text-2xl font-semibold mb-4">Saved Users</h1>
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
{users.map((row: any) => <UserCard key={row.id} user={row.payload} hideSave />)}
</div>
</div>
);
}