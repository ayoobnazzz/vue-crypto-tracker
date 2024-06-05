import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CryptoDetail from '../views/CryptoDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/crypto/:id', name: 'CryptoDetail', component: CryptoDetail },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
