import axios, {Axios, type AxiosRequestConfig} from 'axios'
import type {HttpProvider} from "@/services/HttpClient";

export default class AxiosProvider implements HttpProvider {
    private readonly instance: Axios

    constructor() {
        this.instance = axios.create({
            timeout: 1000,
        })
    }

    private request(config: AxiosRequestConfig) {
        const {url, baseURL, method, ...params} = config
        return this.instance.request({
            url,
            baseURL,
            method,
            ...params
        })
    }

    addInterceptor(interceptor: { onError: (statusCode: number) => Promise<void> }) {
        this.instance.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response.data;
        }, async function (error) {
            console.log(error)
            await interceptor.onError(error.response?.status || 500)
            return Promise.reject(error.response?.data?.error || error); // forward the error
        });
        return this
    }

    get(path: string, requestOptions: AxiosRequestConfig = {}) {
        return this.request({url: path, method: 'GET', ...requestOptions})
    }

    post(path: string, requestOptions: AxiosRequestConfig = {}) {
        return this.request({url: path, method: 'POST', ...requestOptions})
    }

    put(path: string, requestOptions: AxiosRequestConfig = {}) {
        return this.request({url: path, method: 'PUT', ...requestOptions})
    }

    delete(path: string, requestOptions: AxiosRequestConfig = {}) {
        return this.request({url: path, method: 'DELETE', ...requestOptions})
    }
}
