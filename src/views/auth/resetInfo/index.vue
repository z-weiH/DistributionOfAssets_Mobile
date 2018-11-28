<template>
  <div class="page">
    <flexbox class="info_box">
      <flexbox-item :span="1">
        <div class="icon i_pwd"></div>
      </flexbox-item>
      <flexbox-item>
        <x-input name="loginPwd" type="password" v-validator="validator.loginPwd" v-model="loginPwd" placeholder="输入原密码"></x-input>
      </flexbox-item>
    </flexbox>
    <flexbox class="info_box">
      <flexbox-item :span="1">
        <div class="icon i_pwd"></div>
      </flexbox-item>
      <flexbox-item>
        <x-input name="newPwd" type="password" v-validator="validator.newPwd" v-model="newPwd" placeholder="请输入新密码(6位或以上的数字或字母)"></x-input>
      </flexbox-item>
    </flexbox>
    <flexbox class="info_box">
      <flexbox-item :span="1">
        <div class="icon i_pwd"></div>
      </flexbox-item>
      <flexbox-item>
        <x-input name="confirmPwd" type="password" v-validator="validator.confirmPwd" v-model="confirmPwd" placeholder="请再次输入密码"></x-input>
      </flexbox-item>
    </flexbox>
    <div class="buttonwrap">
      <x-button :gradients="['#F0B300', '#F0B300']" @click.native="postNewInfoFoo">确认</x-button>
    </div>


  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import qs from 'qs'
import { Flexbox, FlexboxItem } from 'vux'
import reg from '@/tools/regexp'
import Validator from 'vue-smart-validator'
Vue.use(new Validator())

export default {
	data() {
		return {
			openId: '',
			loginPwd: '',
			newPwd: '',
			confirmPwd: '',
			validator: {
				loginPwd: [{ rule: 'required', message: '必填', trigger: 'blur' }],
				newPwd: [{ rule: 'required', message: '必填', trigger: 'blur' }],
				confirmPwd: [{ rule: 'required', message: '必填', trigger: 'blur' }],
			},
		}
	},
	methods: {
		postNewInfoFoo() {
			let _obj = {
				confirmPwd: this.confirmPwd,
				loginPwd: this.loginPwd,
				newPwd: this.newPwd,
				openId: this.openId,
			}
			if (this.loginPwd == '') {
				this.$vux.toast.text('请输入原密码')
			} else if (this.newPwd == '') {
				this.$vux.toast.text('请输入新密码')
			} else if (this.confirmPwd == '') {
				this.$vux.toast.text('请输入确认密码')
			} else if (this.loginPwd != '' && this.newPwd != '' && this.confirmPwd != '') {
				this.$api.get(`/mobile/password/modify.htm?${qs.stringify(_obj)}`).then(res => {
					if (res.data.code === '0000') {
						// 修改密码成功则清空用户本地对象
						localStorage.removeItem('$userInfo')
						this.$router.push('/login')
					}
				})
			}
		},
	},
	created() {
		this.openId = localStorage.getItem('currentOpenId')
	},
	components: {
		Flexbox,
		FlexboxItem,
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/scss/helper/_mixin.scss';
html {
	background-color: #eeeeee;
}
.info_box {
	background-color: #fff;
	border-bottom: 1px solid #dcdcdc;
}

// icon图标基础样式
.icon {
	&:after {
		content: '';
		display: block;
		background-repeat: no-repeat;
		background-size: contain;
	}
}

%ico_set_com {
	margin: 0 auto;
	position: relative;
	left: rem(40);
}

.i_pwd {
	&:after {
		width: rem(35);
		height: rem(42);
		background-image: url(/static/img/con@2x011.png);
		@extend %ico_set_com;
	}
}

.buttonwrap {
	padding: rem(38) rem(30) 0 rem(30);
}
</style>
