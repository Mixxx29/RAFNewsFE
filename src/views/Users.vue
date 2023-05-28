<template>
    <div id="users">
        <h1>{{ title }}</h1>
        <GenericTable v-if="displayTable"
                      :columns="columns"
                      :items="items"
                      :row-class-callback="getRowClass"
                      :open-create-form-callback="openCreateForm"
                      :open-edit-form-callback="openEditForm"
                      :delete-item-callback="deleteData">
        </GenericTable>
        <GenericCreateForm v-if="displayCreateForm"
                           :cancel-callback="cancel"
                           :create-data-callback="createData"
                           :fields="fields">
        </GenericCreateForm>
        <GenericEditForm v-if="displayEditForm"
                         :item="item"
                         :cancel-callback="cancel"
                         :edit-data-callback="saveData"
                         :fields="fields">
        </GenericEditForm>
    </div>
</template>

<script>
import axios from "axios";
import GenericTable from "@/components/GenericTable.vue";
import GenericCreateForm from "@/components/GenericCreateForm.vue";
import GenericEditForm from "@/components/GenericEditForm.vue";

export default {
    name: "Users.vue",
    components: {GenericEditForm, GenericCreateForm, GenericTable},
    data() {
        return {
            title: "Users",
            columns: [
                { field: "id", label: "ID" },
                { field: "email", label: "Email" },
                { field: "name", label: "Name" },
                { field: "surname", label: "Surname" },
                { field: "type", label: "Type" },
                { field: "status", label: "Status" },
                { field: "password", label: "Password" }
            ],
            fields: [
                { name: "email", label: "Email", type: "email" },
                { name: "name", label: "Name", type: "text" },
                { name: "surname", label: "Surname", type: "text" },
                { name: "type", label: "Type", type: "select", options: [
                        { value: "0", label: "ADMIN" },
                        { value: "1", label: "CONTENT_CREATOR" }
                    ]
                },
                { name: "status", label: "Status", type: "select", options: [
                        { value: "0", label: "ACTIVE" },
                        { value: "1", label: "INACTIVE" }
                    ]
                },
                { name: "password", label: "Password", type: "password" },
                { name: "repeatedPassword", label: "Repeated Password", type: "password" }
            ],
            api: "http://localhost:8080/api/users",
            items: null,
            item: {},
            displayTable: true,
            displayCreateForm: false,
            displayEditForm: false,
        }
    },
    methods: {
        fetchData() {
            axios.get(this.api).then(items => {
                this.items = items.data;
            }).catch(error => console.log(error.message));
        },
        createData(data) {
            delete data.repeatedPassword;
            axios.post(this.api, data).then(() => {
                this.fetchData();
            }).catch(error => console.log(error.message));
        },
        saveData(data) {
            delete data.repeatedPassword;
            axios.put(this.api, data).then(() => {
                this.fetchData();
            }).catch(error => console.log(error.message));
        },
        deleteData(data) {
            axios.delete(this.api + "/" + data.id).then(() => {
                this.fetchData();
            }).catch(error => console.log(error.message));
        },
        getRowClass(user) {
            if (user.status === "INACTIVE") return "table-danger";
            if (user.type === "ADMIN") return "table-success";
            return "table-warning";
        },
        openCreateForm() {
            this.title = "Create New User";
            this.displayTable = false;
            this.displayCreateForm = true;
            this.displayEditForm = false;
        },
        openEditForm(id) {
            axios.get(this.api + "/" + id).then(item => {
                this.item = item.data;
                this.title = "Edit User";
                this.displayTable = false;
                this.displayCreateForm = false;
                this.displayEditForm = true;
            }).catch(error => console.log(error.message));
        },
        cancel() {
            this.title = "Users";
            this.displayTable = true;
            this.displayCreateForm = false;
            this.displayEditForm = false;
        }
    },
    mounted() {
        this.fetchData()
    }
}
</script>

<style scoped>
    h1 {
        margin: 5vh auto;
    }
</style>