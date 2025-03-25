import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { api, setupInterceptors } from './config/axiosConfig'
import router from './router'

const app = createApp(App)

setupInterceptors(api)

app.use(router)

app.mount('#app')
