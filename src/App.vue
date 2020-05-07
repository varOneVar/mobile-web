<template>
  <div id="app" :class="{offline:!isOnline}">
    <md-notice-bar
      v-if="!isOnline"
      class="offline-tip"
      icon="warn"
      mode="closable"
      type="warning"
    >
      网络连接中断！
    </md-notice-bar>
    <router-view />
    <div v-if="wholePageLoading" class="mask">
      <md-skeleton v-for="item of 6" :key="item" avatar title />
    </div>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import { simulateInterval } from '@/utils'
export default {
  name: 'App',
  methods: {
    ...mapMutations('app', ['SET_WHOLE_PAGE_LOADING', 'SET_CONTENT_LOADING'])
  },
  created() {
    this.SET_CONTENT_LOADING(false)
    this.SET_WHOLE_PAGE_LOADING(false)
    this.$logger.INIT()
    // 可以做一个错误日志上报的， 每两天清理一下logger
    simulateInterval(this.$logger.clean, 2 * 24 * 60 * 60 * 1000, true)
  },
  computed: {
    ...mapGetters(['isOnline', 'wholePageLoading'])
  }
}
</script>

<style lang="stylus" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  height: 100%;
}
.offline {
  box-sizing border-box
  padding-top: 32px;
}
.offline-tip {
  position fixed
  left 0
  right 0
  top 0
}
.mask {
  position fixed
  left 0
  top 0
  bottom 0
  right 0
  background #fff
  z-index 5000
}
</style>
