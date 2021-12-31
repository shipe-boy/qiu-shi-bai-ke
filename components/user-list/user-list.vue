<template>
	<view class="uset-list u-f-ac animated fadeInLeft fast">
		<view class="avatar-wrap">
			<image :src="item.userAvatar" mode="widthFix" lazy-load></image>
		</view>
		<view class="user-info">
			<view class="user-name">
				{{item.userName}}
			</view>
			<tag-sex-age :age="item.userAge" :sex="item.userSex"></tag-sex-age>
		</view>
		<view class="icon iconfont" :class="item.isguanzhu ? 'icon-xuanze-yixuan' : 'icon-zengjia1'"></view>
	</view>
</template>

<script>
	import TagSexAge from '../../components/common/tag-sex-age.vue'
	export default {
		props:{
			item: {
				type:Object,
				default:() => {}
			},
			index: {
				type:Number,
				default: 0
			}
		},
		components:{
			TagSexAge
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
	.uset-list {
		padding: 20upx 0;
		border-bottom: 1upx solid #eee;
	
		.avatar-wrap {
			width: 100upx;
			height: 100upx;
			border-radius: 50%;
			margin-right: 20upx;
			overflow: hidden;
			image{
				width: 100%;
			}
		}
	
		.user-info {
			flex: 1;
			display: flex;
			align-items: flex-start;
			justify-content: flex-start;
			flex-direction: column;
	
			.user-name {
				font-size: 32upx;
				margin-bottom: 16upx;
			}
		}
	
		&>view.icon {
			color: #ccc;
			&.icon-zengjia1{
				color: #f8791b;
			}
		}
	}
</style>
