<template>
  <div id="users">
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
  name: "UsersTable.vue",
  components: {GenericForm, GenericTable, Pagination},
  data() {
    return {
      title: "Users",
      columns: [
        {field: "id", label: "ID"},
        {field: "email", label: "Email"},
        {field: "name", label: "Name"},
        {field: "surname", label: "Surname"},
        {field: "type", label: "Type"},
        {field: "status", label: "Status"},
        {field: "password", label: "Password"}
      ],
      fields: [
        {name: "email", label: "Email", type: "email"},
        {name: "name", label: "Name", type: "text"},
        {name: "surname", label: "Surname", type: "text"},
        {
          name: "type", label: "Type", type: "select", options: [
            {value: "0", label: "ADMIN"},
            {value: "1", label: "CONTENT_CREATOR"}
          ]
        },
        {
          name: "status", label: "Status", type: "select", options: [
            {value: "0", label: "ACTIVE"},
            {value: "1", label: "INACTIVE"}
          ]
        },
        {name: "password", label: "Password", type: "password"},
        {name: "repeatedPassword", label: "Repeated Password", type: "password"}
      ],
      api: "/users",
      items: [],
      item: {},
      displayIndex: 0,
      pageIndex: 1,
      pageSize: 5,
      lastPage: 1,
      index: 1
    }
  },
  methods: {
    createData(data) {
      delete data.repeatedPassword;
      api.post(this.api, data).then(() => {
        this.getPage(this.index)
      }).catch(error => console.log(error.message));
    },
    saveData(data) {
      delete data.repeatedPassword;
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
      if (user.status === "INACTIVE") return "table-danger";
      if (user.type === "ADMIN") return "table-success";
      return "table-warning";
    },
    openCreateForm() {
      this.title = "Create New User";
      this.displayIndex = 1;
    },
    openEditForm(id) {
      api.get(this.api + "/" + id).then(item => {
        this.item = item.data;
        this.title = "Edit User";
        this.displayIndex = 2;
      }).catch(error => console.log(error.message));
    },
    cancel() {
      this.title = "Users";
      this.displayIndex = 0;
    },
    getPage(requestedIndex) {
      this.index = requestedIndex;
      axios.get(`http://localhost:8080/users/page?pageIndex=${requestedIndex}&pageSize=${this.pageSize}`).then(page => {
        this.items = page.data.items;
        this.lastPage = page.data.lastPage;
      })
    },
  }
}
</script>

<style scoped>
h1 {
  margin: 5vh auto;
}
</style>