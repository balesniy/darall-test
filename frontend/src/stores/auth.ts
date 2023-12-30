import { defineStore } from 'pinia'
import { authService } from '../services'
import { setToken, removeToken } from '@/services/token-manager'
import type {User} from "@/types/user";
import {getErrorMessage} from "@/utils/errors";

export const useAuthStore = defineStore('auth', {
    state: (): { user: User | null } => ({
        user: null
    }),
    getters: {
        isAuthenticated: state => !!state.user,
        getUserAttribute: state => (attr: keyof User) => state.user ? state.user[attr] : ''
    },
    actions: {
        async login(email: string, password: string) {
            try {
                const data = await authService.login(email, password)
                if (data.token) {
                    setToken(data.token)
                }
                return data
            } catch (e) {
                return getErrorMessage(e)
            }
        },
        async getMe() {
            this.user = await authService.whoAmI()
        },
        async logout(sendRequest = true) {
            await authService.logout()
            this.user = null
            removeToken()
        },
    },
})
