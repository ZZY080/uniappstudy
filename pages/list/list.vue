<template>
	<view>
		<uni-data-select v-model="value" :localdata="avatarList" @change="change"></uni-data-select>
		<view class="list">
			<view class="item" v-for="(item,index) in uidlist" :key="index" @tap="handleDetail(item)">
				<image src="" class="avatar" mode="aspectFit" />
				<view class="uid">{{item}}</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				value:"https://img1.baidu.com/it/u=1289460199,2163956674&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
				uidlist: [],
				uid: "",
				avatarList: [
			{text:0,value:"https://img1.baidu.com/it/u=1289460199,2163956674&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"},
			{text:1,value:"https://img1.baidu.com/it/u=1289460199,2163956674&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"},
			{text:2,value:"https://img0.baidu.com/it/u=1691000662,1326044609&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"},
			{text:3,value:"https://img1.baidu.com/it/u=1910148263,1243483845&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500"},
			{text:4,value:"https://img1.baidu.com/it/u=1954851291,1342197195&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500"}
			
		
			

		],
			};
		},
		created() {
			// uni.request({
			// 	url: "/getAvatar",
			// 	method: "GET",
			// 	success(res) {
			// 		const avatarlist=res.data.data;
			// 		this.avatarList=[...avatarlist]
			// 		console.log(avatarlist)
			// 	}
			// })
			let uid = uni.getStorageSync("uid");
			this.uid = uid;
			this.socket.emit("pageMounted", {
				uid: this.uid,
			})
			this.socket.on("userObj", (data) => {
				this.uidlist = [...Object.keys(data)].filter((item) => {
					return item != this.uid;
				})
				console.log("userObj", data)
			})
		},
		mounted() {

		},
		destroyed() {
			// this.socket.emit("destroyed",this.uid);
		},
		methods: {
			change(e){
				uni.setStorageSync("avatar",e);
			},
			handleDetail(otheruid) {
				uni.navigateTo({
					url: `/pages/detail/detail?otheruid=${otheruid}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.list {
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;
		padding: 0 30rpx;

		>.item {
			border: 1px solid skyblue;
			padding: 20rpx;
			border-radius: 20rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-bottom: 20rpx;

			>.avatar {
				width: 60rpx;
				height: 60rpx;
				border-radius: 30rpx;
				background-color: skyblue;
				margin-right: 20rpx;
			}

			>.uid {}
		}
	}
</style>