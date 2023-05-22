<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div id="home">
    <h1 class="green">Home</h1>
  </div>
</template>

<style scoped>

  #home {
    height: 100vh;
    display: flex;
    font-weight: normal;
    justify-content: center;
    align-items: center;
  }

</style>
