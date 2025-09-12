import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

const InfiniteScroll = ({
  children,
  hasMore = true,
  loadMore,
  loading = false,
  error = null,
  threshold = 100,
  loader = null,
  endMessage = null,
  errorMessage = null,
  onRetry = null,
  className = '',
  containerRef = null,
  direction = 'vertical', // 'vertical' | 'horizontal'
  reverse = false,
  initialLoad = true,
  debounceMs = 100
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sentinelRef = useRef(null);
  const loadingRef = useRef(false);
  const timeoutRef = useRef(null);
  const lastLoadTime = useRef(0);

  // Debounced load function
  const debouncedLoadMore = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      const now = Date.now();
      if (now - lastLoadTime.current < debounceMs) {
        return;
      }
      
      if (!loading && hasMore && !loadingRef.current && loadMore) {
        loadingRef.current = true;
        lastLoadTime.current = now;
        
        Promise.resolve(loadMore())
          .finally(() => {
            loadingRef.current = false;
          });
      }
    }, debounceMs);
  }, [loading, hasMore, loadMore, debounceMs]);

  // Intersection Observer setup
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const container = containerRef?.current || null;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsIntersecting(entry.isIntersecting);
        
        if (entry.isIntersecting && hasMore && !loading && !error) {
          debouncedLoadMore();
        }
      },
      {
        root: container,
        rootMargin: `${threshold}px`,
        threshold: 0.1
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [hasMore, loading, error, threshold, debouncedLoadMore, containerRef]);

  // Initial load
  useEffect(() => {
    if (initialLoad && hasMore && !loading && !error && loadMore) {
      const timer = setTimeout(() => {
        if (!loadingRef.current) {
          loadingRef.current = true;
          Promise.resolve(loadMore())
            .finally(() => {
              loadingRef.current = false;
            });
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [initialLoad, hasMore, loading, error, loadMore]);

  // Handle retry
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else if (loadMore) {
      debouncedLoadMore();
    }
  };

  // Default loader component
  const defaultLoader = (
    <div className="flex justify-center items-center py-8">
      <LoadingSpinner 
        size="medium" 
        text="جاري تحميل المزيد..." 
        variant="spinner"
      />
    </div>
  );

  // Default end message
  const defaultEndMessage = (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-8 text-gray-500 dark:text-gray-400"
    >
      <div className="flex flex-col items-center gap-2">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <p>تم تحميل جميع العناصر</p>
      </div>
    </motion.div>
  );

  // Default error message
  const defaultErrorMessage = (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-8"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <div>
          <p className="text-gray-900 dark:text-white font-medium mb-2">
            حدث خطأ أثناء تحميل البيانات
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            {error?.message || 'خطأ غير معروف'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            إعادة المحاولة
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const containerClasses = `
    ${direction === 'horizontal' ? 'flex overflow-x-auto' : ''}
    ${reverse ? (direction === 'horizontal' ? 'flex-row-reverse' : 'flex-col-reverse') : ''}
    ${className}
  `;

  return (
    <div className={containerClasses}>
      {reverse && (
        <div ref={sentinelRef} className={direction === 'horizontal' ? 'flex-shrink-0' : ''}>
          <AnimatePresence>
            {loading && (loader || defaultLoader)}
            {error && (errorMessage || defaultErrorMessage)}
            {!hasMore && !loading && !error && (endMessage || defaultEndMessage)}
          </AnimatePresence>
        </div>
      )}
      
      {children}
      
      {!reverse && (
        <div ref={sentinelRef} className={direction === 'horizontal' ? 'flex-shrink-0' : ''}>
          <AnimatePresence>
            {loading && (loader || defaultLoader)}
            {error && (errorMessage || defaultErrorMessage)}
            {!hasMore && !loading && !error && (endMessage || defaultEndMessage)}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

// Hook for infinite scroll logic
export const useInfiniteScroll = ({
  fetchMore,
  hasMore: initialHasMore = true,
  pageSize = 10,
  initialData = []
}) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(1);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      setError(null);
      
      const result = await fetchMore(page, pageSize);
      
      if (result && Array.isArray(result.data)) {
        setData(prevData => [...prevData, ...result.data]);
        setHasMore(result.hasMore !== false && result.data.length === pageSize);
        setPage(prevPage => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError(err);
      console.error('Error loading more data:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchMore, page, pageSize, loading, hasMore]);

  const retry = useCallback(() => {
    setError(null);
    loadMore();
  }, [loadMore]);

  const reset = useCallback(() => {
    setData(initialData);
    setPage(1);
    setHasMore(initialHasMore);
    setError(null);
    setLoading(false);
  }, [initialData, initialHasMore]);

  const refresh = useCallback(async () => {
    reset();
    // Wait for state to update
    setTimeout(() => {
      loadMore();
    }, 0);
  }, [reset, loadMore]);

  return {
    data,
    loading,
    error,
    hasMore,
    loadMore,
    retry,
    reset,
    refresh,
    page
  };
};

// Virtual scrolling component for large datasets
export const VirtualInfiniteScroll = ({
  items,
  renderItem,
  itemHeight,
  containerHeight = 400,
  overscan = 5,
  loadMore,
  hasMore,
  loading,
  className = ''
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + overscan,
    items.length
  );

  const visibleItems = items.slice(
    Math.max(0, visibleStart - overscan),
    visibleEnd
  );

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
    
    // Check if we need to load more
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasMore && !loading) {
      loadMore?.();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => {
          const actualIndex = Math.max(0, visibleStart - overscan) + index;
          return (
            <div
              key={actualIndex}
              style={{
                position: 'absolute',
                top: actualIndex * itemHeight,
                height: itemHeight,
                width: '100%'
              }}
            >
              {renderItem(item, actualIndex)}
            </div>
          );
        })}
        
        {loading && (
          <div
            style={{
              position: 'absolute',
              top: items.length * itemHeight,
              width: '100%'
            }}
          >
            <LoadingSpinner size="small" text="جاري التحميل..." />
          </div>
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;