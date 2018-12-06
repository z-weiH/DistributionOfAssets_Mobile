<template>
  <div class="page">
    <flexbox class="info_box">
      <flexbox-item :span="1">
        <div class="icon i_pwd"></div>
      </flexbox-item>
      <flexbox-item>
        <x-input
          name="newPwd"
          type="password"
          v-model="newPassword"
          placeholder="请输入新密码(6位或以上的数字或字母)"
        ></x-input>
      </flexbox-item>
    </flexbox>
    <flexbox class="info_box">
      <flexbox-item :span="1">
        <div class="icon i_pwd"></div>
      </flexbox-item>
      <flexbox-item>
        <x-input name="confirmPwd" type="password" v-model="confirmPassword" placeholder="请再次输入密码"></x-input>
      </flexbox-item>
    </flexbox>
    <div class="buttonwrap">
      <x-button :gradients="['#F0B300', '#F0B300']" @click.native="postNewInfoFoo">确认</x-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from "qs";
import Vue from "vue";
import { Flexbox, FlexboxItem } from "vux";
import reg from "@/tools/regexp";
import Validator from "vue-smart-validator";
Vue.use(new Validator());

export default {
  data() {
    return {
      openId: "",
      newPassword: "",
      confirmPassword: "",
      loginName: "",
      validCode: ""
    };
  },
  methods: {
    getParams() {
      this.loginName = this.$route.params.phone;
    },
    postNewInfoFoo() {
      if (this.confirmPassword.length < 6) {
        this.$vux.toast.text("密码长度不能小于6位");
      } else if (this.newPassword.length != this.newPassword.length) {
        this.$vux.toast.text("两次输入的密码不一致");
      } else {
        this.$http
          .post(`/mobile/updatePassword.htm`, {
            confirmPassword: this.confirmPassword,
            newPassword: this.newPassword,
            phone: this.loginName
          })
          .then(res => {
            if (res.data.code === "0000") {
              // 修改密码成功则清空用户本地对象
              localStorage.removeItem("$userInfo");
              this.$router.push("/login");
            }
          });
      }
    }
  },
  created() {
    this.openId = localStorage.getItem("currentOpenId");
    this.getParams();
  },
  components: {
    Flexbox,
    FlexboxItem
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/scss/helper/_mixin.scss";
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
    content: "";
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
    background-image: url(~@/assets/img/con@2x011.png);
    @extend %ico_set_com;
  }
}

.buttonwrap {
  padding: rem(38) rem(30) 0 rem(30);
  button {
    font-size: rem(32);
    letter-spacing: rem(2);
  }
}
</style>
