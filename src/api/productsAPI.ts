import api, {guestApi} from '../config/axios'
import { AxiosResponse } from 'axios';

export interface Product{
    id?: number;
    name: string; 
    description: string; 
    discount: number; 
    price: number; 
    stock: number;
    categoryName?: string;
}

export interface CreateProductData {
    name: string; 
    description: string; 
    price: number; 
    discount: number; 
    stock: number;
}

export interface UpdateProductData extends CreateProductData {}

export interface GetAllParams {
    page?: number; 
    limit?: number; 
    category?: string; 
    search?: string; 
}

export interface ApiResponse<T> {
    data: T;
    total?: number; 
    count?: number; 
    currentPage?: number; 
    totalPages?: number;
}

export interface CategoryResponse {
    id: number; 
    name: string; 
    description?: string; 
}

export interface SearchParams {
    page?: number;
    limit?: number; 
    minPrice?: number; 
    maxPrice?: number; 
    category?: string; 
}

export const productsAPI = {
    // Fixed: Use query parameters, not URL parameters
    getAll: async (params: GetAllParams = {}): Promise<AxiosResponse<ApiResponse<Product[]>>> => {
        const response = await guestApi.get('/products', { params });
        return response;
    },
    
    getById: async (id: number): Promise<AxiosResponse<Product>> => {
        const response = await guestApi.get(`/products/${id}`);
        return response;
    },
    
    getByCategory: async (category: string, params: GetAllParams = {}): Promise<AxiosResponse<ApiResponse<Product[]>>> => {
       const response = await guestApi.get(`/products/category/${category}`, { params });
       return response;
    },
    
    getCategories: async (): Promise<AxiosResponse<CategoryResponse[]>> => {
        const response = await guestApi.get('/products/categories');
        return response;
    },
    
    search: async (query: string, params: SearchParams = {}): Promise<AxiosResponse<ApiResponse<Product[]>>> => {
        const response = await guestApi.get('/products/search', { params: { q: query, ...params } });
        return response;
    },

    // Admin CRUD operations
    create: async (productData: CreateProductData): Promise<AxiosResponse<Product>> => {
        const response = await api.post('/products', productData);
        return response;
    },
    
    update: async (id: number, productData: UpdateProductData): Promise<AxiosResponse<Product>> => {
        const response = await api.put(`/products/${id}`, productData);
        return response;
    },
    
    // Fixed: Missing slash before products
    delete: async (id: number): Promise<AxiosResponse<{ message: string }>> => {
        const response = await api.delete(`/products/${id}`);
        return response;
    }
};

export default productsAPI;