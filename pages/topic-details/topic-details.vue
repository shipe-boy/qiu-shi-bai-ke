<template>
	<view class="topic-details-wrap">
		<!-- 模糊背景 -->
		<view class="topic-details-bg">
			<image :src="topicInfo.topicImage" mode="aspectFill" lazy-load></image>
		</view>

		<!-- 话题内容 -->
		<view class="topic-details-info">
			<view class="topic-info-t u-f-ac">
				<image :src="topicInfo.topicImage"  lazy-load></image>
				<view class="topic-title">#{{topicInfo.title}}#</view>
			</view>
			<view class="topic-info-c u-f-ac">
				<view>
					动态 {{topicInfo.total}}
				</view>
				<view>
					今日 {{topicInfo.dayNum}}
				</view>
			</view>
			<view class="topic-info-b">
				{{topicInfo.desc}}
			</view>
		</view>

		<!-- 相关列表 -->
		<u-sticky offset-top="140">
			<!-- 只能有一个根元素 -->
			<view class="topic-detail-bar">
				<tab-bar-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="toggleTab"></tab-bar-head>
			</view>
		</u-sticky>

		<view class="topic-detail-list">

			<view class="list-wrap">
				<template v-if="newsList[tabIndex].list.length">
					<!-- 图文列表 -->
					<view v-for="(item1,index1) in newsList[tabIndex].list" :key="index1">
						<common-list :item="item1"></common-list>
					</view>

					<!-- 上拉加载 -->
					<load-text :loadText="newsList[tabIndex].loadText"></load-text>
				</template>
				<template v-else-if="!newsList[tabIndex].firstLoad">
					<view style="font-size: 50upx;font-weight: bold;color: #CCCCCC;
					padding-top: 100upx;" class="u-f-ajc">Loading ...</view>
				</template>
				<template v-else>
					<!-- 无内容 -->
					<no-thing></no-thing>
				</template>
			</view>
		</view>

		<!-- 提示 -->
		<u-toast ref="uToast" />

	</view>
</template>

<script>
	import TabBarHead from '../../components/index/swiper-tab-head.vue'
	import CommonList from '../../components/common/common-list.vue'
	import LoadText from '../../components/load-more/load-more.vue'
	import NoThing from '../../components/no-thing/no-thing.vue'
	import {
		deepCopy
	} from '../../utils/utils.js'
	export default {
		components: {
			TabBarHead,
			CommonList,
			LoadText,
			NoThing
		},
		data() {
			return {
				topicInfo: {
					topicImage: '../../static/demo/topicpic/13.jpeg',
					title: '这个话题不简单',
					desc: '不简单的描述',
					dayNum: 284,
					total: 23497
				},
				tabIndex: 0,
				tabBars: [{
						name: "关注",
						id: 1
					},
					{
						name: "话题",
						id: 2
					}
				],
				newsList: [{
					loadText: '上拉加载更多',
					list: [],
					page: 1,
					firstLoad: false
				},
				{
					loadText: '上拉加载更多',
					list: [],
					page: 1,
					firstLoad: false
				}
				]
			}
		},
		onReachBottom() { //上拉加载
			// console.log("页面触底")
			this.loadMore(this.tabIndex)
		},
		onPullDownRefresh() { //下拉刷新
			// console.log("刷新页面")
				this.downRefresh();
		},
		onLoad(res) {
			let item = JSON.parse(res.detail);
			
			this.initData(item)
		},
		methods: {
			initData(item){
				//修改标题
				uni.setNavigationBarTitle({
					title:item.title
				})
				//初始化数据
				this.topicInfo = item;
				
				//获取列表
				this.getList()
			},
			toggleTab(index) {
				this.tabIndex = index;
				this.newsList[this.tabIndex].page = 1;
				//获取列表
				this.getList()
			},
			async getList(){
				let url = `/topic/${this.topicInfo.id}/post/${this.newsList[this.tabIndex].page}`;
				let [err, res] = await this.$http.get(url, {}, {
					token: true
				});
				
				
				if (this.$http.errorCheck(err, res)) {
					this.newsList[this.tabIndex].loadText = '上拉加载更多';
					return
				}
				
				let result = res.data.data.list;
				let list = [];
				
				result.forEach(item => {
					list.push(this.formatData(item))
				})
				//下拉刷新时直接覆盖
				this.newsList[this.tabIndex].list = this.newsList[this.tabIndex].page > 1 ? this.newsList[this.tabIndex].list.concat(list) : list;
				
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
					shareName: item.sharenum,
					goodnum: item.ding_count
				};
			},
			downRefresh() {
				this.newsList[this.tabIndex].page = 1;
				//获取列表
				this.getList()
				
				uni.stopPullDownRefresh()
				this.$refs.uToast.show({
					title: '为您更新了8条内容',
					type: 'default'
				})
				
			},
			loadMore(index) { //上拉加载
				if (this.newsList[index].loadText !== '上拉加载更多') return
				this.newsList[index].loadText = '正在加载中。。。';

				// 修改状态
				this.newsList[index].loadText="加载中...";
				this.newsList[this.tabIndex].page++;
				this.getList();

			}
		}
	}
</script>

<style scoped lang="scss">
	.topic-details-wrap {
		width: 100%;
		// height: 100%;

		// display: flex;
		// align-items: flex-start;
		// justify-content: flex-start;
		// flex-direction: column;

		.topic-details-bg {
			width: 100%;
			height: 300upx;
			position: relative;
			overflow: hidden;

			image {
				width: 100%;
				position: absolute;
				filter: blur(20upx);
			}
		}


		.topic-details-info {
			width: 100%;
			position: relative;
			padding: 0 20upx;

			.topic-info-t {
				padding: 20upx 0;

				image {
					width: 150upx;
					height: 150upx;
					border-radius: 25upx;
					position: absolute;
					top: -80upx;
					overflow: hidden;

				}

				.topic-title {
					font-size: 36upx;
					margin-left: 180upx;
					flex: 1;
					font-weight: bold;
				}
			}

			.topic-info-c {
				padding-bottom: 10upx;
				font-size: 28upx;
				color: #cdcdcd;
			}

			.topic-info-b {
				padding-bottom: 10upx;
				color: #a3a3a3;
				font-size: 32upx;
			}
		}

		.topic-detail-bar {
			background-color: #fff;
			width: 100%;
			text-align: center;
		}

		.topic-detail-list {
			width: 100%;
			height: 100%;

			// flex: 1;
			.swiper-box {
				height: 100%;
			}
		}
	}
</style>
