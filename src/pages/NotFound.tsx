
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-6 px-4">
      <h1 className="text-6xl font-bold text-gradient">404</h1>
      <p className="text-xl text-gray-300 text-center">Oops! The page you're looking for doesn't exist.</p>
      
      <Link 
        to="/" 
        className="button-primary flex items-center gap-2 mt-4"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
