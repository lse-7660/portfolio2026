<script setup>
import { PhCaretRight } from '@phosphor-icons/vue'
import { inject } from 'vue'

const isMobile = inject('isMobile', false)
const isTablet = inject('isTablet', false)
</script>

<template>
  <footer class="">
    <div class="footer-text font-prog inline-padding">CONTACT ME</div>
    <div class="footer-subtext inline-padding" :class="isMobile ? '' : 'text-right'">
      <p>FROM IDEA TO INTERFACE</p>
      <br />
      <div class="gray-subtext">
        <span>I PLAN THE STRUCTURE</span>
        <span class="middle-point-wrap centering"><span class="middle-point"></span></span>
        <span>I DESIGN THE EXPERIENCE</span>
        <span class="middle-point-wrap centering"><span class="middle-point"></span></span>
        <span>I BUILD WITH CODE</span>
      </div>
    </div>
    <div :class="isMobile ? '' : 'inline-padding'">
      <div class="footer-content-wrap gray-0">
        <div class="logo-area">
          <h1 class="blind">이송은 프론트엔드 포트폴리오</h1>
          <RouterLink to="/main"><img src="/logo-sample.png" alt="logo" /></RouterLink>
          <div class="name-area">
            <div class="font-display-small font-medium">이송은</div>
            <div class="font-label-medium font-light">LEE SONG EUN</div>
          </div>
        </div>
        <div
          v-if="!isMobile"
          :class="`display-area  ${isMobile ? 'font-display-small' : 'font-display-medium text-right'} font-bold`"
        >
          STRATEGY<br />
          UX/UI DESIGN<br />
          & FRONTEND ENGINEERING
        </div>
        <div class="detail-info-area">
          <p class="detail-info-left">
            <span class="font-bold">Mail</span
            ><a href="mailto:thddms355@naver.com">thddms355@naver.com</a>
            <span class="font-bold">Phone</span><a href="tel:01076609251">010.7660.9251</a>
          </p>
          <!-- <p class="detail-info-right">
            <a href="https://www.jobkorea.co.kr/User/Resume/View?rNo=30343298" target="_blank"
              >job korea <PhCaretRight
            /></a>
            <a href="" target="_blank">saramin <PhCaretRight /></a>
          </p> -->
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  border-top: 1px solid var(--gray-border);
  padding-top: var(--space-7);
}
footer .mobile-view {
  padding-top: var(--space-5);
}
.footer-text {
  font-size: 6vw;
}
.mobile-view .footer-text {
  font-size: 10vw;
}
.footer-subtext {
  padding-block: var(--space-4);
}
.mobile-view .footer-subtext {
  padding-block: var(--space-5);
}
.footer-subtext > div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
.footer-content-wrap {
  padding: var(--space-7);
  background-color: var(--gray-text);

  border-top-left-radius: var(--space-4);
  border-top-right-radius: var(--space-4);
}
.tablet-view .footer-content-wrap,
.mobile-view .footer-content-wrap {
  padding: var(--page-padding);
  border-top-left-radius: var(--space-3);
  border-top-right-radius: var(--space-3);
}
.logo-area {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--space-6);
  margin-bottom: var(--space-6);
}
.mobile-view .logo-area {
  gap: var(--space-4);
}
.logo-area a img {
  width: calc(var(--grid-unit) * 2);
  height: calc(var(--grid-unit) * 2);
  max-width: var(--space-9);
  max-height: var(--space-9);
  min-width: var(--space-7);
  min-height: var(--space-7);
}
.name-area {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.display-area {
  margin-bottom: var(--space-9);
}
.mobile-view .display-area {
  margin-bottom: var(--space-6);
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
