import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Upload, Calendar, BookOpen, Heart } from 'lucide-react';

const AddBookModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    cover: '',
    status: 'Reading',
    rating: 0,
    notes: '',
    quotes: '',
    startDate: '',
    finishDate: ''
  });

  const [hoveredStar, setHoveredStar] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStarClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-6 h-6 cursor-pointer transition-all duration-200 ${
          i < (hoveredStar || formData.rating) ? 'filled' : ''
        }`}
        fill={i < (hoveredStar || formData.rating) ? 'currentColor' : 'none'}
        onClick={() => handleStarClick(i + 1)}
        onMouseEnter={() => setHoveredStar(i + 1)}
        onMouseLeave={() => setHoveredStar(0)}
      />
    ));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white/95 backdrop-blur-md soft-rounded card-shadow max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-petal-pink/20 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-petal-brown" />
                <h2 className="text-2xl font-serif font-bold text-petal-brown">
                  Add New Book
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-petal-pink/50 soft-rounded transition-colors duration-200"
              >
                <X className="w-5 h-5 text-petal-brown" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Book Title and Author */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-petal-brown font-semibold mb-2">
                  Book Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-petal-pink/30 soft-rounded focus:outline-none focus:ring-2 focus:ring-petal-rose bg-white/80"
                  placeholder="Enter book title"
                />
              </div>
              <div>
                <label className="block text-petal-brown font-semibold mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-petal-pink/30 soft-rounded focus:outline-none focus:ring-2 focus:ring-petal-rose bg-white/80"
                  placeholder="Enter author name"
                />
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-petal-brown font-semibold mb-2">
                Cover Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  name="cover"
                  value={formData.cover}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border border-petal-pink/30 soft-rounded focus:outline-none focus:ring-2 focus:ring-petal-rose bg-white/80"
                  placeholder="https://example.com/book-cover.jpg"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-petal-cream text-petal-brown soft-rounded hover:bg-petal-lavender transition-colors duration-200"
                >
                  <Upload className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Status and Rating */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-petal-brown font-semibold mb-2">
                  Reading Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-petal-pink/30 soft-rounded focus:outline-none focus:ring-2 focus:ring-petal-rose bg-white/80"
                >
                  <option value="Reading">Currently Reading</option>
                  <option value="Completed">Completed</option>
                  <option value="DNF">Did Not Finish</option>
                </select>
              </div>
              <div>
                <label className="block text-petal-brown font-semibold mb-2">
                  Rating
                </label>
                <div className="star-rating">
                  {renderStars()}
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-petal-brown font-semibold mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-petal-pink/30 soft-rounded focus:outline-none focus:ring-2 focus:ring-petal-rose bg-white/80"
                />
              </div>
              <div>
                <label className="block text-petal-brown font-semibold mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Finish Date
                </label>
                <input
                  type="date"
                  name="finishDate"
                  value={formData.finishDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-petal-pink/30 soft-rounded focus:outline-none focus:ring-2 focus:ring-petal-rose bg-white/80"
                />
              </div>
            </div>

            {/* Personal Notes */}
            <div>
              <label className="block text-petal-brown font-semibold mb-2">
                <Heart className="inline w-4 h-4 mr-1" />
                Personal Notes & Review
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-petal-pink/30 soft-rounded focus:outline-none focus:ring-2 focus:ring-petal-rose bg-white/80 font-handwritten"
                placeholder="Write your thoughts about this book..."
              />
            </div>

            {/* Favorite Quotes */}
            <div>
              <label className="block text-petal-brown font-semibold mb-2">
                Favorite Quotes
              </label>
              <textarea
                name="quotes"
                value={formData.quotes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-petal-pink/30 soft-rounded focus:outline-none focus:ring-2 focus:ring-petal-rose bg-white/80 font-handwritten"
                placeholder="Share your favorite passages..."
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 feminine-button"
              >
                Add to My Journal
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-petal-pink/50 text-petal-brown soft-rounded hover:bg-petal-pink/70 transition-colors duration-200 font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddBookModal;
