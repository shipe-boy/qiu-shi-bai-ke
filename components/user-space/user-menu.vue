<template>
	<view class="wrap">
		<view class="paper-options-item" hover-class="paper-added-user" @tap="beizhu">
			<view class="icon iconfont icon-sousuo"></view>
			备注
		</view>
		<view class="paper-options-item" hover-class="paper-clear-msg" @tap="lahei">
			<view class="icon iconfont icon-qingchu"></view>
			加黑名单
		</view>
	</view>
</template>

<script>
	export default {
		methods:{
			beizhu(){
				this.$emit('beizhu')
			},
			lahei(){
				this.$emit('lahei')
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap{
		position: fixed;
		right: 20upx;
		top: 130upx;
		background-color: #fff;
		z-index: 22;
		width: 40%;
		box-shadow: 1upx 1upx 20upx 2upx rgba(0,0,0,0.3);
	}
	.paper-options-item{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 20upx;
		font-size: 30upx;
		&:first-child{
			border-bottom: 1px solid #EEEEEE;
		}
		&>.icon{
			margin-right: 20upx;
			font-weight: bold;
		}
		&.paper-clear-msg,
		&.paper-added-user{
			background-color: #eee;
		}
	}
</style>
