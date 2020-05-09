<!--  -->
<template>
  <form>
    <md-input-item
      v-bind="$attrs"
      :type="pwdType"
      :title="title"
      is-highlight
      clearable
      maxlength="20"
      :error="errorInfo"
      :is-title-latent="pwdLatent"
      v-on="$listeners"
      @focus="$_onPwdFocus"
      @blur="$_onPwdBlur"
    >
      <md-icon v-if="pwdIconShow" slot="right" :name="pwdIcon" @click.native="$_onTogglePwdType" />
    </md-input-item>
  </form>
</template>

<script>
import { validat6to20pwd } from '@/utils/validate'
export default {
  name: 'InputPwd',
  props: {
    title: {
      type: String,
      default: '密码'
    },
    pwd: {
      type: String,
      default: ''
    },
    checkPwd: {
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
      this.validate()
      this.$emit('pwdBlur', name)
    },
    $_onTogglePwdType() { // 显示隐藏密码
      this.pwdIcon = this.pwdIcon === 'visible' ? 'invisible' : 'visible'
      this.pwdType = this.pwdIcon === 'visible' ? 'type' : 'password'
    },
    validate() {
      if (!validat6to20pwd(this.pwd)) {
        this.errorInfo = '6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种'
        return false
      } else if (this.checkPwd && this.pwd !== this.checkPwd) {
        this.errorInfo = '两次密码不一致'
        return false
      } else {
        this.errorInfo = ''
        return true
      }
    }
  }
}
</script>
