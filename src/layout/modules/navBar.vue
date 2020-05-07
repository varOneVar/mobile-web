<!--  -->
<template>
  <div class="navbar flex-sa-center">
    <div
      v-for="item of navBarRoutes"
      :key="item.name"
      class="custom-item"
      :class="{'is-active':current===item.name}"
      @click="routerGo(item.name)"
    >
      <div class="icon">
        <md-icon :name="item.meta.icon" size="lg" />
      </div>
      <div class="text">
        {{ item.meta.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { navBarRoutes } from '@/router/asyncRoutes'
export default {
  data() {
    return {
      navBarRoutes,
      current: navBarRoutes[0].name
    }
  },
  methods: {
    routerGo(name) {
      if (this.current !== name) {
        this.$router.replace({ name })
      }
      this.current = name
    }
  },
  created() {
    if (this.$route.meta && this.$route.meta.activeMenu) {
      this.current = this.$route.meta.activeMenu
    }
  }
}
</script>
<style lang='stylus' scoped>
.navbar {
  background #fff
  position fixed
  left 0
  right 0
  bottom 0
  height 50px
  border-top 1px solid #ebebeb
}
.custom-item {
  text-align center
}
.is-active {
  color #2f86f6
}
.text {
  font-size 14px
}
</style>
