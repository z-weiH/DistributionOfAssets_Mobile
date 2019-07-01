<template>
  <div class="dropdfilter_box">
    <div class="item_card">
      <h1>案件阶段</h1>
      <div class="item_box">
        <v-touch
          tag="div"
          :class="['item',{'on' : it.active }]"
          v-for="(it,index) in caseStatusItemsNew"
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
          v-for="(it,index) in caseStatusTwoItemsNew"
          :key="index"
          v-on:tap="onItemStatus('state',index)"
        >{{it.name}}</v-touch>
      </div>
    </div>
    <div class="item_card" v-if="threePanel">
      <h1>还款子状态</h1>
      <div class="item_box">
        <v-touch
          tag="div"
          :class="['item',{'on' : it.active }]"
          v-for="(it,index) in caseStatusThreeItemsNew"
          :key="index"
          v-on:tap="onItemStatus('stateReplay',index)"
        >{{it.name}}</v-touch>
      </div>
    </div>
    <div class="ctrl_btns">
      <v-touch tag="div" v-on:tap="handleReset" class="btn_confirm">重置</v-touch>
      <v-touch tag="div" v-on:tap="handleConfirm" class="btn_confirm">确定</v-touch>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: "dropDownFilter",
  props: {
    linkageCaseStatus: {},
    caseStatusItems: {},
    caseStatusTwoItems: {},
    caseStatusThreeItems: {},
    // 入参--案件阶段
    pager: {}
  },
  data() {
    return {
      caseStatusOne: "",
      caseStatusTwo: "",
      caseStatusThree: "",
      caseStatusItemsNew: this.caseStatusItems,
      caseStatusTwoItemsNew: this.caseStatusTwoItems,
      caseStatusThreeItemsNew: this.caseStatusThreeItems,
      threePanel: false
    };
  },
  methods: {
    /****
     * @param base
     * @param arrTarget
     */
    // setCaseStateInitArr(base,arrTarget){
    //   let that = this;
    //   // 把不同的子级数组恢复初始状态
    //       base = arrTarget;
    //       let _linkcs = that.resetActiveOff(base);
    //       console.log("_linkcs", _linkcs);
    //       base = _linkcs;
    // },
    resetActiveOff(arr) {
      // 设置状态列表所有对象为未选中
      return arr.map((it, idx) => {
        // it:键名
        // idx:下标
        it["active"] = false;
        return it;
      });
    },
    setTwoLevelVal(code) {
      // 设置二级状态
      // 重置状态
      this.pager.caseStatusTwo = null;
      this.pager.repaymentAll = null;
      console.log("this.linkageCaseStatus--", this.linkageCaseStatus, code);
      Object.keys(this.linkageCaseStatus).map((k, v) => {
        // k:键名
        // v:下标
        if (code == k) {
          console.log(
            "current-linkageCaseStatus:",
            this.linkageCaseStatus[k],
            "code----",
            code
          );
          switch (code) {
            case 2:
              // this.caseStatusThreeItemsNew = this.linkageCaseStatus[k];
              // let _linkcs = this.resetActiveOff(this.caseStatusThreeItemsNew);
              // console.log("_linkcs", _linkcs);
              // this.caseStatusThreeItemsNew = _linkcs;
              // this.setCaseStateInitArr(this.caseStatusThreeItemsNew,this.linkageCaseStatus[k]);
              break;
            default:
              break;
          }
          // this.setCaseStateInitArr(this.caseStatusThreeItemsNew,this.linkageCaseStatus[k]);
          this.caseStatusTwoItemsNew = this.linkageCaseStatus[k];
          let _linkcs = this.resetActiveOff(this.caseStatusTwoItemsNew);
          console.log("_linkcs", _linkcs);
          this.caseStatusTwoItemsNew = _linkcs;


          // this.caseStatusTwoItemsNew = this.linkageCaseStatus[k];
          // let _linkcs = this.caseStatusTwoItemsNew.map((it, idx) => {
          //   // it:键名
          //   // idx:下标
          //   it["active"] = false;
          //   return it;
          // });
          // console.log("_linkcs", _linkcs);
          // this.caseStatusTwoItemsNew = _linkcs;
        }
      });
    },
    linkageTwoState(code) {
      // 联动区分对应二级状态
      switch (code) {
        case 0:
          console.log("0000000000");
          this.setTwoLevelVal(code);
          break;
        case 1:
          this.setTwoLevelVal(code);
          break;
        case 2:
          this.setTwoLevelVal(code);
          break;
        case 3:
          this.setTwoLevelVal(code);
          break;
        default:
          break;
      }
    },
    levelFoo(level, stateVal) {
      switch (level) {
        case 1:
          this.pager.caseStatus = stateVal;
          break;
        case 2:
          this.pager.caseStatusTwo = stateVal;
          break;
        case 3:
          this.pager.repaymentAll = stateVal;
          break;
        default:
          break;
      }
    },
    /*****
     * @param arr 数组
     * @param fn 回调
     * @param index 父函数下标
     */
    handleActive(arr, index, fn) {
      arr.map((v, k) => {
        if (k === index) {
          console.log("vvvvvvvvv", v);
          v["active"] = !v["active"];
          if (v["active"] == 0) {
            console.log("未选中", v, "--", this.pager);
            this.levelFoo(v.level, null);
            v.level == 1 ? (this.caseStatusTwoItemsNew = []) : void 0;
          } else {
            console.log("已选中", v, "--", this.pager);
            this.levelFoo(v.level, Number(v.code));
            // v.level == 1 ? this.linkageTwoState(Number(v.code)) : void 0;
            if (v.level == 2) {
              v.code == 7 || v.code == 8 ? (this.threePanel = true) : void 0;
            } else if (v.level == 1) {
              this.linkageTwoState(Number(v.code));
              this.threePanel = false;
            }
          }
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
          this.handleActive(this.caseStatusItemsNew, index);
          break;
        case "state":
          this.handleActive(this.caseStatusTwoItemsNew, index);
          break;
        case "stateReplay":
          this.handleActive(this.caseStatusThreeItems, index);
        default:
          break;
      }
    },
    handleConfirm() {
      console.log("确定------------", this.$parent.$emit);
      if (this.pager.caseStatus == 2) {
        if (this.pager.caseStatusTwo && this.pager.repaymentAll == null) {
          this.$vux.toast.text("请选择结清状态");
        } else {
          this.$parent.$emit("EnterQuery");
          // 确定状态-且隐藏当前组件
          this.$emit("close");
        }
      } else {
        this.$parent.$emit("EnterQuery");
        // 确定状态-且隐藏当前组件
        this.$emit("close");
      }
    },
    resetPager(){
      // 重置交互状态和查询条件状态
      this.resetActiveOff(this.caseStatusItemsNew)
      this.resetActiveOff(this.caseStatusTwoItemsNew)
      this.resetActiveOff(this.caseStatusThreeItemsNew)
      this.pager.caseStatus = null;
      this.pager.caseStatusTwo = null;
      this.pager.repaymentAll = null;
    },
    handleReset() {
      this.resetPager();
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
