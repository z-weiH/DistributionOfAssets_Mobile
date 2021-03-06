import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {
  LoadingPlugin
} from 'vux'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import {runAdGo} from "@/tools/deleteAd";

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
const progressView = () => import('@/views/caseAdvance/progressView')
const caseProgressList = () => import('@/views/caseAdvance/caseProgressList') //新版案件进展列表20190611
const LogPage = () => import('@/views/caseAdvance/LogPage') //20190611-日志查看
const updateCaseAdvance = () => import('@/views/caseAdvance/updateCaseAdvance') //20190612-更新案件进展

/*---------------资产包模块 assetPackage --------------*/
const AssetPackageList = () => import('@/views/assetPackage/assetPackageList')
const AssetPackageDetail = () => import('@/views/assetPackage/assetPackageDetail')

/*---------------我的 mineSys --------------*/
const PersonCenter = () => import('@/views/mineSys/personCenter/')

/*--------------- components --------------*/
const Pview = () => import('@/components/pview') //可缩放图片展示

/*---------------路由请求错误重定向页面模块 redirect --------------*/
const NotFound = () => import('@/views/redirect/notFound/')

const routes = [{
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
    component: Home,
    meta: {
      keepAlive: false,
      requireAuth: true,
      name: 'home',
    },
    children: [
      {
        path: 'assetPackageList',
        name: 'assetPackageList',
        component: AssetPackageList,
        meta: {
          keepAlive: false,
          requireAuth: true,
          title: '资产包',
        },
      },
      {
        path: 'assetPackageDetail',
        name: 'assetPackageDetail',
        component: AssetPackageDetail,
        meta: {
          keepAlive: false,
          requireAuth: true,
          title: '资产包详情',
        },
      },
      {
        path: 'caseAdvanceSortList',
        name: 'caseAdvanceSortList',
        component: CaseAdvanceSortList,
        meta: {
          keepAlive: false,
          requireAuth: true,
          title: '案件进展',
        },
      },
      {
        path: 'caseAdvanceSortList',
        name: 'caseAdvanceSortList',
        component: CaseAdvanceSortList,
        meta: {
          keepAlive: false,
          requireAuth: true,
          title: '案件进展old',
        },
      },
      {
        path: 'caseProgressList',
        name: 'caseProgressList',
        component: caseProgressList,
        meta: {
          keepAlive: false,
          requireAuth: true,
          title: '案件进展',
        },
      },
      {
        path: 'updateCaseAdvance',
        name: 'updateCaseAdvance',
        component: updateCaseAdvance,
        meta: {
          keepAlive: false,
          requireAuth: true,
          title: '更新案件进展',
        },
      },
      {
        path: 'LogPage',
        name: 'LogPage',
        component: LogPage,
        meta: {
          keepAlive: false,
          requireAuth: true,
          handleMenu: false,
          title: '日志详情',
        },
      },
      {
        path: 'changeReqCase',
        name: 'changeReqCase',
        component: ChangeReqCase,
        meta: {
          keepAlive: false,
          requireAuth: true,
          handleMenu: false,
          title: '案件进展',
        },
      },
      {
        path: 'progressView',
        name: 'progressView',
        component: progressView,
        meta: {
          keepAlive: false,
          requireAuth: true,
          handleMenu: false,
          title: '案件进展-查看',
        },
      },
      {
        path: 'personCenter',
        name: 'personCenter',
        component: PersonCenter,
        meta: {
          keepAlive: false,
          requireAuth: true,
          title: '我的',
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
  runAdGo();
  next()
  // console.log(window.location.href)
})

router.afterEach((to, from) => {
  // 从路由的元信息中获取 title 属性
  if (to.matched.some(record => record.meta.title)) {
    let _title = to.meta.title
    document.title = _title
    // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
    // if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    //   const hackIframe = document.createElement('iframe')
    //   hackIframe.style.display = 'none'
    //   hackIframe.src = '/robots.txt?r=' + Math.random()
    //   document.body.appendChild(hackIframe)
    //   setTimeout(_ => {
    //     document.body.removeChild(hackIframe)
    //   }, 300)
    // }
  }
  // console.log(window.location.href)
  NProgress.done()
})

export default router
