<template>
  <div class="change-req-case">
    <div class="change-req-case-content">
      <div class="item-list-box">
        <div class="item-list" v-for="(item,index) in dataList" :key="index">
          <div class="item-title">
            <group :gutter="0" class="card_item">
              <cell :border-intent="false" class="sub-item">
                <div slot="title" class="card_tit">案件：{{item.arbCaseNo}}</div>
                <div v-if="$route.query.caseStatus === 4" class="flag_btn green">已签收</div>
                <div v-if="$route.query.caseStatus === 2" class="flag_btn gray">已结案</div>
                <div v-if="$route.query.caseStatus === 1" class="flag_btn jdred">未立案</div>
                <div v-if="$route.query.caseStatus === 0" class="flag_btn yellow">已立案</div>
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
        </div>
      </div>
      <div class="item-title-box">请求案件变更</div>
      <div class="checkhandle-box">
        <group :gutter="0" class="card_item one-group">
          <x-input title="借款人姓名：" disabled v-model="ruleForm.arbRespondent"></x-input>
          <popup-picker
            @on-change="handleCaseStatusChange"
            title="变更案件状态为："
            placeholder="请选择"
            :data="newStatusSelects"
            v-model="ruleForm.newStatus"
            value-text-align="left"
            class="required"
          ></popup-picker>

          <!-- 请求变更为已立案 -->
          <template v-if="markChange() === 5">
            <datetime
              v-model="ruleForm.courtStartTime"
              clear-text="清除"
              format="YYYY-MM-DD"
              placeholder="立案时间"
              @on-change="handleCaseTimeChange"
              @on-cancel="log('cancel')"
              @on-confirm="onConfirm"
              @on-clear="clearValue"
              @on-hide="log('hide', $event)"
              class="required datepopuper"
              title="<div class='weui-cell__hd'>
                  <label class='weui-label' style='display: block; width: auto;'>立案时间：</label>
                </div>"
            ></datetime>
            <x-input title="执行案号：" v-model="ruleForm.courtCaseNo" type="text" class="required"></x-input>
          </template>
          <!-- 请求变更为未立案 -->
          <template v-if="markChange() === 6"></template>
          <!-- 已结案4种状态 -->
          <template v-if="ruleForm.newStatus[0] && markChange() !== 5 && markChange() !== 6">
            <popup-picker
              @on-change="handleReasonsForChoice"
              title="原因选择："
              placeholder="请选择"
              :data="progressReasonSelects"
              v-model="ruleForm.progressReason"
              value-text-align="left"
              class="required"
            ></popup-picker>
            <x-input disabled title="执行案号：" v-model="ruleForm.courtCaseNo" type="text"></x-input>

            <!-- 请求变更为已结案-代理商法催回款 & 法院执行-->
            <template v-if="markChange() === 1 || markChange() === 0">
              <x-input type="tel" title="还款金额：" v-model="ruleForm.repaymentAmt" class="required"></x-input>
              <popup-picker
                title="还款方式："
                placeholder="请选择"
                :data="repaymentMethodSelects"
                v-model="ruleForm.repaymentMethod"
                value-text-align="left"
                class="required"
              ></popup-picker>
            </template>
            <!-- 请求变更为已结案 自主回款 -->
            <template v-if="markChange() === 2">
              <x-input type="tel" title="还款金额：" v-model="ruleForm.repaymentAmt" class="required"></x-input>
            </template>
            <!-- 请求变更为已结案-终止本次执行（临） -->
            <template v-if="markChange() === 3"></template>
            <!-- 请求变更为已结案-撤回立案（临） -->
            <template v-if="markChange() === 4"></template>
          </template>
        </group>

        <group :gutter="0">
          <x-textarea v-model.trim="ruleForm.notes" placeholder="案件进展说明100字以内" :max="100"></x-textarea>
        </group>
        <upload v-model="ruleForm.pngUrl" class="m-upload"></upload>
      </div>
    </div>

    <!-- 底部导航操作 -->
    <div class="m-handle-box">
      <flexbox :gutter="0">
        <flexbox-item>
          <div class="handle-btn handle-close" @click="handleClose">取消</div>
        </flexbox-item>
        <flexbox-item>
          <div class="handle-btn handle-submit" @click="handleSubmit">确定</div>
        </flexbox-item>
      </flexbox>
    </div>

    <!-- 取消 弹出框 -->
    <confirm v-model="dialogVisible" @on-confirm="closePageFn">
      <p style="text-align:center;">确定退出吗？</p>
    </confirm>
    <!-- 校验提示语 -->
    <toast v-model="verifyVisible" type="text" :text="verifyMessage" width="80vw"></toast>
    <inputRebound el=".change-req-case-content" fix="1.33333rem"></inputRebound>
  </div>
</template>

<script>
import {
  Flexbox,
  FlexboxItem,
  XButton,
  Group,
  Cell,
  XInput,
  PopupPicker,
  XTextarea,
  Confirm,
  Datetime
} from "vux";
import upload from "@/components/upload.vue";
import inputRebound from "@/components/inputRebound.vue";
export default {
  components: {
    Flexbox,
    FlexboxItem,
    XButton,
    Group,
    Cell,
    XInput,
    PopupPicker,
    XTextarea,
    Confirm,
    upload,
    inputRebound,
    Datetime
  },
  data() {
    return {
      submitDisabled: false,
      dataList: [
        {
          // 案号
          arbCaseNo: "我是案号",
          // 申请人
          arbApplicant: "我是申请人",
          // 被申请人
          arbRespondent: "我是被申请人",
          // 案由
          caseCause: "我是案由",
          // 裁决金额
          adjudicationAmt: "我是裁决金额",
          // 立案日期
          recordDate: "我是立案日期",
          // 案件状态 0 已立案 1 未立案 2 已结案 3 已签收
          caseStatus: 0,
          // 平台处理状态 0未结清 1已结清 2平台处理中
          repaymentAll: 2
        }
      ],
      ruleForm: {
        // 立案时间 yyyy-MM-dd
        courtStartTime: "",
        // 借款人姓名
        arbRespondent: "",
        // 变更案件状态 新 0 已立案 1 未立案 2 已结案
        newStatus: [],
        // 变更案件状态 旧 0 已立案 1 未立案 2 已结案
        oldStatus: [],
        // 执行案号
        courtCaseNo: undefined,
        // 原因选择
        progressReason: [],
        // 还款金额
        repaymentAmt: "",
        // 还款方式
        repaymentMethod: [],
        // 说明
        notes: "",
        // 图片
        pngUrl: [],
        id: this.$route.query.id
      },
      // 页面整体状态  1  已结案 法催还款 2 自主还款   3终止本次执行  4撤回立案  5以立案   6 未立案  7恢复执行   8不予执行
      mark: "",

      // 状态变更 select
      newStatusSelects: [["已立案", "未立案", "已结案"]],
      // 原因选择 select
      progressReasonSelects: [
        [
          "恢复执行",
          "不予执行",
          "法院执行回款",
          "渠道法催回款",
          "自主回款",
          "终结本次执行（临）",
          "撤回申请（临）"
        ]
      ],
      // 还款方式 select
      repaymentMethodSelects: [
        ["支付宝", "微信", "对公农业银行", "对公招商银行"]
      ],

      dialogVisible: false,
      verifyVisible: false,
      verifyMessage: ""
    };
  },
  mounted() {
    // 回显 案件状态
    this.$http({
      method: "post",
      url: "/mobile/queryCaseProgress.htm",
      data: {
        id: this.$route.query.id
      }
    }).then(res => {
      res = res.data;
      let result = res.result;
      // 回显头部基本信息
      this.dataList = [result];
      // 回显数据处理
      this.ruleForm.newStatus =
        result.oldStatus === 4 ? [] : [this.getCaseStatusCN(result.oldStatus)];
      this.ruleForm.oldStatus =
        result.oldStatus === 4 ? [] : [this.getCaseStatusCN(result.oldStatus)];

      this.$nextTick(() => {
        let ruleForm = {
          arbRespondent: result.arbRespondent,
          courtCaseNo: result.courtCaseNo,
          courtCaseNoDefault: result.courtCaseNo, // 缓存默认案号
          progressReason: result.progressReason ? [result.progressReason] : [],
          repaymentAmt: result.repaymentAmt,
          repaymentMethod: result.repaymentMethod
            ? [result.repaymentMethod]
            : [],
          notes: result.notes,
          pngUrl: result.pngUrl ? result.pngUrl.split(",") : []
        };
        this.ruleForm = Object.assign(this.ruleForm, ruleForm);
      });
    });
  },
  methods: {
    log(str1, str2 = "") {
      console.log(str1, str2);
    },
    onConfirm(val) {
      console.log("on-confirm arg", val);
      console.log("current value", this.ruleForm.courtStartTime);
      this.ruleForm.courtStartTime = val;
    },
    clearValue(val) {
      this.ruleForm.courtStartTime = "";
    },
    // 根据案件状态 0,1,2 拿到对应中文字段
    getCaseStatusCN(num) {
      if (num === 0) {
        return "已立案";
      } else if (num === 1) {
        return "未立案";
      } else if (num === 2) {
        return "已结案";
      }
    },
    getCaseStatusEn(str) {
      if (str === "已立案") {
        return 0;
      } else if (str === "未立案") {
        return 1;
      } else if (str === "已结案") {
        return 2;
      }
    },
    // 状态响应
    markChange() {
      let mark;
      let newStatus = this.ruleForm.newStatus[0];
      let progressReason = this.ruleForm.progressReason[0];
      if (newStatus === "已立案") {
        mark = 5;
      } else if (newStatus === "未立案") {
        mark = 6;
      } else if (newStatus === "已结案" && progressReason === "渠道法催回款") {
        mark = 1;
      } else if (newStatus === "已结案" && progressReason === "自主回款") {
        mark = 2;
      } else if (
        newStatus === "已结案" &&
        progressReason === "终结本次执行（临）"
      ) {
        mark = 3;
      } else if (
        newStatus === "已结案" &&
        progressReason === "撤回申请（临）"
      ) {
        mark = 4;
      } else if (newStatus === "已结案" && progressReason === "法院执行回款") {
        mark = 0;
      } else if (newStatus === "已结案" && progressReason === "恢复执行") {
        mark = 7;
      } else if (newStatus === "已结案" && progressReason === "不予执行") {
        mark = 8;
      }
      this.mark = mark;
      return mark;
    },
    // 变更案件状态 change
    handleCaseStatusChange(val) {
      // 初始化变更案件状态
      if (val[0] == null) {
        this.ruleForm.newStatus = [];
      }
      console.log(" 变更案件状态 change ", val);
      if (val[0] === "已结案") {
        this.ruleForm.progressReason = ["渠道法催回款"];
        this.ruleForm.courtCaseNo = this.ruleForm.courtCaseNoDefault;
      } else {
        this.ruleForm.courtCaseNo = "";
        console.log(this.ruleForm.courtCaseNo);
      }
      // 数据清空
      this.ruleForm.repaymentAmt = "";
      this.ruleForm.repaymentMethod = [];
    },
    handleCaseTimeChange(val) {
      console.log(val);
    },
    // 原因选择 change
    handleReasonsForChoice() {
      // 数据清空
      this.ruleForm.repaymentAmt = "";
      this.ruleForm.repaymentMethod = [];
    },

    closePageFn() {
      this.$router.push("caseAdvanceSortList");
    },
    // 点击 取消
    handleClose() {
      this.dialogVisible = true;
    },
    verifyMessageFn(message) {
      /* this.verifyVisible = true;
        this.verifyMessage = message; */
      this.$vux.toast.show(message);
    },
    // 提交 校验逻辑
    verifyFn() {
      if (!this.ruleForm.newStatus[0]) {
        return this.verifyMessageFn("请选择案件变更状态");
      }
      if (this.mark === 0) {
        if (!this.ruleForm.repaymentAmt) {
          return this.verifyMessageFn("请输入还款金额");
        }
        if (!this.ruleForm.repaymentMethod[0]) {
          return this.verifyMessageFn("请选择还款方式");
        }
      } else if (this.mark === 1) {
        if (!this.ruleForm.repaymentAmt) {
          return this.verifyMessageFn("请输入还款金额");
        }
        if (!/^(0.\d)|([1-9]\d*(.\d+)?)$/.test(this.ruleForm.repaymentAmt)) {
          return this.verifyMessageFn("还款金额必须大于0");
        }
        if (!this.ruleForm.repaymentMethod[0]) {
          return this.verifyMessageFn("请选择还款方式");
        }
      } else if (this.mark === 2) {
        if (!this.ruleForm.repaymentAmt) {
          return this.verifyMessageFn("请输入还款金额");
        }
        if (!/^(0.\d)|([1-9]\d*(.\d+)?)$/.test(this.ruleForm.repaymentAmt)) {
          return this.verifyMessageFn("还款金额必须大于0");
        }
      } else if (this.mark === 3) {
      } else if (this.mark === 4) {
      } else if (this.mark === 5) {
        if (!this.ruleForm.courtStartTime) {
          return this.verifyMessageFn("请填写立案时间");
        }
        if (!this.ruleForm.courtCaseNo) {
          return this.verifyMessageFn("请输入执行案号");
        }
      } else if (this.mark === 6) {
        if (!this.ruleForm.notes) {
          return this.verifyMessageFn("请输入案件进展说明");
        }
      }
      if (this.ruleForm.pngUrl.length === 0) {
        return this.verifyMessageFn("请上传图片");
      }
      return true;
    },
    // 点击 提交
    handleSubmit() {
      if (this.submitDisabled === true) {
        return;
      }
      if (this.$route.query.repaymentAll === "1") {
        return this.verifyMessageFn("款项已结清 无需继续操作");
      }
      let success = this.verifyFn();
      if (success) {
        console.log(this.ruleForm);
        this.submitDisabled = true;
        this.$vux.loading.show();
        let form = { ...this.ruleForm };
        // 处理提交数据格式
        form.arbCaseNo = this.dataList[0].arbCaseNo;
        form.mark = this.mark;
        form.newStatus = this.getCaseStatusEn(form.newStatus[0]);
        form.oldStatus = this.getCaseStatusEn(form.oldStatus[0]);
        form.progressReason = form.progressReason[0];
        form.repaymentMethod = form.repaymentMethod[0];
        form.pngUrl = form.pngUrl.join(",");
        this.$http({
          method: "post",
          url: "/mobile/updateCaseProgress.htm",
          data: form
        })
          .then(res => {
            this.$vux.loading.hide();
            this.$vux.toast.show("提交成功");
            setTimeout(() => {
              this.closePageFn();
            }, 1500);
          })
          .catch(res => {
            this.$vux.loading.hide();
            this.submitDisabled = false;
            // if(res.data.code != '0000'){
            //   this.verifyMessageFn(res.data.description)
            // }
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/scss/helper/_mixin.scss";
.change-req-case {
  color: #333333;
  font-size: rem(23);
  .change-req-case-content {
    background-color: #fff;
    height: calc(100vh - 1.33333rem);
    overflow: auto;
  }
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

  .item-list-box {
    overflow: auto;
    box-sizing: border-box;
    * {
      box-sizing: border-box;
    }
    .card_item,
    .item-list {
      margin-top: 0 !important;
    }
    .item-list {
      margin-top: rem(18);
      background-color: #fff;
      .item-content {
        padding-left: rem(29);
        padding-bottom: rem(30);
        .mcontent {
          margin-top: rem(20);
        }
      }
    }
  }

  .item-title-box {
    height: rem(79);
    line-height: rem(79);
    padding-left: rem(31);
    background-color: #f3f6ff;
    font-size: rem(30);
    color: rgb(51, 51, 51);
  }
  .m-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .m-handle-box {
    height: rem(100);
    line-height: rem(100);
    width: 100%;
    color: #fff;
    .handle-btn {
      width: 100%;
      height: rem(100);
      text-align: center;
    }
    .handle-close {
      background-color: #999999;
    }
    .handle-submit {
      background-color: #003888;
    }
  }
  .m-upload {
    margin-top: 10px;
    padding-left: rem(31);
  }
}
</style>

<style lang="scss">
@import "@/assets/style/scss/helper/_mixin.scss";
.change-req-case {
  .card_item {
    margin-top: 0;
  }
  .required .weui-label::before {
    content: "*";
    color: red;
  }
  .one-group {
    .weui-cell__hd {
      width: rem(300);
    }
  }

  .vux-cell-value,
  .weui-label,
  .vux-popup-picker-placeholder {
    font-size: rem(23);
  }
}
.datepopuper {
  .vux-datetime-value {
    text-align: left;
  }
}
</style>
