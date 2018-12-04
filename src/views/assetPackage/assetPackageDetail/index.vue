<template>
  <div class="page inside">
    <div class="header_buttons">
      <template>
        <v-touch tag="a" v-on:tap class="h_btn yellow">待签收</v-touch>
        <span class="f_red">已过48小时，请及时关注处理</span>
      </template>
      <template>
        <v-touch tag="a" v-on:tap class="h_btn grey">状态：已确认</v-touch>
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
            <div class="flex_cont">425364657576</div>
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
            <div class="flex_cont">
              <span class="f_red">2000,000,000元</span>
            </div>
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
            <div class="flex_cont">
              <span class="linkA">待确认签收后生成</span>
            </div>
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
              <td>
                <v-touch tag="a" v-on:tap="showPopop('show_casePanel')" class="linkA">查看</v-touch>
              </td>
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
    <div class="table_remark">
      <div class="tit">确认说明：</div>
      <div class="tit_text">已确认收到邮寄的材料</div>
      <div class="tit_content"></div>
      <div class="tit_time">
        <span>确认时间：</span>
        <span>2018-02-04 13：20：12</span>
      </div>
    </div>
    <div class="remark_bottom">如有疑问，请联系工作人员：费女士 13157055002</div>

    <div class="slide_wrap">
    <div class="slide-box">
          <div class="slide-item">dfasdfkhdf</div>
          <div class="slide-item">asdfasdfadsf</div>
          <div class="slide-item">asdfsdafdasf</div>
          <div class="slide-item">asdfasdfdsa</div>
          <div class="slide-item">asdfsadfasdf</div>
        </div>
    </div>

    <div class="bottom_opts">
      <div>
        <v-touch tag="a" class="optionBtn greyBtn" v-on:tap="showPopop('show_sbackPanel')">退回</v-touch>
      </div>
      <div>
        <v-touch tag="a" class="optionBtn blueBtn" v-on:tap="showPopop('show_signPanel')">确认签收</v-touch>
      </div>
    </div>
    <!-- 签收 panel -->
    <SlimPopup
      :show.sync="show_signPanel"
      :popupClass="['popup']"
      popupTransition="slim-slide-in-bottom"
      popupPosition="bottom"
      @open="open"
      @close="close"
      class="b_popup"
    >
      <div class="popup_title">确认签收
        <v-touch class="close-btn" tag="span" v-on:tap="cancelFoo"></v-touch>
      </div>
      <div class="popup_content">
        <group :gutter="0">
          <div slot="title" :border-intent="false">
            <div class="popup_text">
              <div>(委托期限以确认签收日次日为起始日)</div>
              <div>请上传物流签收截图</div>
            </div>
          </div>
          <x-textarea :max="100" name="description" placeholder="备注说明100字以内"></x-textarea>
          <div class="popup_uploader">
            <v-touch tag="div" v-on:tap="openLocalImg" class="cameraImg"></v-touch>
          </div>
        </group>
      </div>
      <div class="popop_ctrl">
        <div>
          <v-touch tag="a" class="optionBtn greyBtn" v-on:tap="cancelFoo">取消</v-touch>
        </div>
        <div>
          <v-touch tag="a" class="optionBtn blueBtn" v-on:tap="confirmReceipt">提交</v-touch>
        </div>
      </div>
    </SlimPopup>
    <!-- end -->
    <!-- 退回 panel -->
    <SlimPopup
      :show.sync="show_sbackPanel"
      :popupClass="['popup']"
      popupTransition="slim-slide-in-bottom"
      popupPosition="bottom"
      @open="open"
      @close="close"
      class="b_popup"
    >
      <div class="popup_title">退回说明
        <v-touch class="close-btn" tag="span" v-on:tap="cancelFoo"></v-touch>
      </div>
      <div class="popup_content">
        <group :gutter="0">
          <div slot="title" :border-intent="false">
            <div class="popup_text">
              <div>(委托期限以确认签收日次日为起始日)</div>
              <div>请上传物流签收截图</div>
            </div>
          </div>
          <x-textarea :max="100" name="description" placeholder="备注说明100字以内"></x-textarea>
          <div class="popup_uploader">
            <v-touch tag="div" v-on:tap="openLocalImg" class="cameraImg"></v-touch>
          </div>
          <div class="popop_ctrl">
            <div>
              <v-touch tag="a" class="optionBtn greyBtn" v-on:tap="cancelFoo">取消</v-touch>
            </div>
            <div>
              <v-touch tag="a" class="optionBtn blueBtn" v-on:tap="confirmSback">提交</v-touch>
            </div>
          </div>
        </group>
      </div>
    </SlimPopup>
    <!-- end -->
    <!-- 案件详情 panel -->
    <SlimPopup
      :show.sync="show_casePanel"
      :popupClass="['popup']"
      popupTransition="slim-slide-in-bottom"
      popupPosition="bottom"
      @open="open"
      @close="close"
      class="b_popup"
    >
      <div class="popup_title">
        <div>案件查看</div>
        <v-touch class="close-btn" tag="span" v-on:tap="cancelFoo"></v-touch>
      </div>
      <div class="popup_smalltit">
        <span>奇速贷</span>案件名单-
        <span>20</span>个
      </div>
      <div class="popup_content">
        <div class="tab">
          <div class="wrapper" ref="wrapper">
            <ul ref="wrapperUl">
              <li class="item" v-for="(n,idx) in 7" :key="idx">反请求{{n}}</li>
              <li class="item">
                <span class="btn">申请答辩书</span>
              </li>
              <li class="item">
                <span class="btn">申请辩论书</span>
              </li>
              <li class="item">
                <span class="btn">反请求答辩书</span>
              </li>
              <li class="item">
                <span class="btn">反请求辩论书</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="slide_wrap">
    <div class="slide-box">
          <div class="slide-item">dfasdfkhdf</div>
          <div class="slide-item">asdfasdfadsf</div>
          <div class="slide-item">asdfsdafdasf</div>
          <div class="slide-item">asdfasdfdsa</div>
          <div class="slide-item">asdfsadfasdf</div>
        </div>
    </div>
        <!-- <div class="table_wrapper">
          <x-table class="cases_table">
            <thead>
              <tr>
                <th>序号</th>
                <th>案件编号</th>
                <th>仲裁申请人</th>
                <th>裁决金额</th>
                <th>被申请人</th>
                <th>法院</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>asdasd</td>
                <td>asdasd</td>
                <td>asdasdas</td>
                <td>asdasdas</td>
                <td>asdasd</td>
                <td>asdasdsad</td>
              </tr>
              <tr>
                <td>asdasd</td>
                <td>asdasd</td>
                <td>asdasdas</td>
                <td>asdasdas</td>
                <td>asdasd</td>
                <td>asdasdsad</td>
              </tr>
              <tr>
                <td>asdasd</td>
                <td>asdasd</td>
                <td>asdasdas</td>
                <td>asdasdas</td>
                <td>asdasd</td>
                <td>asdasdsad</td>
              </tr>
              <tr>
                <td>asdasd</td>
                <td>asdasd</td>
                <td>asdasdas</td>
                <td>asdasdas</td>
                <td>asdasd</td>
                <td>asdasdsad</td>
              </tr>
              <tr>
                <td>asdasd</td>
                <td>asdasd</td>
                <td>asdasdas</td>
                <td>asdasdas</td>
                <td>asdasd</td>
                <td>asdasdsad</td>
              </tr>
              <tr>
                <td>asdasd</td>
                <td>asdasd</td>
                <td>asdasdas</td>
                <td>asdasdas</td>
                <td>asdasd</td>
                <td>asdasdsad</td>
              </tr>
              <tr>
                <td>asdasd</td>
                <td>asdasd</td>
                <td>asdasdas</td>
                <td>asdasdas</td>
                <td>asdasd</td>
                <td>asdasdsad</td>
              </tr>
              <tr>
                <td>asdasd</td>
                <td>asdasd</td>
                <td>asdasdas</td>
                <td>asdasdas</td>
                <td>asdasd</td>
                <td>asdasdsad</td>
              </tr>
              <tr>
                <td>asdasd</td>
                <td>asdasd</td>
                <td>asdasdas</td>
                <td>asdasdas</td>
                <td>asdasd</td>
                <td>asdasdsad</td>
              </tr>
              <tr>
                <td>asdasd</td>
                <td>asdasd</td>
                <td>asdasdas</td>
                <td>asdasdas</td>
                <td>asdasd</td>
                <td>asdasdsad</td>
              </tr>
              <tr>
                <td>asdasd</td>
                <td>asdasd</td>
                <td>asdasdas</td>
                <td>asdasdas</td>
                <td>asdasd</td>
                <td>asdasdsad</td>
              </tr>
              <tr>
                <td>asdasd</td>
                <td>asdasd</td>
                <td>asdasdas</td>
                <td>asdasdas</td>
                <td>asdasd</td>
                <td>asdasdsad</td>
              </tr>
              <tr>
                <td>asdasd</td>
                <td>asdasd</td>
                <td>asdasdas</td>
                <td>asdasdas</td>
                <td>asdasd</td>
                <td>asdasdsad</td>
              </tr>
              <tr>
                <td>asdasd</td>
                <td>asdasd</td>
                <td>asdasdas</td>
                <td>asdasdas</td>
                <td>asdasd</td>
                <td>asdasdsad</td>
              </tr>
              <tr>
                <td>asdasd</td>
                <td>asdasd</td>
                <td>asdasdas</td>
                <td>asdasdas</td>
                <td>asdasd</td>
                <td>asdasdsad</td>
              </tr>
              <tr>
                <td>asdasd</td>
                <td>asdasd</td>
                <td>asdasdas</td>
                <td>asdasdas</td>
                <td>asdasd</td>
                <td>asdasdsad</td>
              </tr>
            </tbody>
          </x-table>
        </div>-->
      </div>
    </SlimPopup>
    <!-- end -->
  </div>
</template>

<script type="text/ecmascript-6">
import wx from "weixin-js-sdk";
import BScroll from "better-scroll";
import {
  Flexbox,
  FlexboxItem,
  XTable,
  ViewBox,
  XInput,
  XTextarea,
  Group,
  Cell
} from "vux";

export default {
  components: {
    Flexbox,
    FlexboxItem,
    XTable,
    ViewBox,
    XTextarea,
    XInput,
    Group,
    Cell
  },
  data() {
    return {
      show_signPanel: false,
      show_sbackPanel: false,
      show_casePanel: false,
      bscroll: null
    };
  },
  watch: {},
  computed: {},
  methods: {
    initScroll() {
      let fs = document.documentElement.style.fontSize.substring(
        0,
        document.documentElement.style.fontSize.length - 2
      );
      let itemWidth = (fs * 130) / 75;
      let width = itemWidth * 7;
      this.$refs.wrapperUl.style.width = width + "px";
      // this.$refs.wrapperUl.style.width = '800px'
      console.log(width, this.$refs.wrapperUl);
      this.$nextTick(() => {
        this.bscroll = new BScroll(this.$refs.wrapper, {
          scrollX: true,
          eventPassthrough: "vertical" //忽略竖直方向的滚动
        });
      });
    },
    getJsSDK() {
      console.log("getJsSDK");
    },
    initWechat() {
      // data就是上一步说的后端返回的那些数据，包含signature、nonceStr、timestamp
      // const data = getJsSDK(); //await
      // 初始化微信jssdk
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: "wx9f95c4206c9c49fc", // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: "", // 必填，生成签名的时间戳
        nonceStr: "", // 必填，生成签名的随机串
        signature: "", // 必填，签名，见附录1
        jsApiList: ["chooseImage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });

      wx.ready(function() {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      });

      wx.error(function(res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    },
    openLocalImg() {
      console.log("微信对象", wx);
      // 打开手机本地相册
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
      });
    },
    autoHeight() {
      let vux_body = document.getElementById("vux_view_box_body");
      if (vux_body) {
        vux_body.style.height = "auto";
      }
    },
    confirmReceipt() {
      // 提交 - 签收
    },
    confirmSback() {
      // 提交 - 退回
    },
    showPopop(type) {
      // 显示popup层
      if (type == "show_signPanel") {
        //  显示-签收
        this.show_signPanel = true;
      } else if (type == "show_sbackPanel") {
        // 显示-退回
        this.show_sbackPanel = true;
      } else if (type == "show_casePanel") {
        // 显示 - 案件
        this.show_casePanel = true;
        this.fetchCaseApi();
      }
    },
    fetchCaseApi() {
      // 获取案件列表数据
      this.$api.post("", {}).then(res => {
        console.log(res);
      });
    },
    cancelFoo() {
      // 隐藏popup层
      if (this.show_signPanel) {
        // 签收
        this.show_signPanel = false;
      } else if (this.show_sbackPanel) {
        // 退回
        this.show_sbackPanel = false;
      } else if (this.show_casePanel) {
        // 案件
        this.show_casePanel = false;
      }
    },
    scrollBottom(isBottom) {
      /****
       * 关闭滚动条-自动定位popup到页面底部
       * @param isBottom {boolean}
       * */
      if (isBottom) {
        // var ele = document.getElementsByTagName("html")[0];
        // ele.scrollTop = ele.scrollHeight;
        document.documentElement.style.overflowY = "hidden";
      } else {
        document.documentElement.style.overflowY = "auto";
      }
    },
    open(val) {
      console.log("open", val);
      this.scrollBottom(true);
    },
    close(val) {
      console.log("close", val);
      this.scrollBottom(false);
    }
  },
  beforeCreate() {},
  created() {
    document.title = "资产包-详情";
    // this.initWechat();
    this.autoHeight();
  },
  mounted() {
    this.initScroll();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/scss/helper/_mixin.scss";
.popup_uploader {
  padding-top: rem(30);
  padding-bottom: rem(68);
  padding-left: rem(30);
  padding-right: rem(30);
  margin-bottom: rem(40);
  @include clearfix;
  .cameraImg {
    width: rem(65);
    height: rem(65);
    background-image: url("~@/assets/img/uploadimg.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 0 0;
    float: left;
    margin-right: rem(20);
  }
}
// 标题内容公共的padding样式
%common_pdlf {
  padding-left: rem(30);
}

%common_plr {
  padding-left: rem(30);
  padding-right: rem(30);
}

$line_color: #ebebeb;
.page {
  background-color: #eeeeee;
  position: relative;
  z-index: 501;
  // height: 100vh !important;
  &.inside {
    height: 100%;
    // padding-bottom: 40vh;
  }
}

.flex_cont {
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
  &.yellow {
    background-color: #f0b300;
  }
  &.grey {
    background-color: #999999;
  }
}

.f_red {
  color: #de0101;
}

.table_info {
  @extend %common_plr;
}

.list_content {
  margin-top: rem(13);
  // margin-bottom: rem(13);
  font-size: rem(22);
  background-color: #fff;
  border-bottom: 1px solid $line_color;
  .list_title {
    @extend %common_pdlf;
    font-size: rem(28);
    padding-top: rem(26);
    padding-bottom: rem(21);
    border-bottom: 1px solid $line_color;
    margin-bottom: -1px;
  }
  .list_wrap {
    > div {
      padding-top: rem(19);
      padding-bottom: rem(17);
      @extend %common_pdlf;
      border-bottom: 1px solid $line_color;
      margin-bottom: -1px;
      color: #676767;
    }
    .vux-table {
      border-left: 1px solid $line_color;
      border-right: 1px solid $line_color;
      margin-top: rem(22);
      thead {
        font-size: rem(21);
        tr {
          background-color: #e6edff;
        }
        th {
          padding-top: rem(25);
          padding-bottom: rem(18);
          &:nth-child(1) {
            width: rem(109);
          }
          &:nth-child(2) {
          }
          &:nth-child(3) {
          }
          &:nth-child(4) {
          }
          &:nth-child(5) {
          }
          &:nth-child(6) {
          }
        }
      }
      tbody {
        font-size: rem(20);
        td {
          color: #666666;
          padding-top: rem(25);
          padding-bottom: rem(18);
        }
      }
      th,
      td {
        text-align: center;
      }
    }
    .list_todo {
      padding: 0;
      padding-top: rem(24);
      color: #adadad;
      padding-bottom: rem(43);
    }
  }
}

.linkA {
  color: #10448f;
}

.bottom_opts {
  // padding-top: 2vh;
  position: fixed;
  bottom: 0;
  width: 100vw;
  // width: 100%;
  // z-index: 1000;
  @include clearfix;
  > div {
    // display: table-cell;
    float: left;
    width: 50vw;
  }
}

.table_remark {
  @extend %common_pdlf;
  // border-top:1px solid $line_color;
  padding-top: rem(25);
  padding-bottom: rem(25);
}

.remark_bottom {
  @extend %common_pdlf;
  padding-top: rem(32);
  padding-bottom: rem(32);
  border-top: 1px solid $line_color;
  color: #adadad;
}

.table_remark,
.remark_bottom {
  background-color: #fff;
  font-size: rem(20);
}

.bottom_popup {
  height: 50vh;
  > div {
    height: 100%;
  }
}

.b_popup {
  position: fixed;
  bottom: 0;
  width: 100vw;
}
body {
  .optionBtn {
    border: 0;
  }
}

body {
  .vux-table {
    &.cases_table {
      table-layout: fixed;
      width: 500px;
      tr {
      }
      td {
      }
      thead {
        tr {
        }
        th {
          font-size: 16px;
          &:nth-child(1) {
            width: rem(120);
          }
          &:nth-child(2) {
            width: rem(200);
          }
          &:nth-child(3) {
            width: rem(220);
          }
          &:nth-child(4) {
            width: rem(150);
          }
          &:nth-child(5) {
          }
          &:nth-child(6) {
          }
        }
      }
      tbody {
        td {
          font-size: 14px;
        }
      }
    }
  }
  // .table_wrapper {
  //   width: 100vw;
  //   height: rem(500);
  //   overflow-x: auto;
  //   overflow-y: auto;
  // }
}

/* scroll style */
.tab {
  height: rem(75);
  background: #fff;
  line-height: rem(75);
  display: flex;
  font-size: rem(16);
}
.wrapper {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  ul {
  }
  li.item {
    display: inline-block;
    line-height: rem(75);
    width: rem(130);
  }
  .btn {
    border-radius: rem(40);
    // padding:rem(5) rem(8);
    &.active {
      background: #294283;
    }
  }
}
/* end */

.slide-box {
  display: -webkit-box;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
}
.slide-item {
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  margin-right: 30px;
}

.slide_wrap{
  width: rem(500);
  overflow: hidden;
  border:1px solid #e4393c;
}
</style>
