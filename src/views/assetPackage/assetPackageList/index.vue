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
      <Group :gutter="0" class="card_item">
        <Cell class="card_tit" :border-intent="false">
          <span slot="title">杭州互仲信息技术有限公司</span>
          <slot>
            <span class="flag_btn yellow">待签收</span>
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
    </view-box>
  </div>
</template>

<script type="text/ecmascript-6">
import { Flexbox, FlexboxItem, Group, Cell, ViewBox, XHeader } from "vux";
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
      show_btn: false
    };
  },
  methods:{
    gotoDetail(){
      this.$router.push({name:'assetPackageDetail'})
    }
  },
  created() {
    document.title = "资产包";
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
