<script setup>
import { computed, onMounted, onUnmounted, ref, Transition } from 'vue'
import { motion } from 'motion-v'
import { PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue'

const props = defineProps({
  introHovered: {
    type: Boolean,
  },
  projectHovered: {
    type: Boolean,
  },
  navigationHovered: {
    type: Boolean,
  },
  innerText: {
    type: String,
  },
  isIcon: {
    type: Boolean,
    default: false,
  },
  iconPosition: {
    type: String,
  },
})

const x = ref(0)
const y = ref(0)

const updateMouse = (event) => {
  x.value = event.clientX
  y.value = event.clientY
}

onMounted(() => {
  window.addEventListener('mousemove', updateMouse)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateMouse)
})

const cursorState = computed(() => {
  if (props.introHovered) return 'intro'
  if (props.projectHovered) return 'project'
  if (props.navigationHovered) return 'navigation'
  return 'default'
})

const sizeMap = {
  default: '16px',
  project: 'fit-content',
  navigation: 'fit-content',
  intro: '180px',
}
</script>

<template>
  <div
    class="cursor-wrapper"
    :style="{
      transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
    }"
  >
    <motion.div
      :initial="{ width: '16px', height: '16px' }"
      :animate="{
        width: sizeMap[cursorState],
        height: sizeMap[cursorState],
      }"
      :transition="{ duration: 0.3, ease: 'easeInOut' }"
      class="cursor-effect"
      :class="navigationHovered || projectHovered ? 'cursor-hovered' : ''"
    >
      <!-- icon left -->
      <div v-if="isIcon && iconPosition === 'left'" class="icon-box centering"><PhCaretLeft /></div>

      <!-- innertext -->
      <span v-if="iconPosition === 'right'"></span
      >{{ navigationHovered || projectHovered ? innerText : ''
      }}<span v-if="iconPosition === 'left'"></span>

      <!-- icon right -->
      <div v-if="isIcon && iconPosition === 'right'" class="icon-box centering">
        <PhCaretRight />
      </div>
    </motion.div>
  </div>
</template>

<style scoped>
/* custom cursor */
.cursor-wrapper {
  position: fixed;
  z-index: 100;
  pointer-events: none;
}
.cursor-effect {
  overflow: hidden;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--space-3);

  width: 16px;
  height: 16px;
  border-radius: 9999px;
  background-color: var(--color-main);

  text-wrap: nowrap;
  font-size: var(--font-label-large);
  font-weight: var(--font-weight-medium);
}
.cursor-effect.cursor-hovered {
  padding-block: var(--space-2);
  padding-inline: var(--space-2);
  width: fit-content;
  height: fit-content;
}
.icon-box {
  height: 40px;
  aspect-ratio: 1/1;
  border-radius: 9999px;
  background-color: var(--gray-text);
}
.icon-box svg {
  color: var(--gray-0);
}
</style>
