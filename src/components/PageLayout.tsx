
import React from 'react';
import SideNavigation from './SideNavigation';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <SideNavigation />
      <main className="ml-16 sm:ml-64 w-full min-h-screen">
        <div className="page-container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
