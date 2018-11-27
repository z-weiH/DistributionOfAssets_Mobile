import Vue from "vue";
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// import { LoadingPlugin } from 'vux'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


// 将Vue.use使用判断条件,生产环境不要使用Vue.use(Router)
// if (process.env.NODE_ENV === 'development') {
Vue.use(Vuex)
Vue.use(VueRouter)
// }
// Vue.use(LoadingPlugin)


const Empty = () => import('@/views/auth/empty')

const routes = [
	{
		path: '/',
		component: Empty,
		meta: {
			keepAlive: false,
			requireAuth: true,
		},
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