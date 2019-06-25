<template>
  <div class="page"></div>
</template>

<script type="text/ecmascript-6">
import qs from "qs";
import { wdapi, wxweb, wxgzh } from "@/config/wxAuthor";
export default {
  data() {
    return {};
  },
  methods: {},
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter--", window.location.hash);
    // ...
    next();
  },
  beforeCreate(to, from, next) {
    // return;

    console.log("beforeCreate--", window.location.href);
    let _openId = this.$GetUrlParam("openId");
    console.log("1._openId: ", _openId);
    localStorage.setItem("currentOpenId", _openId);

    if (_openId) {
      let $openid = _openId.slice(0, _openId.length - 2);
      localStorage.setItem("currentOpenId", $openid);
    }
    const loginConfig = wxgzh;

    if (_openId === null || _openId === "") {
      console.log("_openId", "null");
      window.location.replace(
        wxweb.oauth + qs.stringify(loginConfig) + "#wechat_redirect"
      );
      console.log("安卓11： ", this.$isAndroid());
    } else {
      console.log("_openId", "not null");
      let $openid = _openId.slice(0, _openId.length - 2);
      console.log("2.openid: ", _openId);
      history.pushState(null, null, `/`);
      console.log(_openId.slice(0, _openId.length - 2));
      // 自动登录传递
      this.$http
        .post("/mobile/auto/login.htm")
        .then(res => {
          console.log("http自动登录传递-", res);
          if (!res) {
            this.$router.replace("login");
          }
          if (res.data.code === "0000") {
            // 个人中心显示用
            localStorage.setItem("$userInfo", qs.stringify(res.data.result));
            this.$router.replace("/home/assetPackageList");
          } else {
            console.log("resresres", res);
            this.$router.replace("login");
          }
        })
        .catch(err => {
          console.log("err---------", err);
          console.log("err.data.code-", err.data.code);
          this.$router.replace("login");
        });
    }
  },
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");
  },
  components: {}
};
</script>

<style lang="scss" scoped>
</style>
