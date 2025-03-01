
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Hash, Home, LogIn } from 'lucide-react';

const SideNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { path: '/users', label: 'Users', icon: <User className="w-5 h-5" /> },
    { path: '/vanity', label: 'Vanity', icon: <Hash className="w-5 h-5" /> },
    { path: '/signin', label: 'Sign In', icon: <LogIn className="w-5 h-5" /> },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-16 sm:w-64 glass-panel z-10">
      <div className="flex flex-col h-full items-center sm:items-start gap-8 py-8">
        <div className="px-4 py-2 w-full">
          <h2 className="text-xl font-bold hidden sm:block">ExoV1</h2>
        </div>
        
        <nav className="flex flex-col gap-2 w-full px-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 
                ${location.pathname === item.path ? 'bg-white/10' : 'hover:bg-white/5'}`}
            >
              <span className="text-white">{item.icon}</span>
              <span className="text-white hidden sm:block">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SideNavigation;
