import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue' // Import your views components
import Users from './views/Users.vue' // Import your views components

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/api/users',
        name: 'Users',
        component: Users
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router