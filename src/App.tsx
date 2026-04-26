import { useState } from 'react';
import { MOCK_PLAYERS } from './data/mockPlayers';
import { Player } from './types/player';
// TODO: Uncomment these imports as you implement each component
// import SearchBar from './components/SearchBar';
// import PlayerTable from './components/PlayerTable';
// import Pagination from './components/Pagination';

const PLAYERS_PER_PAGE = 10;

function App() {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter players based on the search query (player ID, email, or phone)
  const filteredPlayers: Player[] = MOCK_PLAYERS.filter((player) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      player.playerId.toLowerCase().includes(q) ||
      player.email.toLowerCase().includes(q) ||
      player.name.toLowerCase().includes(q)
    );
  });

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredPlayers.length / PLAYERS_PER_PAGE));
  const startIndex = (currentPage - 1) * PLAYERS_PER_PAGE;
  const playersOnPage = filteredPlayers.slice(startIndex, startIndex + PLAYERS_PER_PAGE);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <h1 className="text-xl font-semibold text-white">RealPlay Back Office</h1>
        <p className="text-sm text-gray-400">Player Search</p>
      </header>

      <main className="px-6 py-6 max-w-6xl mx-auto space-y-6">
        {/* TODO: Replace this placeholder with your SearchBar component */}
        {/* <SearchBar onSearch={handleSearch} /> */}
        <div className="p-4 border border-dashed border-gray-600 rounded text-gray-500 text-sm">
          TODO: Add &lt;SearchBar onSearch={'{handleSearch}'} /&gt; here
        </div>

        {/* TODO: Replace this placeholder with your PlayerTable component */}
        {/* <PlayerTable players={playersOnPage} /> */}
        <div className="p-4 border border-dashed border-gray-600 rounded text-gray-500 text-sm">
          TODO: Add &lt;PlayerTable players={'{playersOnPage}'} /&gt; here
          <br />
          (currently {playersOnPage.length} players would be shown)
        </div>

        {/* TODO: Replace this placeholder with your Pagination component */}
        {/* <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={handleNext}
          onPrev={handlePrev}
        /> */}
        <div className="p-4 border border-dashed border-gray-600 rounded text-gray-500 text-sm">
          TODO: Add &lt;Pagination currentPage={'{currentPage}'} totalPages={'{totalPages}'} onNext={'{handleNext}'} onPrev={'{handlePrev}'} /&gt; here
        </div>
      </main>
    </div>
  );
}

export default App;
