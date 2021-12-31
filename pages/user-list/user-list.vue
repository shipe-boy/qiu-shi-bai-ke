<template>
	<view class="user-list-wrap">
		<!-- tab切换 -->
		<view class="tab-bar-wrap">
			<tab-bar-head :tabBars="tabBarList" :tabIndex="tabBarIndex" @tabtap="toggleTab"
				scrollItemStyle="width:33%;"></tab-bar-head>
		</view>

		<!-- 好友列表 -->
		<!-- <block v-for="(item, index) in list" :key="index">
			
			<user-list :item="item" :index="index"></user-list>
		
		</block> -->
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height: swiperHeight + 'px'}" :current="tabBarIndex"
				@change="swiperChange">
				<swiper-item v-for="(item, index) in usersList" :key="index">
					<scroll-view scroll-y="true" class="list" @scrolltolower="loadMore(index)">
						<template v-if="item.list.length">
							<!-- 图文列表 -->
							<view v-for="(item1,index1) in item.list" :key="index1">
								<user-list :item="item1" :index="index1"></user-list>
							</view>

							<!-- 上拉加载 -->
							<load-text :loadText="item.loadText"></load-text>
						</template>
						<template v-else>
							<!-- 无内容 -->
							<no-thing></no-thing>
						</template>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>

	</view>
</template>

<script>
	import TabBarHead from '../../components/index/swiper-tab-head.vue'
	import LoadText from '../../components/load-more/load-more.vue'
	import UserList from '../../components/user-list/user-list.vue'
	export default {
		components: {
			TabBarHead,
			LoadText,
			UserList
		},
		data() {
			return {
				swiperHeight: 0,
				tabBarIndex: 0,
				tabBarList: [{
						name: "互关",
						total: 20,
						id: 1
					},
					{
						name: "关注",
						total: 15,
						id: 2
					},
					{
						name: "粉丝",
						total: 200,
						id: 3
					}
				],
				usersList: [{
						loadTimes: 2,
						loadText: '上拉加载更多',
						list: [{
								userAvatar: '../../static/demo/userpic/16.jpg',
								userName: '李云龙',
								userAge: 20,
								userSex: 0,
								isguanzhu: false
							},
							{
								userAvatar: '../../static/demo/userpic/17.jpg',
								userName: '张秀云',
								userAge: 19,
								userSex: 1,
								isguanzhu: true
							},
							{
								userAvatar: '../../static/demo/userpic/16.jpg',
								userName: '李云龙',
								userAge: 20,
								userSex: 0,
								isguanzhu: false
							},
							{
								userAvatar: '../../static/demo/userpic/17.jpg',
								userName: '张秀云',
								userAge: 19,
								userSex: 1,
								isguanzhu: true
							},
							{
								userAvatar: '../../static/demo/userpic/16.jpg',
								userName: '李云龙',
								userAge: 20,
								userSex: 0,
								isguanzhu: false
							},
							{
								userAvatar: '../../static/demo/userpic/17.jpg',
								userName: '张秀云',
								userAge: 19,
								userSex: 1,
								isguanzhu: true
							},
							{
								userAvatar: '../../static/demo/userpic/16.jpg',
								userName: '李云龙',
								userAge: 20,
								userSex: 0,
								isguanzhu: false
							},
							{
								userAvatar: '../../static/demo/userpic/17.jpg',
								userName: '张秀云',
								userAge: 19,
								userSex: 1,
								isguanzhu: true
							}
						]
					},
					{
						loadTimes: 2,
						loadText: '上拉加载更多',
						list: [{
								userAvatar: '../../static/demo/userpic/16.jpg',
								userName: '李云龙',
								userAge: 20,
								userSex: 0,
								isguanzhu: false
							},
							{
								userAvatar: '../../static/demo/userpic/17.jpg',
								userName: '张秀云',
								userAge: 19,
								userSex: 1,
								isguanzhu: true
							},
							{
								userAvatar: '../../static/demo/userpic/16.jpg',
								userName: '李云龙',
								userAge: 20,
								userSex: 0,
								isguanzhu: false
							},
							{
								userAvatar: '../../static/demo/userpic/17.jpg',
								userName: '张秀云',
								userAge: 19,
								userSex: 1,
								isguanzhu: true
							},
							{
								userAvatar: '../../static/demo/userpic/16.jpg',
								userName: '李云龙',
								userAge: 20,
								userSex: 0,
								isguanzhu: false
							},
							{
								userAvatar: '../../static/demo/userpic/17.jpg',
								userName: '张秀云',
								userAge: 19,
								userSex: 1,
								isguanzhu: true
							},
							{
								userAvatar: '../../static/demo/userpic/16.jpg',
								userName: '李云龙',
								userAge: 20,
								userSex: 0,
								isguanzhu: false
							},
							{
								userAvatar: '../../static/demo/userpic/17.jpg',
								userName: '张秀云',
								userAge: 19,
								userSex: 1,
								isguanzhu: true
							}
						],
					},
					{
						list: []
					}
				]
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100)
					this.swiperHeight = height;
				}
			})
		},
		methods: {
			toggleTab(index) {
				this.tabBarIndex = index;
			},
			swiperChange(e) {
				// console.log(e.detail)
				this.tabBarIndex = e.detail.current;
			},
			loadMore(index) { //上拉加载
				if (this.usersList[index].loadTimes < 0) {
					this.usersList[index].loadText = '没有更多数据了';
					return
				}
				if (this.usersList[index].loadText !== '上拉加载更多') return
				this.usersList[index].loadText = '正在加载中。。。';

				setTimeout(() => {
					let list = this.usersList[index].list;

					this.usersList[index].list.push(list[0], list[1])
					// console.log(this.usersList[index].list)
					this.usersList[index].loadText = '上拉加载更多';
					this.usersList[index].loadTimes--;
				}, 1000)

			}
		}
	}
</script>

<style scoped lang="scss">
	.user-list-wrap {
		padding: 0 30upx;

		.uni-tab-bar {
			width: 100%;

			.list {
				width: 100%;
			}
		}
	}
</style>
