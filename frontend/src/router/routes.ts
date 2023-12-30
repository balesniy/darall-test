import {isAdmin, isGuest} from '@/middlewares'

export default [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/AppLogin.vue'),
        meta: {
            layout: 'AppLayoutDefault',
            middlewares: [isGuest],
        }
    },
    {
        path: '/',
        name: 'HomeView',
        component: () => import('@/views/HomeView.vue'),
        meta: { layout: 'AppLayoutMain' },
        children: [
            {
                path: '/offers/create',
                name: 'OfferCreate',
                component: () => import('@/views/OfferCreate.vue'),
                meta: {
                    layout: 'AppLayoutMain',
                    middlewares: [isAdmin],
                }
            },
            {
                path: '/offers/edit/:id',
                name: 'OfferEdit',
                component: () => import('@/views/OfferEdit.vue'),
                meta: {
                    layout: 'AppLayoutMain',
                    middlewares: [isAdmin],
                }
            }
        ]
    }
]
