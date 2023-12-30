export interface HttpProvider {
    get: (path: string, options?: any) => Promise<any>
    post: (path: string, options?: any) => Promise<any>
    put: (path: string, options?: any) => Promise<any>
    delete: (path: string, options?: any) => Promise<any>
    addInterceptor: ({ onError }: { onError: (statusCode: number) => Promise<void> }) => void
}

interface HttpClientOptions {
    httpProvider: HttpProvider
    getToken: () => string | null
    baseURL: string
}

export interface IRequestOptions {
    headers?: Record<string, string>
    params?: Record<string, string | number>
}

export class HttpClient {
    /*
        Конструктор принимает параметры:
        * httpProvider - провайдер подключения к API
        * getToken - функция для получени токена аутентификации
        * baseUrl - базовый URL для конкретного ресурса
    */
    private httpProvider: HttpProvider;
    private getToken: () => string | null;
    private readonly baseUrl: string;

    constructor(options: HttpClientOptions) {
        if (!options.baseURL) {
            throw Error('[HttpClient]: Base url is empty')
        }
        this.httpProvider = options.httpProvider
        this.getToken = options.getToken
        this.baseUrl = options.baseURL
    }

    // Метод для построения запросов
    buildRequest(options: IRequestOptions) {
        const token = this.getToken()
        if (token) {
            options.headers = {
                ...options.headers,
                Authorization: `Bearer ${token}`
            }
        }

        return {
            ...options,
            baseURL: this.baseUrl,
        }
    }

    async get(path: string, options = {}) {
        return this.httpProvider.get(path, this.buildRequest(options))
    }

    async post(path: string, options = {}) {
        return this.httpProvider.post(path, this.buildRequest(options))
    }

    async put(path: string, options = {}) {
        return this.httpProvider.put(path, this.buildRequest(options))
    }

    async delete(path: string, options = {}) {
        return this.httpProvider.delete(path, this.buildRequest(options))
    }
}
