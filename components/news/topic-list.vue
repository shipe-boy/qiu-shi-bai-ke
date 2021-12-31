<template>
	<view class="item animated fadeInLeft fast" @tap="topicDetail">
		<view class="image-wrap">
			<image :src="item.imageSrc" mode="widthFix" lazy-load></image>
		</view>
		<view class="news-update-content">
			<view class="update-content-title">
				#{{item.title}}#
			</view>
			<view class="">
				{{item.desc}}
			</view>
			<view class="">
				动态 {{item.total}}  今日 {{item.dayNum}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			},
			index: Number
		},
		data() {
			return {
				
			};
		},
		methods:{
			topicDetail(){
				uni.navigateTo({
					url:'../../pages/topic-details/topic-details?detail=' + JSON.stringify(this.item)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.item{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		border-bottom: 1upx solid #eee;
		padding: 30upx 0;
		.image-wrap{
			width: 150upx;
			height: 150upx;
			border-radius: 10upx;
			overflow: hidden;
			margin-right: 20upx;
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				width: 100%;
				// height: 100%;
			}
		}
		.news-update-content{
			color: #a4a4a4;
			font-size: 28upx;
			.update-content-title{
				color: #333;
				font-size: 32upx;
				margin-bottom: 8upx;
			}
		}
	}
</style>
