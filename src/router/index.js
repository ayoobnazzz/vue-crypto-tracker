import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import CryptoDetail from '../views/CryptoDetail.vue';
import CryptoPrices from '../components/CryptoPrices.vue';
import Login from '../components/Login.vue';
import SignUp from '../components/SignUp.vue';
import useAuth from '../store/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/crypto',
    name: 'Crypto',
    component: CryptoPrices
  },
  {
    path: '/crypto/:id',
    name: 'CryptoDetail',
    component: CryptoDetail,
    props: true,
    // meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// router.beforeEach((to, from, next) => {
//   const { user } = useAuth();

//   if (to.matched.some(record => record.meta.requiresAuth) && !user.value) {
//     next({ name: 'Login' });
//   } else {
//     next();
//   }
// });

export default router;
