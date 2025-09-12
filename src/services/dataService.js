import ApiService from './api.js';

class DataService {
  // Get paginated articles from dedicated endpoint
  async getArticles(params = {}) {
    try {
      const { page = 1, limit = 12, ...otherParams } = params;
      const response = await ApiService.get('/articles', {
        page,
        limit,
        ...otherParams
      });
      
      if (response.success && response.data) {
        return {
          data: response.data.articles?.map(article => ({
            id: article._id || article.id,
            title: article.title,
            excerpt: article.description || article.content?.substring(0, 200) + '...',
            content: article.content,
            image: article.image,
            date: article.date,
            views: article.views || '0',
            category: article.tags?.[0] || 'عام',
            readTime: `${article.readTime || 5} دقائق`,
            author: article.author || 'محمد عبدالعليم داود',
            tags: article.tags || []
          })) || [],
          pagination: response.data.pagination || {
            currentPage: page,
            totalPages: 1,
            totalItems: 0,
            hasNext: false,
            hasPrev: false
          }
        };
      }
      
      throw new Error('Invalid API response format');
    } catch (error) {
      console.warn('Articles API unavailable, this is expected in development');
      // Return empty data structure for development
      return {
        data: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          hasNext: false,
          hasPrev: false
        }
      };
    }
  }

  async getArticle(id) {
    try {
      const response = await ApiService.get(`/articles/${id}`);
      
      if (response.success && response.data) {
        const article = response.data;
        return {
          data: {
            id: article._id || article.id,
            title: article.title,
            excerpt: article.description || article.content?.substring(0, 200) + '...',
            content: article.content,
            image: article.image,
            date: article.date,
            views: article.views || '0',
            category: article.tags?.[0] || 'عام',
            readTime: `${article.readTime || 5} دقائق`,
            author: article.author || 'محمد عبدالعليم داود',
            tags: article.tags || []
          }
        };
      }
      
      throw new Error('Article not found');
    } catch (error) {
      console.warn('Article API unavailable, this is expected in development');
      return { data: null };
    }
  }

  // Get all data from API endpoint (for other components)
  async getAllData() {
    try {
      const response = await ApiService.get('/data/all');
      return response;
    } catch (error) {
      console.warn('API unavailable, this is expected in development');
      throw error;
    }
  }

  // Transform API data to match component expectations
  transformApiData(apiData) {
    if (!apiData.success || !apiData.data) {
      throw new Error('Invalid API response format');
    }

    const { data } = apiData;

    return {
      articles: data.articles?.items?.map(article => ({
        id: article._id || article.id,
        title: article.title,
        excerpt: article.description || article.content?.substring(0, 200) + '...',
        content: article.content,
        image: article.image,
        date: article.date,
        views: article.views || '0',
        category: article.tags?.[0] || 'عام',
        readTime: `${article.readTime || 5} دقائق`,
        author: article.author || 'محمد عبدالعليم داود',
        tags: article.tags || []
      })) || [],

      achievements: data.achievements?.items?.map(achievement => ({
        id: achievement._id || achievement.id,
        iconName: achievement.iconName || 'award',
        title: achievement.title,
        description: achievement.content || achievement.description,
        year: achievement.year ? new Date(achievement.year).getFullYear().toString() : '2023',
        colorName: achievement.colorName || 'yellow'
      })) || [],

      personalInfo: data.personalInfo?.items?.[0] ? {
        name: data.personalInfo.items[0].name,
        title: data.personalInfo.items[0].title,
        email: data.personalInfo.items[0].email,
        phone: data.personalInfo.items[0].phone,
        location: data.personalInfo.items[0].location,
        summary: data.personalInfo.items[0].summary,
        image: data.personalInfo.items[0].image,
        education: data.personalInfo.items[0].education?.map(edu => ({
          degree: edu.degree,
          institution: edu.institution,
          year: `${new Date(edu.startDate).getFullYear()}${edu.endDate ? ` - ${new Date(edu.endDate).getFullYear()}` : ' - حتى الآن'}`,
          description: edu.description
        })) || [],
        experience: data.personalInfo.items[0].experience?.map(exp => ({
          position: exp.position,
          organization: exp.company,
          period: `${new Date(exp.startDate).getFullYear()}${exp.current ? ' - حتى الآن' : ''}`,
          responsibilities: [exp.description]
        })) || [],
        languages: data.personalInfo.items[0].languages || []
      } : null,

      pressStatements: data.pressStatements?.items?.map(statement => ({
        id: statement._id || statement.id,
        title: statement.title,
        excerpt: statement.excerpt || statement.description,
        content: statement.content,
        date: statement.date,
        category: statement.categoryId?.name || statement.category || 'عام',
        urgent: statement.urgent || false,
        views: statement.views || '0',
        shares: statement.shares || '0',
        author: statement.author || 'محمد عبدالعليم داود',
        tags: statement.tags || []
      })) || [],

      media: {
        images: data.media?.items?.filter(item => item.type === 'image')?.map(item => ({
          id: item._id || item.id,
          src: item.src,
          title: item.title,
          description: item.description,
          date: item.date,
          category: item.tags?.[0] || 'عام'
        })) || [],
        videos: data.media?.items?.filter(item => item.type === 'video')?.map(item => ({
          id: item._id || item.id,
          videoId: item.src,
          title: item.title,
          description: item.description,
          duration: item.duration || '0:00',
          views: item.views || '0',
          date: item.date
        })) || [],
        documents: data.media?.items?.filter(item => item.type === 'document')?.map(item => ({
          id: item._id || item.id,
          title: item.title,
          description: item.description,
          type: item.fileType || 'PDF',
          size: item.size || '0 MB',
          downloads: item.downloads || '0',
          date: item.date
        })) || []
      }
    };
  }

  // Personal Info
  async getPersonalInfo() {
    const allData = await this.getAllData();
    const transformedData = this.transformApiData(allData);
    return { data: transformedData.personalInfo };
  }

  // Achievements
  async getAchievements() {
    const allData = await this.getAllData();
    const transformedData = this.transformApiData(allData);
    return { data: transformedData.achievements };
  }

  // Events (empty for now since not in API)
  async getEvents(params = {}) {
    return { data: [] };
  }

  async getEvent(id) {
    return { data: null };
  }

  // Media
  async getMedia(type = null) {
    const allData = await this.getAllData();
    const transformedData = this.transformApiData(allData);
    
    if (type) {
      return { data: transformedData.media[type] || [] };
    }
    
    return { data: transformedData.media };
  }

  // Press Statements
  async getPressStatements(params = {}) {
    const allData = await this.getAllData();
    const transformedData = this.transformApiData(allData);
    return { data: transformedData.pressStatements };
  }

  async getPressStatement(id) {
    const allData = await this.getAllData();
    const transformedData = this.transformApiData(allData);
    const statement = transformedData.pressStatements.find(s => s.id === id);
    return { data: statement };
  }

  // Media Coverage (empty for now since not in API)
  async getMediaCoverage(params = {}) {
    return { data: [] };
  }
}

export default new DataService();