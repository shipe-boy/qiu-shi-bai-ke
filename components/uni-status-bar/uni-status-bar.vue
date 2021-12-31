<template>
	<view :style="{ height: statusBarHeight, backgroundColor: bgColor }" class="uni-status-bar">
		<slot />
	</view>
</template>

<script>
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
	export default {
		props:{
			bgColor: {
				type:String,
				default: "transparent"
			}
		},
		name: 'UniStatusBar',
		data() {
			return {
				statusBarHeight: statusBarHeight
			}
		}
	}
</script>

<style scoped>
	.uni-status-bar {
		height: 20px;
	}
</style>