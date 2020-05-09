import { POST_APIlogin, POST_APIregister, POST_APIlogout } from '@/api/user'
import logger from '@/utils/logs'
import setting from '@/setting'
import { goLoginPortal } from '@/utils/env'
import { usedAccountList } from '@/utils/chore'
import { encryptReal } from '@/utils/crypto'

const state = {
  token: '',
  userInfo: null,
  authRoutes: [],
  username: '',
  avatar: '',
  mobile: '',
  roles: []
}

const mutations = {
  CHANGE_TOKEN(state, str = '') {
    state.token = str
  },
  CHANGE_USERNAME(state, str = '') {
    state.username = str
  },
  CHANGE_AVATAR(state, str = '') {
    state.avatar = str
  },
  CHANGE_USERINFO(state, obj = null) {
    state.userInfo = obj
  },
  CHANGE_AUTHROUTES(state, arr = []) {
    state.authRoutes = arr
  },
  CHANGE_ROLES(state, arr = []) {
    state.roles = arr
  },
  CHANGE_MOBILE(state, str = '') {
    state.mobile = str
  },
  RESET_STATE(state) {
    state.token = ''
    state.userInfo = null
    state.authRoutes = []
    state.username = ''
    state.avatar = ''
    state.roles = []
    state.mobile = ''
  }
}

const actions = {
  async $_performLogin({ commit }, {
    mobile, pwd
  }) {
    try {
      const { data: { code, data, message } } = await POST_APIlogin({
        mobile,
        pwd: encryptReal(pwd)
      })
      if (code === setting.success_code) {
        commit('CHANGE_TOKEN', data.token)
        commit('CHANGE_USERNAME', data.nickname)
        commit('CHANGE_ROLES', data.roles)
        commit('CHANGE_MOBILE', data.mobile)
        commit('CHANGE_AVATAR', data.avatar)
        commit('CHANGE_USERINFO', data)
        usedAccountList.set({
          mobile: data.mobile,
          avatar: data.avatar,
          nickname: data.nickname
        })
        return true
      }
      logger.app.error({
        message,
        path: '(store/modules/user)=>($_performLogin)',
        des: '登录失败'
      })
      return false
    } catch (error) {
      console.error(error)
    }
  },
  async $_perforRegister({ commit }, {
    mobile,
    pwd,
    verificationCode
  }) {
    try {
      const { data: { code, data, message } } = await POST_APIregister({
        mobile,
        pwd: encryptReal(pwd),
        verificationCode
      })
      if (code === setting.success_code) {
        commit('CHANGE_TOKEN', data.token)
        commit('CHANGE_USERNAME', data.nickname)
        commit('CHANGE_ROLES', data.roles)
        commit('CHANGE_MOBILE', data.mobile)
        commit('CHANGE_AVATAR', data.avatar)
        commit('CHANGE_USERINFO', data)

        usedAccountList.set({
          mobile: data.mobile,
          avatar: data.avatar,
          nickname: data.nickname
        })
        return true
      }
      logger.app.error({
        message,
        path: '(store/modules/user)=>($_perforRegister)',
        des: '注册失败'
      })
      return false
    } catch (error) {
      console.error(error)
    }
  },
  async $_perforLogout({ commit }) {
    try {
      const { data: { code, message } } = await POST_APIlogout()
      if (code === setting.success_code) {
        commit('RESET_STATE')
        commit('log/CLEAN_lOGGER_ALL')
        logger.clean()
        goLoginPortal()
      } else {
        logger.app.error({
          message,
          path: '(store/modules/user)=>($_perforLogout)',
          des: '退出失败'
        })
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
