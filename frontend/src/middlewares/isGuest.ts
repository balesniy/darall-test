import { useAuthStore } from '@/stores'

export default function isAdmin() {
    const authStore = useAuthStore()
    if (authStore.user) {
        return { path: '/'};
    }
    return true;
}
