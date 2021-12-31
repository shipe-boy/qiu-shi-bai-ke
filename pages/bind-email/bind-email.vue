<template>
	<view class="bind-email">
		<input type="text" v-model="email" class="uni-input" placeholder="输入邮箱" />
		<input password v-model="password" class="uni-input" placeholder="输入密码" />
		
		<button type="default" :loading="btnLoading" class="user-set-btn" :class="{disabled: btnDisabled}" @tap="submit">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: '',
				password: '',
				btnLoading: false
			}
		},
		computed:{
			btnDisabled: {
				get(){
					let flag = true;
					if(this.email && this.password){
						flag = false
					}
					return flag
				},
				set(val){
					return val
				}
			}
		},
		methods: {
			// 验证
			checkData(){
				
				if(!this.email){
					uni.showToast({
						title:"请填写邮箱",
						icon: "none"
					})
					return false
				}else{//邮箱验证
					
				}
				if(!this.password){
					uni.showToast({
						title:"请填写密码",
						icon: "none"
					})
					return false
				}
				if(this.email && this.password){
					return true
				}
				
				return false
				
			},
			submit(){
				if(this.btnLoading){
					this.btnDisabled = true
					return
				} 
				this.btnLoading = true;
				if(this.checkData()){ //验证
					console.log("提交")
					setTimeout(() => {
						
						uni.showToast({
							title:"设置成功",
						})
						this.btnLoading = false;
					},3000)
				}else{
					this.btnLoading = false;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
.user-set-btn{
	height: 100rpx;
	line-height: 100rpx;
	text-align: center;
	color: #3a3a3a;
	background-color: #ffe933;
	margin: 50rpx 30rpx 0;
	border: none!important;
	&.disabled{
		background-color: #f4f4f4;
		border: 1rpx solid #f3f3f3!important;
		color: #999;
	}
}
.uni-input{
	border-bottom: 1rpx solid #f4f4f4;
	padding-left: 40rpx;
	margin-top: 20rpx;
}
.bind-email{
	padding: 20rpx;
}
</style>
