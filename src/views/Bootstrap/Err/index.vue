<!--  -->
<template>
  <div class="wrapper flex-center">
    <div class="icing">
      <div class="avatar-box">
        <svgIcon class-name="err404" :icon-class="$route.path.slice(1).toLowerCase()" />
      </div>
      <p class="text-center tip">{{ content }}</p>
      <footer class="btn-box">
        <md-button type="primary" size="small" round @click.native="$router.replace('/')">返回首页</md-button>
      </footer>
    </div>
  </div>
</template>

<script>
import svgIcon from '@/components/SvgIcon'
export default {
  created() {
    console.log(this.$route)
    this.buttons = [{
      text: '返回首页',
      type: 'primary',
      handler: () => {
        this.$router.replace('/')
      }
    }]
  },
  computed: {
    content() {
      const path = this.$route.path.toLowerCase()
      const obj = {
        '/404': '您要访问的页面已丢失',
        '/500': '服务器异常',
        '/notauth': '暂无权限访问！'
      }
      return obj[path] || '未知错误'
    }
  },
  components: { svgIcon }
}
</script>
<style lang='stylus' scoped>
.wrapper {
  height: 100%;
  background: #fff;
  overflow: hidden;
  position: relative;
}
.icing {
  margin-top: -100px;
}
.avatar-box {
  font-size: 0px;
  overflow: hidden;
  width: 200px;
  margin: auto;
}
.err404 {
  width: 200px;
  height: auto;
}
.tip {
  margin-top: 1em;
  margin-bottom: 1em;
}
.btn-box {
  max-width: 200px;
  margin: auto;
  margin-top: 50px;
  padding-left: 40px;
  padding-right: 40px;
}
</style>
