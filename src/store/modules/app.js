const state = {
  isOnline: true, // 是否在线
  contentLoading: false, // 内容区域loading
  wholePageLoading: false // 整个页面loading
}

const mutations = {
  CHANGE_ONLINE(state, bool) {
    state.isOnline = bool
  },
  SET_CONTENT_LOADING(state, bool) {
    state.contentLoading = bool
  },
  SET_WHOLE_PAGE_LOADING(state, bool) {
    state.wholePageLoading = bool
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
