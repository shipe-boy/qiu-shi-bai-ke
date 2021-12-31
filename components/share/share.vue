<template>
	<view class="share animated fadeIn faster" v-show="isShowModel">
		<view class="share-model" @tap="closeModel"></view>
		<view class="share-wrap">
			<view class="share-title u-f-ajc">
				分享到
			</view>
			<scroll-view scroll-x="true" class="share-content">
				<view class="share-item" v-for="(item, index) in providerList" :key="index"  @tap="share(item)">
					<view class="icon iconfont" :class="item.icon" hover-class="share-item-hover" :style="{backgroundColor: item.bg}"></view>
					<view class="share-name">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
			
			<view class="share-btn u-f-ajc" hover-class="share-item-hover" @tap="closeModel">
				取消
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"share",
		props:{
			isShowModel: {
				type:Boolean,
				default: false
			},
			shareData: {
				type: Object,
				default:() => {}
			}
		},
		data() {
			return {
				shareList: [
					{
						icon: 'icon-weixin',
						bg: '#2ad198',
						name: "微信"
					},
					{
						icon: 'icon-weixin',
						bg: '#514d4c',
						name: "朋友圈"
					},
					{
						icon: 'icon-xinlangweibo',
						bg: '#ee5e5e',
						name: "微博"
					},
					{
						icon: 'icon-QQ',
						bg: '#4a73ba',
						name: "企鹅"
					},
					{
						icon: 'icon-QQ',
						bg: '#ee5e5e',
						name: "QQ"
					},
					{
						icon: 'icon-xinlangweibo',
						bg: '#ee5e5e',
						name: "微博"
					},
				],
				title: '',
				shareText: '',
				href:"",
				image: '',
				shareType:0, //1 文字  2 图片  0 图文  5小程序
				providerList: []
			};
		},
		watch:{
			shareData: {
				deep: true,
				handler: function(newVal, oldVal) {
					this.title = newVal.title;
					this.shareText = newVal.content;
					this.href = newVal.url;
					this.image = newVal.titlepic;
					this.shareType = newVal.shareType;
				}
			}
		},
		mounted () {
			uni.getProvider({
				service: 'share',
				success: (e) => {
					// console.log('success', e);
					let data = []
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '微信好友',
									id: 'weixin',
									sort:0,
									icon: 'icon-weixin',
									bg: '#2ad198'
								})
								data.push({
									name: '朋友圈',
									id: 'weixin',
									type:'WXSenceTimeline',
									sort:1,
									icon: 'icon-weixin',
									bg: '#514d4c'
								})
								break;
							case 'sinaweibo':
								data.push({
									name: '新浪微博',
									id: 'sinaweibo',
									sort:2,
									icon: 'icon-xinlangweibo',
									bg: '#ee5e5e'
								})
								break;
							case 'qq':
								data.push({
									name: 'QQ',
									id: 'qq',
									sort:3,
									icon: 'icon-QQ',
									bg: '#4a73ba'
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data.sort((x,y) => {
						return x.sort - y.sort
					});
					// console.log(this.providerList)
				},
				fail: (e) => {
					console.log('获取分享通道失败', e);
					uni.showModal({
						content:'获取分享通道失败',
						showCancel:false
					})
				}
			});
		},
		methods:{
			closeModel(){
				this.$emit('close-model')
			},
			async share(e) {
				console.log('分享通道:'+ e.id +'； 分享类型:' + this.shareType);
				
				if(!this.shareText && (this.shareType === 1 || this.shareType === 0)){
					uni.showModal({
						content:'分享内容不能为空',
						showCancel:false
					})
					return;
				}
				
				if(!this.image && (this.shareType === 2 || this.shareType === 0)){
					uni.showModal({
						content:'分享图片不能为空',
						showCancel:false
					})
					return;
				}
				
				let shareOPtions = {
					provider: e.id,
					scene: e.type && e.type === 'WXSenceTimeline' ? 'WXSenceTimeline' : 'WXSceneSession', //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏     
					type: this.shareType,
					success: (e) => {
						// console.log('success', e);
						uni.showModal({
							content: '已分享',
							showCancel:false
						})
					},
					fail: (e) => {
						// console.log('fail', e)
						uni.showModal({
							content: e.errMsg,
							showCancel:false
						})
					},
					complete:function(){
						console.log('分享操作结束!')
					}
				}
				
				switch (this.shareType){
					case 0:
						shareOPtions.summary = this.shareText;
						shareOPtions.imageUrl = this.image;
						shareOPtions.title = this.title;
						shareOPtions.href = this.href;
						break;
					case 1:
						shareOPtions.summary = this.shareText;
						break;
					case 2:
						shareOPtions.imageUrl = this.image;
						break;
					case 5:
						shareOPtions.imageUrl = this.image ? this.image : 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b6304f00-5168-11eb-bd01-97bc1429a9ff.png'
						shareOPtions.title = this.title;
						shareOPtions.miniProgram = {
							id:'gh_33446d7f7a26',
							path:'/pages/tabBar/component/component',
							webUrl:'https://uniapp.dcloud.io',
							type:0
						};
						break;
					default:
						break;
				}
				
				if(shareOPtions.type === 0 && plus.os.name === 'iOS'){//如果是图文分享，且是ios平台，则压缩图片 
					shareOPtions.imageUrl = await this.compress();
				}
				if(shareOPtions.type === 1 && shareOPtions.provider === 'qq'){//如果是分享文字到qq，则必须加上href和title
					shareOPtions.href =  this.href;
					shareOPtions.title = this.title;
				}
				uni.share(shareOPtions);
			},
			compress(){//压缩图片 图文分享要求分享图片大小不能超过20Kb
				console.log('开始压缩');
				let img = this.image;
				return new Promise((res) => {
					var localPath = plus.io.convertAbsoluteFileSystem(img.replace('file://', ''));
					console.log('after' + localPath);
					// 压缩size
					plus.io.resolveLocalFileSystemURL(localPath, (entry) => {
						entry.file((file) => {// 可通过entry对象操作图片 
							console.log('getFile:' + JSON.stringify(file));
							if(file.size > 20480) {// 压缩后size 大于20Kb
								plus.zip.compressImage({
									src: img,
									dst: img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG'),
									width: '10%',
									height: '10%',
									quality: 1,
									overwrite: true
								}, (event) => {
									console.log('success zip****' + event.size);
									let newImg = img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG');
									res(newImg);
								}, function(error) {
									uni.showModal({
										content:'分享图片太大,需要请重新选择图片!',
										showCancel:false
									})
								});
							}
						});
					}, (e) => {
						console.log('Resolve file URL failed: ' + e.message);
						uni.showModal({
							content:'分享图片太大,需要请重新选择图片!',
							showCancel:false
						})
					});
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.share-model{
		position: fixed;
		z-index: 20;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0,0,0,.4);
	}
	.share-wrap{
		position: fixed;
		z-index: 21;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		.share-btn,
		.share-title{
			font-size: 35rpx;
			padding: 25rpx;
		}
		.share-content{
			display: flex;
			align-items: center;
			justify-content: flex-start;
			width: 100%;
			height: 200rpx;
			border-bottom: 1px solid #eee;
			white-space: nowrap;
			.uni-scroll-view-content{
				white-space: nowrap;
			}
			.share-item{
				width: 25%;
				height: 100%;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				
				.icon{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					font-size: 54rpx;
					color: #fff;
					&.share-item-hover{
						background-color: #eee;
					}
				}
				.share-name{
					color: #7a7a7a;
					margin-top: 8rpx;
				}
			}
		}
	}
</style>
