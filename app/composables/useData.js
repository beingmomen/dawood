// Global data state management with server-side rendering support
export const useGlobalData = () => {
  return useState("globalData", () => ({
    personalInfo: { items: [] },
    articles: [],
    pressStatements: [],
    media: [],
    achievements: [],
    activities: [],
  }));
};

// Enhanced data fetching with caching and error handling
export const useData = () => {
  const globalData = useGlobalData();

  // Fetch all data with server-side rendering and caching
  const {
    data: allData,
    pending,
    error,
    refresh,
  } = useAsyncData(
    "global-data",
    async () => {
      try {
        const { $api } = useNuxtApp();
        const response = await $api("/data/all");
        return response.data || response;
      } catch (err) {
        console.error("Error fetching global data:", err);
        // Return fallback data structure
        return {
          personalInfo: { items: [] },
          articles: [],
          pressStatements: [],
          media: [],
          achievements: [],
          activities: [],
        };
      }
    },
    {
      server: true,
      default: () => globalData.value,
    }
  );

  // Watch for data changes and update global state
  watch(
    allData,
    (newData) => {
      if (newData) {
        globalData.value = newData;
      }
    },
    { immediate: true }
  );

  return {
    // Global data
    globalData: readonly(globalData),
    allData: readonly(allData),
    pending,
    error,
    refresh,
  };
};
