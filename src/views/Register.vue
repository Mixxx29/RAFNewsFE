<template>
    <div class="register">
        <h1>{{ title }}</h1>
        <GenericForm action-name="Register"
                     button-class="btn-primary"
                     :action-callback="register"
                     :fields="fields">
        </GenericForm>
        <router-link to="/login"><p>You already have account? Login here!</p></router-link>
    </div>
</template>

<script>
import GenericForm from "@/components/GenericForm.vue";
import {defineComponent} from "vue";
import router from "@/router";

export default {
    name: "Register.vue",
    components: { GenericForm },
    data() {
        return {
            title: "Register",
            fields: [
                {name: "email", label: "Email", type: "email"},
                {name: "name", label: "Name", type: "text"},
                {name: "surname", label: "Surname", type: "text"},
                {name: "password", label: "Password", type: "password"},
                {name: "repeated-password", label: "Repeat Password", type: "password"},
            ],
            api: "/register",
            items: null,
        }
    },
    methods: {
        register(data) {
            router.register(data);
        }
    }
}
</script>

<style scoped>
    h1 {
        margin: 5vh auto 3vh auto;
    }
</style>