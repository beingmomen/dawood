// Global data state management with server-side rendering support
export const useGlobalData = () => {
  return useState('globalData', () => ({
    personalInfo: { items: [] },
    articles: [],
    pressStatements: [],
    media: [],
    achievements: [],
    activities: []
  }))
}

// Enhanced data fetching with caching and error handling
export const useData = () => {
  const globalData = useGlobalData()

  // Fetch all data with server-side rendering and caching
  const { data: allData, pending, error, refresh } = useLazyAsyncData('global-data', async () => {
    try {
      const { $api } = useNuxtApp()
      const response = await $api('/data/all')
      return response.data || response
    } catch (err) {
      console.error('Error fetching global data:', err)
      // Return fallback data structure
      return {
        personalInfo: { items: [] },
        articles: [],
        pressStatements: [],
        media: [],
        achievements: [],
        activities: []
      }
    }
  }, {
    server: true,
    default: () => globalData.value
  })

  // Watch for data changes and update global state
  watch(allData, (newData) => {
    if (newData) {
      globalData.value = newData
    }
  }, { immediate: true })

  // Fetch articles with pagination and caching
  const fetchArticles = (page = 1, limit = 10) => {
    return useLazyAsyncData(`articles-${page}-${limit}`, async () => {
      try {
        const { $api } = useNuxtApp()
        const response = await $api(`/articles?page=${page}&limit=${limit}`)
        return response.data || response
      } catch (err) {
        console.error('Error fetching articles:', err)
        return { items: [], total: 0, page, limit, totalPages: 0 }
      }
    }, {
      server: true,
      default: () => ({ items: [], total: 0, page, limit, totalPages: 0 })
    })
  }

  // Fetch single article with caching
  const fetchArticle = (id) => {
    return useLazyAsyncData(`article-${id}`, async () => {
      try {
        const { $api } = useNuxtApp()
        const response = await $api(`/articles/${id}`)
        return response.data || response
      } catch (err) {
        console.error(`Error fetching article ${id}:`, err)
        return null
      }
    }, {
      server: true,
      default: () => null
    })
  }

  // Fetch press statements with pagination and caching
  const fetchPressStatements = (page = 1, limit = 10) => {
    return useLazyAsyncData(`press-statements-${page}-${limit}`, async () => {
      try {
        const { $api } = useNuxtApp()
        const response = await $api(`/press-statements?page=${page}&limit=${limit}`)
        return response.data || response
      } catch (err) {
        console.error('Error fetching press statements:', err)
        return { items: [], total: 0, page, limit, totalPages: 0 }
      }
    }, {
      server: true,
      default: () => ({ items: [], total: 0, page, limit, totalPages: 0 })
    })
  }

  // Fetch single press statement with caching
  const fetchPressStatement = (id) => {
    return useLazyAsyncData(`press-statement-${id}`, async () => {
      try {
        const { $api } = useNuxtApp()
        const response = await $api(`/press-statements/${id}`)
        return response.data || response
      } catch (err) {
        console.error(`Error fetching press statement ${id}:`, err)
        return null
      }
    }, {
      server: true,
      default: () => null
    })
  }

  // Fetch media items with caching
  const fetchMedia = () => {
    return useLazyAsyncData('media-items', async () => {
      try {
        const { $api } = useNuxtApp()
        const response = await $api('/media')
        return response.data || response
      } catch (err) {
        console.error('Error fetching media:', err)
        return []
      }
    }, {
      server: true,
      default: () => []
    })
  }

  return {
    // Global data
    globalData: readonly(globalData),
    allData: readonly(allData),
    pending,
    error,
    refresh,

    // Specific data fetchers
    fetchArticles,
    fetchArticle,
    fetchPressStatements,
    fetchPressStatement,
    fetchMedia
  }
}
