import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'

// import './icons'
import './plugins/mand-mobile'
import '@/styles/index.styl'

// store引用要在routeq=前面，不然会出现间接的循环引用，导致异常
import store from '@/store'
import router from '@/router'
import './permission'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
