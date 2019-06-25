import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import Axios from 'axios'
Vue.use(Vuex)

// const store = new Vuex.Store({
//   state,
//   getters,
//   actions,
//   mutations: mutations,
//   strict: debug
// }) // 这里你可能已经有其他 module
const store = new Vuex.Store({
})

Axios.interceptors.request.use(config => {
  console.log('ajax begin request')
  store.commit('ajaxStar')
  return config;
})

Axios.interceptors.response.use(config => {
  console.log('ajax get response')
  store.commit('ajaxEnd')
  return config
})
store.registerModule('myVux', { // 名字自己定义
  state: {
    isLoading: false
  },
  mutations: {
    ajaxStar(state) {
      state.isLoading = true
    },
    ajaxEnd(state) {
      state.isLoading = false
    },
    updateLoadingStatus(state,obj){
      // console.log('ssss',obj,state)
      state.isLoading = obj.isLoading
    }
  },
  getter: {
    isLoading: state => state.isLoading
  }
})

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {
    isLoading: true
  })
  console.log("router-before--->updateLoadingStatus");
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {
    isLoading: false
  })
  console.log("router-after--->updateLoadingStatus");
})

export default store;
