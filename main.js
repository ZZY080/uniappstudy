import Vue from 'vue'
import App from './App'
import {io} from "socket.io-client"
import {nanoid} from "nanoid"
//mock数据，用于测试接口,注意末尾空一行
import mock from './mock/index.js'
let socket=io("http://192.168.2.214:3000")
Vue.config.productionTip = false
// 把io挂载到vue上便于全局使用
Vue.prototype.io=io
// 把socket挂载到vue上便于全局使用
Vue.prototype.socket=socket
// 把nanoid挂载到vue上便于全局使用
Vue.prototype.nanoid=nanoid
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()




