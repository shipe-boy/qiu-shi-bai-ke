<template>
	<view>
		<template v-if="list.length">
			<!-- 有内容 -->
			<block v-for="(item, index) in list" :key="index">
				<index-list :item="item" :index="index"></index-list>
			</block>

			<!-- 上拉加载 -->
			<load-text :loadText="loadText"></load-text>
		</template>
		<template v-else-if="isSearch && !list.length">
			<!-- 无内容 -->
			<no-thing></no-thing>
		</template>
	</view>
</template>

<script>
	import IndexList from '../../components/index/index-list.vue'
	import LoadText from '../../components/load-more/load-more.vue'
	import NoThing from '../../components/no-thing/no-thing.vue'
	import {
		deepCopy
	} from '../../utils/utils.js'
	export default {
		components: {
			IndexList,
			NoThing,
			LoadText
		},
		data() {
			return {
				loadText: '上拉加载更多',
				loadTimes: 2, //模拟两次后没有数据
				list: [],
				page: 1,
				isSearch: false,
				searchText: ''
			}
		},
		onNavigationBarButtonTap(e) { //监听原生标题栏点击事件
			// console.log(e)
			if (e.index === 0) { //点击第一个按钮 ， index来区分按钮 
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onNavigationBarSearchInputChanged(e) { //监听原生搜索框文本内容变化
			// console.log("内容变化",e)
			// e.text  是搜索框内容
			if(e.text){
				this.searchText = e.text;
			}
			
		},
		onNavigationBarSearchInputConfirmed(e) { //点击键盘上搜索按钮
			// console.log("确定搜索",e)
			// e.text  搜索框内容
			if(e.text){
				uni.hideKeyboard()
				this.searchText = e.text;
				this.getData()
			}
		},
		onReachBottom() { //页面触底事件
			this.loadMore()
		},
		onPullDownRefresh() {//下拉刷新
		
			this.getData(true)
			uni.stopPullDownRefresh();
		},
		methods: {
			loadMore(index) { //上拉加载
				if (this.loadText !== '上拉加载更多') return
				this.loadText = '正在加载中。。。';
				this.page++;
				this.getData()
			},
			async getData(isCover) {
				uni.showLoading({title:"Loading..."})
				
				let [err, res] = await this.$http.post('/search/post', {
					keyword: this.searchText,
					page: this.page
				},{
					token: true
				});
				
				if (this.$http.errorCheck(err, res)) {
					uni.hideLoading();
					this.isSearch = true;
					return
				}
				this.isSearch = true;
				
				let result = res.data.data.list;
				let list = [];
				
				result.forEach(item => {
					list.push(this.formatData(item))
				})
				//下拉刷新时直接覆盖
				if(isCover){  //下拉刷新，原有页码上覆盖
					this.list = list
				}else{
					this.list = this.page > 1 ? this.list.concat(list) : list;
				}
				
								
				if (result.length < 10) {
					this.loadText = '没有更多数据了';
				} else {
					this.loadText = '上拉加载更多';
				}
				this.isSearch = true;
				uni.hideLoading();
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
		}
	}
</script>

<style>

</style>
