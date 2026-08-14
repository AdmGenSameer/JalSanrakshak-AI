import axios from 'axios';

class APIService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        console.log('API Request:', config);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.error('API Error:', error);
        if (error.response) {
          // Server responded with error status
          throw new Error(error.response.data?.message || `Server error: ${error.response.status}`);
        } else if (error.request) {
          // Request was made but no response received
          throw new Error('Network error: Unable to reach server');
        } else {
          // Something else happened
          throw new Error(error.message || 'Unknown error occurred');
        }
      }
    );
  }

  // Generic GET request
  async get(endpoint, params = {}) {
    try {
      const response = await this.api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generic POST request
  async post(endpoint, data = {}) {
    try {
      const response = await this.api.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generic PUT request
  async put(endpoint, data = {}) {
    try {
      const response = await this.api.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generic DELETE request
  async delete(endpoint) {
    try {
      const response = await this.api.delete(endpoint);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Handle errors
  handleError(error) {
    console.error('APIService Error:', error);
    return error;
  }

  // RWH specific endpoints
  async saveAssessment(assessmentData) {
    return this.post('/assessments', assessmentData);
  }

  async geocode(location) {
    return this.post('/api/geocode', { location });
  }

  async getRainfallData(latitude, longitude) {
    return this.get('/api/rainfall', { latitude, longitude });
  }

  async getGroundwaterData(latitude, longitude) {
    return this.get('/api/groundwater', { latitude, longitude });
  }

  async getSoilType(latitude, longitude) {
    return this.get('/api/soil-type', { latitude, longitude });
  }

  async calculateRWH(data) {
    return this.post('/api/calculate', data);
  }

  async getRecommendations(data) {
    return this.post('/api/recommend', data);
  }

  async getAquiferInfo(latitude, longitude) {
    return this.get('/api/aquifer', { latitude, longitude });
  }

  async mlPredict(data) {
    return this.post('/api/predict', data);
  }

  async submitFeedback(feedbackData) {
    return this.post('/api/feedback', feedbackData);
  }
}

// Create a singleton instance
const apiService = new APIService();

export default apiService;
