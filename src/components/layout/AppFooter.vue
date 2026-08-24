<script setup>
import { PhCaretRight } from '@phosphor-icons/vue'
import { inject } from 'vue'

const isMobile = inject('isMobile', false)
const isTablet = inject('isTablet', false)
</script>

<template>
  <footer class="">
    <div class="footer-wrap">
      <div class="footer-text font-kenoky inline-padding">CONTACT ME</div>
      <div class="footer-subtext inline-padding" :class="isMobile ? '' : 'text-right'">
        <p class="gray-subtext font-label-small font-light">FROM IDEA TO INTERFACE</p>
        <br />
        <div class="footer-subtext-display font-display-xsmall">
          <div>I PLAN THE STRUCTURE</div>
          <div>I DESIGN THE EXPERIENCE</div>
          <div>I BUILD WITH CODE</div>
        </div>
      </div>
      <div :class="isMobile ? '' : 'inline-padding'">
        <div class="footer-content-wrap gray-0">
          <div class="detail-info-area">
            <p class="detail-info-left">
              <span class="font-bold">Mail</span
              ><a class="font-light" href="mailto:thddms355@naver.com">thddms355@naver.com</a>
              <span class="font-bold">Phone</span
              ><a class="font-light" href="tel:01076609251">010.7660.9251</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  padding-top: var(--space-7);
  padding-bottom: var(--space-7);
  background-color: var(--gray-text);
  color: var(--gray-0);
  border-top-left-radius: var(--space-5);
  border-top-right-radius: var(--space-5);
}
footer.mobile-view {
  padding-top: var(--space-7);
  padding-bottom: var(--space-5);
  border-top-left-radius: var(--space-3);
  border-top-right-radius: var(--space-3);
}
.footer-wrap {
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
}
.footer-text {
  font-size: 6vw;
}
.mobile-view .footer-text {
  font-size: 10vw;
}

.tablet-view .footer-content-wrap,
.mobile-view .footer-content-wrap {
  padding-left: var(--page-padding);
  padding-right: var(--page-padding);
  border-top-left-radius: var(--space-3);
  border-top-right-radius: var(--space-3);
}

.detail-info-area span,
.detail-info-area a {
  display: inline-block;
  width: fit-content;
}

.detail-info-area {
  display: flex;
  flex-direction: row;
  gap: 10vw;
}
.detail-info-left {
  display: grid;
  grid-template-columns: 70px 1fr;
  row-gap: var(--space-2);

  width: fit-content;
}
.detail-info-right {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.detail-info-right a {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--space-2);
}
</style>
