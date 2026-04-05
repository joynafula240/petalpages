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
import HomePage from './components/HomePage';
import Auth from './components/Auth';
import { Plus, Home, BarChart3, Folder, Sparkles, Target, BookOpen, LogOut, User } from 'lucide-react';

const App = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [activeSection, setActiveSection] = useState('library');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status and load data on mount
  useEffect(() => {
    try {
      // Check if user is logged in
      const savedUser = localStorage.getItem('petalPagesCurrentUser');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
        
        // Load user's books
        const userBooks = localStorage.getItem(`petalPagesBooks_${user.id}`);
        if (userBooks) {
          const parsedBooks = JSON.parse(userBooks);
          setBooks(parsedBooks);
        } else {
          setBooks([]);
        }
        
        // Load user preferences
        const savedSection = localStorage.getItem(`petalPagesActiveSection_${user.id}`);
        if (savedSection) {
          setActiveSection(savedSection);
        }

        const savedSearch = localStorage.getItem(`petalPagesSearchTerm_${user.id}`);
        if (savedSearch) {
          setSearchTerm(savedSearch);
        }

        const savedFilters = localStorage.getItem(`petalPagesFilters_${user.id}`);
        if (savedFilters) {
          setFilters(JSON.parse(savedFilters));
        }

        const savedLanding = localStorage.getItem(`petalPagesShowLanding_${user.id}`);
        if (savedLanding) {
          setShowLanding(JSON.parse(savedLanding));
        }
      } else {
        // User is not logged in - load guest data
        setIsAuthenticated(false);
        
        // Load guest books
        const guestBooks = localStorage.getItem('petalPagesBooks_guest');
        if (guestBooks) {
          const parsedBooks = JSON.parse(guestBooks);
          setBooks(parsedBooks);
        } else {
          setBooks([]);
        }
        
        // Load guest preferences
        const savedSection = localStorage.getItem('petalPagesActiveSection_guest');
        if (savedSection) {
          setActiveSection(savedSection);
        }

        const savedSearch = localStorage.getItem('petalPagesSearchTerm_guest');
        if (savedSearch) {
          setSearchTerm(savedSearch);
        }

        const savedFilters = localStorage.getItem('petalPagesFilters_guest');
        if (savedFilters) {
          setFilters(JSON.parse(savedFilters));
        }

        const savedLanding = localStorage.getItem('petalPagesShowLanding_guest');
        if (savedLanding) {
          setShowLanding(JSON.parse(savedLanding));
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }, []);

  // Save books to localStorage whenever they change
  useEffect(() => {
    try {
      if (isAuthenticated && currentUser) {
        localStorage.setItem(`petalPagesBooks_${currentUser.id}`, JSON.stringify(books));
      } else {
        // Save guest data
        localStorage.setItem('petalPagesBooks_guest', JSON.stringify(books));
      }
    } catch (error) {
      console.error('Error saving books to localStorage:', error);
    }
  }, [books, isAuthenticated, currentUser]);

  // Save user preferences
  useEffect(() => {
    try {
      if (isAuthenticated && currentUser) {
        localStorage.setItem(`petalPagesActiveSection_${currentUser.id}`, activeSection);
      } else {
        localStorage.setItem('petalPagesActiveSection_guest', activeSection);
      }
    } catch (error) {
      console.error('Error saving active section:', error);
    }
  }, [activeSection, isAuthenticated, currentUser]);

  useEffect(() => {
    try {
      if (isAuthenticated && currentUser) {
        localStorage.setItem(`petalPagesSearchTerm_${currentUser.id}`, searchTerm);
      } else {
        localStorage.setItem('petalPagesSearchTerm_guest', searchTerm);
      }
    } catch (error) {
      console.error('Error saving search term:', error);
    }
  }, [searchTerm, isAuthenticated, currentUser]);

  useEffect(() => {
    try {
      if (isAuthenticated && currentUser) {
        localStorage.setItem(`petalPagesFilters_${currentUser.id}`, JSON.stringify(filters));
      } else {
        localStorage.setItem('petalPagesFilters_guest', JSON.stringify(filters));
      }
    } catch (error) {
      console.error('Error saving filters:', error);
    }
  }, [filters, isAuthenticated, currentUser]);

  useEffect(() => {
    try {
      if (isAuthenticated && currentUser) {
        localStorage.setItem(`petalPagesShowLanding_${currentUser.id}`, JSON.stringify(showLanding));
      } else {
        localStorage.setItem('petalPagesShowLanding_guest', JSON.stringify(showLanding));
      }
    } catch (error) {
      console.error('Error saving landing state:', error);
    }
  }, [showLanding, isAuthenticated, currentUser]);

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setShowLanding(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('petalPagesCurrentUser');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setBooks([]);
    setSelectedBook(null);
    setSearchTerm('');
    setFilters({});
    setActiveSection('library');
  };

  // Filter books based on search and filters
  useEffect(() => {
    let filtered = books;

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(book =>
        (book.title || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
        (book.author || '').toLowerCase().includes((searchTerm || '').toLowerCase())
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
    setSelectedBook(bookWithId); // Open the book journal modal
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
    setSelectedBook(updatedBook);
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
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'collections', label: 'Collections', icon: Folder },
    { id: 'recommendations', label: 'Recommendations', icon: Sparkles },
    { id: 'goals', label: 'Goals', icon: Target }
  ];

  // Show landing page if authenticated but first visit
  if (showLanding) {
    return <LandingPage onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen relative aesthetic-overlay paper-texture">
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
      
      {/* Aesthetic Decorative Elements */}
      <div className="fixed top-4 left-4 z-5 vintage-typography">LOVE</div>
      <div className="fixed top-4 right-4 z-5 vintage-typography">VINTAGE</div>
      <div className="fixed bottom-4 left-4 z-5 vintage-typography">DREAM</div>
      
      {/* Subtle Glitch Effects on Background - DISABLED */}
      {/* <div className="fixed inset-0 z-1 glitch-effect opacity-30"></div> */}
      
      {/* Mirror Distortion Layers - DISABLED */}
      {/* <div className="fixed inset-0 z-2 mirror-distortion"></div> */}
      
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="sticky top-0 bg-white/80 backdrop-blur-sm shadow-md z-40 aesthetic-overlay soft-shadow-layer">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 relative">
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
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors scrapbook-sticker ${
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

              {/* User Info & Authentication */}
              <div className="flex items-center gap-3">
                {isAuthenticated ? (
                  <>
                    <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-[#c1bddb]/10">
                      <User className="w-4 h-4 text-[#2d3047]" />
                      <span className="text-sm font-medium text-[#2d3047]">
                        {currentUser?.name || 'User'}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-[#2d3047]/70 hover:bg-red-50 hover:text-red-600"
                      title="Logout"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="hidden sm:inline text-sm font-medium">Logout</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      // Show login modal or navigate to auth page
                      const authModal = document.createElement('div');
                      authModal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50';
                      authModal.innerHTML = `
                        <div class="bg-white rounded-2xl shadow-xl p-8 m-4 max-w-md w-full">
                          <h2 class="text-2xl font-bold text-[#2d3047] mb-4">Sign In</h2>
                          <p class="text-[#2d3047]/70 mb-6">Sign in to save your data across devices</p>
                          <div class="space-y-4">
                            <input type="email" placeholder="Email" class="w-full px-3 py-2 border border-[#c1bddb]/20 rounded-lg">
                            <input type="password" placeholder="Password" class="w-full px-3 py-2 border border-[#c1bddb]/20 rounded-lg">
                            <button onclick="this.closest('.fixed').remove()" class="w-full bg-[#2d3047] text-white py-2 rounded-lg hover:bg-[#2d3047]/90">Sign In</button>
                            <button onclick="this.closest('.fixed').remove()" class="w-full text-[#2d3047]/70 py-2">Cancel</button>
                          </div>
                        </div>
                      `;
                      document.body.appendChild(authModal);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-[#2d3047]/70 hover:bg-[#c1bddb]/20"
                    title="Sign In"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm font-medium">Sign In</span>
                  </button>
                )}
              </div>
              
              {/* Subtle decorative element */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 vintage-typography text-xs opacity-20">
                JOURNAL
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative lavender-grid">
          {/* Home Section */}
          {activeSection === 'home' && (
            <HomePage 
              books={books}
              onNavigateToLibrary={() => setActiveSection('library')}
              onNavigateToDashboard={() => setActiveSection('dashboard')}
            />
          )}

          {/* Dashboard Section */}
          {activeSection === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="aesthetic-overlay soft-shadow-layer"
            >
              <ReadingDashboard books={books} />
            </motion.div>
          )}

          {/* Library Section */}
          {activeSection === 'library' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="aesthetic-overlay"
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
              className="aesthetic-overlay soft-shadow-layer"
            >
              <CollectionsManager books={books} />
            </motion.div>
          )}

          {/* Recommendations Section */}
          {activeSection === 'recommendations' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="aesthetic-overlay"
            >
              <BookRecommendations userBooks={books} onAddBook={handleAddBook} />
            </motion.div>
          )}

          {/* Goals Section */}
          {activeSection === 'goals' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="aesthetic-overlay soft-shadow-layer"
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
            className="aesthetic-overlay mirror-distortion"
          />
        )}
      </AnimatePresence>
      
      {/* Floating Decorative Elements */}
      <div className="fixed bottom-8 right-8 vintage-typography text-xs opacity-30 transform rotate-12">
        MEMORIES
      </div>
      <div className="fixed top-1/3 right-8 vintage-typography text-xs opacity-20 transform -rotate-6">
        STORIES
      </div>
    </div>
  );
};

export default App;
