<template>
  <div class="case-advance-sort-list">
    <scroller :probeType="1"
      :data="dataList"
      :pulldown="true"
      :pullup="true"
      @scrollToEnd="loadMore"
      @pulldown="refreshList"
      :loadOver="loadOver"
    >
    <!-- 筛选条件 -->
    <div class="search-item">
      <flexbox :gutter="0">
        <flexbox-item v-for="(item,index) in searchList" :key="index">
          <div @click="handleActive(item,index)" :class="{'search-active' : item.active}" class="flex-demo">{{item.text}}</div>
        </flexbox-item>
      </flexbox>
    </div>

    <!-- 列表 -->
    <div class="item-list-box">
      <div class="item-list" v-for="(item,index) in dataList" :key="index">
        <div class="item-title">
          <div class="fl">案件：2017衢仲网裁字8号</div>
          <div class="fr">
            <x-button v-if="item.caseStatus === 3" class="ra-99" mini type="primary" plain>已签收</x-button>
            <x-button v-if="item.caseStatus === 2" class="ra-99" mini type="default" plain>已结案</x-button>
            <x-button v-if="item.caseStatus === 1" class="ra-99" mini type="warn" plain>未立案</x-button>
            <x-button v-if="item.caseStatus === 0" class="ra-99 btn-yellow" mini plain>已立案</x-button>
          </div>
        </div>
        <div class="item-content">
          <flexbox :gutter="0">
            <flexbox-item>
              <div class="mcontent">
                申请人：{{item.arbApplicant}}
              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="mcontent">
                被申请人：{{item.arbRespondent}}
              </div>
            </flexbox-item>
          </flexbox>

          <flexbox :gutter="0">
            <flexbox-item>
              <div class="mcontent">
                案由：{{item.caseCause}}
              </div>
            </flexbox-item>
            <flexbox-item>
              <div class="mcontent">
                裁决金额：{{item.adjudicationAmt}}
              </div>
            </flexbox-item>
          </flexbox>

          <flexbox :gutter="0">
            <flexbox-item>
              <div class="mcontent">
                立案日期：{{item.recordDate}}
              </div>
            </flexbox-item>
          </flexbox>
        </div>
        <div class="item-handle">
          <flexbox :gutter="0">
            <flexbox-item class="handle-btn">
              <a @click="handleSee(item,index)">进展查看</a>
            </flexbox-item>
            <flexbox-item class="handle-btn">
              <template v-if="item.repaymentAll === ''">
                <a @click="handleCaseAlteration(item,index)">请求案件变更</a>
              </template>
              <template v-if="item.repaymentAll === 0">
                <span class="color-red">(款项未结清)</span>
                <a @click="handleCaseAlteration(item,index)">请求案件变更</a>
              </template>
              <template v-if="item.repaymentAll === 1">
                <span>(款项已结清)</span>
              </template>
              <template v-if="item.repaymentAll === 2">
                <span class="color-yellow">(平台处理中)</span>
                <a @click="handleCaseAlteration(item,index)">请求案件变更</a>
              </template>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
    </div>
    </scroller>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem , XButton } from 'vux'
  export default {
    components : {
      Flexbox,
      FlexboxItem,
      XButton,
    },
    data() {
      return {
        loadOver : false,
        searchList : [
          {
            text : '全部',
            active : true,
            value : '',
          },
          {
            text : '已签收',
            active : false,
            value : 3,
          },
          {
            text : '已立案',
            active : false,
            value : 0,
          },
          {
            text : '未立案',
            active : false,
            value : 1,
          },
          {
            text : '已结束',
            active : false,
            value : 2,
          },
        ],
        dataList : [
          {
            // 案号
            arbCaseNo : '',
            // 申请人
            arbApplicant : '',
            // 被申请人
            arbRespondent : '',
            // 案由
            caseCause : '',
            // 裁决金额
            adjudicationAmt : '',
            // 立案日期
            recordDate : '',
            // 案件状态 0 已立案 1 未立案 2 已结案 3 已签收
            caseStatus : 3,
            // 平台处理状态 0未结清 1已结清 2平台处理中
            repaymentAll : 2,
          }
        ],
      }
    },
    mounted() {},
    methods : {
      // 点击筛选条件
      handleActive(item,index) {
        this.searchList = this.searchList.map((v,k) => {
          v.active = index === k;
          return v;
        });
      },
      // 下拉加载
      loadMore() {
        alert('上啦');
        setTimeout(() => {
          this.dataList.push({});
        },2000);
      },
      // 上拉刷新
      refreshList() {
        alert('下拉');
      },
      // 点击查看
      handleSee(row,index) {
        this.$router.push({
          path : 'progressView'
        });
      },
      // 点击 案件变更
      handleCaseAlteration(row,index) {
        this.$router.push({
          path : 'changeReqCase'
        });
      },
    },
  }
</script>

<style lang="scss" scoped>
@import "@/assets/style/scss/helper/_mixin.scss";
.case-advance-sort-list{
  color: #333333;
  font-size: rem(23);
  height: 100%;
  background-color: #eeeeee;
  .ra-99{
    border-radius: 99px;
  }
  .btn-yellow{
    border-color: rgb(240, 179, 0);
    color: rgb(240, 179, 0);
  }
  .color-yellow{
    color: rgb(240, 179, 0);
  }
  .color-red{
    color: rgb(204, 0, 0);
  }

  .search-item{
    height: rem(82);
    line-height: rem(82);
    background-color: #f3f6ff;
    color: rgb(51, 51, 51);
    font-size: rem(24);
    .flex-demo{
      text-align: center;
      position: relative;
      height: 100%;
    }
    .vux-flexbox-item .flex-demo::after{
      content : '';
      display: inline-block;
      position: absolute;
      width: 1px;
      color: transparent;
      height: rem(42);
      background-color: #d5d5d5;
      top: rem(17);
      left: rem(148);
    }
    .vux-flexbox-item:last-child .flex-demo::after{
      display: none;
    }
    .search-active{
      color: rgb(0, 56, 136);
    }
  }
  .item-list-box{
    overflow: auto;
    box-sizing: border-box;
    height: calc(100% - 1.09333rem);
    *{
      box-sizing: border-box;
    }
    .item-list{
      height: rem(344);
      margin-top: rem(18);
      background-color: #fff;

      .item-title{
        min-height: rem(76);
        padding-left: rem(29);
        overflow: hidden;
        border-bottom: 1px solid #eaeaea;
        .fl{
          width: calc(100% - 2.66667rem);
          line-height: rem(76);
        }
        .fr{
          text-align: right;
          width: rem(200);
          padding-right: rem(29);
          line-height: rem(76);
          margin-top: rem(2);
        }
      }
      .item-content{
        height: rem(202);
        padding-left: rem(29);
        .mcontent{
          margin-top: rem(20);
        }
      }
      .item-handle{
        height: rem(66);
        line-height: rem(66);
        border-top: 1px solid #eaeaea;
        .handle-btn{
          text-align: center;
        }
        .handle-btn:first-child{
          border-right: 1px solid #eaeaea;
        }
      }
    }
  }
}

</style>