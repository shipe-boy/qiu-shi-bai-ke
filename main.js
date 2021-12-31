import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false;

App.mpType = 'app';

// 挂载全局baseUrl
import config from "./config/config.js"
Vue.prototype.config=config;

//全局请求方法
import request from './config/request.js'
Vue.prototype.$http = request;

//监听网络状态
import lib from "./config/lib.js"
Vue.prototype.lib=lib;

//用户权限验证
import UserRule from './config/user.js'
Vue.prototype.userRule = UserRule;


// UI
import uView from "uview-ui";
Vue.use(uView);


const app = new Vue({
    ...App
})
app.$mount()
