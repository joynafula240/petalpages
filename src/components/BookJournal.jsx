import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Calendar, Quote, ArrowLeft, Edit, Trash2, Save, Image as ImageIcon, Headphones, BookOpen, Monitor } from 'lucide-react';

const BookJournal = ({ book, onClose, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState(book);
  const [isDragging, setIsDragging] = useState(false);

  const handleSave = () => {
    onUpdate(editedBook);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedBook(book);
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      processImageFile(file);
    }
  };

  const processImageFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedBook({ ...editedBook, cover: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      processImageFile(files[0]);
    }
  };

  const genreOptions = [
    'Fantasy', 'Romance', 'Mystery', 'Sci-Fi', 'Thriller', 
    'Horror', 'Contemporary', 'Historical Fiction', 'Non-Fiction',
    'Biography', 'Self-Help', 'Poetry', 'Dystopian', 'Adventure',
    'Young Adult', 'Middle Grade', 'Classic Literature'
  ];

  const tropeOptions = [
    'Enemies to Lovers', 'Friends to Lovers', 'Fake Dating', 'Forced Proximity',
    'Slow Burn', 'Insta-Love', 'Love Triangle', 'Second Chance Romance',
    'Grumpy x Sunshine', 'Forbidden Love', 'Age Gap', 'Arranged Marriage',
    'Marriage of Convenience', 'Secret Identity', 'Amnesia', 'Time Travel',
    'Reunion', 'Small Town', 'Found Family', 'Opposites Attract',
    'One Bed', 'Only One Bed', 'Touch Her and Die', 'Protective Hero',
    'Villain Romance', 'Dark Romance', 'Spice', 'Closed Door',
    'Open Door', 'Reverse Harem', 'Why Choose', 'Standalone',
    'Series', 'Cliffhanger', 'HEA', 'HFN'
  ];

  const formatOptions = [
    { value: 'audiobook', label: 'Audiobook', icon: Headphones },
    { value: 'paperback', label: 'Paperback', icon: BookOpen },
    { value: 'ebook', label: 'E-book', icon: Monitor }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 transition-colors duration-200 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-warm-brown/30'
        }`}
      />
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-sage-green text-white';
      case 'Reading':
        return 'bg-blush-pink text-white';
      case 'DNF':
        return 'bg-dusty-rose text-white';
      default:
        return 'bg-soft-beige text-warm-brown';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: 90 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cream/90 backdrop-blur-sm"
    >
      <div className="paper-page max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blush-pink to-dusty-rose p-6 rounded-t-lg shadow-md z-10">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-warm-brown hover:text-warm-brown/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Library
            </button>
            
            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-soft-beige text-warm-brown rounded-lg hover:bg-light-peach transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-sage-green text-white rounded-lg hover:bg-sage-green/80 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-soft-beige text-warm-brown rounded-lg hover:bg-light-peach transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(book.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-dusty-rose text-white rounded-lg hover:bg-dusty-rose/80 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Book Info */}
            <div className="space-y-6">
              {/* Book Cover */}
              <div className="text-center md:text-left">
                <div className="mb-4">
                  {isEditing ? (
                    <div 
                      className={`relative inline-block ${isDragging ? 'ring-4 ring-blush-pink ring-opacity-50' : ''}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      {editedBook.cover ? (
                        <img
                          src={editedBook.cover}
                          alt={editedBook.title}
                          className="w-32 h-40 object-cover rounded-lg shadow-lg mx-auto md:mx-0"
                        />
                      ) : (
                        <div className="w-32 h-40 bg-gradient-to-br from-blush-pink to-dusty-rose rounded-lg shadow-lg mx-auto md:mx-0 flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-warm-brown/40" />
                        </div>
                      )}
                      <label className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full cursor-pointer hover:bg-white transition-colors">
                        <ImageIcon className="w-4 h-4 text-warm-brown" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      {isDragging && (
                        <div className="absolute inset-0 bg-blush-pink/20 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <ImageIcon className="w-8 h-8 text-warm-brown mx-auto mb-2" />
                            <p className="text-warm-brown font-handwritten text-sm">Drop image here</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="inline-block">
                      {book.cover ? (
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-32 h-40 object-cover rounded-lg shadow-lg mx-auto md:mx-0"
                        />
                      ) : (
                        <div className="w-32 h-40 bg-gradient-to-br from-blush-pink to-dusty-rose rounded-lg shadow-lg mx-auto md:mx-0 flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-warm-brown/40" />
                        </div>
                      )}
                    </div>
                  )}
                  {isEditing && (
                    <p className="text-xs text-warm-brown/50 mt-2 font-handwritten">
                      Drag & drop or click to add image
                    </p>
                  )}
                </div>
              </div>

              {/* Title and Author */}
              <div className="text-center md:text-left">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedBook.title}
                    onChange={(e) => setEditedBook({ ...editedBook, title: e.target.value })}
                    className="w-full text-3xl md:text-4xl font-serif font-bold text-warm-brown bg-transparent border-b-2 border-warm-brown/30 focus:border-blush-pink outline-none px-2 py-1 mb-2"
                  />
                ) : (
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-warm-brown mb-2">
                    {book.title}
                  </h2>
                )}
                
                {isEditing ? (
                  <input
                    type="text"
                    value={editedBook.author}
                    onChange={(e) => setEditedBook({ ...editedBook, author: e.target.value })}
                    className="w-full text-lg md:text-xl text-warm-brown/70 bg-transparent border-b border-warm-brown/20 focus:border-dusty-rose outline-none px-2 py-1 mb-3 font-handwritten"
                  />
                ) : (
                  <p className="text-lg md:text-xl text-warm-brown/70 font-handwritten mb-3">
                    by {book.author}
                  </p>
                )}

                {/* Genre and Trope */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-warm-brown mb-2">Genre</label>
                    {isEditing ? (
                      <select
                        value={editedBook.genre || ''}
                        onChange={(e) => setEditedBook({ ...editedBook, genre: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-warm-brown/20 focus:border-blush-pink outline-none bg-cream text-sm"
                      >
                        <option value="">Select Genre</option>
                        {genreOptions.map(genre => (
                          <option key={genre} value={genre}>{genre}</option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-warm-brown/70 text-sm">
                        {book.genre || 'Not specified'}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-warm-brown mb-2">Trope</label>
                    {isEditing ? (
                      <select
                        value={editedBook.trope || ''}
                        onChange={(e) => setEditedBook({ ...editedBook, trope: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-warm-brown/20 focus:border-blush-pink outline-none bg-cream text-sm"
                      >
                        <option value="">Select Trope</option>
                        {tropeOptions.map(trope => (
                          <option key={trope} value={trope}>{trope}</option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-warm-brown/70 text-sm">
                        {book.trope || 'Not specified'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Format */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-warm-brown mb-2">Format</label>
                  {isEditing ? (
                    <div className="flex gap-3">
                      {formatOptions.map(format => {
                        const Icon = format.icon;
                        return (
                          <label
                            key={format.value}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
                              editedBook.format === format.value
                                ? 'border-blush-pink bg-blush-pink/20 text-warm-brown'
                                : 'border-warm-brown/20 bg-cream text-warm-brown/70 hover:border-dusty-rose'
                            }`}
                          >
                            <input
                              type="radio"
                              name="format"
                              value={format.value}
                              checked={editedBook.format === format.value}
                              onChange={(e) => setEditedBook({ ...editedBook, format: e.target.value })}
                              className="hidden"
                            />
                            <Icon className="w-4 h-4" />
                            <span className="text-sm">{format.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {book.format && (
                        <>
                          {(() => {
                            const selectedFormat = formatOptions.find(f => f.value === book.format);
                            const Icon = selectedFormat?.icon || BookOpen;
                            return (
                              <>
                                <Icon className="w-4 h-4 text-warm-brown/70" />
                                <span className="text-warm-brown/70 text-sm">
                                  {selectedFormat?.label || 'Not specified'}
                                </span>
                              </>
                            );
                          })()}
                        </>
                      )}
                      {!book.format && (
                        <span className="text-warm-brown/70 text-sm">Not specified</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Status and Rating */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-warm-brown mb-2">Status</label>
                  {isEditing ? (
                    <select
                      value={editedBook.status}
                      onChange={(e) => setEditedBook({ ...editedBook, status: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg border border-warm-brown/20 focus:border-blush-pink outline-none ${getStatusColor(editedBook.status)}`}
                    >
                      <option value="Reading">Reading</option>
                      <option value="Completed">Completed</option>
                      <option value="DNF">DNF</option>
                    </select>
                  ) : (
                    <div className={`px-3 py-2 rounded-lg text-sm font-medium ${getStatusColor(book.status)}`}>
                      {book.status}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-warm-brown mb-2">Rating</label>
                  {isEditing ? (
                    <select
                      value={editedBook.rating}
                      onChange={(e) => setEditedBook({ ...editedBook, rating: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg border border-warm-brown/20 focus:border-blush-pink outline-none bg-cream"
                    >
                      {[1, 2, 3, 4, 5].map(rating => (
                        <option key={rating} value={rating}>{rating} Stars</option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex gap-1">
                      {renderStars(book.rating || 0)}
                    </div>
                  )}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-warm-brown mb-2">Start Date</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editedBook.startDate}
                      onChange={(e) => setEditedBook({ ...editedBook, startDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-warm-brown/20 focus:border-blush-pink outline-none bg-cream"
                    />
                  ) : (
                    <p className="text-warm-brown/70">
                      {book.startDate ? new Date(book.startDate).toLocaleDateString() : 'Not started'}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-warm-brown mb-2">Finish Date</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editedBook.finishDate}
                      onChange={(e) => setEditedBook({ ...editedBook, finishDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-warm-brown/20 focus:border-blush-pink outline-none bg-cream"
                    />
                  ) : (
                    <p className="text-warm-brown/70">
                      {book.finishDate ? new Date(book.finishDate).toLocaleDateString() : 'Not finished'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Notes and Quotes */}
            <div className="space-y-6">
              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-warm-brown mb-2">Personal Notes</label>
                {isEditing ? (
                  <textarea
                    value={editedBook.notes}
                    onChange={(e) => setEditedBook({ ...editedBook, notes: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-3 rounded-lg border border-warm-brown/20 focus:border-blush-pink outline-none bg-cream font-handwritten resize-none"
                    placeholder="Write your thoughts about this book..."
                  />
                ) : (
                  <div className="p-4 rounded-lg bg-light-peach/30 min-h-[200px]">
                    <p className="text-warm-brown/80 font-handwritten whitespace-pre-wrap">
                      {book.notes || 'No notes yet...'}
                    </p>
                  </div>
                )}
              </div>

              {/* Favorite Quotes */}
              <div>
                <label className="block text-sm font-medium text-warm-brown mb-2 flex items-center gap-2">
                  <Quote className="w-4 h-4" />
                  Favorite Quotes
                </label>
                {isEditing ? (
                  <textarea
                    value={editedBook.quotes}
                    onChange={(e) => setEditedBook({ ...editedBook, quotes: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-warm-brown/20 focus:border-blush-pink outline-none bg-cream font-handwritten resize-none"
                    placeholder="Add your favorite quotes from this book..."
                  />
                ) : (
                  <div className="p-4 rounded-lg bg-lavender-soft/30 min-h-[150px]">
                    <p className="text-warm-brown/80 font-handwritten whitespace-pre-wrap">
                      {book.quotes || 'No quotes saved yet...'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookJournal;
