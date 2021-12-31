<template>
	<view class="login-wrap">
		<!-- 状态栏 -->
		<uni-status-bar bgColor="#ffe933" />
		
		<!-- 管不按钮 -->
		<view class="close-icon icon iconfont icon-guanbi" @tap="back"></view>
		
		<!-- 背景 -->
		<image class="login-bg" src="../../static/common/loginhead.png" mode="widthFix" lazy-load></image>
		
		<view class="modify-pwd-wrap">
			<template v-if="!isCode">
				<input type="text" v-model="userName" class="uni-input" placeholder="昵称/手机号/邮箱" />
				<view class="login-pwd">
					<input password v-model="userPassword" class="uni-input" placeholder="输入密码" />
					<view class="pwd-re">
						忘记密码？
					</view>
				</view>
			</template>
			<template v-else>
				<input type="text" v-model="userPhone" class="uni-input" placeholder="请输入手机号" />
				<view class="login-pwd">
					<input type="text" v-model="userCode" class="uni-input" placeholder="输入验证码" />
					<view class="pwd-re" @tap="sendCode">
						{{codeTime <= 0 ? '获取验证码' : codeTime+'s后重新获取'}}
					</view>
				</view>
			</template>
			
			
			
			<button type="default" :loading="btnLoading" class="user-set-btn" :class="{disabled: btnDisabled}" @tap="submit">登录</button>
			
		</view>
		
		<!-- 登录状态切换 -->
		<view class="login-status u-f-ajc" @tap="toggleLoginType">
			{{isCode ? '账号密码登录': '验证码登录'}}
			<view class="icon iconfont icon-jinru"></view>
		</view>
		
		<!-- 第三方登录 -->
		<view class="other-login-wrap u-f-ajc">
			第三方登录
		</view>
		<other-login></other-login>
		
		
		<!-- 协议 -->
		<view class="login-rule u-f-ajc">
			注册即代表您同意 <text class="rule">《单身狗协议》</text>
		</view>
		
	</view>
</template>

<script>
	import UniStatusBar from '../../components/uni-status-bar/uni-status-bar.vue'
	import OtherLogin from '../../components/other-login/other-login.vue'
	export default {
		components:{
			UniStatusBar,
			OtherLogin
		},
		data() {
			return {
				userName: '',
				userPassword: '',
				userPhone: '',
				userCode: '',
				btnLoading: false,
				isCode: false,
				codeTime: 0,
				
			}
		},
		computed:{
			btnDisabled: {
				get(){
					let flag = true;
					if((this.userName && this.userPassword) || (this.userPhone && this.userCode)){
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
			back(){
				uni.navigateBack({
					delta: 1
				})
			},
			toggleLoginType(){
				this.userName = ''
				this.userPassword = ''
				this.userPhone = ''
				this.userCode = ''
				this.isCode = !this.isCode;
				
			},
			isPhone(phone){
				let mPattern = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
				if(mPattern.test(phone)){
					return true
				}
				uni.showToast({
					title:"请输入正确的手机号！",
					icon:"none"
				})
				return false
			},
			sendCode(){
				if(this.codeTime > 0) return
				// 验证手机号正确性
				if(!this.isPhone(this.userPhone)) return
				
				this.codeTime = 5;
				let timer = setInterval(() => {
					this.codeTime--;
					if(this.codeTime <= 0){
						clearInterval(timer);
					}
				}, 1000)
			},
			submit(){
				// 验证手机号正确性
				if(this.isCode){
					if(!this.isPhone(this.userPhone)) return
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
.login-wrap{
	.login-bg{
		width: 100%;
	}
	.close-icon{
		position: fixed;
		z-index: 1;
		top: 60rpx;
		left: 30rpx;
		font-size: 40rpx;
		font-weight: bold;
		color: #332faa;
		// background-color: red;
	}
	
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
		.login-pwd{
			position: relative;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			border-bottom: 1px solid #eee;
			input{
				flex: 1;
				border-bottom: none
			}
			.pwd-re{
				
			}
		}
	}
	
	.login-status{
		margin-top: 20rpx;
		.icon{
			color: #ccc;
			margin-left: 10rpx;
		}
	}
	
	.other-login-wrap{
		color: #ccc;
		margin-top: 30rpx;
		&::after,
		&::before{
			content: '';
			display: inline-block;
			width: 150rpx;
			height: 2rpx;
			background-color: #ccc;
		}
		&::after{
			margin-left: 16rpx;
		}
		&::before{
			margin-right: 16rpx;
		}
	}
	
	.login-rule{
		margin-top: 30rpx;
		.rule{
			color: blue;
		}
	}
	
}

</style>
