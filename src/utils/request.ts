import axios from "axios";
import {webUrl} from "@/env-config";
import {useStore} from "@/store";


const service = axios.create({
    baseURL: webUrl,
    timeout: 30 * 1000,
    headers: {
        'Content-Type': 'text/plain',
    }
});


// 添加请求拦截器
service.interceptors.request.use(function (config: any) {
    let store: any = useStore()
    // 在发送请求之前做些什么
    if (store.userInfo && store.userInfo.token) {
        config.headers.Authorization = store.userInfo.token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    if (!response.data) {
    }
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default service;