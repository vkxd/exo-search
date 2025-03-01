
import React, { useState } from 'react';
import { Download, Info } from 'lucide-react';
import { toast } from 'sonner';

interface Badge {
  id: string;
  name: string;
  icon: string;
}

interface UserData {
  username: string;
  id: string;
  avatar: string;
  banner?: string;
  bio?: string;
  badges: Badge[];
}

interface UserPanelProps {
  user: UserData;
  isSignedIn: boolean;
}

const UserPanel: React.FC<UserPanelProps> = ({ user, isSignedIn }) => {
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);

  const handleSave = (type: 'avatar' | 'banner') => {
    if (!isSignedIn) {
      setShowSignInPrompt(true);
      return;
    }
    
    // In a real app, this would save to the user's account
    toast.success(`${type === 'avatar' ? 'Profile picture' : 'Banner'} saved successfully!`);
  };

  const closePrompt = () => {
    setShowSignInPrompt(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-scale-in">
      {/* Banner */}
      {user.banner && (
        <div className="relative w-full h-48 rounded-t-lg overflow-hidden group">
          <img 
            src={user.banner} 
            alt="User banner" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button 
            onClick={() => handleSave('banner')}
            className="absolute bottom-4 right-4 p-2 rounded-full glass-panel opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/20"
          >
            <Download className="w-5 h-5 text-white" />
          </button>
        </div>
      )}
      
      <div className="panel rounded-lg relative">
        {/* User Info */}
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Avatar */}
          <div className="relative -mt-16 md:-mt-20 z-10">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background group">
              <img 
                src={user.avatar} 
                alt={user.username} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                onClick={() => handleSave('avatar')}
              />
            </div>
            <button 
              onClick={() => handleSave('avatar')}
              className="absolute bottom-1 right-1 p-2 rounded-full glass-panel opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/20"
            >
              <Download className="w-4 h-4 text-white" />
            </button>
          </div>
          
          {/* User Details */}
          <div className="flex flex-col items-center md:items-start gap-2 md:pt-6">
            <h2 className="text-2xl font-bold text-gradient">{user.username}</h2>
            <p className="text-gray-300 text-sm">ID: {user.id}</p>
            
            {user.bio && (
              <div className="mt-2 max-w-md text-center md:text-left">
                <p className="text-gray-300">{user.bio}</p>
              </div>
            )}
            
            {/* Badges */}
            {user.badges.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm text-gray-400 mb-2">Badges:</h3>
                <div className="flex flex-wrap gap-2">
                  {user.badges.map((badge) => (
                    <div key={badge.id} className="relative group/badge">
                      <div className="w-9 h-9 rounded-full glass-panel flex items-center justify-center hover-scale">
                        <img src={badge.icon} alt={badge.name} className="w-6 h-6" />
                      </div>
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="glass-panel px-3 py-1 rounded-md text-xs whitespace-nowrap">
                          {badge.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Sign In Prompt */}
      {showSignInPrompt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="panel max-w-md w-full mx-4 animate-scale-in">
            <h3 className="text-xl font-semibold mb-4">Sign In Required</h3>
            <p className="text-gray-300 mb-6">Please make an account to continue saving images.</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={closePrompt}
                className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <a 
                href="/signin" 
                className="px-4 py-2 rounded-lg bg-sidebar-primary hover:bg-opacity-90 transition-colors"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPanel;
