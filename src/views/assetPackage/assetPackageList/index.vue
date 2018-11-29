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
  created() {
    document.title = "资产包";
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/scss/helper/_mixin.scss";
$line-color: #d5d5d5;
$active-color: #003888;
%fixed-layout {
  position: fixed;
  width: 100%;
  display: table;
}

.page {
  color: #333333;
  background-color: #eeeeee;
  height: 100%;
  a {
    color: #333333;
  }
}


.tab_header {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
}

.tab_card {
  padding: rem(20) 0;
  border-bottom: 1px solid $line-color;
  background-color: #f3f6ff;
  font-size: rem(21);
  // @extend %fixed-layout;
  // top: 0;
  a {
    display: block;
    &.active {
      color: $active-color;
    }
  }
  .t_wrap {
    > div {
      &:first-child {
        a {
          border-left: 0;
        }
      }
    }
  }
  > div {
    text-align: center;

    a {
      border-left: 1px solid $line-color;
    }
  }
}

.card_item {
  margin-top: rem(14);
  // 已过期
  &.stale {
    background-color: #fffaea;
  }
  .card_tit {
    border-bottom: 1px solid #f0f0f0;
    font-size: rem(22);
  }
  .card_conts {
    font-size: rem(23);
    padding-top: rem(30);
    > div {
      padding-bottom: rem(28);
    }
  }
  .flex_cont {
    text-align: center;
  }
  .dollor {
    font-style: normal;
    color: #e4393c;
  }
}

/* 状态标记按钮 style */
.flag_btn {
  display: inline-block;
  border-radius: rem(99);
  font-size: rem(21);
  // height: rem(39);
  // line-height: rem(39);
  text-align: center;
  padding-top: rem(9);
  padding-bottom: rem(9);
  padding-left: rem(26);
  padding-right: rem(26);
  border-width: rem(2);
  border-style: solid;
  &.yellow {
    $yel: #f0b300;
    border-color: $yel;
    color: $yel;
  }
}
/* end */

/* 红色字体 */
.f_red {
  color: #e4393c;
}
/* end */
</style>
