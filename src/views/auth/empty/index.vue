<template>
  <div class="page"></div>
</template>

<script type="text/ecmascript-6">
import qs from "qs";

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
    console.log("beforeCreate--", window.location.href);
    let _openId = this.$GetUrlParam("openId");
    console.log("1._openId: ", _openId);
    localStorage.setItem("currentOpenId", _openId);

    if (_openId) {
      let $openid = _openId.slice(0, _openId.length - 2);
      localStorage.setItem("currentOpenId", $openid);
    }

    let mdomain_src = "http://arbmobiletest.arbexpress.cn", //后端代理域名test： http://swq.tunnel.qydev.com
      Tencent_WxCode_api =
        "https://open.weixin.qq.com/connect/oauth2/authorize?", //微信oauth-网页授权api地址
      manageUrl = `${mdomain_src}/mobile/openid/query.htm`; //后端逻辑接口

    const loginConfig = {
      appid: "wx746461e45ce02735",
      redirect_uri: manageUrl, // + '?param=' + _caseId + '?caseId=1535621810722'
      response_type: "code",
      scope: "snsapi_base"
    };

    // let swq_config =
    //   "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx746461e45ce02735&redirect_uri=http%3a%2f%2fswq.tunnel.qydev.com%2fmobile%2fopenid%2fquery.htm&response_type=code&scope=snsapi_base";

    if (_openId === null || _openId === "") {
      console.log("_openId", "null");
      window.location.replace(
        Tencent_WxCode_api + qs.stringify(loginConfig) + "#wechat_redirect"
      );
      // 史文强
      // window.location.replace(swq_config);
      console.log("安卓11： ", this.$isAndroid());
      // console.log(
      //   Tencent_WxCode_api + qs.stringify(loginConfig) + "#wechat_redirect"
      // );
      console.log(swq_config);
    } else {
      console.log("_openId", "not null");
      let $openid = _openId.slice(0, _openId.length - 2);
      console.log("2.openid: ", _openId);
      history.pushState(null, null, `/`);
      console.log(_openId.slice(0, _openId.length - 2));

      // 自动登录传递
      this.$http.post("/mobile/auto/login.htm").then(res => {
        console.log("http自动登录传递-", res);
        if (res.data.code === "6667") {
          this.$router.replace('login')
        }else if(res.data.code === "0000"){
          this.$router.replace('home')
        }
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
