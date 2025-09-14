export const useData = () => {
  // Get globally stored data instead of making API calls
  const globalData = useState('globalData')
  const config = useRuntimeConfig()
  
  const fetchAllData = async () => {
    // Return the globally stored data
    return globalData.value
  }

  const fetchDataFromAPI = async () => {
    try {
      const response = await $fetch(`${config.public.apiBaseUrl}/data/all`)
      return response
    } catch (error) {
      console.error('Error fetching data from API:', error)
      throw error
    }
  }
  
  return {
    fetchAllData,
    fetchDataFromAPI
  }
}