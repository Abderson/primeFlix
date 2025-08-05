import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: process.env.REACT_APP_API_KEY || '54b8ea9059fdf6f57807e6c0bb19b60b',
        language: 'pt-BR',
        page: 1,
    }
});

export default api;