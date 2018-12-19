<template>
  <div class="page">
    <div class="webcome_box">
      <ul>
        <li>资产处置分发平台</li>
      </ul>
    </div>
    <div class="main_wrap">
      <flexbox class="info_box" @click.native="focusclick">
        <flexbox-item :span="1" class="wrap_icon">
          <div class="icon i_user"></div>
        </flexbox-item>
        <flexbox-item :span="7" class="wrap_input">
          <x-input
            name="loginName"
            type="tel"
            v-validator="validator.loginName"
            v-model="loginName"
            placeholder="请输入您的手机号码"
            style="font-size:15px"
            mask="999 9999 9999"
            :max="13"
            ref="ipt0"
          ></x-input>
        </flexbox-item>
        <flexbox-item :span="4" class="error_holder">
          <span>{{$validator.firstError('loginName')}}</span>
          <!-- 手动添加错误提示 -->
        </flexbox-item>
      </flexbox>
      <flexbox class="info_box" @click.native="focusclick1">
        <flexbox-item :span="1" class="wrap_icon">
          <div class="icon i_pwd"></div>
        </flexbox-item>
        <flexbox-item :span="7" class="wrap_input">
          <x-input
            name="password"
            type="password"
            v-validator="validator.password"
            v-model="password"
            placeholder="请输入密码"
            style="font-size:15px"
            ref="ipt1"
          ></x-input>
        </flexbox-item>
        <flexbox-item :span="4" class="error_holder">
          <span>{{$validator.firstError('password')}}</span>
          <!-- 手动添加错误提示 -->
        </flexbox-item>
      </flexbox>
      <div class="buttonwrap">
        <x-button :gradients="['#F0B300', '#F0B300']" @click.native="loginInfoFoo">登 录</x-button>
      </div>
      <div class="link_findpwd">
        <v-touch tag="a" v-on:tap="gotoRememberPwdView" class="link_grey">忘记密码?</v-touch>
        <!-- <router-link class="link_grey" :to="{ path: '/authCode'}">忘记密码?</router-link> -->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from "qs";
import Vue from "vue";
import { Flexbox, FlexboxItem, PopupRadio } from "vux";
import reg from "@/tools/regexp";
import Validator from "vue-smart-validator";
Vue.use(new Validator());

export default {
  data() {
    return {
      webcome_tbar: true,
      openId: "",
      arbName: "",
      arbClassName: "",
      bindType: false, //是否绑定 (页面是否显示的总开关)
      loginName: "",
      password: "",
      validator: {
        loginName: [
          { rule: "required", message: "必填", trigger: "blur" },
          {
            rule: val => {
              return reg.tel.test(this.$trim(val));
            },
            message: "手机号格式错误",
            trigger: "blur"
          }
        ],
        password: [{ rule: "required", message: "必填", trigger: "blur" }]
      }
    };
  },
  methods: {
    focusclick() {
      this.$refs.ipt0.focus();
    },
    focusclick1() {
      this.$refs.ipt1.focus();
    },
    loginInfoFoo() {
      if (this.openId === "" || this.openId === null) {
        // 如果openid丢失，页面重定向到 仲裁委关联页面
        this.$router.replace("/");
      } else {
        if (this.loginName == "") {
          this.$vux.toast.text("手机号不能为空");
        } else {
          if (!reg.tel.test(this.$trim(this.loginName))) {
            this.$vux.toast.text("手机号格式错误");
          } else if (this.password.length < 6) {
            this.$vux.toast.text("密码位数不对，请输入6～20位");
          } else {
            this.$vux.loading.show({
              text: "加载中"
            });
            this.$http
              .post("/mobile/login.htm", {
                loginName: this.$trim(this.loginName),
                password: this.password
              })
              .then(res => {
                if (res.data.code === "0000") {
                  this.$vux.loading.hide();
                  console.log(qs.stringify(res.data.result));
                  // let _username = this.$trim(this.loginName)
                  // let _pwd = this.password
                  // let finaluser = Object.assign(res.data.result,{uname:_username,pwd:_pwd})
                  localStorage.setItem(
                    "$userInfo",
                    qs.stringify(res.data.result)
                  );
                  // this.$router.push('/wxBind')
                  setTimeout(() => {
                    this.$router.replace("/home/assetPackageList");
                  },500);
                }
              })
              .catch(err => {
                this.$vux.loading.hide();
                if (err.data.code === "1002") {
                  this.$vux.toast.text(err.data.description);
                } else if (err.data.code === "6666") {
                  this.$vux.toast.text(err.data.description);
                  // console.log(err);
                } else if (err.data.code === "1001") {
                  this.$vux.toast.text(err.data.description);
                }
              });
          }
        }
      }
    },
    bindUserQuery() {
      // 查询是否绑定账号
      this.$http
        .get("/mobile/band/user/query.htm?openId=" + this.openId)
        .then(res => {
          if (res.data.code === "0000") {
            if (!res.data.result) {
              // 未绑定
              this.bindType = true;
              console.log("未绑定");
            } else {
              let _band = res.data.result.band;
              if (_band === 1) {
                // 更新 用户对象
                localStorage.setItem(
                  "$userInfo",
                  qs.stringify(res.data.result)
                );
                // 已绑定
                this.$router.push("/home");
              }
            }
          }
        });
    },
    getArbIcoClass() {
      // 获取仲裁委icon
      let _iconClass = qs.parse(localStorage.getItem("$arbIcons"));
      console.log("_iconClass", _iconClass);
      if (!this.$isEmptyObject(_iconClass)) {
        let _iconArr = [];
        for (let key in _iconClass) {
          _iconArr.push(_iconClass[key]);
        }
        console.log("_iconArr", _iconArr);
        let _ico = _iconArr.filter(v => {
          return v.active === "true";
        })[0]["style"];
        // console.log('_ico --', _ico)
        // this.arbClassName = _ico
        return _ico;
      } else {
        this.webcome_tbar = false;
        return false;
      }
    },
    gotoRememberPwdView() {
      // 手机格式正确，跳转忘记密码页，发送这个号码
      let passPhone = reg.tel.test(this.$trim(this.loginName));
      if (passPhone) {
        let LoginName = this.$trim(this.loginName);
        this.$router.push({
          name: "authCode",
          params: {
            phone: LoginName
          }
        });
      } else {
        this.$router.push({
          name: "authCode",
          params: {
            phone: this.loginName
          }
        });
      }
    }
  },
  created() {
    // this.getArbIcoClass();
    this.openId = localStorage.getItem("currentOpenId");
    // this.bindUserQuery() //账号是否绑定-检测
    this.arbName = qs.parse(localStorage.getItem("$arbname"))["shortName"];
  },
  components: {
    Flexbox,
    FlexboxItem,
    PopupRadio
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/scss/helper/_mixin.scss";
html {
}

.page {
  background-color: #eeeeee;
}
.webcome_box {
  overflow: hidden;
  &:before {
    content: "";
    display: block;
    margin: rem(60) auto rem(37) auto;
    width: rem(145);
    height: rem(145);
    border-radius: 50%;
    // background-color: #003888;
    background-color: #fff;
    background-image: url(~@/assets/img/mlogo.svg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: rem(1) rem(1);
  }
  ul {
  }
  li {
    text-align: center;
    font-size: rem(34);
    color: #003888;
    &:first-child {
      font-weight: bold;
      padding-bottom: rem(20);
    }
  }
}
.info_box {
  background-color: #fff;
  &:nth-child(1) {
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }
  border: 1px solid #dcdcdc;
  &:nth-child(2) {
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    margin-top: -1px;
  }
}
.main_wrap {
  padding-top: rem(34);
  margin: 0 rem(26);
}

.link_findpwd {
  text-align: center;
}

.buttonwrap {
  margin: rem(46) 0 rem(26) 0;
  button {
    font-size: rem(32);
  }
}

.link_grey {
  color: #9f9f9f;
  text-decoration: underline;
}
// icon图标基础样式
.icon {
  &:after {
    content: "";
    display: block;
    vertical-align: middle;
    background-repeat: no-repeat;
    background-size: contain;
  }
}
%ico_set_com {
  margin: 0 auto;
  position: relative;
  left: rem(20);
}
.i_user {
  &:after {
    width: rem(35);
    height: rem(47);
    background-image: url(~@/assets/img/con@2x012.png);
    @extend %ico_set_com;
  }
}
.i_pwd {
  &:after {
    width: rem(35);
    height: rem(42);
    background-image: url(~@/assets/img/con@2x011.png);
    @extend %ico_set_com;
  }
}

.error_holder {
  color: #e4393c;
  font-size: 0.7em;
}
</style>
