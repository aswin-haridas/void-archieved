// Serverless API client using native fetch
const API_BASE_URL = 'https://raw.githubusercontent.com/aswin-haridas/Database/refs/heads/main';

const api = {
  async get(url: string) {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('API GET request failed:', error);
      throw error;
    }
  },

  async post(url: string, data: any) {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return { data: result };
    } catch (error) {
      console.error('API POST request failed:', error);
      throw error;
    }
  },
};

export default api;
