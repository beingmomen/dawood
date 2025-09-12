const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Input validation and sanitization utilities
class InputValidator {
  static sanitizeString(input) {
    if (typeof input !== 'string') return input;
    return input.replace(/<script[^>]*>.*?<\/script>/gi, '')
                .replace(/<[^>]*>/g, '')
                .trim();
  }

  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static sanitizeObject(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        sanitized[key] = this.sanitizeString(value);
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeObject(value);
      } else {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }
}

// Rate limiting implementation
class RateLimiter {
  constructor(maxRequests = 100, windowMs = 60000) { // 100 requests per minute
    this.requests = new Map();
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  canMakeRequest(key = 'default') {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    if (!this.requests.has(key)) {
      this.requests.set(key, []);
    }
    
    const userRequests = this.requests.get(key);
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(timestamp => timestamp > windowStart);
    this.requests.set(key, validRequests);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    return true;
  }
}

class ApiService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'https://dawood-api.beingmomen.com/api/v1';
    this.timeout = 10000; // 10 seconds timeout
    this.rateLimiter = new RateLimiter();
    this.requestQueue = new Map(); // For request deduplication
  }

  // Request deduplication
  generateRequestKey(endpoint, options) {
    return JSON.stringify({ endpoint, method: options.method || 'GET', body: options.body });
  }

  async request(endpoint, options = {}) {
    // Rate limiting check
    if (!this.rateLimiter.canMakeRequest()) {
      throw new Error('تم تجاوز الحد الأقصى للطلبات. يرجى المحاولة لاحقاً.');
    }

    // Request deduplication
    const requestKey = this.generateRequestKey(endpoint, options);
    if (this.requestQueue.has(requestKey)) {
      return this.requestQueue.get(requestKey);
    }

    const url = `${this.baseURL}${endpoint}`;
    
    // Sanitize request data
    const sanitizedOptions = {
      ...options,
      body: options.body ? JSON.stringify(InputValidator.sanitizeObject(
        typeof options.body === 'string' ? JSON.parse(options.body) : options.body
      )) : options.body
    };
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest', // CSRF protection
        ...sanitizedOptions.headers,
      },
      mode: 'cors',
      credentials: 'same-origin',
      ...sanitizedOptions,
    };

    const requestPromise = this.executeRequest(url, config);
    this.requestQueue.set(requestKey, requestPromise);

    try {
      const result = await requestPromise;
      return result;
    } finally {
      // Clean up request queue
      setTimeout(() => {
        this.requestQueue.delete(requestKey);
      }, 1000);
    }
  }

  async executeRequest(url, config) {
    try {
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);
      
      config.signal = controller.signal;
      
      const response = await fetch(url, config);
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}. ${errorText}`);
      }
      
      const data = await response.json();
      
      // Validate response data
      if (!data || typeof data !== 'object') {
        throw new Error('استجابة غير صالحة من الخادم');
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      
      // Provide more specific error messages
      if (error.name === 'AbortError') {
        throw new Error('انتهت مهلة الطلب. يرجى المحاولة مرة أخرى.');
      } else if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        console.warn('API server unavailable, this is expected in development');
        throw new Error('الخادم غير متاح. يرجى التحقق من اتصال الإنترنت.');
      } else if (error.message.includes('CORS')) {
        throw new Error('مشكلة في إعدادات CORS. يرجى الاتصال بمدير النظام.');
      }
      
      throw error;
    }
  }

  // Enhanced GET method with better parameter handling
  async get(endpoint, params = {}) {
    // Sanitize parameters
    const sanitizedParams = InputValidator.sanitizeObject(params);
    
    // Build query string with proper encoding
    const queryString = Object.entries(sanitizedParams)
      .filter(([_, value]) => value !== null && value !== undefined && value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, {
      method: 'GET',
    });
  }

  // Enhanced POST method with validation
  async post(endpoint, data = {}) {
    // Validate required fields if specified
    if (data.email && !InputValidator.validateEmail(data.email)) {
      throw new Error('عنوان البريد الإلكتروني غير صالح');
    }
    
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Enhanced PUT method with validation
  async put(endpoint, data = {}) {
    // Validate required fields if specified
    if (data.email && !InputValidator.validateEmail(data.email)) {
      throw new Error('عنوان البريد الإلكتروني غير صالح');
    }
    
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Enhanced DELETE method with confirmation
  async delete(endpoint, confirmationData = {}) {
    return this.request(endpoint, {
      method: 'DELETE',
      body: confirmationData ? JSON.stringify(confirmationData) : undefined,
    });
  }

  // Utility method to check API health
  async healthCheck() {
    try {
      const response = await this.get('/health');
      return response;
    } catch (error) {
      console.warn('API health check failed:', error.message);
      return { status: 'unhealthy', error: error.message };
    }
  }

  // Method to clear rate limiting (for admin use)
  clearRateLimit() {
    this.rateLimiter.requests.clear();
  }

  // Method to get current rate limit status
  getRateLimitStatus(key = 'default') {
    const now = Date.now();
    const windowStart = now - this.rateLimiter.windowMs;
    
    if (!this.rateLimiter.requests.has(key)) {
      return {
        remaining: this.rateLimiter.maxRequests,
        resetTime: now + this.rateLimiter.windowMs
      };
    }
    
    const userRequests = this.rateLimiter.requests.get(key);
    const validRequests = userRequests.filter(timestamp => timestamp > windowStart);
    
    return {
      remaining: Math.max(0, this.rateLimiter.maxRequests - validRequests.length),
      resetTime: validRequests.length > 0 ? validRequests[0] + this.rateLimiter.windowMs : now
    };
  }
}

export default new ApiService();
export { InputValidator, RateLimiter };