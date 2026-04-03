import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Shuffle = ({
  text,
  className = '',
  style = {},
  shuffleDirection = 'right',
  duration = 0.35,
  stagger = 0.03,
  triggerOnHover = true,
  tag = 'h1'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [key, setKey] = useState(0);

  const handleHover = () => {
    if (triggerOnHover) {
      setIsHovered(true);
      setKey(prev => prev + 1); // Force re-render to restart animation
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Split text into characters
  const chars = (text || '').split('').map((char, index) => ({
    char,
    id: `${key}-${index}`
  }));

  // Animation variants based on direction
  const getVariants = () => {
    switch (shuffleDirection) {
      case 'right':
        return {
          hidden: { x: -50, opacity: 0 },
          visible: { x: 0, opacity: 1 }
        };
      case 'left':
        return {
          hidden: { x: 50, opacity: 0 },
          visible: { x: 0, opacity: 1 }
        };
      case 'up':
        return {
          hidden: { y: 30, opacity: 0 },
          visible: { y: 0, opacity: 1 }
        };
      case 'down':
        return {
          hidden: { y: -30, opacity: 0 },
          visible: { y: 0, opacity: 1 }
        };
      default:
        return {
          hidden: { x: -50, opacity: 0 },
          visible: { x: 0, opacity: 1 }
        };
    }
  };

  const variants = getVariants();

  const Tag = tag;

  return (
    <motion.div
      className={className}
      style={style}
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence mode="wait">
        {chars.map((item, index) => (
          <motion.span
            key={item.id}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{
              duration,
              ease: "easeOut",
              delay: index * stagger
            }}
            style={{ display: 'inline-block' }}
          >
            {item.char === ' ' ? '\u00A0' : item.char}
          </motion.span>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default Shuffle;
