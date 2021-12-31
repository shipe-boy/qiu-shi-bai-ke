<template>
	<view>
		<!-- 自定义导航栏 -->
		<uni-nav-bar left-icon="arrowleft" @clickLeft="back" :statusBar="true" rightText="发布" @clickRight="submit">
			<!-- 标题插槽 -->
			<view class="u-f-ajc title-slot" @tap="toggleLook">
				{{lookLevelText}}
				<view class="icon iconfont icon-xialazhankai"></view>
			</view>
		</uni-nav-bar>

		<!-- 多行输入框 -->
		<view class="uni-textarea">
			<textarea v-model="text" placeholder="说一句话吧~~~" />
		</view>

		<!-- 上传图片 多张 -->
		<upload-image @upload="upload"></upload-image>

		<!-- 弹出框 -->
		<uni-popup id="popupMessage" ref="popupMessage" type="center">
			<view class="gonggao">
				<view class="u-f-ajc">
					<image src="../../static/common/addinput.png" mode="widthFix"></image>
				</view>
				<view class="">
					1、涉及黄色、政治、及骚扰信息
				</view>
				<view class="">
					1、涉及黄色、政治、及骚扰信息
				</view>
				<view class="">
					1、涉及黄色、政治、及骚扰信息
				</view>
				<view class="">
					1、涉及黄色、政治、及骚扰信息
				</view>
				<button type="default" @tap="hidePopup">朕知道了</button>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import UniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue'
	import UploadImage from '../../components/upload-images/upload-images.vue'
	import UniPopup from '../../components/uni-popup/uni-popup.vue'
	import UniPopupMessage from '../../components/uni-popup-message/uni-popup-message.vue'
	export default {
		components: {
			UniNavBar,
			UploadImage,
			UniPopup,
			UniPopupMessage
		},
		data() {
			return {
				lookLevelText: '所有人可见',
				text: '',
				imageList: [],
				isFirstBack: true
			}
		},
		onReady() {
			// 页面打开自动打开对话框
			setTimeout(() => {
				this.$refs.popupMessage.open()
			}, 500)
		},
		onBackPress() { //监听页面返回
			if(this.text || this.imageList.length){ //有值
				if (this.isFirstBack) {
					this.save()
					return true
				}
			}
		
			
		},
		methods: {
			save(){ //保存为草稿
				uni.showModal({
					content: "是否保存为草稿",
					cancelText: "不保存",
					confirmText: "保存",
					success: (res) => {
						if (res.confirm) {
							console.log("保存")
						} else { //不保存
							console.log("不保存")
						}
						this.isFirstBack = false;
						uni.navigateBack({
							delta: 1
						})
					}
				})
			},
			back() { //左侧返回事件
				uni.navigateBack({
					delta: 1
				})
			},
			submit() {
				uni.showToast({
					title: "发布成功"
				})
			},
			toggleLook() {
				let lookLevel = ['所有人可见', '仅自己可见', '仅关注的人可见'];
				uni.showActionSheet({
					itemList: lookLevel,
					success: (res) => {
						// console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						// console.log(lookLevel[res.tapIndex])
						this.lookLevelText = lookLevel[res.tapIndex]
					},
				});
			},
			upload(imageList) {
				this.imageList = imageList;
			},
			hidePopup(e) {
				this.$refs.popupMessage.close()
			},
		}
	}
</script>

<style scoped lang="scss">
	.title-slot {
		width: 100%;
	}

	.uni-textarea {
		border: 1px solid #eee;
	}

	.gonggao {
		background-color: #fff;
		padding: 20upx;

		image {
			width: 50%;
			margin-bottom: 20upx;
		}

		button {
			background-color: #ffe934;
			margin-top: 20upx;
		}
	}
</style>
