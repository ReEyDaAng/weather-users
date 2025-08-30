const BASE = process.env.NEXT_PUBLIC_API_BASE!;

export async function api<T = unknown>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}
