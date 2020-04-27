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

import forage from '@/utils/localforage'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
    }
  },
  created() {
    console.log(forage.KEY_NAMES)
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
