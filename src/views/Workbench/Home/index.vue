<!--  -->
<template>
  <div>主页
    <p v-permission="['admin']">测试permission</p>
  </div>
</template>

<script>
export default {
data() {
  return {

  }
},
  created() {
    console.log(123)
  }
}
</script>
<style lang='stylus' scoped>

</style>
