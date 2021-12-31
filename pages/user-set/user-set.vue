<template>
	<view class="user-set">
		<block v-for="(item, index) in homeList" :key="index">
			<home-list-item :item="item" :index="index"></home-list-item>
		</block>
		
		<button class="user-set-btn" type="default">退出登录</button>
		
	</view>
</template>

<script>
	import HomeListItem from '../../components/home/home-list-item.vue'
	export default {
		components:{
			HomeListItem
		},
		data() {
			return {
				homeList: [
					{
						name: '账号与安全',
						iconColor: '',
						iconClass: '',
						switchType: 'navigateTo',
						url: '../modify-pwd/modify-pwd'
					},
					{
						name: '绑定邮箱',
						iconColor: '',
						iconClass: '',
						switchType: 'navigateTo',
						url: '../bind-email/bind-email'
					},
					{
						name: '资料编辑',
						iconColor: '',
						iconClass: '',
						switchType: 'navigateTo',
						url: '../user-info/user-info'
					},
					{
						name: '小纸条',
						iconColor: '',
						iconClass: ''
					},
					{
						name: '清除缓存',
						iconColor: '',
						iconClass: '',
						switchType: 'clear',
					},
					{
						name: '意见反馈',
						iconColor: '',
						iconClass: '',
						switchType: 'navigateTo',
						url: '../user-option/user-option'
					},
					{
						name: '关于',
						iconColor: '',
						iconClass: '',
						switchType: 'navigateTo',
						url: '../about/about'
					}
				]
			}
		}
	}
</script>

<style scoped lang="scss">
.user-set-btn{
	height: 120rpx;
	line-height: 120rpx;
	text-align: center;
	color: #3a3a3a;
	background-color: #ffe933;
	margin: 50rpx 30rpx 0;
	border: none!important;
}
</style>
