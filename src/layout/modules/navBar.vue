<!--  -->
<template>
  <div class="navbar">
    <md-tab-bar
      ref="tabbar"
      v-model="current"
      :items="navBarRoutes"
      :has-ink="false"
    >
      <template slot="item" slot-scope="{ item: { name, meta } }">
        <div class="custom-item" @click="routerGo(name)">
          <div class="icon">
            <md-icon :name="meta.icon" size="lg" />
          </div>
          <div class="text">
            {{ meta.title }}
          </div>
        </div>
      </template>
    </md-tab-bar>
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
  border-top 1px solid #ebebeb
  >>> .md-tab-bar {
    padding-left 0.3rem
    padding-right 0.3rem
  }
}
.custom-item {
  text-align center
}
.text {
  font-size 14px
}
</style>
