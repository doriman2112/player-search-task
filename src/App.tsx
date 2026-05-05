import { useState, useEffect, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { searchPlayers, SearchResult } from '@/api/searchPlayers';
import type { Player } from '@/types/player';
import { SearchBar } from '@/components/SearchBar';
import { StatusFilter } from '@/components/StatusFilter';
import { PlayerTable } from '@/components/PlayerTable';
import { Pagination } from '@/components/Pagination';

const PLAYERS_PER_PAGE = 10;
const STORAGE_KEY = 'player-search-query';

/** Snapshot URL + sessionStorage once per mount (used for initial React state only). */
const getInitialState = () => {
  const params = new URLSearchParams(window.location.search);

  const queryFromUrl = params.get('q');
  const queryFromStorage = sessionStorage.getItem(STORAGE_KEY);

  return {
    query: queryFromUrl ?? queryFromStorage ?? '',
    status: (params.get('status') as 'all' | 'online' | 'offline') || 'all',
    page: Number(params.get('page')) || 1,
  };
};

// --- Theme hook ---
function useTheme() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return { dark, toggle: () => setDark((d) => !d) };
}

function App() {
  const { dark, toggle } = useTheme();

  const [query, setQuery] = useState<string>(() => getInitialState().query);
  const [status, setStatus] = useState<'all' | 'online' | 'offline'>(() => getInitialState().status);
  const [currentPage, setCurrentPage] = useState<number>(() => getInitialState().page);
  const [sortBy, setSortBy] = useState<keyof Player | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: keyof Player) => {
    if (sortBy === column) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  // Async result state
  const [result, setResult] = useState<SearchResult>({ players: [], total: 0 });
  /** `true` on first paint so the table never shows an empty state before the mount search runs. */
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchAc = useRef<AbortController | null>(null);

  useEffect(() => () => searchAc.current?.abort(), []);

  // Updating the URL when the query, status, or page changes(state)
  useEffect(() => {
    const params = new URLSearchParams();
  
    if (query) params.set("q", query);
    if (status !== "all") params.set("status", status);
    if (currentPage > 1) params.set("page", String(currentPage));
  
    const search = params.toString();
    const newUrl = search
      ? `${window.location.pathname}?${search}`
      : window.location.pathname;
    window.history.replaceState({}, "", newUrl);
  }, [query, status, currentPage]);


  // Adding Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      runSearch(1); // Added the page parameter to the runSearch function to ensure the search is run on the first page
    }, 500);
    return () => clearTimeout(timer); // cleanup cancels the previous timer
  }, [query, status]); //removed Current Page because it is not needed for debounce , bad for pagination

  const runSearch = async (page: number = currentPage, overrideQuery?: string) => {
    const effectiveQuery = overrideQuery ?? query;
    searchAc.current?.abort();
    const ac = new AbortController();
    searchAc.current = ac;

    setLoading(true);
    setError(null);
    try {
      const data = await searchPlayers({
        query: effectiveQuery,
        page,
        pageSize: PLAYERS_PER_PAGE,
        status,
        signal: ac.signal,
      });
      if (ac.signal.aborted) return;

      const totalPages = Math.max(1, Math.ceil(data.total / PLAYERS_PER_PAGE));
      const safePage = Math.min(Math.max(page, 1), totalPages);
      if (safePage !== page) {
        setCurrentPage(safePage);
        return runSearch(safePage, effectiveQuery);
      }
      setResult(data);
      sessionStorage.setItem(STORAGE_KEY, effectiveQuery);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      if (!ac.signal.aborted) setLoading(false);
    }
  };
  // Run search on mount with the restored query
  useEffect(() => {
    runSearch(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setCurrentPage(1);
  };

  // Run search immediately (for pressing the Go button)
  const handleImmediateSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setCurrentPage(1);
    void runSearch(1, searchQuery);
  };

  const handleStatusChange = (newStatus: 'all' | 'online' | 'offline') => {
    setStatus(newStatus);
    setCurrentPage(1);
  };

  const handleNext = () => {
    const next = currentPage + 1;
    setCurrentPage(next);
    runSearch(next);
  };

  const handlePrev = () => {
    const prev = currentPage - 1;
    setCurrentPage(prev);
    runSearch(prev);
  };

  const totalPages = Math.max(1, Math.ceil(result.total / PLAYERS_PER_PAGE));

  const sortedPlayers = [...result.players];

  if (sortBy) {
    sortedPlayers.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
  
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
  
      return sortDirection === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">RealPlay Back Office</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Player Search</p>
          </div>
          <button onClick={toggle} aria-label="Toggle theme" className="p-2 rounded hover:bg-muted transition-colors">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-4">

        <SearchBar 
        onSearch={handleSearch}
        onSubmit={handleImmediateSearch}
        initialValue={query} 
        />

        <StatusFilter value={status} onChange={handleStatusChange} />

        {error ? (
        <div className="p-4 border border-destructive/40 bg-destructive/10 rounded text-destructive text-sm">
          {error}
          <button
            className="underline ml-2"
            onClick={() => runSearch(currentPage)}
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <PlayerTable
            players={sortedPlayers}
            loading={loading}
            onSort={handleSort}
            sortBy={sortBy}
            sortDirection={sortDirection}
          />

          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            totalResults={result.total} 
            pageSize={PLAYERS_PER_PAGE} 
            onNext={handleNext} 
            onPrev={handlePrev} 
          />
        </>
      )}

      </main>
    </div>
  );
}

export default App;
