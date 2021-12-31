<template>
	<view class="detail-wrap">
		<detail-info :item="item"></detail-info>
		
		<view class="u-comment-title">最新评论 {{comment.count}}</view>
		<!-- 评论列表 子评论紧贴父评论后面 -->
		<view class="uni-comment u-comment">
			<block v-for="(item,index) in comment.list" :key="index">
				<comment-list :item="item" :index="index"></comment-list>
			</block>
		</view>
		
		<!-- 底部输入框 -->
		<user-input @submit="submit"></user-input>
		
		<!-- 分享 -->
		<share-comp :isShowModel="isShowModel" @close-model="closeModel" :shareData="shareData"></share-comp>
	</view>
</template>

<script>
	import UserInput from '../../components/user-input/user-input.vue'
	import DetailInfo from '../../components/detail-info/detail-info.vue'
	import CommentList from '../../components/detail/comment-list.vue'
	import getTime from '../../common/time.js'
	import ShareComp from '../../components/share/share.vue'
	export default {
		components:{
			DetailInfo,
			CommentList,
			UserInput,
			ShareComp
		},
		data() {
			return {
				// 分享内容
				shareData:{
					title:"",
					content:'',
					url:"",
					titlepic:"",
					shareType:0,
				},
				item: {},
				comment:{
					count:20,
					list:[]
				},
				isShowModel: false
			}
		},
		onLoad(res) {
			let item = JSON.parse(res.item);
			uni.setNavigationBarTitle({
				title: item.title || "详情"
			})
			
			uni.showLoading({
				title: "Loading...",
				mask: true
			})
			
			//请求数据
			this.getData(item)
			this.getcomment()
		},
		onNavigationBarButtonTap(e) {
			// console.log(e.index)
			if(e.index === 0){
				// uni.showToast({
				// 	title:"你想操作啥？"
				// })
				this.isShowModel = true;
			}else{
				uni.navigateBack({
					delta:1
				})
			}
		},
		methods: {
			initShareData(item){
				this.shareData.title = item.title
				this.shareData.content = item.content
				this.shareData.url = 'https://www.uviewui.com/components/indexList.html'
				this.shareData.titlepic = item.titlePic;
				this.shareData.shareType = 0;
				
			},
			getData(item) {
				
				
				this.item = { //图文
					id: item.id,
					userPic: item.userPic,
					userName: item.userName,
					isguanzhu: item.isguanzhu,
					title: item.title,
					type: item.type, // image 和 video  两种类型
					titlePic: item.titlePic, //封面图
					infoNum: {
						index: item.infoNum.index || 0, //0未顶踩  1顶   2踩
						dingNum: item.infoNum.dingNum || 0,
						caiNum: item.infoNum.caiNum || 0
					},
					// infoNum: item.infoNum,
					commentNum: item.commentNum,
					shareName: item.shareName,
					//下面获取 ------
					content: ''  ,
					picList: [],
					sex: 0,
					age: 0,
					create_time: 0
				};
				//获取文章其他内容
				this.getDetails()
				
				//获取评论
				if(item.commentNum){
					this.getcomment()
				}
			},
			async getDetails(){
				let [err, res] = await this.$http.get('/post/'+this.item.id);
				
				//验证错误
				if(this.$http.errorCheck(err, res)){
					uni.hideLoading();
					return
				}
				
				let data = res.data.data.detail;
				//内容 content
				this.item.content = data.content;
				//图片预览列表
				data.images.forEach(item => {
					this.item.picList.push(item.url)
				})
				//年龄性别
				this.item.sex = data.user.userinfo.sex;
				this.item.age = data.user.userinfo.age;
				//创建时间
				this.item.create_time = data.create_time;
				uni.hideLoading();
				
				//初始化加载内容
				this.initShareData(this.item)
			},
			async getcomment(){
				let [err, res] = await this.$http.get('/post/'+this.item.id+ '/comment');
				
				//验证错误
				if(this.$http.errorCheck(err, res)){
					return
				}
				
				let list = res.data.data.list;
				
				this.comment.list = this.comment.list.concat(this.__ArrSort(list))
				
			},
			__ArrSort(arr,id = 0){
				var temp = [],lev=0;
				var forFn = function(arr, id,lev){
					for (var i = 0; i < arr.length; i++) {
						var item = arr[i];
						if (item.fid==id) {
							item.lev=lev;
							temp.push({
								id:item.id,
								fid:item.fid,
								userid:item.user.id,
								userpic:item.user.userpic,
								username:item.user.username,
								time:getTime.gettime.gettime(item.create_time),
								data:item.data,
							});
							forFn(arr,item.id,lev+1);
						}
					}
				};
				forFn(arr, id,lev);
				return temp;
			},
			submit(text){
				let obj = {
					
						id:1,
						fid:0,//父级id
						userpic:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
						username:"小猫咪",
						time:getTime.gettime.gettime(new Date().getTime()),
						data: text,
					
				};
				this.comment.list.push(obj)
				console.log(text)
			},
			closeModel(){
				this.isShowModel = false;
			}
		}
	}
</script>

<style scoped lang="scss">
/* 评论 */	
.u-comment{
	padding: 0 20upx;
}
.u-comment-title{
	padding: 20upx;
	font-size: 30upx;
	font-weight: bold;
}
.detail-wrap {
	padding-bottom: 100upx;
	
	
}
</style>
