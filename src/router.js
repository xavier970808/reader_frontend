import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Articles from './views/Articles.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/articles', name: 'Articles', component: Articles },
  {
    path: '/chapter/:filename',
    name: 'ChapterReader',
    component: () => import('./views/ChapterReader.vue') // 之後會建立
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router