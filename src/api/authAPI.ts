import api from "../config/axios";
import { LoginCredentials } from "@/config/auth";
export interface User{
    firstName: string;        // Changed from 'name'
    lastName: string;         // Added lastName
    email: string;
    password: string;
    confirmPassword?: string;
    role?: string; 
}
export const authAPI = {
    login: (credentials:LoginCredentials) => api.post('/auth/login', credentials),
    register: (userData:User) => api.post('auth/register', userData),
    getProfile: () => api.get('/auth/me'),
};

export default authAPI;