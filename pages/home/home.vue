<template>
	<view class="home-wrap">
		<!-- 登录 -->
		<template v-if="isLogin">
			<view class="home-info u-f-ac" @tap="userSpace">
				<view class="user-avatar">
					<image :src="userInfo.userAvatar" mode="widthFix" lazy-load></image>
				</view>
				<view class="user-info">
					<view class="user-name">
						{{userInfo.userName}}
					</view>
					<view class="user-look">
						总访问量 {{userInfo.lookTotal}}
						今日 {{userInfo.todayNum}}
					</view>
				</view>
				<view class="icon iconfont icon-jinru"></view>
			</view>
		</template>
		<!-- 未登录 -->
		<template v-else>
			<view class="no-login u-f-ajc">
				登录/注册
			</view>
			<!-- 第三方登录 -->
			<other-login></other-login>
			
			<!-- 账号密码登录 -->
			<view class="pwd-login u-f-ajc" @tap="loginPage">
				账号密码登录
				<view class="icon iconfont icon-jinru"></view>
			</view>
		</template>
			
		<!-- 卡片 -->
		<view class="home-data u-f-ac">
			<view class="home-data-item u-f1 u-f-ajc u-f-column" 
			v-for="(item, index) in homeData" :key="index"
			>
				<view class="home-data-total">
					{{item.total}}
				</view>
				{{item.name}}
			</view>
		</view>
		
		<!-- 广告位 -->
		<view class="ad-wrap">
			<image src="../../static/demo/datapic/18.jpg" mode="widthFix" lazy-load></image>
		</view>
		
		<!-- 列表 -->
		<view class="home-list">
			<block v-for="(item, index) in homeList" :key="index">
				<home-list-item :item="item" :index="index"></home-list-item>
			</block>
		</view>
		
	</view>
</template>

<script>
	import HomeListItem from '../../components/home/home-list-item.vue'
	import OtherLogin from '../../components/other-login/other-login.vue'
	export default {
		components:{
			HomeListItem,
			OtherLogin
		},
		data() {
			return {
				userInfo: {
					userid: 20,
					userAvatar: '../../static/demo/userpic/7.jpg',
					userName: '王大锤',
					lookTotal: 15409,
					todayNum: 563
				},
				isLogin: false,
				homeData: [
					{
						name: '糗事',
						total: 25
					},
					{
						name: '动态',
						total: 51
					},
					{
						name: '评论',
						total: 2689
					},
					{
						name: '收查',
						total: 742
					}
				],
				homeList: [
					{
						name: '浏览历史',
						iconColor: '',
						iconClass: 'icon-liulan'
					},
					{
						name: '糗百认证',
						iconColor: '',
						iconClass: 'icon-huiyuanvip'
					},
					{
						name: '审核糗事',
						iconColor: '',
						iconClass: 'icon-keyboard'
					}
				]
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index == 0){
				//验证用户权限
				this.userRule.navigate({url: '../user-set/user-set'})
				// uni.navigateTo({
				// 	url: '../user-set/user-set'
				// })
			}
		},
		methods: {
			loginPage(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			userSpace(){
				uni.navigateTo({
					url:'../user-space/user-space'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.home-wrap{
	
	.home-info{
		padding: 20rpx 40rpx;
		.user-avatar{
			flex-shrink: 0;
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			margin-right: 15rpx;
			overflow: hidden;
			image{
				width: 100%;
			}
		}
		.user-info{
			flex: 1;
			.user-name{
				font-size: 32rpx;
				margin-bottom: 10rpx;
			}
			.user-look{
				color: #bbb;
			}
		}
		.icon-jinru{
			height: 100%;
		}
	}
	
	.no-login{
		padding: 20rpx 0;
		font-size: 32rpx;
	}
	
	
	.pwd-login{
		padding: 20rpx 0;
	}
	
	.home-data{
		padding: 20rpx 40rpx;
		color: #989898;
		.home-data-total{
			color: #333;
			font-size: 32rpx;
		}
	}
	.ad-wrap{
		padding: 30rpx;
		image{
			width: 100%;
			border-radius: 20rpx;
		}
		
	}
	
}
</style>
