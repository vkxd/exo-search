
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full py-3 px-12 rounded-full glass-panel text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
        />
        <button 
          type="submit" 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-300"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
