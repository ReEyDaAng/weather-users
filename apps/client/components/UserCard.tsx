'use client';

import { useState } from 'react';
import { useWeather } from '@/hooks/useWeather';
import { weatherCodeMap } from '@/lib/weatherCodeMap';
import { useToastStore } from './Toast';
import { useSaveUser, useRemoveUser } from '@/hooks/useSavedMutations';
import type { AppUser } from '@/lib/types';

export default function UserCard({
  user,
  hideSave = false,
}: {
  user: AppUser;        // ⬅️ більше ніяких any
  hideSave?: boolean;
}) {
  const lat = parseFloat(user.location.coordinates.latitude);
  const lon = parseFloat(user.location.coordinates.longitude);
  const { data } = useWeather(lat, lon, true);
  const [open, setOpen] = useState(false);

  const addToast = useToastStore((s) => s.add);
  const saveMut = useSaveUser();
  const removeMut = useRemoveUser();

  const code = data?.current?.code ?? 0;
  const w = weatherCodeMap[code] ?? { label: 'N/A', emoji: '❔' };

  const onSave = async () => {
    await saveMut.mutateAsync(user);
    addToast('Saved!');
  };

  const onRemove = async () => {
    await removeMut.mutateAsync(user.login.uuid);
    addToast('Removed!');
  };

  return (
    <div className="rounded-2xl shadow p-4 bg-white dark:bg-zinc-700">
      <div className="flex gap-4">
        <img
          src={user.picture.large}
          alt=""
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold">
            {user.name.first} {user.name.last}
          </div>
          <div className="text-sm text-slate-600 capitalize">{user.gender}</div>
          <div className="text-sm">
            {user.location.city}, {user.location.country}
          </div>
          <div className="text-sm text-blue-700 break-all">{user.email}</div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm">
          <div className="font-medium">
            Weather: {w.emoji} {w.label}
          </div>
          {data && (
            <div>
              <span>Now: {data.current.temp}°C</span>{' · '}
              <span>Min: {data.today.min}°C</span>{' · '}
              <span>Max: {data.today.max}°C</span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {!hideSave && (
            <button className="px-3 py-1 rounded bg-slate-900 text-white" onClick={onSave}>
              Save
            </button>
          )}
          {hideSave && (
            <button onClick={onRemove} className="px-3 py-1 rounded bg-red-600 text-white">
              Remove
            </button>
          )}
          <button className="px-3 py-1 rounded border" onClick={() => setOpen(true)}>
            Weather
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/30 grid place-items-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow max-w-md w-full p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Weather details</h2>
              <button onClick={() => setOpen(false)} className="text-slate-500">✕</button>
            </div>
            {data ? (
              <div className="space-y-1">
                <div className="text-2xl">
                  {w.emoji} {w.label}
                </div>
                <div>Now: {data.current.temp}°C</div>
                <div>Today: {data.today.min}°C — {data.today.max}°C</div>
              </div>
            ) : (
              <div>Loading…</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
