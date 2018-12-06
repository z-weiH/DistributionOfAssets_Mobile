<template>
  <div class="page">
    <view-box ref="viewBox">
      <div slot="header" class="tab_card">
        <Flexbox class="t_wrap">
          <template v-for="(it,index) in tabList">
            <FlexboxItem>
              <v-touch
                tag="a"
                v-on:tap="tabSearch(it,index)"
                :class="{active: index === selected}"
              >{{it.name}}</v-touch>
            </FlexboxItem>
          </template>
        </Flexbox>
      </div>

      <scroller
        :probeType="1"
        :data="ListItem"
        :pulldown="true"
        :pullup="true"
        @scrollToEnd="loadMore"
        @pulldown="refreshList"
        :loadOver="loadOver"
      >
        <!--BEGIN 暂无案件 -->
        <div class="nfcase_panel" v-if="show_nfdata">当前阶段暂无数据</div>
        <template v-for="(it,index) in ListItem">
          <Group :gutter="0" :class="['card_item',bgClass(it)]">
            <Cell class="card_tit" :border-intent="false">
              <span slot="title">{{it.clientName}}</span>
              <template v-if="it.packageStatus == 1">
                <slot>
                  <template v-if="it.timeout == 'file'">
                    <span class="f_red">已过48小时</span>
                    <span class="flag_btn orange">待签收</span>
                  </template>
                  <template v-else>
                    <span class="flag_btn yellow">待签收</span>
                  </template>
                </slot>
              </template>
              <template v-if="it.packageStatus == 2">
                <slot>
                  <span v-if="it.timeout == 'file'" class="f_red">已过48小时</span>
                  <span class="flag_btn green">已确认</span>
                </slot>
              </template>
              <template v-if="it.packageStatus == 3">
                <slot>
                  <span v-if="it.timeout == 'file'" class="f_red">已过48小时</span>
                  <span class="flag_btn gray">已退回</span>
                </slot>
              </template>
            </Cell>
            <v-touch v-on:tap="gotoDetail(it)">
              <Flexbox class="card_conts" :gutter="0" wrap="wrap">
                <flexbox-item :span="1/3">
                  <div class="flex_cont">
                    <span>
                      <em class="dollor">{{it.estimateAmt}}</em>
                    </span>
                    <span class="dollor">元</span>
                  </div>
                </flexbox-item>
                <flexbox-item :span="1/3">
                  <div class="flex_cont">
                    <span>{{it.caseQuantity}}</span>
                  </div>
                </flexbox-item>
                <flexbox-item :span="1/3">
                  <div class="flex_cont">
                    <span>{{it.entrustPeriod}}</span>
                    <span>个月</span>
                  </div>
                </flexbox-item>
                <flexbox-item :span="1/3">
                  <div class="flex_cont">
                    <span>预计总标的金额</span>
                  </div>
                </flexbox-item>
                <flexbox-item :span="1/3">
                  <div class="flex_cont">
                    <span>案件量</span>
                  </div>
                </flexbox-item>
                <flexbox-item :span="1/3">
                  <div class="flex_cont">
                    <span>委托期</span>
                  </div>
                </flexbox-item>
              </Flexbox>
            </v-touch>
          </Group>
        </template>
      </scroller>
    </view-box>
  </div>
</template>

<script type="text/ecmascript-6">
import { Flexbox, FlexboxItem, Group, Cell, ViewBox, XHeader } from "vux";
/****
 *@param ListItem 案件列表数据
 *@param selected 默认0 代表未选中
 *@param packageStatus 列表类型 默认-1
 */
export default {
  components: {
    Flexbox,
    FlexboxItem,
    Group,
    Cell,
    ViewBox,
    XHeader
  },
  data() {
    return {
      openId: "",
      show_btn: false,
      show_nfdata: false,
      selected: 3,
      packageStatus: null,
      loadOver: false,
      tabList: [
        {
          name: "待签收",
          currentNum: 1,
          packageStatus: 1
        },
        {
          name: "已退回",
          currentNum: 1,
          packageStatus: 3
        },
        {
          name: "已确认",
          currentNum: 1,
          packageStatus: 2
        },
        {
          name: "全部",
          currentNum: 1
        }
      ],
      pager: {
        count: 0,
        currentNum: 1,
        pageSize: 10,
        keyWord: ""
      },
      ListItem: []
    };
  },
  methods: {
    tabSearch(item, index) {
      this.$vux.loading.show({
        text: "加载中"
      });
      this.selected = index;
      this.packageStatus = item.packageStatus ? item.packageStatus : "";
      this.pager.currentNum = 1; //重置
      this.ListItem = []; //先清空-之前搜索结果

      this.$http
        .post("/mobile/queryAssetsList.htm", {
          packageStatus: this.packageStatus,
          pageSize: this.pager.pageSize,
          currentNum: this.pager.currentNum
        })
        .then(res => {
          if (res.data.code === "0000") {
            this.$vux.loading.hide();
            this.pager.count = res.data.result.count;
            if (!this.$isEmptyArr(res.data.result.list)) {
              this.show_nfdata = false;
              this.ListItem = res.data.result.list;
            } else {
              this.show_nfdata = true;
            }
          }
        });
    },
    loadMore() {
      if (this.loadOver === true) {
        return;
      }
    },
    refreshList() {
      // 重置pager对象
      this.pager.pageNum = 1;
      this.pager.currentNum = 10;
      // 关闭暂无搜索结果样式
      this.show_nfdata = false;
      this.doQuery();
    },
    bgClass(item) {
      return item.timeout == "file" ? "stale" : false;
    },
    gotoDetail(item) {
      this.$router.push({
        name: "assetPackageDetail",
        query: item
      });
    },
    doQuery(plus) {
      this.$vux.loading.show({
        text: "加载中"
      });
      // 资产包列表
      // rap:/46/mobile/queryAssetsList.htm
      // online:/mobile/queryAssetsList.htm
      this.$http
        .post("/mobile/queryAssetsList.htm", {
          // mock: 1,
          // token: this.openId,
          packageStatus: this.packageStatus,
          pageSize: this.pager.pageSize,
          currentNum: this.pager.currentNum
        })
        .then(res => {
          // let _data = res;
          // console.log(_data);
          console.log("eeee", res.data);
          if (res.data.code === "0000") {
            this.$vux.loading.hide();
            this.pager.count = res.data.result.count;
            if (!this.$isEmptyArr(res.data.result.list)) {
              this.show_nfdata = false;
              this.ListItem = res.data.result.list;
            } else {
              this.show_nfdata = true;
            }
            if (plus) {
              this.ListItem.push.apply(this.ListItem, res.data.result.list);
              if (res.data.result.list.length < this.pager.pageSize) {
                this.loadOver = true;
              }
            } else {
              this.loadOver = false;
              this.ListItem = res.data.result.list;
            }
          }
        });
    },
    resetHeight() {
      let vux_body = document.getElementById("vux_view_box_body");
      console.log(vux_body);
      if (vux_body) {
        vux_body.removeAttribute("style");
      }
    }
  },
  created() {
    if (localStorage.getItem("currentOpenId")) {
      this.openId = localStorage.getItem("currentOpenId");
    } else {
      this.openId = "";
    }
    document.title = "资产包";
    this.doQuery();
  },
  beforeMount() {
    // 重置子页面设置的容器样式fixed-bug
    this.resetHeight();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/scss/helper/_mixin.scss";
.page {
  color: #333333;
  background-color: #eeeeee;
  height: 100%;
  a {
    color: #333333;
  }
}
</style>
