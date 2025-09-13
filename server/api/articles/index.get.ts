export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  
  try {
    const response = await $fetch('/articles', {
      baseURL: config.public.apiBaseUrl,
      query: {
        page: query.page || 1,
        limit: query.limit || 12,
        search: query.search || undefined
      }
    })

    if (response.status === 'success' && response.data && Array.isArray(response.data)) {
      return {
        data: response.data.map((article: any) => ({
          id: article._id || article.id,
          title: article.title,
          excerpt: article.description || article.content?.substring(0, 200) + '...',
          content: article.content,
          image: article.image,
          date: article.date,
          views: article.views || '0',
          category: article?.category?.name || 'عام',
          readTime: `${article.readTime || 5} دقائق`,
          author: article.author || 'محمد عبدالعليم داود',
          tags: article.tags || [],
        })),
        pagination: {
          currentPage: parseInt(query.page as string) || 1,
          totalPages: Math.ceil((response.total || 0) / (parseInt(query.limit as string) || 12)),
          totalItems: response.total || 0,
          hasNext: (parseInt(query.page as string) || 1) * (parseInt(query.limit as string) || 12) < (response.total || 0),
          hasPrev: (parseInt(query.page as string) || 1) > 1,
        }
      }
    }

    throw new Error('Invalid API response format')
  } catch (error) {
    console.warn('Articles API unavailable:', error)
    
    // Return sample data for development
    const sampleArticles = [
      {
        id: '1',
        title: 'مقال تجريبي أول',
        excerpt: 'هذا مقال تجريبي للاختبار...',
        content: 'محتوى المقال التجريبي الأول',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        date: '2024-01-15',
        views: '150',
        category: 'سياسة',
        readTime: '5 دقائق',
        author: 'محمد عبدالعليم داود',
        tags: ['سياسة', 'تحليل'],
      },
      {
        id: '2',
        title: 'مقال تجريبي ثاني',
        excerpt: 'هذا مقال تجريبي آخر للاختبار...',
        content: 'محتوى المقال التجريبي الثاني',
        image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
        date: '2024-01-10',
        views: '200',
        category: 'اقتصاد',
        readTime: '7 دقائق',
        author: 'محمد عبدالعليم داود',
        tags: ['اقتصاد', 'تحليل'],
      },
    ]

    return {
      data: sampleArticles,
      pagination: {
        currentPage: parseInt(query.page as string) || 1,
        totalPages: 3,
        totalItems: 25,
        hasNext: (parseInt(query.page as string) || 1) < 3,
        hasPrev: (parseInt(query.page as string) || 1) > 1,
      }
    }
  }
})