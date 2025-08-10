import api, {guestApi} from '../config/axios'

export const productsAPI = {
    getAll: (params = {}) => guestApi.get('/products', {params}),
    getById: (id) => guestApi.get(`/products/${id}`), 
    getByCategory: (category, params = {}) => 
        guestApi.get(`/products/category/${category}`, {params}),
    getCategories: () => guestApi('/products/categories'),
    search: (query, params = {}) => 
        guestApi.get('/products/search', {params :{q: query, ...params}}),

    // these arrow functions of the object are following the concept (CRUD)
    // so they need to use the authenticated api (teh admin requests)
    create: (productData) => api.post('/products', productData),
    update: (id, productData) => api.put(`/products/${id}`, productData),
    delete: (id) => api.delete(`products/${id}`),
    //add the ***uploadImage()*** function in the future, not important for now
};

export default productsAPI;