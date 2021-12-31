import config from './config.js'; //baseUrl
import userRule from './user.js'

export default {
	config: {
		baseUrl: config.baseUrl,
		header:{
			'Content-Type':'application/json;charset=UTF-8',
			'Content-Type':'application/x-www-form-urlencoded'
		},
		data: {},
		method: "GET",
		dataType: "json"
	},
	get(url,data,options={}){
		options.url = url;
		options.data = data;
		options.method = 'GET';
		return this.request(options);
	},
	post(url,data,options={}){
		options.url = url;
		options.data = data;
		options.method = 'POST';
		return this.request(options);
	},
	request(options = {}){
		options.header = options.header || this.config.header;
		options.method = options.method || this.config.method;
		options.dataType = options.dataType || this.config.dataType;
		options.url = this.config.baseUrl+options.url;
		// TODO：token增加等操作
		if (options.token) {
			// 验证用户是否登录
			if(options.checkToken && !userRule.token){
				uni.showToast({
					title:"请先登录",
					icon:"none"
				})
				return uni.navigateTo({
					url:'/pages/login/login'
				})
			}
			// if (!this.checkToken(options.checkToken)) return;
			// 验证用户操作权限（验证是否绑定手机号码）
			// if (!this.checkAuth(options.checkAuth)) return;
			options.header.token = userRule.token;
		}
		return uni.request(options);
	},
	errorCheck(err, res, errcb, rescb){//错误处理
		if(err){ //errcb 请求出错
			typeof errcb === 'function' && errcb();
			uni.showToast({
				title:"加载失败！",
				icon:"none"
			})
			return true
		}
		if(res.data.errorCode){ //rescb  请求返回出错
			typeof rescb === 'function' && rescb();
			uni.showToast({
				title:res.data.msg,
				icon:"none"
			})
			return true
		}
	}
}