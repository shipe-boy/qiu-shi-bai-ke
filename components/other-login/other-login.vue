<template>
	<view class="other-login">
		<block v-for="(item, index) in providerList" :key="index">
			<view class="other-login-item u-f-ajc" v-if="item.name" @tap="tologin(item)">
				<view :class="['icon', 'iconfont', 'icon-' + item.icon]"></view>
			</view>
		</block>
		<!-- <view class="other-login-item u-f-ajc">
			<view class="icon iconfont icon-xinlangweibo"></view>
		</view>
		<view class="other-login-item u-f-ajc">
			<view class="icon iconfont icon-QQ"></view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data(){
			return {
				providerList: [],
			}
		},
		mounted() {
			uni.getProvider({
				service: 'oauth',
				success: (result) => {
					this.providerList = result.provider.map((value) => {
						let providerName = '';
						let icon = ''
						switch (value) {
							case 'weixin':
								providerName = '微信登录'
								icon = 'weixin'
								break;
							case 'qq':
								providerName = 'QQ登录'
								icon = 'QQ'
								break;
							case 'sinaweibo':
								providerName = '新浪微博登录'
								icon = 'xinlangweibo'
								break;
						}
						return {
							name: providerName,
							id: value,
							icon: icon
						}
					});
				},
				fail: (error) => {
					console.log('获取登录通道失败', error);
				}
			});
		},
		methods: {
			Toast(data, duration = 1000) {
				uni.showToast(Object.assign({}, data, {
					duration
				}))
			},
			tologin(provider) {
		
				// 一键登录已在APP onLaunch的时候进行了预登陆，可以显著提高登录速度。登录成功后，预登陆状态会重置
				uni.login({
					provider: provider.id,
					// #ifdef MP-ALIPAY
					scopes: 'auth_user', //支付宝小程序需设置授权类型
					// #endif
					success: async (res) => {
						console.log('login success:', res);
						this.Toast({
							title: '登录成功'
						})
						
						//保存本地
		
		
						// #ifdef MP-WEIXIN
						console.warn('如需获取openid请参考uni-id: https://uniapp.dcloud.net.cn/uniCloud/uni-id')
						uni.request({
							url: 'https://97fca9f2-41f6-449f-a35e-3f135d4c3875.bspapp.com/http/user-center',
							method: 'POST',
							data: {
								action: 'loginByWeixin',
								params: {
									code: res.code,
									platform: 'mp-weixin'
								}
							},
							success(res) {
								console.log(res);
								if (res.data.code !== 0) {
									console.log('获取openid失败：', res.result.msg);
									return
								}
								uni.setStorageSync('openid', res.data.openid)
							},
							fail(err) {
								console.log('获取openid失败：', err);
							}
						})
						// #endif
					},
					fail: (err) => {
						console.log('login fail:', err);
		
						// 一键登录点击其他登录方式
						if (err.code == '30002') {
							uni.closeAuthView();
							this.Toast({
								title: '其他登录方式'
							})
							return;
						}
		
						// 未开通
						if (err.code == 1000) {
							uni.showModal({
								title: '登录失败',
								content: `${err.errMsg}\n，错误码：${err.code}`,
								confirmText: '开通指南',
								cancelText: '确定',
								success: (res) => {
									if (res.confirm) {
										setTimeout(() => {
											plus.runtime.openWeb('https://ask.dcloud.net.cn/article/37965')
										}, 500)
									}
								}
							});
							return;
						}
		
						// 一键登录预登陆失败
						if (err.code == '30005') {
							uni.showModal({
								showCancel: false,
								title: '预登录失败',
								content: this.univerifyErrorMsg || err.errMsg
							});
							return;
						}
		
						// 一键登录用户关闭验证界面
						if (err.code != '30003') {
							uni.showModal({
								showCancel: false,
								title: '登录失败',
								content: JSON.stringify(err)
							});
						}
					},
					complete: () => {
						this.univerifyBtnLoading = false;
					}
				});
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.other-login{
		padding: 20rpx 50rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.other-login-item{
			
			.icon{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				font-size: 50rpx;
				color: #fff;
				&.icon-weixin{
					background-color: #2bd198;
				}
				&.icon-xinlangweibo{
					background-color: #fc7729;
				}
				&.icon-QQ{
					background-color: #2caefc;
				}
			}
		}
	}
</style>
