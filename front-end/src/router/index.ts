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
            component: () => import('@/views/layout/Layout.vue'),
            children: [
                {
                    path: '',
                    component: () => import('@/views/main/Dashboard.vue'),
                },
                {
                    path: 'users',
                    component: () => import('@/views/main/Users.vue'),
                },
                {
                    path: 'roles',
                    component: () => import('@/views/main/Users.vue'), // Geçici olarak aynı component
                },
                {
                    path: 'permissions',
                    component: () => import('@/views/main/Users.vue'), // Geçici olarak aynı component
                },
                {
                    path: 'settings',
                    component: () => import('@/views/main/Settings.vue'),
                },
                {
                    path: 'profile',
                    component: () => import('@/views/main/Settings.vue'), // Geçici olarak aynı component
                },
                {
                    path: 'reports',
                    redirect: '/reports/daily',
                },
                {
                    path: 'reports/daily',
                    component: () => import('@/views/main/Dashboard.vue'), // Geçici olarak aynı component
                },
                {
                    path: 'reports/weekly',
                    component: () => import('@/views/main/Dashboard.vue'), // Geçici olarak aynı component
                },
                {
                    path: 'reports/monthly',
                    component: () => import('@/views/main/Dashboard.vue'), // Geçici olarak aynı component
                }
            ]
        },
        // Catch-all 404 route
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        }
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
