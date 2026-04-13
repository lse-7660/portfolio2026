<script setup>
import { inject, onMounted, onUnmounted, ref, watch } from 'vue'
import ProjectThumbnail from '@/components/mainPage/ProjectThumbnail.vue'
import { projectsData } from '@/data/projectsData'
import CursorEffect from '@/components/common/CursorEffect.vue'
import { motion, useScroll, useTransform } from 'motion-v'
import MotionUpward from '@/components/motion/MotionUpward.vue'
import MotionPadding from '@/components/motion/MotionPadding.vue'

// 반응형
const isMobile = inject('isMobile', false)
const isTablet = inject('isTablet', false)

// name image height
const imageRef = ref(null)
const calculatedHeight = ref(0) // 스타일 변수로 쓸 높이 값

const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    calculatedHeight.value = entry.target.offsetHeight
  }
})

// viewport height
const viewportHeight = ref(window.innerHeight)
const updateHeight = () => {
  viewportHeight.value = window.innerHeight
}

// viewport resizing
onMounted(() => {
  window.addEventListener('resize', updateHeight)
  updateHeight()
  if (imageRef.value) {
    resizeObserver.observe(imageRef.value)
  }
})
onUnmounted(() => {
  resizeObserver.disconnect()
  window.removeEventListener('resize', updateHeight)
})

// display text animation
const { scrollY } = useScroll()

const nameYPosition = useTransform(scrollY, (latest) => {
  const start = viewportHeight.value + 120

  const end = viewportHeight.value - calculatedHeight.value - 24

  const range = calculatedHeight.value + 144 || 1000

  const progress = Math.min(Math.max(latest / range, 0), 1)

  const currentPos = start + (end - start) * progress

  return `${currentPos}px`
})

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
  <CursorEffect
    :introHovered="isTextHovered"
    :projectHovered="isProjectHovered"
    inner-text="VIEW PROJECT"
    :is-icon="isIcon"
    iconPosition="right"
  />
  <div class="relative">
    <motion.div
      v-if="!isMobile"
      :initial="{ y: 10, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.8, ease: 'easeOut' }"
      class="display-name inline-padding"
      :style="{ bottom: nameYPosition }"
    >
      <img ref="imageRef" src="/main/LEE SONG EUN.png" alt="" />
    </motion.div>

    <div class="main-section section-display inline-padding">
      <div class="display-bottom-area font-heading-xlarge gray-0 font-bold">
        <div>
          FROM IDEA

          <p>TO INTERFACE</p>
        </div>
      </div>

      <motion.div
        :initial="{ y: 10, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ duration: 0.8, delay: 0.5, ease: 'easeOut' }"
        class="display-top-area gray-0"
      >
        <motion.div
          v-if="isMobile"
          :initial="{ y: 10, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :transition="{ duration: 0.8, ease: 'easeOut' }"
          class="display-name"
        >
          <img ref="imageRef" src="/main/LEE SONG EUN.png" alt="" />
        </motion.div>
        <div class="font-heading-small font-medium">END-TO-END FRONTEND</div>
        <div class="font-light" :class="isMobile ? '' : 'text-right'">
          여러 개의 점이 모여 하나의 원이 되듯이. <br />
          기획과 디자인, 그리고 구현까지. 아이디어를 완성된 사용자 경험으로 만드는 프론트엔드 개발자
          이송은입니다.
        </div>
      </motion.div>
    </div>

    <div class="main-section section-intro inline-padding">
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
          <!-- tablet -->
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
          <!-- pc -->
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
    </div>
  </div>

  <div class="main-section section-project inline-padding">
    <h2 class="font-heading-xsmall gray-subtext">PROJECTS</h2>
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
          :initial-padding="isMobile ? 20 : 45"
          :delay="isMobile ? 0 : 0.1"
          :animate-padding="isMobile ? 0 : 28"
          ><ProjectThumbnail
            :data="projectsData[2]"
            :component-ratio="4 / 3"
            @mouseenter="handleHoveredProject"
            @mouseleave="handleLeaveProject"
        /></MotionPadding>

        <MotionPadding :initial-padding="isMobile ? 20 : 30" :animate-padding="isMobile ? 0 : 3">
          <ProjectThumbnail
            :data="projectsData[3]"
            :component-ratio="4 / 5"
            @mouseenter="handleHoveredProject"
            @mouseleave="handleLeaveProject"
        /></MotionPadding>
        <MotionPadding
          :initial-padding="isMobile ? 20 : 50"
          :delay="isMobile ? 0 : 0.1"
          :animate-padding="isMobile ? 0 : 25"
          ><ProjectThumbnail
            :data="projectsData[4]"
            :component-ratio="4 / 3"
            @mouseenter="handleHoveredProject"
            @mouseleave="handleLeaveProject"
        /></MotionPadding>
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
.mobile-view .section-display {
  height: 70vh;
  padding-bottom: var(--space-5);
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
  flex-direction: row;
  justify-content: space-between;
}
.mobile-view .display-top-area {
  flex-direction: column;
  gap: var(--space-2);
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

.mobile-view .display-name {
  position: relative;
}
.display-name img {
  width: 100%;
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
  padding-top: var(--space-7);
  padding-bottom: var(--space-9);
}
.mobile-view .section-project {
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
  gap: var(--space-5);
}
</style>
