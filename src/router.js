import {createRouter, createWebHistory} from 'vue-router'
import Home from './views/Home.vue' // Import your views components
import UsersTable from './views/UsersTable.vue'
import CategoriesTable from "@/views/CategoriesTable.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import api from "@/api";
import {token, TYPE, username} from "@/global";
import jwtDecode from "jwt-decode";
import NewsTable from "@/views/NewsTable.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            authenticate: true
        }
    },
    {
        path: '/table/users',
        name: 'UsersTable',
        component: UsersTable,
        meta: {
            authorize: "ADMIN"
        }
    },
    {
        path: '/table/categories',
        name: 'Categories',
        component: CategoriesTable,
        meta: {
            authenticate: true
        }
    },
    {
        path: '/table/news',
        name: 'News',
        component: NewsTable,
        meta: {
            authenticate: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.authenticate || to.meta.authorize) {
        api.get("/users/verify").then(() => {
            if (to.meta.authorize) {
                const payload = jwtDecode(token.value)
                const level = TYPE.indexOf(payload.type);
                const requiredLevel = TYPE.indexOf(to.meta.authorize);
                if (level > requiredLevel) {
                    next("/login")
                    return;
                }
            }
            next();
        }).catch(() => {
            next("/login")
        });
        return;
    }
    next();
});

router.login = (data) => {
    api.post("/users/login", data).then(result => {
        result = result.data;
        if (result.statusCode === 200) {
            token.value = result.jwt;
            router.push("/");
        }
        const payload = jwtDecode(token.value)
        username.value = payload.name;
        return result;
    }).catch(err => console.log(err))
}

router.register = (data) => {
    api.post("/users/register", data).then(result => {
        result = result.data;
        if (result.statusCode === 200) {
            token.value = result.jwt;
            router.push("/");
        }
        return result;
    }).catch(err => console.log(err))
}

router.logout = () => {
    token.value = "";
    username.value = "";
    router.push("/login");
}

export default router