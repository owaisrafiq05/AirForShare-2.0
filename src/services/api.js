import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Create a configured axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

// Files API
const filesApi = {
  // Get all public files
  getPublicFiles: async () => {
    const response = await api.get('/files/public');
    return response.data;
  },
  
  // Upload a public file
  uploadPublicFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/files/public/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  },
  
  // Get a specific public file
  getPublicFile: async (filename) => {
    const response = await api.get(`/files/public/${filename}`);
    return response.data;
  },
  
  // Delete a public file
  deletePublicFile: async (publicId) => {
    const response = await api.delete(`/files/public/${publicId}`);
    return response.data;
  },
  
  // Upload a private file
  uploadPrivateFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/files/private/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  },
  
  // Get a specific private file
  getPrivateFile: async (filename) => {
    const response = await api.get(`/files/private/${filename}`);
    return response.data;
  }
};

// Rooms API
const roomsApi = {
  // Get all public rooms
  getPublicRooms: async () => {
    const response = await api.get('/rooms/public');
    return response.data;
  },
  
  // Get a specific room
  getRoom: async (roomId) => {
    const response = await api.get(`/rooms/${roomId}`);
    return response.data;
  },
  
  // Create a new room
  createRoom: async (isPrivate = false) => {
    const response = await api.post('/rooms/create', { isPrivate });
    return response.data;
  }
};

export {
  api,
  filesApi,
  roomsApi
}; 