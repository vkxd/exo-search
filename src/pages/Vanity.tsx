
import React, { useState } from 'react';
import { toast } from 'sonner';
import SearchBar from '../components/SearchBar';
import VanityResult from '../components/VanityResult';
import { handleVanityCheck } from '../api/discord-api-handler';

const Vanity = () => {
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vanity, setVanity] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [serverInfo, setServerInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    // Clear previous results and errors
    setError(null);
    setLoading(true);
    setVanity(query);
    
    try {
      // Validate input as a potential vanity URL
      if (!/^[a-zA-Z0-9-]{2,32}$/.test(query)) {
        throw new Error('Invalid vanity code. Use 2-32 letters, numbers, or hyphens.');
      }
      
      // Call API handler
      const result = await handleVanityCheck(query, 'user-ip'); // In a real app, get the user's IP
      
      setIsAvailable(result.isAvailable);
      setServerInfo(result.serverInfo);
      setSearchPerformed(true);
    } catch (err) {
      console.error('Vanity check error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      toast.error(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="w-full max-w-4xl mx-auto text-center mb-4">
        <h1 className="text-3xl font-bold mb-2 text-gradient">Vanity URL Checker</h1>
        <p className="text-gray-300">Check if a Discord vanity URL is available for your server</p>
      </div>
      
      <SearchBar 
        placeholder="Enter vanity here" 
        onSearch={handleSearch}
      />
      
      {loading && (
        <div className="mt-10 flex flex-col items-center">
          <div className="w-8 h-8 border-t-2 border-white rounded-full animate-spin mb-4"></div>
          <p className="text-gray-300">Checking vanity availability...</p>
        </div>
      )}
      
      {error && !loading && (
        <div className="mt-10 panel p-6 text-center max-w-lg">
          <h3 className="text-xl font-semibold mb-2 text-red-400">Error</h3>
          <p className="text-gray-300">{error}</p>
        </div>
      )}
      
      {searchPerformed && !loading && !error && (
        <VanityResult
          vanity={vanity}
          isAvailable={isAvailable}
          serverInfo={serverInfo}
        />
      )}
      
      {!searchPerformed && !loading && !error && (
        <div className="mt-10 panel p-6 text-center max-w-lg">
          <p className="text-gray-300">Enter a vanity URL to check its availability for your Discord server.</p>
          <p className="text-gray-400 text-sm mt-2">Example: discord</p>
        </div>
      )}
    </div>
  );
};

export default Vanity;
