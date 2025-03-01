
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch, className = '' }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const clearInput = () => {
    setQuery('');
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full py-3 px-12 rounded-full glass-panel text-white placeholder:text-white/60 
            focus:outline-none focus:ring-2 focus:ring-purple-400/50 
            transition-all duration-300 hover:ring-1 hover:ring-white/10
            ${isFocused ? 'shadow-glow' : ''}`}
        />
        <button 
          type="submit" 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-300"
        >
          <Search className={`w-5 h-5 ${isFocused ? 'text-purple-400' : 'text-white/70'}`} />
        </button>
        {query && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </form>
      <p className="text-xs text-gray-400 mt-2 text-center">
        Example Discord ID: 350984980767670272
      </p>
    </div>
  );
};

export default SearchBar;
