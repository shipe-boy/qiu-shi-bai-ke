<template>
	<view class="uni-tab-bar">
		<scroll-view scroll-x class="uni-swiper-tab" :style="scrollStyle">
			<view class="swiper-tab-list" :class="{active: tabIndex == index}" v-for="(item, index) in tabBars" :key="item.id" @tap="toggleTab(index)" :style="scrollItemStyle">
			{{item.name}}	{{item.total || ''}}
			</view>
		</scroll-view>
	</view>
	</view>
</template>

<script>
	export default {
		props:{
			tabBars: {
				type: Array,
				default:() => []
			},
			tabIndex:{
				type: Number,
				default: 0
			},
			scrollStyle:{
				type:String,
				default:""
			},
			scrollItemStyle:{
				type:String,
				default:""
			}
		},
		methods:{
			toggleTab(index){
				this.$emit('tabtap',index);
			},
		}
	}
</script>

<style scoped lang="scss">
.uni-swiper-tab{
		border-bottom: 1upx solid #eee;
	}
	.swiper-tab-list{
		color: #969696;
		font-weight: bold;
		&.active{
			position: relative;
			color: #343434;
			&::after{
				position: absolute;
				bottom: 10upx;
				left: 50%;
				transform: translateX(-50%);
				content: '';
				width: 70upx;
				height: 10upx;
				border-radius: 20upx;
				background-color: #fede33;
			}
		}
	}
</style>
