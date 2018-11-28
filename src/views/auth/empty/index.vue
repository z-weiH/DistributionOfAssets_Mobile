<template>
 <div class="page">

 </div>
</template>

<script type="text/ecmascript-6">
import qs from 'qs'

export default {
	data() {
		return {}
	},
	methods: {},
	beforeRouteEnter(to, from, next) {
		console.log('beforeRouteEnter--', window.location.hash)
		// ...
		next()
	},
	beforeCreate(to, from, next) {
		console.log('beforeCreate--', window.location.href)
		let _openId = this.$GetUrlParam('openId')
		console.log('1._openId: ', _openId)
    localStorage.setItem('currentOpenId', _openId)
    if(_openId){
      let $openid = _openId.slice(0, _openId.length - 2)
      localStorage.setItem('currentOpenId', $openid)
    }

		let mdomain_src = 'http://arbmobiletest.arbexpress.cn', //后端域名 http://mobiletest.arbexpress.cn | http://arbmobiletest.arbexpress.cn
			Tencent_WxCode_api = 'https://open.weixin.qq.com/connect/oauth2/authorize?', //微信oauth-网页授权api地址
			manageUrl = `${mdomain_src}/mobile/band/openid/query_gzh.htm`, //后端逻辑接口
			caseDataUrl = `${mdomain_src}/mobile/band/arb/query.htm`, //查询是否关联仲裁委接口
			caseDataUrlBak = `/mobile/band/arb/query.htm` //查询是否关联仲裁委接口
		let mock_caseDataUrl = '/36/judge/queryCaseInfoBYCaseId.htm' //rap mock接口地址
		const loginConfig = {
			appid: 'wx9f95c4206c9c49fc',
			redirect_uri: manageUrl, // + '?param=' + _caseId + '?caseId=1535621810722'
			response_type: 'code',
			scope: 'snsapi_base',
		}

		if (_openId === null || _openId === '') {
		  console.log('_openId', "null")
			window.location.replace(Tencent_WxCode_api + qs.stringify(loginConfig) + '#wechat_redirect')
			console.log('安卓11： ', this.$isAndroid())
			console.log(Tencent_WxCode_api + qs.stringify(loginConfig) + '#wechat_redirect')
		} else {
      console.log('_openId', "not null")
      let $openid = _openId.slice(0, _openId.length - 2)
			// 	console.log('2.openid: ', _openId)
			history.pushState(null, null, `/`)
			console.log(_openId.slice(0, _openId.length - 2))
			this.$api
				// .get(`${caseDataUrlBak}?openId=${_openId}`)
				.post(caseDataUrlBak, {
					openId: $openid, //
				})
				.then(res => {
					console.log('是否关联仲裁委接口: ', res.data)
					if (res.data.code === '0000') {
						if (res.data.result) {
              localStorage.setItem('$arbname',qs.stringify(res.data.result))
              console.log('result存在')
              this.$router.push('/login')
						} else {
              localStorage.getItem('$arbname') ? localStorage.removeItem('$arbname') :''
							console.log('result不存在')
							this.$router.push('/arbRelate')
						}
					} else {
					}
				})
		}
	},
	created() {
		console.log('created')
	},
	mounted() {
		console.log('mounted')
	},
	components: {},
}
</script>

<style lang="scss" scoped>
</style>
