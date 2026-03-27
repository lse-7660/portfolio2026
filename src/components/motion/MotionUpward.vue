<script setup>
import { motion } from 'motion-v'
</script>

<template>
  <motion.div
    :initial="{ y: 20, opacity: 0 }"
    :while-in-view="{ y: 0, opacity: 1 }"
    :in-view-options="{ once: true, amount: 1 }"
    :transition="{ delay: 0.5, duration: 0.5, ease: 'easeOut' }"
  >
    <slot></slot>
  </motion.div>
</template>

<style scoped></style>
