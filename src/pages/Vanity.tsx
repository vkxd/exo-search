
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import VanityResult from '../components/VanityResult';

const Vanity = () => {
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vanity, setVanity] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [serverInfo, setServerInfo] = useState<any>(null);

  const handleSearch = (query: string) => {
    setLoading(true);
    setVanity(query);
    
    // Mock API call with timeout
    setTimeout(() => {
      // Randomly decide if the vanity is available (for demo purposes)
      const available = Math.random() > 0.5;
      
      setIsAvailable(available);
      
      if (!available) {
        // Mock server data
        setServerInfo({
          name: 'Demo Server',
          icon: 'https://picsum.photos/200',
          memberCount: Math.floor(Math.random() * 100000) + 1000,
        });
      } else {
        setServerInfo(null);
      }
      
      setSearchPerformed(true);
      setLoading(false);
    }, 1000);
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
      
      {searchPerformed && !loading && (
        <VanityResult
          vanity={vanity}
          isAvailable={isAvailable}
          serverInfo={serverInfo}
        />
      )}
      
      {!searchPerformed && !loading && (
        <div className="mt-10 panel p-6 text-center max-w-lg">
          <p className="text-gray-300">Enter a vanity URL to check its availability for your Discord server.</p>
        </div>
      )}
    </div>
  );
};

export default Vanity;
