<template>
  <div class="page">
    <flexbox class="info_box">
      <flexbox-item :span="1">
        <div class="icon i_user"></div>
      </flexbox-item>
      <flexbox-item>
        <x-input name="loginName" v-model="loginName" placeholder="请输入您的手机号码" style="font-size:15px"  mask="99999999999" :max="11"></x-input>
      </flexbox-item>
    </flexbox>
    <flexbox class="info_box">
      <flexbox-item :span="1">
        <div class="icon i_ycode"></div>
      </flexbox-item>
      <flexbox-item :span="7">
        <x-input name="validCode" v-model="validCode" placeholder="请输入接收到的验证码" style="font-size:15px"></x-input>
      </flexbox-item>
      <flexbox-item :span="4">
        <div class="yzm_wrap">
          <v-touch v-show="getYzm" tag="a" class="btn_yzm" v-on:tap="getycodeFoo">获取验证码</v-touch>
          <v-touch v-show="getDjs" tag="a" class="btn_yzm disable" v-on:tap="tipCountDown"><i class="cur_time">(<countdown v-model="time" :start="start" @on-finish="finish" v-show="show"></countdown>)</i></v-touch>
        </div>
      </flexbox-item>
    </flexbox>
    <div class="buttonwrap">
      <x-button :gradients="['#F0B300', '#F0B300']" @click.native="goToResetInfo">下一步</x-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import { Flexbox, FlexboxItem } from 'vux'
import reg from '@/tools/regexp'
import Validator from 'vue-smart-validator'
Vue.use(new Validator())

export default {
	data() {
		return {
			openId: '',
			phone: '',
			loginName: '',
			validCode: '',
			show: true,
			time: 60,
			value: '60',
			start: false,
			getYzm: true,
			getDjs: false,
		}
	},
	methods: {
		getParams() {
			let _phone = this.$route.params.phone
			this.phone = _phone
			console.log('getParams:手机号-', _phone)
		},
		finish(index) {
			// 倒计时控制
			this.start = false
			this.time = 60
			this.getYzm = true
			this.getDjs = false
		},
		tipCountDown() {
			// 倒计时提醒
			this.$vux.toast.text('验证码有效期为5分钟!')
		},
		getycodeFoo() {
			if (this.loginName && this.loginName != '') {
				this.$vux.loading.show({
					text: '加载中',
				})
				this.$http
					.post('/web/sendAuthCode.htm', {
						phone: this.loginName,
					})
					.then(res => {
						this.$vux.loading.hide()
						if (res.data.code === '0000') {
							console.log('获取短信验证码：', res.data)
							this.$vux.toast.text('短信发送成功!')
							this.getYzm = false
							this.getDjs = true
							this.start = true
						}
					})
			} else {
				this.$vux.toast.text('手机号不能为空哦！')
			}
		},
		goToResetInfo() {
			if (this.loginName && this.loginName != '') {
				this.$http
					.post('/web/validation.htm', {
						phone: this.loginName,
						code: this.validCode,
					})
					.then(res => {
						if (res.data.code === '0000') {
							this.$router.push({
								name: 'resetPwd',
								params: {
									phone: this.loginName,
									code: this.validCode,
								},
							})
						}
					})
			} else {
				this.$vux.toast.text('手机号不能为空哦！')
			}
		},
	},
	created() {
		this.openId = localStorage.getItem('currentOpenId')
		this.getParams()
		// 获取登录页-手机号码
		this.loginName = this.phone
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
		vertical-align: middle;
		background-repeat: no-repeat;
		background-size: contain;
	}
}

%ico_set_com {
	margin: 0 auto;
	position: relative;
	left: rem(40);
}

.i_user {
	&:after {
		width: rem(35);
		height: rem(47);
		background-image: url(~@/assets/img/con@2x012.png);
		@extend %ico_set_com;
	}
}

.i_ycode {
	&:after {
		width: rem(37);
		height: rem(42);
		background-image: url(~@/assets/img/con@2x009.png);
		@extend %ico_set_com;
	}
}

.yzm_wrap {
	height: 600%;
}

.btn_yzm {
	display: inline-block;
	width: rem(153);
	height: rem(48);
	text-align: center;
	line-height: rem(48);
	border-radius: 5px;
	border: 1px solid #ffa89b;
	font-size: rem(26);
	color: #ffa89b;
	&.disable {
		$color: #898989;
		color: $color;
		border: 1px solid $color;
		i {
			font-style: normal;
		}
	}
}
.buttonwrap {
	padding: rem(38) rem(30) 0 rem(30);
  button{
    font-size: rem(32);
    letter-spacing:rem(2);
  }
}
</style>
