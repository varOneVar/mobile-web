import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '@/styles/nprogress.css'
import store from './store'
import setting from './setting'
import { Dialog } from 'mand-mobile'
import { isNeedLogin, isHasPermission } from '@/utils/env'

// 路由拦截
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (!store.getters.token) {
    if (isNeedLogin(to.meta.roles)) {
      Dialog.confirm({
        title: '未登录',
        content: '请先登录再操作！',
        confirmText: '前往登录',
        cancelText: '返回首页',
        onCancel: () => next('/redirect'),
        onConfirm: () => next(`/login?redirect=${to.fullPath}`)
      })
      return
    }
    next()
  } else {
    const userRoles = store.getters.roles
    if (isHasPermission(to.meta.roles, userRoles)) {
      next()
    } else {
      next('noAuth')
    }
  }
})

const changeTitle = (title) => (document.title = title)
const mainTitle = setting.title
router.afterEach((to) => {
  NProgress.done()
  const title = to.meta.title ? `${to.meta.title} - ${mainTitle}` : mainTitle
  changeTitle(title)
})
