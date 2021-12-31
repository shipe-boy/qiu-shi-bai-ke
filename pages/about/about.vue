<template>
	<view>
		
		<view class="pic-wrap u-f-ajc u-f-column">
			<image src="../../static/common/logo.png" mode="widthFix" lazy-load></image>
			<view class="version">
				版本 1.1.1
			</view>
		</view>
		
		<block v-for="(item, index) in homeList" :key="index">
			<home-list-item :item="item" :index="index"></home-list-item>
		</block>
		
	</view>
</template>

<script>
	import HomeListItem from '../../components/home/home-list-item.vue'
	export default {
		components:{
			HomeListItem
		},
		data() {
			return {
				homeList: [
					{
						name: '新版本检测',
						iconColor: '',
						iconClass: ''
					},
					{
						name: '用户协议',
						iconColor: '',
						iconClass: ''
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.pic-wrap{
		padding: 40rpx 0 30rpx;
		image{
			width: 60%;
			margin-top: 30rpx;
			margin-bottom: 20rpx;
		}
		.version{
			color: #ccc;
		}
	}
</style>
