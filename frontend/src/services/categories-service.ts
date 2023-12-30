import { HttpClient } from './HttpClient'
import { getToken } from './token-manager'
import httpProvider from '@/services/providers'

const BASE_URL = '/api/categories'

class CategoriesService extends HttpClient {
    async fetchCategories() {
        try {
            return this.get('/')
        } catch (e) {
            throw e
        }
    }
}

export default new CategoriesService({
    httpProvider,
    baseURL: BASE_URL,
    getToken,
})
