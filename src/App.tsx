import { useState, useEffect } from 'react';
import { Sun, Moon, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_PLAYERS } from '@/data/mockPlayers';
import { Player } from '@/types/player';
import SearchBar from '@/components/SearchBar';
import PlayerTable from '@/components/PlayerTable';
import Pagination from '@/components/Pagination';

const PLAYERS_PER_PAGE = 10;
const STORAGE_KEY = 'player-search-query';

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

function useSearchParams() {
  const getParams = () => new URLSearchParams(window.location.search);

  const setParam = (key: string, value: string) => {
    const params = getParams();
    if (value) params.set(key, value);
    else params.delete(key);
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState(null, '', newUrl);
  };

  return { getParams, setParam };
}

function App() {
  const { dark, toggle } = useTheme();
  const { getParams, setParam } = useSearchParams();

  const [query, setQuery] = useState<string>(() => {
    const urlQ = getParams().get('q');
    if (urlQ) return urlQ;
    return localStorage.getItem(STORAGE_KEY) ?? '';
  });

  const [currentPage, setCurrentPage] = useState<number>(() => {
    const p = parseInt(getParams().get('page') ?? '1', 10);
    return isNaN(p) || p < 1 ? 1 : p;
  });

  const filteredPlayers: Player[] = MOCK_PLAYERS.filter((player) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      player.playerId.toLowerCase().includes(q) ||
      player.email.toLowerCase().includes(q) ||
      player.name.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredPlayers.length / PLAYERS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PLAYERS_PER_PAGE;
  const playersOnPage = filteredPlayers.slice(startIndex, startIndex + PLAYERS_PER_PAGE);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setCurrentPage(1);
    setParam('q', searchQuery);
    setParam('page', '');
    localStorage.setItem(STORAGE_KEY, searchQuery);
  };

  const handleNext = () => {
    const next = safePage + 1;
    setCurrentPage(next);
    setParam('page', String(next));
  };

  const handlePrev = () => {
    const prev = safePage - 1;
    setCurrentPage(prev);
    setParam('page', String(prev));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold leading-tight">RealPlay Back Office</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <Search className="h-3 w-3" />
              Player Search
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-4">
        <SearchBar onSearch={handleSearch} initialValue={query} />
        <PlayerTable players={playersOnPage} />
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          totalResults={filteredPlayers.length}
          pageSize={PLAYERS_PER_PAGE}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </main>
    </div>
  );
}

export default App;
