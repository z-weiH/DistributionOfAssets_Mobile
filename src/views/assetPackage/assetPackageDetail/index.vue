<template>
  <div class="page inside" style="min-height: 100%;">
    <!-- <view-box ref="viewBox"> -->
    <div class="header_buttons">
      <template>
        <v-touch tag="a" v-on:tap class="h_btn yellow">待签收</v-touch>
        <span class="f_red">已过48小时，请及时关注处理</span>
      </template>
    </div>
    <div class="list_content">
      <div class="list_title">基本信息</div>
      <div class="list_wrap">
        <Flexbox>
          <flexbox-item :span="2/7">
            <div class="flex_cont">资产包编号：</div>
          </flexbox-item>
          <flexbox-item :span="20">
            <div class="flex_cont">425364657576 </div>
          </flexbox-item>
        </Flexbox>
        <Flexbox>
          <flexbox-item :span="2/7">
            <div class="flex_cont">资产包名称：</div>
          </flexbox-item>
          <flexbox-item :span="20">
            <div class="flex_cont">ajshdajshdasv不良资产</div>
          </flexbox-item>
        </Flexbox>
        <Flexbox>
          <flexbox-item :span="2/7">
            <div class="flex_cont">资产包分发方：</div>
          </flexbox-item>
          <flexbox-item :span="20">
            <div class="flex_cont">杭州合仲网络有限公司</div>
          </flexbox-item>
        </Flexbox>
        <Flexbox>
          <flexbox-item :span="2/7">
            <div class="flex_cont">渠道代理方：</div>
          </flexbox-item>
          <flexbox-item :span="20">
            <div class="flex_cont">阿斯达实打实的渠道</div>
          </flexbox-item>
        </Flexbox>
        <Flexbox>
          <flexbox-item :span="2/7">
            <div class="flex_cont">预估标的金额：</div>
          </flexbox-item>
          <flexbox-item :span="20">
            <div class="flex_cont"><span class="f_red">2000,000,000元</span></div>
          </flexbox-item>
        </Flexbox>
        <Flexbox>
          <flexbox-item :span="2/7">
            <div class="flex_cont">案件数：</div>
          </flexbox-item>
          <flexbox-item :span="20">
            <div class="flex_cont">200个</div>
          </flexbox-item>
        </Flexbox>
        <Flexbox>
          <flexbox-item :span="2/7">
            <div class="flex_cont">委托期：</div>
          </flexbox-item>
          <flexbox-item :span="20">
            <div class="flex_cont">4个月</div>
          </flexbox-item>
        </Flexbox>
        <Flexbox>
          <flexbox-item :span="2/7">
            <div class="flex_cont">委托期限：</div>
          </flexbox-item>
          <flexbox-item :span="20">
            <div class="flex_cont"><span class="linkA">待确认签收后生成</span></div>
          </flexbox-item>
        </Flexbox>
        <Flexbox>
          <flexbox-item :span="2/7">
            <div class="flex_cont">创建时间：</div>
          </flexbox-item>
          <flexbox-item :span="20">
            <div class="flex_cont">2018/11/08 13:20:20</div>
          </flexbox-item>
        </Flexbox>
      </div>
    </div>
    <div class="list_content">
      <div class="list_title">价格确认单</div>
      <div class="list_wrap table_info">
        <x-table>
          <thead>
            <tr>
              <th>产品名称</th>
              <th>仲裁申请人</th>
              <th>预估资产标的</th>
              <th>案件量</th>
              <th>佣金比例</th>
              <th>案件详情</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>奇速贷</td>
              <td>曾诚</td>
              <td>1000.100</td>
              <td>50</td>
              <td>20%</td>
              <td><v-touch tag="a" v-on:tap="" class="linkA">查看</v-touch></td>
            </tr>
          </tbody>
        </x-table>
        <div class="list_todo">
          <div>说明：</div>
          <div>请在确认收到邮寄材料后点击右下角“确认签收”；</div>
          <div>若发现资产包信息有误点击左下角“退回”。</div>
          <div>如有疑问，请联系工作人员：费女士 13157055002</div>
        </div>
      </div>
    </div>
    <div class="bottom_opts" >
      <div>
        <v-touch tag="a" class="optionBtn greyBtn" v-on:tap="">退回</v-touch>
      </div>
      <div>
        <v-touch tag="a" class="optionBtn blueBtn" v-on:tap="">确认签收</v-touch>
      </div>
    </div>
    <!-- </view-box> -->
  </div>
</template>

<script type="text/ecmascript-6">
import { Flexbox, FlexboxItem,XTable,ViewBox } from "vux";

export default {
  components: {
    Flexbox,
    FlexboxItem,
    XTable,
    ViewBox
  },
  data() {
    return {};
  },
  methods: {},
  created() {
    document.title = "资产包-详情";
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/scss/helper/_mixin.scss";
// 标题内容公共的padding样式
%common_pdlf{
  padding-left: rem(30);
}
%common_plr{
  padding-left: rem(30);
  padding-right: rem(30);
}
$line_color:#EBEBEB;

.page {
  background-color: #eeeeee;
  position: relative;
  z-index: 501;
  height: 100vh !important;
  &.inside{
    height: 100%;
    padding-bottom: 40vh;
  }

}
.flex_cont{
  background-clip: padding-box;
}

.header_buttons {
  text-align: center;
  font-size: rem(22);
  padding-top: rem(31);
  padding-bottom: rem(17);
  .f_red {
    margin-top: rem(16);
    display: inline-block;
  }
}
.h_btn {
  display: block;
  border-radius: 99px;
  height: rem(64);
  line-height: rem(64);
  text-align: center;
  font-size: rem(26);
  color: #fff;
  width: rem(480);
  margin: 0 auto;
  background-color: #f0b300;
}
.f_red {
  color: #de0101;
}
.table_info{
@extend %common_plr;
}

.list_content{
  margin-top: rem(13);
  margin-bottom: rem(13);
  font-size:rem(22);
  background-color: #fff;
  border-bottom: 1px solid $line_color;
  .list_title{
     @extend %common_pdlf;
    font-size: rem(28);
    padding-top: rem(26);
    padding-bottom: rem(21);
    border-bottom:1px solid $line_color;
    margin-bottom: -1px;
  }
  .list_wrap{

    >div{
      padding-top: rem(19);
      padding-bottom: rem(17);
      @extend %common_pdlf;
      border-bottom:1px solid $line_color;
      margin-bottom: -1px;
      color:#676767;
    }
    .vux-table{
      border-left:1px solid $line_color;
      border-right:1px solid $line_color;
      margin-top: rem(22);
      thead{
        font-size:rem(21);
        tr{
          background-color: #E6EDFF;
        }
        th{
          padding-top: rem(25);
          padding-bottom: rem(18);
          &:nth-child(1){
            width: rem(109);
          }
          &:nth-child(2){

          }
          &:nth-child(3){

          }
          &:nth-child(4){

          }
          &:nth-child(5){

          }
          &:nth-child(6){

          }
        }
      }
      tbody{
        font-size: rem(20);
        td{
          color:#666666;
          padding-top: rem(25);
          padding-bottom: rem(18);
        }
      }
      th,td{
        text-align: center;
      }
    }
    .list_todo{
      padding: 0;
      padding-top: rem(24);
      color:#ADADAD;
      padding-bottom: rem(43);
    }
  }
}
.linkA{
 color:#10448F;
}

.bottom_opts{
  padding-top: 2vh;
  position: fixed;
  bottom: 0;
  width: 100vw;
  width: 100%;
  @include clearfix;
  >div{
    // display: table-cell;
    float:left;
    width: 50vw;

  }
}
</style>
