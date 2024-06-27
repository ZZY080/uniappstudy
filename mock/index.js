// mock文件夹下的test.js内容
import Mock from "mockjs"
Mock.mock('/getAvatar', "get", () => {
	return {
		status: 200,
		message: "获取头像成功！",
		data: [
			{value:0,text:"https://img1.baidu.com/it/u=1289460199,2163956674&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"},
			{value:1,text:"https://img1.baidu.com/it/u=1289460199,2163956674&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"},
			{value:2,text:"https://img0.baidu.com/it/u=1691000662,1326044609&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"},
			{value:3,text:"https://img1.baidu.com/it/u=1910148263,1243483845&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500"},
			{value:4,text:"https://img1.baidu.com/it/u=1954851291,1342197195&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500"}
			
		
			

		],
	}
});