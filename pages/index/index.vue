<template>
	<view>
		<uni-card title="基础卡片" extra="额外信息">
			<view class="msg-btn">
				<input placeholder="请输入消息" class="msg" v-model="msg" />
				<view class="btn" @tap="handleSend">发送</view>
			</view>
			<view class="list">
				<view :class="['item',item.auth=='my'?'right':'left']" v-for="(item,index) in content">
					<view class="my-row" v-if="item.auth=='other'">
						<image class="avatar" :src="item.avatar"/>
						<view class="username-msg">
							<view class="username">{{item.username}}</view>
							<view class="msg">{{item.msg}}</view>
						</view>
					</view>
					<view class="my-row" v-if="item.auth=='my'">
						<view class="avatar-msg">
							<view class="msg">{{item.msg}}</view>
							<image class="avatar" :src="item.avatar"/>
						</view>
					</view>
				</view>
			</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid:"",
				msg:"",
				content:[
					{uid:"202003021003",username:"曾志远",msg:"123",auth:"my",avatar:"https://img1.baidu.com/it/u=1289460199,2163956674&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"},
					{uid:"202003021004",username:"鞠美玉",msg:"456",auth:"other",avatar:"https://qcloud.dpfile.com/pc/_UK9c4BIC6USN8sq9AkluaI2ArT6Y6R1DYrnglkJyciZ3ExvpEBleuSip6Fydw3fTYGVDmosZWTLal1WbWRW3A.jpg"},
				],
				
			};
		},
		created(){
			let uid=uni.getStorageSync("uid");
			this.uid=uid;
		},
		mounted() {
			this.socket.emit("enterPage", {
				msg: "你好我是客户端，我进入聊天页面了！",
				uid: this.uid,
			})
			this.socket.on("enterPageAfterMsg", (data) => {
				console.log(data);
			})
			this.socket.on("talkMsg", (data) => {
				console.log(data);
				
			})
		},
		methods: {
			handleSend(){
				let data={uid:this.uid,msg:this.message}
				this.socket.emit("sendMsg",data);
			}
		}

	}
</script>

<style lang="scss">
	.uni-card{
		background-color: #f5f5f5;
	}
	.msg-btn {
		display: flex;
		flex-direction: row;
		align-items: center;
		>.msg {
			flex: 1;
			border: 1px solid skyblue;
			padding: 7px 0 7px 6px;
			border-radius: 5px;
			margin-right: 10px;
		}
		>.btn {
			background-color: skyblue;
			color:white;
			padding: 7px 9px;
			border-radius: 6px;
			&:active {
				opacity: 0.1;
			}
		}
	}
	
	
	.list{
		margin-top: 40rpx;
		display: flex;
		flex-direction: column;
		>.item {
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		>.item.left{
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
				>.username-msg{
					.username {
						
					}
					.msg {
						background-color: #fff;
						padding: 10rpx ;
						border-radius: 10rpx;
						margin-top: 10rpx;
					}
				}
			}
		}
		>.item.right {
			justify-content: flex-end;
			>.my-row{
				display: flex;
				flex-direction: row;
				align-items: center;
				>.avatar-msg{
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
						padding: 10rpx ;
						border-radius: 10rpx;
						margin-top: 10rpx;
						margin-right: 10rpx;
					}
				}
			}
		}
	}
</style>