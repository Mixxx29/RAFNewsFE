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
import axios from "axios";

export default {
  name: "NewsTable.vue",
  components: {GenericForm, GenericTable, Pagination},
  data() {
    return {
      title: "News",
      columns: [
        {field: "id", label: "ID"},
        {field: "title", label: "Title"},
        {field: "date", label: "Date"},
        {field: "visited", label: "Visited"},
        {field: "author", label: "Author"},
        {field: "category", label: "Category"},
      ],
      fields: [
        {name: "title", label: "Title", type: "text"},
        {name: "description", label: "Description", type: "text"},
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
      api.post(this.api, data).then(() => {
        this.getPage(this.index)
      }).catch(error => console.log(error.message));
    },
    saveData(data) {
      api.put(this.api, data).then(() => {
        this.getPage(this.index)
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
      axios.get(`http://localhost:8080/news/page?pageIndex=${requestedIndex}&pageSize=${this.pageSize}`)
          .then(page => {
            this.items = page.data.items;
            this.lastPage = page.data.lastPage;
          })
    },
    getCategories() {
      axios.get("http://localhost:8080/categories").then(categories => {
        categories.data.forEach((category, index) => {
          this.options.push({value: index, label: category.name})
        })
        this.fields.push({
          name: "category", label: "Category", type: "select", options: this.options
        })
      })
    }
  },
  beforeMount() {
    this.getCategories();
    console.log(this.options)
  }
}
</script>

<style scoped>
h1 {
  margin: 5vh auto;
}
</style>