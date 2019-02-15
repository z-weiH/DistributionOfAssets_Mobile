import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import Host from './host'
import router from '../router'

const Axios = axios.create({
  // baseURL: '/', // 基础URL Host.target 本地调试时开启
  timeout: 10000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  // 'Content-Type': 'application/json;charset=utf-8',
  }
})
// 本地
// let _openId = 'oIXMh1WTDzb_n4DB5Lt7Vm-gy0MY' || 'oIXMh1VEa5aVgPbCEHCshFT7t19I'
// 线上 测试
// let _openId = 'oIXMh1WTDzb_n4DB5Lt7Vm-gy0MY'  //oIXMh1SNx49YZZfjVNLdzVejcrXE

// POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (config.method === 'post' && config.mheaders !== true) {
      // 序列化
      // config.data = qs.stringify(config.data)
      // config.data = JSON.stringify(config.data)
      // 温馨提示,若是贵公司的提交能直接接受json 格式,可以不用 qs 来序列化的
      // 序列化
      let _openId = localStorage.getItem('currentOpenId')
      console.log('config.data', config.data)
      config.data = config.data || {}
      if (_openId) {
        config.data.token = _openId
      }
      config.data = qs.stringify(config.data)
    }
    // 若是有做鉴权token , 就给头部带上token
    // 若是需要跨站点,存放到 cookie 会好一点,限制也没那么多,有些浏览环境限制了 localstorage 的使用
    // if (localStorage.token) {
    //   config.headers.Authorization = localStorage.token
    // }

    // 如果是文件上传类型
    if (config.data.constructor.name === 'FormData' && config.mheaders === true) {
      config.data.append('token', localStorage.getItem('currentOpenId'))
    }

    return config
  },
  error => {
    // error 的回调信息,看贵公司的定义
    Vue.prototype.instance.$vux.toast.show(error && error.data.description)
    return Promise.reject(error)
  }
)

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    // 对响应数据做些事
    // if (res.data && !res.data.success) {
    //   return Promise.reject(res.data.error)
    // }

    return res
  },
  error => {
    // console.log(error)
    if (error.data) {
      switch (error.data.code) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          // store.commit("del_token")
          router.push({
            path: '/', // /login
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
      }
    }
    // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
    // 直接丢localStorage或者sessionStorage
    if (!window.localStorage.getItem('currentOpenId')) {
      // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
      this.$router.push({
        path: '/'
      }) // /login
    } else {
      // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
      // 乖乖的返回去登录页重新登录
      let lifeTime = JSON.parse(window.localStorage.getItem('currentOpenId')).lifeTime * 1000
      let nowTime = new Date().getTime() // 当前时间的时间戳
      console.log(nowTime, lifeTime)
      console.log(nowTime > lifeTime)
      if (nowTime > lifeTime) {
        Vue.prototype.instance.$vux.toast.show('登录状态信息过期,请重新登录"')
        this.$router.push({ path: '/' }) // /login
      } else {
        // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
        // if (error.response.status === 403) {
        //     this.$router.push({
        //         path: "/error/403"
        //     })
        // }
        // if (error.response.status === 500) {
        //     this.$router.push({
        //         path: "/error/500"
        //     })
        // }
        // if (error.response.status === 502) {
        //     this.$router.push({
        //         path: "/error/502"
        //     })
        // }
        // if (error.response.status === 404) {
        //     this.$router.push({
        //         path: "/error/404"
        //     })
        // }
      }
    }
    // 返回 response 里的错误信息
    // let errorInfo = error.data.error ? error.data.error.message : error.data
    // return Promise.reject(errorInfo);error.response.data
    return Promise.reject(error)
  }
)

// 错误处理
Axios.interceptors.response.use(
  res => {
    // 返回结果中不同code情况的处理
    // if (res.data && res.data.code === '1001 ') {
    //   Vue.prototype.instance.$vux.toast.show('参数异常')
    // } else if (res.data && res.data.code === '6667') {
    //   console.log('token失效或错误')
    //   // Vue.prototype.instance.$vux.toast.show('token失效或错误')
    // } else if (res.data && res.data.code === '2001') {
    //   Vue.prototype.instance.$vux.toast.show('业务异常')
    // } else if (res.data && res.data.code === '2001') {
    //   Vue.prototype.instance.$vux.toast.show('系统异常')
    // }
    // if(res.data.code !== '0000') {
    //   return Promise.reject(res)
    // }
    if (res.data.code !== '0000') {
      console.log('--------', res.data.code)
      return Promise.reject(res) && Vue.prototype.instance.$vux.toast.show(res.data.description)
    }
    return res
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break
        case 403:
          err.message = '网络异常，请稍后重试[403]'
          break
        case 404:
          err.message = '请求地址不存在'
          break
        case 408:
          err.message = '网络异常，请稍后重试[408]'
          break
        case 500:
          err.message = '网络异常，请稍后重试[500]'
          break
        case 501:
          err.message = '网络异常，请稍后重试[501]'
          break
        case 502:
          err.message = '网络异常，请稍后重试[502]'
          break
        case 503:
          err.message = '网络异常，请稍后重试[503]'
          break
        case 504:
          err.message = '网络异常，请稍后重试[504]'
          break
        case 505:
          err.message = '网络异常，请稍后重试[505]'
          break
        default:
      }
    } else {
      err.message = '网络异常，请稍后重试'
    }

    Vue.prototype.instance.$vux.toast.show(err.message)
    // this.$vux.loading.hide()
    return Promise.reject(err)
  }
)

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function (Vue, Option) {
    Object.defineProperty(Vue.prototype, '$http', { value: Axios })
  }
}
