import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Heart, PenTool, ArrowRight, Shuffle } from 'lucide-react';

const LandingPage = ({ onStart }) => {
  const [isShuffling, setIsShuffling] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const descriptiveWords = [
    'magical', 'enchanting', 'whimsical', 'dreamy', 'ethereal',
    'captivating', 'mesmerizing', 'breathtaking', 'sublime', 'radiant'
  ];

  const handleShuffle = () => {
    setIsShuffling(true);
    setTimeout(() => {
      setCurrentWordIndex((prev) => (prev + 1) % descriptiveWords.length);
      setIsShuffling(false);
    }, 600);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with new color palette */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-book-pattern opacity-20"
          style={{
            backgroundSize: '150px',
            backgroundRepeat: 'repeat',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-periwinkle-100 via-space-indigo-50 to-turf-green-50"></div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 z-10">
        {/* Floating icons */}
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 text-tropical-mint/30"
        >
          <BookOpen className="w-12 h-12" />
        </motion.div>
        
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-20 text-watermelon/30"
        >
          <Heart className="w-8 h-8" />
        </motion.div>
        
        <motion.div
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 left-20 text-periwinkle/30"
        >
          <PenTool className="w-10 h-10" />
        </motion.div>

        {/* Decorative squiggles */}
        <svg className="absolute top-32 left-1/4 w-32 h-16 text-turf-green/20" viewBox="0 0 100 50">
          <path
            d="M10,25 Q25,5 50,25 T90,25"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        
        <svg className="absolute bottom-20 right-1/3 w-24 h-12 text-watermelon/20" viewBox="0 0 100 50">
          <path
            d="M10,25 Q25,45 50,25 T90,25"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        {/* Blur circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-tropical-mint rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-watermelon rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 right-1/3 w-56 h-56 bg-periwinkle rounded-full filter blur-3xl opacity-20"></div>
      </div>

      {/* Main content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8"
        >
          {/* Sparkles around title */}
          <div className="relative inline-block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-8 -left-8 text-space-indigo/40"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
            
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 -right-8 text-tropical-mint/40"
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-6xl md:text-7xl font-serif font-bold text-space-indigo mb-4"
            >
              Petal Pages
            </motion.h1>
            
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-watermelon/40"
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.div>

        {/* Tagline with shuffle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center mb-12"
        >
          <p className="text-xl md:text-2xl text-space-indigo/70 font-handwritten mb-4">
            Your {descriptiveWords[currentWordIndex]} digital reading journal
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShuffle}
            className="text-space-indigo/50 hover:text-space-indigo/70 transition-colors"
            title="Shuffle description"
          >
            <Shuffle className={`w-5 h-5 ${isShuffling ? 'animate-spin' : ''}`} />
          </motion.button>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '200px' }}
          transition={{ duration: 1, delay: 0.6 }}
          className="h-0.5 bg-gradient-to-r from-transparent via-turf-green to-transparent mb-12"
        />

        {/* Start button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="group relative px-10 py-5 bg-gradient-to-r from-space-indigo via-turf-green to-tropical-mint text-[#2d3047] font-handwritten text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 border-4 border-[#2d3047] backdrop-blur-sm"
        >
          <span className="relative z-10 flex items-center gap-3">
            Begin Your Journey
            <motion.div
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#2d3047] bg-tropical-mint rounded-full p-2"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </span>
          
          {/* Enhanced glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-space-indigo via-turf-green to-tropical-mint opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-300"></div>
          
          {/* Multiple sparkles */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -top-3 -right-3 text-tropical-mint"
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
          
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-3 -left-3 text-watermelon"
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
          
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 -left-8 text-periwinkle"
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        </motion.button>

        {/* Bottom decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-8"
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-space-indigo/30"
          >
            <BookOpen className="w-6 h-6" />
          </motion.div>
          
          <motion.div
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-watermelon/30"
          >
            <Heart className="w-5 h-5" />
          </motion.div>
          
          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-tropical-mint/30"
          >
            <PenTool className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
