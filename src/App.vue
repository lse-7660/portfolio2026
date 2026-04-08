<script setup>
import AppFooter from './components/layout/AppFooter.vue'
import AppHeader from './components/layout/AppHeader.vue'
</script>

<template>
  <AppHeader v-if="$route.meta.isHeader !== false" />
  <main><RouterView /></main>
  <AppFooter v-if="$route.meta.isHeader !== false" />
</template>

<style scoped></style>
