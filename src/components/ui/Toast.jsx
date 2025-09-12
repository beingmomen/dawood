import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

// Toast Context
const ToastContext = createContext();

// Toast types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  LOADING: 'loading'
};

// Toast positions
export const TOAST_POSITIONS = {
  TOP_RIGHT: 'top-right',
  TOP_LEFT: 'top-left',
  TOP_CENTER: 'top-center',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_CENTER: 'bottom-center'
};

// Individual Toast Component
const Toast = ({ toast, onRemove, position }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev - (100 / (toast.duration / 100));
          if (newProgress <= 0) {
            setIsVisible(false);
            setTimeout(() => onRemove(toast.id), 300);
            return 0;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [toast.duration, toast.id, onRemove]);

  const getIcon = () => {
    switch (toast.type) {
      case TOAST_TYPES.SUCCESS:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case TOAST_TYPES.ERROR:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case TOAST_TYPES.WARNING:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case TOAST_TYPES.INFO:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case TOAST_TYPES.LOADING:
        return (
          <motion.svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </motion.svg>
        );
      default:
        return null;
    }
  };

  const getTypeClasses = () => {
    switch (toast.type) {
      case TOAST_TYPES.SUCCESS:
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200';
      case TOAST_TYPES.ERROR:
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200';
      case TOAST_TYPES.WARNING:
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200';
      case TOAST_TYPES.INFO:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200';
      case TOAST_TYPES.LOADING:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200';
      default:
        return 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  const getProgressColor = () => {
    switch (toast.type) {
      case TOAST_TYPES.SUCCESS:
        return 'bg-green-500';
      case TOAST_TYPES.ERROR:
        return 'bg-red-500';
      case TOAST_TYPES.WARNING:
        return 'bg-yellow-500';
      case TOAST_TYPES.INFO:
        return 'bg-blue-500';
      case TOAST_TYPES.LOADING:
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getAnimationProps = () => {
    const isRight = position.includes('right');
    const isLeft = position.includes('left');
    const isTop = position.includes('top');
    const isBottom = position.includes('bottom');

    let x = 0;
    let y = 0;

    if (isRight) x = 100;
    if (isLeft) x = -100;
    if (isTop) y = -100;
    if (isBottom) y = 100;

    return {
      initial: { opacity: 0, x, y, scale: 0.8 },
      animate: { opacity: 1, x: 0, y: 0, scale: 1 },
      exit: { opacity: 0, x, y, scale: 0.8 }
    };
  };

  return (
    <motion.div
      {...getAnimationProps()}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        relative max-w-sm w-full border rounded-lg shadow-lg p-4 mb-3
        ${getTypeClasses()}
        ${toast.className || ''}
      `}
      style={toast.style}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {toast.title && (
            <h4 className="font-medium text-sm mb-1">
              {toast.title}
            </h4>
          )}
          {toast.message && (
            <p className="text-sm opacity-90">
              {toast.message}
            </p>
          )}
          {toast.action && (
            <div className="mt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toast.action.onClick}
                className="text-xs font-medium underline hover:no-underline focus:outline-none"
              >
                {toast.action.label}
              </motion.button>
            </div>
          )}
        </div>

        {/* Close button */}
        {toast.closable !== false && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onRemove(toast.id)}
            className="flex-shrink-0 opacity-60 hover:opacity-100 focus:outline-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        )}
      </div>

      {/* Progress bar */}
      {toast.duration && toast.duration > 0 && toast.showProgress !== false && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-10 rounded-b-lg overflow-hidden">
          <motion.div
            className={`h-full ${getProgressColor()}`}
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      )}
    </motion.div>
  );
};

// Toast Container Component
const ToastContainer = ({ toasts, position, onRemove }) => {
  const getPositionClasses = () => {
    switch (position) {
      case TOAST_POSITIONS.TOP_RIGHT:
        return 'top-4 right-4';
      case TOAST_POSITIONS.TOP_LEFT:
        return 'top-4 left-4';
      case TOAST_POSITIONS.TOP_CENTER:
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case TOAST_POSITIONS.BOTTOM_RIGHT:
        return 'bottom-4 right-4';
      case TOAST_POSITIONS.BOTTOM_LEFT:
        return 'bottom-4 left-4';
      case TOAST_POSITIONS.BOTTOM_CENTER:
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      default:
        return 'top-4 right-4';
    }
  };

  if (toasts.length === 0) return null;

  return createPortal(
    <div className={`fixed z-50 pointer-events-none ${getPositionClasses()}`}>
      <div className="pointer-events-auto">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              toast={toast}
              position={position}
              onRemove={onRemove}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>,
    document.body
  );
};

// Toast Provider Component
export const ToastProvider = ({ 
  children, 
  position = TOAST_POSITIONS.TOP_RIGHT,
  maxToasts = 5,
  defaultDuration = 5000
}) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      duration: defaultDuration,
      closable: true,
      showProgress: true,
      ...toast
    };

    setToasts(prev => {
      const updated = [newToast, ...prev];
      return updated.slice(0, maxToasts);
    });

    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const updateToast = (id, updates) => {
    setToasts(prev => prev.map(toast => 
      toast.id === id ? { ...toast, ...updates } : toast
    ));
  };

  const clearToasts = () => {
    setToasts([]);
  };

  const contextValue = {
    addToast,
    removeToast,
    updateToast,
    clearToasts,
    toasts
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer 
        toasts={toasts} 
        position={position} 
        onRemove={removeToast} 
      />
    </ToastContext.Provider>
  );
};

// Hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const { addToast, removeToast, updateToast, clearToasts } = context;

  // Convenience methods
  const success = (message, options = {}) => {
    return addToast({
      type: TOAST_TYPES.SUCCESS,
      message,
      ...options
    });
  };

  const error = (message, options = {}) => {
    return addToast({
      type: TOAST_TYPES.ERROR,
      message,
      duration: 0, // Don't auto-dismiss errors
      ...options
    });
  };

  const warning = (message, options = {}) => {
    return addToast({
      type: TOAST_TYPES.WARNING,
      message,
      ...options
    });
  };

  const info = (message, options = {}) => {
    return addToast({
      type: TOAST_TYPES.INFO,
      message,
      ...options
    });
  };

  const loading = (message, options = {}) => {
    return addToast({
      type: TOAST_TYPES.LOADING,
      message,
      duration: 0, // Don't auto-dismiss loading toasts
      closable: false,
      showProgress: false,
      ...options
    });
  };

  const promise = async (promise, messages) => {
    const loadingId = loading(messages.loading || 'جاري التحميل...');
    
    try {
      const result = await promise;
      removeToast(loadingId);
      success(messages.success || 'تمت العملية بنجاح');
      return result;
    } catch (error) {
      removeToast(loadingId);
      error(messages.error || 'حدث خطأ أثناء العملية');
      throw error;
    }
  };

  return {
    addToast,
    removeToast,
    updateToast,
    clearToasts,
    success,
    error,
    warning,
    info,
    loading,
    promise
  };
};

export default Toast;