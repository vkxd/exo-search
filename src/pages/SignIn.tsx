
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';

const SignIn = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Mock authentication
    toast.success(`Successfully ${isSignIn ? 'signed in' : 'signed up'}!`);
    
    // Navigate to profile after successful sign in
    navigate('/profile');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto py-10 animate-fade-in">
      <div className="w-full text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-white glow-text animate-pulse">
          {isSignIn ? 'Sign In' : 'Create Account'}
        </h1>
        <p className="text-gray-300">
          {isSignIn 
            ? 'Sign in to save profile pictures and more' 
            : 'Create an account to save profile pictures and more'}
        </p>
      </div>
      
      <div className="panel w-full animate-scale-in">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm text-gray-300">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full py-2 pl-10 pr-4 rounded-lg glass-panel text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                placeholder="Enter your username"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm text-gray-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 pl-10 pr-4 rounded-lg glass-panel text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                placeholder="Enter your password"
              />
            </div>
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
