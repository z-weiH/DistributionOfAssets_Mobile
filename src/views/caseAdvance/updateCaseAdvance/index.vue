<template>
  <div class="change-req-case-content">
    <div class="item-list-box">
      <div class="item-list">
        <div class="item-title">
          <group :gutter="0" class="card_item">
            <cell :border-intent="false" class="sub-item">
              <div slot="title" class="card_tit">
                <span v-if="dataItems.caseStatus === 0">待执行</span>
                <span v-if="dataItems.caseStatus === 1">执行中</span>
                <span v-if="dataItems.caseStatus === 2">款物登记</span>
                <span v-if="dataItems.caseStatus === 3">结案</span>
                <span>--</span>
                <span v-if="dataItems.caseStatusTwo === 0">待分发</span>
                <span v-if="dataItems.caseStatusTwo === 1">待签收</span>
                <span v-if="dataItems.caseStatusTwo === 2">已签收</span>
                <span v-if="dataItems.caseStatusTwo === 3">送达法院</span>
                <span v-if="dataItems.caseStatusTwo === 4">材料补证</span>
                <span v-if="dataItems.caseStatusTwo === 5">法院立案</span>
                <span v-if="dataItems.caseStatusTwo === 6">恢复执行</span>
                <span v-if="dataItems.caseStatusTwo === 7">执行回款</span>
                <span v-if="dataItems.caseStatusTwo === 8">回款（非执行）</span>
                <span v-if="dataItems.caseStatusTwo === 9">财产拍卖</span>
                <span v-if="dataItems.caseStatusTwo === 10">执行完毕</span>
                <span v-if="dataItems.caseStatusTwo === 11">终结本次执行程序</span>
                <span v-if="dataItems.caseStatusTwo === 12">终结执行</span>
                <span v-if="dataItems.caseStatusTwo === 13">销案</span>
                <span v-if="dataItems.caseStatusTwo === 14">不予执行</span>
                <span v-if="dataItems.caseStatusTwo === 15">撤销案件</span>
                <span v-if="dataItems.caseStatusTwo === 16">驳回申请</span>
                <template v-if="dataItems.caseStatusTwo === 7 || dataItems.caseStatusTwo === 8">
                  <span>--</span>
                  <span v-if="dataItems.repaymentAll === 0">未结清</span>
                  <span v-if="dataItems.repaymentAll === 1">已结清</span>
                </template>
              </div>
            </cell>
          </group>
        </div>
        <div class="item-content">
          <flexbox :gutter="0">
            <flexbox-item>
              <div class="mcontent headtit">{{dataItems.arbCaseNo}}</div>
            </flexbox-item>
          </flexbox>
          <flexbox :gutter="0">
            <flexbox-item>
              <div class="mcontent">申请人：{{dataItems.arbApplicant}}</div>
            </flexbox-item>
            <flexbox-item>
              <div class="mcontent">被申请人：{{dataItems.arbRespondent}}</div>
            </flexbox-item>
          </flexbox>
          <flexbox :gutter="0">
            <flexbox-item>
              <div class="mcontent">案由：{{dataItems.caseCause}}</div>
            </flexbox-item>
            <flexbox-item>
              <div class="mcontent">裁决金额：{{dataItems.adjudicationAmt}}</div>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
    </div>
    <div class="form_layout_one">
      <div class="form_header">
        <flexbox :gutter="0">
          <template v-if="dataItems.caseStatusTwo === 5 || dataItems.caseStatusTwo === 6">
            <template v-for="(it,index) in headerTabs">
              <flexbox-item>
                <div
                  :class="['header_item',{'on':it.active}]"
                  @click="handleTurnForm(index)"
                >{{it.name}}</div>
              </flexbox-item>
            </template>
          </template>
          <template v-else>
            <flexbox-item>
              <div class="header_item">{{headerTabs[0]["name"]}}</div>
            </flexbox-item>
          </template>
        </flexbox>
      </div>
      <div class="form_box">
        <template v-if="onTabFormState === 0">
          <div
            class="EndRemark"
            v-if="dataItems.caseStatus === 2 && dataItems.caseStatusTwo === 7 && dataItems.repaymentAll === 1"
          >
            <p>
              确认修改状态为
              <span class="bold">“执行完毕”</span>吗？
            </p>
            <p>
              修改后,案件将进入
              <span class="bold">"结案"</span>阶段
            </p>
          </div>
          <group :gutter="0" class="card_item">
            <template
              v-if="!(dataItems.caseStatus == 2 && dataItems.caseStatusTwo == 7 && dataItems.repaymentAll == 1)"
            >
              <popup-picker
                @on-change="changeCaseState"
                title="案件状态："
                placeholder="请选择"
                :data="newStatusSelects"
                v-model="ruleForm.newStatus"
                value-text-align="left"
                class="required"
                show-name
              ></popup-picker>
            </template>
            <template v-if="def_state">
              <datetime
                format="YYYY-MM-DD"
                v-model="ruleForm.confirmedTime"
                title="发生时间："
                @on-change="changeDate"
                placeholder="YYYY-MM-DD"
                value-text-align="left"
              ></datetime>
            </template>
            <template v-if="reback_state">
              <x-input class="required" title="回款金额：" v-model="ruleForm.repaymentAmt"></x-input>
              <popup-picker
                @on-change="changeModeRepayState"
                title="回款方式："
                placeholder="请选择"
                :data="modeRepaymentSelects"
                v-model="ruleForm.repaymentMethod"
                value-text-align="left"
                class="required"
              ></popup-picker>
            </template>
            <template v-if="putRecord_state">
              <x-input class="required" title="执行案号：" v-model="ruleForm.courtCaseNo"></x-input>
              <datetime
                format="YYYY-MM-DD"
                v-model="ruleForm.courtStartTime"
                title="立案时间："
                @on-change="changeCourtStartDate"
                placeholder="YYYY-MM-DD"
                value-text-align="left"
                class="required"
              ></datetime>
              <x-input title="案件查询码：" v-model="ruleForm.courtQueryCode"></x-input>
            </template>
          </group>
          <group :gutter="0">
            <x-textarea v-model.trim="ruleForm.notes" placeholder="补充说明" :max="500"></x-textarea>
            <div class="upload_wrap">
              <upload v-model="ruleForm.pngUrl" class="m-upload" :max="6"></upload>
              <div v-if="vshow_remark" class="up_remark">
                <!-- <span class="em">*</span>
                <span>请上传受理凭证</span>-->
              </div>
            </div>
          </group>
        </template>
        <template v-if="onTabFormState === 1">
          <group :gutter="0" class="card_item">
            <popup-picker
              @on-change="changeMeasuresState"
              title="采取措施："
              placeholder="请选择"
              :data="startMeasuresSelects"
              v-model="ruleForm1.measuresCode"
              value-text-align="left"
              class="required"
              show-name
            ></popup-picker>
            <datetime
              format="YYYY-MM-DD"
              v-model="ruleForm1.confirmedTime"
              title="发生时间："
              @on-change="changeDate"
              placeholder="YYYY-MM-DD"
              value-text-align="left"
            ></datetime>
          </group>
          <group :gutter="0">
            <x-textarea v-model.trim="ruleForm1.notes" placeholder="补充说明" :max="500"></x-textarea>
            <div class="upload_wrap">
              <upload v-model="ruleForm1.pngUrl" class="m-upload"></upload>
              <div class="up_remark">
                <span class="em">*</span>
                <span>请上传相关凭证，如查控、限高的短信、文书等</span>
              </div>
            </div>
          </group>
        </template>
      </div>
    </div>
    <!-- <inputRebound el-parent=".change-req-case-content" :el="['.submit-button','.atabbar-wrap']"></inputRebound> -->
    <div>
      <v-touch tag="a" class="optionBtn blueBtn submit-button" v-on:tap="confirmForm()">确认提交</v-touch>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import qs from "qs";
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
// import inputRebound from "@/components/inputRebound.vue";

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
    Datetime
    // inputRebound
  },
  data() {
    return {
      dataItems: {},
      id: "",
      newStatusSelects: [
        new Array(
          {
            name: "已立案",
            value: "0"
          },
          {
            name: "未立案",
            value: "1"
          },
          {
            name: "已结案",
            value: "2"
          }
        )
      ],
      modeRepaymentSelects: [
        ["法院转账", "被执行人平台还款", "被执行人转账", "渠道领款"]
      ],
      headerTabs: [
        {
          name: "请求变更",
          active: false
        },
        {
          name: "执行措施",
          active: false
        }
      ],
      // 案件变更表单数据
      ruleForm: {
        // 案件id
        // caseInfoId: "",
        // 发生时间
        confirmedTime: "",
        // 执行案号
        courtCaseNo: "",
        // 法院立案时间
        courtStartTime: "", //已立案时必填
        // 目标状态
        newStatus: [],
        // 备注
        notes: "",
        // url链接 以逗号分隔
        pngUrl: [],
        // 还款金额
        repaymentAmt: "",
        // 还款方式
        repaymentMethod: [],
        // 案件查询码
        courtQueryCode: ""
      },
      def_state: true, //初始状态
      vshow_remark: false, //图片备注状态
      reback_state: false, //回款状态
      putRecord_state: false, //立案状态
      // 措施表单数据
      ruleForm1: {
        // 案件id
        // caseInfoId: "",
        // 发生时间
        confirmedTime: "",
        // 执行措施
        measuresCode: [],
        // 备注
        notes: "",
        // url链接 以逗号分隔
        pngUrl: []
      },
      onTabFormState: 0,
      startMeasuresSelects: [
        new Array(
          {
            name: "预备领款",
            value: "1"
          },
          {
            name: "财产查控（房产、车辆）",
            value: "2"
          },
          {
            name: "纳入上失信",
            value: "3"
          },
          {
            name: "限制高消费",
            value: "4"
          },
          {
            name: "司法拘留",
            value: "5"
          },
          {
            name: "协查布控",
            value: "6"
          },
          {
            name: "公告悬赏",
            value: "7"
          }
        )
      ]
    };
  },
  methods: {
    changeMeasuresState(newVal) {
      // 措施-change
      console.log(newVal);
    },
    handleTurnForm(index) {
      this.headerTabs.map(v => {
        v.active = false;
      });
      this.headerTabs[index]["active"] = true;
      this.onTabFormState = index;
      if (index) {
        // 进入-请求变更
      } else {
        // 进入-措施
      }
    },
    confirmForm() {
      if (this.onTabFormState === 0) {
        let _ruleForm = this.ruleForm;
        let newObj = {};
        Object.keys(_ruleForm).map((v, k) => {
          // console.log(v,k)
          console.info(_ruleForm[v]);
          // console.log(Array.isArray(_ruleForm[v]))
          Array.isArray(_ruleForm[v])
            ? (newObj[v] = _ruleForm[v].toString())
            : (newObj[v] = _ruleForm[v]);
        });
        console.log("newObj--", newObj);
        this.$http
          .post("/mobile/case/progress/update.htm", {
            caseInfoId: this.id,
            ...newObj
          })
          .then(res => {
            console.log(res);
            if (res.data.code === "0000") {
              this.$router.go(-1);
              setTimeout(() => {
                this.$vux.toast.text("更新成功");
              }, 500);
            }
          })
          .catch(err => {});
      } else if (this.onTabFormState === 1) {
        let _ruleForm1 = this.ruleForm1;
        let newObj = {};
        Object.keys(_ruleForm1).map((v, k) => {
          // console.log(v,k)
          console.info(_ruleForm1[v]);
          // console.log(Array.isArray(_ruleForm[v]))
          Array.isArray(_ruleForm1[v])
            ? (newObj[v] = _ruleForm1[v].toString())
            : (newObj[v] = _ruleForm1[v]);
        });
        console.log("newObj--", newObj);
        // 新增执行措施
        this.$http
          .post("/mobile/case/measures/add.htm", {
            caseInfoId: this.id,
            ...newObj
          })
          .then(res => {
            console.log(res);
            if (res.data.code === "0000") {
              this.$router.go(-1);
              setTimeout(() => {
                this.$vux.toast.text("新增成功");
              }, 500);
            }
          })
          .catch(err => {});
      }
    },
    changeModeRepayState(newVal) {
      // 回款方式change
      console.log(newVal);
      this.ruleForm.repaymentMethod = newVal;
    },
    btnCtrlCaseState(type) {
      switch (type) {
        case 3:
          this.vshow_remark = true;
          break;
        case 4:
          this.def_state = true;
          this.vshow_remark = false;
          this.putRecord_state = false;
          this.reback_state = false;
          break;
        case 5:
          this.vshow_remark = true;
          this.putRecord_state = true;
          this.reback_state = false;
          this.def_state = false;
          break;
        case 6:
          this.vshow_remark = true;
          this.putRecord_state = true;
          this.reback_state = false;
          this.def_state = false;
          break;
        case 15:
          this.def_state = true;
          this.vshow_remark = false;
          this.putRecord_state = false;
          this.reback_state = false;
          break;
        case 16:
          this.def_state = true;
          this.vshow_remark = false;
          this.putRecord_state = false;
          this.reback_state = false;
          break;
        case 70:
          this.reback_state = true;
          this.def_state = false;
          this.vshow_remark = false;
          this.putRecord_state = false;
          break;
        case 71:
          this.reback_state = true;
          this.def_state = false;
          this.vshow_remark = false;
          this.putRecord_state = false;
          break;
        case 80:
          this.reback_state = true;
          this.def_state = false;
          this.vshow_remark = false;
          this.putRecord_state = false;
          break;
        case 81:
          this.reback_state = true;
          this.def_state = false;
          this.vshow_remark = false;
          this.putRecord_state = false;
          break;
        default:
          this.vshow_remark = false;
          break;
      }
    },
    changeCaseState(newVal) {
      console.log("changeCaseState=", newVal, this.ruleForm);
      if (newVal[0] == 3) {
        this.btnCtrlCaseState(3);
      } else if (newVal[0] == 4) {
        this.btnCtrlCaseState(4);
      } else if (newVal[0] == 5) {
        this.btnCtrlCaseState(5);
      } else if (newVal[0] == 6) {
        this.btnCtrlCaseState(6);
      } else if (newVal[0] == 15) {
        this.btnCtrlCaseState(15);
      } else if (newVal[0] == 16) {
        this.btnCtrlCaseState(16);
      } else if (newVal[0] == 70) {
        this.btnCtrlCaseState(70);
      } else if (newVal[0] == 71) {
        this.btnCtrlCaseState(71);
      } else if (newVal[0] == 80) {
        this.btnCtrlCaseState(80);
      } else if (newVal[0] == 81) {
        this.btnCtrlCaseState(81);
      } else {
        this.btnCtrlCaseState();
      }
    },
    changeCourtStartDate(newVal) {
      console.log(newVal);
    },
    changeDate(newVal) {
      console.log(newVal);
    },
    getParams() {
      this.id = this.$route.query.id;
    },
    queryDetail() {
      this.$http
        .post("mobile/case/detail.htm", {
          id: this.id
        })
        .then(res => {
          console.log("qqqqqqqqqqqqq-", res);
          let result = res.data.result;
          this.dataItems = result;
        })
        .catch(err => {});
    },
    customObjkeyAndVal(obj) {
      // 自定义对象key和value结构
      let arr = [];
      Object.keys(obj).map((newData, key) => {
        console.log(newData, key, obj[newData]);
        arr.push({ name: obj[newData], value: newData });
      });
      return arr;
    },
    queryCaseState() {
      // 查询案件状态
      this.$http
        .post("/mobile/case/status/list.htm", {
          caseInfoId: this.id
        })
        .then(res => {
          console.log("rrrrrrrr111111111111111111", res);
          let _res = res.data.result;
          console.log("resss--------------", _res);
          let newCaseStateArr = this.customObjkeyAndVal(_res);
          console.log(newCaseStateArr);
          if (this.onTabFormState === 0) {
            console.log(
              "this.onTabFormState-------------",
              this.onTabFormState
            );
            console.log(
              "cc-",
              this.dataItems.caseStatus,
              "dd-",
              this.dataItems.caseStatusTwo,
              "ee-",
              this.dataItems.repaymentAll
            );
            if (
              this.dataItems.caseStatus === 2 &&
              this.dataItems.caseStatusTwo === 7 &&
              this.dataItems.repaymentAll === 1
            ) {
              this.ruleForm.newStatus = [newCaseStateArr[0]["value"]];
              console.log("r-newstatus", this.ruleForm.newStatus);
            }
          }
          this.newStatusSelects = [newCaseStateArr];
          console.log("this.newStatusSelects", this.newStatusSelects);
        })
        .catch(err => {
          console.log("eeeeeeeee-", err);
        });

      // this.$http
      //   .post("/mobile/case/status/list.htm", {
      //     caseInfoId: this.id
      //   })
      //   .then(res => {
      //     console.log("rrrrrrrr", res);
      //   })
      //   .catch(err => {
      //     console.log("eeeeeeeeeeeee", err);
      //   });
    }
  },
  created() {
    this.getParams();
  },
  mounted() {
    this.queryDetail();
    this.queryCaseState();
  }
};
</script>

<style lang='scss' scoped type='text/css'>
@import "@/assets/style/scss/helper/_mixin.scss";
.change-req-case-content {
  background-color: #fff;
  // height: calc(100vh - #{rem(98)} - 42px);
  // overflow: auto;
  .item-list-box {
    height: auto;
  }
}
.submit-button {
  // position: fixed;
  // bottom: 50px;
  margin-bottom: rem(150);
}

.form_layout_one {
  background-color: #fff;
}
.form_header {
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: rem(28);
  padding: rem(20) 0;
  .header_item {
    text-align: center;
    &.on {
      &:after {
        content: "";
        display: block;
        width: 40%;
        margin: 0 auto;
        height: 0;
        border-bottom: 2px solid #666666;
      }
    }
  }
}
.form_box {
  .card_item {
    margin: 0;
  }
}
.upload_wrap {
  padding-left: rem(30);
  padding-bottom: rem(30);
}
.up_remark {
  padding-top: rem(20);
  font-size: rem(24);
  span {
    margin-right: rem(10);
  }
}

.EndRemark {
  text-align: center;
  font-size: rem(28);
  padding: rem(30) 0;
  border-top: 1px solid #dcdcdc;
  p {
    line-height: 2;
  }
  .bold {
    font-weight: bold;
  }
}
</style>
<style lang="scss">
@import "@/assets/style/scss/helper/_mixin.scss";

%common_em {
  & {
    position: relative;
    &:before {
      position: absolute;
      display: inline-block;
      top: rem(8);
      left: rem(-20);
      content: "*";
      color: red;
    }
  }
}
.form_layout_one {
  .vux-datetime.required > div > p {
    @extend %common_em;
  }
  .required {
    .weui-label {
      @extend %common_em;
    }
  }
}

body{
  .m-tabbar{
    position: fixed !important;

  }
}

</style>
