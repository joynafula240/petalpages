import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Calendar, Quote, ArrowLeft, Edit, Trash2, Save, Image as ImageIcon, Headphones, BookOpen, Monitor, FileText, Layers, Smartphone, Plus } from 'lucide-react';

const BookJournal = ({ book, onClose, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState(book);
  const [isDragging, setIsDragging] = useState(false);

  const handleSave = () => {
    // Handle multiple genres and tropes
    const updatedBook = {
      ...editedBook,
      genres: Array.isArray(editedBook.genres) ? editedBook.genres : (editedBook.genre ? [editedBook.genre] : []),
      tropes: Array.isArray(editedBook.tropes) ? editedBook.tropes : (editedBook.trope ? [editedBook.trope] : [])
    };
    setEditedBook(updatedBook);
    onUpdate(updatedBook);
    setIsEditing(false);
  };

  const handleBookDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleCancel = () => {
    setEditedBook(book);
    setIsEditing(false);
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

  const handleGenreToggle = (genre) => {
    const currentGenres = Array.isArray(editedBook.genres) ? editedBook.genres : (editedBook.genre ? [editedBook.genre] : []);
    if (currentGenres.includes(genre)) {
      setEditedBook({ 
        ...editedBook, 
        genres: currentGenres.filter(g => g !== genre),
        genre: currentGenres.filter(g => g !== genre)[0] || ''
      });
    } else {
      const newGenres = [...currentGenres, genre];
      setEditedBook({ 
        ...editedBook, 
        genres: newGenres,
        genre: newGenres[0] || ''
      });
    }
  };

  const handleTropeToggle = (trope) => {
    const currentTropes = Array.isArray(editedBook.tropes) ? editedBook.tropes : (editedBook.trope ? [editedBook.trope] : []);
    if (currentTropes.includes(trope)) {
      setEditedBook({ 
        ...editedBook, 
        tropes: currentTropes.filter(t => t !== trope),
        trope: currentTropes.filter(t => t !== trope)[0] || ''
      });
    } else {
      const newTropes = [...currentTropes, trope];
      setEditedBook({ 
        ...editedBook, 
        tropes: newTropes,
        trope: newTropes[0] || ''
      });
    }
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

  const genreOptions = [
    'Fantasy', 'Romance', 'Mystery', 'Sci-Fi', 'Thriller',
    'Horror', 'Contemporary', 'Historical Fiction', 'Non-Fiction',
    'Biography', 'Self-Help', 'Poetry', 'Dystopian', 'Adventure',
    'Young Adult', 'Classic Literature', 'Gothic Fiction', 'Urban Fantasy',
    'Literary Fiction', 'Memoir', 'True Crime', 'Psychological Thriller',
    'Magical Realism', 'Dark Academia', 'High Fantasy', 'Cozy Mystery',
    'Paranormal Romance', 'Dark Romance', 'Historical Romance', 'LGBTQ+',
    'Women\'s Fiction', 'Fairy Tale Retelling', 'Mythology', 'Cyberpunk',
    'Steampunk', 'Space Opera'
  ];

  const tropeOptions = [
    'Enemies to Lovers', 'Friends to Lovers', 'Fake Dating', 'Forced Proximity',
    'Slow Burn', 'Insta-Love', 'Love Triangle', 'Second Chance Romance',
    'Grumpy x Sunshine', 'Forbidden Love', 'Age Gap', 'Arranged Marriage',
    'Secret Identity', 'Amnesia', 'Time Travel', 'Reunion',
    'Small Town', 'Found Family', 'Opposites Attract', 'One Bed',
    'Only One Bed', 'Touch Her and Die', 'Protective Hero',
    'Fated Mates', 'Who Did This To You', 'Hurt/Comfort', 'Marriage of Convenience',
    'Villain Gets the Girl', 'Morally Grey', 'Academic Rivals', 'Workplace Romance',
    'Right Person Wrong Time', 'Soulmates', 'Sunshine x Sunshine', 'Grumpy x Grumpy',
    'Childhood Friends to Lovers', 'Brother\'s Best Friend', 'Best Friend\'s Brother',
    'Billionaire', 'Mafia', 'Sports Romance'
  ];

  const formatOptions = [
    { value: 'audiobook', label: 'Audiobook', icon: Headphones },
    { value: 'paperback', label: 'Paperback', icon: BookOpen },
    { value: 'ebook', label: 'E-book', icon: Monitor },
    { value: 'hardcover', label: 'Hardcover', icon: FileText },
    { value: 'graphic-novel', label: 'Graphic Novel', icon: Layers },
    { value: 'manga', label: 'Manga', icon: BookOpen },
    { value: 'webnovel', label: 'Web Novel', icon: Smartphone },
    { value: 'anthology', label: 'Anthology', icon: FileText }
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
        return 'bg-[#2d3047] text-white shadow-lg';
      case 'Reading':
        return 'bg-[#2d3047] text-white shadow-lg';
      case 'DNF':
        return 'bg-[#c1bddb] text-[#2d3047] shadow-lg';
      default:
        return 'bg-cream text-warm-brown/70';
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
                    value={editedBook.title || ''}
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
                    value={editedBook.author || ''}
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
                    <label className="block text-sm font-medium text-warm-brown mb-2">Genres</label>
                    {isEditing ? (
                      <div className="space-y-2">
                        {/* Selected Genres */}
                        <div className="flex flex-wrap gap-1 min-h-[32px] p-2 border border-warm-brown/20 rounded-lg bg-cream">
                          {(Array.isArray(editedBook.genres) ? editedBook.genres : (editedBook.genre ? [editedBook.genre] : [])).length > 0 ? (
                            (Array.isArray(editedBook.genres) ? editedBook.genres : (editedBook.genre ? [editedBook.genre] : [])).map(genre => (
                              <span key={genre} className="px-2 py-1 bg-[#2d3047] text-white text-xs rounded-full font-medium flex items-center gap-1">
                                {genre}
                                <button
                                  type="button"
                                  onClick={() => handleGenreToggle(genre)}
                                  className="ml-1 hover:text-[#c1bddb] transition-colors"
                                >
                                  ×
                                </button>
                              </span>
                            ))
                          ) : (
                            <span className="text-warm-brown/50 text-sm italic">Click to add genres...</span>
                          )}
                        </div>
                        
                        {/* Genre Selector */}
                        <div className="relative">
                          <select
                            value=""
                            onChange={(e) => e.target.value && handleGenreToggle(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-warm-brown/20 bg-cream text-warm-brown text-sm focus:border-[#c1bddb] outline-none"
                          >
                            <option value="">+ Add Genre</option>
                            {genreOptions.filter(genre => 
                              !(Array.isArray(editedBook.genres) ? editedBook.genres : (editedBook.genre ? [editedBook.genre] : [])).includes(genre)
                            ).map(genre => (
                              <option key={genre} value={genre}>{genre}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {(Array.isArray(book.genres) ? book.genres : (book.genre ? [book.genre] : [])).length > 0 ? (
                          (Array.isArray(book.genres) ? book.genres : (book.genre ? [book.genre] : [])).map(genre => (
                            <span key={genre} className="px-2 py-1 bg-[#2d3047] text-white text-xs rounded-full font-medium">
                              {genre}
                            </span>
                          ))
                        ) : (
                          <p className="text-warm-brown/70 text-sm">Not specified</p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-warm-brown mb-2">Tropes</label>
                    {isEditing ? (
                      <div className="space-y-2">
                        {/* Selected Tropes */}
                        <div className="flex flex-wrap gap-1 min-h-[32px] p-2 border border-warm-brown/20 rounded-lg bg-cream">
                          {(Array.isArray(editedBook.tropes) ? editedBook.tropes : (editedBook.trope ? [editedBook.trope] : [])).length > 0 ? (
                            (Array.isArray(editedBook.tropes) ? editedBook.tropes : (editedBook.trope ? [editedBook.trope] : [])).map(trope => (
                              <span key={trope} className="px-2 py-1 bg-[#2d3047] text-white text-xs rounded-full font-medium flex items-center gap-1">
                                {trope}
                                <button
                                  type="button"
                                  onClick={() => handleTropeToggle(trope)}
                                  className="ml-1 hover:text-[#c1bddb] transition-colors"
                                >
                                  ×
                                </button>
                              </span>
                            ))
                          ) : (
                            <span className="text-warm-brown/50 text-sm italic">Click to add tropes...</span>
                          )}
                        </div>
                        
                        {/* Trope Selector */}
                        <div className="relative">
                          <select
                            value=""
                            onChange={(e) => e.target.value && handleTropeToggle(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-warm-brown/20 bg-cream text-warm-brown text-sm focus:border-[#c1bddb] outline-none"
                          >
                            <option value="">+ Add Trope</option>
                            {tropeOptions.filter(trope => 
                              !(Array.isArray(editedBook.tropes) ? editedBook.tropes : (editedBook.trope ? [editedBook.trope] : [])).includes(trope)
                            ).map(trope => (
                              <option key={trope} value={trope}>{trope}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {(Array.isArray(book.tropes) ? book.tropes : (book.trope ? [book.trope] : [])).length > 0 ? (
                          (Array.isArray(book.tropes) ? book.tropes : (book.trope ? [book.trope] : [])).map(trope => (
                            <span key={trope} className="px-2 py-1 bg-[#2d3047] text-white text-xs rounded-full font-medium">
                              {trope}
                            </span>
                          ))
                        ) : (
                          <p className="text-warm-brown/70 text-sm">Not specified</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Format */}
                <div className="mb-6 relative z-10">
                  <label className="block text-sm font-medium text-warm-brown mb-2">Format</label>
                  {isEditing ? (
                    <div className="flex gap-3 flex-wrap">
                      {formatOptions.map(format => {
                        const Icon = format.icon;
                        return (
                          <label
                            key={format.value}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all relative z-20 ${
                              editedBook.format === format.value
                                ? 'border-[#2d3047] bg-[#2d3047] text-white shadow-lg'
                                : 'border-warm-brown/20 bg-cream text-warm-brown/70 hover:border-[#c1bddb]'
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
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            <span className="text-xs font-medium whitespace-nowrap">{format.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors relative z-20 ${
                      book.format 
                        ? 'border-[#2d3047] bg-[#2d3047]/10 text-[#2d3047]' 
                        : 'border-warm-brown/20 bg-cream text-warm-brown/70'
                    }`}>
                      {(() => {
                        const selectedFormat = formatOptions.find(f => f.value === book.format);
                        const Icon = selectedFormat ? selectedFormat.icon : BookOpen;
                        return (
                          <>
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            <span className="text-xs font-medium whitespace-nowrap">
                              {selectedFormat ? selectedFormat.label : 'Not specified'}
                            </span>
                          </>
                        );
                      })()}
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
                      value={editedBook.status || ''}
                      onChange={(e) => setEditedBook({ ...editedBook, status: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg border transition-colors outline-none text-sm font-medium ${
                        editedBook.status 
                          ? 'border-[#2d3047] bg-[#2d3047] text-white shadow-lg' 
                          : 'border-warm-brown/20 bg-cream text-warm-brown focus:border-[#c1bddb]'
                        }`}
                    >
                      <option value="" className="bg-cream text-warm-brown">Select Status</option>
                      <option value="Reading" className="bg-cream text-warm-brown">Reading</option>
                      <option value="Completed" className="bg-cream text-warm-brown">Completed</option>
                      <option value="DNF" className="bg-cream text-warm-brown">DNF</option>
                    </select>
                  ) : (
                    <div className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      book.status 
                        ? getStatusColor(book.status) 
                        : 'bg-cream text-warm-brown/70'
                    }`}>
                      {book.status || 'Not specified'}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-warm-brown mb-2">Rating</label>
                  {isEditing ? (
                    <select
                      value={editedBook.rating || ''}
                      onChange={(e) => setEditedBook({ ...editedBook, rating: parseInt(e.target.value) || 0 })}
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
                      value={editedBook.startDate || ''}
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
                      value={editedBook.finishDate || ''}
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
                    value={editedBook.notes || ''}
                    onChange={(e) => setEditedBook({ ...editedBook, notes: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-3 rounded-lg border border-warm-brown/20 focus:border-blush-pink outline-none bg-cream font-handwritten resize-none"
                    placeholder="Write your thoughts about this book..."
                  />
                ) : (
                  <div className="p-4 rounded-lg bg-light-peach/30 min-h-[200px]">
                    <div className="text-warm-brown/80 font-handwritten whitespace-pre-wrap min-h-[180px]">
                      {book.notes || 'No notes yet...'}
                    </div>
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
                    value={editedBook.quotes || ''}
                    onChange={(e) => setEditedBook({ ...editedBook, quotes: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-warm-brown/20 focus:border-blush-pink outline-none bg-cream font-handwritten resize-none"
                    placeholder="Add your favorite quotes from this book..."
                  />
                ) : (
                  <div className="p-4 rounded-lg bg-lavender-soft/30 min-h-[150px]">
                    <div className="text-warm-brown/80 font-handwritten whitespace-pre-wrap min-h-[130px]">
                      {book.quotes || 'No quotes saved yet...'}
                    </div>
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
