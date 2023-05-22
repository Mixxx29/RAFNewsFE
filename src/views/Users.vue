<template>
  <div id="users">
    <h1>Users</h1>
    <div v-if="users == null" id="spinner" class="spinner-border text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    <div v-else>
        <table class="table">
            <thead class="bg-dark">
            <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Username</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Type</th>
                <th>Status</th>
                <th>Password</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <UserRow v-for="user in users" :key="user.id" :user="user"/>
            <tr id="last-row">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            </tbody>
        </table>
        <button type="button" class="btn btn-success">Create New</button>
    </div>
  </div>
</template>

<script>
import UserRow from "@/components/UserRow.vue";

export default {
    name: "Users.vue",
  components: {UserRow},
  data() {
      return {
        users: null
      }
  },
  mounted() {
    fetch("http://localhost:8080/api/users").then(result => {
      result.json().then(users => {
        this.users = users;
      })
    }).catch(err => console.log(err.message));
  }
}
</script>

<style scoped>
  h1 {
    margin: 5vh auto;
  }

  #spinner {
      margin-top: 5vh;
      scale: 2;
  }

  .table {
    width: 80%;
    margin: auto;
  }

  tr {
      align-items: center;
  }

  th {
      color: whitesmoke;
      border: whitesmoke solid 1px;
  }

  #last-row {
      border: hidden;
      border-top: black 1px solid;
  }

  button {
      width: 10%;
      margin-top: 2vh;
  }
</style>