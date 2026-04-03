import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Calendar, BookOpen, Heart, Edit2, Trash2, Quote } from 'lucide-react';

const BookDetail = ({ book, onClose, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState(book);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStarClick = (rating) => {
    setEditedBook(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSave = () => {
    onUpdate(editedBook);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedBook(book);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this book from your journal?')) {
      onDelete(book.id);
    }
  };

  const renderStars = (rating, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${interactive ? 'cursor-pointer' : ''} transition-all duration-200 ${
          i < (interactive ? hoveredStar || rating : rating) ? 'filled' : ''
        }`}
        fill={i < (interactive ? hoveredStar || rating : rating) ? 'currentColor' : 'none'}
        onClick={interactive ? () => handleStarClick(i + 1) : undefined}
        onMouseEnter={interactive ? () => setHoveredStar(i + 1) : undefined}
        onMouseLeave={interactive ? () => setHoveredStar(0) : undefined}
      />
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-petal-sage text-green-800';
      case 'Reading':
        return 'bg-petal-lavender text-purple-800';
      case 'DNF':
        return 'bg-petal-rose text-pink-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
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
          className="bg-white/95 backdrop-blur-md soft-rounded card-shadow max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-petal-pink/20 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-petal-brown" />
                <h2 className="text-2xl font-serif font-bold text-petal-brown">
                  Book Journal
                </h2>
                <div className={`px-3 py-1 soft-rounded text-xs font-semibold ${getStatusColor(editedBook.status)}`}>
                  {editedBook.status}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!isEditing && (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 hover:bg-petal-pink/50 soft-rounded transition-colors duration-200"
                    >
                      <Edit2 className="w-5 h-5 text-petal-brown" />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="p-2 hover:bg-red-100 soft-rounded transition-colors duration-200"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </>
                )}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-petal-pink/50 soft-rounded transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-petal-brown" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Book Cover */}
              <div className="md:col-span-1">
                <div className="sticky top-24">
                  <img
                    src={editedBook.cover || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop'}
                    alt={editedBook.title}
                    className="w-full soft-rounded card-shadow"
                  />
                  
                  {/* Rating */}
                  <div className="mt-4 text-center">
                    <div className="star-rating justify-center">
                      {renderStars(editedBook.rating, isEditing)}
                    </div>
                    <p className="text-petal-brown/60 text-sm mt-1">
                      {editedBook.rating}/5 stars
                    </p>
                  </div>
                </div>
              </div>

              {/* Book Details */}
              <div className="md:col-span-2 space-y-6">
                {/* Title and Author */}
                <div>
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="title"
                        value={editedBook.title}
                        onChange={handleChange}
                        className="w-full text-3xl font-serif font-bold text-petal-brown bg-transparent border-b-2 border-petal-pink/30 focus:outline-none focus:border-petal-rose pb-2"
                      />
                      <input
                        type="text"
                        name="author"
                        value={editedBook.author}
                        onChange={handleChange}
                        className="w-full text-xl text-petal-brown/70 bg-transparent border-b border-petal-pink/30 focus:outline-none focus:border-petal-rose pb-1"
                        placeholder="Author"
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-3xl font-serif font-bold text-petal-brown mb-2">
                        {editedBook.title}
                      </h1>
                      <p className="text-xl text-petal-brown/70">
                        by {editedBook.author}
                      </p>
                    </>
                  )}
                </div>

                {/* Reading Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-petal-cream/50 soft-rounded p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-petal-brown" />
                      <span className="font-semibold text-petal-brown">Started Reading</span>
                    </div>
                    {isEditing ? (
                      <input
                        type="date"
                        name="startDate"
                        value={editedBook.startDate}
                        onChange={handleChange}
                        className="w-full px-3 py-1 border border-petal-pink/30 soft-rounded focus:outline-none focus:ring-2 focus:ring-petal-rose bg-white/80"
                      />
                    ) : (
                      <p className="text-petal-brown/70">
                        {editedBook.startDate ? new Date(editedBook.startDate).toLocaleDateString() : 'Not set'}
                      </p>
                    )}
                  </div>
                  <div className="bg-petal-cream/50 soft-rounded p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-petal-brown" />
                      <span className="font-semibold text-petal-brown">Finished Reading</span>
                    </div>
                    {isEditing ? (
                      <input
                        type="date"
                        name="finishDate"
                        value={editedBook.finishDate}
                        onChange={handleChange}
                        className="w-full px-3 py-1 border border-petal-pink/30 soft-rounded focus:outline-none focus:ring-2 focus:ring-petal-rose bg-white/80"
                      />
                    ) : (
                      <p className="text-petal-brown/70">
                        {editedBook.finishDate ? new Date(editedBook.finishDate).toLocaleDateString() : 'Not finished'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block font-semibold text-petal-brown mb-2">
                    Reading Status
                  </label>
                  {isEditing ? (
                    <select
                      name="status"
                      value={editedBook.status}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-petal-pink/30 soft-rounded focus:outline-none focus:ring-2 focus:ring-petal-rose bg-white/80"
                    >
                      <option value="Reading">Currently Reading</option>
                      <option value="Completed">Completed</option>
                      <option value="DNF">Did Not Finish</option>
                    </select>
                  ) : (
                    <div className={`inline-block px-4 py-2 soft-rounded text-sm font-semibold ${getStatusColor(editedBook.status)}`}>
                      {editedBook.status}
                    </div>
                  )}
                </div>

                {/* Personal Notes */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="w-4 h-4 text-petal-brown" />
                    <span className="font-semibold text-petal-brown">Personal Notes & Review</span>
                  </div>
                  {isEditing ? (
                    <textarea
                      name="notes"
                      value={editedBook.notes}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-petal-pink/30 soft-rounded focus:outline-none focus:ring-2 focus:ring-petal-rose bg-white/80 font-handwritten"
                      placeholder="Write your thoughts about this book..."
                    />
                  ) : (
                    <div className="bg-petal-mauve/30 soft-rounded p-4">
                      <p className="text-petal-brown/80 font-handwritten text-lg leading-relaxed">
                        {editedBook.notes || 'No notes yet. Add your thoughts about this book!'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Favorite Quotes */}
                {editedBook.quotes && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Quote className="w-4 h-4 text-petal-brown" />
                      <span className="font-semibold text-petal-brown">Favorite Quotes</span>
                    </div>
                    {isEditing ? (
                      <textarea
                        name="quotes"
                        value={editedBook.quotes}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-petal-pink/30 soft-rounded focus:outline-none focus:ring-2 focus:ring-petal-rose bg-white/80 font-handwritten"
                        placeholder="Share your favorite passages..."
                      />
                    ) : (
                      <div className="bg-petal-pink/20 soft-rounded p-4 border-l-4 border-petal-rose">
                        <p className="text-petal-brown/80 font-handwritten text-lg italic leading-relaxed">
                          "{editedBook.quotes}"
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Edit/Save Buttons */}
                {isEditing && (
                  <div className="flex gap-3 pt-4 border-t border-petal-pink/20">
                    <button
                      onClick={handleSave}
                      className="flex-1 feminine-button"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-3 bg-petal-pink/50 text-petal-brown soft-rounded hover:bg-petal-pink/70 transition-colors duration-200 font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookDetail;
