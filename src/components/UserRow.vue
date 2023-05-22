<script>
export default {
    name: "UserRow",
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
          statusClassName: "table-success"
      }
    },
    mounted() {
        if (this.user.type === "CONTENT_CREATOR") {
            this.statusClassName = "table-warning";
        }

        if (this.user.status === "INACTIVE") {
            this.statusClassName = "table-danger";
        }
    }
}
</script>

<template>
  <tr :class="statusClassName">
    <td>{{ user.id }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.username }}</td>
    <td>{{ user.name }}</td>
    <td>{{ user.surname }}</td>
    <td>{{ user.type }}</td>
    <td>{{ user.status }}</td>
    <td>{{ user.password }}</td>
    <td>
        <button type="button" class="btn btn-primary">Edit</button>
        <button type="button" class="btn btn-danger">Delete</button>
    </td>
  </tr>
</template>

<style scoped>

  td {
      border: black 1px solid;
      vertical-align: middle;
  }

  button {
      width: 40%;
      margin: 0 5px;
  }
</style>