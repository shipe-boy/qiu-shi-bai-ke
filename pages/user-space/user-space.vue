<template>
	<view class="user-space" @tap="handlerPrevent">
		<!--  -->
		<user-menu v-show="isShowUserMenu" @beizhu="beizhu" @lahei="lahei"></user-menu>
		<!-- 背景  信息-->
		<view class="user-space-head">
			<view class="user-space-bg" @tap="changeBgImage">
				<image :src="getBgImage" mode="widthFix" lazy-load></image>
			</view>

			<view class="user-space-head-info">
				<image class="user-avatar" src="../../static/demo/userpic/1.jpg" mode="widthFix" lazy-load></image>
				<view class="user-info">
					<text class="user-name">{{userInfo.username}}</text>
					<view class="user-tag">
						<tag-sex-age :age="userInfo.userAge" :sex="userInfo.userSex" :isBorder="true"></tag-sex-age>
					</view>

				</view>
				<view class="user-foucs" :class="{active:userInfo.isFoucs}" @tap="toggleFoucs">
					<view v-show="!userInfo.isFoucs" class="icon iconfont icon-zengjia"></view>
					{{userInfo.isFoucs ? "已关注" : "关注"}}
				</view>
			</view>
		</view>

		<!-- 内容 -->
		<view class="user-space-content">
			<!-- 卡片 -->
			<view class="home-data u-f-ac">
				<view class="home-data-item u-f1 u-f-ajc u-f-column" v-for="(item, index) in homeData" :key="index">
					<view class="home-data-total">
						{{item.total}}
					</view>
					{{item.name}}
				</view>
			</view>

			<!-- 分割线 -->
			<view class="line"></view>

			<view class="content-wrap">
				<u-sticky offset-top="140">
					<view style="background-color: #fff;">
						<tab-bar-head scrollItemStyle="width:33.33%;" :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="toggleTab"></tab-bar-head>
					</view>

				</u-sticky>

				<!-- 内容  -->
				<view class="list-wrap">
					<template v-if="tabIndex == 0">
						<user-space-info :userInfo="userInfo"></user-space-info>
					</template>

					<template v-else-if="newsList[tabIndex].list.length">
						<!-- 图文列表 -->
						<view v-for="(item1,index1) in newsList[tabIndex].list" :key="index1">
							<common-list :item="item1"></common-list>
						</view>

						<!-- 上拉加载 -->
						<load-text :loadText="newsList[tabIndex].loadText"></load-text>
					</template>
					<template v-else>
						<!-- 无内容 -->
						<no-thing></no-thing>
					</template>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import tagSexAge from '../../components/common/tag-sex-age.vue'
	import TabBarHead from '../../components/index/swiper-tab-head.vue'
	import UserSpaceInfo from '../../components/user-space/user-space-userinfo.vue'
	import CommonList from '../../components/common/common-list.vue'
	import LoadText from '../../components/load-more/load-more.vue'
	import NoThing from '../../components/no-thing/no-thing.vue'
	import UserMenu from '../../components/user-space/user-menu.vue'
	import {
		deepCopy
	} from '../../utils/utils.js'
	export default {
		components: {
			tagSexAge,
			TabBarHead,
			UserSpaceInfo,
			CommonList,
			LoadText,
			NoThing,
			UserMenu
		},
		data() {
			return {
				isShowUserMenu: false,
				userInfo: {
					username: '王大锤',
					userSex: 0,
					userAge: 30,
					isFoucs: false,
					bgImg: 1,
					regtime: "2020-12-11",
					id: 3485,
					birthday: '2020-03-03',
					job: '贩毒',
					address: '塔寨村',
					qg: '单身'
				},
				homeData: [{
						name: '糗事',
						total: 25
					},
					{
						name: '动态',
						total: 51
					},
					{
						name: '评论',
						total: 2689
					},
					{
						name: '收查',
						total: 742
					}
				],
				tabIndex: 0,
				tabBars: [{
						name: "主页",
						id: 1
					},
					{
						name: "糗事",
						id: 2
					},
					{
						name: "动态",
						id: 3
					}
				],
				newsList: [{
						list: []
					}, {
						loadText: '上拉加载更多',
						loadTimes: 2, //模拟两次后没有数据
						name: '推荐',
						list: [{ //只有文字
								userName: '李二狗',
								userPic: '../../static/demo/userpic/10.jpg',
								sex: 0, //0男  1 女
								age: 20,
								isguanzhu: false,
								title: '仅文字的标题',
								titlePic: "",
								video: false,
								share: false,
								address: '上海市 普陀区',
								shareNum: 20,
								commentNum: 30, //评论数
								goodNum: 40 //点赞数
							},
							{ //图文
								userName: '王小美',
								userPic: '../../static/demo/userpic/11.jpg',
								sex: 1, //0男  1 女
								age: 18,
								isguanzhu: false,
								title: '图文的标题',
								titlePic: "../../static/demo/banner2.jpg",
								video: false,
								share: false,
								address: '北京市 朝阳区',
								shareNum: 20,
								commentNum: 30, //评论数
								goodNum: 40 //点赞数
							},
							{ //视频
								userName: '张大炮',
								userPic: '../../static/demo/userpic/16.jpg',
								sex: 0, //0男  1 女
								age: 40,
								isguanzhu: false,
								title: '视频图文的标题',
								titlePic: "../../static/demo/datapic/1.jpg",
								video: {
									lookNum: "22.2W",
									time: "20.23"
								},
								share: false,
								address: '河南省 洛阳市',
								shareNum: 20,
								commentNum: 30, //评论数
								goodNum: 40 //点赞数
							},
							{ //分享
								userName: '张玫瑰',
								userPic: '../../static/demo/userpic/2.jpg',
								sex: 1, //0男  1 女
								age: 23,
								isguanzhu: false,
								title: '分享的标题',
								titlePic: "",
								video: false,
								share: {
									title: '分享的标题',
									titlePic: '../../static/demo/datapic/12.jpg'
								},
								address: '上海市 普陀区',
								shareNum: 20,
								commentNum: 30, //评论数
								goodNum: 40 //点赞数
							}
						]
					},
					{
						list: []
					}
				]
			}
		},
		computed: {
			getBgImage() {
				return '../../static/bgimg/' + this.userInfo.bgImg + '.jpg'
			}
		},
		onReachBottom() { //上拉加载
			// console.log("页面触底")
			this.loadMore(this.tabIndex)
		},
		onNavigationBarButtonTap(e) {
			if(e.index == 0){
				this.isShowUserMenu = !this.isShowUserMenu;
			}
		},
		methods: {
			handlerPrevent(){
				this.isShowUserMenu = false;
			},
			changeBgImage() { //切换背景
				this.userInfo.bgImg++;
				if (this.userInfo.bgImg > 4) {
					this.userInfo.bgImg = 1
				}
			},
			toggleFoucs() { //切换关注
				this.userInfo.isFoucs = !this.userInfo.isFoucs
			},
			toggleTab(index) {
				this.tabIndex = index;
			},
			loadMore(index) { //上拉加载
				if (index <= 0) return
				if (this.newsList[index].loadTimes < 0) {
					this.newsList[index].loadText = '没有更多数据了';
					return
				}
				if (this.newsList[index].loadText !== '上拉加载更多') return
				this.newsList[index].loadText = '正在加载中。。。';

				setTimeout(() => {
					let list = deepCopy([this.newsList[index].list[1], this.newsList[index].list[3], this.newsList[
						index].list[0], this.newsList[index].list[2]]);

					this.newsList[index].list.push(...list);
					// console.log(this.newsList[index].list)
					this.newsList[index].loadText = '上拉加载更多';
					this.newsList[index].loadTimes--;
				}, 1000)

			},
			beizhu(){
				uni.showToast({
					title:"改啥备注呢，凑合凑合得了",
					icon:"none"
				})
			},
			lahei(){
				uni.showToast({
					title:"罪有应得，拉黑成功",
					icon:"none"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-space {
		position: relative;

		.user-space-head {
			.user-space-bg {
				height: 500rpx;
				overflow: hidden;

				image {
					width: 100%;
				}
			}

			.user-space-head-info {
				position: absolute;
				top: 12vh;
				left: 50%;
				transform: translateX(-50%);
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;

				.user-avatar {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}

				.user-info {
					margin: 20rpx 0;
					display: flex;
					align-items: center;
					justify-content: center;

					.user-name {
						color: #fff;
						font-size: 36rpx;
						font-weight: bold;
						text-shadow: 2rpx 2rpx 10rpx #333;
					}

				}

				.user-foucs {
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #ffe933;
					color: #333;
					border: 1rpx solid #ffe933;
					padding: 0 15rpx;
					border-radius: 10rpx;

					&.active {
						background-color: transparent;
						color: #fff;
						border: 1rpx solid #fff;
					}
				}
			}
		}

		.user-space-content {
			position: relative;
			z-index: 1;
			border-radius: 20rpx 20rpx 0 0;
			background-color: #fff;
			margin-top: -30rpx;

			.home-data {
				padding: 20rpx 40rpx;
				color: #989898;

				.home-data-total {
					color: #333;
					font-size: 32rpx;
				}
			}

			.line {
				height: 20rpx;
				background-color: #f4f4f4;
			}

			.content-wrap {}

		}



	}
</style>
