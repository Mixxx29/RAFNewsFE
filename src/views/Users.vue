<template>
  <div id="users">
    <h1>Users</h1>
    <GenericTable :columns="columns"
                  :api="api"
                  :row-class-callback="getRowClass">
    </GenericTable>
  </div>
</template>

<script>
import GenericTable from "@/components/GenericTable.vue";

export default {
    name: "Users.vue",
    components: {GenericTable},
    data() {
        return {
            columns: [
                { field: "id", label: "ID" },
                { field: "email", label: "Email" },
                { field: "name", label: "Name" },
                { field: "surname", label: "Surname" },
                { field: "type", label: "Type" },
                { field: "status", label: "Status" },
                { field: "password", label: "Password" },
            ],
            api: "http://localhost:8080/api/users",
            getRowClass(user) {
                if (user.status === "INACTIVE") return "table-danger";
                if (user.type === "ADMIN") return "table-success";
                return "table-warning";
            }
        }
    }
}
</script>

<style scoped>
  h1 {
    margin: 5vh auto;
  }

  button {
      width: 10%;
      margin-top: 2vh;
  }
</style>