<template>
	<view class="tag-sex icon iconfont"
	:class="[sex==0?'icon-nan':'icon-nv', {border:isBorder}]">
		{{age}}
	</view> 
</template>

<script>
	export default {
		props:{
			sex:Number,
			age:Number,
			isBorder: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style scoped lang="scss">
.tag-sex{
	background: #007AFF;
	color: #FFFFFF;
	font-size: 23upx;
	padding: 5upx 10upx;
	margin-left: 10upx;
	border-radius:20upx;
	line-height: 22upx;
	&.border{
		border: 4rpx solid #fff;
	}
}
.icon-nv{
	background: #FF698D!important;
}
</style>
