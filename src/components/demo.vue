<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
</script>
<template>
  <div class="demo">
    <button @click="count++">Count is: {{ count }}</button>
  </div>
</template>
<style scoped>
button {
  font-weight: bold;
}
</style>
