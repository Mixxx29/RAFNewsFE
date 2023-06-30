<template>
    <div class="login">
        <h1>{{ title }}</h1>
        <p class="error">{{ message }}</p>
        <GenericForm action-name="Login"
                     button-class="btn-primary"
                     :action-callback="login"
                     :fields="fields">
        </GenericForm>
        <router-link to="/register"><p>You don't have account? Register here!</p></router-link>
    </div>
</template>

<script>
import GenericForm from "@/components/GenericForm.vue";
import router from "@/router";
import {defineComponent} from "vue";

export default {
    name: "Login.vue",
    components: { GenericForm },
    data() {
        return {
            title: "Login",
            message: "",
            fields: [
                { name: "email", label: "Email", type: "email" },
                { name: "password", label: "Password", type: "password" },
            ],
            items: null,
        }
    },
    methods: {
        login(data) {
            router.login(data)
        }
    },
    mounted() {

    }
}
</script>

<style scoped>
    h1 {
        margin: 5vh auto 3vh auto;
    }
</style>