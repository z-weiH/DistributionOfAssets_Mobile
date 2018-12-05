<template>
  <div class="page">
    <view-box ref="viewBox">
      <!-- 视图层 -->
      <router-view></router-view>
      <!-- 底部选项卡 -->
      <div v-if="handleMenu !==false">
      <m-tabbar v-model="select" slot="bottom" v-transfer-dom>
        <m-tabbar-item id="tab1" class="tab_zcb" link="/home/assetPackageList">
          <img src="~@/assets/img/hui01.png" alt slot="icon-normal">
          <img src="~@/assets/img/lan01.png" alt slot="icon-active">
          资产包
        </m-tabbar-item>
        <m-tabbar-item id="tab2" class="tab_jz" link="/home/caseAdvanceSortList">
          <img src="~@/assets/img/hui02.png" alt slot="icon-normal">
          <img src="~@/assets/img/lan02.png" alt slot="icon-active">
          案件进展
        </m-tabbar-item>
        <m-tabbar-item id="tab3" class="tab_mine" link="/home/personCenter">
          <img src="~@/assets/img/hui03.png" alt slot="icon-normal">
          <img src="~@/assets/img/lan03.png" alt slot="icon-active">
          我的
        </m-tabbar-item>
      </m-tabbar>
      </div>
    </view-box>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from "qs";
import { ViewBox, Flexbox, FlexboxItem } from "vux";
import mTabbar from "@/components/tabbar/module/tabbar.vue";
import mTabbarItem from "@/components/tabbar/module/tabbar-item.vue";

export default {
  components: {
    ViewBox,
    mTabbar,
    mTabbarItem
  },
  data() {
    return {
      openId: "",
      defaultSrc: "/home/assetPackageList",
      select: "tab1", //默认选择tab,
      linkArr:['/home/assetPackageList','/home/caseAdvanceSortList','/home/personCenter'],
      handleMenu : '',
    };
  },
  methods: {


  },
  watch: {
    $route(to, from) {
      console.log("$route------", to.path);
      this.handleMenu = to.meta.handleMenu;
      if(to.path === this.linkArr[0]){
        this.select = 'tab1'
      }else if(to.path === this.linkArr[1]){
        this.select = 'tab2'
      }else if(to.path === this.linkArr[2]){
        this.select = 'tab3'
      }
    }
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter", to.path);
    // ...
    next();
  },
  beforeMount() {
    this.$router.replace(`${this.defaultSrc}`);
  },
  created() {

  },
  mounted() {
    this.handleMenu = this.$route.meta.handleMenu;
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/scss/helper/_mixin.scss";
html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

.page {
  height: 100%;
}
.tabbar_bottom {
  .label {
    color: #686868;
  }
  .weui-tabbar__item {
    > div,
    > p {
      vertical-align: middle;
    }
    > div {
      display: table-cell;
    }
    > p {
      display: table-cell;
    }
  }
}
.weui-bar__item_on {
  .label {
    color: #0d428e !important;
  }
}
.tab_zcb {
  img {
    width: rem(42);
    height: rem(42);
  }
}
.tab_jz {
  img {
    width: rem(42);
    height: rem(42);
  }
}
.tab_mine {
  img {
    width: rem(42);
    height: rem(42);
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
