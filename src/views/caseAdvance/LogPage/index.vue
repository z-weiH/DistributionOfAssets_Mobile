<template>
  <div class="page">
    <view-box ref="viewBox">
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
          <div class="item-list">
            <van-steps direction="vertical" :active="dataList.length + 1" active-color="#0DBC79">
              <van-step v-for="(it,index) in dataList" :key="index">
                <h3 class="step_header" v-if="it.applyType === 0">
                  <template v-if="it.confirmedStatus === 0 || it.confirmedStatus === 2">平台审核中</template>
                  <template v-else>{{it.successTime}}</template>
                </h3>
                <h3 class="step_header" v-if="it.applyType === 1">
                  <template v-if="it.confirmedStatus === 0 || it.confirmedStatus === 2">平台审核中</template>
                  <template v-else>{{it.successTime}}</template>
                </h3>
                <h3 class="step_header" v-if="it.applyType === 2">
                  <template v-if="it.confirmedStatus === 0 || it.confirmedStatus === 2">平台审核中</template>
                  <template v-else>{{it.successTime}}</template>
                </h3>
                <div class="step_context">
                  <ul>
                    <!-- 普通日志 -->
                    <template v-if="it.applyType === 0">
                      <li>
                        <span>发起人：</span>
                        <span>{{it.operatorName}}</span>
                      </li>
                      <li>
                        <span>发生时间：</span>
                        <span>{{it.confirmedTime}}</span>
                      </li>
                      <li>
                        <template v-if="it.checkName">
                          <span>审核人补充说明：</span>
                          <span>{{it.confirmDetail}}</span>
                        </template>
                        <template v-else>
                          <span>发起人补充说明：</span>
                          <span>{{it.operationDetail}}</span>
                        </template>
                      </li>
                      <li>
                        <span>{{index}}</span>
                        <span>
                          <template v-if="it.imgUrls">
                            <img :src="it.imgUrls" v-for="(pic,idx) in it.imgUrls.split(',')" :key="idx" @click="handleShowImg(index,idx)">
                            <div v-transfer-dom>
                              <previewer
                                :ref="`previewer${index}`"
                                :list="imageFormat(it.imgUrls)"
                                @on-index-change="logIndexChange"
                              ></previewer>
                            </div>
                          </template>
                        </span>
                      </li>
                    </template>
                    <!-- end -->
                    <!-- 状态变更 -->
                    <template v-else-if="it.applyType === 1">
                      <li>
                        <span>状态变更为：</span>
                        <span>
                          <template v-if="it.targetStatus === 0">待分发</template>
                          <template v-if="it.targetStatus === 1">待签收</template>
                          <template v-if="it.targetStatus === 2">已签收</template>
                          <template v-if="it.targetStatus === 3">送达法院</template>
                          <template v-if="it.targetStatus === 4">材料补证</template>
                          <template v-if="it.targetStatus === 5">法院立案</template>
                          <template v-if="it.targetStatus === 6">恢复执行</template>
                          <template v-if="it.targetStatus === 7">执行回款</template>
                          <template v-if="it.targetStatus === 8">回款（非执行）</template>
                          <template v-if="it.targetStatus === 9">财产拍卖</template>
                          <template v-if="it.targetStatus === 7">执行回款</template>
                          <template v-if="it.targetStatus === 10">执行完毕</template>
                          <template v-if="it.targetStatus === 11">终结本次执行程序</template>
                          <template v-if="it.targetStatus === 12">终结执行</template>
                          <template v-if="it.targetStatus === 13">销案</template>
                          <template v-if="it.targetStatus === 14">不予执行</template>
                          <template v-if="it.targetStatus === 15">撤销案件</template>
                          <template v-if="it.targetStatus === 16">驳回申请</template>
                          <template v-if="it.repaymentAll === 0">-未结清</template>
                          <template v-if="it.repaymentAll === 1">-已结清</template>
                        </span>
                      </li>
                      <li>
                        <span>发起人：</span>
                        <span>{{it.operatorName}}</span>
                      </li>
                      <li>
                        <span>发生时间：</span>
                        <span>{{it.confirmedTime}}</span>
                      </li>
                      <li>
                        <span>补充说明：</span>
                        <span>{{it.operationDetail}}</span>
                      </li>
                      <li>
                        <template v-if="it.checkName">
                          <span>审核人补充说明：</span>
                          <span>{{it.confirmDetail}}</span>
                        </template>
                        <template v-else>
                          <span>发起人补充说明：</span>
                          <span>{{it.operationDetail}}</span>
                        </template>
                      </li>
                      <li>
                        <span></span>
                        <span>
                          <template v-if="it.imgUrls">
                            <img :src="it.imgUrls" @click="handleShowImg(index)">
                            <div v-transfer-dom>
                              <previewer
                                :ref="`previewer${index}`"
                                :list="imageFormat(it.imgUrls)"
                                @on-index-change="logIndexChange"
                              ></previewer>
                            </div>
                          </template>
                        </span>
                      </li>
                    </template>
                    <!-- end -->
                    <!-- 执行措施 -->
                    <template v-else-if="it.applyType === 2">
                      <li>
                        <span>新增状态：</span>
                        <span>{{it.measures}}</span>
                      </li>
                      <li>
                        <span>发起人：</span>
                        <span>{{it.operatorName}}</span>
                      </li>
                      <li>
                        <span>发生时间：</span>
                        <span>{{it.confirmedTime}}</span>
                      </li>
                      <li>
                        <template v-if="it.checkName">
                          <span>审核人补充说明：</span>
                          <span>{{it.confirmDetail}}</span>
                        </template>
                        <template v-else>
                          <span>发起人补充说明：</span>
                          <span>{{it.operationDetail}}</span>
                        </template>
                      </li>
                      <li>
                        <span></span>
                        <span>
                          <template v-if="it.imgUrls">
                            <img :src="it.imgUrls" @click="handleShowImg(index)">
                            <div v-transfer-dom>
                              <previewer
                                :ref="`previewer${index}`"
                                :list="imageFormat(it.imgUrls)"
                                @on-index-change="logIndexChange"
                              ></previewer>
                            </div>
                          </template>
                        </span>
                      </li>
                    </template>
                    <!-- end -->
                  </ul>
                </div>
              </van-step>
              <!-- <van-step>
                <h3 class="step_header">平台审核中</h3>
                <p class="step_context">
                  <ul>
                    <li>
                      <span>状态变更为：</span><span>撒旦发噶水电费</span>
                    </li>
                    <li>
                      <span>发起人：</span><span>街上看到回复可见阿斯大法</span>
                    </li>
                    <li>
                      <span>发生时间：</span><span>2018-02-02</span>
                    </li>
                    <li>
                      <span>补充说明：</span><span>环境受到广泛哈地方都会发生观点或发生的规范化恢复</span>
                    </li>
                  </ul>
                </p>
              </van-step>
              <van-step>
                <h3 class="step_header">平台审核中</h3>
                <p class="step_context">
                  <ul>
                    <li>
                      <span>状态变更为：</span><span>撒旦发噶水电费</span>
                    </li>
                    <li>
                      <span>发起人：</span><span>街上看到回复可见阿斯大法</span>
                    </li>
                    <li>
                      <span>发生时间：</span><span>2018-02-02</span>
                    </li>
                    <li>
                      <span>补充说明：</span><span>环境受到广泛哈地方都会发生观点或发生的规范化恢复</span>
                    </li>
                  </ul>
                </p>
              </van-step>-->
            </van-steps>
          </div>
        </div>
      </scroller>
      <!-- end -->
    </view-box>
  </div>
</template>

<script type='text/ecmascript-6'>
import Step from "vant/lib/step";
import Steps from "vant/lib/steps";
import "vant/lib/step/style";
import "vant/lib/steps/style";

import {
  Flexbox,
  FlexboxItem,
  Group,
  CellBox,
  Cell,
  XHeader,
  ViewBox,
  Previewer,
  TransferDom
} from "vux";
export default {
  directives: {
    TransferDom
  },
  components: {
    Flexbox,
    FlexboxItem,
    Group,
    CellBox,
    Cell,
    XHeader,
    ViewBox,
    Previewer,
    "van-step": Step,
    "van-steps": Steps
  },
  data() {
    return {
      id: "", //主键
      pager: {
        currentNum: 1,
        pageSize: 4
      },
      dataList: [],
      loadOver: false,
      options: {
        getThumbBoundsFn(index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll(".previewer-demo-img")[
            index
          ];
          // get window scroll Y
          let pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect();
          // w = width
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    };
  },
  methods: {
    logIndexChange(arg) {
      console.log(arg);
    },
    handleShowImg(index,idx) {
      // 打开大图
      // this.$refs["previewer" + index][0].show(index2);
      this.$refs[`previewer${index}`][0].show(idx);
    },
    // 图片格式化
    imageFormat(arr) {
      console.log("arr------------", arr);
      // return [
      //   {
      //     src:
      //       "https://image-static.segmentfault.com/260/413/2604130476-594b8f86e100f_articlex"
      //   }
      // ];
      if (arr) {
        let _arr = arr.split(",");
        console.log("_arr", _arr);
        let ss = null;

        return _arr.map(v => {
          console.log("arr-v------",v)
          return { src: v };
        });

        console.log("ss--------", ss);
      }
    },
    getParams() {
      this.id = this.$route.query.id;
    },
    queryLogList(plus) {
      this.$http
        .post("/mobile/case/operation/list.htm", {
          caseInfoId: this.id,
          ...this.pager
        })
        .then(res => {
          console.log("loglist-", res);
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
          console.log(err);
        });
    },
    loadMore() {
      if (this.loadOver === true) {
        return;
      }
      this.pager.currentNum++;
      this.queryLogList("push");
    },
    refreshList() {
      this.loadOver = false;
      // 重置pager对象
      // this.pager.caseStatus = null; //阶段
      // this.pager.caseStatusTwo = null; //状态
      // this.pager.repaymentAll = null; //还款子状态
      // this.pager.keyWord = ""; //关键字
      this.pager.currentNum = 1; //页号 	不传默认1
      this.pager.pageSize = 4; //每页展示数量
      // 关闭暂无搜索结果样式
      // this.show_nfdata = false;
      this.queryLogList();
    }
  },
  created() {
    this.getParams();
  },
  mounted() {
    this.queryLogList();
  }
};
</script>

<style lang='scss' scoped type='text/css'>
@import "@/assets/style/scss/helper/_mixin.scss";
$themeColor: #0f357f;
$flowColor: #0dbc79;
$cardColor: rgb(173, 197, 238);
.page {
  height: 100vh;
  .item-list-box {
    // height: calc(100%);
    .item-list {
      background-color: #eeeeee;
      .van-steps {
        background-color: #fcfcfc;
      }
    }
  }
}

.cardbgColor {
  background-color: $cardColor;
}

.step_header {
  // font-size:rem(28);
}
.step_context {
  ul {
    li {
      display: table;
      padding: rem(15) 0;
      > span {
        display: table-cell;
        vertical-align: top;
        &:first-child {
          width: rem(200);
          white-space: nowrap;
        }
        img {
          min-width: rem(200);
          max-width: 80%;
          min-height: rem(200);
          max-height: rem(250);
        }
      }
    }
  }
}
</style>
