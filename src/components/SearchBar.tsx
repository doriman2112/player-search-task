import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSubmit: (query: string) => void;
  /** Mirrors parent `query`; kept in sync when the parent updates (e.g. clear / URL restore). */
  initialValue?: string;
}

export const SearchBar = ({ onSearch, onSubmit, initialValue }: SearchBarProps) => {
  const [query, setQuery] = useState(() => initialValue ?? "");

  useEffect(() => {
    setQuery(initialValue ?? "");
  }, [initialValue]);

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const handleSubmit = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    onSubmit(trimmed);
  };

  return (
    <form
      className="flex flex-col gap-2 sm:flex-row sm:items-center"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Input
        className="min-w-0 flex-1"
        type="search"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="player_id, email, phone"
        enterKeyHint="search"
      />
      <Button type="submit" disabled={!query.trim()}>
        Go
      </Button>
    </form>
  );
};
