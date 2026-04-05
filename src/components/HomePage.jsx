import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Star, TrendingUp, Target, Sparkles, ArrowRight } from 'lucide-react';

const HomePage = ({ books, onNavigateToLibrary, onNavigateToDashboard }) => {
  const totalBooks = books.length;
  const completedBooks = books.filter(book => book.status === 'Completed').length;
  const currentlyReading = books.filter(book => book.status === 'Reading').length;
  const avgRating = books.length > 0 
    ? (books.reduce((sum, book) => sum + (book.rating || 0), 0) / books.length).toFixed(1)
    : '0.0';

  const recentBooks = books.slice(-3).reverse();

  return (
    <div className="min-h-screen relative aesthetic-overlay paper-texture">
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-book-pattern opacity-20"
          style={{
            backgroundSize: '150px',
            backgroundRepeat: 'repeat',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-periwinkle-50 via-periwinkle-100 to-space-indigo-100"></div>
      </div>

      {/* Enhanced Lace Overlay */}
      <div className="lace-overlay"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#2d3047] rounded-full mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2d3047] mb-4">
            Welcome to Your Reading Journal
          </h1>
          <p className="text-lg text-[#2d3047]/70 max-w-2xl mx-auto">
            Track your reading journey, discover new books, and build your personal library
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#c1bddb]/20 aesthetic-overlay soft-shadow-layer">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-8 h-8 text-[#2d3047]" />
              <span className="text-3xl font-bold text-[#2d3047]">{totalBooks}</span>
            </div>
            <p className="text-sm text-[#2d3047]/70">Total Books</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#c1bddb]/20 aesthetic-overlay soft-shadow-layer">
            <div className="flex items-center justify-between mb-2">
              <Heart className="w-8 h-8 text-[#2d3047]" />
              <span className="text-3xl font-bold text-[#2d3047]">{completedBooks}</span>
            </div>
            <p className="text-sm text-[#2d3047]/70">Completed</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#c1bddb]/20 aesthetic-overlay soft-shadow-layer">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-8 h-8 text-[#2d3047]" />
              <span className="text-3xl font-bold text-[#2d3047]">{avgRating}</span>
            </div>
            <p className="text-sm text-[#2d3047]/70">Avg Rating</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#c1bddb]/20 aesthetic-overlay soft-shadow-layer">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-[#2d3047]" />
              <span className="text-3xl font-bold text-[#2d3047]">{currentlyReading}</span>
            </div>
            <p className="text-sm text-[#2d3047]/70">Reading Now</p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-[#c1bddb]/20 aesthetic-overlay soft-shadow-layer">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#2d3047] rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#2d3047]">Your Library</h2>
            </div>
            <p className="text-[#2d3047]/70 mb-6">
              Browse your complete book collection, add new books, and manage your reading list.
            </p>
            <button
              onClick={onNavigateToLibrary}
              className="flex items-center gap-2 px-6 py-3 bg-[#2d3047] text-white rounded-lg hover:bg-[#2d3047]/90 transition-colors"
            >
              Go to Library
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-[#c1bddb]/20 aesthetic-overlay soft-shadow-layer">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#2d3047] rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#2d3047]">Reading Dashboard</h2>
            </div>
            <p className="text-[#2d3047]/70 mb-6">
              View your reading statistics, track progress, and analyze your reading habits.
            </p>
            <button
              onClick={onNavigateToDashboard}
              className="flex items-center gap-2 px-6 py-3 bg-[#2d3047] text-white rounded-lg hover:bg-[#2d3047]/90 transition-colors"
            >
              View Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Recent Books */}
        {recentBooks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-[#c1bddb]/20 aesthetic-overlay soft-shadow-layer"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-[#2d3047]" />
              <h2 className="text-2xl font-bold text-[#2d3047]">Recent Books</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {recentBooks.map((book) => (
                <div key={book.id} className="flex items-center gap-4 p-4 bg-[#f8f6ff] rounded-lg border border-[#c1bddb]/20">
                  {book.cover ? (
                    <img 
                      src={book.cover} 
                      alt={book.title} 
                      className="w-16 h-20 object-cover rounded"
                    />
                  ) : (
                    <div className="w-16 h-20 bg-[#c1bddb]/20 rounded flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-[#c1bddb]" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#2d3047] text-sm mb-1 line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-[#2d3047]/70 text-xs mb-2">
                      {book.author}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        book.status === 'Completed' 
                          ? 'bg-[#2d3047] text-white' 
                          : book.status === 'Reading'
                          ? 'bg-[#c1bddb] text-[#2d3047]'
                          : 'bg-[#f0ebff] text-[#2d3047]'
                      }`}>
                        {book.status}
                      </span>
                      {book.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs text-[#2d3047]/70">{book.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {books.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#c1bddb]/20 rounded-full mb-6">
              <BookOpen className="w-10 h-10 text-[#c1bddb]" />
            </div>
            <h3 className="text-2xl font-bold text-[#2d3047] mb-4">No books yet</h3>
            <p className="text-[#2d3047]/70 mb-8 max-w-md mx-auto">
              Start your reading journey by adding your first book to your library.
            </p>
            <button
              onClick={onNavigateToLibrary}
              className="flex items-center gap-2 px-6 py-3 bg-[#2d3047] text-white rounded-lg hover:bg-[#2d3047]/90 transition-colors mx-auto"
            >
              Add Your First Book
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
