import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ 
  message = 'حدث خطأ في تحميل البيانات', 
  onRetry = null,
  showRetry = true 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-2">عذراً، حدث خطأ</h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-reverse space-x-2 bg-brand text-white px-6 py-3 rounded-lg hover:bg-brand-dark transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          <span>إعادة المحاولة</span>
        </button>
      )}
    </motion.div>
  );
};

export default ErrorMessage;