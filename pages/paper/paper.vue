<template>
	<view class="paper-wrap" @tap="hiddenPopup">
		<!-- 操作菜单 -->
		<view v-show="isShow" class="paper-options">
			<view class="paper-options-item" hover-class="paper-added-user" @tap="addedUser">
				<view class="icon iconfont icon-sousuo"></view>
				加好友
			</view>
			<view class="paper-options-item" hover-class="paper-clear-msg"  @tap="clearMsg">
				<view class="icon iconfont icon-qingchu"></view>
				清楚未读
			</view>
		</view>
		
		<!-- 列表 -->
		<view class="paper-list" v-for="(item,index) in paperList" :key="index">
			<view class="paper-list-item animated fadeInLeft fast" @tap="userChart(item)">
				<view class="item-avatar">
					<image lazy-load :src="item.userAvatar" mode="widthFix"></image>
				</view>
				<view class="item-content">
					<view class="user-name">
						{{item.userName}}
						<view class="time">
							{{item.sendTime}}
						</view>
					</view>
					<view class="user-msg-wrap">
						<view class="user-msg">{{item.sendContent}}</view>
						<uni-badge :text="item.unreadNum" type="error" />
					</view>
				</view>
			</view>
		</view>

		<!-- 上拉加载 -->
		<load-text :loadText="loadText"></load-text>


		<!-- 提示 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import UniBadge from '../../components/uni-badge/uni-badge.vue'
	import loadText from '../../components/load-more/load-more.vue'
	import { deepCopy } from '../../utils/utils.js'
	export default {
		components: {
			UniBadge,
			loadText
		},
		data() {
			return {
				paperList: [{
						userAvatar: '../../static/demo/userpic/1.jpg',
						userName: '李二狗',
						sendTime: '13:42',
						sendContent: '你个。。。，自己玩吧。',
						unreadNum: 0
					},
					{
						userAvatar: '../../static/demo/userpic/2.jpg',
						userName: '张大炮',
						sendTime: '15:01',
						sendContent: '在吗，兄弟',
						unreadNum: 1
					},
					{
						userAvatar: '../../static/demo/userpic/3.jpg',
						userName: '王小美',
						sendTime: '13:42',
						sendContent: '明天见',
						unreadNum: 0
					},
					{
						userAvatar: '../../static/demo/userpic/4.jpg',
						userName: '这人傻逼',
						sendTime: '13:42',
						sendContent: '我不想和你说话了',
						unreadNum: 0
					}, {
						userAvatar: '../../static/demo/userpic/1.jpg',
						userName: '李二狗',
						sendTime: '13:42',
						sendContent: '你个。。。，自己玩吧。',
						unreadNum: 0
					},
					{
						userAvatar: '../../static/demo/userpic/2.jpg',
						userName: '张大炮',
						sendTime: '15:01',
						sendContent: '在吗，兄弟',
						unreadNum: 1
					},
					{
						userAvatar: '../../static/demo/userpic/3.jpg',
						userName: '王小美',
						sendTime: '13:42',
						sendContent: '明天见',
						unreadNum: 0
					},
					{
						userAvatar: '../../static/demo/userpic/4.jpg',
						userName: '这人傻逼',
						sendTime: '13:42',
						sendContent: '我不想和你说话了',
						unreadNum: 0
					}, {
						userAvatar: '../../static/demo/userpic/1.jpg',
						userName: '李二狗',
						sendTime: '13:42',
						sendContent: '你个。。。，自己玩吧。',
						unreadNum: 0
					},
					{
						userAvatar: '../../static/demo/userpic/2.jpg',
						userName: '张大炮',
						sendTime: '15:01',
						sendContent: '在吗，兄弟',
						unreadNum: 1
					},
					{
						userAvatar: '../../static/demo/userpic/3.jpg',
						userName: '王小美',
						sendTime: '13:42',
						sendContent: '明天见',
						unreadNum: 0
					},
					{
						userAvatar: '../../static/demo/userpic/4.jpg',
						userName: '这人傻逼',
						sendTime: '13:42',
						sendContent: '我不想和你说话了',
						unreadNum: 0
					}
				],
				loadText: '上拉加载更多',
				loadTimes: 1,
				isShow: false
			}
		},
		onPullDownRefresh() { //监听下拉刷新
			setTimeout(() => {
				this.getPaperList()
			}, 2000)
		},
		onReachBottom(){ //下拉触底加载更多
			this.loadMore()
		},
		onNavigationBarButtonTap(e) { //原生导航栏
			if(e.index == 0){ //左边
				this.userRule.navigate({
					url:'../user-list/user-list'
				})
				this.hiddenPopup()
			}else{//右边
				if(this.isShow){
					this.hiddenPopup()
				}else{
					this.showPopup()
				}
				
			}
		},
		methods: {
			getPaperList() {
				let list = [{
						userAvatar: '../../static/demo/userpic/1.jpg',
						userName: '李二狗',
						sendTime: '13:42',
						sendContent: '今天天气真好，我好想你。',
						unreadNum: 5
					},
					{
						userAvatar: '../../static/demo/userpic/2.jpg',
						userName: '张大炮',
						sendTime: '15:01',
						sendContent: '在吗，兄弟',
						unreadNum: 1
					},
					{
						userAvatar: '../../static/demo/userpic/3.jpg',
						userName: '王小美',
						sendTime: '13:42',
						sendContent: '晚安，拜拜',
						unreadNum: 1
					},
					{
						userAvatar: '../../static/demo/userpic/4.jpg',
						userName: '这人傻逼',
						sendTime: '13:42',
						sendContent: '么么哒，么么哒，你咋不理我呢',
						unreadNum: 2
					}
				];
				this.paperList.unshift(...list);
				uni.stopPullDownRefresh()
				this.$refs.uToast.show({
					title: '为您更新了8条内容',
					type: 'default'
				})
			},
			loadMore(){
				if(this.loadTimes <= 0){
					this.loadText = '没有更多数据了';
					return
				}
				this.loadText = '正在加载中';
				setTimeout(() => {
					let list = deepCopy(this.paperList)
					this.paperList.push(...list)
					this.loadTimes--;
					this.loadText = '下拉加载更多';
				}, 2000)
				
			},
			addedUser(){
				// this.hiddenPopup() 
			},
			clearMsg(){
				this.paperList.forEach(item=> {
					if(item.unreadNum) {
						item.unreadNum = 0
					}
				})
				this.$refs.uToast.show({
					title: '清楚成功',
					type: 'default'
				})
				// this.hiddenPopup()
			},
			hiddenPopup(){
				if(!this.isShow)return
				this.isShow = false;
			},
			showPopup(){
				this.isShow = true;
			},
			userChart(item){
				let params = "?username=" + item.userName;
				uni.navigateTo({
					url: '../user-chart/user-chart' + params,
					
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.paper-wrap {
		padding: 0 20upx;
		
		.paper-options{
			position: fixed;
			right: 0upx;
			top: 0upx;
			background-color: #fff;
			z-index: 22;
			width: 40%;
			box-shadow: 1upx 1upx 20upx 2upx rgba(0,0,0,0.3);
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
		}

		.paper-list-item {
			border-bottom: 1upx solid #eee;
			padding: 20upx 0;
			display: flex;
			align-items: center;
			justify-content: flex-start;

			.item-avatar {
				width: 100upx;
				height: 100upx;
				border-radius: 50%;
				margin-right: 20upx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.item-content {
				flex: 1;
				padding-right: 20upx;

				.user-name {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #000;
					margin-bottom: 15upx;

					.time {
						color: #cbcbcb;
					}
				}

				.user-msg-wrap {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.user-msg {
						max-width: 500upx;
						flex: 1;
						color: #999;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	
	}
</style>
