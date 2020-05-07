<!--  -->
<template>
  <form>
    <md-input-item
      v-bind="$attrs"
      v-on="$listeners"
      :type="pwdType"
      :title="title"
      is-highlight
      clearable
      :error="errorInfo"
      @focus="$_onPwdFocus"
      :is-title-latent="pwdLatent"
      @blur="$_onPwdBlur"
    >
      <md-icon v-if="pwdIconShow" :name="pwdIcon" slot="right" @click.native="$_onTogglePwdType"></md-icon>
    </md-input-item>
  </form>
</template>

<script>
import { validat6to20pwd } from '@/utils/validate'
export default {
  props: {
    title: {
      type: String,
      default: '密码'
    },
    pwd: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      pwdLatent: false, // 切换密码label的形式
      pwdIconShow: true, // 显示或隐藏密码
      pwdIcon: 'invisible', // 显示或隐藏密码时的icon
      pwdType: 'password', // 显示或隐藏密码时的input框类型
      errorInfo: ''
    }
  },
  methods: {
    $_onPwdFocus(name) { // 密码聚焦
      this.pwdLatent = true
      this.pwdIconShow = false
      this.$emit('pwdFocus', name)
    },
    $_onPwdBlur(name) { // 密码失焦
      this.pwdLatent = false
      this.pwdIconShow = true
      if (!validat6to20pwd(this.pwd)) {
        this.errorInfo = '6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种' 
      } else {
        this.errorInfo = '' 
      }
      this.$emit('pwdBlur', name)
    },
    $_onTogglePwdType() { // 显示隐藏密码
      this.pwdIcon = this.pwdIcon === 'visible' ? 'invisible' : 'visible'
      this.pwdType = this.pwdIcon === 'visible' ? 'type' : 'password'
    }
  }
}
</script>
