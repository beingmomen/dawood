import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
  showItemsPerPage = true,
  showPageInfo = true,
  showFirstLast = true,
  maxVisiblePages = 5,
  className = '',
  size = 'medium',
  variant = 'default',
  loading = false,
  disabled = false
}) => {
  const [inputPage, setInputPage] = useState('');
  const [showInput, setShowInput] = useState(false);

  // Size configurations
  const sizeClasses = {
    small: {
      button: 'px-2 py-1 text-xs',
      select: 'px-2 py-1 text-xs',
      input: 'px-2 py-1 text-xs w-12'
    },
    medium: {
      button: 'px-3 py-2 text-sm',
      select: 'px-3 py-2 text-sm',
      input: 'px-3 py-2 text-sm w-16'
    },
    large: {
      button: 'px-4 py-3 text-base',
      select: 'px-4 py-3 text-base',
      input: 'px-4 py-3 text-base w-20'
    }
  };

  // Variant configurations
  const variantClasses = {
    default: {
      button: 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700',
      active: 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700',
      disabled: 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
    },
    minimal: {
      button: 'bg-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800',
      active: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      disabled: 'bg-transparent text-gray-300 dark:text-gray-600 cursor-not-allowed'
    },
    rounded: {
      button: 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full',
      active: 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700 rounded-full',
      disabled: 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed rounded-full'
    }
  };

  const currentSizeClasses = sizeClasses[size];
  const currentVariantClasses = variantClasses[variant];

  // Calculate visible page numbers
  const visiblePages = useMemo(() => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }, [currentPage, totalPages, maxVisiblePages]);

  // Items per page options
  const itemsPerPageOptions = [5, 10, 20, 50, 100];

  // Calculate display info
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage && !disabled && !loading) {
      onPageChange?.(page);
    }
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const page = parseInt(inputPage);
    if (page >= 1 && page <= totalPages) {
      handlePageChange(page);
    }
    setInputPage('');
    setShowInput(false);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    if (onItemsPerPageChange && !disabled && !loading) {
      onItemsPerPageChange(newItemsPerPage);
    }
  };

  // Reset input when currentPage changes
  useEffect(() => {
    setInputPage('');
    setShowInput(false);
  }, [currentPage]);

  if (totalPages <= 1 && !showPageInfo) {
    return null;
  }

  const buttonClass = (isActive = false, isDisabled = false) => {
    const baseClass = `${currentSizeClasses.button} transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1`;
    
    if (isDisabled || disabled || loading) {
      return `${baseClass} ${currentVariantClasses.disabled}`;
    }
    
    if (isActive) {
      return `${baseClass} ${currentVariantClasses.active}`;
    }
    
    return `${baseClass} ${currentVariantClasses.button}`;
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      {/* Page Info */}
      {showPageInfo && (
        <div className="text-sm text-gray-600 dark:text-gray-400 order-2 sm:order-1">
          {totalItems > 0 ? (
            <span>
              عرض {startItem.toLocaleString('ar')} إلى {endItem.toLocaleString('ar')} من {totalItems.toLocaleString('ar')} عنصر
            </span>
          ) : (
            <span>لا توجد عناصر</span>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center gap-2 order-1 sm:order-2">
        {/* First Page */}
        {showFirstLast && currentPage > 1 && (
          <motion.button
            whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
            whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
            onClick={() => handlePageChange(1)}
            className={buttonClass(false, currentPage === 1)}
            disabled={disabled || loading}
            title="الصفحة الأولى"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </motion.button>
        )}

        {/* Previous Page */}
        <motion.button
          whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
          whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
          onClick={() => handlePageChange(currentPage - 1)}
          className={buttonClass(false, currentPage === 1)}
          disabled={currentPage === 1 || disabled || loading}
          title="الصفحة السابقة"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {/* Show ellipsis if there are pages before visible range */}
          {visiblePages[0] > 1 && (
            <>
              <motion.button
                whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
                whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
                onClick={() => handlePageChange(1)}
                className={buttonClass(false, false)}
                disabled={disabled || loading}
              >
                1
              </motion.button>
              {visiblePages[0] > 2 && (
                <span className="px-2 text-gray-400">...</span>
              )}
            </>
          )}

          {/* Visible page numbers */}
          <AnimatePresence mode="wait">
            {visiblePages.map((page) => (
              <motion.button
                key={page}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
                whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
                onClick={() => handlePageChange(page)}
                className={buttonClass(page === currentPage, false)}
                disabled={disabled || loading}
              >
                {page.toLocaleString('ar')}
              </motion.button>
            ))}
          </AnimatePresence>

          {/* Show ellipsis if there are pages after visible range */}
          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <span className="px-2 text-gray-400">...</span>
              )}
              <motion.button
                whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
                whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
                onClick={() => handlePageChange(totalPages)}
                className={buttonClass(false, false)}
                disabled={disabled || loading}
              >
                {totalPages.toLocaleString('ar')}
              </motion.button>
            </>
          )}
        </div>

        {/* Next Page */}
        <motion.button
          whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
          whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
          onClick={() => handlePageChange(currentPage + 1)}
          className={buttonClass(false, currentPage === totalPages)}
          disabled={currentPage === totalPages || disabled || loading}
          title="الصفحة التالية"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>

        {/* Last Page */}
        {showFirstLast && currentPage < totalPages && (
          <motion.button
            whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
            whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
            onClick={() => handlePageChange(totalPages)}
            className={buttonClass(false, currentPage === totalPages)}
            disabled={disabled || loading}
            title="الصفحة الأخيرة"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </motion.button>
        )}

        {/* Go to Page Input */}
        <div className="relative">
          <AnimatePresence>
            {showInput ? (
              <motion.form
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onSubmit={handleInputSubmit}
                className="flex items-center gap-2"
              >
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={inputPage}
                  onChange={(e) => setInputPage(e.target.value)}
                  placeholder={currentPage.toString()}
                  className={`${currentSizeClasses.input} border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  autoFocus
                  disabled={disabled || loading}
                />
                <button
                  type="submit"
                  className={buttonClass(false, false)}
                  disabled={disabled || loading}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setShowInput(false)}
                  className={buttonClass(false, false)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.form>
            ) : (
              <motion.button
                whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
                whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
                onClick={() => setShowInput(true)}
                className={buttonClass(false, false)}
                disabled={disabled || loading}
                title="الانتقال إلى صفحة"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Items Per Page */}
      {showItemsPerPage && onItemsPerPageChange && (
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 order-3">
          <span>عرض</span>
          <select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            className={`${currentSizeClasses.select} border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            disabled={disabled || loading}
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option.toLocaleString('ar')}
              </option>
            ))}
          </select>
          <span>عنصر لكل صفحة</span>
        </div>
      )}
    </div>
  );
};

// Hook for pagination logic
export const usePagination = ({
  totalItems,
  initialPage = 1,
  initialItemsPerPage = 10
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    // Reset to first page when changing items per page
    setCurrentPage(1);
  };

  // Calculate offset for API calls
  const offset = (currentPage - 1) * itemsPerPage;

  // Reset to first page if current page exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    offset,
    handlePageChange,
    handleItemsPerPageChange,
    setCurrentPage,
    setItemsPerPage
  };
};

export default Pagination;