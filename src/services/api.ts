import axios from 'axios';

const api = axios.create({
    baseURL: 'https://simulador-back-edgu.onrender.com',
});

export default api;