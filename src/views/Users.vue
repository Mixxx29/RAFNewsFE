<template>
  <div id="users">
    <h1>Users</h1>
    <table class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Email</th>
        <th>Username</th>
        <th>Name</th>
        <th>Surname</th>
        <th>Type</th>
        <th>Status</th>
        <th>Password</th>
      </tr>
      </thead>
      <tbody v-for="user in users" :key="user.id">
        <UserRow :user="user"/>
      </tbody>
    </table>
  </div>
</template>

<script>
import UserRow from "@/components/UserRow.vue";

export default {
    name: "Users.vue",
  components: {UserRow},
  data() {
      return {
        users: []
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

  .table {
    width: 80%;
    margin: auto;
  }
</style>