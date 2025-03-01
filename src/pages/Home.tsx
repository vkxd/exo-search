
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-4rem)] gap-8 px-4">
      <motion.h1 
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="glow-text">Exo</span>
        <span className="text-highlight highlight-glow-text">V1</span>
      </motion.h1>
      
      <motion.p
        className="text-xl text-gray-300 text-center max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Welcome to the Universal Discord Searcher
      </motion.p>
      
      <motion.div
        className="flex flex-col sm:flex-row gap-4 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Link 
          to="/users" 
          className="button-primary flex items-center justify-center gap-2 min-w-40"
        >
          <span>Search Users</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        
        <Link 
          to="/vanity" 
          className="button-primary flex items-center justify-center gap-2 min-w-40"
        >
          <span>Check Vanity URLs</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
      
      <motion.div
        className="absolute bottom-10 left-0 right-0 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <p className="text-sm text-gray-400">Scroll or use navigation to explore</p>
      </motion.div>
    </div>
  );
};

export default Home;
