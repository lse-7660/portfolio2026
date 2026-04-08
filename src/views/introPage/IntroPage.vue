<script setup>
import { motion, useScroll, useTransform } from 'motion-v'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// display animation
const displayText = ref(['', '', '', '']) // Vue 반응형 변수 가정
const specialChars = ['%', '#', '@', '$', '&']
const finalChars = ['I', 'D', 'E', 'A']

const startSequence = () => {
  const changeCounts = new Array(finalChars.length).fill(0)

  const interval = setInterval(() => {
    let allFinished = true

    for (let i = 0; i < finalChars.length; i++) {
      if (changeCounts[i] < 6 + i * 2) {
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
    router.push('/main')
  }, 3000)
})
</script>

<template>
  <div class="main-section section-display inline-padding">
    <div class="display-bottom-area font-heading-xlarge gray-0 font-bold">
      <div>
        FROM
        <span v-for="(char, index) in displayText" :key="index">
          {{ char }}
        </span>
        <motion.p
          :initial="{ y: 10, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :transition="{ duration: 0.8, delay: 1.8, ease: 'easeOut' }"
          >TO INTERFACE</motion.p
        >
      </div>
    </div>
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
.section-display::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url(/main/display-bg.jpg);
  opacity: 0.2;
}
.display-top-area {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
}
.display-bottom-area {
  position: relative;
  z-index: 10;
}
.display-name {
  position: absolute;
  z-index: 10;
  width: 100%;
  background-color: #000000;
  mix-blend-mode: exclusion;
}
.display-name img {
  width: 100%;
}
</style>
