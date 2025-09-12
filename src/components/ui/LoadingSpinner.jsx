import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ 
  size = 'md', 
  text = 'جاري التحميل...', 
  variant = 'spinner',
  color = 'brand',
  showProgress = false,
  progress = 0,
  className = '',
  fullScreen = false
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20'
  };

  const colorClasses = {
    brand: 'border-brand/20 border-t-brand',
    blue: 'border-blue-200 border-t-blue-600',
    green: 'border-green-200 border-t-green-600',
    red: 'border-red-200 border-t-red-600',
    yellow: 'border-yellow-200 border-t-yellow-600',
    purple: 'border-purple-200 border-t-purple-600',
    gray: 'border-gray-200 border-t-gray-600'
  };

  const SpinnerVariant = () => (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizeClasses[size]} border-4 ${colorClasses[color]} rounded-full`}
      role="status"
      aria-label="Loading"
    />
  );

  const DotsVariant = () => (
    <div className="flex space-x-1 rtl:space-x-reverse">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.2
          }}
          className={`w-2 h-2 bg-${color === 'brand' ? 'brand' : color + '-600'} rounded-full`}
        />
      ))}
    </div>
  );

  const PulseVariant = () => (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className={`${sizeClasses[size]} bg-${color === 'brand' ? 'brand' : color + '-600'} rounded-full`}
    />
  );

  const ProgressBar = () => (
    <div className="w-full max-w-xs">
      <div className="bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <motion.div
          className={`bg-${color === 'brand' ? 'brand' : color + '-600'} h-2 rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
        {Math.round(progress)}%
      </p>
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case 'dots':
        return <DotsVariant />;
      case 'pulse':
        return <PulseVariant />;
      case 'progress':
        return <ProgressBar />;
      default:
        return <SpinnerVariant />;
    }
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center'
    : `flex flex-col items-center justify-center py-12 ${className}`;

  return (
    <div className={containerClasses}>
      {renderVariant()}
      {text && !showProgress && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-gray-600 dark:text-gray-400 text-center animate-pulse"
        >
          {text}
        </motion.p>
      )}
      {showProgress && variant !== 'progress' && (
        <div className="mt-4">
          <ProgressBar />
        </div>
      )}
    </div>
  );
};

// Error Boundary Component for Loading States
export const LoadingErrorBoundary = ({ children, fallback }) => {
  return (
    <React.Suspense fallback={fallback || <LoadingSpinner />}>
      {children}
    </React.Suspense>
  );
};

// Hook for managing loading states
export const useLoadingState = (initialState = false) => {
  const [loading, setLoading] = React.useState(initialState);
  const [error, setError] = React.useState(null);
  const [progress, setProgress] = React.useState(0);

  const startLoading = () => {
    setLoading(true);
    setError(null);
    setProgress(0);
  };

  const stopLoading = () => {
    setLoading(false);
    setProgress(100);
  };

  const setLoadingError = (errorMessage) => {
    setLoading(false);
    setError(errorMessage);
  };

  const updateProgress = (value) => {
    setProgress(Math.min(100, Math.max(0, value)));
  };

  return {
    loading,
    error,
    progress,
    startLoading,
    stopLoading,
    setLoadingError,
    updateProgress
  };
};

export default LoadingSpinner;