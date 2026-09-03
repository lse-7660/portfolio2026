<script setup>
import { motion } from 'motion-v'
</script>

<template>
  <motion.div
    :initial="{ y: -50, opacity: 0 }"
    :while-in-view="{ y: 0, opacity: 1 }"
    :in-view-options="{ once: true, amount: 1 }"
    :transition="{ duration: 0.8, delay: 0.2, ease: 'easeOut' }"
  >
    <slot></slot>
  </motion.div>
</template>

<style scoped></style>
