import forage from './localforage'
import { typeCheck } from './index'
const { used_account_list } = forage.KEY_NAMES

// 默认头像
export const defualtAvatar = [
  ['body1', 'body2', 'body3', 'body4', 'boy5'],
  ['girl1', 'girl2', 'girl3', 'girl4', 'girl5']
]


/**
 * 曾经使用过的账号
 * item包含: mobile, nickname, avatar
 */
export const usedAccountList = {
  list: [],
  key: used_account_list,
  async get() {
    try {
      const value = await forage.getItem(this.key)
      this.list = value || []
      return this.list
    } catch (error) {
      console.error(error)
      return []
    }
  },
  async set(userinfo) {
    try {
      if (!userinfo || typeCheck(userinfo) !== 'Object') return
      if (!(this.list && this.list.length)) {
        await this.get()
      }
      const idx = this.list.findIndex(v => v.mobile === userinfo.mobile)
      const item = idx > -1 ? this.list[idx] : userinfo
      if (idx > -1) {
        this.list.splice(idx, 1)
      }
      this.list.unshift(item)
      await forage.setItem(this.key, this.list)
    } catch (error) {
      console.error(error)
    }
  },
  async remove(mobile) {
    try {
      if (!mobile || typeCheck(mobile) !== 'String') return
      if (!(this.list && this.list.length)) {
        await this.get()
      }
      const idx = this.list.findIndex(v => v.mobile === mobile)
      this.list.splice(idx, 1)
      await forage.setItem(this.key, this.list)
      return true
    } catch (error) {
      console.error(error)
    }
  },
  async clean() {
    try {
      await forage.removeItem(this.key)
      return true
    } catch (error) {
      console.error(error)
    }
  }
}

