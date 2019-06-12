<template>
  <div class="searchbar_wrap">
    <div class="searchbar_dropdown fr_c">
      <div>
        <v-touch tag="span" v-on:tap="handleSearch"  class="ico_search"></v-touch>
      </div>
      <div>
        <x-input
          type="text"
          @keyup.native.13="handleSearch"
          v-model="searchWord"
          :placeholder="placeholder"
        ></x-input>
      </div>
      <div>
        <v-touch tag="span" v-on:tap="handleOpenDropDownFilter"  class="ico_paragraph"></v-touch>
      </div>
    </div>
    <transition name="fade">
      <drop-down-filter
        v-show="show"
        ref="ddFilter"
        :caseStatusItems="caseStatusItems"
        :caseStatusTwoItems="caseStatusTwoItems"
        @close="handleOpenDropDownFilter"
      ></drop-down-filter>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
import dropDownFilter from "./DropDownFilter";
export default {
  components: {
    dropDownFilter
  },
  watch:{
    searchWord(val){
      // console.log(oldVal,newVal)
      this.$emit("change",val);
    }
  },
  props: {
    searchWords: {},
    placeholder: {
      type: String,
      default: "搜索:仲裁案号/执行案号/被执行人姓名"
    },
    caseStatusItems: {
      //案件一级状态
      type: Array,
      default: () => {
        return [];
      }
    },
    caseStatusTwoItems: {
      //案件二级状态
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      //条件过滤器组件显示状态
      show: false,
      searchWord:this.searchWords
    };
  },
  methods: {
    handleSearch() {
      // 搜索条搜索方法
      console.log("handleSearch");
      if (this.searchWords === "") {
        this.$vux.toast.show("请输入搜索关键字");
      } else {
        this.initTableList();
      }
    },
    handleOpenDropDownFilter() {
      // 打开下拉过滤器
      this.show = !this.show;
    }
  }
};
</script>

<style lang='scss' scoped type='text/css'>
@import "@/assets/style/scss/helper/_mixin.scss";
.searchbar_wrap {
  // position: relative;
}

.ico_search {
  margin: auto;
  display: block;
  width: rem(32);
  height: rem(32);
  background-image: url(~@/assets/img/fdjzoom.png);
  background-repeat: no-repeat;
  background-size: contain;
}
.ico_paragraph {
  margin: auto;
  display: block;
  width: rem(32);
  height: rem(32);
  background-image: url(~@/assets/img/paragraph.png);
  background-repeat: no-repeat;
  background-size: contain;
}
.searchbar_dropdown {
  width: 100vw;
  border-color: #c8c8c8;
  border-width: 1px;
  border-top-style: solid;
  border-bottom-style: solid;
  background-color: #fff;
  position: relative;
  z-index: 2;
  > div {
    &:first-child {
      width: 10%;
    }
    &:nth-child(2) {
      width: 80%;
      border-color: #c8c8c8;
      border-width: 1px;
      border-left-style: solid;
      border-right-style: solid;
    }
    &:last-child {
      width: 10%;
    }
  }
  .vux-x-input {
    // width: rem(580);
  }
}
</style>
