import { createRouter, createWebHistory } from 'vue-router'
import { getCRMToken } from '@/config/tokenConfig'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: () => import('@/views/auth/Login.vue'),
        },
        {
            path: '/register',
            component: () => import('@/views/auth/Register.vue'),
        },
        {
            path: '/',
            component: () => import('@/views/main/Dashboard.vue'),
        },
    ],
})


router.beforeEach(async (to, from, next) => {
    const token = await getCRMToken()
    if (to.path === '/login' && token?.access) {
        return next({ path: '/' })
    }
    if (to.path === '/register' && token?.access) {
        return next({ path: '/' })
    }
    if (to.path === '/login' && !token?.access) {
        return next()
    }
    if (to.path === '/' && !token?.access) {
        return next({ path: '/login' })
    }
    next()
})

export default router
