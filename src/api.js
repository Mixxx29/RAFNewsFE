import axios from 'axios';
import { token } from "@/global";

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:8080', // Replace with your API base URL
});

// Add a request interceptor
api.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        config.headers.Authorization = "Bearer " + token.value;
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default api;