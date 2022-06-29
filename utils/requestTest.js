import store from '../store/index'
// import {getToken,removeToken} from '../utils/auth';
import env from './env.js';

// const token = getToken();
const baseUrl = env.baseUrl
const Token = store.state.user.token

const service = (options = {url, param, method}) => {
	// 显示加载
	// uni.showLoading({
	// 	title: "加载中"
	// });
	// uni.showNavigationBarLoading();
	
	const {url, method, params} = options
	
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			method: method,
			header: {
				'content-type': 'application/json',
				'Authorization': Token
			},
			data: {
				...params
			},
			success(res) {
				const { code } = res.data
				// 统一处理成功与错误
				if (code && code !== 0) {
					// 失败
					uni.showToast({
						icon: 'none',
						duration: 3000,
						title: res.data.message
					})
				} else {
					// 成功，resolve成功的数据
					resolve(res.data)
				}
			},
			fail(err) {
				// console.log(err, 'errrrrr')
				if (err.errMsg.indexOf('timeout') > -1) reject({ errMsg: '请求超时！' })
				else if (err.errMsg.indexOf('request:fail') > -1) reject({ errMsg: '网络异常！' })
				else reject(err)
			},
			// request接口调用结束执行
			complete() {
				// uni.hideLoading();
				// uni.hideNavigationBarLoading();
			}
		})
	})
}

export default service
