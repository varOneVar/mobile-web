<!--  -->
<template>
  <div class="register">
    <md-field>
      <inputAccount
        ref="mobile"
        v-model="form.mobile"
        :mobile="form.mobile"
        :open-account-list="false"
      />
      <inputVerify ref="verify" v-model="form.verify" :verify="form.verify" />
      <inputMsgVerify ref="verifyCode" v-model="form.verifyCode" :verify="form.verifyCode" :disabled="codeDisabled" @sendVerifyCode="sendVerifyCode" />
      <inputPwd ref="pwd" v-model="form.pwd" title="新密码" name="Password" :pwd="form.pwd" />
      <inputPwd ref="pwdAgain" v-model="form.pwdAgain" title="确认密码" name="Password" :pwd="form.pwdAgain" :check-pwd="form.pwd" />
    </md-field>
    <footer class="btn-box">
      <md-button type="primary" round @click.native="register">重置密码</md-button>
      <p class="btn-box-p" @click="goWhere('/login')">记起密码？前往登录</p>
    </footer>
    <p class="tail">POWER BY Android</p>
  </div>
</template>

<script>
import inputPwd from '../Login/module/inputPwd'
import inputAccount from '../Login/module/inputAccount'
import inputVerify from '../Register/module/inputVerify'
import inputMsgVerify from '../Register/module/inputMsgVerify'
import { POST_APIsendVerifyCode } from '@/api/user'

export default {
  data() {
    return {
      form: {
        mobile: '',
        pwd: '',
        pwdAgain: '',
        verify: '',
        verifyCode: ''
      },
      verifyIsOk: false
    }
  },
  methods: {
    async sendVerifyCode() {
      try {
        const res = await POST_APIsendVerifyCode({
          mobile: this.form.mobile
        })
        console.log(res)
      } catch (err) {
        console.error(err)
        this.$logger.page.error({
          message: 'fail: 发送验证码错误',
          path: '(Portal/Register/index)=>(sendVerifyCode)'
        })
      }
    },
    register() {
      const { mobile, pwd, verify, verifyCode, pwdAgain } = this.form
      for (const key in this.form) {
        if (!this.$refs[key].validate()) return
      }
      console.log(mobile, pwd, verify, verifyCode, pwdAgain)
    },
    goWhere(path) { // 前往其他页面
      this.$router.replace(path)
    }
  },
  computed: {
    codeDisabled() {
      return this.form.mobile.length !== 11 || this.form.verify.length !== 4 || !this.verifyIsOk
    }
  },
  watch: {
    'form.verify'(v) {
      if (v && v.length === 4) {
        // 需要放定时器里，因为子组件才接受到3个字符的时候，这边到了4个字符
        this.$nextTick(() => {
          this.verifyIsOk = this.$refs.verify.validate()
        })
      }
    }
  },
  components: { inputPwd, inputAccount, inputVerify, inputMsgVerify }
}
</script>
<style lang='stylus' scoped>
.register {
  height: 100%;
  background: #fff;
  overflow: hidden;
  position: relative;
}
.btn-box {
  margin-top: 50px;
  padding-left: 40px;
  padding-right: 40px;
  &-p {
    margin-top: 16px;
    font-size: 14px;
    text-align: center;
    color: #2f86f6;
  }
}
.tail {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
  font-size: 12px;
  color: #999;
  text-align: center;
}
</style>
