// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'babel-polyfill'
import router from './router'
// import  "jquery"
import $ from 'jquery'


// ----------------------------------------------element.js配置---------------------------------------------------------
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// -------------------------------------------字体库font-awesome的配置--------------------------------------------------
import 'font-awesome/css/font-awesome.css'
Vue.use(animate)

//-------------------------------------------组件切换动画的配置---------------------------------------------------------
import animate from 'animate.css'


//-------------------------------------------Vuex数据共享的配置---------------------------------------------------------
import vuex from 'vuex'
Vue.use(vuex)
import store from './vuex/store.js'


//-------------------------------------------axios获取数据的配置--------------------------------------------------------
import  Axios from "axios";

//------------------------------------------vue实现跨域（反向代理）-----------------------------------------------------
Vue.prototype.HOST='/api'
Vue.prototype.axios=Axios;
// Axios.defaults.headers.post['Content-Type']='application/json;chartset=UTF-8';
Axios.defaults.baseURL='http://192.168.0.123:8089/'

//----------------------------------------------使用echarts的配置--------------------------------------------------------
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//----------------------------------------------host地址-----------------------------------------------------
Vue.prototype.HOST='http://192.168.0.123:8089/api'

Vue.config.productionTip = false

//-----------------------------------------------引入qs模块--------------------------------------
import qs  from 'qs'
Vue.prototype.$qs=qs
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
