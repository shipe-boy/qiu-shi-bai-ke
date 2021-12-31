<template>
	<view class="common-list u-f animated fadeIn fast">
		<view class="common-list-l">
			<!-- mode="widthFix" -->
			<image :src="item.userPic"  lazy-load></image>
		</view>
		<view class="common-list-r">
			<view class="u-f-ac u-f-jsb">
				<view class="u-f-ac">
					{{item.userName}} 
					
					<tag-sex-age :sex="item.sex" :age="item.age"></tag-sex-age>
				</view>
				<view v-show="!isguanzhu"  @tap="toggleGuanzhu"
				class="icon iconfont icon-zengjia">关注</view>
			</view>
			<view>{{item.title}}</view>
			<view class="u-f-ajc">
				<!-- 图片 -->
				<template v-if="item.titlePic">
					<image :src="item.titlePic" 
					mode="widthFix" 
					lazy-load></image>
				</template>
				
				<!-- 视频 -->
				<template v-if="item.video">
					<view class="common-list-play icon iconfont icon-bofang">
					</view>
					<view class="common-list-playinfo">
						{{item.video.lookNum}} 次播放 {{item.video.time}}
					</view>
				</template>
				<!-- 分享 -->
				<view class="common-list-share u-f-ac" v-if="item.share">
					<image :src="item.share.titlePic" 
					mode="widthFix" lazy-load></image>
					<view style="flex: 1;">{{item.share.title}}</view>
				</view>
			</view>
			<view class="u-f-ac u-f-jsb">
				<view>{{item.address}}</view>
				<view class="u-f-ac">
					<view class="icon iconfont icon-zhuanfa">
					{{item.shareNum}}</view>
					<view class="icon iconfont icon-pinglun1">
					{{item.commentNum}}</view>
					<view class="icon iconfont icon-dianzan1">
					{{item.goodNum}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tagSexAge from "./tag-sex-age.vue"
	export default {
		components:{
			tagSexAge
		},
		props: {
			item: {
				type:Object,
				default: () => {}
			}
		},
		data(){
			return {
				isguanzhu: this.item.isguanzhu
			}
		},
		methods:{
			toggleGuanzhu(){
				this.isguanzhu = true;
				uni.showToast({
					title: '关注成功'
				})
			}
		}
	}
</script>

<style scoped>
@import "../../common/list.css";
</style>
