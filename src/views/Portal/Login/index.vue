<!--  -->
<template>
  <div class="login" @click="$refs.mobile && $refs.mobile.close()">
    <div class="topper text-center">
      <div class="avatar-box" :class="{'avatar-action':isLogin}">
        <svgIcon class-name="avatar" :iconClass="iconClass"  />
      </div>
      <p class="nickname">{{ nickname || '测试' }}</p>
    </div>
     <section class="section">
      <md-field>
        <inputAccount
          ref="mobile"
          v-model="form.mobile"
          :mobile="form.mobile"
          @accountItemClick="$_onItemClick"
          @phoneBlur="$_onPhoneBlur"
        />
        <inputPwd ref="pwd" name="Password" v-model="form.pwd" :pwd="form.pwd" />
      </md-field>
      <div class="changepwd flex"> 
        <md-icon name="question" @click="goWhere('/changepwd')"></md-icon>
        <span class="changepwd-span" @click="goWhere('/changepwd')">忘记密码</span>
      </div>
    </section>
    <footer class="btn-box">
       <md-button type="primary" @click.native="loginIn" round>登录</md-button>
       <p class="btn-box-p" @click="goWhere('/register')">尚未注册？前往注册</p>
    </footer>
    <p class="tail">POWER BY Android</p>
  </div>
</template>

<script>
import svgIcon from '@/components/SvgIcon'
import inputPwd from './module/inputPwd'
import inputAccount from './module/inputAccount'
import { mapActions } from 'vuex'
import { validat6to20pwd } from '@/utils/validate'
export default {
  data() {
    return {
      iconClass: 'defaultAvatar', // 默认头像
      nickname: '', // 昵称
      isLogin: false, // 登录时候设置true可以使头像出现光圈涟漪效果
      form: { // 表单数据
        mobile: '',
        pwd: '',
      }
    }
  },
  methods: {
    $_onPhoneBlur(item) { // 账号输入框失焦
      if (item) {
        this.iconClass = item.avatar
        this.nickname =  item.nickname
      } else {
        this.iconClass = 'defaultAvatar'
        this.nickname =  ''
      }
    },
    $_onItemClick(mobile) { // 账号列表点击item
      this.form.mobile = mobile
    },
    goWhere(path) { // 前往其他页面
      this.$router.replace(path)
    },
    loginIn() { // 登录函数
      const { mobile, pwd } = this.form
      for (const key in this.form) {
        if (!this.$refs[key].validate()) return
      }
      console.log(mobile, pwd)
    }
  },
  components: { svgIcon, inputPwd, inputAccount }
}
</script>
<style lang='stylus' scoped>
.login {
  height: 100%;
  background: #fff;
  overflow: hidden;
  position: relative;
}
.topper {
  margin-top: 40px;
}
.avatar-box {
  font-size: 0px;
  width: 60px
  height: @width;
  border-radius: 50%;
  overflow: hidden;
  margin: auto;
  box-shadow: 0 10px 30px #ccc;
}
.avatar {
  width: 60px
  height: @width;
}
.nickname {
  color: #666;
  margin-top: 20px;
}

.section {
  padding: 16px;
}

.changepwd {
  font-size: 14px;
  color: #2f86f6;
  justify-content: flex-end;
  &-span {
    margin-left: 4px;
  }
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

.avatar-action {
  animation: ani 2s linear infinite;
}
@keyframes ani {
   0%{
        box-shadow: 0 0 0px #2f86f6
   }
   25%{
        box-shadow: 0 0 10px #2f86f6
   }
    50%{
        box-shadow: 0 0 20px #2f86f6
   }
   75%{
        box-shadow: 0 0 10px #2f86f6
   }
   100%{
    box-shadow: 0 0 0px #2f86f6
   }
}
</style>
