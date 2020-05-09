<!--  -->
<template>
  <div class="xxx" @click.stop>
    <md-input-item
      ref="mobile"
      v-bind="$attrs"
      name="mobile"
      type="phone"
      title="手机号码"
      :error="phoneError"
      is-highlight
      :is-title-latent="phoneLatent"
      clearable
      v-on="$listeners"
      @focus="$_onPhoneFocus"
      @blur="$_onPhoneBlur"
      @change="$_onPhoneChange"
    />
    <transition name="fade" mode="out-in" appear>
      <div
        v-if="allOpenPhoneListShow && phoneListShow && showAccountList && showAccountList.length"
        class="phone-list"
        :style="{height: `${phoneListHeight}px`}"
      >
        <md-scroll-view
          ref="scrollView"
        >
          <div
            v-for="i in showAccountList"
            :key="i.mobile"
            class="scroll-view-item"
            @click="$_onItemClick(i)"
          >
            {{ i.mobile }}
            <md-icon class="scroll-view-item-clear" name="close" @click.stop="$_onClearItem(i)" />
          </div>
        </md-scroll-view>
        <div class="phone-list-clear flex flex-sb-center">
          <span @click="$_onCleanAllPhoneList">清除所有记录</span>
          <span @click="$_onClosePhoneList">关闭账号提示</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { usedAccountList } from '@/utils/chore'
export default {
  name: 'InputAccount',
  props: {
    mobile: {
      type: String,
      default: ''
    },
    openAccountList: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      phoneListHeight: 250, // 账号列表高度
      accountList: [], // 缓存的账号列表
      showAccountList: [], // 展示的账号列表，会根据输入的手机号筛选
      phoneLatent: false, // 切换手机号label的形式
      allOpenPhoneListShow: true, // 当前周期是否打开账号列表提示
      phoneError: '', // 手机号不正确时提示错误
      phoneListShow: false // 是否显示账号列表
    }
  },
  methods: {
   $_onPhoneFocus(name) { // 账号输入框聚焦
      this.phoneLatent = true
      this.$_calcHeight()
      this.phoneListShow = true
      this.$emit('phoneFocus', name)
    },
    $_onPhoneBlur() { // 账号输入框失焦
      this.phoneLatent = false
      const item = this.accountList.find(v => v.mobile === this.mobile)
      this.validate()
      this.$emit('phoneBlur', item)
    },
    $_onItemClick({ mobile }) { // 账号列表点击item
      this.phoneListShow = false
      this.$emit('accountItemClick', mobile)
    },
    async $_onClearItem({ mobile }) { // 删除账号列表的其中一个
      this.ing = false
      if (this.ing) return
      this.ing = true
      const isOk = await usedAccountList.remove(mobile)
      if (isOk) {
        await this.getAccountList()
        this.$_calcHeight()
        if (this.showAccountList.length) {
          this.$refs.scrollView.reflowScroller()
        } else {
          this.phoneListShow = false
        }
      }
      this.ing = false
    },
    async $_onCleanAllPhoneList() { // 清除所有账号
      const isOk = await usedAccountList.clean()
       if (isOk) {
        this.accountList = []
        this.showAccountList = []
        this.phoneListShow = false
      }
    },
    $_onClosePhoneList() { // 当前页面周期关闭账号列表
      this.allOpenPhoneListShow = false
    },
    async getAccountList() { // 获取账号列表数据
      try {
        const result = await usedAccountList.get()
        this.accountList = result
        if (this.mobile) {
          this.showAccountList = this.showAccountList.filter(v => v.mobile.startsWith(this.mobile))
        } else {
          this.showAccountList = this.$cloneDeep(result)
        }
        this.$_calcHeight()
      } catch (err) {
        this.$logger.page.error({
          message: 'fail: usedAccountList.get()',
          path: '(views/Portal/Login/index)=>(getAccountList)'
        })
      }
    },
    $_onPhoneChange(name, value) { // input值修改监听
      if (this.allOpenPhoneListShow) {
        if (value) {
          this.showAccountList = this.accountList.filter(v => v.mobile.startsWith(value))
          this.$_calcHeight()
          this.phoneListShow = true
        } else {
          this.iconClass = 'defaultAvatar'
          this.nickname = ''
          this.showAccountList = this.$cloneDeep(this.accountList)
          this.phoneListShow = false
        }
      }
    },
    $_calcHeight() { // 计算账号列表高度
      this.phoneListHeight = this.showAccountList.length * 49
    },
    validate() {
      if (this.mobile.length !== 11) {
        this.phoneError = '手机号必须11位'
        return false
      } else {
        this.phoneError = ''
        return true
      }
    },
    close() {
      this.phoneListShow = false
    }
  },
  created() {
    // usedAccountList.set({
    //   mobile: '1384566555',
    //   avatar: 'boy2',
    //   nickname: '泰罗'
    // })
    // usedAccountList.set({
    //   mobile: '13975664444',
    //   avatar: 'boy1',
    //   nickname: '艾斯'
    // })
    // usedAccountList.set({
    //   mobile: '13845664444',
    //   avatar: 'boy1',
    //   nickname: '迪迦'
    // })
    this.allOpenPhoneListShow = this.openAccountList
    this.getAccountList()
  }
}
</script>
<style lang='stylus' scoped>
.xxx {
  position: relative;
}
.phone-list {
  padding-bottom: 36px;
  position: absolute;
  left: 0;
  right: 0;
  top: 64px;
  z-index: 20;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  &-clear {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: 36px;
    padding: 0 16px;
    font-size: 14px;
    color: #999;
  }
}
.scroll-view-item {
  position: relative;
  padding: 16px;
  font-size: 14px;
  border-bottom: 1px solid #efefef;
  &-clear {
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    color: #999;
    line-height: 49px;
  }
}
</style>
