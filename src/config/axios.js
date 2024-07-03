import axios from "axios";

export const url = "https://ridinkakkoth-automated-video-interview.onrender.com/";
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
