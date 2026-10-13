<script setup>
import { motion, useScroll, useTransform } from 'motion-v'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isTransitioning = ref(false)

// display animation
const displayText = ref(['', '', '', ''])
const specialChars = ['%', '#', '@', '$', '&']
const finalChars = ['I', 'D', 'E', 'A']

const startSequence = () => {
  const changeCounts = new Array(finalChars.length).fill(0)

  const interval = setInterval(() => {
    let allFinished = true

    for (let i = 0; i < finalChars.length; i++) {
      if (changeCounts[i] < 8 + i * 4) {
        const randomIdx = Math.floor(Math.random() * specialChars.length)
        displayText.value[i] = specialChars[randomIdx]

        changeCounts[i]++
        allFinished = false
      } else {
        displayText.value[i] = finalChars[i]
      }
    }

    if (allFinished) {
      clearInterval(interval)
    }
  }, 100)
}

onMounted(() => {
  startSequence()
  setTimeout(() => {
    isTransitioning.value = true
  }, 3800)
  setTimeout(() => {
    router.push('/main')
  }, 4500)
})
</script>

<template>
  <div class="main-section section-display inline-padding">
    <div class="display-bottom-area font-heading-xlarge gray-0 font-bold">
      <motion.div
        :initial="{ y: 10 }"
        :animate="{ y: 0 }"
        :transition="{ duration: 0.8, delay: 2.5, ease: 'easeOut' }"
      >
        FROM
        <span v-for="(char, index) in displayText" :key="index">
          {{ char }}
        </span>
        <motion.p
          :initial="{ y: 10, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :transition="{ duration: 0.8, delay: 2.5, ease: 'easeOut' }"
          class="font-kenoky"
          >TO INTERFACE</motion.p
        >
      </motion.div>
    </div>
    <div class="page-transition-out" :class="{ 'is-active': isTransitioning }"></div>
  </div>
</template>

<style scoped>
/* display section */
.section-display {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding-top: calc(var(--space-4) + var(--header-height));
  padding-bottom: var(--space-7);
  background-color: var(--gray-100);
}

.display-bottom-area {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  text-align: center;
}
/* 트랜지션 */
.page-transition-out {
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0;

  background-color: var(--gray-0);

  transition: height 0.3s ease-in-out;
}
.page-transition-out.is-active {
  height: 100vh;
}
</style>
