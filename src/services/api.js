import axios from 'axios';

const api=axios.create({
    baseURL:'http://localhost:8080',// 後端URL
    withCredentials:true, // Cookie
});

export default api;