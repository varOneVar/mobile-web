import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '@/styles/nprogress.css'
import store from './store'
import setting from './setting'

// 路由拦截
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  next()
})

const changeTitle = (title) => (document.title = title)
const mainTitle = setting.title
router.afterEach((to) => {
  NProgress.done()
  const title = to.meta.title ? `${to.meta.title} - ${mainTitle}` : mainTitle
  changeTitle(title)
})
