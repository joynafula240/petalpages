import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Sparkles, Feather, Moon } from 'lucide-react';

const LandingPage = ({ onStart }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const libraryQuotes = [
    { text: "A library is a hospital for the mind.", author: "Anonymous" },
    { text: "Libraries store the wisdom of every human age.", author: "Norman Cousins" },
    { text: "A library is not a luxury but one of the necessities of life.", author: "Henry Ward Beecher" },
    { text: "In a library, you could live a thousand lives.", author: "Anonymous" },
    { text: "The only thing you absolutely have to know is the location of the library.", author: "Albert Einstein" }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % libraryQuotes.length);
    }, 4000);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

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
      
      {/* Enhanced Lace Overlay */}
      <div className="lace-overlay"></div>

      {/* Interactive Mouse-Following Sparkles */}
      <div 
        className="fixed pointer-events-none z-30"
        style={{
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
          transition: 'all 0.3s ease-out'
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-10 h-10 text-[#c1bddb]/30" />
        </motion.div>
      </div>

      {/* Animated Floating Books */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Book 1 - Floating upward */}
        <motion.div
          animate={{ 
            y: [-20, -100, -20],
            rotate: [0, 10, -10, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 left-10"
        >
          <BookOpen className="w-12 h-12 text-[#2d3047]/40" />
        </motion.div>

        {/* Book 2 - Gentle drift */}
        <motion.div
          animate={{ 
            x: [0, 30, 0],
            y: [20, -20, 20],
            rotate: [0, -15, 15, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-40 right-20"
        >
          <BookOpen className="w-10 h-10 text-[#c1bddb]/40" />
        </motion.div>

        {/* Book 3 - Circular motion */}
        <motion.div
          animate={{ 
            rotate: 360,
            x: [0, 50, 0, -50, 0],
            y: [0, -30, 0, 30, 0]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-32 left-1/4"
        >
          <BookOpen className="w-8 h-8 text-[#2d3047]/30" />
        </motion.div>

        {/* Book 4 - Slow fall */}
        <motion.div
          animate={{ 
            y: [-50, 50, -50],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/3 right-1/3"
        >
          <BookOpen className="w-14 h-14 text-[#c1bddb]/20" />
        </motion.div>
      </div>

      {/* Gothic Elements */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {/* Floating Quill Pen */}
        <motion.div
          animate={{ 
            y: [-30, 30, -30],
            rotate: [-15, 15, -15]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 left-1/6"
        >
          <Feather className="w-8 h-8 text-[#2d3047]/30" />
        </motion.div>

        {/* Moon Phase */}
        <motion.div
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 right-1/4"
        >
          <Moon className="w-10 h-10 text-[#c1bddb]/40" />
        </motion.div>

        {/* Candlelight flicker effect */}
        <div className="absolute bottom-20 left-1/5">
          <motion.div
            animate={{ 
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-2 h-4 bg-yellow-300/30 rounded-full"
          />
        </div>

        <div className="absolute bottom-32 right-1/6">
          <motion.div
            animate={{ 
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 0.5
            }}
            className="w-2 h-4 bg-yellow-300/25 rounded-full"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Interactive Logo */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-[#2d3047] rounded-full mb-8 shadow-lg cursor-pointer"
          >
            <BookOpen className="w-12 h-12 text-white" />
          </motion.div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#2d3047] mb-4">
            Petal Pages
          </h1>
          
          <p className="text-xl text-[#2d3047]/70 mb-8 max-w-2xl mx-auto">
            Your Personal Reading Journal
          </p>

          {/* Library Quote */}
          <motion.div
            key={currentQuoteIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="mb-12 max-w-2xl mx-auto"
          >
            <p className="text-lg text-[#2d3047]/60 italic font-serif mb-2">
              "{libraryQuotes[currentQuoteIndex].text}"
            </p>
            <p className="text-sm text-[#2d3047]/50">
              — {libraryQuotes[currentQuoteIndex].author}
            </p>
          </motion.div>

          {/* Start Your Journey Button */}
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(45, 48, 71, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#2d3047] text-white text-lg font-medium rounded-full hover:bg-[#2d3047]/90 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Your Journey
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
