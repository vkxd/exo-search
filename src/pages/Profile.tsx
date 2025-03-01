
import React, { useState } from 'react';
import { User, Settings, LogOut, Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [savedItems, setSavedItems] = useState([
    {
      id: 1,
      type: 'avatar',
      url: 'https://cdn.discordapp.com/avatars/123456789012345678/abcdef1234567890.png',
      username: 'DiscordUser1',
      savedAt: new Date().toISOString()
    },
    {
      id: 2,
      type: 'banner',
      url: 'https://cdn.discordapp.com/banners/123456789012345678/abcdef1234567890.png',
      username: 'DiscordUser2',
      savedAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
    }
  ]);
  
  const [activeTab, setActiveTab] = useState('saved');
  
  const handleDeleteItem = (id: number) => {
    setSavedItems(savedItems.filter(item => item.id !== id));
    toast.success('Item deleted successfully');
  };
  
  const handleDownloadItem = (url: string) => {
    // In a real app, this would download the image
    toast.success('Download started');
    
    // Simulate download by opening in new tab
    window.open(url, '_blank');
  };
  
  const handleLogout = () => {
    toast.success('Logged out successfully');
    // In a real app, this would log the user out
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 animate-fade-in">
      <div className="w-full text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-white glow-text animate-pulse">Your Profile</h1>
        <p className="text-gray-300">Manage your saved items and account settings</p>
      </div>
      
      {/* Profile Header */}
      <div className="panel p-6 animate-scale-in">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-2xl font-bold text-gradient">ExoUser</h2>
            <p className="text-gray-400">Joined {new Date().toLocaleDateString()}</p>
            
            <div className="flex gap-3 mt-4">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 glass-panel px-4 py-2 rounded-lg hover:bg-white/10 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
              
              <button className="flex items-center gap-2 glass-panel px-4 py-2 rounded-lg hover:bg-white/10 transition-all">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button 
          className={`px-4 py-2 transition-colors ${activeTab === 'saved' ? 'text-white border-b-2 border-sidebar-primary' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('saved')}
        >
          Saved Items
        </button>
        <button 
          className={`px-4 py-2 transition-colors ${activeTab === 'history' ? 'text-white border-b-2 border-sidebar-primary' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('history')}
        >
          Search History
        </button>
      </div>
      
      {/* Saved Items */}
      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-fade-in">
          {savedItems.map((item) => (
            <div key={item.id} className="panel group hover-scale overflow-hidden relative">
              <img 
                src={item.url} 
                alt={`${item.username}'s ${item.type}`}
                className="w-full aspect-square object-cover rounded-lg"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-bold">{item.username}</h3>
                <p className="text-gray-300 text-sm">{item.type === 'avatar' ? 'Profile Picture' : 'Banner'}</p>
                
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => handleDownloadItem(item.url)}
                    className="p-2 rounded-full glass-panel hover:bg-white/20 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-2 rounded-full glass-panel hover:bg-white/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {savedItems.length === 0 && (
            <div className="col-span-full panel p-8 text-center">
              <p className="text-gray-300">You haven't saved any items yet.</p>
              <Link to="/users" className="text-sidebar-primary hover:underline mt-2 inline-block">
                Start by searching for a user
              </Link>
            </div>
          )}
        </div>
      )}
      
      {/* Search History */}
      {activeTab === 'history' && (
        <div className="panel p-6 animate-fade-in">
          <p className="text-gray-300 text-center">Your search history will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
