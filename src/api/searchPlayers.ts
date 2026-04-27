import { Player } from '@/types/player';
import { MOCK_PLAYERS } from '@/data/mockPlayers';

export interface SearchParams {
  query: string;
  page: number;
  pageSize: number;
  status?: 'all' | 'online' | 'offline';
}

export interface SearchResult {
  players: Player[];
  total: number;
}

/**
 * Simulates an async server-side search API.
 *
 * - Introduces a realistic ~600ms network delay
 * - Has a small random chance of failing (simulates real network errors)
 * - Accepts a query (matched against playerId, email, name) and optional status filter
 *
 * In production this would be a real HTTP call, e.g.:
 *   return fetch(`/api/players?q=${params.query}&page=${params.page}`)
 */
export async function searchPlayers(params: SearchParams): Promise<SearchResult> {
  await new Promise((res) => setTimeout(res, 600));

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
