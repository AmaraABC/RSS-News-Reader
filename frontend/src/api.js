import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:8000/api' });

export const getFeeds = (page = 1) => api.get('/feeds/', { params: { page } }); // Récupération des flux RSS paginés
export const addFeed = (url) => api.post('/feeds/', { url }); // Ajout d'un nouveau flux
export const deleteFeed = (id) => api.delete(`/feeds/${id}/`); // Suppression d'un flux en fonction de son id
export const fetchFeed = (id) => api.post(`/feeds/${id}/fetch/`); // Récupération des articles récents d'un flux
export const getFeedItems = (id, page = 1) => api.get(`/feeds/${id}/items/`, { params: { page } }); // Récupération des articles d'un flux (paginés)

export default api;