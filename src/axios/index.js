import Vue from 'vue'
import Axios from 'axios'
import qs from 'qs'
import store from "@/tools/loading";

Axios.create({
  baseURL: '/', // 因为我本地做了反向代理
  timeout: 10000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
})

// 设置全局请求为ajax请求

// POST传参序列化(添加请求拦截器)
// 默认以 form表单提交 ，
// 增加 mheaders = true 表示以 json格式提交 ，
// 使用 let form = new FormData() 格式则以 FormData 格式提交
Axios.interceptors.request.use(
  config => {
    config.data = config.data || {}
    console.log("config-begin:---------",config);
    // 在发送请求之前做某件事
    if (config.method === 'post' && config.mheaders !== true) {
      // 序列化
      let _openId = localStorage.getItem('currentOpenId')
      // config.data ? config.data : {};
      if (_openId) {
        let newdata = Object.assign(config.data, {
          token: _openId
        })
        config.data = qs.stringify(newdata)
        console.info('config.data-----------', config.data)
      } else {
        config.data = qs.stringify(config.data)
      }
      // 温馨提示,若是贵公司的提交能直接接受json 格式,可以不用 qs 来序列化的
    }

    // 若是有做鉴权token , 就给头部带上token
    // 若是需要跨站点,存放到 cookie 会好一点,限制也没那么多,有些浏览环境限制了 localstorage 的使用
    // 这里localStorage一般是请求成功后我们自行写入到本地的,因为你放在vuex刷新就没了
    // 一些必要的数据写入本地,优先从本地读取
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token
    }
    // 如果是文件上传类型
    if (config.data.constructor.name === 'FormData' && config.mheaders === true) {
      config.data.append('token', localStorage.getItem('currentOpenId'))
    }

    return config
  },
  error => {
    Vue.prototype.instance.$vux.toast.show(error && error.data.description)
    return Promise.reject(error.data.description)
  }
)

// 拦截-有返回结果的数据，根据code回显错误提示
// Axios.interceptors.response.use(res => {
//   if (res.data && res.data.code === '1004') {
//     Vue.prototype.instance.$vux.toast.show('登陆失效')
//   } else if (res.data && res.data.code === '1005') {
//     Vue.prototype.instance.$vux.toast.show('仲裁委未关联')
//   } else if (res.data && res.data.code != '0000') {
//     Vue.prototype.instance.$vux.toast.text(res.data.description)
//   }
//   return res
// })
// 返回状态判断(添加响应拦截器)
// Axios.interceptors.response.use(
//   res => {
//     // 对响应数据做些事
//     if (res.data && res.data.code === '0000') {
//       // Message({
//       //   //  饿了么的消息弹窗组件,类似toast
//       //   showClose: true,
//       //   message: res.data.description.message ?
//       //     res.data.description.message : res.data.description,
//       //   type: 'error'
//       // })
//       return Promise.reject(res.data.description)
//     }
//     return res
//   },
//   error => {
//     // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
//     // 直接丢localStorage或者sessionStorage
//     if (!window.localStorage.getItem('loginUserBaseInfo')) {
//       // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
//       router.push({
//         path: '/login'
//       })
//     } else {
//       // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
//       // 乖乖的返回去登录页重新登录
//       let lifeTime =
//         JSON.parse(window.localStorage.getItem('loginUserBaseInfo')).lifeTime *
//         1000
//       let nowTime = new Date().getTime() // 当前时间的时间戳
//       console.log(nowTime, lifeTime)
//       console.log(nowTime > lifeTime)
//       if (nowTime > lifeTime) {
//         // Message({
//         //   showClose: true,
//         //   message: '登录状态信息过期,请重新登录',
//         //   type: 'error'
//         // })
//         router.push({
//           path: '/login'
//         })
//       } else {
//         // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
//         // if (error.response.status === 403) {
//         //   router.push({
//         //     path: "/error/403"
//         //   });
//         // }
//         // if (error.response.status === 500) {
//         //   router.push({
//         //     path: "/error/500"
//         //   });
//         // }
//         // if (error.response.status === 502) {
//         //   router.push({
//         //     path: "/error/502"
//         //   });
//         // }
//         // if (error.response.status === 404) {
//         //   router.push({
//         //     path: "/error/404"
//         //   });
//         // }
//       }
//     }
//     // 返回 response 里的错误信息
//     let errorInfo = error.data.description ? error.data.description : error.data
//     return Promise.reject(errorInfo)
//   }
// )

// 错误处理
Axios.interceptors.response.use(
  response => {
    console.log("(*********************", response)
    console.log("(*********************", typeof response.data)
    if (typeof response.data === "string") {
      console.log("string*********")
      console.info("string***out*********", eval("(" + response.data + ")"))
      let newJson = eval("(" + response.data + ")");
      response.data = newJson;
    } else if (typeof response.data === "object") {
      console.log("object*********")
      console.log("object***out*********", response.data)
    }

    const result = qs.parse(response).data
    // result.message = ''
    console.log('lanbjie-rrrrrr', result)
    // console.log('错误处理result ', result);
    // stateCode为0表示正常返回数据，其他情况表示有错误，错误信息由message提供
    // switch (result.stateCode) {
    //   case 0:
    //     return result.data
    //   case 1:
    //     // 没有登录
    //     break
    //   case 2:
    //     // 其他错误
    //     break
    //   default:
    //     break
    // }
    // const err = Object.create({})
    // // const err = result
    // err.data = result
    // err.response = response
    if (result.code !== '0000') {
      Vue.prototype.instance.$vux.toast.show(result.description)
      return Promise.reject(result);
    }
    // throw err
    console.log(response, result, 'response')
    return response
  },
  err => {
    console.log(err, 'err');
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
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
      store.commit('updateLoadingStatus', {
        isLoading: false
      })
    } else {
      err.message = '网络异常，请稍后重试'
    }

    Vue.prototype.instance.$vux.toast.show(err.message)
    return Promise.reject(err)
  }
)

export default Axios
