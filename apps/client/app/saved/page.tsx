"use client";

import { useQuery } from "@tanstack/react-query";
import UserCard from "@/components/UserCard";
import { api } from "@/lib/api";
import type { SavedUser } from "@/lib/types";

export default function SavedPage() {
  const { data, isFetching, isError, refetch } = useQuery<SavedUser[], Error>({
    queryKey: ["saved"],
    queryFn: () => api<SavedUser[]>("/api/saved"),
    staleTime: 30_000,
    retry: 1,
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Saved Users</h1>

      {isError && <div className="text-red-600 mb-2">Failed to load</div>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(data ?? []).map((row) => (
          <UserCard key={String(row.id)} user={row.payload} hideSave />
        ))}
      </div>

      <div className="flex justify-center my-6">
        <button
          className="px-4 py-2 rounded border"
          disabled={isFetching}
          onClick={() => refetch()}
        >
          {isFetching ? "Refreshing…" : "Refresh"}
        </button>
      </div>
    </div>
  );
}
