import localforage from 'localforage'
import setting from '@/setting'
// Doc https://localforage.docschina.org/
const forage = localforage.createInstance({
	name: `_${setting.name}__indexedDB-superhero`
})

// 统一处理key名，防止命名冲突
// 命名规则 moduleName_keyName
const KEY_NAMES = Object.freeze({
	logger_app_warn: 'LOGGER_APP_WARN',
	logger_app_error: 'LOGGER_APP_ERROR',
	logger_page_warn: 'LOGGER_PAGE_WARN',
	logger_page_error: 'LOGGER_PAGE_ERROR',
	used_account_list: 'USED_ACCOUNT_LIST' // 使用过账号列表
})

Object.defineProperty(forage, 'KEY_NAMES', {
	value: KEY_NAMES
})

export default forage
