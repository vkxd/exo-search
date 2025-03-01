
import React, { useState } from 'react';
import SideNavigation from './SideNavigation';
import { ChevronRight } from 'lucide-react';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-sidebar-primary/20 rounded-lg animate-float"
            style={{
              width: `${Math.random() * 80 + 20}px`,
              height: `${Math.random() * 80 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100 + 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
              opacity: Math.random() * 0.5
            }}
          />
        ))}
      </div>
      
      <SideNavigation collapsed={sidebarCollapsed} />
      
      <button
        onClick={toggleSidebar}
        className={`absolute top-6 z-20 bg-sidebar-primary/80 hover:bg-sidebar-primary text-white rounded-r-full p-1 shadow-lg transition-all duration-300 ${
          sidebarCollapsed ? 'left-16' : 'left-64 sm:left-64'
        }`}
      >
        <ChevronRight className={`w-6 h-6 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-0' : 'rotate-180'}`} />
      </button>
      
      <main className={`transition-all duration-300 w-full min-h-screen ${sidebarCollapsed ? 'ml-16' : 'ml-16 sm:ml-64'}`}>
        <div className="page-container animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
