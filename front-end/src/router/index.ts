import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: () => import('@/views/auth/Login.vue'),
        },
        {
            path: '/',
            component: () => import('@/App.vue'),
        },
    ],
})


router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('django-crm-token')
    if (to.path === '/login' && token) {
        next({ path: '/' })
    }
    if (to.path === '/login' && !token) {
        next()
    }
    if (to.path === '/' && !token) {
        next({ path: '/login' })
    }
    next()
})

export default router
