import ApiService from './api.js';

class DataService {
  // Get all data from single endpoint
  async getAllData() {
    // Use local data directly until API is available
    return this.getFallbackData();
  }

  // Fallback data method
  async getFallbackData() {
    try {
      const [articles, achievements, personalInfo, pressStatements, media] = await Promise.all([
        import('../data/articles.json'),
        import('../data/achievements.json'),
        import('../data/personalInfo.json'),
        import('../data/pressStatements.json'),
        import('../data/media.json')
      ]);

      return {
        success: true,
        data: {
          articles: { count: articles.default.length, items: articles.default },
          achievements: { count: achievements.default.length, items: achievements.default },
          personalInfo: { count: 1, items: [personalInfo.default] },
          pressStatements: { count: pressStatements.default.length, items: pressStatements.default },
          media: { count: media.default.images.length + media.default.videos.length, items: [...media.default.images, ...media.default.videos] }
        }
      };
    } catch (error) {
      console.error('Error loading fallback data:', error);
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
        id: article._id,
        title: article.title,
        excerpt: article.description || article.content?.substring(0, 200) + '...',
        content: article.content,
        image: article.image,
        date: article.date,
        views: article.views || 0,
        category: article.tags?.[0] || 'عام',
        readTime: `${article.readTime || 5} دقائق`,
        author: 'محمد عبدالعليم داود',
        tags: article.tags || []
      })) || [],

      achievements: data.achievements?.items?.map(achievement => ({
        id: achievement._id,
        iconName: 'award',
        title: achievement.title,
        description: achievement.content,
        year: new Date(achievement.year).getFullYear().toString(),
        colorName: 'yellow'
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
        })) || []
      } : null,

      pressStatements: data.pressStatements?.items?.map(statement => ({
        id: statement._id,
        title: statement.title,
        excerpt: statement.excerpt,
        content: statement.content,
        date: statement.date,
        category: statement.categoryId?.name || 'عام',
        urgent: false,
        views: '0',
        shares: '0',
        author: 'محمد عبدالعليم داود',
        tags: statement.tags || []
      })) || [],

      media: {
        images: data.media?.items?.filter(item => item.type === 'image')?.map(item => ({
          id: item._id,
          src: item.src,
          title: item.title,
          description: item.description,
          date: item.date,
          category: item.tags?.[0] || 'عام'
        })) || [],
        videos: data.media?.items?.filter(item => item.type === 'video')?.map(item => ({
          id: item._id,
          videoId: item.src,
          title: item.title,
          description: item.description,
          duration: '0:00',
          views: '0',
          date: item.date
        })) || [],
        documents: []
      }
    };
  }

  // Articles
  async getArticles(params = {}) {
    try {
      const allData = await this.getAllData();
      const transformedData = this.transformApiData(allData);
      return { data: transformedData.articles };
    } catch (error) {
      console.error('Error fetching articles:', error);
      const fallbackData = await this.getFallbackData();
      const transformedData = this.transformApiData(fallbackData);
      return { data: transformedData.articles };
    }
  }

  async getArticle(id) {
    try {
      const allData = await this.getAllData();
      const transformedData = this.transformApiData(allData);
      const article = transformedData.articles.find(a => a.id === id);
      return { data: article };
    } catch (error) {
      console.error('Error fetching article:', error);
      const fallbackData = await this.getFallbackData();
      const transformedData = this.transformApiData(fallbackData);
      const article = transformedData.articles.find(a => a.id === id);
      return { data: article };
    }
  }

  // Personal Info
  async getPersonalInfo() {
    try {
      const allData = await this.getAllData();
      const transformedData = this.transformApiData(allData);
      return { data: transformedData.personalInfo };
    } catch (error) {
      console.error('Error fetching personal info:', error);
      const fallbackData = await this.getFallbackData();
      const transformedData = this.transformApiData(fallbackData);
      return { data: transformedData.personalInfo };
    }
  }

  // Achievements
  async getAchievements() {
    try {
      const allData = await this.getAllData();
      const transformedData = this.transformApiData(allData);
      return { data: transformedData.achievements };
    } catch (error) {
      console.error('Error fetching achievements:', error);
      const fallbackData = await this.getFallbackData();
      const transformedData = this.transformApiData(fallbackData);
      return { data: transformedData.achievements };
    }
  }

  // Events (using fallback data for now)
  async getEvents(params = {}) {
    try {
      // For now, use local data as API doesn't have events endpoint
      const { default: events } = await import('../data/events.json');
      return { data: events };
    } catch (error) {
      console.error('Error fetching events:', error);
      return { data: [] };
    }
  }

  async getEvent(id) {
    try {
      const { default: events } = await import('../data/events.json');
      const event = events.find(e => e.id === parseInt(id));
      return { data: event };
    } catch (error) {
      console.error('Error fetching event:', error);
      return { data: null };
    }
  }

  // Media
  async getMedia(type = null) {
    try {
      const allData = await this.getAllData();
      const transformedData = this.transformApiData(allData);
      
      if (type) {
        return { data: transformedData.media[type] || [] };
      }
      
      return { data: transformedData.media };
    } catch (error) {
      console.error('Error fetching media:', error);
      const fallbackData = await this.getFallbackData();
      const transformedData = this.transformApiData(fallbackData);
      return { data: transformedData.media };
    }
  }

  // Press Statements
  async getPressStatements(params = {}) {
    try {
      const allData = await this.getAllData();
      const transformedData = this.transformApiData(allData);
      return { data: transformedData.pressStatements };
    } catch (error) {
      console.error('Error fetching press statements:', error);
      const fallbackData = await this.getFallbackData();
      const transformedData = this.transformApiData(fallbackData);
      return { data: transformedData.pressStatements };
    }
  }

  async getPressStatement(id) {
    try {
      const allData = await this.getAllData();
      const transformedData = this.transformApiData(allData);
      const statement = transformedData.pressStatements.find(s => s.id === id);
      return { data: statement };
    } catch (error) {
      console.error('Error fetching press statement:', error);
      const fallbackData = await this.getFallbackData();
      const transformedData = this.transformApiData(fallbackData);
      const statement = transformedData.pressStatements.find(s => s.id === id);
      return { data: statement };
    }
  }

  // Media Coverage (using fallback data for now)
  async getMediaCoverage(params = {}) {
    try {
      const { default: coverage } = await import('../data/mediaCoverage.json');
      return { data: coverage };
    } catch (error) {
      console.error('Error fetching media coverage:', error);
      return { data: [] };
    }
  }
}

export default new DataService();