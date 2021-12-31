<template>
	<view class="index-list animated fadeInLeft fast" @tap="openDetail">
		<view class="index-list1 u-f-ac u-f-jsb">
			<view class="u-f-ac">
				<!-- mode="widthFix"  -->
				<image class="image-avatar" :src="item.userPic" 
				lazy-load></image>
				{{item.userName}}
			</view>
			<view class="u-f-ac" v-show="!isguanzhu" @tap="guanzhu">
				<view class="icon iconfont icon-zengjia"></view>关注
			</view>
		</view>
		<view class="index-list2">{{item.title}}</view>
		<view class="index-list3 u-f-ajc">
			<!-- 图片封面 -->
			<image :src="item.titlePic" 
			mode="widthFix" 
			lazy-load></image>
			<!-- 视频 -->
			<template v-if="item.type=='video'">
				<view class="icon iconfont icon-bofang index-list-play"></view>
				<view class="index-list-playinfo">
					{{item.playNum}}次播放 {{item.times}}
				</view>
			</template>
		</view>
		<view class="index-list4 u-f-ac u-f-jsb">
			<view class="u-f-ac">
				<view class="u-f-ac" :class="{'active':(infoNum.index==1)}"
				@tap.stop="commitClick(1)"
				>
					<view class="icon iconfont icon-icon_xiaolian-mian"></view>
					{{infoNum.dingNum}}
				</view>
				<view class="u-f-ac" :class="{'active':(infoNum.index==2)}"
				@tap.stop="commitClick(2)"
				>
					<view class="icon iconfont icon-kulian"></view>
					{{infoNum.caiNum}}
				</view>
			</view>
			<view class="u-f-ac">
				<view class="u-f-ac">
					<view class="icon iconfont icon-pinglun1"></view>
					{{item.commentNum}}
				</view>
				<view class="u-f-ac">
					<view class="icon iconfont icon-zhuanfa"></view>
					{{item.shareName}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item: {
				type:Object,
				default: () => {}
			},
			index: Number
		},
		data(){
			return {
				isguanzhu: this.item.isguanzhu,
				infoNum: this.item.infoNum
			}
		},
		methods:{
			guanzhu(){
				this.isguanzhu = true;
				// if(!this.item.isguanzhu){
				// 	this.$emit('guanzhu', this.item, true)
				// }
				uni.showToast({
					title:"关注成功"
				})
			},
			commitClick(index){
				if(this.infoNum.index === index) return
				
				// this.$emit('commitClick',this.item, index)
				
				if(index === 1){ //顶
					this.infoNum.dingNum = this.infoNum.dingNum ? ++this.infoNum.dingNum : 1;
					if(this.infoNum.index === 2){
						this.infoNum.caiNum--;
					}
				}else if(index === 2){ //踩
					this.infoNum.caiNum = this.infoNum.caiNum ? ++this.infoNum.caiNum : 1;
					if(this.infoNum.index === 1){
						this.infoNum.dingNum--
					}
				}
				this.infoNum.index = index;
			},
			openDetail(){
				uni.navigateTo({
					url: "../../pages/detail/detail?item=" + JSON.stringify(this.item)
				})
				// uni.navigateTo({
				// 	url: "../../pages/detail/detail?title=" + this.item.title
				// })
			}
		}
	}
</script>

<style scoped lang="scss">
.index-list{
	padding: 20upx;
	border-bottom: 1upx solid #EEEEEE;
}
.index-list1>view:first-child{
	color: #999999;
}
.index-list1>view:first-child .image-avatar{
	width: 85upx;
	height: 85upx;
	border-radius: 50%;
	overflow: hidden;
	margin-right: 10upx;
}
.index-list1>view:last-child{
	background: #F4F4F4;
	border-radius:5upx;
	padding: 0 10upx;
}
.index-list2{
	padding-top: 15upx;
	font-size: 32upx;
}
.index-list3{
	position: relative;
	padding-top: 15upx;
}
.index-list3>image{
	width: 100%;
	border-radius: 20upx;
}
.index-list4 view{
	color: #999999;
}
.index-list4{
	padding: 15upx 0;
}
.index-list4>view>view>view,.index-list4>view>view:first-child{
	margin-right: 10upx;
}
.index-list-play{
	position: absolute;
	font-size: 140upx;
	color: #FFFFFF;
}
.index-list-playinfo{
	position: absolute;
	background: rgba(51, 51, 51, 0.72);
	color: #FFFFFF;
	bottom: 8upx;
	right: 8upx;
	border-radius: 40upx;
	font-size: 22upx;
	padding: 0 12upx;
}
.index-list4 .active,.index-list4 .active>view{
	color: #C5F61C;
}
</style>
