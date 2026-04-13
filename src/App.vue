<script setup>
import { computed, provide, readonly } from 'vue'
import AppFooter from './components/layout/AppFooter.vue'
import AppHeader from './components/layout/AppHeader.vue'
import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  mobile: 740,
  tablet: 1280,
})

const isMobile = breakpoints.smallerOrEqual('mobile')
const isTablet = breakpoints.smallerOrEqual('tablet')

const viewClass = computed(() => {
  if (isMobile.value) return 'mobile-view'
  if (isTablet.value) return 'tablet-view'
  return ''
})

provide('isMobile', readonly(isMobile))
provide('isTablet', readonly(isTablet))
</script>

<template>
  <AppHeader v-if="$route.meta.isHeader !== false" />
  <main :class="viewClass">
    <RouterView />
  </main>
  <AppFooter v-if="$route.meta.isHeader !== false" :class="viewClass" />
</template>

<style scoped></style>
