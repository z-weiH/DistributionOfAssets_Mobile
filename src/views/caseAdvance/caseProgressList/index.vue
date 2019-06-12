<template>
  <div class="case_progress_sort_list">
    <view-box ref="viewBox">
      <!-- 筛选条件 -->
      <div slot="header" class="topfix">
        <SearchBarDropDown
          :caseStatusItems="caseStatusItems"
          :caseStatusTwoItems="caseStatusTwoItems"
          :searchWords="searchWords"
          @change="handleChangeInput"
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
                    <span v-if="it.caseStatusTwo === 15">驳回申请</span>
                    <span v-if="it.caseStatusTwo === 16">撤回案件</span>
                  </div>
                  <div v-if="it.delayStatus === 0">
                    <x-button mini style="border-radius:99px;" :gradients="['#666','#666']">延期申请审核中</x-button>
                  </div>
                  <div v-if="it.delayStatus === 1">
                    <x-button
                      mini
                      style="border-radius:99px;"
                      :gradients="['#1D975E','#1D975E']"
                    >延期申请通过</x-button>
                  </div>
                  <div v-if="it.delayStatus === 2">
                    <x-button
                      mini
                      plain
                      style="border-radius:99px;"
                      @click.native="getCurrentItem(item),showCustomModal('rejectModal')"
                    >查看驳回原因</x-button>
                  </div>
                  <div v-else></div>
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
                      <v-touch tag="div" v-on:tap="handleSee(item,index)" class="ico_progress">日志</v-touch>
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
                <FlexboxItem :span="6" class="flex_def_btn">更新案件状态</FlexboxItem>
              </Flexbox>
            </div>
            <!-- end -->
          </div>
        </div>
      </scroller>
      <!-- end -->
    </view-box>
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
  data() {
    return {
      searchWords: "",
      caseStatusItems: [
        { code: "0", name: "待执行", active: false }, //false
        { code: "1", name: "执行中", active: false },
        { code: "2", name: "款物登记", active: false },
        { code: "3", name: "结案", active: false }
      ],
      caseStatusTwoItems: [
        { code: "0", name: "待分发", active: false },
        { code: "1", name: "待签收", active: false },
        { code: "2", name: "已签收", active: false },
        { code: "3", name: "送达法院", active: false },
        { code: "4", name: "材料补证", active: false },
        { code: "5", name: "法院立案", active: false },
        { code: "6", name: "恢复执行", active: false },
        { code: "7", name: "执行回款", active: false },
        { code: "8", name: "回款（非执行）", active: false },
        { code: "9", name: "财产拍卖", active: false },
        { code: "10", name: "执行完毕", active: false },
        { code: "11", name: "终结本次执行程序", active: false },
        { code: "12", name: "终结执行", active: false },
        { code: "13", name: "销案", active: false },
        { code: "14", name: "不予执行", active: false },
        { code: "15", name: "驳回申请", active: false },
        { code: "16", name: "撤回案件", active: false }
      ],
      loadOver: false,
      dataList: [], //列表数据源
      pager: {
        caseStatus: "", //阶段
        caseStatusTwo: "", //状态
        currentNum: 1, //页号 	不传默认1
        keyWord: "", //关键字
        pageSize: 10 //每页展示数量
      }
    };
  },
  methods: {
    loadMore() {},
    refreshList() {},
    handleChangeInput(text) {
      // input搜索文本改变
      this.searchWords = text;
      console.log(this.searchWords);
    },
    queryList() {
      // 列表查询
      this.$http
        .post("/mobile/case/list.htm", {
          ...this.pager
        })
        .then(res => {
          let count = res.data.result.count;
          let list = res.data.result.list;
          console.log(list);
          this.dataList = list;
        })
        .catch(err => {});
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
}
.topfix {
  position: fixed;
  z-index: 99;
  top: 0;
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
    .item-title {
      .card_item {
        span {
          font-size: rem(28);
          font-weight: bold;
          color:#339933;
        }
      }
    }
    .item-content {
      padding-left: rem(29);
      margin-bottom: rem(20);
      padding-bottom: rem(20);
      .mcontent {
        margin-top: rem(20);
      }
      .headtit{
        font-weight:bold;
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
  padding: rem(20) 0;
  background-color: $themeColor;
  color: #fff;
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
