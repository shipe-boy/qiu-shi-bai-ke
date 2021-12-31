<template>
	<view class="detail-info-wrap">
		<view class="index-list animated fadeInLeft fast">
			<view class="index-list1 u-f-ac u-f-jsb">
				<view class="image-wrap">
					<image :src="item.userPic" lazy-load></image>
				</view>
				<view class="title-right">
					<view class="t-right-top">
						<view class="user-info">
							{{item.userName}}

							<tag-sex-age :sex="item.sex" :age="item.age"></tag-sex-age>
						</view>
						<view class="u-f-ac" v-show="!isguanzhu" @tap="guanzhu">
							<view class="icon iconfont icon-zengjia"></view>关注
						</view>
					</view>
					<view class="t-right-bot">
						<view class="send-time" v-if="item.create_time">
							{{item.create_time}}
						</view>
					</view>

				</view>
			</view>

			<view class="index-list2">{{item.title}}</view>
			<view class="index-list3 u-f-ajc">
				<!-- 图片封面 -->
				<block v-for="(pic, i) in item.picList" :key="i">
					<image :src="pic" mode="widthFix" lazy-load @tap="imagePreview(i)"></image>
				</block>
				
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
					<view class="u-f-ac" :class="{'active':(infoNum.index==1)}" @tap="commitClick(1)">
						<view class="icon iconfont icon-icon_xiaolian-mian"></view>
						{{infoNum.dingNum}}
					</view>
					<view class="u-f-ac" :class="{'active':(infoNum.index==2)}" @tap="commitClick(2)">
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
	</view>
</template>

<script>
	import TagSexAge from '../common/tag-sex-age.vue'
	export default {
		components: {
			TagSexAge
		},
		props: {
			item: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				isguanzhu: this.item.isguanzhu,
				infoNum: this.item.infoNum
			}
		},
		methods: {
			guanzhu() {
				this.isguanzhu = true
			},
			commitClick(index) {
				if (this.infoNum.index === index) return

				if (index === 1) { //顶
					this.infoNum.dingNum = this.infoNum.dingNum ? ++this.infoNum.dingNum : 1;
					if (this.infoNum.index === 2) {
						this.infoNum.caiNum--;
					}
				} else if (index === 2) { //踩
					this.infoNum.caiNum = this.infoNum.caiNum ? ++this.infoNum.caiNum : 1;
					if (this.infoNum.index === 1) {
						this.infoNum.dingNum--
					}
				}
				this.infoNum.index = index;
			},
			imagePreview(i){
				uni.previewImage({
					current: i,
					urls: this.item.picList,
					loop:true,
					indicator: "default"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.index-list {
		padding: 20upx;
		border-bottom: 1upx solid #EEEEEE;

		.title-right {
			flex: 1;
			display: flex;
			align-items: flex-start;
			justify-content: flex-start;
			flex-direction: column;
			background-color: #fff;

			.t-right-top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				.user-info {
					display: flex;
					align-items: center;
					justify-content: flex-start;
				}
			}
			.t-right-bot{
				.send-time{
					color: #C0C0C0;
					font-size: 24upx;
				}
			}
		}
	}
	.index-list1>view:first-child {
		color: #999999;
	}

	.index-list1>view:first-child image {
		width: 85upx;
		height: 85upx;
		border-radius: 100%;
		margin-right: 10upx;
	}

	.index-list1>view:last-child {
		// background: #F4F4F4;
		border-radius: 5upx;
		padding: 0 10upx;
	}

	.index-list2 {
		padding-left: 20upx;
		padding-right: 20upx;
		padding-top: 15upx;
		font-size: 32upx;
	}

	.index-list3 {
		padding-left: 20upx;
		padding-right: 20upx;
		position: relative;
		padding-top: 15upx;
		// flex-direction: column;
		flex-wrap: wrap;
	}

	.index-list3>image {
		width: 40%;
		border-radius: 20upx;
		margin-bottom: 15upx;
		margin-right: 15upx;
	}

	.index-list4 view {
		color: #999999;
	}

	.index-list4 {
		// padding-left: 90upx;
		padding: 15upx 20upx 15upx 20upx;
	}

	.index-list4>view>view>view,
	.index-list4>view>view:first-child {
		margin-right: 10upx;
	}

	.index-list-play {
		position: absolute;
		font-size: 140upx;
		color: #FFFFFF;
	}

	.index-list-playinfo {
		position: absolute;
		background: rgba(51, 51, 51, 0.72);
		color: #FFFFFF;
		bottom: 8upx;
		right: 8upx;
		border-radius: 40upx;
		font-size: 22upx;
		padding: 0 12upx;
	}

	.index-list4 .active,
	.index-list4 .active>view {
		color: #C5F61C;
	}
</style>
