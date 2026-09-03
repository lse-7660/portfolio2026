<script setup>
import { motion } from 'motion-v'

const props = defineProps({
  data: {
    type: Array,
  },
  componentRatio: { type: [String, Number], default: '16 / 9' },
})
</script>

<template>
  <RouterLink :to="`/project-detail/${data.routeId}`" class="project-thumbnail-container">
    <div class="project-thumbnail">
      <div
        class="thumbnail-image"
        :style="{
          backgroundImage: `url(${data?.imgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          aspectRatio: componentRatio,
        }"
      >
        <img
          v-if="data?.prize"
          src="/projects/gdweb-prize.png"
          alt="gdweb winner prize"
          class="thumbnail-image-prize"
        />
      </div>

      <div class="project-info">
        <h3 class="project-name font-heading-large font-bold">{{ data?.name.toUpperCase() }}</h3>
        <div class="project-overview text-right">
          <div class="project-contribution font-medium">{{ data?.contribution.toUpperCase() }}</div>
          <div class="project-stack gray-subtext font-label-small">
            <span v-for="(item, index) in data?.designStack" :key="index" class="project-stack-item"
              >{{ item.toUpperCase() }}
              <span
                v-if="data?.designStack.length > 1 && index + 1 !== data?.designStack.length"
                class="middle-point-wrap centering"
              >
                <span class="middle-point"></span> </span
            ></span>
            <span v-for="item in data?.frontStack" class="project-stack-item"
              ><span v-if="data?.designStack.length > 0" class="middle-point-wrap centering">
                <span class="middle-point"></span>
              </span>
              {{ item.toUpperCase() }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.project-thumbnail-container {
  display: block;
  width: 100%;
  cursor: pointer;
}
.project-thumbnail {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.thumbnail-image {
  position: relative;
  height: auto;
  overflow: hidden;
  border-radius: var(--space-4);
}
.thumbnail-image-prize {
  position: absolute;
  top: 0;
  left: var(--space-5);
  width: clamp(64px, 12vw, 120px);
  border-bottom-left-radius: var(--space-2);
  border-bottom-right-radius: var(--space-2);
}
.mobile-view .thumbnail-image-prize {
  left: var(--space-3);
}

.mobile-view .thumbnail-image {
  border-radius: var(--space-3);
}

.thumbnail-image-halftone-container {
  position: absolute;

  overflow: hidden;
}

.project-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.mobile-view .project-info {
  align-items: flex-start;
}

.project-overview {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-2);
}
</style>
