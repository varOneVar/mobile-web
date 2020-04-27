import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import asyncRoutes from './asyncRoutes'

const constantRoutes = [
  // 刷新页面 必须保留
  {
    path: '/refresh',
    name: 'refresh',
    hidden: true,
    component: import('@/views/Bootstrap/Refresh/index.js')
  },
  // 页面重定向 必须保留
  {
    path: '/redirect/:path*',
    name: 'redirect',
    hidden: true,
    component: import('@/views/Bootstrap/Redirect/index.js')
  },
  {
    path: '/login',
    component: () => import('@/views/Portal/Login'),
    meta: {
      title: '用户登录'
    },
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/Portal/Register'),
    meta: {
      title: '用户注册'
    },
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/Bootstrap/Err/404'),
    meta: {
      title: '页面找不到'
    },
    hidden: true
  }
]

const createRouter = () => {
  return new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: [...constantRoutes, ...asyncRoutes]
  })
}

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
