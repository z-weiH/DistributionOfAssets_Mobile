import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import Axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations: mutations,
  strict: debug
}) // 这里你可能已经有其他 module

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
    ajaxIsLoading: false
  },
  mutations: {
    ajaxStar(state) {
      state.ajaxIsLoading = true
    },
    ajaxEnd(state) {
      state.ajaxIsLoading = false
    }
  },
  getter: {
    ajaxIsLoading: state => state.ajaxIsLoading
  }
})

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {
    isLoading: true
  })
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {
    isLoading: false
  })
})

export default store;
