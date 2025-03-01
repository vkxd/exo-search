
import React, { useState } from 'react';
import { toast } from 'sonner';

const SignIn = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Mock authentication
    toast.success(`Successfully ${isSignIn ? 'signed in' : 'signed up'}!`);
    
    // In a real app, this would handle authentication
    setUsername('');
    setPassword('');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto py-10">
      <div className="w-full text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gradient">
          {isSignIn ? 'Sign In' : 'Create Account'}
        </h1>
        <p className="text-gray-300">
          {isSignIn 
            ? 'Sign in to save profile pictures and more' 
            : 'Create an account to save profile pictures and more'}
        </p>
      </div>
      
      <div className="panel w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm text-gray-300">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-2 px-4 rounded-lg glass-panel text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              placeholder="Enter your username"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm text-gray-300">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 px-4 rounded-lg glass-panel text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              placeholder="Enter your password"
            />
          </div>
          
          <button
            type="submit"
            className="mt-4 w-full py-3 rounded-lg bg-sidebar-primary hover:bg-opacity-90 transition-all font-medium"
          >
            {isSignIn ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-300">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsSignIn(!isSignIn)}
              className="ml-2 text-highlight hover:underline"
            >
              {isSignIn ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
