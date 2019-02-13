<template>
  <div class="case-advance-sort-list">
    <view-box ref="viewBox">
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="search_bar">
          <div class="search_panel">
            <div class="div1">
              <x-input
                type="text"
                @keyup.native.13="searchFoo"
                v-model="searchWords"
                placeholder="搜索:仲裁案号/执行案号/被申请人姓名"
              ></x-input>
            </div>
            <div class="div2" @click="searchFoo">
              <span class="ico_search"></span>
            </div>
          </div>
        </div>
      </div>
      <div slot="header" class="search-item">
        <flexbox :gutter="0">
          <flexbox-item v-for="(item,index) in searchList" :key="index">
            <v-touch
              tag="a"
              v-on:tap="handleActive(item,index)"
              :class="{'search-active' : item.active}"
            >
              <div class="flex-demo">{{item.text}}</div>
            </v-touch>
          </flexbox-item>
        </flexbox>
      </div>
      <scroller
        :probeType="1"
        :data="dataList"
        :pulldown="true"
        :pullup="true"
        @scrollToEnd="loadMore"
        @pulldown="refreshList"
        :loadOver="loadOver"
        :class="{'nodata' : dataList.length === 0}"
      >
        <!-- 列表 -->
        <div class="item-list-box">
          <div class="item-list" v-for="(item,index) in dataList" :key="index">
            <div class="item-title">
              <group :gutter="0" class="card_item">
                <cell :border-intent="false" class="sub-item">
                  <div slot="title" class="card_tit">案件：{{item.arbCaseNo}}</div>
                  <div v-if="item.caseStatus === 4" class="flag_btn green">已签收</div>
                  <div v-if="item.caseStatus === 2" class="flag_btn gray">已结案</div>
                  <div v-if="item.caseStatus === 1" class="flag_btn jdred">未立案</div>
                  <div v-if="item.caseStatus === 0" class="flag_btn yellow">已立案</div>
                </cell>
              </group>
            </div>
            <div class="item-content">
              <flexbox :gutter="0">
                <flexbox-item>
                  <div class="mcontent">申请人：{{item.arbApplicant}}</div>
                </flexbox-item>
                <flexbox-item>
                  <div class="mcontent">被申请人：{{item.arbRespondent}}</div>
                </flexbox-item>
              </flexbox>

              <flexbox :gutter="0">
                <flexbox-item>
                  <div class="mcontent">案由：{{item.caseCause}}</div>
                </flexbox-item>
                <flexbox-item>
                  <div class="mcontent">裁决金额：{{item.adjudicationAmt}}</div>
                </flexbox-item>
              </flexbox>

              <!-- <flexbox :gutter="0">
            <flexbox-item>
              <div class="mcontent">
                立案日期：{{item.recordDate.split(' ')[0]}}
              </div>
            </flexbox-item>
              </flexbox>-->
            </div>
            <!-- <div class="item-handle">
              <flexbox :gutter="0">
                <flexbox-item class="handle-btn">
                  <a @click="handleSee(item,index)">进展查看</a>
                </flexbox-item>
                <flexbox-item class="handle-btn">
                  <template
                    v-if="item.caseStatus === 2 && (item.progressReason === '代理商法催回款' || item.progressReason === '自主回款') && item.repaymentAll === 0"
                  >
                    <span class="color-red">(款项未结清)</span>
                    <a @click="handleCaseAlteration(item,index)">请求案件变更</a>
                  </template>
                  <template
                    v-else-if="item.caseStatus === 2 && (item.progressReason === '代理商法催回款' || item.progressReason === '自主回款') && item.repaymentAll === 1"
                  >
                    <span>(款项已结清)</span>
                  </template>
                  <template v-else-if="item.confirmedStatus === 0 || item.confirmedStatus === 2">
                    <span class="color-yellow">(平台处理中)</span>
                  </template>
                  <template v-else>
                    <a @click="handleCaseAlteration(item,index)">请求案件变更</a>
                  </template>
                </flexbox-item>
              </flexbox>
            </div>-->
            <!-- 更新案件状态 -->
            <div class="update_case_status">
              <Flexbox>
                <FlexboxItem>
                  <template
                    v-if="item.caseStatus === 2 && (item.progressReason === '代理商法催回款' || item.progressReason === '自主回款') && item.repaymentAll === 0"
                  >
                    <x-button
                      @click.native="handleCaseAlteration(item,index)"
                      type="primary"
                      :gradients="['#0f357f', '#0f357f']"
                    >
                      <span class="color-red">(款项未结清)</span>更新案件状态
                    </x-button>
                  </template>
                  <template
                    v-else-if="item.caseStatus === 2 && (item.progressReason === '代理商法催回款' || item.progressReason === '自主回款') && item.repaymentAll === 1"
                  >
                    <x-button disabled type="primary" :gradients="['#fff', '#fff']">
                      <span>(款项已结清)</span>
                    </x-button>
                  </template>
                  <template v-else-if="item.confirmedStatus === 0 || item.confirmedStatus === 2">
                    <x-button disabled type="primary" :gradients="['#fff', '#fff']">
                      <span class="color-yellow">(平台处理中)</span>
                    </x-button>
                  </template>
                  <template v-else>
                    <x-button
                      @click.native="handleCaseAlteration(item,index)"
                      type="primary"
                      :gradients="['#0f357f', '#0f357f']"
                    >更新案件状态</x-button>
                  </template>
                </FlexboxItem>
              </Flexbox>
            </div>
            <!-- end -->
            <!-- 新版 - 按钮group -->
            <div class="item_complex_btns">
              <Flexbox>
                <FlexboxItem :span="6">
                  <Flexbox class="flex_ico_btn">
                    <FlexboxItem>
                      <v-touch tag="div" v-on:tap="handleSee(item,index)" class="ico_progress">进展</v-touch>
                    </FlexboxItem>
                    <FlexboxItem>
                      <v-touch
                        tag="div"
                        v-on:tap="getCurrentItem(item),showPopop('show_leaveMsg')"
                        class="ico_msg"
                      >留言</v-touch>
                    </FlexboxItem>
                  </Flexbox>
                </FlexboxItem>
                <FlexboxItem :span="6" class="flex_def_btn">
                  <template v-if="item.delayStatus == 0">
                    <x-button mini style="border-radius:99px;" :gradients="['#666','#666']">延期申请审核中</x-button>
                  </template>
                  <template v-else-if="item.delayStatus == 1">
                    <x-button
                      mini
                      style="border-radius:99px;"
                      :gradients="['#1D975E','#1D975E']"
                    >延期申请通过</x-button>
                  </template>
                  <template v-else-if="item.delayStatus == 2">
                    <x-button
                      mini
                      plain
                      style="border-radius:99px;"
                      @click.native="getCurrentItem(item),showCustomModal('rejectModal')"
                    >查看驳回原因</x-button>
                  </template>
                  <template v-else>
                    <x-button
                      mini
                      plain
                      style="border-radius:99px;"
                      @click.native="getCurrentItem(item),showPopop('show_mandates')"
                    >申请延长委托期</x-button>
                  </template>
                </FlexboxItem>
              </Flexbox>
            </div>
            <!-- end -->
          </div>

          <div v-if="dataList.length === 0" class="nfcase_panel">当前阶段暂无数据</div>
        </div>
      </scroller>
    </view-box>

    <!-- 留言 panel -->
    <SlimPopup
      :show.sync="show_leaveMsg"
      :popupClass="['popup']"
      popupTransition="slim-slide-in-bottom"
      popupPosition="bottom"
      @open="open"
      @close="close"
      class="b_popup"
    >
      <div class="popup_title">留言
        <v-touch class="close-btn" tag="span" v-on:tap="cancelFoo"></v-touch>
      </div>
      <div class="popup_content">
        <group :gutter="0">
          <div slot="title" :border-intent="false">
            <div class="popup_text">
              <div>(遇到问题，可以在此发送留言至平台，工作人员知晓后会联系你们)</div>
              <div>请上传截图</div>
            </div>
          </div>
          <x-textarea :max="100" name="description" placeholder="备注说明100字以内" v-model="leave_msg"></x-textarea>
          <div class="popup_uploader">
            <!-- <v-touch tag="div" v-on:tap="openLocalImg" class="cameraImg"></v-touch> -->
            <upload v-model="pngUrl" class="m-upload"></upload>
          </div>
        </group>
      </div>
      <div class="popop_ctrl">
        <div>
          <v-touch tag="a" class="optionBtn blueBtn" v-on:tap="confirmPopup('show_leaveMsg')">确认提交</v-touch>
        </div>
      </div>
    </SlimPopup>
    <!-- end -->
    <!-- 申请延期委托 panel -->
    <SlimPopup
      :show.sync="show_mandates"
      :popupClass="['popup']"
      popupTransition="slim-slide-in-bottom"
      popupPosition="bottom"
      @open="open"
      @close="close"
      class="b_popup"
    >
      <div class="popup_title">申请延期委托
        <v-touch class="close-btn" tag="span" v-on:tap="cancelFoo"></v-touch>
      </div>
      <div class="popup_content">
        <group :gutter="0">
          <div slot="title" :border-intent="false">
            <div class="popup_text">
              <div>(如果发送需要延长委托期的案件，可以尝试在这里提出申请，经平台审核后将作出处理)</div>
              <div>请上传截图</div>
            </div>
          </div>
          <group :gutter="0" label-width="4em" class="mandates_textarea">
            <popup-picker
              @on-change="handleApplyMandatesChange"
              v-model="mandatesForm.mandates"
              :data="mandates_picker"
              placeholder="请选择"
              value-text-align="left"
              class="required"
            >
              <div slot="title" class="tit must_fill" style="padding-right:25px;">延长为</div>
            </popup-picker>
            <cell align-items="flex-start" :border-intent="false">
              <div slot="title" class="tit must_fill">延长理由</div>
              <slot>
                <x-textarea
                  :max="100"
                  name="description"
                  placeholder="备注说明100字以内"
                  v-model="mandatesForm.mandates_msg"
                ></x-textarea>
              </slot>
            </cell>
          </group>
          <!-- 延长为 -->
          <div class="popup_uploader">
            <!-- <v-touch tag="div" v-on:tap="openLocalImg" class="cameraImg"></v-touch> -->
            <upload v-model="mandatesForm.imgUrls" class="m-upload"></upload>
          </div>
        </group>
      </div>
      <div class="popop_ctrl">
        <div>
          <v-touch tag="a" class="optionBtn blueBtn" v-on:tap="confirmPopup('show_mandates')">确认提交</v-touch>
        </div>
      </div>
    </SlimPopup>
    <!-- end -->
    <!-- 查看驳回原因modal -->
    <div v-transfer-dom>
      <x-dialog
        v-model="rejectModal"
        hide-on-blur
        :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}"
      >
        <div class="modal_customer">
          <div class="modal_title">查看驳回原因
            <x-icon @click.native="rejectModal = false" type="ios-close-outline" style="fill:#fff;"></x-icon>
          </div>
          <div class="modal_content">{{modalContent}}</div>
          <div class="modal_ctrl">
            <Flexbox :gutter="0">
              <FlexboxItem :span="6">
                <v-touch tag="a" class="sure" v-on:tap="modal_sure">重新申请</v-touch>
              </FlexboxItem>
              <FlexboxItem :span="6">
                <v-touch tag="a" class="cancel" v-on:tap="modal_cancel">暂时不申请</v-touch>
              </FlexboxItem>
            </Flexbox>
          </div>
        </div>
      </x-dialog>
    </div>
    <!-- end -->
  </div>
</template>

<script>
import {
  Flexbox,
  FlexboxItem,
  XButton,
  Group,
  CellBox,
  Cell,
  XHeader,
  ViewBox,
  XTextarea,
  Confirm,
  PopupPicker,
  XInput,
  XDialog
} from "vux";
import upload from "@/components/upload.vue";

/****
 *@param show_mandates 延期委托 popup状态
 */
export default {
  components: {
    Flexbox,
    FlexboxItem,
    XButton,
    Group,
    Cell,
    CellBox,
    XHeader,
    ViewBox,
    upload,
    XTextarea,
    Confirm,
    PopupPicker,
    XInput,
    XDialog
  },
  data() {
    return {
      searchWords: "",
      loadOver: false,
      pngUrl: [],
      show_leaveMsg: false,
      leave_msg: "",
      show_mandates: false,
      caseProgressId: "",
      // 延长期-时常 (格式： [["1", "2"]])
      mandates_picker: [],
      // 延长委托期-form数据
      mandatesForm: {
        // 延长期picker选中值
        mandates: [],
        // 延长期照片
        imgUrls: [],
        // 延长理由
        mandates_msg: "",
        // 延长期时间
        targetEntrustPeriod: ""
      },
      // 驳回原因modal
      rejectModal: false,
      // 自定义弹出层文本内容
      modalContent: "",
      searchList: [
        {
          text: "全部",
          active: true,
          value: ""
        },
        {
          text: "已签收",
          active: false,
          value: 4
        },
        {
          text: "已立案",
          active: false,
          value: 0
        },
        {
          text: "未立案",
          active: false,
          value: 1
        },
        {
          text: "已结案",
          active: false,
          value: 2
        }
      ],
      dataList: [
        /* {
            // 案号
            arbCaseNo : '我是案号',
            // 申请人
            arbApplicant : '我是申请人',
            // 被申请人
            arbRespondent : '我是被申请人',
            // 案由
            caseCause : '我是案由',
            // 裁决金额
            adjudicationAmt : '我是裁决金额',
            // 立案日期
            recordDate : '我是立案日期',
            // 案件状态 0 已立案 1 未立案 2 已结案 3待签收 4已签收
            caseStatus : 1,
            // 平台处理状态 0未结清 1已结清 2平台处理中
            repaymentAll : 2,
            caseId : '123'
          },{},{},{},{},{} */
      ],

      // 数据总数
      total: 11,
      // 当前页数
      currentPage: 1,
      // 每页数量
      pageSize: 10
    };
  },
  mounted() {
    this.initTableList();
  },
  methods: {
    searchFoo() {
      // 搜索条搜索方法
      console.log("searchFoo");
      if (this.searchWords === "") {
        this.$vux.toast.show("请输入搜索关键字");
      } else {
        this.initTableList();
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
    modal_sure() {
      this.rejectModal = false;
      this.showPopop("show_mandates");
    },
    modal_cancel() {
      this.rejectModal = false;
    },
    getCurrentItem(it) {
      console.log("it--------------", it);
      // 获取遍历列表的主键id 和其它键
      this.caseProgressId = it.id;
      // 委托期赋值
      this.mandatesForm.targetEntrustPeriod = it.entrustPeriod;
      console.log("委托期赋值", this.mandatesForm.targetEntrustPeriod);
      // 驳回原因内容
      this.modalContent = it.content;
    },
    showCustomModal(type) {
      // 显示自定义模态框
      if (type == "rejectModal") {
        // 查看驳回内容
        this.rejectModal = true;
      }
    },
    showPopop(type) {
      // 显示留言popup层
      if (type == "show_leaveMsg") {
        this.show_leaveMsg = true;
      } else if (type == "show_mandates") {
        this.show_mandates = true;
        // 渲染委托期select数据
        let def_wtq = this.mandatesForm.targetEntrustPeriod;
        let _num = def_wtq;
        let arr = [];
        for (var i = 0; _num < 12; i++) {
          _num += 1;
          arr.push(`${_num}个月`);
        }
        // arr.splice(0, 0, `${def_wtq}个月`);
        // let arr = [`${def_wtq}个月`, `${def_wtq + 1}个月`];
        this.mandates_picker.push(arr);
        console.log("this.mandates_picker", this.mandates_picker);
      }
    },
    cancelFoo() {
      // 隐藏popup层
      if (this.show_leaveMsg) {
        // 留言
        this.show_leaveMsg = false;
      } else if (this.show_mandates) {
        this.show_mandates = false;
        // 清除上一次缓存的延长期表单数据
        this.mandates_picker = [];
        this.mandatesForm.mandates = [];
        this.mandatesForm.imgUrls = [];
        this.mandatesForm.mandates_msg = "";
        this.mandatesForm.targetEntrustPeriod = "";
      }
    },
    leaveMsgPopupVsFn() {
      //弹层 提交 校验逻辑
      if (this.pngUrl.length === 0 && this.leave_msg === '') {
        return this.$vux.toast.show("请上传图片或留言");
      }
      return true;
    },
    mandatesPopupVsFn() {
      // 申请延期委托表单验证
      console.log("this.mandatesForm.mandates,", this.mandatesForm.mandates);
      if (this.mandatesForm.mandates_msg === "") {
        return this.$vux.toast.show("请填写延长理由");
      } else if (this.mandatesForm.imgUrls.length === 0) {
        return this.$vux.toast.show("请上传图片");
      } else if (this.mandatesForm.mandates.length === 0) {
        return this.$vux.toast.show("请填写延期时间");
      }
      return true;
    },
    http_leaveMsg() {
      // targetType->1=case，2=package
      let success = this.leaveMsgPopupVsFn();
      if (success) {
        this.$http
          .post("/mobile/message/leave.htm", {
            content: this.leave_msg,
            imgUrls: this.pngUrl.join(","),
            targetId: this.caseProgressId,
            targetType: 1
          })
          .then(res => {
            console.log(res);
            if (res.data.code === "0000") {
              this.cancelFoo();
              this.$vux.toast.text("发送留言成功!");
              // 清空当前留言的输入文本
              this.pngUrl = [];
              this.caseProgressId = "";
              this.leave_msg = "";
            }
          });
      }
    },
    http_mandates() {
      console.log("-----http_mandates");
      let success = this.mandatesPopupVsFn();
      console.log("blloo-", success);
      if (success) {
        console.log("success----");
        this.$http
          .post("/mobile/case/delay.htm", {
            content: this.mandatesForm.mandates_msg,
            imgUrls: this.mandatesForm.imgUrls.join(","),
            targetEntrustPeriod: this.mandatesForm.mandates[0].replace(
              /个月/g,
              ""
            ),
            targetId: this.caseProgressId
          })
          .then(res => {
            console.log(res);
            if (res.data.code === "0000") {
              this.cancelFoo();
              this.$vux.toast.text("成功!");
              // 清空延长期popup数据
              this.mandatesForm.mandates = [];
              this.mandatesForm.imgUrls = [];
              this.mandatesForm.mandates_msg = "";
              this.mandatesForm.targetEntrustPeriod = "";
              // 重新请求列表数据
              this.initTableList();
            }
          });
      }
    },
    confirmPopup(type) {
      switch (type) {
        case "show_leaveMsg":
          // 提交 - 留言
          this.http_leaveMsg();
          break;
        case "show_mandates":
          // 提交 - 延长委托
          console.log("--------------show_manda");
          this.http_mandates();
        default:
          break;
      }
    },
    handleApplyMandates() {
      // 申请延长委托期（提交form方法）
    },
    handleApplyMandatesChange(val) {
      // 申请延长委托期（picker change）
      console.log(val);
      this.mandatesForm.mandates = val;
    },
    // 点击筛选条件
    handleActive(item, index) {
      this.searchList = this.searchList.map((v, k) => {
        v.active = index === k;
        return v;
      });
      this.currentPage = 1;
      this.loadOver = false;
      this.initTableList();
    },
    // 下拉加载
    loadMore() {
      if (this.loadOver === true) {
        return;
      }
      this.currentPage = this.currentPage + 1;
      this.initTableList("push");
    },
    // 上拉刷新
    refreshList() {
      this.currentPage = 1;
      this.loadOver = false;
      this.initTableList("reload");
    },
    // 点击查看
    handleSee(row, index) {
      this.$router.push({
        path: "progressView",
        query: {
          arbCaseNo: row.arbCaseNo,
          caseId: row.caseId,
          confirmedStatus: row.confirmedStatus,
          caseStatus: row.caseStatus,
          caseInfoId: row.caseInfoId,
          id: row.id
        }
      });
    },
    // 点击 案件变更
    handleCaseAlteration(row, index) {
      console.log(row);
      this.$router.push({
        path: "changeReqCase",
        query: {
          caseStatus: row.caseStatus,
          id: row.id,
          repaymentAll: row.repaymentAll
        }
      });
    },

    // 初始化 数据
    initTableList(type, callback) {
      this.$vux.loading.show();
      this.$http({
        url: "/mobile/queryCaseProgressInfo.htm",
        method: "post",
        data: {
          keyWord: this.searchWords, //搜索条件
          pageSize: this.pageSize,
          currentNum: this.currentPage,
          caseStatus: this.searchList.filter(v => v.active)[0].value
        }
      })
        .then(res => {
          console.log("list-", res.data);
          this.$vux.loading.hide();
          res = res.data;

          this.total = res.result.count;
          if (type === "push") {
            this.dataList = this.dataList.concat(res.result.list);
          } else {
            this.dataList = res.result.list;
          }
          callback && callback();
          this.$nextTick(() => {
            if (this.pageSize * this.currentPage >= this.total) {
              this.loadOver = true;
            }
          });
        })
        .catch(() => {
          this.$vux.loading.hide();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/scss/helper/_mixin.scss";
body {
  .search-item {
    a {
      color: #000;
    }
  }
}
.case-advance-sort-list {
  color: #333333;
  font-size: rem(23);
  height: 100%;
  background-color: #eeeeee;
  .card_tit {
    border: none;
  }
  .ra-99 {
    border-radius: 99px;
  }
  .btn-yellow {
    border-color: rgb(240, 179, 0);
    color: rgb(240, 179, 0);
  }
  .color-yellow {
    color: rgb(240, 179, 0);
  }
  .color-red {
    color: rgb(204, 0, 0);
  }

  .search-item {
    height: rem(82);
    background-color: #f3f6ff;
    color: rgb(51, 51, 51);
    font-size: rem(24);
    z-index: 1;
    position: relative;
    .flex-demo {
      text-align: center;
      height: rem(40);
      margin-top: rem(25);
      border-right: 1px solid #d5d5d5;
    }
    .vux-flexbox-item:last-child .flex-demo {
      border-right: none;
    }
    .search-active {
      color: rgb(0, 56, 136);
    }
  }
  .item-list-box {
    overflow: auto;
    box-sizing: border-box;
    height: calc(100% - 1.09333rem);
    * {
      box-sizing: border-box;
    }
    .item-list {
      margin-top: rem(18);
      background-color: #fff;
      .item-content {
        padding-left: rem(29);
        margin-bottom: rem(20);
        .mcontent {
          margin-top: rem(20);
        }
      }
      .item-handle {
        height: rem(66);
        line-height: rem(66);
        border-top: 1px solid #eaeaea;
        .handle-btn {
          text-align: center;
        }
        .handle-btn:first-child {
          border-right: 1px solid #eaeaea;
        }
      }
    }
  }
}

/* 搜索条样式 */
.search_bar {
  background-color: #000;
  .search_panel {
    display: table;
    width: 100%;
    input {
      padding: rem(8) rem(5);
      display: inline-block;
      width: 100%;
    }
    > div {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
    }
    .div1 {
      padding: 0 10px;
      > div {
        background-color: #fff;
      }
    }
    .div2 {
      width: rem(55);
      position: relative;
    }
  }
  .ico_search {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    display: block;
    width: rem(32);
    height: rem(32);
    background-image: url(~@/assets/img/ico_search.png);
    background-repeat: no-repeat;
    background-size: contain;
  }
}
/* end */
.item_complex_btns {
  padding: rem(10) rem(10) rem(10) 0;
  border-top: 1px solid #dfdfdf;
}
.flex_ico_btn {
  font-size: rem(12);
  text-align: center;
  .ico_progress {
    &:before {
      content: "";
      display: block;
      margin: 0 auto;
      width: rem(32);
      height: rem(32);
      background-image: url(~@/assets/img/ico_file_see.png);
      background-size: contain;
    }
  }
  .ico_msg {
    &:before {
      content: "";
      display: block;
      margin: 0 auto;
      width: rem(32);
      height: rem(32);
      background-image: url(~@/assets/img/ico_msg.png);
      background-size: contain;
    }
  }
}
.flex_def_btn {
  text-align: center;
  button {
    font-size: rem(12);
    height: rem(50);
    line-height: rem(52);
    position: relative;
    right: rem(15);
  }
}
.mandates_textarea {
  .tit {
    padding: 10px 0;
    white-space: nowrap;
  }
}

.update_case_status {
  border-top: 1px solid #dfdfdf;
  padding: rem(12) rem(6);
  button {
    font-size: rem(12);
  }
}
.modal_customer {
  margin: 0 rem(100);
  font-size: 14px;
  background-color: #fff;
  .modal_title {
    background-color: #cfcfcf;
    height: 30px;
    line-height: 30px;
    position: relative;
    [type="ios-close-outline"] {
      margin: auto;
      position: absolute;
      right: 5px;
      top: 0;
      bottom: 0;
    }
  }
  .modal_content {
    padding: 30px 10px;
    min-height: 13vh;
  }
  .modal_ctrl {
    a {
      display: block;
      text-align: center;
      color: #fff;
      height: 35px;
      line-height: 35px;
      &.sure {
        background-color: #0f357f;
      }
      &.cancel {
        background-color: #1d975e;
      }
    }
  }
}
</style>

<style lang="scss">
.case-advance-sort-list {
  .nodata .vux-divider {
    display: none;
  }
}
</style>
