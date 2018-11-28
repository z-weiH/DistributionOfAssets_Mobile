<template>
  <div class="page">
    <!-- 视图层 -->
    <router-view></router-view>
    <!-- 底部选项卡 -->
    <tabbar class="tabbar_bottom">
      <tabbar-item selected link="/home/assetPackageList">
        <img slot="icon" src="./../../../assets/img/hui01.png">
        <img slot="icon-active" src="./../../../assets/img/lan01.png">
        <span slot="label" class="label">资产包</span>
      </tabbar-item>
      <!-- show-dot badge -->
      <tabbar-item link="/home/caseAdvanceSortList">
        <img slot="icon" src="./../../../assets/img/hui02.png">
        <img slot="icon-active" src="./../../../assets/img/lan02.png">
        <span slot="label" class="label">案件进展</span>
      </tabbar-item>
      <tabbar-item link="/home/personCenter">
        <img slot="icon" src="./../../../assets/img/hui03.png">
        <img slot="icon-active" src="./../../../assets/img/lan03.png">
        <span slot="label" class="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from "qs";
import { Tabbar, TabbarItem } from "vux";

export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data() {
    return {
      openId: "",
      defaultSrc: "/home/assetPackageList"
    };
  },
  methods: {},
  watch: {
    $route(to, from) {
      console.log(to.path);
    }
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  beforeRouteEnter(to, from, next) {
    // ...
    next();
  },
  beforeMount() {
    this.$router.replace(`${this.defaultSrc}`);
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "./../../../assets/style/scss/helper/_mixin.scss";
.tabbar_bottom {
  .label {
    color: #686868;
  }
}
.weui-bar__item_on {
  .label {
    color: #0d428e !important;
  }
}

.top {
  display: flex;
  height: rem(80);
  line-height: rem(80);
  .icon {
    align-items: center;
    display: flex;
    i {
      display: inline-block;
      width: rem(54);
      height: rem(54);
      background: #fead25;
      align-items: center;
      justify-content: center;
      display: flex;
      margin-right: rem(20);
      /*margin-top: rem(13);*/
      /*vertical-align: top;*/
      border-radius: rem(8);
      text-align: center;
      img {
        width: 80%;
      }
    }
    font-size: rem(30);
    width: rem(280);
  }
  .title {
    overflow: hidden;
    flex: 1;
    color: #a0a0a0;
    .welcome {
      font-size: rem(24);
    }
  }
}
.padding-30 {
  padding-left: rem(30);
  padding-right: rem(30);
  border-bottom: 1px solid #eee;
  .cellBox {
    height: rem(189);
    /*border-bottom: 1px solid #eee;*/
    &:nth-child(odd) {
      border-right: 1px solid #eee;
    }
    > div {
      display: table-cell;
      vertical-align: middle;

      &:last-child {
        font-size: rem(30);
        padding-left: 12px;
        color: #666;
      }
    }
  }
}
.dclaj {
  height: rem(100);
}

.ml5 {
  margin-left: rem(-5);
}
.ml10 {
  margin-left: rem(10);
}

.ico_panel {
  width: rem(100);
  height: rem(100);
  border-radius: 6px;
  align-items: center;
  display: flex !important;
  justify-content: center;
  position: relative;

  img {
    width: rem(64);
  }

  .icon {
    position: absolute;
    top: 0;
    right: 0;
    -webkit-transform: translate(50%, -50%);
    -moz-transform: translate(50%, -50%);
    transform: translate(50%, -50%);
  }
}
.ico_zcy {
  background-color: #00c7ad;
}
.ico_cjs {
  background-color: #ffc000;
}
.ico_wdaj {
  background: #2a9dfe;
}
.ico_tjbb {
  background-color: #823634;
}
.ico_grzx {
  background-color: #fd8920;
}
.comimgsoon {
  font-size: rem(20);
  display: inline-block;
  line-height: rem(35);
  width: rem(70);
  letter-spacing: rem(5);
  height: rem(70);
  /*margin-left: rem(8);*/
  text-align: center;
  color: #fff;
  position: absolute;
}
.animation_title {
  animation: 10s move linear 0s infinite normal;
}
@keyframes move {
  0% {
    transform: translateX(100%);
  }
  50% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}
</style>
