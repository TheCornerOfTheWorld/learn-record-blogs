<script setup lang="ts">
import { ref } from 'vue'

const isShow = ref(true)
</script>
<template>
  <slot name="title" />
  <slot name="code" />
  <slot />
  <button @click="isShow = !isShow">Show: {{ isShow }}</button>
  <slot name="highlight" v-if="isShow" />
</template>
<style scoped>
button {
  font-weight: bold;
}
</style>
