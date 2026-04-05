import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Image as ImageIcon, Play, Pause, Edit, Trash2, MoreVertical, Clock, BookMarked, GripVertical } from 'lucide-react';
import ReadingTimer from './ReadingTimer';

const LibraryCard = ({ book, onClick, index }) => {
  const [imageError, setImageError] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 transition-colors duration-200 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-space-indigo/30'
        }`}
      />
    ));
  };

  // Genre color coding
  const genreColors = {
    'Fantasy': 'from-purple-500 to-purple-700',
    'Romance': 'from-pink-500 to-rose-700',
    'Mystery': 'from-gray-600 to-gray-800',
    'Sci-Fi': 'from-blue-500 to-cyan-700',
    'Thriller': 'from-red-600 to-red-800',
    'Horror': 'from-gray-800 to-black',
    'Contemporary': 'from-green-500 to-emerald-700',
    'Historical Fiction': 'from-amber-600 to-orange-800',
    'Non-Fiction': 'from-teal-500 to-cyan-700',
    'Biography': 'from-indigo-500 to-blue-700',
    'Self-Help': 'from-yellow-500 to-amber-700',
    'Poetry': 'from-purple-400 to-pink-600',
    'Dystopian': 'from-slate-700 to-slate-900',
    'Adventure': 'from-emerald-500 to-green-700',
    'Young Adult': 'from-blue-400 to-purple-600',
    'Classic Literature': 'from-stone-500 to-stone-700',
    'Gothic Fiction': 'from-gray-700 to-gray-900',
    'Dark Romance': 'from-red-700 to-pink-900',
    'Paranormal': 'from-purple-600 to-indigo-800',
    'Urban Fantasy': 'from-violet-500 to-purple-700',
    'Cozy Mystery': 'from-orange-400 to-red-600',
    'Historical Romance': 'from-rose-500 to-pink-700',
    'Epic Fantasy': 'from-indigo-600 to-purple-800',
    'Space Opera': 'from-blue-600 to-indigo-800',
    'Cyberpunk': 'from-cyan-500 to-blue-700',
    'Steampunk': 'from-amber-600 to-orange-800',
    'Magical Realism': 'from-purple-400 to-pink-500',
    'Literary Fiction': 'from-gray-600 to-gray-800',
    'Memoir': 'from-blue-500 to-indigo-700',
    'True Crime': 'from-red-600 to-gray-800',
    'Psychological Thriller': 'from-purple-700 to-gray-900',
    'Gothic Horror': 'from-gray-800 to-black',
    'Dark Academia': 'from-stone-600 to-stone-800',
    'Cottagecore': 'from-green-400 to-emerald-600',
    'Fairy Tale Retelling': 'from-pink-400 to-purple-600',
    'Witch Fiction': 'from-purple-500 to-indigo-700',
    'Gay Fiction': 'from-rainbow-500 to-rainbow-700',
    'Omegaverse': 'from-red-500 to-pink-700',
    'Queer Romance': 'from-pink-500 to-rose-700',
    'LGBTQ+ Fiction': 'from-rainbow-400 to-rainbow-600'
  };

  const getGenreColor = () => {
    const genres = Array.isArray(book.genres) ? book.genres : (book.genre ? [book.genre] : []);
    const primaryGenre = genres[0] || 'Fantasy';
    return genreColors[primaryGenre] || genreColors['Fantasy'];
  };

  const getReadingProgress = () => {
    if (book.status === 'Completed') return 100;
    if (book.status === 'Reading') {
      // Simple progress calculation based on rating or dates
      return book.rating ? Math.min(book.rating * 20, 90) : 30;
    }
    return 0;
  };

  const getStatusColor = () => {
    switch (book.status) {
      case 'Completed': return 'bg-green-500';
      case 'Reading': return 'bg-blue-500';
      case 'DNF': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const handleQuickAction = (action, e) => {
    e.stopPropagation();
    switch (action) {
      case 'timer':
        setShowTimer(true);
        break;
      case 'edit':
        // Handle quick edit
        console.log(`Quick edit for book: ${book.title}`);
        break;
      case 'more':
        // Handle more options
        console.log(`More options for book: ${book.title}`);
        break;
      default:
        console.log(`Quick action: ${action} for book: ${book.title}`);
    }
  };

  const handleSessionComplete = (session) => {
    console.log('Reading session completed:', session);
    // You could update the book's reading progress here
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('book', JSON.stringify(book));
    e.dataTransfer.effectAllowed = 'copy';
    // Add visual feedback
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    // Remove visual feedback
    e.currentTarget.style.opacity = '1';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ 
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      whileHover={{ 
        scale: 1.05,
        y: -8,
        transition: { duration: 0.2 }
      }}
      onClick={() => onClick(book)}
      onMouseEnter={() => setShowQuickActions(true)}
      onMouseLeave={() => setShowQuickActions(false)}
      className="cursor-pointer relative"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="bg-white/80 backdrop-blur-sm soft-rounded shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
        {/* Drag Indicator */}
        <div className="absolute top-1 left-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="w-4 h-4 text-[#2d3047]/40" />
        </div>
        
        {/* Quick Actions Menu */}
        <AnimatePresence>
          {showQuickActions && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-2 right-2 z-10 flex gap-1"
            >
              <button
                onClick={(e) => handleQuickAction('timer', e)}
                className="p-1.5 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                title="Start Reading Timer"
              >
                <Play className="w-3 h-3 text-[#2d3047]" />
              </button>
              <button
                onClick={(e) => handleQuickAction('edit', e)}
                className="p-1.5 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                title="Quick Edit"
              >
                <Edit className="w-3 h-3 text-[#2d3047]" />
              </button>
              <button
                onClick={(e) => handleQuickAction('more', e)}
                className="p-1.5 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                title="More Options"
              >
                <MoreVertical className="w-3 h-3 text-[#2d3047]" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Book Cover/Image */}
        <div className={`h-48 bg-gradient-to-br ${getGenreColor()} relative overflow-hidden`}>
          {book.cover && !imageError ? (
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-4">
                <ImageIcon className="w-12 h-12 text-white/60 mx-auto mb-2" />
                <div className="text-white/80 font-handwritten text-sm">Add Cover Image</div>
              </div>
            </div>
          )}
          
          {/* Status Badge */}
          <div className="absolute top-2 left-2">
            <div className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor()}`}>
              {book.status || 'Want to Read'}
            </div>
          </div>

          {/* Decorative corner */}
          <div className="absolute top-2 right-2 w-8 h-8 bg-white/10 rounded-full backdrop-blur-sm"></div>
        </div>
        
        {/* Book Info */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-serif font-bold text-lg text-[#2d3047] mb-2 line-clamp-2">
            {book.title}
          </h3>
          
          {/* Author */}
          <p className="text-[#2d3047]/60 font-handwritten text-sm mb-3">
            by {book.author}
          </p>

          {/* Reading Progress Bar */}
          {book.status === 'Reading' && (
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-[#2d3047]/60">Progress</span>
                <span className="text-xs text-[#2d3047]/60">{getReadingProgress()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${getStatusColor()}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${getReadingProgress()}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          )}
          
          {/* Star Rating */}
          <div className="flex gap-1 mb-3">
            {renderStars(book.rating || 0)}
          </div>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-1">
            {(Array.isArray(book.genres) ? book.genres : (book.genre ? [book.genre] : [])).slice(0, 2).map((genre, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-[#c1bddb]/20 text-[#2d3047] text-xs rounded-full font-medium"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Reading Timer Modal */}
      <AnimatePresence>
        {showTimer && (
          <ReadingTimer
            book={book}
            onClose={() => setShowTimer(false)}
            onSessionComplete={handleSessionComplete}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LibraryCard;
