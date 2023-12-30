import AxiosProvider from './AxiosProvider'
import { useAuthStore } from '@/stores'

const httpProvider = new AxiosProvider()
httpProvider.addInterceptor(
    {
        onError: async (status: number) => {
            // Если с сервиса приходит ошибка 401 Unauthorized, то выполняем выход из системы
            if (status === 401) {
                const authStore = useAuthStore()
                if (authStore.isAuthenticated) await authStore.logout()
            }
        },
    }
)

export default httpProvider
