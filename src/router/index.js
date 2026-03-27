import MainPage from '@/views/mainPage/MainPage.vue'
import ProjectDetailPage from '@/views/projectDetailPage/ProjectDetailPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage,
    },
    {
      path: '/project-detail/:routeId',
      name: 'project-detail',
      component: ProjectDetailPage,
    },
    {
      path: '/about-me',
      name: 'about-me',
      component: MainPage,
    },
  ],
})

export default router
