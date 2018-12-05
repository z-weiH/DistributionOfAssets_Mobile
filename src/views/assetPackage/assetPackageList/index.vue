<template>
  <div class="page">
    <view-box ref="viewBox">
      <div slot="header" class="tab_card">
        <Flexbox class="t_wrap">
          <FlexboxItem>
            <v-touch tag="a" v-on:tap>待签收</v-touch>
          </FlexboxItem>
          <FlexboxItem>
            <v-touch tag="a" v-on:tap>已退回</v-touch>
          </FlexboxItem>
          <FlexboxItem>
            <v-touch tag="a" v-on:tap>已确认</v-touch>
          </FlexboxItem>
          <FlexboxItem>
            <v-touch tag="a" v-on:tap class="active">全部</v-touch>
          </FlexboxItem>
        </Flexbox>
      </div>

      <template v-for="(it,index) in ListItem">
        <Group :gutter="0" class="card_item">
          <Cell class="card_tit" :border-intent="false">
            <span slot="title">{{it.clientName}}</span>
            <template v-if="it.packageStatus == 0">
              <slot>
                <span v-if="it.timeout == 'file'" class="f_red">已过48小时</span>
                <span class="flag_btn yellow">待分发</span>
              </slot>
            </template>
            <template v-if="it.packageStatus == 1">
              <slot>
                <span v-if="it.timeout == 'file'" class="f_red">已过48小时</span>
                <span class="flag_btn yellow">待签收</span>
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
          <v-touch v-on:tap>
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

      <Group :gutter="0" class="card_item stale">
        <Cell class="card_tit" :border-intent="false">
          <span slot="title">杭州互仲信息技术有限公司</span>
          <slot>
            <span class="f_red">已过48小时</span>
            <span class="flag_btn orange">待签收</span>
          </slot>
        </Cell>
        <v-touch v-on:tap="gotoDetail">
          <Flexbox class="card_conts" :gutter="0" wrap="wrap">
            <flexbox-item :span="1/3">
              <div class="flex_cont">
                <span>
                  <em class="dollor">2000,000.00</em>
                </span>
                <span class="dollor">元</span>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/3">
              <div class="flex_cont">
                <span>200</span>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/3">
              <div class="flex_cont">
                <span>5</span>
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

      <Group :gutter="0" class="card_item">
        <Cell class="card_tit" :border-intent="false">
          <span slot="title">杭州互仲信息技术有限公司</span>
          <slot>
            <span class="flag_btn gray">已退回</span>
          </slot>
        </Cell>
        <v-touch v-on:tap>
          <Flexbox class="card_conts" :gutter="0" wrap="wrap">
            <flexbox-item :span="1/3">
              <div class="flex_cont">
                <span>
                  <em class="dollor">2000,000.00</em>
                </span>
                <span class="dollor">元</span>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/3">
              <div class="flex_cont">
                <span>200</span>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/3">
              <div class="flex_cont">
                <span>5</span>
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

      <Group :gutter="0" class="card_item">
        <Cell class="card_tit" :border-intent="false">
          <span slot="title">杭州互仲信息技术有限公司</span>
          <slot>
            <span class="flag_btn green">已确认</span>
          </slot>
        </Cell>
        <v-touch v-on:tap>
          <Flexbox class="card_conts" :gutter="0" wrap="wrap">
            <flexbox-item :span="1/3">
              <div class="flex_cont">
                <span>
                  <em class="dollor">2000,000.00</em>
                </span>
                <span class="dollor">元</span>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/3">
              <div class="flex_cont">
                <span>200</span>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/3">
              <div class="flex_cont">
                <span>5</span>
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

      <Group :gutter="0" class="card_item">
        <Cell class="card_tit" :border-intent="false">
          <span slot="title">杭州互仲信息技术有限公司</span>
          <slot>
            <span class="flag_btn green">已确认</span>
          </slot>
        </Cell>
        <v-touch v-on:tap>
          <Flexbox class="card_conts" :gutter="0" wrap="wrap">
            <flexbox-item :span="1/3">
              <div class="flex_cont">
                <span>
                  <em class="dollor">2000,000.00</em>
                </span>
                <span class="dollor">元</span>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/3">
              <div class="flex_cont">
                <span>200</span>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/3">
              <div class="flex_cont">
                <span>5</span>
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
      <Group :gutter="0" class="card_item">
        <Cell class="card_tit" :border-intent="false">
          <span slot="title">杭州互仲信息技术有限公司</span>
          <slot>
            <span class="flag_btn green">已确认</span>
          </slot>
        </Cell>
        <v-touch v-on:tap>
          <Flexbox class="card_conts" :gutter="0" wrap="wrap">
            <flexbox-item :span="1/3">
              <div class="flex_cont">
                <span>
                  <em class="dollor">2000,000.00</em>
                </span>
                <span class="dollor">元</span>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/3">
              <div class="flex_cont">
                <span>200</span>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/3">
              <div class="flex_cont">
                <span>5</span>
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
      <Group :gutter="0" class="card_item">
        <Cell class="card_tit" :border-intent="false">
          <span slot="title">杭州互仲信息技术有限公司</span>
          <slot>
            <span class="flag_btn green">已确认</span>
          </slot>
        </Cell>
        <v-touch v-on:tap>
          <Flexbox class="card_conts" :gutter="0" wrap="wrap">
            <flexbox-item :span="1/3">
              <div class="flex_cont">
                <span>
                  <em class="dollor">2000,000.00</em>
                </span>
                <span class="dollor">元</span>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/3">
              <div class="flex_cont">
                <span>200</span>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/3">
              <div class="flex_cont">
                <span>5</span>
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
    </view-box>
  </div>
</template>

<script type="text/ecmascript-6">
import { Flexbox, FlexboxItem, Group, Cell, ViewBox, XHeader } from "vux";
/****
 *@param ListItem 案件列表数据
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
      pager: {
        count: 0
      },
      ListItem: {}
    };
  },
  methods: {
    gotoDetail() {
      this.$router.push({ name: "assetPackageDetail" });
    },
    doQuery() {
      // 资产包列表
      // rap:/46/mobile/queryAssetsList.htm
      // online:/mobile/queryAssetsList.htm
      this.$api
        .post("/mobile/queryAssetsList.htm", {
          // mock: 1,
          token: this.openId,
          packageStatus: ""
        })
        .then(res => {
          // let _data = res;
          // console.log(_data);
          console.log("eeee", res.data);
          if (res.data.code === "0000") {
            this.pager.count = res.data.result.count;
            this.ListItem = res.data.result.list;
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
