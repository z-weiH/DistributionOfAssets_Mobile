<template>
  <div class="page inside" ref="inside">
    <div class="header_buttons">
      <template v-if="ListItem.packageStatus == 1">
        <v-touch tag="a" v-on:tap class="h_btn yellow">状态：待签收</v-touch>
        <span
          v-if="parentRtParams.timeout && parentRtParams.timeout == 'file'"
          class="f_red"
        >已过48小时，请及时关注处理</span>
      </template>
      <template v-if="ListItem.packageStatus == 2">
        <v-touch tag="a" v-on:tap class="h_btn green">状态：已确认</v-touch>
      </template>
      <template v-if="ListItem.packageStatus == 3">
        <v-touch tag="a" v-on:tap class="h_btn grey">状态：已退回</v-touch>
      </template>
    </div>
    <!-- 物流信息 -->
    <div class="list_content" v-if="ListItem.packageStatus == 1">
      <div class="list_title">物流信息</div>
      <div class="list_wrap">
        <Flexbox>
          <flexbox-item :span="2/7">
            <div class="flex_cont">物流公司：</div>
          </flexbox-item>
          <flexbox-item :span="7">
            <div class="flex_cont">{{ListItem.logisticsCompany}}</div>
          </flexbox-item>
        </Flexbox>
        <Flexbox>
          <flexbox-item :span="2/7">
            <div class="flex_cont">物流单号：</div>
          </flexbox-item>
          <flexbox-item :span="7">
            <div class="flex_cont">{{ListItem.logisticsNo}}</div>
          </flexbox-item>
        </Flexbox>
        <Flexbox>
          <flexbox-item :span="2/7">
            <div class="flex_cont">附件截图：</div>
          </flexbox-item>
          <flexbox-item :span="7">
            <div class="flex_cont">
              <img
                class="zoompic"
                v-for="(it,index) in logisticsPng"
                @click="showImagePreview(logisticsPng)"
                :src="it.replace(/http:|https:/g,'')"
              >
            </div>
          </flexbox-item>
        </Flexbox>
      </div>
    </div>
    <!-- end -->
    <div class="list_content">
      <div class="list_title">基本信息</div>
      <div class="list_wrap">
        <Flexbox>
          <flexbox-item :span="2/7">
            <div class="flex_cont">资产包编号：</div>
          </flexbox-item>
          <flexbox-item :span="7">
            <div class="flex_cont">{{ListItem.packageId}}</div>
          </flexbox-item>
        </Flexbox>
        <Flexbox>
          <flexbox-item :span="2/7">
            <div class="flex_cont">资产包名称：</div>
          </flexbox-item>
          <flexbox-item :span="7">
            <div class="flex_cont">{{ListItem.clientName}}</div>
          </flexbox-item>
        </Flexbox>
        <Flexbox>
          <flexbox-item :span="2/7">
            <div class="flex_cont">资产包分发方：</div>
          </flexbox-item>
          <flexbox-item :span="7">
            <div class="flex_cont">{{ListItem.packageSupplier}}</div>
          </flexbox-item>
        </Flexbox>
        <Flexbox>
          <flexbox-item :span="2/7">
            <div class="flex_cont">渠道代理方：</div>
          </flexbox-item>
          <flexbox-item :span="7">
            <div class="flex_cont">{{ListItem.agencyName}}</div>
          </flexbox-item>
        </Flexbox>
        <Flexbox>
          <flexbox-item :span="2/7">
            <div class="flex_cont">预估标的金额：</div>
          </flexbox-item>
          <flexbox-item :span="7">
            <div class="flex_cont">
              <span class="f_red">{{ListItem.estimateAmt}}元</span>
            </div>
          </flexbox-item>
        </Flexbox>
        <Flexbox>
          <flexbox-item :span="2/7">
            <div class="flex_cont">案件数：</div>
          </flexbox-item>
          <flexbox-item :span="7">
            <div class="flex_cont">{{ListItem.caseQuantity}}个</div>
          </flexbox-item>
        </Flexbox>
        <Flexbox>
          <flexbox-item :span="2/7">
            <div class="flex_cont">委托期：</div>
          </flexbox-item>
          <flexbox-item :span="7">
            <div class="flex_cont">
              <template
                v-if="ListItem.entrustPeriod && ListItem.entrustPeriod.length != 39"
              >{{ListItem.entrustPeriod}}</template>
              <template v-else>
                {{ ListItem.entrustPeriod && this.$strStartToEnd(ListItem.entrustPeriod,'至')}}
                <br>
                <div>至</div>
                {{ ListItem.entrustPeriod && this.$strSpecifyToEnd(ListItem.entrustPeriod,'至')}}
              </template>
            </div>
          </flexbox-item>
        </Flexbox>
        <Flexbox>
          <flexbox-item :span="2/7">
            <div class="flex_cont">委托期限：</div>
          </flexbox-item>
          <flexbox-item :span="7">
            <div class="flex_cont">
              <span class="linkB">{{ListItem.entrustDeadline}}个月</span>
            </div>
          </flexbox-item>
        </Flexbox>
        <Flexbox>
          <flexbox-item :span="2/7">
            <div class="flex_cont">创建时间：</div>
          </flexbox-item>
          <flexbox-item :span="7">
            <div class="flex_cont">{{ListItem.createTime}}</div>
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
              <th v-if="com_rate == 1">佣金比例</th>
              <th>案件详情</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(it,index) in ListItem.list">
              <tr>
                <td>{{it.productName}}</td>
                <td>{{it.arbApplicant}}</td>
                <td>{{it.clientEstimateAmt}}元</td>
                <td>{{it.actualCaseQuantity}}个</td>
                <td v-if="com_rate == 1">{{it.commissionRate}}%</td>
                <td>
                  <v-touch
                    tag="a"
                    v-on:tap="showPopop('show_casePanel'),fetchCaseApi(it)"
                    class="linkA"
                  >查看</v-touch>
                </td>
              </tr>
            </template>
          </tbody>
        </x-table>
        <div class="list_todo" v-if="ListItem.packageStatus == 1">
          <div>说明：</div>
          <div>请在确认收到邮寄材料后点击右下角“确认签收”；</div>
          <div>若发现资产包信息有误点击左下角“退回”。</div>
          <div>如有疑问，请联系工作人员：15669007971</div>
        </div>
      </div>
    </div>

    <!-- 资产包操作记录 -->
    <template v-if="ListItem.packageOperationLog">
      <div class="table_remark">
        <template v-for="(it,index) in ListItem.packageOperationLog">
          <div v-if="it.status === 2">
            <div class="tit">{{index+1}}、确认说明</div>
            <div class="tit_text">
              <span>操作详情：</span>
              <span>{{it.notes}}</span>
            </div>
            <div class="tit_content">
              <div class="tit">附件列表：</div>
              <div v-for="(pic,idx) in it.pngUrl.split(',')" :key="idx">
                <!-- <img @click="handleShowImg(idx)" :src="pic.replace(/http:|https:/g,'')">
                <previewer
                  :ref="'previewer' + idx"
                  :list="imageFormat(it.pngUrl.split(','))"
                ></previewer>-->
                <img
                  @click="showImagePreview(it.pngUrl.split(','))"
                  :src="pic.replace(/http:|https:/g,'')"
                >
              </div>
            </div>
            <div class="tit_time">
              <span>操作时间：</span>
              <span>{{it.submitDate}}</span>
            </div>
          </div>
          <div v-if="it.status === 3">
            <div class="tit">{{index+1}}、退回说明</div>
            <div class="tit_text">
              <span>操作详情：</span>
              <span>{{it.notes}}</span>
            </div>
            <div class="tit_content">
              <div class="tit">附件列表：</div>
              <template v-for="(pic,idx) in it.pngUrl.split(',')">
                <!-- <img @click="handleShowImg(idx)" :src="pic.replace(/http:|https:/g,'')">
                <previewer :ref="'previewer' + idx" :list="imageFormat(it.pngUrl.split(','))"></previewer>-->
                <img
                  @click="showImagePreview(it.pngUrl.split(','))"
                  :src="pic.replace(/http:|https:/g,'')"
                >
              </template>
            </div>
            <div class="tit_time">
              <span>操作时间：</span>
              <span>{{it.submitDate}}</span>
            </div>
          </div>
        </template>
      </div>
      <!-- <div class="remark_bottom">如有疑问，请联系工作人员：15669007971</div> -->
    </template>
    <!-- end -->
    <template v-if="ListItem.packageStatus === 1">
      <div class="bottom_opts">
        <div>
          <v-touch tag="a" class="optionBtn greyBtn" v-on:tap="showPopop('show_sbackPanel')">退回</v-touch>
        </div>
        <div>
          <v-touch tag="a" class="optionBtn blueBtn" v-on:tap="showPopop('show_signPanel')">确认签收</v-touch>
        </div>
      </div>
    </template>
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
          <x-textarea :max="100" name="description" placeholder="备注说明100字以内" v-model="sign_notes"></x-textarea>
          <div class="popup_uploader">
            <!-- <v-touch tag="div" v-on:tap="openLocalImg" class="cameraImg"></v-touch> -->
            <upload v-model="pngUrl" class="m-upload"></upload>
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
          <x-textarea
            :max="100"
            name="description"
            placeholder="备注说明100字以内"
            v-model="sendback_notes"
          ></x-textarea>
          <div class="popup_uploader">
            <!-- <v-touch tag="div" v-on:tap="openLocalImg" class="cameraImg"></v-touch> -->
            <upload v-model="pngUrl" class="m-upload"></upload>
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
    <div class="vtdom_casewrap" v-transfer-dom>
      <!-- 案件详情 panel -->
      <SlimPopup
        :show.sync="show_casePanel"
        :popupClass="['popup']"
        popupTransition="slim-slide-in-bottom"
        popupPosition="bottom"
        @open="open"
        @close="close"
        class="b_popup caseListPanel"
      >
        <div class="popup_title">
          <div>案件查看</div>
          <v-touch class="close-btn" tag="span" v-on:tap="cancelFoo"></v-touch>
        </div>
        <div class="popup_smalltit">
          <span>&nbsp;&nbsp;{{caseItem.productName}}&nbsp;&nbsp;</span>案件名单-
          <span>{{caseItem.actualCaseQuantity}}</span>个
        </div>
        <div class="popup_content">
          <div class="slide_wrap">
            <div class="slide-box">
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
                  <template v-for="(it,index) in caseItem">
                    <tr>
                      <td>{{index+1}}</td>
                      <td>{{it.caseId}}</td>
                      <td>{{it.arbApplicant}}</td>
                      <td>{{it.adjudicationAmt}}</td>
                      <td>{{it.arbRespondent}}</td>
                      <td>{{it.courtName}}</td>
                    </tr>
                  </template>
                </tbody>
              </x-table>
            </div>
          </div>
        </div>
      </SlimPopup>
      <!-- end -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import wx from "weixin-js-sdk";
import BScroll from "better-scroll";
import ImagePreview from "vant/lib/image-preview";
import "vant/lib/image-preview/style";

/****
 * @param parentRtParams 父路由传递参数对象
 * @param ListItem 详情所有数据
 * @param caseItem 案件列表所有数据
 * @param com_rate 佣金比例
 * @param sign_notes 签收-备注
 * @param sendback_notes 退回-备注
 * @param packageStatus 1待签收 2已确认 3已退回
 */
import {
  Flexbox,
  FlexboxItem,
  XTable,
  XInput,
  XTextarea,
  Group,
  Cell
} from "vux";
import upload from "@/components/upload.vue";
import qs from "qs";
export default {
  components: {
    Flexbox,
    FlexboxItem,
    XTable,
    XTextarea,
    XInput,
    Group,
    Cell,
    upload
  },
  data() {
    return {
      show_signPanel: false,
      show_sbackPanel: false,
      show_casePanel: false,
      bscroll: null,
      parentRtParams: {},
      logisticsPng: [],
      ListItem: {
        // 物流附件图片
        // logisticsPng:[]
      },
      pngUrl: [],
      caseItem: {},
      com_rate: null,
      openId: "",
      sign_notes: "",
      sendback_notes: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    getParams() {
      // 获取父路由参数
      // 主键
      this.parentRtParams.packageId = this.$route.query.packageId;
      // 状态
      // this.ListItem.packageStatus = this.$route.query.packageStatus;
      // 已过48小时状态
      this.parentRtParams.timeout = this.$route.query.timeout;
      // 用户登录信息
      let _users = qs.parse(localStorage.getItem("$userInfo"));
      // 用户称谓权限
      this.com_rate = _users.type;

      console.log("用户称谓权限", this.com_rate);
      // console.log(
      //   "ListItem.packageStatus--",
      //   this.ListItem.packageStatus
      // );
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
    updateAssetPackStatus(args) {
      // 更新-资产包状态方法
      /****
       * @augments notes
       * @augments packageId
       * @augments packageStatus
       * @augments pngUrl
       */
      this.$vux.loading.show({
        text: "加载中"
      });
      this.$http
        .post("/mobile/updateAssetPackageStatus.htm", {
          notes: args.notes,
          packageId: args.packageId,
          packageStatus: args.packageStatus, //已确认
          pngUrl: this.pngUrl.join(",")
        })
        .then(res => {
          if (res.data.code === "0000") {
            this.$vux.loading.hide();
            switch (args.packageStatus) {
              case 1:
                break;
              case 2:
                console.log("提交 - 签收", res.data);
                this.show_signPanel = false;
                this.$vux.toast.text("签收成功");
                setTimeout(() => {
                  this.$router.go(-1);
                }, 10);
                break;
              case 3:
                console.log("提交 - 退回", res.data);
                this.show_sbackPanel = false;
                this.$vux.toast.text("退回成功");
                setTimeout(() => {
                  this.$router.go(-1);
                }, 10);
                break;
              default:
                break;
            }
          }
        })
        .catch(err => {
          this.$vux.toast.text(err.data.description);
        });
    },
    PopupVerifyFn() {
      //弹层 提交 校验逻辑
      if (this.pngUrl.length === 0) {
        return this.$vux.toast.show("请上传图片");
      }
      return true;
    },
    confirmReceipt() {
      // 提交 - 签收
      let success = this.PopupVerifyFn();
      if (success) {
        this.updateAssetPackStatus({
          notes: this.sign_notes,
          packageId: this.parentRtParams.packageId,
          packageStatus: 2, //已确认
          pngUrl: ""
        });
      }
    },
    confirmSback() {
      // 提交 - 退回
      let success = this.PopupVerifyFn();
      if (success) {
        this.updateAssetPackStatus({
          notes: this.sendback_notes,
          packageId: this.parentRtParams.packageId,
          packageStatus: 3, //已退回
          pngUrl: ""
        });
      }
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
        // let _page = this.$refs.inside;
        // console.log("_page", _page);
        // _page.addEventListener("touchmove", function(e) {
        //   e.preventDefault();
        //   console.log("绑定-touchmove");
        // });
        // this.fetchCaseApi();
      }
    },
    fetchCaseApi(item) {
      console.log("packageClientId - ", item);
      // 获取案件列表数据
      this.$http
        .post("/mobile/queryPriceConfirmation.htm", {
          // token: this.openId,
          packageClientId: item.packageClientId,
          proCode: item.proCode,
          clientCode: item.clientCode,
          packageId: this.parentRtParams.packageId
        })
        .then(res => {
          console.log("获取案件列表数据", res);
          if (res.data.code === "0000") {
            this.caseItem = Object.assign(res.data.result, item);
            console.log("this.caseItem", this.caseItem);
          }
        })
        .catch(err => {
          this.$vux.toast.text(err.data.description);
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
      // let _page = this.$refs.inside;
      // console.log("_page", _page);
      // _page.addEventListener("touchmove", function(e) {
      //   _page.removeEventListener("touchmove", function(e) {
      //     console.log("解绑-touchmove");
      //   });
      // });
    },
    imageFormat(item) {
      console.log("imageFormat-item", item);
      return item.map(v => {
        console.log("imageFormat:", v);
        return { src: v.replace(/http:|https:/g, "") };
      });
    },
    showImagePreview(img) {
      // console.log(img)
      ImagePreview(img);
    },
    handleShowImg(index) {
      console.log("index-showimg:", index);
      this.$refs["previewer" + index][0].show(index);
    },
    doQuery() {
      this.$vux.loading.show({
        text: "加载中"
      });
      // 资产包详情
      this.$http
        .post("/mobile/queryAssetsDetails.htm", {
          packageId: this.parentRtParams.packageId,
          token: this.openId
        })
        .then(res => {
          if (res.data.code === "0000") {
            this.$vux.loading.hide();
            this.ListItem = res.data.result;
            this.ListItem.logisticsPng
              ? (this.logisticsPng = this.ListItem.logisticsPng.split(","))
              : "";
            console.log(this.ListItem);
          }
        })
        .catch(err => {
          this.$vux.toast.text(err.data.description);
        });
    }
  },
  beforeCreate() {},
  created() {
    if (localStorage.getItem("currentOpenId")) {
      this.openId = localStorage.getItem("currentOpenId");
    } else {
      this.openId = "";
    }
    document.title = "资产包-详情";
    // this.initWechat();
    this.getParams();
    // this.autoHeight();
    this.doQuery();
  },
  mounted() {

  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/scss/helper/_mixin.scss";

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
    // height: 100%;
    // padding-bottom: 40vh;
    height: calc(100% - 0.453333rem);
    margin-bottom: 0.453333rem;
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
  &.green {
    background-color: #3ca028;
  }
}

.f_red {
  color: #de0101;
}

.table_info {
  // @extend %common_plr;
  display: table;
  width: 100%;
  padding-top: rem(20);
  margin: 0 auto;
  padding-bottom: rem(70);
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
      width: rem(700);
      margin: 0 auto;
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
      padding-left: rem(30);
      padding-right: rem(30);
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
  .tit_content {
    img {
      width: 60px;
      margin-right: rem(20);
    }
  }
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
      // table-layout: fixed;
      width: 700px;
      tr {
      }
      td {
      }
      thead {
        tr {
        }
        th {
          font-size: 16px;
          height: 35px;
          line-height: 35px;
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
            width: rem(200);
          }
          &:nth-child(6) {
            width: rem(300);
          }
        }
      }
      tbody {
        td {
          font-size: 14px;
          padding: rem(12) rem(4);
        }
      }
    }
  }
}

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

.slide_wrap {
  width: rem(700);
  margin: 0 auto;
  overflow: hidden;
  border: 1px solid #787878; //#e4393c
}

.vtdom_casewrap {
  position: fixed;
  z-index: 1000;
}
// 可缩放图样式
.zoompic {
  width: 60px;
  margin: 0 rem(10);
}
</style>
<style lang="scss">
@import "@/assets/style/scss/helper/_mixin.scss";
.caseListPanel {
  .hahah123213123 {
    height: 50vh;
    overflow: auto;
    .popup_title {
      position: fixed !important;
      width: 100%;
      z-index: 1;
    }
    .popup_content {
      height: 100%;
    }
    .popup_smalltit {
      padding: rem(10) 0;
      position: fixed;
      width: 100%;
      z-index: 1;
      /* top: 35px; */
      bottom: 40vh;
    }
    .popup_content {
      padding-top: rem(150);
    }
  }
}
</style>
