<template>
	<view class="user-space-userinfo">
		<view class="userinfo-item">
			<view class="title">
				账号信息
			</view>
			<view>
				球龄： {{userInfo.regtime | regAgeFilter}}
			</view>
			<view>
				用户id： {{userInfo.id}}
			</view>
		</view>
		<view class="userinfo-item">
			<view class="title">
				个人信息
			</view>
			<view>
				星座： {{userInfo.birthday | starFilter}}
			</view>
			<view>
				家乡： {{userInfo.address}}
			</view>
			<view>
				情感： {{userInfo.qg}}
			</view>
			<view>
				职业： {{userInfo.job}}
			</view>
		</view>
	</view>
</template>

<script>
	import getTime from '../../common/time.js'
	export default {
		props:{
			userInfo: {
				type:Object,
				default:() => {}
			}
		},
		filters:{
			starFilter(time){ //星座
				return getTime.gettime.getHoroscope(time)
			},
			regAgeFilter(time){ //球龄
				return getTime.gettime.sumAge(time)
			}
		},
	}
</script>

<style scoped lang="scss">
	.user-space-userinfo{
		padding: 0 20rpx;
		.userinfo-item{
			padding: 20rpx 0;
			border-bottom: 1rpx solid #eee;
			&>view{
				color: #aaa;
				padding: 10rpx;
				&.title{
					color: #333;
					font-size: 34rpx;
					padding: 20rpx 0;
				}
			}
		}
	}
</style>
