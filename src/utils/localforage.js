import localforage from 'localforage'
import setting from '@/setting'
// Doc https://localforage.docschina.org/
const forage = localforage.createInstance({
	name: `_${setting.name}__indexedDB-superhero`
})

// 统一处理key名，防止命名冲突
// 命名规则 moduleName_keyName
const KEY_NAMES = Object.freeze({
	app_test: 'APP_TEST'
})

Object.defineProperty(forage, 'KEY_NAMES', {
	value: KEY_NAMES
})

export default forage
