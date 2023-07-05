<template>
    <header class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <ul class="navbar-nav">
                <li class="username nav-item">
                    <a class="nav-link" href="#">{{ username }}</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/popular">Popular</a>
                </li>
                <button aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation"
                        class="navbar-toggler" data-bs-target="#navbarNavDarkDropdown"
                        data-bs-toggle="collapse" type="button">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <li id="navbarNavDarkDropdown" class="collapse navbar-collapse">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <button aria-expanded="false" class="btn btn-dark dropdown-toggle"
                                    data-bs-toggle="dropdown">
                                Categories
                            </button>
                            <ul class="dropdown-menu dropdown-menu-dark">
                                <li v-for="category in categories" :key="category.id">
                                    <a :href="'/category/' + category.name" class="dropdown-item">
                                        {{ category.name }}
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>

                <li id="navbarNavDarkDropdown" class="collapse navbar-collapse">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <button aria-expanded="false" class="btn btn-dark dropdown-toggle"
                                    data-bs-toggle="dropdown">
                                Tables
                            </button>
                            <ul class="dropdown-menu dropdown-menu-dark">
                                <li>
                                    <router-link class="dropdown-item" to="/table/users">Users</router-link>
                                    <router-link class="dropdown-item" to="/table/news">News</router-link>
                                    <router-link class="dropdown-item" to="/table/categories">Categories</router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>

                <li v-if="token === ''" class="nav-item">
                    <router-link class="nav-link" to="/login">Login</router-link>
                </li>
                <li v-if="token === ''" class="nav-item">
                    <router-link class="nav-link" to="/register">Register</router-link>
                </li>

                <li v-if="token !== ''" class="nav-item">
                    <a class="nav-link" href="#" @click="logout">Logout</a>
                </li>
            </ul>

            <!-- Title (center-aligned) -->
            <h1 class="title navbar-brand mx-auto">RAF News</h1>

            <!-- Search Bar (right-aligned) -->
            <form class="form-inline my-2 my-lg-0 d-flex">
                <input aria-label="Search" class="form-control mr-sm-2" placeholder="Search" type="search">
                <button class="btn btn-outline-light my-2 my-sm-0 ms-3" type="submit">Search</button>
            </form>
        </div>
    </header>
</template>

<script>
import router from "@/router";
import {defineComponent, inject} from "vue";
import {token} from "@/global";
import axios from "axios";

export default defineComponent({
    name: "Header",
    data() {
        return {
            categories: []
        }
    },
    setup() {
        const token = inject('token');
        const username = inject('username')

        return {
            token,
            username
        }
    },
    methods: {
        logout() {
            router.logout();
        }
    },
    mounted() {
        axios.get("http://localhost:8080/categories").then(result => {
            this.categories = result.data;
        });
    }
})
</script>

<style scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 10vh;
    z-index: 999;
}

.username {
    vertical-align: middle;
    font-weight: bold;
    font-size: 20px;
    margin: -0.25rem 5vw 0 -5vw;
}

</style>