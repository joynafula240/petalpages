import React from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar, BookOpen } from 'lucide-react';

const BookCard = ({ book, onClick }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'filled' : ''}`}
        fill={i < rating ? 'currentColor' : 'none'}
      />
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-evergreen text-white';
      case 'Reading':
        return 'bg-dark-teal text-white';
      case 'DNF':
        return 'bg-dry-sage text-midnight-violet';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="book-card group"
      onClick={onClick}
    >
      {/* Book Cover */}
      <div className="relative mb-4 overflow-hidden soft-rounded">
        <img
          src={book.cover || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop'}
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Status Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 soft-rounded text-xs font-semibold ${getStatusColor(book.status)}`}>
          {book.status}
        </div>
      </div>

      {/* Book Info */}
      <div className="space-y-2">
        <h3 className="font-serif font-semibold text-midnight-violet text-lg line-clamp-1">
          {book.title}
        </h3>
        <p className="text-midnight-violet/70 text-sm line-clamp-1">
          by {book.author}
        </p>
        
        {/* Rating */}
        <div className="star-rating">
          {renderStars(book.rating || 0)}
        </div>
        
        {/* Notes Preview */}
        {book.notes && (
          <p className="text-midnight-violet/60 text-sm line-clamp-2 font-handwritten">
            {book.notes}
          </p>
        )}
        
        {/* Date Info */}
        {book.finishDate && (
          <div className="flex items-center gap-1 text-midnight-violet/50 text-xs">
            <Calendar className="w-3 h-3" />
            <span>Finished {new Date(book.finishDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {/* Decorative Element */}
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-8 h-8 bg-petal-frost rounded-full flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-midnight-violet" />
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
