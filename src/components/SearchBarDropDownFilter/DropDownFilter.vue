<template>
  <div class="dropdfilter_box">
    <div class="item_card">
      <h1>案件阶段</h1>
      <div class="item_box">
        <v-touch
          tag="div"
          :class="['item',{'on' : it.active }]"
          v-for="(it,index) in caseStatusItems"
          :key="index"
          v-on:tap="onItemStatus('stage',index)"
        >{{it.name}}</v-touch>
      </div>
    </div>
    <div class="item_card">
      <h1>案件状态</h1>
      <div class="item_box">
        <v-touch
          tag="div"
          :class="['item',{'on' : it.active }]"
          v-for="(it,index) in caseStatusTwoItems"
          :key="index"
          v-on:tap="onItemStatus('state',index)"
        >{{it.name}}</v-touch>
      </div>
    </div>
    <div class="ctrl_btns">
      <v-touch tag="div" v-on:tap="handleConfirm" class="btn_confirm">确定</v-touch>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: "dropDownFilter",
  props: {
    caseStatusItems: {},
    caseStatusTwoItems: {}
  },
  data() {
    return {
      caseStatusOne: "",
      caseStatusTwo: ""
    };
  },
  methods: {
    /*****
     * @param arr 数组
     * @param fn 回调
     * @param index 父函数下标
     */
    handleActive(arr, index, fn) {
      arr.map((v, k) => {
        if (k === index) {
          console.log(v);
          v["active"] = !v["active"];
          fn && fn();
        } else {
          v["active"] = false;
        }
      });
    },
    /****
     * @param type 类型名称 (stage:阶段) (state:状态)
     * @param index 下标
     */
    onItemStatus(type, index) {
      console.log(index);
      // 选中状态
      switch (type) {
        case "stage":
          this.handleActive(this.caseStatusItems, index);
          break;
        case "state":
          this.handleActive(this.caseStatusTwoItems, index);
          break;
        default:
          break;
      }
    },
    handleConfirm() {
      // 确定状态-且隐藏当前组件
      this.$emit("close");
    }
  }
};
</script>

<style lang='scss' scoped type='text/css'>
@import "@/assets/style/scss/helper/_mixin.scss";
$themeColor: #0f357f;
.dropdfilter_box {
  background-color: #fff;
  position: relative;
  z-index: 1;
  border-bottom: 1px solid #bcbcbc;
  .item_card {
    .item_box {
      clear: both;
      overflow: hidden;
      > .item {
        float: left;
      }
    }
    padding-bottom: rem(20);
    &:first-child {
      border-bottom: 1px solid #c8c8c8;
    }
    h1 {
      font-size: rem(32);
      padding: rem(10) rem(64);
      color: #888888;
    }
    .item {
      background-color: #cccccc;
      color: #fff;
      padding: rem(8) rem(12);
      border-radius: rem(12);
      margin-left: rem(10);
      margin-bottom: rem(10);
      &.on {
        color: #fff;
        background-color: $themeColor;
      }
    }
  }
  .ctrl_btns {
    padding: rem(10) rem(30) rem(25) rem(30);
    text-align: right;
  }
  .btn_confirm {
    display: inline-block;
    background-color: $themeColor;
    border-radius: rem(30);
    width: rem(98);
    height: rem(50);
    line-height: rem(50);
    text-align: center;
    color: #fff;
  }
}
</style>
