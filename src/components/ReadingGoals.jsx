import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Calendar, Award, Plus, Check } from 'lucide-react';

const ReadingGoals = ({ books }) => {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Monthly Reading', target: 4, current: 0, unit: 'books' },
    { id: 2, title: 'Yearly Reading', target: 52, current: 0, unit: 'books' },
    { id: 3, title: 'Pages per Month', target: 1000, current: 0, unit: 'pages' }
  ]);
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', target: 0, unit: 'books' });

  // Calculate current progress
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const thisMonthBooks = books.filter(book => {
    if (book.finishDate) {
      const finishDate = new Date(book.finishDate);
      return finishDate.getMonth() === currentMonth && finishDate.getFullYear() === currentYear;
    }
    return false;
  }).length;

  const thisYearBooks = books.filter(book => {
    if (book.finishDate) {
      const finishDate = new Date(book.finishDate);
      return finishDate.getFullYear() === currentYear;
    }
    return false;
  }).length;

  // Update goals with current progress
  const updatedGoals = goals.map(goal => {
    if (goal.title === 'Monthly Reading') {
      return { ...goal, current: thisMonthBooks };
    } else if (goal.title === 'Yearly Reading') {
      return { ...goal, current: thisYearBooks };
    }
    return goal;
  });

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.target > 0) {
      const goal = {
        id: Date.now(),
        title: newGoal.title,
        target: newGoal.target,
        current: 0,
        unit: newGoal.unit
      };
      setGoals([...goals, goal]);
      setNewGoal({ title: '', target: 0, unit: 'books' });
      setShowNewGoal(false);
    }
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'bg-sage-green';
    if (percentage >= 75) return 'bg-blush-pink';
    if (percentage >= 50) return 'bg-light-peach';
    return 'bg-dusty-rose';
  };

  return (
    <div className="paper-page p-6 rounded-lg shadow-lg mb-8">
      <div className="flex items-center justify-between mb-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-serif font-bold text-warm-brown flex items-center gap-3"
        >
          <Target className="w-8 h-8" />
          Reading Goals
        </motion.h2>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNewGoal(true)}
          className="feminine-button flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Goal
        </motion.button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {updatedGoals.map((goal, index) => {
          const percentage = getProgressPercentage(goal.current, goal.target);
          const progressColor = getProgressColor(percentage);
          const isCompleted = percentage >= 100;

          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white/50 p-4 rounded-lg ${isCompleted ? 'ring-2 ring-sage-green' : ''}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif font-bold text-warm-brown">{goal.title}</h3>
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-sage-green text-white p-1 rounded-full"
                  >
                    <Check className="w-3 h-3" />
                  </motion.div>
                )}
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-warm-brown/60 mb-2">
                  <span>{goal.current} / {goal.target} {goal.unit}</span>
                  <span>{Math.round(percentage)}%</span>
                </div>
                
                <div className="w-full bg-warm-brown/20 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-3 rounded-full ${progressColor}`}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-warm-brown/50">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {goal.current > 0 ? 'On track!' : 'Get started!'}
                </span>
                {isCompleted && (
                  <span className="flex items-center gap-1 text-sage-green">
                    <Award className="w-3 h-3" />
                    Completed!
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* New Goal Modal */}
      {showNewGoal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowNewGoal(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-serif font-bold text-warm-brown mb-4">Create New Goal</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-warm-brown mb-2">Goal Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="e.g., Read 10 Classics"
                  className="w-full px-4 py-2 border border-warm-brown/20 rounded-lg focus:border-blush-pink outline-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-warm-brown mb-2">Target</label>
                  <input
                    type="number"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({ ...newGoal, target: parseInt(e.target.value) || 0 })}
                    placeholder="10"
                    className="w-full px-4 py-2 border border-warm-brown/20 rounded-lg focus:border-blush-pink outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-warm-brown mb-2">Unit</label>
                  <select
                    value={newGoal.unit}
                    onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                    className="w-full px-4 py-2 border border-warm-brown/20 rounded-lg focus:border-blush-pink outline-none"
                  >
                    <option value="books">Books</option>
                    <option value="pages">Pages</option>
                    <option value="hours">Hours</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddGoal}
                className="flex-1 feminine-button"
              >
                Create Goal
              </button>
              <button
                onClick={() => setShowNewGoal(false)}
                className="flex-1 px-4 py-2 bg-soft-beige text-warm-brown rounded-lg hover:bg-light-peach transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ReadingGoals;
