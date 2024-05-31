import axios from "axios";
import store from "../redux/store";

const baseAxios = axios.create({
    baseURL: process.env.REACT_APP_LOCAL_BASE_URL
})

// Request Interceptor
baseAxios.interceptors.request.use(function (config) {
    // console.log("config >>", config)
    const token = store.getState().auth.token;

    token && (config.headers.Authorization = `Bearer ${token}`)
    return config;

}, function (error) {

    return Promise.reject(error);
})

// Response Interceptor
baseAxios.interceptors.response.use(function (response) {
    // console.log("response >>", response)
    return response;

}, function (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.clear();
        window.location.href = "/login";
    }
    // console.log("error >>", error)
    return Promise.reject(error);
});

export default baseAxios;