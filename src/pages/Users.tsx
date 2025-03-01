
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import UserPanel from '../components/UserPanel';

// Mock badges
const mockBadges = [
  { id: '1', name: 'Discord Staff', icon: 'https://cdn.discordapp.com/emojis/314003252830011395.png' },
  { id: '2', name: 'Verified Bot Developer', icon: 'https://cdn.discordapp.com/emojis/780794138227146812.png' },
  { id: '3', name: 'Early Supporter', icon: 'https://cdn.discordapp.com/emojis/585828293445500936.png' },
];

const Users = () => {
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const handleSearch = (query: string) => {
    setLoading(true);
    
    // Mock API call with timeout
    setTimeout(() => {
      // Mock user data - in a real app, this would come from an API
      const mockUserData = {
        username: query,
        id: '123456789012345678',
        avatar: 'https://i.pravatar.cc/300',
        banner: 'https://picsum.photos/1000/300',
        bio: 'This is a mock bio for demonstration purposes. In a real app, this would come from the Discord API.',
        badges: mockBadges,
      };
      
      setUserData(mockUserData);
      setSearchPerformed(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="w-full max-w-4xl mx-auto text-center mb-4">
        <h1 className="text-3xl font-bold mb-2 text-gradient">User Search</h1>
        <p className="text-gray-300">Enter a Discord username or user ID to view their profile</p>
      </div>
      
      <SearchBar 
        placeholder="Enter a user or user ID" 
        onSearch={handleSearch}
      />
      
      {loading && (
        <div className="mt-10 flex flex-col items-center">
          <div className="w-8 h-8 border-t-2 border-white rounded-full animate-spin mb-4"></div>
          <p className="text-gray-300">Searching for user...</p>
        </div>
      )}
      
      {searchPerformed && !loading && userData && (
        <UserPanel user={userData} isSignedIn={false} />
      )}
      
      {searchPerformed && !loading && !userData && (
        <div className="mt-10 panel p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">User Not Found</h3>
          <p className="text-gray-300">We couldn't find a user with that username or ID.</p>
        </div>
      )}
      
      {!searchPerformed && !loading && (
        <div className="mt-10 panel p-6 text-center max-w-lg">
          <p className="text-gray-300">Enter a Discord username or user ID to view profile information, badges, and more.</p>
        </div>
      )}
    </div>
  );
};

export default Users;
