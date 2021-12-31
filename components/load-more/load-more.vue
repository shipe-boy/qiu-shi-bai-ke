<template>
	<view class="load-more">
		{{loadText}}
	</view>
</template>

<script>
	export default {
		props:{
			loadText: {
				type:String,
				default:"加载跟更多"
			}
		}
	}
</script>

<style scoped>
	.load-more{
		text-align: center;
		color: #aaa;
		padding: 15upx 0;
	}
</style>
