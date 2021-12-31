<template>
	<view class="user-option">
		
			
			<!-- <uni-collapse ref="add" class="warp" @change="change">
				<uni-collapse-item v-for="(sub, key) in data" :key="key" :open="sub.open" :show-animation="sub.showAnimation" :disabled="sub.disabled" :title="sub.subName">
					<text class="content">{{ sub.content }}</text>
				</uni-collapse-item>
			</uni-collapse> -->
			<uni-collapse ref="add" class="warp" @change="change">
				<block v-for="(item, index) in list" :key="index">
					<uni-collapse-item :title="item.title" :show-animation="true">
					<text class="content content-text">{{ item.content }}</text>
				</uni-collapse-item>
				</block>
				
			</uni-collapse>
		
		
		<button type="default" class="user-set-btn" @tap="submit">确定</button>
	</view>
</template>

<script>
	import UniCollapse from '../../components/uni-collapse/uni-collapse.vue'
	import UniCollapseItem from '../../components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components:{
			UniCollapse,
			UniCollapseItem
		},
		data() {
			return {
				list: [
					{
						title: '客服什么时候上线？',
						content: '123'
					},
					{
						title: '忘记账号名称密码怎么办？',
						content: '123'
					},
					{
						title: '找不到女朋友怎么办？',
						content: '123'
					},
					{
						title: '怎么领取女朋友？',
						content: '123'
					}
				],
				
				data: [{
					type: true,
					subName: '动画效果',
					showAnimation: true,
					content: '折叠内容主体，这是一段比较长内容。默认折叠主要内容，只显示当前项标题。点击标题展开，才能看到这段问题。再次点击标题，折叠内容。'
				}]
			}
		},
		methods: {
			submit(){
				uni.showToast({
					title:"我知道了，你滚吧！",
					icon: 'none'
				})
			},
			change(e) {}
		}
	}
</script>

<style scoped lang="scss">
.user-option{
	padding: 20rpx;
	.user-set-btn{
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #3a3a3a;
		background-color: #ffe933;
		margin: 50rpx 30rpx 0;
		border: none!important;
	}
	.content-text{
		background-color: #fff;
		padding: 30rpx;
	}
}
</style>
