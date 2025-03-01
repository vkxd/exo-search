
import React, { useState } from 'react';
import { toast } from 'sonner';
import SearchBar from '../components/SearchBar';
import UserPanel from '../components/UserPanel';
import { handleUserSearch } from '../api/discord-api-handler';

const Users = () => {
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    // Clear previous results and errors
    setError(null);
    setLoading(true);
    
    try {
      // Validate input as a Discord user ID (snowflake)
      if (!/^\d{17,20}$/.test(query)) {
        throw new Error('Invalid Discord user ID. Please enter a valid ID (17-20 digits).');
      }
      
      // Call API handler
      const result = await handleUserSearch(query, 'user-ip'); // In a real app, get the user's IP
      
      setUserData(result);
      setSearchPerformed(true);
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      toast.error(err instanceof Error ? err.message : 'An unknown error occurred');
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full animate-fade-in">
      <div className="w-full max-w-4xl mx-auto text-center mb-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-white glow-text animate-pulse">User Search</h1>
        <p className="text-gray-300">Enter a Discord user ID to view their profile</p>
      </div>
      
      <SearchBar 
        placeholder="Enter a Discord user ID" 
        onSearch={handleSearch}
        className="animate-scale-in"
      />
      
      {loading && (
        <div className="mt-10 flex flex-col items-center animate-pulse">
          <div className="w-8 h-8 border-t-2 border-white rounded-full animate-spin mb-4"></div>
          <p className="text-gray-300">Searching for user...</p>
        </div>
      )}
      
      {error && !loading && (
        <div className="mt-10 panel p-6 text-center max-w-lg animate-scale-in">
          <h3 className="text-xl font-semibold mb-2 text-red-400">Error</h3>
          <p className="text-gray-300">{error}</p>
          <p className="text-sm text-gray-400 mt-4">
            Note: The Discord public API may return 401 errors. If this happens, we'll show you mock data instead.
          </p>
        </div>
      )}
      
      {searchPerformed && !loading && userData && !error && (
        <UserPanel user={userData} isSignedIn={false} />
      )}
      
      {searchPerformed && !loading && !userData && !error && (
        <div className="mt-10 panel p-6 text-center animate-scale-in">
          <h3 className="text-xl font-semibold mb-2">User Not Found</h3>
          <p className="text-gray-300">We couldn't find a user with that ID.</p>
        </div>
      )}
      
      {!searchPerformed && !loading && !error && (
        <div className="mt-10 panel p-6 text-center max-w-lg animate-enter">
          <p className="text-gray-300">Enter a Discord user ID to view profile information, badges, and more.</p>
          <p className="text-gray-400 text-sm mt-2">
            This feature uses Discord's public API with a fallback to mock data if the API request fails.
          </p>
        </div>
      )}
    </div>
  );
};

export default Users;
