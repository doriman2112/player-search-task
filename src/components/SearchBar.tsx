import { Player } from '@/types/player';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

// TODO: Implement the SearchBar component
//
// Requirements:
// - Text input with placeholder "player_id, email, phone"
// - "Go" button that triggers onSearch(query) immediately
// - Auto-search as the user types — but not on every keystroke.
//   See Edge Case #1 in the README (debouncing).
// - Disable the Go button when the input is empty
//
// Available ShadCN components (already installed):
//   import { Input } from '@/components/ui/input';
//   import { Button } from '@/components/ui/button';
//
// Available icons (lucide-react is installed):
//   import { Search } from 'lucide-react';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '' }) => {
  // TODO: implement

  return (
    <div>
      <p className="text-muted-foreground text-sm">
        TODO: Implement SearchBar — see requirements above
      </p>
    </div>
  );
};

export default SearchBar;
