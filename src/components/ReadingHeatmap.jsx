import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, BookOpen, Flame } from 'lucide-react';

const ReadingHeatmap = ({ books }) => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    generateHeatmapData();
  }, [books, currentYear]);

  const generateHeatmapData = () => {
    const data = [];
    const startDate = new Date(currentYear, 0, 1);
    const endDate = new Date(currentYear, 11, 31);
    
    // Initialize all days with zero activity
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      data.push({
        date: new Date(d),
        count: 0,
        books: [],
        day: d.getDay(),
        week: Math.floor((d - startDate) / (7 * 24 * 60 * 60 * 1000))
      });
    }

    // Add reading activity from books
    books.forEach(book => {
      if (book.startDate) {
        const start = new Date(book.startDate);
        if (start.getFullYear() === currentYear) {
          const dayData = data.find(d => 
            d.date.toDateString() === start.toDateString()
          );
          if (dayData) {
            dayData.count += 1;
            dayData.books.push({
              title: book.title,
              action: 'Started',
              status: book.status
            });
          }
        }
      }

      if (book.finishDate) {
        const finish = new Date(book.finishDate);
        if (finish.getFullYear() === currentYear) {
          const dayData = data.find(d => 
            d.date.toDateString() === finish.toDateString()
          );
          if (dayData) {
            dayData.count += 2; // Give more weight to finishing
            dayData.books.push({
              title: book.title,
              action: 'Finished',
              rating: book.rating
            });
          }
        }
      }
    });

    setHeatmapData(data);
  };

  const getIntensityClass = (count) => {
    if (count === 0) return 'bg-gray-100';
    if (count <= 1) return 'bg-green-200';
    if (count <= 2) return 'bg-green-300';
    if (count <= 3) return 'bg-green-400';
    return 'bg-green-500';
  };

  const getMonthNames = () => {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  };

  const getDayLabels = () => {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  };

  const getTotalReadingDays = () => {
    return heatmapData.filter(d => d.count > 0).length;
  };

  const getCurrentStreak = () => {
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = heatmapData.length - 1; i >= 0; i--) {
      const dayData = heatmapData[i];
      const dayDate = new Date(dayData.date);
      dayDate.setHours(0, 0, 0, 0);
      
      if (dayDate > today) continue; // Skip future dates
      
      if (dayData.count > 0) {
        streak++;
      } else if (streak > 0) {
        break;
      }
    }
    
    return streak;
  };

  const getBooksForDate = (dateData) => {
    if (!dateData || !dateData.books.length) return null;
    
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <h4 className="font-semibold text-[#2d3047] mb-2">
          {dateData.date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h4>
        <div className="space-y-2">
          {dateData.books.map((book, idx) => (
            <div key={idx} className="text-sm">
              <div className="font-medium text-[#2d3047]">{book.title}</div>
              <div className="text-[#2d3047]/60">
                {book.action} {book.rating && `⭐ ${book.rating}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#c1bddb]/20 aesthetic-overlay soft-shadow-layer">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-[#2d3047]" />
          <h3 className="text-xl font-bold text-[#2d3047]">Reading Activity</h3>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={currentYear}
            onChange={(e) => setCurrentYear(parseInt(e.target.value))}
            className="px-3 py-1 border border-[#c1bddb]/20 rounded-lg text-sm focus:outline-none focus:border-[#2d3047]"
          >
            {[2026, 2025, 2024, 2023, 2022].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#2d3047]">{getTotalReadingDays()}</div>
          <div className="text-xs text-[#2d3047]/60">Reading Days</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#2d3047]">{getCurrentStreak()}</div>
          <div className="text-xs text-[#2d3047]/60 flex items-center justify-center gap-1">
            <Flame className="w-3 h-3" />
            Current Streak
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#2d3047]">{books.length}</div>
          <div className="text-xs text-[#2d3047]/60">Books Read</div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Month labels */}
          <div className="flex mb-2">
            {getMonthNames().map((month, idx) => (
              <div key={idx} className="flex-1 text-xs text-[#2d3047]/60 text-center">
                {idx % 3 === 0 ? month : ''}
              </div>
            ))}
          </div>

          {/* Day labels and heatmap grid */}
          <div className="flex">
            <div className="flex flex-col justify-between mr-2">
              {getDayLabels().map((day, idx) => (
                <div key={idx} className="h-3 text-xs text-[#2d3047]/60">
                  {idx % 2 === 0 ? day : ''}
                </div>
              ))}
            </div>
            
            <div className="flex-1">
              <div className="grid grid-cols-53 gap-1">
                {heatmapData.map((dayData, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.001 }}
                    className={`w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-[#c1bddb] ${getIntensityClass(dayData.count)}`}
                    onMouseEnter={(e) => {
                      setSelectedDate(dayData);
                      // Position tooltip
                      const rect = e.target.getBoundingClientRect();
                      const tooltip = document.getElementById('heatmap-tooltip');
                      if (tooltip && dayData.books.length > 0) {
                        tooltip.style.left = `${rect.left}px`;
                        tooltip.style.top = `${rect.bottom + 5}px`;
                      }
                    }}
                    onMouseLeave={() => setSelectedDate(null)}
                    title={`${dayData.date.toLocaleDateString()}: ${dayData.count} activities`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <span className="text-xs text-[#2d3047]/60">Less</span>
        {['bg-gray-100', 'bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500'].map((color, idx) => (
          <div key={idx} className={`w-3 h-3 rounded-sm ${color}`} />
        ))}
        <span className="text-xs text-[#2d3047]/60">More</span>
      </div>

      {/* Tooltip */}
      {selectedDate && selectedDate.books.length > 0 && (
        <div
          id="heatmap-tooltip"
          className="fixed z-50"
          style={{ pointerEvents: 'none' }}
        >
          {getBooksForDate(selectedDate)}
        </div>
      )}
    </div>
  );
};

export default ReadingHeatmap;
