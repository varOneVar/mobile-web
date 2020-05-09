import store from '@/store'
import forage from '@/utils/localforage'
import { v4 as uuidv4 } from 'uuid'
const { logger_app_warn,
  logger_app_error,
  logger_page_warn,
  logger_page_error } = forage.KEY_NAMES

/**
 * 接受一个对象，包含两个字段
 * @param {str|obj} message error或warn信息
 * @param {str} path 来源路径，什么页面，什么函数或组件，多少行
 * (store/modules/user)=>($_perforLogout)  (文件所在地址)=>(函数名)
 */
const disposeMessObj = ({ message, path } = {}) => {
  if (!message || !path) throw Error('logger数据必须包含message, path字段')
  return {
    message, path,
    id: uuidv4(),
    time: Date.now()
  }
}

// 添加app错误日志
const appErrorLogger = async (obj) => {
  const OBJ = disposeMessObj(obj)
  const re = { ...OBJ, level: 'APP', type: 'ERROR' }
  try {
    const app = await forage.getItem(logger_app_error)
    await forage.setItem(logger_app_error, [...(app || []), re])
    store.commit('log/CHANGE_APP_ERROR', re)
  } catch (error) {
    console.error(error, 'appErrorLogger')
  }
}

// 添加app 警告日志
const appWarnLogger = async (obj) => {
  const OBJ = disposeMessObj(obj)
  const re = { ...OBJ, level: 'APP', type: 'WARN' }
  try {
    const app = await forage.getItem(logger_app_warn)
    await forage.setItem(logger_app_warn, [...(app || []), re])
    store.commit('log/CHANGE_APP_WARN', re)
  } catch (error) {
    console.error(error, 'appWarnLogger')
  }
}

// 清除app日志
const appLoggerClean = async () => {
  try {
    await Promise.all([forage.removeItem(logger_app_error), forage.removeItem(logger_app_warn)])
    store.commit('log/CLEAR_LOOGER_APP')
  } catch (error) {
    console.error(error, 'appLoggerClean')
  }
}

// 添加page错误日志
const pageErrorLogger = async (obj) => {
  const OBJ = disposeMessObj(obj)
  const re = { ...OBJ, level: 'PAGE', type: 'ERROR' }
  try {
    const app = await forage.getItem(logger_page_error)
    await forage.setItem(logger_page_error, [...(app || []), re])
    store.commit('log/CHANGE_PAGE_ERROR', re)
  } catch (error) {
    console.error(error, 'pageErrorLogger')
  }
}

// 添加page警告日志
const pageWarnLogger = async (obj) => {
  const OBJ = disposeMessObj(obj)
  const re = { ...OBJ, level: 'PAGE', type: 'WARN' }
  try {
    const app = await forage.getItem(logger_page_warn)
    await forage.setItem(logger_page_warn, [...(app || []), re])
    store.commit('log/CHANGE_PAGE_WARN', re)
  } catch (error) {
    console.error(error, 'pageWarnLogger')
  }
}

// 清空page日志
const pageLoggerClean = async () => {
  try {
    await Promise.all([forage.removeItem(logger_page_error), forage.removeItem(logger_page_warn)])
    store.commit('log/CLEAR_LOOGER_PAGE')
  } catch (error) {
    console.error(error, 'pageLoggerClean')
  }
}
// 从日志列表删除某条，其他位置调用不考虑
const loggerRemoveOne = async ({ level, type, id }) => {
  try {
    let str
    if (level === 'APP') {
      str = type === 'ERROR' ? logger_app_error : logger_app_warn
    } else {
      str = type === 'ERROR' ? logger_page_error : logger_page_warn
    }
    const app = await forage.getItem(str)
    const index = app.findIndex(v => v.id === id)
    app.splice(index, 1)
    await forage.setItem(str, app)
    store.commit('log/CLEAR_LOOGER_ONE', level, type, id, app)
  } catch (error) {
    console.error(error, 'loggerRemoveOne')
  }
}
// 清除所有logger
const loggerCleanAll = async () => {
  try {
    await Promise.all([
      forage.removeItem(logger_app_error),
      forage.removeItem(logger_app_warn),
      forage.removeItem(logger_page_error),
      forage.removeItem(logger_page_warn)
    ])
    store.commit('log/CLEAN_lOGGER_ALL')
  } catch (error) {
    console.error(error, 'pageLoggerClean')
  }
}

const $_initLoger = async () => {
  try {
    const [app_err, app_warn, page_err, page_warn] = await Promise.all([
      forage.getItem(logger_app_error),
      forage.getItem(logger_app_warn),
      forage.getItem(logger_page_error),
      forage.getItem(logger_page_warn)
    ])
    store.commit('log/INIT_lOGGER_ALL', { app_err, app_warn, page_warn, page_err })
  } catch (error) {
    console.error(error, 'pageLoggerClean')
  }
}
export default {
  INIT: $_initLoger,
  remove: loggerRemoveOne,
  clean: loggerCleanAll,
  app: {
    error: appErrorLogger,
    warn: appWarnLogger,
    clean: appLoggerClean
  },
  page: {
    error: pageErrorLogger,
    warn: pageWarnLogger,
    clean: pageLoggerClean
  }
}
