<template>
	<view class="modify-pwd-wrap">
		<input password v-model="oldPwd" class="uni-input" placeholder="输入旧密码" />
		<input password v-model="newPwd" class="uni-input" placeholder="输入新密码" />
		<input password v-model="rNewPwd" class="uni-input" placeholder="确认新密码" />
		
		<button type="default" :loading="btnLoading" class="user-set-btn" :class="{disabled: btnDisabled}" @tap="submit">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPwd: '',
				newPwd: '',
				rNewPwd: '',
				btnLoading: false
			}
		},
		computed:{
			btnDisabled: {
				get(){
					let flag = true;
					if(this.newPwd && this.rNewPwd && this.oldPwd){
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
				
				if(!this.oldPwd){
					uni.showToast({
						title:"请填写旧密码",
						icon: "none"
					})
					return false
				}
				if(!this.newPwd){
					uni.showToast({
						title:"请填写新密码",
						icon: "none"
					})
					return false
				}
				if(!this.rNewPwd){
					uni.showToast({
						title:"请填再次确认新密码",
						icon: "none"
					})
					return false
				}
				
				if(this.newPwd != this.rNewPwd){
					uni.showToast({
						title:"两次密码不一致",
						icon: "none"
					})
					return false
				}
				if(this.newPwd && this.rNewPwd && this.oldPwd){
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
.modify-pwd-wrap{
	padding: 20rpx;
}
</style>
