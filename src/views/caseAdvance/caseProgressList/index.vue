<template>
  <div class="case_progress_sort_list">
    <view-box ref="viewBox">
      <!-- 筛选条件 -->
      <div slot="header" class="topfix">
        <SearchBarDropDown
          ref="sBarDropDown"
          :caseStatusItems="caseStatusItems"
          :caseStatusTwoItems="caseStatusTwoItems"
          :caseStatusThreeItems="caseStatusThreeItems"
          :linkageCaseStatus="linkageCaseStatus"
          :searchWords="searchWords"
          :pager="pager"
          @change="handleChangeInput"
          @EnterQuery="queryList"
        ></SearchBarDropDown>
      </div>
      <!-- end -->
      <!-- 列表 -->
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
        <!--BEGIN 暂无案件 -->
        <div class="nfcase_panel" v-if="dataList.length === 0">当前阶段暂无数据</div>
        <div class="item-list-box">
          <div class="item-list" v-for="(it,index) in dataList" :key="index">
            <div class="item-title">
              <group :gutter="0" class="card_item">
                <cell :border-intent="false" class="sub-item">
                  <div slot="title" class="card_tit">
                    <span v-if="it.caseStatus === 0">待执行</span>
                    <span v-if="it.caseStatus === 1">执行中</span>
                    <span v-if="it.caseStatus === 2">款物登记</span>
                    <span v-if="it.caseStatus === 3">结案</span>
                    <span>--</span>
                    <span v-if="it.caseStatusTwo === 0">待分发</span>
                    <span v-if="it.caseStatusTwo === 1">待签收</span>
                    <span v-if="it.caseStatusTwo === 2">已签收</span>
                    <span v-if="it.caseStatusTwo === 3">送达法院</span>
                    <span v-if="it.caseStatusTwo === 4">材料补证</span>
                    <span v-if="it.caseStatusTwo === 5">法院立案</span>
                    <span v-if="it.caseStatusTwo === 6">恢复执行</span>
                    <span v-if="it.caseStatusTwo === 7">执行回款</span>
                    <span v-if="it.caseStatusTwo === 8">回款（非执行）</span>
                    <span v-if="it.caseStatusTwo === 9">财产拍卖</span>
                    <span v-if="it.caseStatusTwo === 10">执行完毕</span>
                    <span v-if="it.caseStatusTwo === 11">终结本次执行程序</span>
                    <span v-if="it.caseStatusTwo === 12">终结执行</span>
                    <span v-if="it.caseStatusTwo === 13">销案</span>
                    <span v-if="it.caseStatusTwo === 14">不予执行</span>
                    <span v-if="it.caseStatusTwo === 15">撤回案件</span>
                    <span v-if="it.caseStatusTwo === 16">驳回申请</span>
                    <template v-if="it.caseStatusTwo === 7 || it.caseStatusTwo === 8">
                      <span>--</span>
                      <span v-if="it.repaymentAll === 0">未结清</span>
                      <span v-if="it.repaymentAll === 1">已结清</span>
                    </template>
                  </div>
                  <div v-if="it.delayStatus === 0">
                    <x-button mini style="border-radius:99px;" :gradients="['#666','#666']">延期申请审核中</x-button>
                  </div>
                  <div v-else-if="it.delayStatus === 1">
                    <x-button
                      mini
                      style="border-radius:99px;"
                      :gradients="['#1D975E','#1D975E']"
                    >延期申请通过</x-button>
                  </div>
                  <div v-else-if="it.delayStatus === 2">
                    <x-button
                      mini
                      plain
                      style="border-radius:99px;"
                      @click.native="getCurrentItem(it),showCustomModal('rejectModal')"
                    >查看驳回原因</x-button>
                  </div>
                  <div v-else-if="!it.delayStatus">
                     <!-- v-if="it.repaymentAll != 1" -->
                    <x-button
                      mini
                      plain
                      style="border-radius:99px;"
                      @click.native="getCurrentItem(it),showPopop('show_mandates')"
                    >申请延长委托期</x-button>
                  </div>
                </cell>
              </group>
            </div>
            <div class="item-content">
              <flexbox :gutter="0">
                <flexbox-item>
                  <div class="mcontent headtit">{{it.arbCaseNo}}</div>
                </flexbox-item>
              </flexbox>
              <flexbox :gutter="0">
                <flexbox-item>
                  <div class="mcontent">申请人：{{it.arbApplicant}}</div>
                </flexbox-item>
                <flexbox-item>
                  <div class="mcontent">被申请人：{{it.arbRespondent}}</div>
                </flexbox-item>
              </flexbox>
              <flexbox :gutter="0">
                <flexbox-item>
                  <div class="mcontent">案由：{{it.caseCause}}</div>
                </flexbox-item>
                <flexbox-item>
                  <div class="mcontent">裁决金额：{{it.adjudicationAmt}}</div>
                </flexbox-item>
              </flexbox>
            </div>
            <!-- 新版 - 按钮group -->
            <div class="item_complex_btns">
              <Flexbox>
                <FlexboxItem :span="6">
                  <Flexbox class="flex_ico_btn">
                    <FlexboxItem>
                      <v-touch tag="div" v-on:tap="handleSeeLog(it,index)" class="ico_progress">日志</v-touch>
                    </FlexboxItem>
                    <FlexboxItem>
                      <v-touch
                        tag="div"
                        v-on:tap="getCurrentItem(it),showPopop('show_leaveMsg')"
                        class="ico_msg"
                      >留言</v-touch>
                    </FlexboxItem>
                  </Flexbox>
                </FlexboxItem>
                <FlexboxItem :span="6" class="flex_def_btn">
                  <!-- <template v-if="item.caseStatus === 2  && item.repaymentAll === 0">
                    <x-button
                      @click.native="handleCaseAlteration(item,index)"
                      type="primary"
                      :gradients="['#0f357f', '#0f357f']"
                    >
                      <span class="color-red">(款项未结清)</span>更新案件状态
                    </x-button>
                  </template>
                  <template v-else-if="item.caseStatus === 2 && item.repaymentAll === 1">
                    <x-button disabled type="primary" :gradients="['#fff', '#fff']">
                      <span class="color-green">(款项已结清)</span>
                    </x-button>
                  </template>-->
                  <template v-if="it.confirmedStatus === 0 || it.confirmedStatus === 2">
                    <div class="usable_btn">
                      <span class="color-yellow">(平台处理中)</span>
                    </div>
                    <!-- <x-button disabled type="primary" :gradients="['#0f357f', '#0f357f']">
                      <span class="color-yellow">(平台处理中)</span>
                    </x-button>-->
                  </template>
                  <template
                    v-else-if="(it.caseStatusTwo === 8 && it.repaymentAll === 1) || it.caseStatusTwo === 10"
                  >
                    <div class="disable_btn">
                      <span class="color-white">更新案件状态</span>
                    </div>
                  </template>
                  <template v-else>
                    <div class="usable_btn" @click="handleCaseAlteration(it,index)">更新案件状态</div>
                  </template>
                </FlexboxItem>
              </Flexbox>
            </div>
            <!-- end -->
          </div>
        </div>
      </scroller>
      <!-- end -->
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
      <div class="popup_title">
        留言
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
          <x-textarea :max="500" name="description" placeholder="备注说明500字以内" v-model="leave_msg"></x-textarea>
          <div class="popup_uploader">
            <!-- <v-touch tag="div" v-on:tap="openLocalImg" class="cameraImg"></v-touch> -->
            <upload v-model="pngUrl" class="m-upload" :max="6"></upload>
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
      <div class="popup_title">
        申请延期委托
        <v-touch class="close-btn" tag="span" v-on:tap="cancelFoo"></v-touch>
      </div>
      <div class="popup_content">
        <group :gutter="0">
          <div slot="title" :border-intent="false">
            <div class="popup_text">
              <div>( 如果需要延长案件的委托期，可以尝试在这里提出申请，经平台审核后将作出处理 )</div>
              <!-- <div>请上传截图</div> -->
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
                  :max="500"
                  name="description"
                  placeholder="备注说明500字以内"
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
          <div class="modal_title">
            查看驳回原因
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

<script type='text/ecmascript-6'>
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
  watch: {
    pager: {
      handler(newValue, oldValue) {
        console.log("watch-paper:", newValue);
      },
      deep: true
    }
  },
  data() {
    return {
      pngUrl: [],
      leave_msg: "",
      show_leaveMsg: false,
      searchWords: "",
      // 驳回原因modal
      rejectModal: false,
      // 自定义弹出层文本内容
      modalContent: "",
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
      caseStatusItems: [
        { code: "0", name: "待执行", active: false, level: 1 }, //false
        { code: "1", name: "执行中", active: false, level: 1 },
        { code: "2", name: "款物登记", active: false, level: 1 },
        { code: "3", name: "结案", active: false, level: 1 }
      ],
      caseStatusTwoItems: [
        // { code: "0", name: "待分发", active: false, level: 2 },
        // { code: "1", name: "待签收", active: false, level: 2 },
        // { code: "2", name: "已签收", active: false, level: 2 },
        // { code: "3", name: "送达法院", active: false, level: 2 },
        // { code: "4", name: "材料补证", active: false, level: 2 },
        // { code: "5", name: "法院立案", active: false, level: 2 },
        // { code: "6", name: "恢复执行", active: false, level: 2 },
        // { code: "7", name: "执行回款", active: false, level: 2 },
        // { code: "8", name: "回款（非执行）", active: false, level: 2 },
        // { code: "9", name: "财产拍卖", active: false, level: 2 },
        // { code: "10", name: "执行完毕", active: false, level: 2 },
        // { code: "11", name: "终结本次执行程序", active: false, level: 2 },
        // { code: "12", name: "终结执行", active: false, level: 2 },
        // { code: "13", name: "销案", active: false, level: 2 },
        // { code: "14", name: "不予执行", active: false, level: 2 },
        // { code: "15", name: "撤回案件", active: false, level: 2 },
        // { code: "16", name: "驳回申请", active: false, level: 2 }
      ],
      caseStatusThreeItems: [
        { code: "0", name: "未结清", active: false, level: 3 },
        { code: "1", name: "已结清", active: false, level: 3 }
      ],
      linkageCaseStatus: {
        0: [
          { code: "2", name: "已签收", active: false, level: 2 },
          { code: "3", name: "送达法院", active: false, level: 2 },
          { code: "4", name: "材料补证", active: false, level: 2 }
        ],
        1: [
          { code: "5", name: "法院立案", active: false, level: 2 },
          { code: "6", name: "恢复执行", active: false, level: 2 }
        ],
        2: [
          { code: "7", name: "执行回款", active: false, level: 2 },
          { code: "8", name: "回款（非执行）", active: false, level: 2 }
        ],
        3: [
          { code: "10", name: "执行完毕", active: false, level: 2 },
          { code: "11", name: "终结本次执行程序", active: false, level: 2 },
          { code: "12", name: "终结执行", active: false, level: 2 },
          { code: "13", name: "销案", active: false, level: 2 },
          { code: "14", name: "不予执行", active: false, level: 2 },
          { code: "15", name: "撤回案件", active: false, level: 2 },
          { code: "16", name: "驳回申请", active: false, level: 2 }
        ]
      },
      loadOver: false,
      dataList: [], //列表数据源
      pager: {
        caseStatus: null, //阶段
        caseStatusTwo: null, //状态
        repaymentAll: null, //还款子状态
        currentNum: 1, //页号 	不传默认1
        keyWord: "", //关键字
        pageSize: 10 //每页展示数量
      }
    };
  },
  methods: {
    handleApplyMandatesChange(val) {
      // 申请延长委托期（picker change）
      console.log(val);
      this.mandatesForm.mandates = val;
    },
    // 点击 案件变更
    handleCaseAlteration(row, index) {
      console.log(row);
      this.$router.push({
        path: "updateCaseAdvance",
        query: {
          caseStatus: row.caseStatus,
          id: row.id,
          repaymentAll: row.repaymentAll
        }
      });
    },
    modal_sure() {
      this.rejectModal = false;
      this.showPopop("show_mandates");
    },
    modal_cancel() {
      this.rejectModal = false;
    },
    showCustomModal(type) {
      // 显示自定义模态框
      if (type == "rejectModal") {
        // 查看驳回内容
        this.rejectModal = true;
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
    },
    // 点击查看日志
    handleSeeLog(row, index) {
      this.$router.push({
        path: "LogPage",
        query: {
          // arbCaseNo: row.arbCaseNo,
          caseId: row.caseId,
          // confirmedStatus: row.confirmedStatus,
          // caseStatus: row.caseStatus,
          // caseInfoId: row.caseInfoId,
          id: row.id
        }
      });
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
    showPopop(type) {
      // 显示留言popup层
      if (type === "show_leaveMsg") {
        this.show_leaveMsg = true;
      } else if (type === "show_mandates") {
        // 延迟委托popup层
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
    mandatesPopupVsFn() {
      // 申请延期委托表单验证
      console.log("this.mandatesForm.mandates,", this.mandatesForm.mandates);
      if (this.mandatesForm.mandates_msg === "") {
        return this.$vux.toast.show("请填写延长理由");
      } else if (this.mandatesForm.mandates.length === 0) {
        return this.$vux.toast.show("请填写延期时间");
      }
      return true;
    },
    leaveMsgPopupVsFn() {
      //弹层 提交 校验逻辑
      if (this.pngUrl.length === 0 && this.leave_msg === "") {
        return this.$vux.toast.show("请上传图片或留言");
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
              this.queryList();
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
          this.http_mandates();
          break;
        default:
          break;
      }
    },
    loadMore() {
      if (this.loadOver === true) {
        return;
      }
      this.pager.currentNum++;
      this.queryList("push");
    },
    refreshList() {
      this.loadOver = false;
      // 重置pager对象
      // this.pager.caseStatus = null; //阶段
      // this.pager.caseStatusTwo = null; //状态
      // this.pager.repaymentAll = null; //还款子状态
      // this.pager.keyWord = ""; //关键字
      this.pager.currentNum = 1; //页号 	不传默认1
      this.pager.pageSize = 10; //每页展示数量
      // 关闭暂无搜索结果样式
      // this.show_nfdata = false;
      this.queryList();
    },
    handleChangeInput(text) {
      // input搜索文本改变
      this.searchWords = text;
      console.log("this.searchWords", this.searchWords);
      this.pager.keyWord = this.searchWords;
    },
    queryList(plus, fn) {
      console.log("**************doQuerylist******");
      // 列表查询
      this.$http
        .post("/mobile/case/list.htm", {
          ...this.pager
        })
        .then(res => {
          if (res.data.code === "0000") {
            let count = res.data.result.count;
            let list = res.data.result.list;
            this.pager.count = count;
            console.log(list);

            if (plus === "push") {
              this.dataList = this.dataList.concat(list);
            } else {
              this.dataList = list;
            }
            // 回调
            fn && fn();
            // 查询成功-子组件则隐藏
            this.$refs.sBarDropDown.closeDropDownFilter();
            this.$nextTick(() => {
              if (
                this.pager.pageSize * this.pager.currentNum >=
                this.pager.count
              ) {
                this.loadOver = true;
              }
            });
          }
        })
        .catch(err => {
          console.log("catch-", err);
        });
    }
  },
  mounted() {
    this.queryList();
  }
};
</script>

<style lang='scss' scoped type='text/css'>
@import "@/assets/style/scss/helper/_mixin.scss";
$themeColor: #0f357f;
.case_progress_sort_list {
  .color-white {
    color: #fff;
  }
}
.topfix {
  position: fixed;
  z-index: 99;
  top: 0;
}

.item_complex_btns {
  // padding: rem(10) rem(10) rem(10) 0;
  border-top: 1px solid #dfdfdf;
}

.flex_ico_btn {
  font-size: rem(23);
  text-align: center;
  .ico_progress {
    &:before {
      content: "";
      display: inline-block;
      vertical-align: top;
      margin: 0 auto;
      width: rem(32);
      height: rem(32);
      background-image: url(~@/assets/img/ico_file_see.png);
      background-size: contain;
    }
  }
  .ico_msg {
    border-color: #bcbcbc;
    border-width: 1px;
    border-left-style: solid;
    &:before {
      content: "";
      display: inline-block;
      vertical-align: top;
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
  // padding: rem(20) 0;
  height: rem(85);
  line-height: rem(85);
  background-color: $themeColor;
  color: #fff;
}
.disable_btn {
  background-color: #c8c8c8;
  height: 100%;
}
.usable_btn {
  background-color: #0f357f;
  height: 100%;
}
</style>
<style lang="scss">
@import "@/assets/style/scss/helper/_mixin.scss";
.case_progress_sort_list {
  .nodata .vux-divider {
    display: none;
  }
  .weui-tab__panel {
    margin-top: rem(80);
  }
}
</style>
