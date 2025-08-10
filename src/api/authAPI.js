import api from "../config/axios";
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('auth/register', userData),
    getProfile: () => api.get('/auth/me'),
};

export default authAPI;