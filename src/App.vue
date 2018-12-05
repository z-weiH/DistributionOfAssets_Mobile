<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" style="min-height:100%"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" style="min-height:100%"></router-view>
    <!-- <lg-preview></lg-preview> -->
  </div>
</template>

<script>
// 引入 公共css
import '@/assets/style/scss/index.scss'
import { Loading } from 'vux'
// import { mapActions, mapState } from 'vuex'
export default {
	name: 'app',
	data() {
		return {
			loadText: 'loading',
			isRouterAlive: true,
		}
	},
	methods: {
		reload() {
			this.isRouterAlive = false
			this.$nextTick(() => (this.isRouterAlive = true))
		},
	},
	components: {
		Loading,
	},
	computed: {},
}
</script>


<style lang="less">
@import '~vux/src/styles/reset.less';

</style>
