import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/testList/:id',
    name: 'TestList',
    component: () => import('@/views/TestList.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('@/views/Detail.vue')
  },
  {
    path: '/result/:id',
    name: 'Result',
    component: () => import('@/views/Result.vue')
  },
  {
    path: '/testResult/:id',
    name: 'TestResult',
    component: () => import('@/views/TestResult.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
