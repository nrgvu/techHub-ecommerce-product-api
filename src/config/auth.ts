// types/auth.ts

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'SUPER_ADMIN' | 'USER';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  access_token: string;
}

export interface LoginSuccess {
  success: boolean;
  error?: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}