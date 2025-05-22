import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Articles from './views/Articles.vue'
import calculator from './views/calculator.vue'
import UploadView from './views/UploadView.vue'
import BookReader from './views/BookReader.vue';
import ChapterReader from './views/ChapterReader.vue'
import FolderView from '@/views/FolderView.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/articles', name: 'Articles', component: Articles },
  { path: '/articles', component: Articles },
  {
    path: '/chapter/:filename',
    name: 'ChapterReader',
    component: ChapterReader,
    props: true
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
  {
    path: '/folder/:folderName',
    name: 'FolderView',
    component: FolderView,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router