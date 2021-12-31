<template>
	<view class="user-bottom u-f-ac">
		<input type="text" v-model="userInput" placeholder="文明发言" />
		<view class="icon iconfont icon-fabu" @tap="submit">
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				userInput: ''
			}
		},
		methods:{
			submit(){
				this.$emit('submit', this.userInput)
				this.userInput = ''
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-bottom{
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100upx;
		padding: 15upx 20upx;
		background-color: #fff;
		border-top: 1upx solid #eee;
		input{
			box-sizing: border-box;
			flex: 1;
			height: 100%;
			margin-right: 20upx;
			padding: 10upx 20upx;
			border-radius: 10upx;
			font-size: 30upx;
			background-color: #efefef;
		}
		&>view{
			width: 80upx;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 46upx;
		}
	}
</style>
