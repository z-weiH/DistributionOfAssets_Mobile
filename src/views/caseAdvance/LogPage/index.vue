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
            <van-steps direction="vertical" active-color="#0DBC79" :active="-1">
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
                        <span>状态变更为：</span>
                        <span>
                          <template v-if="it.targetStatus === -1">电子材料未生成</template>
                          <template v-if="it.targetStatus === 0">待分发</template>
                          <template v-if="it.targetStatus === 1">待签收</template>
                          <template v-if="it.targetStatus === 2">材料已签收</template>
                          <template v-if="it.targetStatus === 3">材料送达法院</template>
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
                        <span v-if="it.confirmedStatus === 1 || it.confirmedStatus === 3">
                          <i class="tabstatus">驳回</i>
                        </span>
                      </li>
                      <li>
                        <span>发起人：</span>
                        <span>
                          <template v-if="it.operatorAgency">{{it.operatorAgency}}&nbsp;-&nbsp;</template>
                          {{it.operatorName}}
                        </span>
                      </li>
                      <li v-if="it.confirmedTime">
                        <span>发生时间：</span>
                        <span>{{it.confirmedTime}}</span>
                      </li>
                      <li v-if="it.operationDetail">
                        <template>
                          <span>补充说明：</span>
                          <span>{{it.operationDetail}}</span>
                        </template>
                      </li>
                      <li v-if="it.imgUrls">
                        <span>{{index}}</span>
                        <span>
                          <template>
                            <img
                              :src="pic"
                              v-for="(pic,idx) in it.imgUrls.split(',')"
                              :key="idx"
                              @click="handleShowImg(index,idx)"
                            />
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
                          <template v-if="it.targetStatus === -1">电子材料未生成</template>
                          <template v-if="it.targetStatus === 0">待分发</template>
                          <template v-if="it.targetStatus === 1">待签收</template>
                          <template v-if="it.targetStatus === 2">材料已签收</template>
                          <template v-if="it.targetStatus === 3">材料送达法院</template>
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
                        <span v-if="it.confirmedStatus === 1 || it.confirmedStatus === 3">
                          <i class="tabstatus">驳回</i>
                        </span>
                      </li>
                      <li>
                        <span>发起人：</span>
                        <span>
                          <template v-if="it.operatorAgency">{{it.operatorAgency}}&nbsp;-&nbsp;</template>
                          {{it.operatorName}}
                        </span>
                      </li>
                      <li v-if="it.courtStartTime">
                        <span>立案时间：</span>
                        <span>{{it.courtStartTime}}</span>
                      </li>
                      <template v-if="it.targetStatus === 7 || it.targetStatus === 8">
                        <li>
                          <span>回款金额：</span>
                          <span>{{it.repaymentAmt}}</span>
                        </li>
                        <li>
                          <span>回款方式：</span>
                          <span>{{it.repaymentMethod}}</span>
                        </li>
                      </template>
                      <template v-else>
                        <li v-if="it.courtCaseNo">
                          <span>执行案号：</span>
                          <span>{{it.courtCaseNo}}</span>
                        </li>
                      </template>
                      <li v-if="it.confirmedTime">
                        <span>发生时间：</span>
                        <span>{{it.confirmedTime}}</span>
                      </li>
                      <li v-if="it.operationDetail">
                        <span>补充说明：</span>
                        <span>{{it.operationDetail}}</span>
                      </li>
                      <li>
                        <template
                          v-if="it.targetStatus === 7 && it.confirmDetail || it.targetStatus === 8 && it.confirmDetail"
                        >
                          <span>补充说明：</span>
                          <span>
                            <template v-if="it.confirmDetail">{{it.confirmDetail}}</template>
                            <template v-if="it.attachFile">
                              <img
                                :src="pic"
                                v-for="(pic,idx) in it.attachFile.split(',')"
                                :key="idx"
                                @click="handleShowImg(index,idx)"
                              />
                              <div v-transfer-dom>
                                <previewer
                                  :ref="`previewer${index}`"
                                  :list="imageFormat(it.attachFile)"
                                  @on-index-change="logIndexChange"
                                ></previewer>
                              </div>
                            </template>
                          </span>
                        </template>
                      </li>
                      <li v-if="it.imgUrls">
                        <span>附件：</span>
                        <span>
                          <template>
                            <img
                              :src="pic"
                              v-for="(pic,idx) in it.imgUrls.split(',')"
                              :key="idx"
                              @click="handleShowImg(index,idx)"
                            />
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
                      <li v-if="it.confirmedStatus === 1 && it.checkDetail" class="topline">
                        <template>
                          <span>审核说明：</span>
                          <span>{{it.checkDetail}}</span>
                        </template>
                      </li>
                    </template>
                    <!-- end -->
                    <!-- 执行措施 -->
                    <template v-else-if="it.applyType === 2">
                      <li>
                        <span>新增状态：</span>
                        <span>{{it.measures}}</span>
                        <span v-if="it.confirmedStatus === 1 || it.confirmedStatus === 3">
                          <i class="tabstatus">驳回</i>
                        </span>
                      </li>
                      <li>
                        <span>发起人：</span>
                        <span>
                          <template v-if="it.operatorAgency">{{it.operatorAgency}}&nbsp;-&nbsp;</template>
                          {{it.operatorName}}
                        </span>
                      </li>
                      <li v-if="it.confirmedTime">
                        <span>发生时间：</span>
                        <span>{{it.confirmedTime}}</span>
                      </li>
                      <li>
                        <template v-if="it.targetStatus === 16 && it.checkDetail">
                          <span>补充说明：</span>
                          <span>{{it.checkDetail}}</span>
                        </template>
                        <template v-else-if="it.operationDetail">
                          <span>补充说明：</span>
                          <span>{{it.operationDetail}}</span>
                        </template>
                      </li>
                      <li v-if="it.imgUrls">
                        <span>附件：</span>
                        <span>
                          <template>
                            <img
                              :src="pic"
                              v-for="(pic,idx) in it.imgUrls.split(',')"
                              :key="idx"
                              @click="handleShowImg(index,idx)"
                            />
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
    handleShowImg(index, idx) {
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
        let newarr = _arr.map(v => {
          console.log("arr-v------", v);
          return { src: v, w: 500, h: 400 };
        });
        console.log("newarr-----------", newarr);
        return newarr;

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
        padding-top: rem(20);
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
      font-size: rem(26);
      > span {
        display: table-cell;
        vertical-align: middle;
        &:first-child {
          width: rem(200);
          white-space: nowrap;
          font-size: rem(28);
          font-weight: bold;
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

.tabstatus {
  display: inline-block;
  vertical-align: middle;
  padding: rem(7) rem(18);
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  margin-left: 36%;
  font-size: rem(24);
  border-radius: rem(36);
  border-width: 1px;
  border-color: #e4393c;
  background-color: #e4393c;
  font-style: normal;
  color: #fff;
  letter-spacing: rem(3);
}
.topline {
  // border-width: 1px;
  // border-top-style: dashed;
  // border-color: #888777;
  border-top: 1px solid #888777;
  width: 100%;
}
</style>
