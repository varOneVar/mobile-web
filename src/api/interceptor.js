import axios from 'axios'
import { Toast } from 'mand-mobile'
import CancelRepeatRequest from './cancelRepeatRequest'
import isOnline from 'is-online'
import store from '@/store'

const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 60000
})
function getParams(config) {
	const obj = {
		post: 'data',
		get: 'params'
	}
	const key = obj[config.method]
	return config[key]
}

// 取消重复请求
const cancelRequest = new CancelRepeatRequest()

service.interceptors.request.use(
	(config) => {
		const params = getParams(config)
		// 取消重复请求
		if (params.noCancel) {
			delete params.noCancel
		} else {
			cancelRequest.remove(config, params)
			cancelRequest.add(config, params)
		}

		// 加载全局loading
		if (params.noLoading) {
			store.commit('app/SET_CONTENT_LOADING', false)
			store.commit('app/SET_WHOLE_PAGE_LOADING', false)
			delete params.noLoading
		} else if (params.wholePageLoading) {
			store.commit('app/SET_WHOLE_PAGE_LOADING', true)
			delete params.wholePageLoading
		} else {
			store.commit('app/SET_CONTENT_LOADING', true)
		}

		return config
	},
	async (error) => {
		const online = await isOnline()
		if (online) {
			Toast.failed({
				content: `请求异常${error.message}`,
				duration: 3 * 1000
			})
		} else {
			// 网路连接中断
			store.commit('app/CHANGE_ONLINE', online)
		}
		return Promise.reject(error)
	}
)

// 响应拦截器
// const errorWhiteList = []
service.interceptors.response.use(
	(response) => {
		// 取消重复请求
		cancelRequest.remove(response.config)
		// 取消加载动画
		store.commit('app/SET_CONTENT_LOADING', false)
		store.commit('app/SET_WHOLE_PAGE_LOADING', false)
		return response
	},
	async (error) => {
		const online = await isOnline()
		if (online) {
			let code = ''
			if (error.response) {
				code = error.response.status
			} else if ('message' in error && !error.message) {
				console.warn('取消重复请求', error)
				code = null
			} else {
				code = '未知错误'
			}
			if (code !== null) {
				Toast.failed({
					content: `请求异常：${code}`,
					duration: 3 * 1000
				})
			}
		} else {
			// 网路连接中断
			store.commit('app/CHANGE_ONLINE', online)
		}
		return Promise.reject(error)
	}
)

export const __get = (url, args = {}, config = {}) => service.get(url, { params: args, ...config })
export const __post = (url, args = {}, config = {}) => service.post(url, args, config)

export default service
