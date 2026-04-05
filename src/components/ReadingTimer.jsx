import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Clock, BookOpen, Target, Flame } from 'lucide-react';

const ReadingTimer = ({ book, onClose, onSessionComplete }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [sessions, setSessions] = useState([]);
  const [targetMinutes, setTargetMinutes] = useState(30);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Load previous sessions for this book
    const savedSessions = localStorage.getItem(`readingSessions_${book.id}`);
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, [book.id]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    // Save sessions when they change
    if (sessions.length > 0) {
      localStorage.setItem(`readingSessions_${book.id}`, JSON.stringify(sessions));
    }
  }, [sessions, book.id]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    if (!isRunning && time > 0) {
      // Resume from previous time
    }
    setIsRunning(!isRunning);
  };

  const handleStop = () => {
    if (time > 0) {
      const newSession = {
        id: Date.now(),
        bookId: book.id,
        bookTitle: book.title,
        duration: time,
        date: new Date().toISOString(),
        pagesRead: Math.floor(time / 60), // Estimate 1 page per minute
        targetMinutes: targetMinutes
      };
      
      const updatedSessions = [...sessions, newSession];
      setSessions(updatedSessions);
      
      if (onSessionComplete) {
        onSessionComplete(newSession);
      }
    }
    
    handleReset();
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const getTotalReadingTime = () => {
    return sessions.reduce((total, session) => total + session.duration, 0);
  };

  const getAverageSessionTime = () => {
    if (sessions.length === 0) return 0;
    return Math.round(getTotalReadingTime() / sessions.length);
  };

  const getStreakDays = () => {
    const sessionDates = sessions.map(s => new Date(s.date).toDateString());
    const uniqueDates = [...new Set(sessionDates)];
    return uniqueDates.length;
  };

  const progress = time > 0 ? (time / (targetMinutes * 60)) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-[#2d3047]" />
            <div>
              <h3 className="text-lg font-bold text-[#2d3047]">Reading Timer</h3>
              <p className="text-sm text-[#2d3047]/60">{book.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Timer Display */}
        <div className="p-6 text-center">
          <motion.div
            key={time}
            initial={{ scale: 1 }}
            animate={{ scale: isRunning ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 1, repeat: isRunning ? Infinity : 0 }}
            className="text-6xl font-mono font-bold text-[#2d3047] mb-4"
          >
            {formatTime(time)}
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-[#2d3047]/60 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-[#2d3047] to-[#c1bddb] h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Target Time */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <label className="text-sm text-[#2d3047]/60">Target:</label>
            <select
              value={targetMinutes}
              onChange={(e) => setTargetMinutes(parseInt(e.target.value))}
              className="px-3 py-1 border border-[#c1bddb]/20 rounded-lg text-sm focus:outline-none focus:border-[#2d3047]"
              disabled={isRunning}
            >
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
              <option value={45}>45 min</option>
              <option value={60}>1 hour</option>
              <option value={90}>1.5 hours</option>
              <option value={120}>2 hours</option>
            </select>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartPause}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                isRunning 
                  ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                  : 'bg-[#2d3047] hover:bg-[#2d3047]/90 text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStop}
              disabled={time === 0}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Target className="w-5 h-5" />
              Save Session
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              disabled={time === 0}
              className="flex items-center gap-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </motion.button>
          </div>
        </div>

        {/* Statistics */}
        {sessions.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <h4 className="font-bold text-[#2d3047] mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Reading Statistics
            </h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-[#2d3047]">
                  {formatTime(getTotalReadingTime()).split(':')[0]}h {formatTime(getTotalReadingTime()).split(':')[1]}m
                </div>
                <div className="text-xs text-[#2d3047]/60">Total Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#2d3047]">{sessions.length}</div>
                <div className="text-xs text-[#2d3047]/60">Sessions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#2d3047] flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  {getStreakDays()}
                </div>
                <div className="text-xs text-[#2d3047]/60">Reading Days</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ReadingTimer;
