import ApiService from './api.js';

class DataService {
  // Get all data from API endpoint
  async getAllData() {
    const response = await ApiService.get('/data/all');
    return response;
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
        views: article.views || '0',
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
        })) || [],
        languages: [
          { name: 'العربية', level: 'اللغة الأم' },
          { name: 'الإنجليزية', level: 'متقدم' },
          { name: 'الفرنسية', level: 'متوسط' }
        ]
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
      },

      events: []
    };
  }

  // Articles
  async getArticles(params = {}) {
    const allData = await this.getAllData();
    const transformedData = this.transformApiData(allData);
    return { data: transformedData.articles };
  }

  async getArticle(id) {
    const allData = await this.getAllData();
    const transformedData = this.transformApiData(allData);
    const article = transformedData.articles.find(a => a.id === id);
    return { data: article };
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