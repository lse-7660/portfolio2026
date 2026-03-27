<script setup>
import { motion } from 'motion-v'

const props = defineProps({
  initialPadding: {
    type: Number,
  },
  animatePadding: { type: Number, default: 0 },
  delay: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <motion.div
    :initial="{ paddingTop: `${initialPadding}vh` }"
    :while-in-view="{ paddingTop: `${animatePadding}vh` }"
    :in-view-options="{ amount: 0.2, once: true }"
    :transition="{ duration: 0.8, delay: delay, ease: 'easeInOut' }"
    class="motion-padding"
  >
    <slot></slot>
  </motion.div>
</template>

<style scoped>
.motion-padding {
  width: 100%;
  height: fit-content;
}
</style>
