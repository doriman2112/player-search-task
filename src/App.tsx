import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { searchPlayers, SearchResult } from '@/api/searchPlayers';
// NOTE: The theme toggle button below uses a plain <button> until you add ShadCN.
// Once you run `npx shadcn@latest add button` you can swap it for <Button>.
// TODO: Once you create your components, import them here:
// import SearchBar from '@/components/SearchBar';
// import PlayerTable from '@/components/PlayerTable';
// import Pagination from '@/components/Pagination';

const PLAYERS_PER_PAGE = 10;
const STORAGE_KEY = 'player-search-query';

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

  // Search state
  const [query, setQuery] = useState<string>(
    () => localStorage.getItem(STORAGE_KEY) ?? ''
  );
  const [status, setStatus] = useState<'all' | 'online' | 'offline'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Async result state
  const [result, setResult] = useState<SearchResult>({ players: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: The search input should NOT fire a request on every keystroke.
  // Implement debouncing so the API is only called after the user has
  // stopped typing for ~500ms. You can use a plain useEffect + setTimeout,
  // or a utility like `use-debounce`.
  //
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     runSearch();
  //   }, 500);
  //   return () => clearTimeout(timer); // cleanup cancels the previous timer
  // }, [query, status, currentPage]);

  const runSearch = async (page = currentPage) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchPlayers({
        query,
        page,
        pageSize: PLAYERS_PER_PAGE,
        status,
      });
      setResult(data);
      localStorage.setItem(STORAGE_KEY, query);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Run search on mount with the restored query
  useEffect(() => {
    runSearch(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setCurrentPage(1);
    // TODO: With debounce wired up via useEffect this explicit call may not
    // be needed, but keeping a "Go" button that calls runSearch() directly
    // is good UX for users who want instant results.
    runSearch(1);
  };

  const handleStatusChange = (newStatus: 'all' | 'online' | 'offline') => {
    setStatus(newStatus);
    setCurrentPage(1);
    // TODO: trigger search with updated status
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

        {/* TODO: Replace with <SearchBar> and a status filter (All / Online / Offline) */}
        <div className="p-4 border border-dashed border-border rounded text-muted-foreground text-sm space-y-1">
          <p>TODO: &lt;SearchBar onSearch={'{handleSearch}'} initialValue={'{query}'} /&gt;</p>
          <p>TODO: Status filter — &lt;select&gt; or &lt;Tabs&gt; that calls handleStatusChange()</p>
        </div>

        {/* TODO: Replace with <PlayerTable players={result.players} /> */}
        {/* Also handle the loading and error states below */}
        {error && (
          <div className="p-4 border border-destructive/40 bg-destructive/10 rounded text-destructive text-sm">
            {error} <button className="underline ml-2" onClick={() => runSearch()}>Retry</button>
          </div>
        )}
        <div className="p-4 border border-dashed border-border rounded text-muted-foreground text-sm space-y-1">
          <p>TODO: &lt;PlayerTable players={'{result.players}'} loading={'{loading}'} /&gt;</p>
          <p>Hint: show a loading skeleton or spinner when loading=true</p>
          <p>Currently: {loading ? 'loading…' : `${result.total} results`}</p>
        </div>

        {/* TODO: Replace with <Pagination> */}
        <div className="p-4 border border-dashed border-border rounded text-muted-foreground text-sm">
          <p>TODO: &lt;Pagination currentPage={'{currentPage}'} totalPages={'{totalPages}'} totalResults={'{result.total}'} pageSize={'{PLAYERS_PER_PAGE}'} onNext={'{handleNext}'} onPrev={'{handlePrev}'} /&gt;</p>
        </div>
      </main>
    </div>
  );
}

export default App;
