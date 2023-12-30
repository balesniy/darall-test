import { HttpClient } from './HttpClient'
import { getToken } from './token-manager'
import httpProvider from '@/services/providers'
import {getErrorMessage} from "@/utils/errors";

// Мы используем proxy для перенаправления запросов
// Конфикурация proxy находиться в файле vite.config.js
const BASE_URL = '/api/users'

class AuthService extends HttpClient {
    async login (email: string, password: string) {
        try {
            return await this.post('/login', {
                data: {
                    email, password
                }
            })
        } catch (e) {
            throw Error(getErrorMessage(e))
        }
    }
    // Метод получения данных текущего пользователя
    async whoAmI () {
        try {
            return await this.get('/whoAmI')
        } catch (e) {
            throw (e)
        }
    }
    // Метод выхода из системы
    async logout () {
        try {
            await this.delete('/logout')
        } catch (e) {
            throw (e)
        }
    }
}

export default new AuthService({
    httpProvider,
    baseURL: BASE_URL,
    getToken,
})
