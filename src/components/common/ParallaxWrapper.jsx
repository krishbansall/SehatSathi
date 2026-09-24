import React from 'react';
import { motion } from 'framer-motion';

export const ParallaxWrapper = ({
  children,
  className = '',
  delay = 0,
  yOffset = 30,
  duration = 0.6
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxWrapper;
