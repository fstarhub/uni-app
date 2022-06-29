

 const service = (options = {url, param, method}) => {
	const token = uni.getStorageSync('token');
	// 显示加载
	uni.howLoading({
		title: "加载中"
	});
	uni.showNavigationBarLoading();

	return new Promise((resolve, reject) => {
		uni.request({
			url: baseurl + options.url,
			method: options.method,
			header: {
				'content-type': 'application/json',
				'Authorization': token
			},
			data: {
				...(optinos.params)
			},
			success(res) {
				console.log(res, 'res')
				const { code } = res.data.code;
				// 可以统一处理后端返回的错误
				// if () {
					
				// }
 
				// 无错误码，resolve成功的数据
				resolve(res.data);
			},
			fail(err) {
				console.log(err, 'err')
				// if (err.errMsg.indexOf('timeout') > -1) reject({ errMsg: '请求超时！' })
				// else if (err.errMsg.indexOf('request:fail') > -1) reject({ errMsg: '网络异常！' })
				// else reject(err)
			},
			// request接口调用结束执行
			complete() {
				uni.hideLoading();
				uni.hideNavigationBarLoading();
			}
		});
	});
};

export default service
