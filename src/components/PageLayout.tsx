
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
    <div className="flex min-h-screen bg-background relative">
      <SideNavigation collapsed={sidebarCollapsed} />
      
      <button
        onClick={toggleSidebar}
        className="absolute top-6 left-0 z-20 transform translate-x-16 sm:translate-x-64 bg-sidebar-primary/80 hover:bg-sidebar-primary text-white rounded-r-full p-1 shadow-lg transition-all duration-300"
        style={{
          transform: sidebarCollapsed ? 'translateX(4rem)' : 'translateX(16rem)',
          '@media (min-width: 640px)': {
            transform: sidebarCollapsed ? 'translateX(4rem)' : 'translateX(16rem)',
          }
        }}
      >
        <ChevronRight className={`w-6 h-6 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-0' : 'rotate-180'}`} />
      </button>
      
      <main className={`transition-all duration-300 w-full min-h-screen ${sidebarCollapsed ? 'ml-16' : 'ml-16 sm:ml-64'}`}>
        <div className="page-container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
