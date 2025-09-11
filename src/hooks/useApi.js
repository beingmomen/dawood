import { useState, useEffect } from 'react';

export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiCall();
        setData(result.data || result);
      } catch (err) {
        const errorMessage = err.message || 'حدث خطأ في تحميل البيانات';
        setError(errorMessage);
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result.data || result);
    } catch (err) {
      setError(err.message || 'حدث خطأ في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

export const useArticles = (params = {}) => {
  return useApi(async () => {
    const DataService = (await import('../services/dataService.js')).default;
    return DataService.getArticles(params);
  }, [JSON.stringify(params)]);
};

export const useArticle = (id) => {
  return useApi(async () => {
    const DataService = (await import('../services/dataService.js')).default;
    return DataService.getArticle(id);
  }, [id]);
};

export const usePersonalInfo = () => {
  return useApi(async () => {
    const DataService = (await import('../services/dataService.js')).default;
    return DataService.getPersonalInfo();
  });
};

export const useAchievements = () => {
  return useApi(async () => {
    const DataService = (await import('../services/dataService.js')).default;
    return DataService.getAchievements();
  });
};

export const useEvents = (params = {}) => {
  return useApi(async () => {
    const DataService = (await import('../services/dataService.js')).default;
    return DataService.getEvents(params);
  }, [JSON.stringify(params)]);
};

export const useEvent = (id) => {
  return useApi(async () => {
    const DataService = (await import('../services/dataService.js')).default;
    return DataService.getEvent(id);
  }, [id]);
};

export const useMedia = (type = null) => {
  return useApi(async () => {
    const DataService = (await import('../services/dataService.js')).default;
    return DataService.getMedia(type);
  }, [type]);
};

export const usePressStatements = (params = {}) => {
  return useApi(async () => {
    const DataService = (await import('../services/dataService.js')).default;
    return DataService.getPressStatements(params);
  }, [JSON.stringify(params)]);
};

export const usePressStatement = (id) => {
  return useApi(async () => {
    const DataService = (await import('../services/dataService.js')).default;
    return DataService.getPressStatement(id);
  }, [id]);
};

export const useMediaCoverage = (params = {}) => {
  return useApi(async () => {
    const DataService = (await import('../services/dataService.js')).default;
    return DataService.getMediaCoverage(params);
  }, [JSON.stringify(params)]);
};