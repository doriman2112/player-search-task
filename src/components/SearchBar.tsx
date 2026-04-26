import React from 'react';

/**
 * TODO: Implement SearchBar Component
 * 
 * Requirements:
 * - Text input that accepts player_id, email, or phone
 * - Placeholder text: "player_id, email, phone"
 * - "Go" button to trigger search
 * - Pass search query to parent via onSearch callback
 * 
 * Props interface:
 * interface SearchBarProps {
 *   onSearch: (query: string) => void;
 * }
 * 
 * Bonus features (optional):
 * - Handle Enter key to trigger search
 * - Validate input format
 * - Show which search type was detected
 * - Disable button when input is empty
 */

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  // TODO: Implement component logic here

  return (
    <div>
      <p>TODO: Implement SearchBar component</p>
      {/* Add your implementation here */}
    </div>
  );
};

export default SearchBar;
