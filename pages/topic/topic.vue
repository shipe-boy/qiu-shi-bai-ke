<template>
	<view class="toipc-wrap">
		<tab-bar-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="toggleTab"></tab-bar-head>
		
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height: swiperHeight + 'px'}" :current="tabIndex" @change="swiperChange">
				<swiper-item v-for="(item, index) in newsList" :key="index">
					<scroll-view scroll-y="true" class="list" @scrolltolower="loadMore(index)">
						<template v-if="item.list.length > 0">
						<!-- 图文列表 -->
						<view class="toipc-list" v-for="(item1,index1) in item.list" :key="index1">
							<topic-list :item="item1" :index="index1"></topic-list>
						</view>
						
						<!-- 上拉加载 -->
						<load-text :loadText="item.loadText"></load-text>
						</template>
						<template v-else-if="!item.firstLoad">
							<view style="font-size: 50upx;font-weight: bold;color: #CCCCCC;
							padding-top: 100upx;" class="u-f-ajc">Loading ...</view>
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
	import NoThing from '../../components/no-thing/no-thing.vue'
	import TopicList from '../../components/news/topic-list.vue'
	export default {
		components:{
			TabBarHead,
			LoadText,
			NoThing,
			TopicList
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
		methods: {
			//获取文章分类
			async getNav() {
				let [err, res] = await this.$http.get('/topicclass', {}, {
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
				let url = `/topicclass/${this.tabBars[this.tabIndex].id}/topic/${this.newsList[this.tabIndex].page}`;
			
				let [err, res] = await this.$http.get(url);
				
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
					list.push({
						id: item.id,
						imageSrc: item.titlepic,
						title: item.title,
						desc: item.desc,
						total: item.post_count,
						dayNum: item.todaypost_count
					})
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
			toggleTab(index){
				this.tabIndex = index;
				this.getNewsList()
			},
			swiperChange(e){
				// console.log(e.detail)
				this.tabIndex = e.detail.current;
				this.getNewsList()
			},
			loadMore(index){//上拉加载
				if(this.newsList[index].loadText !== '上拉加载更多' )return
				
				// 修改状态
				this.newslist[index].loadtext="加载中...";
				this.newslist[this.tabIndex].page++;
				this.getList();
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.toipc-wrap{
		.toipc-list{
			padding: 0 20upx;
		}
	}
</style>
