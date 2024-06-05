// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CryptoDetail from '../views/CryptoDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/crypto/:id', name: 'CryptoDetail', component: CryptoDetail, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
