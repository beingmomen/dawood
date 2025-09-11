import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', text = 'جاري التحميل...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`${sizeClasses[size]} border-4 border-brand/20 border-t-brand rounded-full`}
      />
      {text && (
        <p className="mt-4 text-gray-600 text-center">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;