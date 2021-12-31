<template>
	<view class="user-info">

		<view class="user-info-list">
			<view class="info-list-item u-f-ac u-f-jsb" v-for="(item, index) in userInfoList" :key="index">
				<view class="info-list-name">
					{{item.name}}
				</view>
				<view class="info-list-value u-f-ac">
					<template v-if="item.type == 'image'">
						<image :src="item.value" mode="aspectFill" lazy-load></image>
					</template>
					<template v-else-if="item.type == 'text'">
						<view v-show="!item.isEdit">{{item.value}}</view>
						<input v-show="item.isEdit" class="edit-value" type="text" v-model="item.value" />
					</template>
					<template v-else-if="item.type == 'pickerDate'">

						<picker mode="date" :value="item.value" :start="startDate" :end="endDate"
							@change="bindDateChange">
							<view>{{item.value}}</view>
						</picker>
					</template>
					<template v-else-if="item.type == 'pickerRegion'">
						<view>{{item.value | areaFilter}}</view>
						<u-picker mode="region" v-model="item.show" :default-region="item.value"  @confirm="regionSubmit"></u-picker>
					</template>
					<view class="icon iconfont icon-bianji1" @tap="editInfo(index)"></view>
				</view>
			</view>
		</view>

		<button type="default" class="user-set-btn" @tap="submit">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfoList: [{
						name: '头像',
						type: 'image',
						value: '../../static/demo/userpic/18.jpg'
					},
					{
						name: '昵称',
						type: 'text',
						value: '王大锤',
						isEdit: false
					},
					{
						name: '性别',
						type: 'text',
						value: '男',
						isEdit: false
					},
					{
						name: '生日',
						type: 'pickerDate',
						value: '1995-11-18',
						isEdit: false
					},
					{
						name: '情感',
						type: 'text',
						value: '未婚',
						isEdit: false
					},
					{
						name: '职业',
						type: 'text',
						value: '偷鸡摸狗',
						isEdit: false
					},
					{
						name: '家乡',
						type: 'pickerRegion',
						value: ['广东省','广州市'],
						isEdit: false,
						show: false
					}
				]
			}
		},
		filters:{
			areaFilter(areaArr){
				return areaArr.join('-')
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			bindDateChange(e) {
				// console.log(e.target.value)
				let dateItem = this.userInfoList.filter(item => item.type == "pickerDate");
				
				dateItem[0].value = e.target.value
				
			},
			regionSubmit(params){
				// console.log(params)
				/* "province": {
					"label": "河南省",
					"value": "41"
				},
				"city": {
					"label": "洛阳市",
					"value": "4103"
				},
				"area": {
					"label": "吉利区",
					"value": "410306"
				} */
				let keys = Object.keys(params)
				let value = []
				keys.forEach(item => {
					value.push(params[item].label)
				})
				let regionItem = this.userInfoList.filter(item => item.type == "pickerRegion");
				
				regionItem[0].value = value;
			},
			editInfo(index) {
				if (index === 0) {
					this.changeAvatar(index)
				} else if (index == 2) { //性别
					let itemList = ["男", "女", '未知'];
					uni.showActionSheet({
						itemList: itemList,
						success: res => {
							// console.log(res)
							this.userInfoList[index].value = itemList[res.tapIndex];
						}
					});
				} else if (index === 3) { //生日

				}else if (index === 6) { //地区
					this.userInfoList[index].show = true;
				} else if (index == 4) { //情感
					let itemList = ["未婚", "已婚", '未知'];
					uni.showActionSheet({
						itemList: itemList,
						success: res => {
							// console.log(res)
							this.userInfoList[index].value = itemList[res.tapIndex];
						}
					});
				} else {
					this.userInfoList[index].isEdit = !this.userInfoList[index].isEdit
				}
			},
			changeAvatar(index) {
				// this.userInfoList[index].data = '../../static/demo/userpic/18.jpg'
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success: (res) => {
						// console.log(JSON.stringify(res.tempFilePaths), res.tempFilePaths[0]);
						// console.log(this.userInfoList)
						this.userInfoList[index].value = res.tempFilePaths[0];
					}
				})
			},
			submit() {
				uni.showToast({
					title: "完成"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-info {
		padding: 20rpx;

		.user-set-btn {
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			color: #3a3a3a;
			background-color: #ffe933;
			margin: 50rpx 30rpx 0;
			border: none !important;
		}

		.user-info-list {

			.info-list-item {
				padding: 20rpx;
				border-bottom: 1rpx solid #f4f4f4;

				&:first-child {
					border-top: 1rpx solid #f4f4f4;
				}

				.info-list-name {
					font-size: 30rpx;

					color: #9b9b9b;
				}

				.info-list-value {
					.edit-value {
						box-sizing: border-box;
						font-size: 30rpx;
						padding: 0rpx 20rpx;
						border: 1rpx solid #eee;
						text-align: right;
					}

					font-weight: bold;

					image {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
					}

					.icon {
						margin-left: 20rpx;
						color: #9b9b9b;
					}
				}
			}

		}
	}
</style>
