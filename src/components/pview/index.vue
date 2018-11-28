<template>
<div>
    <img style="-webkit-user-select: none;max-width: 100%;background-position: 0px 0px, 32px 32px;background-size: 64px 64px;background-image:linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);" :src="purl" @load="loadFinish">
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'pview',
	data() {
		return {
      openId:'',
      caseId:'',
      purl:'',
      iosStatus:null

    }
  },
  methods:{
    getParams() {
			// 取到路由带过来的参数
			// let key_caseId = this.$route.params.caseId
      let _caseId = this.$route.params.caseId,
          _purl = this.$route.params.picSrc
			// 将数据放在当前组件的数据内
      this.caseId = _caseId
      this.purl = _purl
			console.log('_caseId-', _caseId)
			console.log('_purl-', _purl)
    },
    setMeta(){
      let i = document.getElementsByTagName('meta')
      i[1]['content'] = 'width=device-width, minimum-scale=0.1'
    },
    loadFinish(){
      console.log('loadFinish');
      // window.scrollTo(0)
    }
  },
  created(){
    this.openId = localStorage.getItem('currentOpenId')
    this.getParams()
  },
  mounted () {
      this.iosStatus = this.$isIOS()
      this.setMeta()
  },
	components: {},
}
</script>

<style lang="scss" scoped>
body {
	margin: 0px;
	background: #0e0e0e;
}
</style>
