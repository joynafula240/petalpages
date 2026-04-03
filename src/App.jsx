import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookShelf from './components/BookShelf';
import BookJournal from './components/BookJournal';
import ReadingDashboard from './components/ReadingDashboard';
import CollectionsManager from './components/CollectionsManager';
import SearchFilter from './components/SearchFilter';
import BookRecommendations from './components/BookRecommendations';
import ReadingGoals from './components/ReadingGoals';
import LandingPage from './components/LandingPage';
import { Plus, Home, BarChart3, Folder, Sparkles, Target, BookOpen } from 'lucide-react';

const App = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [activeSection, setActiveSection] = useState('library');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  // Load books from localStorage on mount
  useEffect(() => {
    const savedBooks = localStorage.getItem('petalPagesBooks');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    } else {
      // Add some sample books for demonstration
      const sampleBooks = [
        {
          id: '1',
          title: 'The Secret Garden',
          author: 'Frances Hodgson Burnett',
          status: 'Completed',
          rating: 5,
          genre: 'Classic Literature',
          trope: 'Found Family',
          format: 'paperback',
          notes: 'A beautiful story about transformation and healing power of nature. The way Mary Lennox changes throughout the book is heartwarming.',
          quotes: 'If you look the right way, you can see that the whole world is a garden.',
          startDate: '2024-01-15',
          finishDate: '2024-01-28',
          cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=1200&fit=crop&auto=format&q=90'
        },
        {
          id: '2',
          title: 'Little Women',
          author: 'Louisa May Alcott',
          status: 'Reading',
          rating: 4,
          genre: 'Classic Literature',
          trope: 'Found Family',
          format: 'ebook',
          notes: 'Currently enjoying sister dynamics and historical setting. Jo March is such an inspiring character.',
          quotes: 'I am not afraid of storms, for I am learning how to sail my ship.',
          startDate: '2024-02-01',
          finishDate: '',
          cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop&auto=format&q=90'
        }
      ];
      setBooks(sampleBooks);
    }
  }, []);

  // Save books to localStorage whenever they change
  useEffect(() => {
    if (books.length > 0) {
      localStorage.setItem('petalPagesBooks', JSON.stringify(books));
    }
  }, [books]);

  // Filter books based on search and filters
  useEffect(() => {
    let filtered = books;

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(book => book[key] === value);
      }
    });

    setFilteredBooks(filtered);
  }, [books, searchTerm, filters]);

  const handleStart = () => {
    setShowLanding(false);
  };

  const handleAddBook = (newBook) => {
    const bookWithId = {
      ...newBook,
      id: Date.now().toString(),
    };
    setBooks([...books, bookWithId]);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseJournal = () => {
    setSelectedBook(null);
  };

  const handleUpdateBook = (updatedBook) => {
    setBooks(books.map(book => 
      book.id === updatedBook.id ? updatedBook : book
    ));
  };

  const handleDeleteBook = (bookId) => {
    setBooks(books.filter(book => book.id !== bookId));
    setSelectedBook(null);
  };

  const handleFilter = (newFilters, newSearchTerm) => {
    setFilters(newFilters);
    setSearchTerm(newSearchTerm);
  };

  const handleSort = (sortBy) => {
    const sorted = [...filteredBooks].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });
    setFilteredBooks(sorted);
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'library', label: 'Library', icon: Home },
    { id: 'collections', label: 'Collections', icon: Folder },
    { id: 'recommendations', label: 'Recommendations', icon: Sparkles },
    { id: 'goals', label: 'Goals', icon: Target }
  ];

  // Show landing page first
  if (showLanding) {
    return <LandingPage onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen relative">
      {/* Black Book Doodle Pattern Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-book-pattern opacity-30"
          style={{
            backgroundSize: '120px',
            backgroundRepeat: 'repeat',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-periwinkle-50 via-periwinkle-100 to-space-indigo-100"></div>
      </div>
      
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="sticky top-0 bg-white/80 backdrop-blur-sm shadow-md z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-space-indigo" />
                <span className="text-xl font-serif font-bold text-space-indigo">Petal Pages</span>
              </div>

              {/* Navigation Items */}
              <div className="hidden md:flex items-center gap-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-[#2d3047] text-periwinkle-50'
                          : 'text-space-indigo/70 hover:bg-periwinkle-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Home Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLanding(true)}
                className="p-2 bg-white/80 backdrop-blur-sm soft-rounded shadow-lg hover:shadow-xl transition-all duration-300 group"
                title="Back to Home"
              >
                <Home className="w-5 h-5 text-space-indigo group-hover:text-watermelon transition-colors duration-200" />
              </motion.button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Dashboard Section */}
          {activeSection === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ReadingDashboard books={books} />
            </motion.div>
          )}

          {/* Library Section */}
          {activeSection === 'library' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <SearchFilter books={books} onFilter={handleFilter} onSort={handleSort} />
              <BookShelf books={filteredBooks} onBookClick={handleBookClick} onAddBook={handleAddBook} />
            </motion.div>
          )}

          {/* Collections Section */}
          {activeSection === 'collections' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CollectionsManager books={books} />
            </motion.div>
          )}

          {/* Recommendations Section */}
          {activeSection === 'recommendations' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <BookRecommendations userBooks={books} onAddBook={handleAddBook} />
            </motion.div>
          )}

          {/* Goals Section */}
          {activeSection === 'goals' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ReadingGoals books={books} />
            </motion.div>
          )}
        </div>
      </div>

      {/* Book Journal Modal */}
      <AnimatePresence>
        {selectedBook && (
          <BookJournal
            key={selectedBook.id}
            book={selectedBook}
            onClose={handleCloseJournal}
            onUpdate={handleUpdateBook}
            onDelete={handleDeleteBook}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
