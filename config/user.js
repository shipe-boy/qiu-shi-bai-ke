export default{
	//用户token
	token: false,
	//用户信息
	userInfo: false,
	//权限验证
	navigate(options, type){
		//权限验证
		if(!this.token){
			uni.navigateTo({
				url: '/pages/login/login'
			})
			
			return
		}
		//跳转
		switch(type) {
			case 'navigateTo':
				uni.navigateTo(options)
				break;
			case 'redirectTo':
				uni.redirectTo(options)
				break;
			case 'reLaunch':
				uni.reLaunch(options)
				break;
			case 'switchTab':
				uni.switchTab(options)
				break;
			default: 
				uni.showToast({
					title:"无效的跳转方式！",
					icon:"none"
				})
				break;
		}
		
	}
	
}