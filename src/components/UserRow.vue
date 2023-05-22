<script>
export default {
  name: "UserRow",
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <tr class="{{ color }}">
    <td>{{ user.id }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.username }}</td>
    <td>{{ user.name }}</td>
    <td>{{ user.surname }}</td>
    <td>{{ user.type }}</td>
    <td>{{ user.status }}</td>
    <td>{{ user.password }}</td>
  </tr>
</template>

<style scoped>

</style>