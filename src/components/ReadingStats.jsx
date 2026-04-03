import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Clock, Heart } from 'lucide-react';

const ReadingStats = ({ completedBooks, currentReads }) => {
  const stats = [
    {
      icon: BookOpen,
      label: 'Books Read',
      value: completedBooks,
      color: 'from-evergreen to-dark-teal',
      bgColor: 'bg-evergreen/20'
    },
    {
      icon: Clock,
      label: 'Currently Reading',
      value: currentReads,
      color: 'from-dark-teal to-midnight-violet',
      bgColor: 'bg-dark-teal/20'
    },
    {
      icon: TrendingUp,
      label: 'Reading Goal',
      value: '12/24',
      color: 'from-dry-sage to-petal-frost',
      bgColor: 'bg-dry-sage/20'
    },
    {
      icon: Heart,
      label: 'Favorite Genre',
      value: 'Fiction',
      color: 'from-petal-frost to-midnight-violet',
      bgColor: 'bg-petal-frost/50'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5, scale: 1.05 }}
          className="relative overflow-hidden"
        >
          <div className={`bg-white/80 backdrop-blur-sm soft-rounded card-shadow p-6 border border-petal-frost/30 ${stat.bgColor} group`}>
            {/* Decorative background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            
            {/* Icon */}
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 soft-rounded bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="w-2 h-2 bg-dry-sage rounded-full animate-pulse" />
            </div>
            
            {/* Content */}
            <div>
              <p className="text-midnight-violet/60 text-sm font-medium mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-midnight-violet font-serif">
                {stat.value}
              </p>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-petal-frost/20 rounded-full blur-xl" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ReadingStats;
