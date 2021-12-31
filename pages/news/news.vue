<template>
	<view class="news-wrap">
		<!-- 自定义导航 -->
		<uni-nav-bar :fixed="true" :statusBar="true" @clickRight="addedInput" >
			<!-- 左插槽 -->
			<view slot="left" class="nav-bar-left">
				<view class="icon iconfont icon-qiandao"></view>
			</view>
			<!-- 标题插槽 -->
			<view class="nav-bar-center">
				<tab-bar-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="toggleTab"></tab-bar-head>
			</view>
			<!-- 右插槽 -->
			<view slot="right" class="nav-bar-right">
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</uni-nav-bar>

		<!-- 内容 -->
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height: swiperHeight + 'px'}" :current="tabIndex"
				@change="swiperChange">
				<!-- 关注 -->
				<swiper-item >
					<scroll-view scroll-y="true" class="list" @scrolltolower="gxLoadMore">
						<template v-if="guanzhuList.length">
							<!-- 列表 -->
							<view class="" v-for="(item, index) in guanzhuList" :key="index">
								<common-list :item="item"></common-list>
							</view>
							
							<!-- 上拉加载 -->
							<load-text :loadText="gzLoadText"></load-text>
						</template>
						<template v-else>
							<!-- 无内容 -->
							<no-thing></no-thing>
						</template>
					</scroll-view>
				</swiper-item>
				<!-- 话题 -->
				<swiper-item>
					<scroll-view scroll-y="true" class="list">
						<!-- 搜索框 -->
						<view class="search-wrap">
							<input class="uni-input" placeholder-class="icon iconfont icon-sousuo plac-class" placeholder="搜索内容" type="text" v-model="searchText" />
						</view>
						<!-- 轮播图 -->
						<swiper class="topic-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
							<swiper-item v-for="(item,index) in topicList.swiperList" :key="index">
								<view class="swiper-item-wrap">
									<image :src="item.src" mode="widthFix"></image>
								</view>
								
							</swiper-item>
						</swiper>
						
						<!-- 热门分类 -->
						<view class="hot-wrap">
							<view class="hot-title-wrap u-f-ac u-f-jsb">
								<view>
									热门分类
								</view>
								<view class="hot-title-more u-f-ac" @click="topicPage">
									更多
									<view class="icon iconfont icon-jinru">
										
									</view>
								</view>
							</view>
							<view class="hot-list">
								<view class="hot-item" v-for="(item,index) in topicList.hotList" :key="index">
									{{item.name}}
								</view>
							</view>
						</view>
						
						<!-- 最近更新 -->
						<view class="news-update-wrap">
							<view class="news-update-title">
								最近更新
							</view>
							<view class="news-update-list">
								<view class="news-update-item" v-for="(item, index) in topicList.list" :key="index">
									
									<topic-list :item="item" :index="index"></topic-list>
								</view>
								
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import UniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue'
	import TabBarHead from '../../components/index/swiper-tab-head.vue'
	import NoThing from '../../components/no-thing/no-thing.vue'
	import CommonList from '../../components/common/common-list.vue'
	import loadText from '../../components/load-more/load-more.vue'
	import TopicList from '../../components/news/topic-list.vue'
	import { deepCopy } from '../../utils/utils.js'
	export default {
		components: {
			UniNavBar,
			TabBarHead,
			NoThing,
			CommonList,
			loadText,
			TopicList
		},
		data() {
			return {
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
				swiperHeight: 0,
				gzLoadTime: 2, //上拉加载次数
				gzLoadText: '上拉加载更多',
				guanzhuList: [
					{ //只有文字
						userName: '李二狗',
						userPic: '../../static/demo/userpic/10.jpg',
						sex: 0,  //0男  1 女
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
						sex: 1,  //0男  1 女
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
						sex: 0,  //0男  1 女
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
						sex: 1,  //0男  1 女
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
				],
				topicList: {
					swiperList: [
						{src:'../../static/demo/datapic/22.jpg' },
						{src:'../../static/demo/datapic/23.jpg' },
						{src:'../../static/demo/datapic/24.jpg' }
					],
					hotList: [ //热门分类
						{name: '最新'},
						{name: '游戏'},
						{name: '打卡'},
						{name: '情感'},
						{name: '故事'},
						{name: '喜爱'}
					],
					list: [
						{
							imageSrc: '../../static/demo/topicpic/1.jpeg',
							title: '我是话题的标题',
							desc: '我是化的描述',
							total: 50,
							dayNum: 10
						},
						{
							imageSrc: '../../static/demo/topicpic/2.jpeg',
							title: '我是话题的标题',
							desc: '我是化的描述',
							total: 150,
							dayNum: 20
						},
						{
							imageSrc: '../../static/demo/topicpic/3.jpeg',
							title: '我是话题的标题',
							desc: '我是化的描述',
							total: 560,
							dayNum: 110
						},
						{
							imageSrc: '../../static/demo/topicpic/4.jpeg',
							title: '我是话题的标题',
							desc: '我是化的描述',
							total: 80,
							dayNum: 20
						}
					]
				},
				searchText: ''
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100)
					this.swiperHeight = height;
				}
			})
			
			this.initData()
		},
		methods: {
			//初始化数据
			initData(){
				this.getSwiper()
				this.getNav()
				this.getTopicList()
			},
			//获取广告
			async getSwiper(){
				let [err, res] = await this.$http.get('/adsense/0');
				
				if(this.$http.errorCheck(err, res))return
				
				let swiperList = [];
				let result = res.data.data.list;
				result.forEach(item => {
					swiperList.push({
						src: item.src,
						url: item.url
					})
				})
				
				this.topicList.swiperList = swiperList;
			},
			//获取热门分类
			async getNav(){
				let [err, res] = await this.$http.get('/topicclass');
				
				if(this.$http.errorCheck(err, res))return
				
				let result = res.data.data.list;
				let list = [];
				result.forEach(item => {
					list.push({
						id: item.id,
						name: item.classname
					})
				})
				this.topicList.hotList = list;
			},
			//获取热门话题
			async getTopicList(){
				let [err, res] = await this.$http.get('/hottopic');
				
				if(this.$http.errorCheck(err, res))return
				let result = res.data.data.list;
				let list = [];
				result.forEach(item => {
					list.push({
						id: item.id,
						imageSrc: item.titlepic,
						title: item.title,
						desc: item.desc,
						total: item.post_count,
						dayNum: item.todaypost_count
					})
				})
				this.topicList.list = list;
			},
			addedInput() {
				uni.navigateTo({
					url: '../added-input/added-input'
				})
			},
			toggleTab(index) { //点击切换
				this.tabIndex = index;
			},
			swiperChange(e) { //滑动切换
				// console.log(e.detail)
				this.tabIndex = e.detail.current;
			},
			gxLoadMore(){
				if(this.gzLoadTime < 0){
					this.gzLoadText = '没有数据了'
					return
				}
				this.gzLoadText = "正在加载中....";
				setTimeout(() => {
					this.gzLoadTime--;
					this.gzLoadText = "下拉加载更多";
					
					let list = deepCopy([this.guanzhuList[1],this.guanzhuList[3],this.guanzhuList[0],this.guanzhuList[2]])
					this.guanzhuList.push(...list);
				}, 1000)
				
				
			},
			topicPage(){
				uni.navigateTo({
					url: '../topic/topic'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.news-wrap{
		width: 100%;
	}
	.nav-bar-left {
		display: flex;
		align-items: center;
		justify-content: center;
		// width: 100%;
		margin-left: 30upx;
		font-size: 40upx;
		color: #ff9619;
	}

	.nav-bar-center {
		width: 100%;
		text-align: center;
		margin-left: -20upx;
	}

	.nav-bar-right {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		font-size: 40upx;
	}
	
	.search-wrap{
		padding: 20upx;
		.uni-input{
			border-radius: 10upx;
			background-color: #f4f4f4;
			font-size: 20upx;
		}
		.plac-class{
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 30upx;
		}
	}
	
	.topic-swiper{
		padding: 0 20upx 20upx;
		border-radius: 10upx;
		overflow: hidden;
		.swiper-item-wrap{
			// border-radius: 10upx;
			// overflow: hidden;
			image{
				width: 100%;
			}
		}
		
	}
	
	.hot-wrap{
		border-bottom: 1upx solid #eee;
		border-top: 1upx solid #eee;
		padding: 20upx;
		.hot-title-wrap{
			margin-bottom: 20upx;
			.hot-title{
				font-size: 32upx;
			}
			.hot-title-more{
				display: flex;
				align-items: center;
				justify-content: flex-start;
				font-size: 24upx;
				color: #adadad;
				.icon{
					font-size: 24upx;
				}
			}
		}
		.hot-list{
			display: flex;
			align-items: center;
			justify-content: flex-start;
			.hot-item{
				background-color: #efefef;
				color: #9e9e9e;
				border-radius: 10upx;
				margin: 0 10upx;
				padding: 4upx 20upx;
				font-size: 28upx;
			}
		}
		
	}
	
	.news-update-wrap{
		padding: 20upx;
		.news-update-title{
			padding-bottom: 10upx;
			font-size: 32upx;
		}
		.news-update-list{
			padding: 10upx;
			/* .news-update-item{
				display: flex;
				align-items: center;
				justify-content: flex-start;
				border-bottom: 1upx solid #eee;
				padding: 30upx 0;
				.image-wrap{
					width: 150upx;
					height: 150upx;
					border-radius: 10upx;
					overflow: hidden;
					margin-right: 20upx;
					display: flex;
					align-items: center;
					justify-content: center;
					image{
						width: 100%;
						// height: 100%;
					}
				}
				.news-update-content{
					color: #a4a4a4;
					font-size: 28upx;
					.update-content-title{
						color: #333;
						font-size: 32upx;
						margin-bottom: 8upx;
					}
				}
			} */
		}
	}
	
	
</style>
