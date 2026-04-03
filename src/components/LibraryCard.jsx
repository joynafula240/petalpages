import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Image as ImageIcon } from 'lucide-react';

const LibraryCard = ({ book, onClick, index }) => {
  const [imageError, setImageError] = useState(false);

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

  const coverColors = [
    'bg-gradient-to-br from-space-indigo to-periwinkle',
    'bg-gradient-to-br from-turf-green to-tropical-mint',
    'bg-gradient-to-br from-watermelon to-tropical-mint',
    'bg-gradient-to-br from-periwinkle to-space-indigo',
    'bg-gradient-to-br from-tropical-mint to-turf-green',
    'bg-gradient-to-br from-watermelon to-periwinkle',
  ];

  const getCoverColor = () => {
    return coverColors[index % coverColors.length];
  };

  const handleImageError = () => {
    setImageError(true);
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
      className="cursor-pointer"
    >
      <div className="bg-white/80 backdrop-blur-sm soft-rounded shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Book Cover/Image */}
        <div className={`h-48 ${getCoverColor()} relative overflow-hidden`}>
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
                <ImageIcon className="w-12 h-12 text-space-indigo/40 mx-auto mb-2" />
                <div className="text-periwinkle/60 font-handwritten text-sm">Add Cover Image</div>
              </div>
            </div>
          )}
          {/* Decorative corner */}
          <div className="absolute top-2 right-2 w-8 h-8 bg-white/10 rounded-full backdrop-blur-sm"></div>
        </div>
        
        {/* Book Info */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-serif font-bold text-lg text-space-indigo mb-2 line-clamp-2">
            {book.title}
          </h3>
          
          {/* Author */}
          <p className="text-space-indigo/60 font-handwritten text-sm mb-3">
            by {book.author}
          </p>
          
          {/* Star Rating */}
          <div className="flex gap-1">
            {renderStars(book.rating || 0)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LibraryCard;
