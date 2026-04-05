import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Calendar, Quote, ArrowLeft, Edit, Trash2, Save } from 'lucide-react';

const BookJournalSimple = ({ book, onClose, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState(book);

  const handleSave = () => {
    onUpdate(editedBook);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedBook(book);
    setIsEditing(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 transition-colors duration-200 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-600">by {book.author}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Rating</h4>
              <div className="flex gap-1">
                {renderStars(book.rating || 0)}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Personal Notes</h4>
              {isEditing ? (
                <textarea
                  value={editedBook.notes || ''}
                  onChange={(e) => setEditedBook({ ...editedBook, notes: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 outline-none"
                  placeholder="Write your thoughts about this book..."
                />
              ) : (
                <div className="p-4 rounded-lg bg-gray-50 min-h-[200px]">
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {book.notes || 'No notes yet...'}
                  </p>
                </div>
              )}
            </div>

            <div>
              <h4 className="font-medium mb-2">Favorite Quotes</h4>
              {isEditing ? (
                <textarea
                  value={editedBook.quotes || ''}
                  onChange={(e) => setEditedBook({ ...editedBook, quotes: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 outline-none"
                  placeholder="Add your favorite quotes from this book..."
                />
              ) : (
                <div className="p-4 rounded-lg bg-gray-50 min-h-[150px]">
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {book.quotes || 'No quotes saved yet...'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookJournalSimple;
