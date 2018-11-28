import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { LoadingPlugin } from 'vux'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 将Vue.use使用判断条件,生产环境不要使用Vue.use(Router)
// if (process.env.NODE_ENV === 'development') {
Vue.use(Vuex)
Vue.use(VueRouter)
// }

Vue.use(LoadingPlugin)

const store = new Vuex.Store({}) // 这里你可能已经有其他 module

store.registerModule('myVux', {
  // 名字自己定义
  state: {
    isLoading: false,
  },
  mutations: {
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading
    },
  },
})
/*--------------- 微信授权 --------------*/
const Empty = () => import('@/views/auth/empty')

/*---------------帐号登陆管理模块 auth --------------*/
const Login = () => import('@/views/auth/login')
const AuthCode = () => import('@/views/auth/authCode')
const ResetInfo = () => import('@/views/auth/resetInfo')
const ResetPwd = () => import('@/views/auth/resetPwd')

/*---------------导航模块 navigate --------------*/
const Home = () => import('@/views/navigate/home')
/*---------------  --------------*/

/*---------------案件进展 caseAdvance --------------*/
const CaseAdvanceSortList = () => import('@/views/caseAdvance/caseAdvanceSortList')
const ChangeReqCase = () => import('@/views/caseAdvance/changeReqCase')

/*---------------资产包模块 assetPackage --------------*/
const AssetPackageList = () => import('@/views/assetPackage/assetPackageList')
const AssetPackageDetail = () => import('@/views/assetPackage/assetPackageDetail')

/*---------------我的 mineSys --------------*/
const PersonCenter = () => import('@/views/mineSys/personCenter/')

/*--------------- components --------------*/
const Pview = () => import('@/components/pview') //可缩放图片展示

/*---------------路由请求错误重定向页面模块 redirect --------------*/
const NotFound = () => import('@/views/redirect/notFound/')

const routes = [
  {
    path: '/',
    component: Empty,
    meta: {
      keepAlive: false,
      requireAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      keepAlive: false,
      requireAuth: true,
      title: '账号登录',
    },
  },
  {
    path: '/authCode',
    name: 'authCode',
    component: AuthCode,
    meta: {
      keepAlive: false,
      requireAuth: true,
      title: '忘记密码',
    },
  },
  {
    path: '/resetInfo',
    name: 'resetInfo',
    component: ResetInfo,
    meta: {
      keepAlive: false,
      requireAuth: true,
      title: '修改密码',
    },
  },
  {
    path: '/resetPwd',
    name: 'resetPwd',
    component: ResetPwd,
    meta: {
      keepAlive: false,
      requireAuth: true,
      title: '重置密码',
    },
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      keepAlive: false,
      requireAuth: true,
    },
    children: [
      {
        path: 'assetPackageList',
        // name: 'assetPackageList',
        component: AssetPackageList,
        meta: {
          keepAlive: false,
          requireAuth: true,
          title:'资产包'
        },
      },
      {
        path: 'assetPackageDetail',
        // name: 'assetPackageDetail',
        component: AssetPackageDetail,
        meta: {
          keepAlive: false,
          requireAuth: true,
        },
      },
      {
        path: 'caseAdvanceSortList',
        // name: 'caseAdvanceSortList',
        component: CaseAdvanceSortList,
        meta: {
          keepAlive: false,
          requireAuth: true,
        },
      },
      {
        path: 'changeReqCase',
        // name: 'changeReqCase',
        component: ChangeReqCase,
        meta: {
          keepAlive: false,
          requireAuth: true,
        },
      },
      {
        path: 'personCenter',
        // name: 'personCenter',
        component: PersonCenter,
        meta: {
          keepAlive: false,
          requireAuth: true,
        },
      },
    ],
  },
  {
    path: '/pview/:caseId',
    name: 'pview',
    component: Pview,
    meta: {
      keepAlive: false,
      requireAuth: true,
    },
  },
  {
    path: '/404',
    component: NotFound,
    meta: {
      keepAlive: true,
      title: '页面不存在',
    },
  },
  {
    path: '*',
    redirect: '/404',
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes,
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
  // console.log(window.location.href)
})

router.afterEach((to, from) => {
  // 从路由的元信息中获取 title 属性
  if (to.matched.some(record => record.meta.title)) {
    let _title = to.matched[0].meta.title
    document.title = _title
    // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
    if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      const hackIframe = document.createElement('iframe')
      hackIframe.style.display = 'none'
      hackIframe.src = '/robots.txt?r=' + Math.random()
      document.body.appendChild(hackIframe)
      setTimeout(_ => {
        document.body.removeChild(hackIframe)
      }, 300)
    }
  }
  // console.log(window.location.href)
  NProgress.done()
})

export default router
