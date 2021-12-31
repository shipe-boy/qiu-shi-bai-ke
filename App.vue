<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 网路监听（用户目前断网，切换wifi）
			this.lib.NetWork.On();
			// 更新检测
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* ui */
	@import "uview-ui/index.scss";
	
	/*每个页面公共css */
	@import "./common/uni.css";
	
	/* icon  ~@/common/font/ */
	@import "./common/font/icon.css";
	
	/* 动画库 */
	@import "./common/animate.css";
	
	/* flex */
	@import "./common/common.css";
</style>
