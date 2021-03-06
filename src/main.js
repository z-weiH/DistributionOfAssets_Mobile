// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import errorHandle from './tools/errorHandle'
import filters from './tools/filters'
import './tools/utils'
import store from "./tools/loading";

//封装好的有拦截器的axios：this.$http
// import packedAxios from './axios/http'
//使用this.$http代替封装好的axios
// Vue.use(packedAxios)
import "./axios";
import axios from "axios";
Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.withCredentials = true;

let VueTouch = require('vue-touch')
Vue.use(VueTouch, {
  name: 'v-touch'
})
import {
  SearchBar,
  SearchContext,
  Scroller,
  SlimPopup,
  SearchBarDropDown
} from '@/components'

Vue.use(SlimPopup).use(SearchBar).use(SearchContext).use(Scroller).use(SearchBarDropDown);

/* end */

import Vtip from 'vtip'
import 'vtip/lib/index.min.css'
// 注册指令使用
Vue.use(Vtip.directive)

// 工具函数调用
Vue.prototype.$tip = Vtip.tip


import {
  WechatPlugin
} from 'vux'
Vue.use(WechatPlugin)
// console.log(Vue.wechat) // 可以直接访问 wx 对象。
/* eslint-disable no-unused-vars */
// import Vconsole from 'vconsole';
// const _win = window
// _win.vConsole = new Vconsole()

import {
  ToastPlugin,
  XButton,
  XInput,
  Previewer,
  TransferDom,
  Box,
  Toast,
  Alert,
  AlertPlugin,
  ConfirmPlugin,
  Countdown,
  Loading
} from 'vux'



// 图片上传
// import uploader from 'vue-easy-uploader'
// let store = new Vuex.Store({})
// Vue.use(uploader, store)

// var fundebug = require("fundebug-javascript");
// fundebug.apikey = "120bf008cd37cc0e1333d94f18b0ae085404edef37f5be01b85e47086ba566dd";

// // 微信第三方js错误监控 插件fundebug
// function formatComponentName(vm) {
//   if (vm.$root === vm) return "root";

//   var name = vm._isVue ?
//     (vm.$options && vm.$options.name) ||
//     (vm.$options && vm.$options._componentTag) :
//     vm.name;
//   return (
//     (name ? "component <" + name + ">" : "anonymous component") +
//     (vm._isVue && vm.$options && vm.$options.__file ?
//       " at " + (vm.$options && vm.$options.__file) :
//       "")
//   );
// }

// Vue.config.errorHandler = function (err, vm, info) {
//   if (vm) {
//     var componentName = formatComponentName(vm);
//     var propsData = vm.$options && vm.$options.propsData;
//     fundebug.notifyError(err, {
//       metaData: {
//         componentName: componentName,
//         propsData: propsData,
//         info: info
//       }
//     });
//   } else {
//     fundebug.notifyError(err);
//   }
// };

require('animate.css/animate.min.css')

Vue.directive('transfer-dom', TransferDom)
Vue.component('box', Box)
Vue.component('x-button', XButton)
Vue.component('toast', Toast)
Vue.component('alert', Alert)
Vue.component('countdown', Countdown)
Vue.component('loading', Loading)
Vue.use(ConfirmPlugin)


// if (process.env.NODE_ENV === 'development') {
Vue.use(Vuex)
// }

import Dialog from '@/components/dialog/';

Vue.prototype.$dialog = Dialog;


FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.use(ToastPlugin, {
  type: 'text',
  position: 'top',
  width: '80vw',
  time: 3000
})
Vue.use(AlertPlugin)
Vue.use(errorHandle)
Vue.use(filters)


Vue.component('x-input', XInput)
Vue.component('previewer', Previewer)

/* eslint-disable no-new */
Vue.prototype.instance = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
