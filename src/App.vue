<script>
import Header from "@/components/Header.vue";
import {token, username} from "@/global";
import {provide} from "vue";

export default {
    name:"",
    components: {Header},
    setup() {
        provide('token', token);
        provide('username', username);

        return {
            token: token
        }
    }
}
</script>

<template>
    <Header/>
    <router-view></router-view>
</template>

<style>

</style>
