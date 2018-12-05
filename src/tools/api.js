import axios from '@/axios'
import Host from '@/axios/host'
import Mock from 'mockjs'
export default {
  install(Vue) {
    Vue.prototype.$api = {
      get(url, params) {
        if (params.mock === 1) {
          return axios
            .get(Host.target + url, { params: params })
            .then(res => {
              return Mock.mock(res.data)
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          return axios
            .get(Host.target + url, {
              params: params,
            })
            .catch(error => {
              console.log(error)
            })
        }
      },
      post(url, params) {
        if (params.mock === 1) {
          return axios
            .get(Host.target + url, { params: params })
            .then(res => {
              return Mock.mock(res.data)
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          return axios.post(Host.target + url, params).catch(error => {
            console.log(error)
          })
        }
      },
      http(url, params) {
        return axios({ method: 'post', url: Host.target + url, data: params }).catch(error => {
          console.log(error)
        })
      },
    }
  },
}
