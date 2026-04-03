import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, ExternalLink, RefreshCw } from 'lucide-react';

const BookRecommendations = ({ userBooks, onAddBook }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  // AI-powered recommendations based on user's reading history
  const generateRecommendations = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userGenres = {};
      const userAuthors = {};
      
      // Analyze user's preferences
      userBooks.forEach(book => {
        if (book.genre) {
          userGenres[book.genre] = (userGenres[book.genre] || 0) + 1;
        }
        if (book.author) {
          userAuthors[book.author] = (userAuthors[book.author] || 0) + 1;
        }
      });

      // Get favorite genres
      const favoriteGenres = Object.entries(userGenres)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([genre]) => genre);

      // Generate recommendations based on preferences
      const allRecommendations = [
        {
          title: "The Midnight Library",
          author: "Matt Haig",
          genre: "Contemporary",
          rating: 4.5,
          reason: "You enjoyed Contemporary fiction",
          cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop"
        },
        {
          title: "Project Hail Mary",
          author: "Andy Weir",
          genre: "Sci-Fi",
          rating: 4.8,
          reason: "Perfect match for Sci-Fi lovers",
          cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop"
        },
        {
          title: "The Seven Husbands of Evelyn Hugo",
          author: "Taylor Jenkins Reid",
          genre: "Romance",
          rating: 4.6,
          reason: "Highly rated in your favorite genres",
          cover: "https://images.unsplash.com/photo-1481627834876-b7833e08f2e7?w=300&h=400&fit=crop"
        },
        {
          title: "Dune",
          author: "Frank Herbert",
          genre: "Sci-Fi",
          rating: 4.7,
          reason: "Classic Sci-Fi masterpiece",
          cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop"
        },
        {
          title: "The Silent Patient",
          author: "Alex Michaelides",
          genre: "Thriller",
          rating: 4.4,
          reason: "Popular thriller you might enjoy",
          cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop"
        },
        {
          title: "Circe",
          author: "Madeline Miller",
          genre: "Fantasy",
          rating: 4.6,
          reason: "Beautiful Fantasy retelling",
          cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop"
        }
      ];

      // Filter and rank recommendations
      const filteredRecs = allRecommendations
        .filter(rec => 
          !userBooks.find(book => book.title === rec.title) &&
          (favoriteGenres.length === 0 || favoriteGenres.includes(rec.genre))
        )
        .slice(0, 4);

      setRecommendations(filteredRecs);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    generateRecommendations();
  }, [userBooks]);

  const handleAddRecommendedBook = (recommendation) => {
    const newBook = {
      id: Date.now().toString(),
      title: recommendation.title,
      author: recommendation.author,
      genre: recommendation.genre,
      rating: Math.round(recommendation.rating),
      status: 'To Read',
      notes: `Recommended because: ${recommendation.reason}`,
      cover: recommendation.cover,
      startDate: '',
      finishDate: '',
      quotes: '',
      trope: '',
      format: ''
    };
    
    onAddBook && onAddBook(newBook);
  };

  return (
    <div className="paper-page p-6 rounded-lg shadow-lg mb-8">
      <div className="flex items-center justify-between mb-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-serif font-bold text-warm-brown flex items-center gap-3"
        >
          <Sparkles className="w-8 h-8" />
          Recommended for You
        </motion.h2>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateRecommendations}
          disabled={loading}
          className="feminine-button flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </motion.button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-blush-pink border-t-transparent rounded-full"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/50 rounded-lg overflow-hidden hover:bg-white/70 transition-colors"
            >
              <div className="h-48 bg-gradient-to-br from-blush-pink to-dusty-rose relative">
                {rec.cover && (
                  <img
                    src={rec.cover}
                    alt={rec.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <span className="text-xs font-medium text-warm-brown">
                    ⭐ {rec.rating}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-serif font-bold text-warm-brown mb-1 line-clamp-1">
                  {rec.title}
                </h3>
                <p className="text-sm text-warm-brown/60 mb-2">
                  by {rec.author}
                </p>
                <p className="text-xs text-warm-brown/50 mb-3">
                  {rec.reason}
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddRecommendedBook(rec)}
                  className="w-full feminine-button text-sm flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-3 h-3" />
                  Add to Library
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {recommendations.length === 0 && !loading && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-warm-brown/30" />
          <p className="text-warm-brown/60 font-serif">
            No recommendations available yet
          </p>
          <p className="text-warm-brown/40 text-sm mt-2">
            Add more books to get personalized recommendations
          </p>
        </div>
      )}
    </div>
  );
};

export default BookRecommendations;
