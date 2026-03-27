<script setup></script>

<template>
  <header class="inline-padding">
    <div>
      <h1 class="blind">이송은 프론트엔드 포트폴리오</h1>
      <RouterLink to="/"><img src="/logo-sample.png" alt="logo" /></RouterLink>
    </div>
    <div class="header-text-wrap font-label-small gray-0 text-right">
      <div>LEE SONG EUN</div>
      <div class="gray-subtext">FRONTEND PORTFOLIO</div>
    </div>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  background-color: #000000;
  mix-blend-mode: exclusion;

  height: var(--header-height);
}
a {
  display: block;
  height: fit-content;
}
img {
  height: 48px;
  width: 48px;
}
.header-text-wrap {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
</style>
