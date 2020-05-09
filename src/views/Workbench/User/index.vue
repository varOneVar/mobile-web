<!--  -->
<template>
  <div class="wrapper">
    <div class="field-item top">
      <md-cell-item title="迪迦" brief="152 **** 3344" addon="个人信息" arrow @click="$router.push('/userinfo')">
        <div slot="left" class="avatar-box">
          <svgIcon class-name="avatar" icon-class="boy1" />
        </div>
      </md-cell-item>
    </div>
    <div class="field-item top">
      <md-field-item solid title="账户" arrow @click="$router.push('/account')" />
    </div>
    <md-field class="field-item">
      <md-field-item solid title="标题区域" arrow @click="$router.push('/account')" />
      <md-field-item solid title="标题区域" arrow @click="$router.push('/account')" />
      <md-field-item solid title="设置" arrow @click="$router.push('/settings')" />
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
