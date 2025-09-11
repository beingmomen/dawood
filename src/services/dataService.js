import ApiService from './api.js';

class DataService {
  // Articles
  async getArticles(params = {}) {
    try {
      return await ApiService.get('/articles', params);
    } catch (error) {
      console.error('Error fetching articles:', error);
      // Fallback to local data if API fails
      const { default: articlesData } = await import('../data/articles.json');
      return { data: articlesData };
    }
  }

  async getArticle(id) {
    try {
      return await ApiService.get(`/articles/${id}`);
    } catch (error) {
      console.error('Error fetching article:', error);
      // Fallback to local data
      const { default: articlesData } = await import('../data/articles.json');
      const article = articlesData.find(a => a.id === parseInt(id));
      return { data: article };
    }
  }

  // Personal Info
  async getPersonalInfo() {
    try {
      return await ApiService.get('/personal-info');
    } catch (error) {
      console.error('Error fetching personal info:', error);
      // Fallback to local data
      const { default: personalInfo } = await import('../data/personalInfo.json');
      return { data: personalInfo };
    }
  }

  // Achievements
  async getAchievements() {
    try {
      return await ApiService.get('/achievements');
    } catch (error) {
      console.error('Error fetching achievements:', error);
      // Fallback to local data
      const { default: achievements } = await import('../data/achievements.json');
      return { data: achievements };
    }
  }

  // Events
  async getEvents(params = {}) {
    try {
      return await ApiService.get('/events', params);
    } catch (error) {
      console.error('Error fetching events:', error);
      // Fallback to local data
      const { default: events } = await import('../data/events.json');
      return { data: events };
    }
  }

  async getEvent(id) {
    try {
      return await ApiService.get(`/events/${id}`);
    } catch (error) {
      console.error('Error fetching event:', error);
      // Fallback to local data
      const { default: events } = await import('../data/events.json');
      const event = events.find(e => e.id === parseInt(id));
      return { data: event };
    }
  }

  // Media
  async getMedia(type = null) {
    try {
      const params = type ? { type } : {};
      return await ApiService.get('/media', params);
    } catch (error) {
      console.error('Error fetching media:', error);
      // Fallback to local data
      const { default: media } = await import('../data/media.json');
      return { data: media };
    }
  }

  // Press Statements
  async getPressStatements(params = {}) {
    try {
      return await ApiService.get('/press-statements', params);
    } catch (error) {
      console.error('Error fetching press statements:', error);
      // Fallback to local data
      const { default: statements } = await import('../data/pressStatements.json');
      return { data: statements };
    }
  }

  async getPressStatement(id) {
    try {
      return await ApiService.get(`/press-statements/${id}`);
    } catch (error) {
      console.error('Error fetching press statement:', error);
      // Fallback to local data
      const { default: statements } = await import('../data/pressStatements.json');
      const statement = statements.find(s => s.id === parseInt(id));
      return { data: statement };
    }
  }

  // Media Coverage
  async getMediaCoverage(params = {}) {
    try {
      return await ApiService.get('/media-coverage', params);
    } catch (error) {
      console.error('Error fetching media coverage:', error);
      // Fallback to local data
      const { default: coverage } = await import('../data/mediaCoverage.json');
      return { data: coverage };
    }
  }
}

export default new DataService();