<template>
    <div id="categories">
        <h1>{{ title }}</h1>
        <GenericTable v-if="displayTable"
                      :columns="columns"
                      :items="items"
                      :row-class-callback="getRowClass"
                      :open-create-form-callback="openCreateForm"
                      :open-edit-form-callback="openEditForm"
                      :delete-item-callback="deleteData">
        </GenericTable>
        <GenericForm v-if="displayCreateForm"
                     action-name="Create"
                     button-class="btn-success"
                     :cancel-callback="cancel"
                     :action-callback="createData"
                     :fields="fields">
        </GenericForm>
        <GenericForm v-if="displayEditForm"
                     action-name="Save"
                     button-class="btn-primary"
                     :item="item"
                     :cancel-callback="cancel"
                     :action-callback="saveData"
                     :fields="fields">
        </GenericForm>
    </div>
</template>

<script>
import axios from "axios";
import GenericTable from "@/components/GenericTable.vue";
import GenericForm from "@/components/GenericForm.vue";
import api from "@/api";

export default {
    name: "Categories.vue",
    components: {GenericForm, GenericTable},
    data() {
        return {
            title: "Categories",
            columns: [
                { field: "id", label: "ID" },
                { field: "name", label: "Name" },
                { field: "description", label: "Description" }
            ],
            fields: [
                { name: "name", label: "Name", type: "text" },
                { name: "description", label: "Description", type: "textarea" }
            ],
            api: "/categories",
            items: [],
            item: {},
            displayTable: true,
            displayCreateForm: false,
            displayEditForm: false,
        }
    },
    methods: {
        fetchData() {
            api.get(this.api).then(items => {
                this.items = items.data;
            }).catch(error => console.log(error.message));
        },
        createData(data) {
            delete data.repeatedPassword;
            api.post(this.api, data).then(() => {
                this.fetchData();
            }).catch(error => console.log(error.message));
        },
        saveData(data) {
            delete data.repeatedPassword;
            api.put(this.api, data).then(() => {
                this.fetchData();
            }).catch(error => console.log(error.message));
        },
        deleteData(data) {
            api.delete(this.api + "/" + data.id).then(() => {
                this.fetchData();
            }).catch(error => console.log(error.message));
        },
        getRowClass(user) {},
        openCreateForm() {
            this.title = "Create New Category";
            this.displayTable = false;
            this.displayCreateForm = true;
            this.displayEditForm = false;
        },
        openEditForm(id) {
            api.get(this.api + "/" + id).then(item => {
                this.item = item.data;
                this.title = "Edit Category";
                this.displayTable = false;
                this.displayCreateForm = false;
                this.displayEditForm = true;
            }).catch(error => console.log(error.message));
        },
        cancel() {
            this.title = "Categories";
            this.displayTable = true;
            this.displayCreateForm = false;
            this.displayEditForm = false;
        }
    },
    beforeMount() {
        this.fetchData()
    }
}
</script>

<style scoped>
    h1 {
        margin: 5vh auto;
    }
</style>