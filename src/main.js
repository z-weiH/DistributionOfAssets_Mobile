import 'amfe-flexible/index.js';
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./tools/api";

Vue.config.productionTip = false;


const env = process.env.NODE_ENV === "production" ? true : false; //生产环境和开发环境
Vue.config.silent = env ? true : false; //取消 Vue 所有的日志与警告。
Vue.config.productionTip = env ? true : false; //设置为 false 以阻止 vue 在启动时生成生产提示。
// Vue.prototype.$api = api; //全局绑定axios方法

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
