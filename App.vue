<script>
	export default {
		onLaunch: function() {
			// console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上1！')
		},
		onShow: function() {
			
			uni.setStorageSync('uid', this.nanoid())
		},
		onHide: function() {
			
		}
	}
</script>

<style lang="scss">
	@import "@/uni.scss";
	/*每个页面公共css */
	/* #ifndef APP-NVUE */
	page {
		// background-color: $global-background-color;
		font-size: $global-font-size !important; 
	}
	/* #endif */
	.example-info {
		font-size: $global-font-size;
		color: #333;
		padding: 10px;
	}
</style>
