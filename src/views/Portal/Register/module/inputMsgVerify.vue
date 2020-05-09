<template>
  <div class="img-verify">
    <md-input-item
      v-bind="$attrs"
      v-on="$listeners"
      :title="title"
      is-highlight
      clearable
      type="digit"
      maxlength="6"
      :error="errorInfo"
      @focus="$_onPwdFocus"
      :is-title-latent="pwdLatent"
      @blur="$_onPwdBlur"
    >
      <md-button
        :inactive="disabled || disabled_$"
        type="primary"
        size="small"
        slot="right"
        @click.native="sendVerifyCode"
        inline>{{ tips }}</md-button>
    </md-input-item>
  </div>
</template>

<script>
import { simulateInterval } from '@/utils'
export default {
  name: 'inputMsgVerify',
  props: {
     title: {
      type: String,
      default: '手机验证'
    },
    verify: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pwdLatent: false, // 切换密码label的形式
      errorInfo: '',
      disabled_$: false,
      tips: '发送验证码'
    }
  },
  methods: {
    $_onPwdFocus(name) { // 密码聚焦
      this.pwdLatent = true
      this.$emit('pwdFocus', name)
    },
    $_onPwdBlur(name) { // 密码失焦
      this.pwdLatent = false
      this.validate()
      this.$emit('pwdBlur', name)
    },
    validate() {
      if (this.verify.length !== 6) {
        this.errorInfo = '手机验证码不正确'
        return false
      } else {
        this.errorInfo = ''
        return true
      }
    },
    sendVerifyCode() {
      if (this.disabled_$) return
      this.disabled_$ = true
      let count = 60
      clearTimeout(this.timer)
      this.timer = simulateInterval(() => {
        count--
        this.tips = `${count}秒后重发`
        if (count <= 0) {
          this.tips = '发送验证码'
          this.disabled_$ = false
          clearTimeout(this.timer)
          return true
        }
      }, 1000)
      // this.$emit('sendVerifyCode')
    }
  },
}
</script>
<style lang="stylus" scoped>
.img-verify canvas {
  cursor: pointer;
}
.canvas {
  margin-left: 6px;
}
</style>