<!--  -->
<template>
  <div>{{ NUM }}Home页{{ env }}
    <p v-permission="['admin']">测试permission</p>
  </div>
</template>

<script>
export default {
data() {
  return {
    env: process.env.NODE_ENV,
    NUM: process.env.VUE_APP_NUMBER
  }
},
  created() {
    console.log('this.env', this.env, 123, ' this.NUM', this.NUM)
  }
}
</script>
<style lang='stylus' scoped>

</style>
