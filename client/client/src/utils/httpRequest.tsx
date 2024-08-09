import axios, { AxiosRequestConfig, AxiosHeaders, InternalAxiosRequestConfig } from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

httpRequest.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Lấy token từ localStorage
        const token = localStorage.getItem('token');
        if (token) {
            // Tạo đối tượng AxiosHeaders và cập nhật headers
            const headers = new AxiosHeaders();
            headers.set('Authorization', `Bearer ${token}`);
            config.headers = headers;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

httpRequest.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getApi = async (url: string, options: AxiosRequestConfig = {}) => {
    const response = await httpRequest.get(url, options);
    return response.data;
};

export const getApiId = async (url: string) => {
    const response = await httpRequest.get(url);
    return response.data;
};

export const postApi = async (url: string, data: object, config: AxiosRequestConfig = {}) => {
    const response = await httpRequest.post(url, data, config);
    return response.data;
};

export const putApi = async (url: string, data: object, config: AxiosRequestConfig = {}) => {
    const response = await httpRequest.put(url, data, config);
    return response.data;
};

export const deleteApi = async (url: string, options: AxiosRequestConfig = {}) => {
    const response = await httpRequest.delete(url, options);
    return response.data;
};

export default httpRequest;
