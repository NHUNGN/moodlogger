import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Main from '../views/Main.vue'
import CalendarView from '../views/CalendarView.vue' 
import { useAuthStore } from '../store/authStore'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: Login },
  { path: '/signup', component: SignUp },
  { path: '/main', component: Main, meta: { requiresAuth: true } },
  { path: '/calendar', component: CalendarView, meta: { requiresAuth: true } } 
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Protect routes that require authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
