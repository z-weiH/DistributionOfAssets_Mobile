import axios from '@/axios'
import Host from '@/axios/host'
import Vue from 'vue'
Vue.prototype.$http = axios

export default {
  install(Vue) {
    Vue.prototype.$api = {
      get(url, params) {
        return axios.get(Host.target + url, { params: params }).catch(error => {
          console.log(error)
        })
      },
      post(url, params) {
        return axios.post(Host.target + url, params).catch(error => {
          console.log('Host.target-', Host.target + url)
          console.log(error)
        })
      },
      http(url, params) {
        return axios({ method: 'post', url: Host.target + url, data: params }).catch(error => {
          console.log(error)
        })
      },
    }
  },
}
