const state = {
  logger_app_error: [],
  logger_app_warn: [],
  logger_page_warn: [],
  logger_page_error: []
}

const mutations = {
  CHANGE_APP_ERROR(state, obj) {
    state.logger_app_error.push(obj)
  },
  CHANGE_APP_WARN(state, obj) {
    state.logger_app_warn.push(obj)
  },
  CHANGE_PAGE_ERROR(state, obj) {
    state.logger_page_error.push(obj)
  },
  CHANGE_PAGE_WARN(state, obj) {
    state.logger_page_warn.push(obj)
  },
  CLEAR_LOOGER_APP() {
    state.logger_app_error = []
    state.logger_app_warn = []
  },
  CLEAR_LOOGER_PAGE() {
    state.logger_page_error = []
    state.logger_page_warn = []
  },
  CLEAR_LOOGER_ONE(level, type, id, result = undefined) {
    if (result && Array.isArray(result)) {
      state[`logger_${level}_${type}`] = result
    } else {
      const index = state[`logger_${level}_${type}`].findIndex(v => v.id === id)
      state[`logger_${level}_${type}`].splice(index, 1)
    }
  },
  INIT_lOGGER_ALL(state, { app_err, app_warn, page_warn, page_err }) {
    state.logger_app_error = app_err || []
    state.logger_app_warn = app_warn || []
    state.logger_page_warn = page_warn || []
    state.logger_page_error = page_err || []
  },
  CLEAN_lOGGER_ALL(state) {
    state.logger_app_error = []
    state.logger_app_warn = []
    state.logger_page_warn = []
    state.logger_page_error = []
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
