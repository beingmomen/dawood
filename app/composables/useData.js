export const useData = () => {
  const globalData = useState("globalData");
  const config = useRuntimeConfig();

  const fetchAllData = async () => {
    return globalData.value;
  };

  const fetchDataFromAPI = async () => {
    try {
      const { $api } = useNuxtApp();
      const response = await $api(`/data/all`);
      return response;
    } catch (error) {
      console.error("Error fetching data from API:", error);
      throw error;
    }
  };

  return {
    fetchAllData,
    fetchDataFromAPI,
  };
};
