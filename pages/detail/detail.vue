<template>
	<view>
		<uni-card title="基础卡片" extra="额外信息">
			<view class="list">
				<view :class="['item',item.auth=='my'?'right':'left']" v-for="(item,index) in content" :key="index">
					<view class="my-row" v-if="item.auth=='other'">
						<image class="avatar" :src="item.avatar" />
						<view class="username-msg">
							<view class="username">{{item.username}}</view>
							<view class="msg">{{item.msg}}</view>
						</view>
					</view>
					<view class="my-row" v-if="item.auth=='my'">
						<view class="avatar-msg">
							<view class="msg">{{item.msg}}</view>
							<image class="avatar" :src="item.avatar" />
						</view>
					</view>
				</view>
			</view>
			<view class="msg-btn">
				<input placeholder="请输入消息" class="msg" v-model="msg" />
				<view class="btn" @tap="handleSend">发送</view>
			</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid: "",
				otheruid: "",
				msg: "",
				avatar:"",
				content: [],

			};
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.otheruid=option.otheruid
		},
		created() {
			let uid = uni.getStorageSync("uid");
			let avatar=uni.getStorageSync("avatar");
			this.uid = uid;
			this.avatar=avatar;
		},
		mounted() {
			this.socket.on("talkMsg", (data) => {
				let singlemsg = {
					uid: data.otheruid,
					username: "zzy2",
					msg: data.msg,
					auth: "other",
					avatar: data.avatar,
					otheruid:this.uid,
				}
				this.content = [...this.content, singlemsg];
			})
		},
		methods: {
			handleSend() {
				let singlemsg = {
					uid: this.uid,
					username: "zzy1",
					msg: this.msg,
					auth: "my",
					avatar: this.avatar,
					otheruid:this.otheruid,	
				}
				this.content = [...this.content, singlemsg];
				this.socket.emit("sendMsg", singlemsg);
				this.msg = "";
			}
		}

	}
</script>

<style lang="scss">
	.uni-card {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #f5f5f5;
	}

	.msg-btn {
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: center;

		>.msg {
			// flex: 1;
			border: 1px solid skyblue;
			padding: 7px 0 7px 6px;
			border-radius: 5px;
			margin-right: 10px;
		}

		>.btn {
			background-color: skyblue;
			color: white;
			padding: 7px 9px;
			border-radius: 6px;

			&:active {
				opacity: 0.1;
			}
		}
	}


	.list {
		height: 50vh;
		overflow: auto;
		margin-top: 40rpx;
		display: flex;
		flex-direction: column;

		>.item {
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		>.item.left {
			justify-content: flex-start;

			>.my-row {
				display: flex;
				flex-direction: row;
				align-items: flex-start;

				>.avatar {
					width: 60rpx;
					height: 60rpx;
					border-radius: 20rpx;
					margin-right: 10rpx;
					object-fit: cover;
				}

				>.username-msg {
					.username {}

					.msg {
						background-color: #fff;
						padding: 10rpx;
						border-radius: 10rpx;
						margin-top: 10rpx;
					}
				}
			}
		}

		>.item.right {
			justify-content: flex-end;

			>.my-row {
				display: flex;
				flex-direction: row;
				align-items: center;

				>.avatar-msg {
					display: flex;
					flex-direction: row;
					align-items: center;

					.avatar {
						width: 60rpx;
						height: 60rpx;
						border-radius: 20rpx;
						object-fit: cover;
					}

					.msg {
						background-color: #fff;
						padding: 10rpx;
						border-radius: 10rpx;
						margin-top: 10rpx;
						margin-right: 10rpx;
					}
				}
			}
		}
	}
</style>