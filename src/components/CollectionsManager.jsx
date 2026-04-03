import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderPlus, Folder, X, Plus, BookOpen } from 'lucide-react';

const CollectionsManager = ({ books, onAddToCollection, onCreateCollection }) => {
  const [collections, setCollections] = useState([
    { id: 'favorites', name: 'Favorites', books: [] },
    { id: 'to-read', name: 'To Read', books: [] },
    { id: 'reading', name: 'Currently Reading', books: [] }
  ]);
  const [showNewCollection, setShowNewCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      const newCollection = {
        id: Date.now().toString(),
        name: newCollectionName.trim(),
        books: []
      };
      setCollections([...collections, newCollection]);
      setNewCollectionName('');
      setShowNewCollection(false);
      onCreateCollection && onCreateCollection(newCollection);
    }
  };

  const handleAddBookToCollection = (collectionId, book) => {
    setCollections(collections.map(collection => 
      collection.id === collectionId 
        ? { ...collection, books: [...collection.books, book.id] }
        : collection
    ));
    onAddToCollection && onAddToCollection(collectionId, book);
  };

  const handleRemoveBookFromCollection = (collectionId, bookId) => {
    setCollections(collections.map(collection => 
      collection.id === collectionId 
        ? { ...collection, books: collection.books.filter(id => id !== bookId) }
        : collection
    ));
  };

  return (
    <div className="paper-page p-6 rounded-lg shadow-lg mb-8">
      <div className="flex items-center justify-between mb-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-serif font-bold text-warm-brown flex items-center gap-3"
        >
          <Folder className="w-8 h-8" />
          Collections
        </motion.h2>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNewCollection(true)}
          className="feminine-button flex items-center gap-2"
        >
          <FolderPlus className="w-4 h-4" />
          New Collection
        </motion.button>
      </div>

      {/* New Collection Modal */}
      <AnimatePresence>
        {showNewCollection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowNewCollection(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-serif font-bold text-warm-brown mb-4">Create New Collection</h3>
              <input
                type="text"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Collection name"
                className="w-full px-4 py-2 border border-warm-brown/20 rounded-lg focus:border-blush-pink outline-none mb-4"
                autoFocus
              />
              <div className="flex gap-3">
                <button
                  onClick={handleCreateCollection}
                  className="flex-1 feminine-button"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowNewCollection(false)}
                  className="flex-1 px-4 py-2 bg-soft-beige text-warm-brown rounded-lg hover:bg-light-peach transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection, index) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/50 p-4 rounded-lg hover:bg-white/70 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif font-bold text-warm-brown flex items-center gap-2">
                <Folder className="w-5 h-5" />
                {collection.name}
              </h3>
              <span className="text-sm text-warm-brown/60">
                {collection.books.length} books
              </span>
            </div>
            
            <div className="space-y-2">
              {collection.books.slice(0, 3).map(bookId => {
                const book = books.find(b => b.id === bookId);
                return book ? (
                  <div key={bookId} className="flex items-center justify-between text-sm">
                    <span className="text-warm-brown/70 truncate">{book.title}</span>
                    <button
                      onClick={() => handleRemoveBookFromCollection(collection.id, bookId)}
                      className="text-warm-brown/40 hover:text-red-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : null;
              })}
              {collection.books.length > 3 && (
                <div className="text-sm text-warm-brown/50">
                  +{collection.books.length - 3} more...
                </div>
              )}
            </div>
            
            {collection.books.length === 0 && (
              <div className="text-center py-4 text-warm-brown/40">
                <BookOpen className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">No books yet</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsManager;
