<template>
  <div class="layout">
    <div v-if="contentLoading" class="mask">
      <md-skeleton v-for="item of 6" :key="item" avatar title />
    </div>
    <router-view />
    <navBar />
  </div>
</template>

<script>
import navBar from './modules/navBar'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      loading: true
    }
  },
  created() {
    setTimeout(() => {
      this.loading = false
    }, 2000)
  },
  computed: {
    ...mapGetters(['contentLoading'])
  },
  components: { navBar }
}
</script>
<style lang='stylus' scoped>
.layout {
  min-height 100%
  padding-bottom 50px
  box-sizing border-box
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
