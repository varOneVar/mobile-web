import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
import setting from '@/setting'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)
// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters,
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => deserialize(sessionStorage.getItem(key)),
        // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
        setItem: (key, value) =>
          sessionStorage.setItem(key, serialize(value)),
        removeItem: key => sessionStorage.removeItem(key)
      },
      key: `_${setting.name}__store-key`
    })
  ]
})

function serialize(val) {
  return JSON.stringify(val)
}

function deserialize(val) {
  if (typeof val !== 'string') {
    return undefined
  }
  try {
    return JSON.parse(val)
  } catch (e) {
    return val || undefined
  }
}

export default store
