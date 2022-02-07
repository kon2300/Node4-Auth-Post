import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'top',
    component: () => import('@/views/Top.vue'),
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: () => import('@/views/SignIn.vue'),
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: () => import('@/views/SignUp.vue'),
  },
  {
    path: '/everybodys-posts',
    name: 'everybodys-posts',
    component: () => import('@/views/EverybodysPosts.vue'),
  },
  {
    path: '/my-home/:id',
    name: 'my-home',
    component: () => import('@/views/MyHome.vue'),
    meta: { requireAuth: true },
  },
  {
    path: '/post-screen/:id',
    name: 'post-screen',
    component: () => import('@/views/PostScreen.vue'),
    meta: { requireAuth: true },
  },
  {
    path: '/edit-screen/:id',
    name: 'edit-screen',
    component: () => import('@/views/EditScreen.vue'),
    meta: { requireAuth: true },
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'top' },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'has-text-link',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            left: savedPosition.left,
            top: savedPosition.top,
            behavior: 'smooth',
          })
        }, 700)
      })
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            top: 0,
            behavior: 'smooth',
          })
        }, 700)
      })
    }
  },
})

router.beforeEach((to, from, next) => {
  store.commit('SET_ERROR_MESSAGE', null)
  if (to.meta.requireAuth) {
    if (!localStorage.getItem('token')) {
      next({ name: 'top' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
