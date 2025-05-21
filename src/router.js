import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Articles from './views/Articles.vue'
import calculator from './views/calculator.vue'
import UploadView from './views/UploadView.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/articles', name: 'Articles', component: Articles },
  {
    path: '/chapter/:filename',
    name: 'ChapterReader',
    component: () => import('./views/ChapterReader.vue') // 之後會建立
  },
  {
    path: '/calculator',
    name: 'calculator',
    component: () => import('./views/calculator.vue') 
  },
  {
    path: '/UploadView',
    name: 'UploadView',
    component: () => import('./views/UploadView.vue') 
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router