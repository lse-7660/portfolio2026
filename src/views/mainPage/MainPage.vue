<script setup>
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue'
import ProjectThumbnail from '@/components/mainPage/ProjectThumbnail.vue'
import { projectsData } from '@/data/projectsData'
import CursorEffect from '@/components/common/CursorEffect.vue'
import { motion, useScroll } from 'motion-v'
import MotionUpward from '@/components/motion/MotionUpward.vue'
import MotionPadding from '@/components/motion/MotionPadding.vue'
import { previousPath } from '@/store/previousPath'

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

// intro section
const introText = [
  {
    tag: 'Planning',
    introText: 'PLAN THE STRUCTURE',
    title: '문제를 찾아내고 구조를 설계하다',
    desc: [
      '사용자가 웹사이트를 원활하게 이용할 수 있도록',
      '정보의 흐름을 정리하고, 핵심 기능과 콘텐츠를 적절한 위치에 배치하며',
      '사용자 경험을 고려한 플로우차트로 전체 구조와 이용 흐름을 설계합니다.',
    ],
  },
  {
    tag: 'UI/UX Design',
    introText: 'DESIGN THE EXPERIENCE',
    title: '경험을 시각적으로 구현하다',
    desc: [
      '정보를 명확하게 전달하는 인터페이스를 설계합니다.',
      '아름다운 화면을 만드는 데 그치지 않고, 사용자가 정보를 쉽게 찾고',
      '자연스럽게 웹페이지를 탐색할 수 있도록 설계합니다.',
    ],
  },
  {
    tag: 'Frontend',
    introText: 'BUILD WITH CODE',
    title: '디자인에 생명을 불어넣다',
    desc: [
      '정적인 디자인을 코드로 구현해 인터페이스로 완성합니다.',
      '인터랙션과 애니메이션을 통해 화면에 생동감을 더하고,',
      '사용자의 행동에 자연스럽게 반응하는 웹 경험을 구현합니다.',
    ],
  },
]
const isTextHovered = ref(false)
const hoveredTextIndex = ref(0)

const handleHoveredText = (id) => {
  isTextHovered.value = true
  hoveredTextIndex.value = id
}
const handleLeaveText = (id) => {
  isTextHovered.value = false
  hoveredTextIndex.value = null
}

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
    <motion.div :style="{ top: `${displayNameTopPosition}px` }" class="display-name-wrap">
      <motion.div
        v-if="!isMobile"
        :initial="{ y: 20, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ duration: 1.2, delay: animationDelayTime + 0.3, ease: 'easeOut' }"
        class="display-name inline-padding"
        ><div class="display-title gray-0 font-kenoky">
          <div>END-TO-END</div>
          <div>FRONTEND</div>
        </div>
        <!-- <img ref="imageRef" src="/main/displayText.png" alt="" /> -->
      </motion.div>
    </motion.div>

    <div class="main-section section-display inline-padding">
      <motion.div
        v-if="isMobile"
        :initial="{ y: 10, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
        class="display-name"
        ><div class="display-title gray-0 font-kenoky">
          <div>END-TO-END</div>
          <div>FRONTEND</div>
        </div>
        <!-- <img ref="imageRef" src="/main/displayText.png" alt="" /> -->
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
              :component-ratio="1 / 1"
              @mouseenter="handleHoveredProject"
              @mouseleave="handleLeaveProject"
          /></MotionPadding>
          <MotionPadding
            :initial-padding="isTablet ? 20 : 45"
            :delay="isTablet ? 0 : 0.1"
            :animate-padding="isTablet ? 0 : 22"
            ><ProjectThumbnail
              :data="projectsData[2]"
              :component-ratio="4 / 3"
              @mouseenter="handleHoveredProject"
              @mouseleave="handleLeaveProject"
          /></MotionPadding>

          <MotionPadding :initial-padding="isTablet ? 20 : 30" :animate-padding="isTablet ? 0 : 3">
            <ProjectThumbnail
              :data="projectsData[3]"
              :component-ratio="3 / 4"
              @mouseenter="handleHoveredProject"
              @mouseleave="handleLeaveProject"
          /></MotionPadding>
          <MotionPadding
            :initial-padding="isTablet ? 20 : 50"
            :delay="isTablet ? 0 : 0.1"
            :animate-padding="isTablet ? 0 : 25"
            ><ProjectThumbnail
              :data="projectsData[4]"
              :component-ratio="1 / 1"
              @mouseenter="handleHoveredProject"
              @mouseleave="handleLeaveProject"
          /></MotionPadding>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="main-section section-intro inline-padding">
    <div
      class="intro-text-area"
      :style="{
        paddingTop: isTablet ? '40px' : `${calculatedHeight}px`,
      }"
    >
      <MotionUpward
        class="intro-text-item"
        v-for="(item, index) in introText"
        :key="index"
        @mouseenter="handleHoveredText(index)"
        @mouseleave="handleLeaveText"
      >
        <div class="intro-text-display">
          <div class="intro-tag">{{ item.tag }}</div>
          <div class="intro-text">
            {{ item.introText }}
            <div
              v-if="hoveredTextIndex === index && !isTablet"
              class="intro-text intro-text-prog font-prog"
            >
              {{ item.introText }}
            </div>
          </div>
        </div>
   
        <motion.div
          v-if="isTablet"
          :initial="{ y: 20, opacity: 0 }"
          :animate="{
            y: 0,
            opacity: 1,
          }"
          :transition="{ duration: 0.3, ease: 'easeOut' }"
          class="intro-text-desc"
        >
          <p class="font-label-medium font-medium">{{ item.title }}</p>
          <div>
            <p class="font-body-small" v-for="line in item.desc" :key="line">{{ line }}</p>
          </div>
        </motion.div>

        <motion.div
          v-else
          :initial="{ y: 20, opacity: 0 }"
          :animate="{
            y: hoveredTextIndex === index ? 0 : 20,
            opacity: hoveredTextIndex === index ? 1 : 0,
          }"
          :transition="{ duration: 0.3, ease: 'easeOut' }"
          class="intro-text-desc text-right"
        >
          <p class="font-label-medium font-medium">{{ item.title }}</p>
          <div>
            <p class="font-body-small" v-for="line in item.desc" :key="line">{{ line }}</p>
          </div>
        </motion.div>
      </MotionUpward>
    </div>
  </div> -->

  <div class="main-section section-about inline-padding"></div>
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
.display-name-wrap {
  position: absolute;
  z-index: 10;
  width: 100%;
  background-color: #000000;
  mix-blend-mode: exclusion;
}
.display-name {
  width: 80%;
}

.mobile-view .display-name {
  position: relative;
}
.display-title {
  font-size: clamp(var(--font-display-xlarge), 10vw, var(--font-display-xxlarge));
}
.display-name img {
  width: 100%;
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

/* intro section */
.section-intro {
  min-height: 100vh;
  background: var(--gray-0);
}
.mobile-view .section-intro {
  min-height: 100%;
}

.intro-text-area {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-8);
}
.mobile-view .intro-text-area {
  height: 100%;
  padding-top: var(--space-6);
  padding-bottom: var(--space-7);
  gap: var(--space-7);
}

.intro-text-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
.mobile-view .intro-text-item {
  flex-direction: column;
  gap: var(--space-3);
}

.intro-text-display {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.intro-tag {
  font-size: var(--font-label-medium);
}
.intro-text {
  flex-shrink: 0;
  position: relative;
  font-size: var(--font-display-large);
  font-weight: var(--font-weight-bold);
  color: var(--gray-100);
}
.intro-text.intro-text-prog {
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 200;
  transform: translateY(-40%);
  text-wrap: nowrap;

  font-weight: var(--font-weight-regular);
  font-size: 56px;
  letter-spacing: -8%;
  color: var(--gray-0);

  mix-blend-mode: color-dodge;
}
.intro-text-desc {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

/* project section */
.section-project {
  padding-top: 480px;
  padding-bottom: var(--space-9);
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
.mobile-view .project-list {
  gap: var(--space-3);
}
</style>
