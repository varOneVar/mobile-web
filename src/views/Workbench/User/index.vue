<!--  -->
<template>
  <div class="wrapper">
    <div class="field-item top">
      <md-cell-item title="迪迦" brief="152 **** 3344" @click="$router.push('/userinfo')" addon="个人信息" arrow>
        <div class="avatar-box" slot="left">
          <svgIcon class-name="avatar" iconClass="boy1"  />
        </div>
      </md-cell-item>
    </div>
    <div class="field-item top">
      <md-field-item solid title="账户" @click="$router.push('/account')" arrow  />
    </div>
    <md-field class="field-item">
      <md-field-item solid title="标题区域"  @click="$router.push('/account')" arrow  />
      <md-field-item solid title="标题区域"  @click="$router.push('/account')" arrow  />
      <md-field-item solid title="设置"  @click="$router.push('/settings')" arrow  />
    </md-field>
  </div>
</template>

<script>
import svgIcon from '@/components/SvgIcon'
export default {
  data() {
    return {

    }
  },
  methods: {
    xx(e) {
      console.log(e)
    }
  },
  created() {

  },
  components: { svgIcon }
}
</script>
<style lang='stylus' scoped>
.wrapper {
  position: relative;
  overflow: hidden;
}
.top {
  padding: 0 .4rem;
  background: #fff;
}
.avatar-box {
  font-size: 0px;
  width: 48px
  height: @width;
  border-radius: 50%;
  overflow: hidden;
}
.avatar {
  width: 48px
  height: @width;
}
.field-item {
  margin-bottom: 10px;
}
</style>
