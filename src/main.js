import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'

import './icons'
import './plugins/mand-mobile'
import '@/styles/index.styl'
import dayjs from 'dayjs'

// store引用要在routeq=前面，不然会出现间接的循环引用，导致异常
import store from '@/store'
import router from '@/router'
import './permission'
import { deepClone } from '@/utils'
import logger from '@/utils/logs'
import setting from './setting'
import directive from './directive'
Vue.use(directive)

Vue.config.productionTip = false

// Vue.config.errorHandler = function (err, vm, info) {
//   console.log(err, vm, info)
//   // handle error
//   // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
//   // 只在 2.2.0+ 可用
// }

Object.defineProperties(Vue.prototype, {
  $cloneDeep: {
    value: deepClone
  },
  $dayjs: {
    value: dayjs
  },
  $logger: {
    value: logger
  },
  SUCCESS_CODE: {
    value: setting.success_code
  }
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
