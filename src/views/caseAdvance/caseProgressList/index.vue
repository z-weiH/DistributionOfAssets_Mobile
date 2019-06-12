<template>
  <div class="case_progress_sort_list">
    <view-box ref="viewBox">
      <!-- 筛选条件 -->
      <div slot="header">
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
      ></scroller>
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
      dataList: [] //列表数据源
    };
  },
  methods: {
    loadMore() {},
    refreshList() {},
    handleChangeInput(text) {
      // input搜索文本改变
      this.searchWords = text;
      console.log(this.searchWords);
    }
  }
};
</script>

<style lang='scss' scoped type='text/css'>
.case_progress_sort_list {
}
</style>
<style lang="scss">
.case_progress_sort_list {
  .nodata .vux-divider {
    display: none;
  }
}
</style>
