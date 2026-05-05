import { Player } from '@/types/player';
import { MOCK_PLAYERS } from '@/data/mockPlayers';

export interface SearchParams {
  query: string;
  page: number;
  pageSize: number;
  status?: 'all' | 'online' | 'offline';
  signal?: AbortSignal;
}

/** Like `setTimeout`, but rejects with `AbortError` if `signal` aborts. */
const delay = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((ok, fail) => {
    if (signal?.aborted) return void fail(new DOMException('Aborted', 'AbortError'));
    const onAbort = () => {
      clearTimeout(id);
      fail(new DOMException('Aborted', 'AbortError'));
    };
    const id = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      ok();
    }, ms);
    signal?.addEventListener('abort', onAbort, { once: true });
  });

export interface SearchResult {
  players: Player[];
  total: number;
}

/**
 * Simulates an async server-side search API.
 *
 * - Introduces a realistic ~600ms network delay
 * - Has a ~10% random failure rate to simulate real network errors
 * - Returns a page of results + total count for pagination
 * - Filters by query (playerId, email, name) and optional online status
 *
 * In production this would be a real HTTP call, e.g.:
 *   return fetch(`/api/players?q=${params.query}&page=${params.page}&status=${params.status}`)
 *     .then(res => { if (!res.ok) throw new Error(res.statusText); return res.json(); })
 */
export async function searchPlayers(params: SearchParams): Promise<SearchResult> {
  await delay(600, params.signal);
  params.signal?.throwIfAborted();

  // Simulate occasional server errors (~10% of calls)
  if (Math.random() < 0.1) {
    throw new Error('Server error: failed to fetch players. Please try again.');
  }

  const q = params.query.toLowerCase().trim();

  const filtered = MOCK_PLAYERS.filter((player) => {
    const matchesQuery =
      !q ||
      player.playerId.toLowerCase().includes(q) ||
      player.email.toLowerCase().includes(q) ||
      player.name.toLowerCase().includes(q);

    const matchesStatus =
      !params.status ||
      params.status === 'all' ||
      (params.status === 'online' && player.online) ||
      (params.status === 'offline' && !player.online);

    return matchesQuery && matchesStatus;
  });

  const start = (params.page - 1) * params.pageSize;
  return {
    players: filtered.slice(start, start + params.pageSize),
    total: filtered.length,
  };
}
