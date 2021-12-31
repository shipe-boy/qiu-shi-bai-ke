<template>
	<view class="user-chart-wrap">

		<!--  -->
		<view class="user-chart-list">
			<scroll-view id="scroll-view" scroll-y="true" :scroll-top="scrollTop" scroll-with-animation :style="{height: scrollStyle.height + 'px'}">
				<block v-for="(item, index) in list" :key="index">
					<view class="user-chart-item">
						
					
					<view v-if="item.formatDate" class="user-chart-time u-f-ajc">
						{{item.formatDate}}
					</view>
					<view class="user-send" :class="{'user-chart-me' : item.isMe}">
						<view class="user-avatar-wrap">
							<image :src="item.userAvatar" mode="widthFix" lazy-load></image>
						</view>
				
						<view class="user-msg-content">
							<template v-if="item.type === 'text'">
								<text class="user-msg">{{item.data}}</text>
							</template>
							<template v-if="item.type === 'img'">
								<image :src="item.data" mode="widthFix" lazy-load></image>
							</template>
						</view>
					</view>
				
				</view></block>
			</scroll-view>
			
		</view>

		<!-- 底部输入框 -->
		<user-input @submit="submit"></user-input>
	</view>
</template>

<script>
	import UserInput from '../../components/user-input/user-input.vue'
	import getTime from '../../common/time.js'
	export default {
		components: {
			UserInput
		},
		data() {
			return {
				scrollStyle: {
					height: 0, //可是高度
					itemHeight: 0 //内容总高度
				},
				scrollTop: 0,
				list: []
			}
		},
		filters:{
			formatDate(time, index){
				// console.log( typeof getTime.gettime.gettime)
				// getChatTime
				let nextTime = 0;
				
				// if(index < this.list.length  - 1){ 
					// nextTime = this.list[index+1].time;
				// }
				//相差事件长了才显示
				return getTime.gettime.getChatTime(time, nextTime)
			}
		},
		onLoad(res) {
			// console.log(res)
			let name = res.username || "无名氏";
			uni.setNavigationBarTitle({
				title: name
			})
			
			let list = [{
						userAvatar: '../../static/demo/userpic/20.jpg',
						isMe: false,
						type: "text",
						time: '1554970014',
						data: '喂，你好'
					},
					{
						userAvatar: '../../static/demo/userpic/19.jpg',
						isMe: true,
						type: "img",
						time: '1564970014',
						data: '../../static/demo/1.jpg'
					},
					{
						userAvatar: '../../static/demo/userpic/19.jpg',
						isMe: true,
						type: "text",
						time: '1564970020',
						data: '全面屏，你买不买'
					},
					{
						userAvatar: '../../static/demo/userpic/20.jpg',
						isMe: false,
						type: "text",
						time: '1564970030',
						data: '我不想买啊'
					},
					{
						userAvatar: '../../static/demo/userpic/19.jpg',
						isMe: true,
						type: "text",
						time: '1564989020',
						data: '你滚吧'
					}
				]
			list.forEach((item, index) => {
				let prevTime = 0;
				
				if(index > 0){ 
					prevTime = list[index-1].time;
				}
				//相差事件长了才显示
				// console.log(index , this.list.length - 1)
				item.formatDate = getTime.gettime.getChatTime(item.time, prevTime)
			})
			this.list = list;
			
			this.initPage()
		},
		onReady() {
			this.scrollToBottom()
		},
		methods: {
			initPage(){
				try{
					//初始化高度
					let res = uni.getSystemInfoSync();
					this.scrollStyle.height = res.windowHeight - uni.upx2px(100)
				}catch(e){
					
				}
			},
			scrollToBottom(){
				let q = uni.createSelectorQuery();
				q.select('#scroll-view').boundingClientRect();
				q.selectAll('.user-chart-item').boundingClientRect();
				q.exec((res) => {
					// console.log(res[1])
					res[1].forEach(item => {
						this.scrollStyle.itemHeight += item.height
					})
					if(this.scrollStyle.itemHeight > this.scrollStyle.height){
						this.scrollTop = this.scrollStyle.itemHeight;
					}
				})
			},
			submit(text) { //text发送的内容
				// console.log(text)
				// 构建数据
				let nowTime = new Date().getTime();
				let prevTime = this.list[this.list.length - 1].time;
				let obj = {
						userAvatar: '../../static/demo/userpic/19.jpg',
						isMe: true,
						type: "text",
						time: nowTime,
						data: text,
						formatDate: getTime.gettime.getChatTime(nowTime, prevTime)
					};
					this.list.push(obj)
					this.$nextTick(() => {
						this.scrollToBottom()
					})
					
				// 模拟
				let diffTime = Math.floor(Math.random() * 8000+ 1000) //0 - 800
				setTimeout(() => {
					let nowTime = new Date().getTime();
					let prevTime = this.list[this.list.length - 1].time;
					let obj1 = {
							userAvatar: '../../static/demo/userpic/20.jpg',
							isMe: false,
							type: "text",
							time: nowTime,
							data: text + ",这是人说的话么？",
							formatDate: getTime.gettime.getChatTime(nowTime, prevTime)
						};
						this.list.push(obj1)
						this.$nextTick(() => {
							this.scrollToBottom()
						})
				},diffTime)
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-chart-wrap {
		padding-bottom: 100upx;
		.user-chart-list {
			background-color: #f5f5f5;
			padding: 0 30upx;
			// min-height: 100vh;
			overflow: hidden;

			.user-chart-time {
				padding: 20upx 0;
				color: #a2a2a2;
				font-size: 24upx;
			}

			.user-send {
				display: flex;
				align-items: flex-start;
				justify-content: flex-start;
				margin-bottom: 30upx;
				margin-top: 20upx;

				&.user-chart-me {
					flex-direction: row-reverse;

					.user-msg-content {
						margin-left: 140upx;
						margin-right: 20upx;

						&::after {
							left: auto;
							right: -30upx;
							top: 40upx;
							border-left-color: #fff;
							border-right-color: transparent;
						}
					}
				}

				.user-avatar-wrap {
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
					overflow: hidden;
					flex-shrink: 0;

					image {
						width: 100%;
					}
				}

				.user-msg-content {
					position: relative;
					background-color: #fff;
					padding: 30upx 25upx;
					margin-left: 20upx;
					border-radius: 20upx;
					margin-right: 140upx;

					image {
						max-width: 150upx;
						height: 200upx;
					}

					&::after {
						position: absolute;
						content: '';
						left: -30upx;
						top: 40upx;
						width: 0;
						height: 0;
						border: 16upx solid #fff;
						border-top-color: transparent;
						border-left-color: transparent;
						border-bottom-color: transparent;
					}
				}
			}
		}
	}
</style>
