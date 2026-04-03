import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LibraryCard from './LibraryCard';
import { Plus, BookOpen } from 'lucide-react';

const BookShelf = ({ books, onBookClick, onAddBook }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-periwinkle-50 via-periwinkle-100 to-space-indigo-100 p-8">
      {/* Add Book Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center mb-8"
      >
        <button
          onClick={onAddBook}
          className="feminine-button flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Book
        </button>
      </motion.div>

      {/* Library Header */}
      <div className="text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-serif font-bold text-space-indigo"
        >
          My Library
        </motion.h1>
      </div>

      {/* Library Grid */}
      <div className="max-w-7xl mx-auto">
        {books.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-space-indigo/50" />
            <p className="text-space-indigo/60 font-serif text-xl mb-2">
              Your library is empty
            </p>
            <p className="text-space-indigo/50 font-handwritten">
              Add your first book to start your collection
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <AnimatePresence mode="sync">
              {books.map((book, index) => (
                <LibraryCard
                  key={book.id}
                  book={book}
                  onClick={onBookClick}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookShelf;
