import { useState, useEffect, useRef, useCallback } from "react";

// Cache implementation for API responses
class ApiCache {
  constructor(maxSize = 100, ttl = 5 * 60 * 1000) {
    // 5 minutes TTL
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
  }

  generateKey(apiCall, dependencies) {
    return JSON.stringify({ fn: apiCall.toString(), deps: dependencies });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  set(key, data) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  clear() {
    this.cache.clear();
  }
}

const apiCache = new ApiCache();

// Retry logic with exponential backoff
const retryWithBackoff = async (fn, maxRetries = 3, baseDelay = 1000) => {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }

      // Don't retry for client errors (4xx)
      if (error.message.includes("4")) {
        throw error;
      }

      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

// Debounce function
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    return new Promise((resolve) => {
      timeoutId = setTimeout(() => resolve(func(...args)), delay);
    });
  };
};

export const useApi = (apiCall, dependencies = [], options = {}) => {
  const {
    enableCache = true,
    enableRetry = true,
    maxRetries = 3,
    debounceDelay = 300,
    onSuccess,
    onError,
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const abortControllerRef = useRef(null);
  const cacheKeyRef = useRef(null);

  const debouncedFetch = useCallback(
    debounce(async () => {
      // Cancel previous request if still pending
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      const cacheKey = enableCache
        ? apiCache.generateKey(apiCall, dependencies)
        : null;
      cacheKeyRef.current = cacheKey;

      try {
        setLoading(true);
        setError(null);

        // Check cache first
        if (enableCache && cacheKey) {
          const cachedData = apiCache.get(cacheKey);
          if (cachedData) {
            setData(cachedData);
            setLoading(false);
            onSuccess?.(cachedData);
            return;
          }
        }

        const fetchFunction = async () => {
          const result = await apiCall();
          return result.data || result;
        };

        const result = enableRetry
          ? await retryWithBackoff(fetchFunction, maxRetries)
          : await fetchFunction();

        // Validate and sanitize data
        if (result && typeof result === "object") {
          // Cache the result
          if (enableCache && cacheKey) {
            apiCache.set(cacheKey, result);
          }

          setData(result);
          setRetryCount(0);
          onSuccess?.(result);
        } else {
          throw new Error("البيانات المستلمة غير صالحة");
        }
      } catch (err) {
        if (err.name === "AbortError") {
          return; // Request was cancelled
        }

        const errorMessage = err.message || "حدث خطأ في تحميل البيانات";
        setError(errorMessage);
        setRetryCount((prev) => prev + 1);
        onError?.(err);
        console.error("API Error:", err);
      } finally {
        setLoading(false);
        abortControllerRef.current = null;
      }
    }, debounceDelay),
    [
      apiCall,
      enableCache,
      enableRetry,
      maxRetries,
      debounceDelay,
      onSuccess,
      onError,
      ...dependencies,
    ]
  );

  useEffect(() => {
    debouncedFetch();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, dependencies);

  const refetch = useCallback(
    async (forceRefresh = false) => {
      if (forceRefresh && cacheKeyRef.current) {
        apiCache.cache.delete(cacheKeyRef.current);
      }
      await debouncedFetch();
    },
    [debouncedFetch]
  );

  const clearCache = useCallback(() => {
    apiCache.clear();
  }, []);

  return {
    data,
    loading,
    error,
    refetch,
    retryCount,
    clearCache,
  };
};

export const useArticles = (params = {}) => {
  return useApi(async () => {
    const DataService = (await import("../services/dataService.js")).default;
    const data = await DataService.getArticles(params);
    console.warn("DataService", data);
    return data;
  }, [JSON.stringify(params)]);
};

export const useArticle = (id) => {
  return useApi(async () => {
    const DataService = (await import("../services/dataService.js")).default;
    return DataService.getArticle(id);
  }, [id]);
};

export const usePersonalInfo = () => {
  return useApi(async () => {
    const DataService = (await import("../services/dataService.js")).default;
    return DataService.getPersonalInfo();
  });
};

export const useAchievements = () => {
  return useApi(async () => {
    const DataService = (await import("../services/dataService.js")).default;
    return DataService.getAchievements();
  });
};

export const useEvents = (params = {}) => {
  return useApi(async () => {
    const DataService = (await import("../services/dataService.js")).default;
    return DataService.getEvents(params);
  }, [JSON.stringify(params)]);
};

export const useEvent = (id) => {
  return useApi(async () => {
    const DataService = (await import("../services/dataService.js")).default;
    return DataService.getEvent(id);
  }, [id]);
};

export const useMedia = (type = null) => {
  return useApi(async () => {
    const DataService = (await import("../services/dataService.js")).default;
    return DataService.getMedia(type);
  }, [type]);
};

export const usePressStatements = (params = {}) => {
  return useApi(async () => {
    const DataService = (await import("../services/dataService.js")).default;
    return DataService.getPressStatements(params);
  }, [JSON.stringify(params)]);
};

export const usePressStatement = (id) => {
  return useApi(async () => {
    const DataService = (await import("../services/dataService.js")).default;
    return DataService.getPressStatement(id);
  }, [id]);
};

export const useMediaCoverage = (params = {}) => {
  return useApi(async () => {
    const DataService = (await import("../services/dataService.js")).default;
    return DataService.getMediaCoverage(params);
  }, [JSON.stringify(params)]);
};
