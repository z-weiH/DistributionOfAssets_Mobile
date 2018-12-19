<template>
  <div class="case-advance-sort-list">
    <!-- 筛选条件 -->
    <div class="search-item">
      <flexbox :gutter="0">
        <flexbox-item v-for="(item,index) in searchList" :key="index">
          <div @click="handleActive(item,index)" :class="{'search-active' : item.active}" class="flex-demo">{{item.text}}</div>
        </flexbox-item>
      </flexbox>
    </div>

    <scroller :probeType="1"
      :data="dataList"
      :pulldown="true"
      :pullup="true"
      @scrollToEnd="loadMore"
      @pulldown="refreshList"
      :loadOver="loadOver"
      :class="{'nodata' : dataList.length === 0}"
    >
    <!-- 列表 -->
    <div class="item-list-box">
      <div class="item-list" v-for="(item,index) in dataList" :key="index">
        <div class="item-title">
          <group :gutter="0" class="card_item">
            <cell :border-intent="false" class="sub-item">
              <div slot="title" class="card_tit">案件：{{item.arbCaseNo}}</div>
              <div v-if="item.caseStatus === 4" class="flag_btn green">已签收</div>
              <div v-if="item.caseStatus === 2" class="flag_btn gray">已结案</div>
              <div v-if="item.caseStatus === 1" class="flag_btn jdred">未立案</div>
              <div v-if="item.caseStatus === 0" class="flag_btn yellow">已立案</div>
            </cell>
          </group>
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
                立案日期：{{item.recordDate.split(' ')[0]}}
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
              <template v-if="item.caseStatus === 2 && (item.progressReason === '代理商法催回款' || item.progressReason === '自主回款') && item.repaymentAll === 0">
                <span class="color-red">(款项未结清)</span>
                <a @click="handleCaseAlteration(item,index)">请求案件变更</a>
              </template>
              <template v-else-if="item.caseStatus === 2 && (item.progressReason === '代理商法催回款' || item.progressReason === '自主回款') && item.repaymentAll === 1">
                <span>(款项已结清)</span>
              </template>
              <template v-else-if="item.confirmedStatus === 0 || item.confirmedStatus === 2">
                <span class="color-yellow">(平台处理中)</span>
              </template>
              <template v-else>
                <a @click="handleCaseAlteration(item,index)">请求案件变更</a>
              </template>
            </flexbox-item>
          </flexbox>
        </div>
      </div>

      <div v-if="dataList.length === 0" class="nfcase_panel">当前阶段暂无数据</div>
    </div>
    </scroller>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem , XButton , Group , Cell} from 'vux'
  export default {
    components : {
      Flexbox,
      FlexboxItem,
      XButton,
      Group,
      Cell,
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
            value : 4,
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
            text : '已结案',
            active : false,
            value : 2,
          },
        ],
        dataList : [
          /* {
            // 案号
            arbCaseNo : '我是案号',
            // 申请人
            arbApplicant : '我是申请人',
            // 被申请人
            arbRespondent : '我是被申请人',
            // 案由
            caseCause : '我是案由',
            // 裁决金额
            adjudicationAmt : '我是裁决金额',
            // 立案日期
            recordDate : '我是立案日期',
            // 案件状态 0 已立案 1 未立案 2 已结案 3待签收 4已签收
            caseStatus : 1,
            // 平台处理状态 0未结清 1已结清 2平台处理中
            repaymentAll : 2,
            caseId : '123'
          },{},{},{},{},{} */
        ],

        // 数据总数
        total : 11,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,
      }
    },
    mounted() {
      this.initTableList();
    },
    methods : {
      // 点击筛选条件
      handleActive(item,index) {
        this.searchList = this.searchList.map((v,k) => {
          v.active = index === k;
          return v;
        });
        this.currentPage = 1;
        this.loadOver = false;
        this.initTableList();
      },
      // 下拉加载
      loadMore() {
        if(this.loadOver === true) {
          return;
        }
        this.currentPage = this.currentPage + 1;
        this.initTableList('push');
      },
      // 上拉刷新
      refreshList() {
        this.currentPage = 1;
        this.loadOver = false;
        this.initTableList('reload');
      },
      // 点击查看
      handleSee(row,index) {
        this.$router.push({
          path : 'progressView',
          query : {
            arbCaseNo : row.arbCaseNo,
            caseId : row.caseId,
            confirmedStatus : row.confirmedStatus,
            caseStatus : row.caseStatus,
            caseInfoId : row.caseInfoId,
            id : row.id,
          },
        });
      },
      // 点击 案件变更
      handleCaseAlteration(row,index) {
        console.log(row);
        this.$router.push({
          path : 'changeReqCase',
          query : {
            caseStatus : row.caseStatus,
            id : row.id,
          },
        });
      },

      // 初始化 数据
      initTableList(type,callback) {
        this.$vux.loading.show();
        this.$http({
          url : '/mobile/queryCaseProgressInfo.htm',
          method : 'post',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,
            caseStatus : this.searchList.filter(v => v.active)[0].value,
          },
        }).then((res) => {
          this.$vux.loading.hide();
          res = res.data;
          this.total = res.result.count;
          if(type === 'push') {
            this.dataList = this.dataList.concat(res.result.list);
          }else{
            this.dataList = res.result.list;
          }
          callback && callback();
          this.$nextTick(() => {
            if(this.pageSize * this.currentPage >= this.total) {
              this.loadOver = true;
            }
          });
        }).catch(() => {
          this.$vux.loading.hide();
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
  .card_tit{
    border : none;
  }
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
    background-color: #f3f6ff;
    color: rgb(51, 51, 51);
    font-size: rem(24);
    z-index: 1;
    position: relative;
    .flex-demo{
      text-align: center;
      height: rem(40);
      margin-top: rem(25);
      border-right: 1px solid #d5d5d5;
    }
    .vux-flexbox-item:last-child .flex-demo{
      border-right: none;
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
      margin-top: rem(18);
      background-color: #fff;
      .item-content{
        padding-left: rem(29);
        margin-bottom: rem(20);
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

<style lang="scss">

.case-advance-sort-list{
  .nodata .vux-divider{
    display: none;
  }
}

</style> 
