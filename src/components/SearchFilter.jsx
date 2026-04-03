import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown } from 'lucide-react';

const SearchFilter = ({ books, onFilter, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    genre: '',
    status: '',
    rating: '',
    format: '',
    trope: ''
  });
  const [sortBy, setSortBy] = useState('dateAdded');

  const genreOptions = ['Fantasy', 'Romance', 'Mystery', 'Sci-Fi', 'Thriller', 'Horror', 'Contemporary', 'Historical Fiction', 'Non-Fiction'];
  const statusOptions = ['Reading', 'Completed', 'DNF'];
  const ratingOptions = [5, 4, 3, 2, 1];
  const formatOptions = ['audiobook', 'paperback', 'ebook'];
  const sortOptions = [
    { value: 'dateAdded', label: 'Date Added' },
    { value: 'title', label: 'Title' },
    { value: 'author', label: 'Author' },
    { value: 'rating', label: 'Rating' },
    { value: 'status', label: 'Status' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter && onFilter(newFilters, searchTerm);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    onFilter && onFilter(filters, value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onSort && onSort(value);
  };

  const clearFilters = () => {
    setFilters({
      genre: '',
      status: '',
      rating: '',
      format: '',
      trope: ''
    });
    setSearchTerm('');
    onFilter && onFilter({}, '');
  };

  const activeFilterCount = Object.values(filters).filter(value => value !== '').length;

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warm-brown/40" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search books..."
            className="w-full pl-10 pr-4 py-3 border border-warm-brown/20 rounded-full focus:border-blush-pink outline-none bg-white/50 max-w-2xl"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-4 py-3 border border-warm-brown/20 rounded-lg focus:border-blush-pink outline-none bg-white/50 appearance-none cursor-pointer"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                Sort by {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-warm-brown/40 pointer-events-none" />
        </div>

        {/* Filter Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className="feminine-button flex items-center gap-2 relative"
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-dusty-rose text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </motion.button>

        {/* Clear Filters */}
        {activeFilterCount > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearFilters}
            className="px-4 py-3 bg-soft-beige text-warm-brown rounded-lg hover:bg-light-peach transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear
          </motion.button>
        )}
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-warm-brown/20 pt-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Genre Filter */}
              <div>
                <label className="block text-sm font-medium text-warm-brown mb-2">Genre</label>
                <select
                  value={filters.genre}
                  onChange={(e) => handleFilterChange('genre', e.target.value)}
                  className="w-full px-3 py-2 border border-warm-brown/20 rounded-lg focus:border-blush-pink outline-none bg-white/50"
                >
                  <option value="">All Genres</option>
                  {genreOptions.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-warm-brown mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-warm-brown/20 rounded-lg focus:border-blush-pink outline-none bg-white/50"
                >
                  <option value="">All Status</option>
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-warm-brown mb-2">Rating</label>
                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                  className="w-full px-3 py-2 border border-warm-brown/20 rounded-lg focus:border-blush-pink outline-none bg-white/50"
                >
                  <option value="">All Ratings</option>
                  {ratingOptions.map(rating => (
                    <option key={rating} value={rating}>{rating} Stars</option>
                  ))}
                </select>
              </div>

              {/* Format Filter */}
              <div>
                <label className="block text-sm font-medium text-warm-brown mb-2">Format</label>
                <select
                  value={filters.format}
                  onChange={(e) => handleFilterChange('format', e.target.value)}
                  className="w-full px-3 py-2 border border-warm-brown/20 rounded-lg focus:border-blush-pink outline-none bg-white/50"
                >
                  <option value="">All Formats</option>
                  {formatOptions.map(format => (
                    <option key={format} value={format}>
                      {format.charAt(0).toUpperCase() + format.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchFilter;
