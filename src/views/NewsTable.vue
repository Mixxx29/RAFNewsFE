<template>
    <div id="news">
        <h1>{{ title }}</h1>
        <div v-if="displayIndex === 0">
            <GenericTable
                :columns="columns"
                :delete-item-callback="deleteData"
                :items="items"
                :open-create-form-callback="openCreateForm"
                :open-edit-form-callback="openEditForm"
                :row-class-callback="getRowClass"/>
        </div>
        <div v-if="displayIndex === 1">
            <GenericForm
                :action-callback="createData"
                :cancel-callback="cancel"
                :fields="fields"
                action-name="Create"
                button-class="btn-success"/>
        </div>
        <div v-if="displayIndex === 2">
            <GenericForm
                :action-callback="saveData"
                :cancel-callback="cancel"
                :fields="fields"
                :item="item"
                action-name="Save"
                button-class="btn-primary"/>
        </div>
        <Pagination
            v-if="displayIndex === 0"
            :last-page="lastPage"
            :on-click="getPage"
            :page-index="1"/>
    </div>
</template>

<script>
import GenericTable from "@/components/GenericTable.vue";
import GenericForm from "@/components/GenericForm.vue";
import Pagination from "@/components/Pagination.vue";
import api from "@/api";
import jwtDecode from "jwt-decode";
import {token} from "@/global";

export default {
    name: "NewsTable.vue",
    components: {GenericForm, GenericTable, Pagination},
    data() {
        return {
            title: "News",
            columns: [
                {field: "id", label: "ID"},
                {field: "title", label: "Title"},
                {field: "datetime", label: "Date"},
                {field: "visits", label: "Visited"},
                {field: "author", label: "Author"},
                {field: "category", label: "Category"},
            ],
            fields: [
                {name: "title", label: "Title", type: "text"},
                {name: "content", label: "Content", type: "textarea"},
            ],
            api: "/news",
            items: [],
            item: {},
            displayIndex: 0,
            pageIndex: 1,
            pageSize: 5,
            lastPage: 1,
            index: 1,
            options: []
        }
    },
    methods: {
        createData(data) {
            const {category, author, ...finalData} = data;
            finalData.datetime = new Date();
            finalData.categoryId = data.category;
            const payload = jwtDecode(token.value)
            finalData.authorId = payload.id;
            api.post(this.api, finalData).then(() => {
                this.getPage(1)
            }).catch(error => console.log(error.message));
        },
        saveData(data) {
            const {author, category, ...finalData} = data;
            finalData.categoryId = data.category;
            api.put(this.api, finalData).then(() => {
                this.getPage(3);
            }).catch(error => console.log(error.message));
        },
        deleteData(data) {
            api.delete(this.api + "/" + data.id).then(() => {
                this.getPage(this.index)
            }).catch(error => console.log(error.message));
        },
        getRowClass(user) {
        },
        openCreateForm() {
            this.title = "Create New News";
            this.displayIndex = 1;
        },
        openEditForm(id) {
            api.get(this.api + "/" + id).then(item => {
                item.data.category = item.data.category.name;
                item.data.author = item.data.author.id;
                this.item = item.data;
                this.title = "Edit News";
                this.displayIndex = 2;
            }).catch(error => console.log(error.message));
        },
        cancel() {
            this.title = "News";
            this.displayIndex = 0;
        },
        getPage(requestedIndex) {
            this.index = requestedIndex;
            api.get(`/news/page?pageIndex=${requestedIndex}&pageSize=${this.pageSize}`)
                .then(page => {
                    this.items = page.data.items;
                    console.log(page.data.items)
                    this.items.map(item => {
                        item.author = item.author.name + " " + item.author.surname;
                        item.category = item.category.name;
                        item.datetime = new Date(item.datetime)
                            .toLocaleString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })
                    })
                    this.lastPage = page.data.lastPage;
                })
        },
        getCategories() {
            api.get("/categories").then(categories => {
                categories.data.forEach((category, index) => {
                    this.options.push({value: index + 1, label: category.name})
                })
                this.fields.push({
                    name: "category", label: "Category", type: "select", options: this.options
                })
            })
        }
    },
    beforeMount() {
        this.getCategories();
    }
}
</script>

<style scoped>
h1 {
    margin: 5vh auto;
}
</style>