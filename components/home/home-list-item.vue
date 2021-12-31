<template>
	<view class="home-list-item u-f-ajc u-f-jsb" hover-class="home-list-item-hover" @tap="itemTap">
		<view class="u-f-ac">
			<view v-if="item.iconClass" class="first-icon icon iconfont" :class="item.iconClass"></view>
			{{item.name}}
		</view>
		<view class="last-icon icon iconfont icon-jinru"></view>
	</view>
</template>

<script>
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
		methods:{
			itemTap(){
				// if(!this.item.url) return
				switch (this.item.switchType){
					case 'navigateTo':
						if(!this.item.url) return
						uni.navigateTo({
							url:this.item.url
						})
						break;
					case 'clear':
					
						uni.showModal({
							title:"提示",
							content:"确定要清除缓存么？",
							confirmText:"确定",
							success: (res) => {
								if(res.confirm){
									uni.clearStorage()
									uni.showToast({
										title:"清楚成功"
									})
								}
							}
						})
						
						break;
					default: 
						break;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.home-list-item{
		padding: 30rpx 40rpx;
		border-bottom: 1rpx solid #fafafa;
		&:first-child{
			border-top: 1rpx solid #fafafa;
		}
		&.home-list-item-hover{
			background-color: #fafafa;
		}
		.first-icon{
			margin-right: 10rpx;
		}
		.last-icon{
			color: #ccc;
		}
		
	}
</style>
