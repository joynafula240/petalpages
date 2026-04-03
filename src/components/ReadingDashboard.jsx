import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Target, Calendar, Clock, Award, BarChart3, PieChart } from 'lucide-react';

const ReadingDashboard = ({ books }) => {
  // Calculate statistics
  const completedBooks = books.filter(book => book.status === 'Completed').length;
  const currentlyReading = books.filter(book => book.status === 'Reading').length;
  const totalBooks = books.length;
  
  // Genre distribution
  const genreCount = {};
  books.forEach(book => {
    if (book.genre) {
      genreCount[book.genre] = (genreCount[book.genre] || 0) + 1;
    }
  });
  
  // Average rating
  const ratedBooks = books.filter(book => book.rating);
  const avgRating = ratedBooks.length > 0 
    ? (ratedBooks.reduce((sum, book) => sum + book.rating, 0) / ratedBooks.length).toFixed(1)
    : 0;
  
  // Reading streak (simplified - just count completed books this month)
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthBooks = books.filter(book => {
    if (book.finishDate) {
      const finishDate = new Date(book.finishDate);
      return finishDate.getMonth() === currentMonth && finishDate.getFullYear() === currentYear;
    }
    return false;
  }).length;

  return (
    <div className="paper-page p-6 rounded-lg shadow-lg mb-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-serif font-bold text-warm-brown mb-6 flex items-center gap-3"
      >
        <BarChart3 className="w-8 h-8" />
        Reading Analytics
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Books */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#2d3047] to-[#c1bddb] p-6 rounded-xl shadow-lg border border-[#2d3047]/30 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="w-8 h-8" />
            <span className="text-3xl font-bold">{totalBooks}</span>
          </div>
          <p className="text-sm opacity-90">Total Books</p>
        </motion.div>
        
        {/* Completed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#c1bddb] to-[#2d3047] p-6 rounded-xl shadow-lg border border-[#c1bddb]/30 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <Award className="w-8 h-8" />
            <span className="text-3xl font-bold">{completedBooks}</span>
          </div>
          <p className="text-sm opacity-90">Completed</p>
        </motion.div>
        
        {/* Currently Reading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#2d3047] to-[#c1bddb] p-6 rounded-xl shadow-lg border border-[#2d3047]/30 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8" />
            <span className="text-3xl font-bold">{currentlyReading}</span>
          </div>
          <p className="text-sm opacity-90">Currently Reading</p>
        </motion.div>
        
        {/* Average Rating */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-[#c1bddb] to-[#2d3047] p-6 rounded-xl shadow-lg border border-[#c1bddb]/30 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8" />
            <span className="text-3xl font-bold">{avgRating}</span>
          </div>
          <p className="text-sm opacity-90">Avg Rating</p>
        </motion.div>
      </div>
      
      {/* Genre Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-periwinkle-100 to-space-indigo-50 p-4 rounded-lg border border-space-indigo/20"
        >
          <h3 className="text-lg font-serif font-bold text-space-indigo mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Genre Distribution
          </h3>
          <div className="space-y-2">
            {Object.entries(genreCount).map(([genre, count]) => (
              <div key={genre} className="flex items-center justify-between">
                <span className="text-sm text-space-indigo/80">{genre}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-space-indigo/30 rounded-full h-2">
                    <div 
                      className="bg-tropical-mint h-2 rounded-full"
                      style={{ width: `${(count / totalBooks) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-space-indigo font-bold">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Monthly Reading */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-tropical-mint/20 to-turf-green/20 p-4 rounded-lg border border-turf-green/30"
        >
          <h3 className="text-lg font-serif font-bold text-space-indigo mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            This Month's Reading
          </h3>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-tropical-mint">{thisMonthBooks}</div>
            <div>
              <p className="text-sm text-space-indigo/80">Books completed</p>
              <p className="text-xs text-space-indigo/60">Keep it up!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReadingDashboard;
