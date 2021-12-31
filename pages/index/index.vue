<template>
	<view class="index-wrap">

		<tab-bar-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="toggleTab"></tab-bar-head>


		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height: swiperHeight + 'px'}" :current="tabIndex"
				@change="swiperChange">
				<swiper-item v-for="(item, index) in newsList" :key="index">
					<scroll-view scroll-y="true" class="list" @scrolltolower="loadMore(index)">
						<template v-if="item.list.length">
							<!-- 图文列表 -->
							<view v-for="(item1,index1) in item.list" :key="index1">
								<index-list :item="item1" :index="index1"></index-list>
							</view>

							<!-- 上拉加载 -->
							<load-text :loadText="item.loadText"></load-text>
						</template>

						<template v-else-if="!item.firstLoad">
							<view class="loading u-f-ajc">Loading。。。</view>
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
	import IndexList from '../../components/index/index-list.vue'
	import TabBarHead from '../../components/index/swiper-tab-head.vue'
	import LoadText from '../../components/load-more/load-more.vue'
	import NoThing from '../../components/no-thing/no-thing.vue'
	export default {
		components: {
			IndexList,
			TabBarHead,
			LoadText,
			NoThing
		},
		data() {
			return {
				swiperHeight: 0,
				tabIndex: 0,
				tabBars: [],
				newsList: []
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100)
					this.swiperHeight = height;
				}
			})
			this.getNav()
		},
		onNavigationBarSearchInputClicked() { //原生搜索框点击事件
			uni.navigateTo({
				url: '../search/search'
			})
		},
		onNavigationBarButtonTap(e) { //监听原生标题栏点击事件
			// console.log(e)
			if (e.index === 1) { //点击第一个按钮 ， index来区分按钮 
				uni.navigateTo({ //打开发布页面
					url: '../added-input/added-input'
				})
			}
		},
		methods: {
			//获取文章分类
			async getNav() {
				let [err, res] = await this.$http.get('/postclass', {}, {
					token: true
				});
				
				if (this.$http.errorCheck(err, res)) {
					return
				}
				let result = res.data.data.list;
				let list = [];
				let newsList = [];
				result.forEach(item => {
					list.push({
						name: item.classname,
						id: item.id
					})
					newsList.push({
						loadText: '上拉加载更多',
						list: [],
						page: 1,
						firstLoad: false
					})
				})
				this.tabBars = list;
				this.newsList = newsList;
				this.tabBars.length && this.getNewsList()
			},
			async getNewsList() {
				let url = `/postclass/${this.tabBars[this.tabIndex].id}/post/${this.newsList[this.tabIndex].page}`;

				let [err, res] = await this.$http.get(url, {}, {
					token: true
				});

				let errorFlag = this.$http.errorCheck(err, res, () => {
					this.newsList[this.tabIndex].loadText = '上拉加载更多';
				}, () => {
					this.newsList[this.tabIndex].loadText = '上拉加载更多';
				})

				if (errorFlag) {
					return
				}

				let result = res.data.data.list;
				let list = [];

				result.forEach(item => {
					list.push(this.formatData(item))
				})
				//下拉刷新时直接覆盖
				this.newsList[this.tabIndex].list = this.newsList[this.tabIndex].page > 1 ? this.newsList[this
					.tabIndex].list.concat(list) : list;

				this.newsList[this.tabIndex].firstLoad = true;

				if (result.length < 10) {
					this.newsList[this.tabIndex].loadText = '没有更多数据了';
				} else {
					this.newsList[this.tabIndex].loadText = '上拉加载更多';
				}

			},
			formatData(item) {
				return { //图文
					userid: item.user.id,
					userPic: item.user.userpic,
					userName: item.user.username,
					isguanzhu: !!item.user.fens.length,
					id: item.id,
					title: item.title,
					type: "image", // image 和 video  两种类型
					titlePic: item.titlepic, //封面图
					video: false,
					path: item.path,
					share: !!item.share,
					infoNum: {
						index: (item.support.length > 0) ? (item.support[0].type + 1) : 0, //0未顶踩  1顶   2踩
						dingNum: item.ding_count,
						caiNum: item.cat_count
					},
					commentNum: item.comment_count,
					shareName: item.sharenum
				};
			},
			toggleTab(index) {
				this.tabIndex = index;
				this.getNewsList()
			},
			swiperChange(e) {
				// console.log(e.detail)
				this.tabIndex = e.detail.current;
				this.getNewsList()
			},
			loadMore(index) { //上拉加载
				if (this.newsList[index].loadText !== '上拉加载更多') return
				this.newsList[index].loadText = '正在加载中。。。';
				this.newsList[index].page++;
				this.getNewsList();
			}
		}
	}
</script>

<style scoped lang="scss">
	.loading {
		font-size: 40rpx;
		font-weight: bold;
		padding-top: 100rpx;
		color: #ccc;
	}
</style>
