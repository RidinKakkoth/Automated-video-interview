import axios from "axios";

export const url = "http://localhost:4000/";
// const TIMEOUT_DURATION = 110000;

const axiosInstanceWithInterceptor = () => {
    const instance = axios.create({
        baseURL: url,
        // timeout: TIMEOUT_DURATION,
    });

    instance.interceptors.request.use(
        config => {
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        response => response,
        error => {
            return Promise.reject(error);
        }
    );

    return instance;
};

export default axiosInstanceWithInterceptor;
