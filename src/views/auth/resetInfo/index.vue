<template>
  <div class="page">
    <flexbox class="info_box">
      <flexbox-item :span="1">
        <div class="icon i_pwd"></div>
      </flexbox-item>
      <flexbox-item>
        <x-input
          name="oldPassword"
          type="password"
          v-validator="validator.oldPassword"
          v-model="oldPassword"
          placeholder="输入原密码" :min='6' :max='20'
        ></x-input>
      </flexbox-item>
    </flexbox>
    <flexbox class="info_box">
      <flexbox-item :span="1">
        <div class="icon i_pwd"></div>
      </flexbox-item>
      <flexbox-item>
        <x-input
          name="newPassword"
          type="password"
          v-validator="validator.newPassword"
          v-model="newPassword"
          placeholder="请输入新密码(6位或20位以内的数字或字母)" :min='6' :max='20'
        ></x-input>
      </flexbox-item>
    </flexbox>
    <flexbox class="info_box">
      <flexbox-item :span="1">
        <div class="icon i_pwd"></div>
      </flexbox-item>
      <flexbox-item>
        <x-input
          name="confirmPassword"
          type="password"
          v-validator="validator.confirmPassword"
          v-model="confirmPassword"
          placeholder="请再次输入密码" :min='6' :max='20'
        ></x-input>
      </flexbox-item>
    </flexbox>
    <div class="buttonwrap">
      <x-button :gradients="['#F0B300', '#F0B300']" @click.native="postNewInfoFoo">确认</x-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from "vue";
import qs from "qs";
import { Flexbox, FlexboxItem } from "vux";
import reg from "@/tools/regexp";
import Validator from "vue-smart-validator";
Vue.use(new Validator());

export default {
  data() {
    return {
      openId: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      userId: "",
      validator: {
        oldPassword: [{ rule: "required", message: "必填", trigger: "blur" }],
        newPassword: [{ rule: "required", message: "必填", trigger: "blur" }],
        confirmPassword: [
          { rule: "required", message: "必填", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getParams() {
      let _users = qs.parse(localStorage.getItem("$userInfo"));
      this.userId = _users.userId;
    },
    postNewInfoFoo() {
      if (this.oldPassword == "") {
        this.$vux.toast.text("原密码不能为空");
      } else if (this.newPassword == "") {
        this.$vux.toast.text("新密码不能为空");
      } else if (this.confirmPassword == "") {
        this.$vux.toast.text("重复新密码不能为空");
      } else if (
        this.oldPassword != "" &&
        this.newPassword != "" &&
        this.confirmPassword != ""
      ) {
        if (this.oldPassword == this.newPassword) {
          this.$vux.toast.text("新密码不建议和原密码一样哦");
        } else if (this.newPassword != this.confirmPassword) {
          this.$vux.toast.text("新密码和重复密码不一致");
        } else if (this.newPassword == this.confirmPassword) {
          this.$http
            .post(`/mobile/personalCenterUpdatePassword.htm`, {
              confirmPassword: this.confirmPassword,
              oldPassword: this.oldPassword,
              newPassword: this.newPassword,
              userId: this.userId
            })
            .then(res => {
              if (res.data.code === "0000") {
                // 修改密码成功则清空用户本地对象
                localStorage.removeItem("$userInfo");
                this.$router.push("/login");
              }
            }).catch(err=>{
              this.$vux.toast.text(err.data.description)
            });
        }
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
}
</style>
