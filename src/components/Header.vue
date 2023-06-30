
<template>
    <header class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <!-- Navigation (left-aligned) -->
            <ul class="navbar-nav">
                <li class="username nav-item">
                    <a class="nav-link" href="#">{{ username }}</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Categories</a>
                </li>
                <li v-if="token === ''" class="nav-item">
                    <router-link class="nav-link" to="/login">Login</router-link>
                </li>
                <li v-if="token === ''" class="nav-item">
                    <router-link class="nav-link" to="/register">Register</router-link>
                </li>

                <li v-if="token !== ''" class="nav-item">
                    <a class="nav-link" @click="logout" href="#">Logout</a>
                </li>
            </ul>

            <!-- Title (center-aligned) -->
            <h1 class="title navbar-brand mx-auto">RAF News</h1>

            <!-- Search Bar (right-aligned) -->
            <form class="form-inline my-2 my-lg-0 d-flex">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-light my-2 my-sm-0 ms-3" type="submit">Search</button>
            </form>
        </div>
    </header>
</template>

<script>
import router from "@/router";
import {defineComponent, inject} from "vue";
import { token } from "@/global";

export default defineComponent({
    name: "Header",
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
})
</script>

<style scoped>
    header {
        height: 10vh;
    }

    .username {
        vertical-align: middle;
        font-weight: bold;
        font-size: 20px;
        margin: -0.25rem 5vw 0 -5vw;
    }
</style>