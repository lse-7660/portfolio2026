<script setup>
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue'
import ProjectThumbnail from '@/components/mainPage/ProjectThumbnail.vue'
import { projectsData } from '@/data/projectsData'
import CursorEffect from '@/components/common/CursorEffect.vue'
import { motion, useScroll } from 'motion-v'
import MotionUpward from '@/components/motion/MotionUpward.vue'
import MotionPadding from '@/components/motion/MotionPadding.vue'
import { previousPath } from '@/store/previousPath'
import MotionDown from '@/components/motion/MotionDown.vue'
import { PhCaretRight } from '@phosphor-icons/vue'

const isPreviousPathIntro = ref(false)
const isTransitioning = ref(false)
const animationDelayTime = ref(0)

// 반응형
const isMobile = inject('isMobile', false)
const isTablet = inject('isTablet', false)

// viewport height
const viewportHeight = ref(0)
const updateViewportHeight = () => {
  viewportHeight.value = window.innerHeight
}

// name image height
const imageRef = ref(null)
const calculatedHeight = ref(0)

const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    calculatedHeight.value = entry.target.offsetHeight
  }
})

// Y scroll for displayName
const { scrollY } = useScroll()
const displayNameTopPosition = ref(88)
let unsubscribe

onMounted(() => {
  // page transition: intro > main
  if (previousPath.value === '/') {
    isPreviousPathIntro.value = true
    animationDelayTime.value = 0.1
    setTimeout(() => {
      isTransitioning.value = true
    }, animationDelayTime * 1000)
  }

  if (imageRef.value) {
    resizeObserver.observe(imageRef.value)
  }

  updateViewportHeight()
  window.addEventListener('resize', updateViewportHeight)

  displayNameTopPosition.value = scrollY.get() + 120
  unsubscribe = scrollY.on('change', (latest) => {
    if (latest < viewportHeight.value) {
      displayNameTopPosition.value = latest + 120
    } else {
      displayNameTopPosition.value = viewportHeight.value + 120
    }
  })
})
onUnmounted(() => {
  resizeObserver.disconnect()
  window.removeEventListener('resize', updateViewportHeight)
  unsubscribe?.()
})

// circular typo
const typoString = 'from idea --- to interface '
const typoArray = Array.from(typoString.toUpperCase())
const typoAngleStep = computed(() => 360 / typoArray.length)

const isTextHovered = ref(false)

// project section
const isProjectHovered = ref(false)
const isIcon = ref(false)

const handleHoveredProject = (id) => {
  isProjectHovered.value = true
  isIcon.value = true
}
const handleLeaveProject = (id) => {
  isProjectHovered.value = false
  isIcon.value = false
}
</script>

<template>
  <div
    v-if="isPreviousPathIntro"
    class="page-transition-in"
    :class="isTransitioning ? 'is-active' : ''"
  ></div>

  <CursorEffect
    :introHovered="isTextHovered"
    :projectHovered="isProjectHovered"
    inner-text="VIEW PROJECT"
    :is-icon="isIcon"
    iconPosition="right"
  />
  <div class="relative">
    <motion.div :style="{ top: `${displayNameTopPosition}px` }" class="display-title-wrap">
      <motion.div
        v-if="!isMobile"
        :initial="{ y: 20, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ duration: 1.2, delay: animationDelayTime + 0.3, ease: 'easeOut' }"
        class="inline-padding"
        ><div class="display-title gray-0 font-kenoky">
          <div>END-TO-END</div>
          <div>FRONTEND</div>
        </div>
      </motion.div>
    </motion.div>

    <div class="main-section section-display inline-padding">
      <motion.div
        v-if="isMobile"
        :initial="{ y: 10, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
        ><div class="display-title gray-0 font-kenoky">
          <div>END-TO-END</div>
          <div>FRONTEND</div>
        </div>
      </motion.div>

      <div v-if="!isMobile" class="display-title gray-100 font-kenoky">
        <div>END-TO-END</div>
        <div>FRONTEND</div>
      </div>

      <!-- angular typo -->
      <motion.div
        class="display-circular-typo-wrap"
        :initial="{ y: 10, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ duration: 0.8, delay: animationDelayTime + 0.5, ease: 'easeOut' }"
      >
        <motion.div
          class="display-circular-typo relative gray-0 font-kenoky font-heading-xsmall"
          :animate="{ rotate: -360 }"
          :transition="{ duration: 15, ease: 'linear', repeat: Infinity }"
        >
          <div
            class="display-circular-typo-char"
            v-for="(char, index) in typoArray"
            :key="index"
            :style="{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }"
          >
            <div
              class="display-circular-typo-char-inner"
              :style="{
                transform: `rotate(${index * typoAngleStep}deg) `,
                transformOrigin: 'center',
              }"
            >
              <div v-if="char === '-'" class="display-circular-typo-char-dot"></div>

              {{ char === '-' ? '' : char }}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        :initial="{ y: 10, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ duration: 1.2, delay: animationDelayTime + 0.8, ease: 'easeOut' }"
        class="display-desc-area gray-0"
      >
        <div class="font-kenoky font-heading-medium font-medium">LEE SONG EUN</div>

        <div class="font-light" :class="isMobile ? '' : 'text-right'">
          기획과 디자인, 그리고 구현까지.<br />아이디어를 사용자 경험으로 완성하는 프론트엔드 개발자
          이송은입니다.
        </div>
      </motion.div>
    </div>
    <div v-if="!isMobile" class="display-title display-title-placeholder gray-bg font-kenoky">
      <div>END-TO-END</div>
      <div>FRONTEND</div>
    </div>
  </div>
  <div class="main-section section-about inline-padding">
    <div>
      <MotionDown class="about-display-text">I plan the structure</MotionDown>
      <MotionDown class="about-display-text">I design the experience</MotionDown>
      <MotionDown class="about-display-text">I build with codes</MotionDown>
    </div>
    <MotionDown class="about-desc">
      <div class="about-desc-detail">
        <p class="font-label-medium font-regular gray-subtext">What You'll Find in Me:</p>
        <p>단순한 구현을 넘어, 경험을 설계합니다.</p>
        <p>
          기획부터 UI/UX 디자인, 프론트엔드 구현까지 전 과정을 경험하며 서비스의 흐름을 전체적으로
          이해합니다. 또한 코드의 재사용성과 유지보수성을 고려한 구조를 고민하며, 사용자 경험과 개발
          효율을 함께 만들어갑니다.
        </p>
      </div>
      <div class="about-desc-resume">
        <p class="font-label-medium font-regular gray-subtext">자기소개서</p>
        <a href="https://app.notion.com/p/528a4dadf3cc834eac2181fcafa4d4ba" target="_blank"
          ><div class="btn-to-resume">
            <p>GET TO KNOW ME</p>
            <div class="btn-to-resume-space"></div>
            <p><PhCaretRight weight="bold" /></p></div
        ></a>
      </div>
    </MotionDown>
  </div>
  <div class="main-section section-project inline-padding">
    <h2 class="font-label-medium font-regular gray-subtext">PROJECTS</h2>
    <div class="project-list">
      <MotionPadding :initial-padding="20">
        <ProjectThumbnail
          :data="projectsData[0]"
          @mouseenter="handleHoveredProject"
          @mouseleave="handleLeaveProject"
      /></MotionPadding>
      <div class="grid-col-2">
        <MotionPadding :initial-padding="20">
          <ProjectThumbnail
            :data="projectsData[1]"
            :component-ratio="isTablet ? 16 / 9 : 1 / 1"
            @mouseenter="handleHoveredProject"
            @mouseleave="handleLeaveProject"
        /></MotionPadding>
        <MotionPadding :initial-padding="isTablet ? 20 : 45" :delay="isTablet ? 0 : 0.1"
          ><ProjectThumbnail
            :data="projectsData[2]"
            :component-ratio="isTablet ? 16 / 9 : 4 / 3"
            @mouseenter="handleHoveredProject"
            @mouseleave="handleLeaveProject"
        /></MotionPadding>

        <MotionPadding :initial-padding="isTablet ? 20 : 30">
          <ProjectThumbnail
            :data="projectsData[3]"
            :component-ratio="isTablet ? 16 / 9 : 3 / 4"
            @mouseenter="handleHoveredProject"
            @mouseleave="handleLeaveProject"
        /></MotionPadding>
        <MotionPadding :initial-padding="isTablet ? 20 : 50" :delay="isTablet ? 0 : 0.1"
          ><ProjectThumbnail
            :data="projectsData[4]"
            :component-ratio="isTablet ? 16 / 9 : 1 / 1"
            @mouseenter="handleHoveredProject"
            @mouseleave="handleLeaveProject"
        /></MotionPadding>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* transition */
.page-transition-in {
  position: fixed;
  z-index: 10000;
  left: 0;
  right: 0;
  top: 0;
  height: 100vh;

  background-color: var(--gray-0);

  transition: height 0.3s ease-out;
}
.page-transition-in.is-active {
  height: 0;
}
/* display section */
.section-display {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;

  padding-top: calc(var(--space-4) + var(--header-height));
  padding-bottom: var(--space-7);
  background-color: var(--gray-100);
}
.mobile-view .section-display {
  align-items: flex-start;

  height: 80vh;
  padding-bottom: var(--space-5);
}

.display-desc-area {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-4);
}
.mobile-view .display-desc-area {
  align-items: flex-start;
  gap: var(--space-4);
}
.display-title-wrap {
  position: absolute;
  z-index: 10;
  width: 100%;
  background-color: #000000;
  mix-blend-mode: exclusion;
}
.display-title-placeholder {
  padding-block: var(--space-9);
}

.display-title {
  font-size: clamp(58px, 8vw, 120px);
}

.display-circular-typo-wrap {
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.display-circular-typo {
  width: 25vh;
  height: 25vh;
}
.mobile-view .display-circular-typo {
  width: 20vh;
  height: 20vh;
}
.display-circular-typo-char-inner {
  width: fit-content;
  height: 25vh;
}
.mobile-view .display-circular-typo-char-inner {
  height: 20vh;
}
.display-circular-typo-char-dot {
  width: 4px;
  height: 4px;
  background-color: var(--color-main);
  border-radius: 9999px;
}

/* about section */
.section-about {
  padding-top: var(--space-7);
  padding-bottom: var(--space-9);
  border-bottom: 1px solid var(--gray-border);
}
.tablet-view .section-about {
  padding-block: var(--space-7);
}
.mobile-view .section-about {
  padding-top: var(--space-6);
  padding-bottom: var(--space-7);
}
.about-display-text {
  padding-block: var(--space-2);
  font-family: 'Kenoky';
  font-size: var(--font-display-xlarge);
}
.mobile-view .about-display-text {
  padding-block: var(--space-1);
  font-size: var(--font-display-large);
}
.about-desc {
  margin-left: calc(var(--grid-unit) * 7);
}
.tablet-view .about-desc {
  margin-left: calc(var(--grid-unit) * 4);
  margin-right: calc(var(--grid-unit) * 1);
}
.mobile-view .about-desc {
  margin-left: 0;
}

.about-desc-detail {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-top: var(--space-8);
  margin-bottom: var(--space-8);
}
.mobile-view .about-desc-detail {
  margin-top: var(--space-6);
  margin-bottom: var(--space-6);
}
.about-desc-resume {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.btn-to-resume {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--space-2);
  padding-block: var(--space-2);
  width: 100%;

  font-size: var(--font-label-large);
  font-weight: var(--font-weight-regular);

  transition: all 0.5s ease-in-out;
}
.btn-to-resume:hover {
  padding-inline: var(--space-3);

  background-color: var(--gray-text);
  color: var(--gray-0);
  font-weight: var(--font-weight-regular);
}
.btn-to-resume p {
  flex-shrink: 0;
  display: flex;

  align-items: center;
}
.btn-to-resume-space {
  width: 0%;
  transition: all 0.5s ease-in-out 0.2s;
}
.btn-to-resume:hover .btn-to-resume-space {
  width: 100%;
}

/* project section */
.section-project {
  padding-block: var(--space-9);
}
.mobile-view .section-project {
  padding-top: var(--space-7);
  padding-bottom: var(--space-7);
}
.section-project h2 {
  margin-bottom: var(--space-4);
}
.project-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}
.tablet-view .project-list {
  gap: var(--space-5);
}

.mobile-view .project-list {
  gap: var(--space-3);
}
</style>
