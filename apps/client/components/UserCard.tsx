"use client";

import { useState } from "react";
import { useWeather } from "@/hooks/useWeather";
import { weatherCodeMap } from "@/lib/weatherCodeMap";
import { useToastStore } from "./Toast";
import { useSaveUser, useRemoveUser } from "@/hooks/useSavedMutations";
import type { AppUser } from "@/lib/types";

export default function UserCard({
  user,
  hideSave = false,
}: {
  user: AppUser;
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
  const w = weatherCodeMap[code] ?? { label: "N/A", emoji: "❔" };

  const onSave = async () => {
    const res = await saveMut.mutateAsync(user);
    if (res.reason === "already") {
      addToast("Already saved!");
    } else {
      addToast("Saved!");
    }
  };

  const onRemove = async () => {
    await removeMut.mutateAsync(user.login.uuid);
    addToast("Removed!");
  };

  return (
    <div
      className="
        rounded-2xl p-4 shadow-sm border
        bg-white text-slate-900 border-zinc-200
        dark:bg-zinc-800 dark:text-slate-100 dark:border-zinc-700
      "
    >
      <div className="flex gap-4">
        <img
          src={user.picture.large}
          alt=""
          className="w-20 h-20 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-700"
        />
        <div>
          <div className="font-semibold">
            {user.name.first} {user.name.last}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-300 capitalize">
            {user.gender}
          </div>
          <div className="text-sm text-slate-700 dark:text-slate-200">
            {user.location.city}, {user.location.country}
          </div>
          <div className="text-sm">
            <a
              href={`mailto:${user.email}`}
              className="text-blue-700 dark:text-blue-400 hover:underline break-all"
            >
              {user.email}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm">
          <div className="font-medium">
            Weather: {w.emoji} {w.label}
          </div>
          {data && (
            <div className="text-slate-700 dark:text-slate-300">
              <span>Now: {data.current.temp}°C</span>
              {" · "}
              <span>Min: {data.today.min}°C</span>
              {" · "}
              <span>Max: {data.today.max}°C</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {!hideSave && (
            <button
              onClick={onSave}
              className="
                px-3 py-1.5 rounded-xl text-sm font-semibold
                text-white bg-slate-900 hover:bg-slate-800 active:translate-y-px
                dark:text-slate-900 dark:bg-slate-100 dark:hover:bg-slate-200
              "
            >
              Save
            </button>
          )}

          {hideSave && (
            <button
              onClick={onRemove}
              className="
                px-3 py-1.5 rounded-xl text-sm font-semibold
                text-white bg-red-600 hover:bg-red-500 active:translate-y-px
                dark:bg-red-600 dark:hover:bg-red-500
              "
            >
              Remove
            </button>
          )}

          <button
            onClick={() => setOpen(true)}
            className="
              px-3 py-1.5 rounded-xl text-sm font-medium
              bg-white hover:bg-zinc-100 text-slate-900
              border border-zinc-200
              dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-slate-100
              dark:border-zinc-600
            "
          >
            Weather
          </button>
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="
              w-full max-w-md rounded-2xl border shadow-lg p-5
              bg-white text-slate-900 border-zinc-200
              dark:bg-zinc-800 dark:text-slate-100 dark:border-zinc-700
            "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Weather details</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {data ? (
              <div className="space-y-1">
                <div className="text-2xl">
                  {w.emoji} {w.label}
                </div>
                <div>Now: {data.current.temp}°C</div>
                <div>
                  Today: {data.today.min}°C — {data.today.max}°C
                </div>
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
