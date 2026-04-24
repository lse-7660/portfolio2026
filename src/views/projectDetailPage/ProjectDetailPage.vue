<script setup>
import CursorEffect from '@/components/common/CursorEffect.vue'
import { projectsData } from '@/data/projectsData'
import { PhCaretRight } from '@phosphor-icons/vue'
import { motion, useScroll, useTransform } from 'motion-v'
import { computed, inject, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const isMobile = inject('isMobile', false)
const isTablet = inject('isTablet', false)

const route = useRoute()
const currentRouteId = computed(() => route.params.routeId)
const currentData = computed(() => {
  return projectsData.find((project) => project.routeId === currentRouteId.value)
})
const currentDataIndex = computed(() => {
  return projectsData.findIndex((item) => item.routeId === currentRouteId.value)
})

const prevProject = computed(() => {
  const index = (currentDataIndex.value - 1 + projectsData.length) % projectsData.length
  return projectsData[index]
})

const nextProject = computed(() => {
  const index = (currentDataIndex.value + 1) % projectsData.length
  return projectsData[index]
})

// style
const textBoxRef = ref(null)
const calculatedWidth = ref(0)
watch(
  async () => {
    await nextTick()
    calculatedWidth.value = textBoxRef.value.offsetWidth
  },
  { immediate: true },
)

// desc hover
const hoveredItem = ref(null)

const handleItemHover = (id) => {
  hoveredItem.value = id
}
const handleItemLeave = () => {
  hoveredItem.value = null
}
// scroll

const marginTopRange = computed(() => {
  return isMobile ? ['120px', '20px'] : ['180px', '32px']
})
const fontSizeRange = computed(() => {
  return isMobile ? ['12vw', '5vw'] : ['8vw', '2vw']
})

const { scrollY } = useScroll()
const vh1 = window.innerHeight * 0.5
const fontSize = useTransform(scrollY, [0, vh1], fontSizeRange.value)
const marginTop = useTransform(scrollY, [0, vh1], marginTopRange.value)
const positionLeft = useTransform(scrollY, [0, vh1 * 0.5], ['0px', '50%'])
const transformLeft = useTransform(scrollY, [0, vh1 * 0.5], ['translateX(0)', 'translateX(-50%)'])

// display image
const displayRef = ref(null)
const { scrollYProgress } = useScroll({
  target: displayRef,
  offset: ['start end', 'end start'],
})
const displayImagePosition = useTransform(
  scrollYProgress,
  [0, 1],
  ['translateY(0)', 'translateY(-30%)'],
)

// project navigation hover
const navigationHovered = ref(false)
const innerText = ref('')
const isIcon = ref(false)
const iconPosition = ref('')

const handleHoverEffect = (text, icon) => {
  navigationHovered.value = true
  innerText.value = text
  isIcon.value = true
  iconPosition.value = icon
}
const handleHoverLeave = () => {
  navigationHovered.value = false
  innerText.value = ''
  isIcon.value = false
  iconPosition.value = ''
}
</script>

<template>
  <div class="project-detail-page">
    <CursorEffect
      :navigationHovered="navigationHovered"
      :innerText="innerText"
      :isIcon="isIcon"
      :iconPosition="iconPosition"
    />
    <motion.div
      :style="{
        left: positionLeft,
        transform: transformLeft,
        marginTop: marginTop,
        fontSize: fontSize,
        textWrap: 'nowrap',
      }"
      class="project-name inline-padding font-prog font-regular"
    >
      <div ref="textBoxRef">{{ currentData?.name.toUpperCase() }}</div>
    </motion.div>

    <div class="project-intro-section inline-padding">
      <div :style="{ width: calculatedWidth + 'px' }" class="project-overview">
        <span class="font-label-medium">{{ currentData?.koreanName }}</span>
        <span class="font-label-medium gray-subtext">{{ currentData?.period }}</span>
      </div>
      <div v-if="!isMobile" class="project-logo">
        <img src="/logo-sample.png" alt="logo" />
      </div>
      <div class="project-desc">
        <p v-for="item in currentData?.description">{{ item }}</p>
      </div>
      <a :href="currentData?.siteUrl" target="_blank" class="site-link-wrap"
        ><span class="font-label-medium">LIVE SITE</span><PhCaretRight
      /></a>
    </div>
    <div ref="displayRef" class="project-display-section">
      <motion.img
        :src="currentData?.imgUrl"
        :style="{ height: '140%', objectFit: 'cover', transform: displayImagePosition }"
        class="display-image"
      ></motion.img>
    </div>
    <div class="tech-section inline-padding">
      <div class="tech-section-wrap">
        <div
          class="tech-section-title font-bold"
          :class="isMobile ? 'font-heading-large' : 'font-heading-xlarge'"
        >
          TECHNOLOGY USED
        </div>
        <div class="tech-section-content">
          <div class="tech-stack">
            <div class="font-heading-xsmall font-medium">STRATEGY & DESIGN</div>
            <div class="stack-list">
              <span
                v-for="(item, index) in currentData?.designStack"
                :key="index"
                class="project-stack-item"
                >{{ item.toUpperCase() }}
                <span
                  v-if="
                    currentData?.designStack.length > 1 &&
                    index + 1 !== currentData?.designStack.length
                  "
                  class="middle-point-wrap centering"
                >
                  <span class="middle-point"></span> </span
              ></span>
            </div>
          </div>
          <div class="tech-stack front-stack">
            <div class="font-heading-xsmall font-medium">FRONTEND</div>
            <div class="stack-list">
              <span
                v-for="(item, index) in currentData?.frontStack"
                :key="index"
                class="project-stack-item"
                >{{ item.toUpperCase() }}
                <span
                  v-if="
                    currentData?.frontStack.length > 1 &&
                    index + 1 !== currentData?.frontStack.length
                  "
                  class="middle-point-wrap centering"
                >
                  <span class="middle-point"></span> </span
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="currentData?.task.length > 0" class="task-section inline-padding">
      <div
        class="task-section-title section-title font-bold"
        :class="isMobile ? 'font-heading-large' : 'font-heading-xlarge'"
      >
        KEY TASKS
      </div>
      <div class="task-section-desc">
        <div class="task-section-desc-wrap" v-for="(task, index) in currentData?.task" :key="index">
          <div class="task-section-desc-index"></div>
          <div class="task-section-desc-item">
            <p class="task-title font-label-medium font-bold">
              {{ task?.title }}
            </p>
            <p class="task-desc">{{ task?.desc }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="currentData?.detail.length > 0" class="detail-section inline-padding">
      <div
        class="detail-section-title section-title font-bold"
        :class="isMobile ? 'font-heading-large' : 'font-heading-xlarge'"
      >
        GALLERY
      </div>
      <div class="detail-list grid-col-2">
        <div
          class="detail-item"
          :style="{ overflow: 'hidden' }"
          v-for="(detail, index) in currentData?.detail"
          :key="index"
          @mouseenter="handleItemHover(index)"
          @mouseleave="handleItemLeave"
        >
          <motion.div
            v-if="!isMobile"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: hoveredItem === index ? 1 : 0 }"
            :transition="{ duration: 0.5 }"
            class="detail-item-overlay"
            ><div class="detail-item-desc">
              <div class="detail-item-desc-text">
                <span class="font-prog font-display-medium">0{{ index + 1 }}</span>
                <p>{{ detail?.text }}</p>
              </div>
              <img src="/logo-sample.png" alt="logo" />
            </div>
          </motion.div>

          <motion.div
            :style="{
              width: '100%',
              aspectRatio: '4/3',
              backgroundImage: `url(${detail?.imgUrl})`,
              backgroundSize: '100%',
              backgroundPosition: 'center',
            }"
            :while-hover="{ backgroundSize: '120%' }"
            :transition="{ duration: 0.5, ease: 'easeInOut' }"
          ></motion.div>

          <div v-if="isMobile" class="detail-item-desc">
            <div class="detail-item-desc-text">
              <span class="font-prog font-display-medium">0{{ index + 1 }}</span>
              <p>{{ detail?.text }}</p>
            </div>
          </div>
        </div>
      </div>
      <a :href="currentData?.siteUrl" target="_blank" class="detail-section-link"
        ><span class="font-display-xlarge font-prog text-right">LIVE SITE</span></a
      >
    </div>

    <div class="navigation-section inline-padding">
      <div
        class="navigation-section-title font-bold"
        :class="isMobile ? 'font-heading-large' : 'font-heading-xlarge'"
      >
        VIEW MORE PROJECTS
      </div>
      <div class="navigation-wrap grid-row-2">
        <RouterLink :to="`/project-detail/${prevProject?.routeId}`" class="to-prev navigation">
          <div
            @mouseenter="handleHoverEffect('Prev Project', 'left')"
            @mouseleave="handleHoverLeave"
            class="thumbnail-image"
            :style="{
              backgroundImage: `url(${prevProject?.imgUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              aspectRatio: 4 / 3,
            }"
          ></div>
          <!-- <div class="navigation-text font-heading-medium font-bold">
            <PhCaretLeft />Prev Project
          </div> -->
        </RouterLink>

        <RouterLink :to="`/project-detail/${nextProject?.routeId}`" class="to-next navigation">
          <div
            @mouseenter="handleHoverEffect('Next Project', 'right')"
            @mouseleave="handleHoverLeave"
            class="thumbnail-image"
            :style="{
              backgroundImage: `url(${nextProject?.imgUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              aspectRatio: 4 / 3,
            }"
          ></div>
          <!-- <div class="navigation-text font-heading-medium font-bold text-right">
            Next Project<PhCaretRight />
          </div> -->
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-title-wrap {
  width: fit-content;
}

.project-name {
  position: fixed;
  top: 0;
  z-index: 100;
  color: var(--gray-0);
  width: fit-content;
  mix-blend-mode: difference;
}
.project-intro-section {
  padding-top: 310px;
  padding-bottom: var(--space-6);
}
.mobile-view .project-intro-section {
  padding-top: 200px;
  padding-bottom: var(--space-6);
}
.project-overview {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.project-logo {
  margin-top: var(--space-9);
  display: flex;
  justify-content: flex-end;
}
.project-logo img {
  width: 160px;
  mix-blend-mode: exclusion;
}
.project-desc {
  padding-left: calc(var(--grid-unit) * 7);
  margin-top: var(--space-6);
}
.mobile-view .project-desc {
  padding-left: 0;
  margin-top: var(--space-6);
}
.site-link-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--space-2);

  margin-top: var(--space-3);
}
.mobile-view .site-link-wrap {
  margin-top: var(--space-6);
}

/* display image */
.project-display-section {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.mobile-view .project-display-section {
  width: 100%;
  height: 30vh;
  overflow: hidden;
}
.display-image {
  width: 100%;
}
/* tech-section */
.tech-section {
  padding-top: var(--space-7);
}
.mobile-view .tech-section {
  padding-top: var(--space-6);
}
.tech-section-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid var(--gray-border);
  border-top: 1px solid var(--gray-border);
}
.mobile-view .tech-section-wrap {
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  border-bottom: 1px solid var(--gray-border);
  border-top: 0px solid var(--gray-border);
}
.mobile-view .tech-section-title {
  width: 100%;
  border-top: 1px solid var(--gray-border);
  border-bottom: 1px solid var(--gray-border);
  padding-block: var(--space-2);
}

.tech-section-content {
  display: flex;
  flex-direction: row;
}
.mobile-view .tech-section-content {
  gap: var(--space-4);
}
.tech-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding-block: var(--space-4);
  padding-inline: var(--space-6);
  border-left: 1px solid var(--gray-border);

  text-align: right;
}
.mobile-view .tech-stack {
  padding-inline: 0;
  border-left: 0px solid var(--gray-border);
  text-align: left;
}
.tech-stack.front-stack {
  padding-right: 0;
}
.stack-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
.mobile-view .stack-list {
  justify-content: flex-start;
}

/* task-section */
.task-section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid var(--gray-border);
}
.tablet-view .task-section,
.mobile-view .task-section {
  flex-direction: column;
}
.task-section-desc {
  width: calc(var(--grid-unit) * 6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding-top: var(--space-9);
  padding-bottom: var(--space-6);
}
.tablet-view .task-section-desc,
.mobile-view .task-section-desc {
  width: 100%;
  padding-top: 0;
}
.task-section-desc-wrap {
  display: flex;
  flex-direction: row;
  /* gap: var(--space-3); */
}
/* .task-section-desc-index {
  width: 3px;
  height: auto;
  background-color: var(--gray-text);
} */
.task-section-desc-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

/* detail-section */
.detail-section {
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--gray-border);
}
.section-title {
  padding-block: var(--space-4);
}
.detail-item {
  position: relative;
}
.detail-item-overlay {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: flex-start;

  background-color: rgba(0, 0, 0, 0.8);

  pointer-events: none;

  color: var(--gray-0);
}
.detail-item-desc {
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  width: 100%;
  height: 100%;

  padding-top: var(--space-9);
  padding-bottom: var(--space-5);
  padding-inline: var(--space-5);
}
.mobile-view .detail-item-desc {
  padding-top: var(--space-3);
  padding-bottom: 0;
  padding-inline: 0;
}
.detail-item-desc-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);

  width: inherit;
}
.mobile-view .detail-item-desc-text {
  flex-direction: row;
  align-items: center;

  width: inherit;
}
.detail-item-desc img {
  width: 82px;
  aspect-ratio: 1/1;
}

.detail-section-link {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-top: var(--space-6);
}

/* navigation */
.navigation-section {
  /* margin-top: var(--space-8); */
  padding-bottom: var(--space-6);
  /* border-top: 1px solid var(--gray-border); */
  border-bottom: 1px solid var(--gray-border);
}
.navigation-section-title {
  padding-block: var(--space-4);
}
.navigation {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  width: 100%;
}

.navigation-text {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--space-2);
}
</style>
