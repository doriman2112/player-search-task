import { useState } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
    onSubmit: (query: string) => void;
    initialValue?: string;
  }

export const SearchBar = ({ onSearch, onSubmit, initialValue }: SearchBarProps) => {
    const [query, setQuery] = useState(initialValue || '');

    const handleChange = (value: string) => {
        setQuery(value);
        onSearch(value);
    };

    const handleSubmit = () => {
        if(!query) return;
        onSubmit(query);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-2">
            <input
            className="flex-1 border border-gray-300 rounded"
            type="text"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="player_id, email, phone"
            />
            <button className="p-2 border rounded" onClick={handleSubmit} disabled={!query}>Go</button>
        </div>
    )
}