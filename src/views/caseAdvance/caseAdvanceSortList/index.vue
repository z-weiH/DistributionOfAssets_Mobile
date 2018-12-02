<template>
  <div class="page">
    <view-box ref="viewBox">
      <div slot="header" class="tab_card">
        <Flexbox class="t_wrap">
          <FlexboxItem>
            <v-touch tag="a" v-on:tap class="active">全部</v-touch>
          </FlexboxItem>
          <FlexboxItem>
            <v-touch tag="a" v-on:tap>已签收</v-touch>
          </FlexboxItem>
          <FlexboxItem>
            <v-touch tag="a" v-on:tap>已立案</v-touch>
          </FlexboxItem>
          <FlexboxItem>
            <v-touch tag="a" v-on:tap>未立案</v-touch>
          </FlexboxItem>
          <FlexboxItem>
            <v-touch tag="a" v-on:tap>已结束</v-touch>
          </FlexboxItem>
        </Flexbox>
      </div>
      <Group :gutter="0" class="card_item">
        <Cell class="card_tit" :border-intent="false">
          <div slot="title">
            <span>案件：</span>
            <span>杭州互仲信息技术有限公司</span>
          </div>
          <slot>
            <span class="flag_btn green">已签收</span>
          </slot>
        </Cell>
        <v-touch v-on:tap>
          <Flexbox class="card_conts" :gutter="0" wrap="wrap">
            <flexbox-item :span="1/2">
              <div class="flex_cont">
                <div>
                  <span>申请人：</span>
                </div>
                <div>
                  <span class="runover_ctrl">杭州钱迷科技有限公司</span>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/2">
              <div class="flex_cont">
                <div>
                  <span>被申请人：</span>
                </div>
                <div>
                  <span>冰河</span>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/2">
              <div class="flex_cont">
                <div>
                  <span>案由：</span>
                </div>
                <div>
                  <span>借书卡u女生</span>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/2">
              <div class="flex_cont">
                <div>
                  <span>标的金额：</span>
                </div>
                <div>
                  <span>1105元</span>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/2">
              <div class="flex_cont">
                <div>
                  <span>立案日期：</span>
                </div>
                <div>
                  <span>2018-01-02</span>
                </div>
              </div>
            </flexbox-item>
          </Flexbox>
          <Flexbox :gutter="0" wrap="wrap" 　class="option">
            <flexbox-item :span="1/2">
              <v-touch class="optionBtn whiteBtn" tag="a" v-on:tap>进展查看</v-touch>
            </flexbox-item>
            <flexbox-item :span="1/2">
              <v-touch class="optionBtn whiteBtn" tag="a" v-on:tap>操作记录</v-touch>
            </flexbox-item>
          </Flexbox>
        </v-touch>
      </Group>

      <Group :gutter="0" class="card_item">
        <Cell class="card_tit" :border-intent="false">
          <div slot="title">
            <span>案件：</span>
            <span>杭州互仲信息技术有限公司</span>
          </div>
          <slot>
            <span class="flag_btn yellow">已立案</span>
          </slot>
        </Cell>
        <v-touch v-on:tap>
          <Flexbox class="card_conts" :gutter="0" wrap="wrap">
            <flexbox-item :span="1/2">
              <div class="flex_cont">
                <div>
                  <span>申请人：</span>
                </div>
                <div>
                  <span class="runover_ctrl">杭州钱迷科技有限公司</span>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/2">
              <div class="flex_cont">
                <div>
                  <span>被申请人：</span>
                </div>
                <div>
                  <span>冰河</span>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/2">
              <div class="flex_cont">
                <div>
                  <span>案由：</span>
                </div>
                <div>
                  <span>借书卡u女生</span>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/2">
              <div class="flex_cont">
                <div>
                  <span>标的金额：</span>
                </div>
                <div>
                  <span>1105元</span>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/2">
              <div class="flex_cont">
                <div>
                  <span>立案日期：</span>
                </div>
                <div>
                  <span>2018-01-02</span>
                </div>
              </div>
            </flexbox-item>
          </Flexbox>
          <Flexbox :gutter="0" wrap="wrap" 　class="option">
            <flexbox-item :span="1/2">
              <v-touch class="optionBtn whiteBtn" tag="a" v-on:tap>进展查看</v-touch>
            </flexbox-item>
            <flexbox-item :span="1/2">
              <v-touch class="optionBtn whiteBtn" tag="a" v-on:tap><span class="f_yel">(平台处理中)</span><span class="f_grey">请求案件变更</span></v-touch>
            </flexbox-item>
          </Flexbox>
        </v-touch>
      </Group>

      <Group :gutter="0" class="card_item">
        <Cell class="card_tit" :border-intent="false">
          <div slot="title">
            <span>案件：</span>
            <span>杭州互仲信息技术有限公司</span>
          </div>
          <slot>
            <span class="flag_btn jdred">未立案</span>
          </slot>
        </Cell>
        <v-touch v-on:tap>
          <Flexbox class="card_conts" :gutter="0" wrap="wrap">
            <flexbox-item :span="1/2">
              <div class="flex_cont">
                <div>
                  <span>申请人：</span>
                </div>
                <div>
                  <span class="runover_ctrl">杭州钱迷科技有限公司</span>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/2">
              <div class="flex_cont">
                <div>
                  <span>被申请人：</span>
                </div>
                <div>
                  <span>冰河</span>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/2">
              <div class="flex_cont">
                <div>
                  <span>案由：</span>
                </div>
                <div>
                  <span>借书卡u女生</span>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/2">
              <div class="flex_cont">
                <div>
                  <span>标的金额：</span>
                </div>
                <div>
                  <span>1105元</span>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/2">
              <div class="flex_cont">
                <div>
                  <span>立案日期：</span>
                </div>
                <div>
                  <span>2018-01-02</span>
                </div>
              </div>
            </flexbox-item>
          </Flexbox>
          <Flexbox :gutter="0" wrap="wrap" 　class="option">
            <flexbox-item :span="1/2">
              <v-touch class="optionBtn whiteBtn" tag="a" v-on:tap>进展查看</v-touch>
            </flexbox-item>
            <flexbox-item :span="1/2">
              <v-touch class="optionBtn whiteBtn" tag="a" v-on:tap><span class="f_red">(款项未结清)</span><span>请求案件变更</span></v-touch>
            </flexbox-item>
          </Flexbox>
        </v-touch>
      </Group>

      <Group :gutter="0" class="card_item">
        <Cell class="card_tit" :border-intent="false">
          <div slot="title">
            <span>案件：</span>
            <span>杭州互仲信息技术有限公司</span>
          </div>
          <slot>
            <span class="flag_btn grey">已结束</span>
          </slot>
        </Cell>
        <v-touch v-on:tap>
          <Flexbox class="card_conts" :gutter="0" wrap="wrap">
            <flexbox-item :span="1/2">
              <div class="flex_cont">
                <div>
                  <span>申请人：</span>
                </div>
                <div>
                  <span class="runover_ctrl">杭州钱迷科技有限公司</span>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/2">
              <div class="flex_cont">
                <div>
                  <span>被申请人：</span>
                </div>
                <div>
                  <span>冰河</span>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/2">
              <div class="flex_cont">
                <div>
                  <span>案由：</span>
                </div>
                <div>
                  <span>借书卡u女生</span>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/2">
              <div class="flex_cont">
                <div>
                  <span>标的金额：</span>
                </div>
                <div>
                  <span>1105元</span>
                </div>
              </div>
            </flexbox-item>
            <flexbox-item :span="1/2">
              <div class="flex_cont">
                <div>
                  <span>立案日期：</span>
                </div>
                <div>
                  <span>2018-01-02</span>
                </div>
              </div>
            </flexbox-item>
          </Flexbox>
          <Flexbox :gutter="0" wrap="wrap" 　class="option">
            <flexbox-item :span="1/2">
              <v-touch class="optionBtn whiteBtn" tag="a" v-on:tap="gotoDetail">进展查看</v-touch>
            </flexbox-item>
            <flexbox-item :span="1/2">
              <v-touch class="optionBtn whiteBtn" tag="a" v-on:tap><span class="f_grey">(款项已结清)</span></v-touch>
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
    return {};
  },
  methods:{
    gotoDetail(){
      this.$router.push({name:'assetPackageDetail'})
    }
  },
  created () {
    document.title = '案件进展'
  }
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
  .card_item {
    .card_tit {
    }
    /* button class insert */
    .card_conts {
      padding-left: rem(30);
      & > div {
      }
    }
    .flex_cont {
      display: table;
      > div {
        display: table-cell;
        vertical-align: middle;
      }
      span {
      }
    }
  }
}

.card_conts {
}
</style>
