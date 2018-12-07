<template>
  <div class="progress-view">
    <div class="page-title">
      <div class="fl">案件： {{arbCaseNo}}</div>
      <div class="fr">
        <template v-if="repaymentAll === 2">
          <span class="color-yellow">(平台处理中)</span>
        </template>

        <template v-else>
          <span v-if="caseStatus === 4" class="color-green">已签收</span>
          <span v-if="caseStatus === 2" class="color-gray">已结案</span>
          <span v-if="caseStatus === 1" class="color-red">未立案</span>
          <span v-if="caseStatus === 0" class="color-yellow">已立案</span>
        </template>
      </div>
    </div>
    <div>
      <van-steps direction="vertical" :active="dataList.length + 1" active-color="rgb(102, 102, 102)">
        <van-step v-if="dataList.length > 0" v-for="(item,index) in dataList" :key="index">
          <ul>
            <li>{{item.createTime}}</li>
            <!--请求已立案-->
            <template v-if="item.editState === 1">
              <li>原有案件状态: {{getCaseStatusCN(item.previousStatus)}}</li>
              <li>请求案件变更: {{getCaseStatusCN(item.targetStatus)}}</li>
              <li>执行案号:{{item.courtCaseNo}}</li>
              <li>补充说明: {{item.operationDetail}}</li>
              <li v-if="item.attachFileList.length > 0">
                <img @click="handleShowImg(index,index2)" :src="item2.pngUrl" v-for="(item2,index2) in item.attachFileList" :key="index2" />
                <previewer :ref="'previewer' + index" :list="imageFormat(item.attachFileList)"></previewer>
              </li>
            </template>

            <!--请求未立案-->
            <template v-if="item.editState === 2">
              <li>原有案件状态:{{getCaseStatusCN(item.previousStatus)}}</li>
              <li>请求案件变更: {{getCaseStatusCN(item.targetStatus)}}</li>
              <li>补充说明: {{item.operationDetail}}</li>
            </template>

            <!--请求已结案已回款-代理商法催回款-->
            <template v-if="item.editState === 3">
              <li>原有案件状态:{{getCaseStatusCN(item.previousStatus)}}</li>
              <li>请求案件变更: {{getCaseStatusCN(item.targetStatus)}}</li>
              <li>执行案号:{{item.courtCaseNo}}</li>
              <li>原因选择:{{item.progressReason}}</li>
              <li>借款人姓名: {{item.repaymentName}}</li>
              <li>还款金额: {{item.repaymentAmt}}</li>
              <li>还款方式: {{item.repaymentMethod}}</li>
              <li>补充说明: {{item.operationDetail}}</li>
              <li v-if="item.attachFileList.length > 0">
                <img @click="handleShowImg(index,index2)" :src="item2.pngUrl" v-for="(item2,index2) in item.attachFileList" :key="index2" />
                <previewer :ref="'previewer' + index" :list="imageFormat(item.attachFileList)"></previewer>
              </li>
            </template>

            <!--请求变更已结案已回款-自主回款-->
            <template v-if="item.editState === 4">
              <li>原有案件状态:{{getCaseStatusCN(item.previousStatus)}}</li>
              <li>请求案件变更: {{getCaseStatusCN(item.targetStatus)}}</li>
              <li>执行案号:{{item.courtCaseNo}}</li>
              <li>原因选择:{{item.progressReason}}</li>
              <li>借款人姓名: {{item.repaymentName}}</li>
              <li>还款金额: {{item.repaymentAmt}}</li>
              <li>补充说明: {{item.operationDetail}}</li>
              <li v-if="item.attachFileList.length > 0">
                <img @click="handleShowImg(index,index2)" :src="item2.pngUrl" v-for="(item2,index2) in item.attachFileList" :key="index2" />
                <previewer :ref="'previewer' + index" :list="imageFormat(item.attachFileList)"></previewer>
              </li>
            </template>

            <!--5.请求变更已结案-终止本次执行（临）-->
            <template v-if="item.editState === 5">
              <li>原有案件状态:{{getCaseStatusCN(item.previousStatus)}}</li>
              <li>请求案件变更: {{getCaseStatusCN(item.targetStatus)}}</li>
              <li>执行案号:{{item.courtCaseNo}}</li>
              <li>原因选择:{{item.progressReason}}</li>
              <li>补充说明: {{item.operationDetail}}</li>
              <li v-if="item.attachFileList.length > 0">
                <img @click="handleShowImg(index,index2)" :src="item2.pngUrl" v-for="(item2,index2) in item.attachFileList" :key="index2" />
                <previewer :ref="'previewer' + index" :list="imageFormat(item.attachFileList)"></previewer>
              </li>
            </template>

            <!--请求变更已结案-撤回立案（临）-->
            <template v-if="item.editState === 6">
              <li>原有案件状态:{{getCaseStatusCN(item.previousStatus)}}</li>
              <li>请求案件变更: {{getCaseStatusCN(item.targetStatus)}}</li>
              <li>执行案号:{{item.courtCaseNo}}</li>
              <li>原因选择:{{item.progressReason}}</li>
              <li>补充说明: {{item.operationDetail}}</li>
              <li v-if="item.attachFileList.length > 0">
                <img @click="handleShowImg(index,index2)" :src="item2.pngUrl" v-for="(item2,index2) in item.attachFileList" :key="index2" />
                <previewer :ref="'previewer' + index" :list="imageFormat(item.attachFileList)"></previewer>
              </li>
            </template>

            <!--7.已通过的非回款请求的处理记录-->
            <template v-if="item.editState === 7">
              <li>案件原状态:{{getCaseStatusCN(item.previousStatus)}}</li>
              <li>案件状态已变更: {{getCaseStatusCN(item.targetStatus)}}</li>
              <li>执行案号:{{item.courtCaseNo}}</li>
              <li>备注说明: {{item.operationDetail}}</li>
            </template>

            <!--运营初步确认 回款-->
            <!-- <template v-if="item.editState === 8">
              <li>案件原状态:{{getCaseStatusCN(item.previousStatus)}}</li>
              <li>案件状态已变更: {{getCaseStatusCN(item.targetStatus)}}</li>
              <li>执行案号:{{item.courtCaseNo}}</li>
              <li>备注说明: {{item.operationDetail}}</li>
              <li>关于案号{{$route.query.arbCaseNo}}回款已确认到账。</li>
              <li>被申请人: {{item.repaymentName}}</li>
              <li>还款金额: {{item.repaymentAmt}}</li>
              <li>还款方式: {{item.repaymentMethod}}</li>
              <li>结清状况: {{item.progressReason}}</li>
            </template> -->

            <!--财务复核确认 回款-->
            <template v-if="item.editState === 9">
              <li>案件原状态:{{getCaseStatusCN(item.previousStatus)}}</li>
              <li>案件状态已变更: {{getCaseStatusCN(item.targetStatus)}}</li>
              <li>执行案号:{{item.courtCaseNo}}</li>
              <li>备注说明: {{item.operationDetail}}</li>
              <li>关于案号{{$route.query.arbCaseNo}}回款已确认到账。</li>
              <li>被申请人: {{item.repaymentName}}</li>
              <li>还款金额: {{item.repaymentAmt}}</li>
              <li>还款方式: {{item.repaymentMethod}}</li>
              <li>结清状况: {{item.progressReason}}</li>
              <li>补充说明: 请联系对应对接人领取《结清证明》。</li>
            </template>

            <!--案件回款已确认但未还清  运营初步确认-->
            <template v-if="item.editState === 10">
              <li>案件原状态:{{getCaseStatusCN(item.previousStatus)}}</li>
              <li>案件状态已变更: {{getCaseStatusCN(item.targetStatus)}}</li>
              <li>执行案号:{{item.courtCaseNo}}</li>
              <li>备注说明: {{item.operationDetail}}</li>
              <li>关于案号{{$route.query.arbCaseNo}}回款已确认。</li>
              <li>被申请人: {{item.repaymentName}}</li>
              <li>还款金额: {{item.repaymentAmt}}</li>
              <li>还款方式: {{item.repaymentMethod}}</li>
              <li>结清状况: {{item.progressReason}}</li>
            </template>

            <!--案件回款已确认但未还清  财务复核确认-->
            <template v-if="item.editState === 11">
              <li>案件原状态:{{getCaseStatusCN(item.previousStatus)}}</li>
              <li>案件状态已变更: {{getCaseStatusCN(item.targetStatus)}}</li>
              <li>执行案号: {{item.courtCaseNo}}</li>
              <li>备注说明: {{item.operationDetail}}</li>
              <li>关于案号{{$route.query.arbCaseNo}}回款已确认。</li>
              <li>被申请人: {{item.repaymentName}}</li>
              <li>还款金额: {{item.repaymentAmt}}</li>
              <li>还款方式: {{item.repaymentMethod}}</li>
              <li>结清状况: {{item.progressReason}}</li>
              <li>提醒说明: 请继续跟进。</li>
            </template>

            <!--/运营驳回 非还款请求-->
            <template v-if="item.editState === 12">
              <li>案件原状态:{{getCaseStatusCN(item.previousStatus)}}</li>
              <li>执行案号: {{item.courtCaseNo}}</li>
              <li>渠道请求案态变更为: {{getCaseStatusCN(item.targetStatus)}}</li>
              <li>该请求: 已拒绝</li>
              <li>拒绝说明: {{item.operationDetail}}</li>
            </template>

            <!--/运营驳回 还款请求-->
            <template v-if="item.editState === 13">
              <li>案件原状态:{{getCaseStatusCN(item.previousStatus)}}</li>
              <li>执行案号: {{item.courtCaseNo}}</li>
              <li>渠道请求案态变更为: {{getCaseStatusCN(item.targetStatus)}}</li>
              <li>该请求: 已拒绝</li>
              <li>拒绝说明: {{item.operationDetail}}</li>
              <li>关于案号{{$route.query.arbCaseNo}}回款已拒绝。</li>
              <li>被申请人: {{item.repaymentName}}</li>
              <li>还款金额: {{item.repaymentAmt}}</li>
              <li>还款方式: {{item.repaymentMethod}}</li>
              <li>结清状况: {{item.progressReason}}</li>
              <li>拒绝原因: {{item.operationDetail}}</li>
            </template>

            <!--财务驳回 还款请求-->
            <template v-if="item.editState === 14">
              <li>案件原状态:{{getCaseStatusCN(item.previousStatus)}}</li>
              <li>执行案号: {{item.courtCaseNo}}</li>
              <li>渠道请求案态变更为: {{getCaseStatusCN(item.targetStatus)}}</li>
              <li>该请求: 已驳回</li>
              <li>驳回说明: {{item.operationDetail}}</li>
              <li>关于案号{{$route.query.arbCaseNo}}回款已驳回。</li>
              <li>被申请人: {{item.repaymentName}}</li>
              <li>还款金额: {{item.repaymentAmt}}</li>
              <li>还款方式: {{item.repaymentMethod}}</li>
              <li>结清状况: {{item.progressReason}}</li>
              <li>驳回原因: {{item.operationDetail}}</li>
            </template>

            
          </ul>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<script>
  import Step from 'vant/lib/step'
  import Steps from 'vant/lib/steps'
  import 'vant/lib/step/style'
  import 'vant/lib/steps/style'

  import { Previewer } from 'vux'
  export default {
    components: {
      'van-step' : Step,
      'van-steps' : Steps,
      Previewer,
    },
    data() {
      return {
        arbCaseNo : this.$route.query.arbCaseNo,
        repaymentAll : this.$route.query.repaymentAll,
        caseStatus : this.$route.query.caseStatus,
        dataList : [
          {
            attachFileList : ['https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg','http://5b0988e595225.cdn.sohucs.com/images/20180617/798b70cbb8364abf8a5699ed22043238.jpeg'],
            editState : 1,
            createTime : '2012-11-11',
          },
          {
            attachFileList : ['http://img06.tooopen.com/images/20160722/tooopen_sy_171298721947.jpg','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOATA8mjLxD0MqvjhfgeAqVbnsOodlHgTP0OaNEzMFsBGBVxZT'],
            editState : 1,
          }
        ],
      }
    },
    mounted() {
      this.$http({
        method : 'post',
        url : '/web/case/operationList.htm',
        data : {
          caseInfoId : this.$route.query.caseInfoId,
        },
      }).then((res) => {
        res = res.data;
        if(res.result.length > 0) {
          res.result.map((v) => {
            v.attachFileList = v.list;
            this.setEditState(v);
          });
        }
        this.dataList = res.result;
      });
    },
    methods : {
      //设置记录的类型
      setEditState(obj){
          // operationType	操作类型	number	1 客户操作 2 运营操作
          if(obj.operationType === 1){
              if(obj.targetStatus === 0){ //请求已立案
                  obj.editState = 1;
              }
              else if(obj.targetStatus === 1){ //请求未立案
                  obj.editState = 2;
              }else if(obj.targetStatus === 2){ //已结案
                  if(obj.progressReason === '代理商法催回款'){
                      obj.editState =3;
                  }else if(obj.progressReason === '自主回款'){
                      obj.editState = 4;
                  }else if(obj.progressReason === '终止本次执行（临）'){
                      obj.editState = 5;
                  }else if(obj.progressReason === '撤回立案（临）'){
                      obj.editState = 6;
                  }
              }
          }else if(obj.operationType === 2){
              // caseOperationStatus		number	1 还款请求 2 未还款请求
              // confirmedStatus		number	案件状态是否确认 1 运营驳回 2 运营确认 3财务驳回 4财务确认

                if(obj.caseOperationStatus === 2){
                  if(obj.confirmedStatus === 2){
                      obj.editState = 7;
                  }
                  else if(obj.confirmedStatus === 1){
                      obj.editState = 12; //运营驳回 非还款请求
                  }
              }else if(obj.caseOperationStatus === 1){
                    if(obj.confirmedStatus === 1){
                        obj.editState = 13; //运营驳回 还款请求
                    }
                  else if(obj.confirmedStatus === 3){
                        obj.editState = 14; //财务驳回 还款请求
                    }
                    else if(obj.progressReason === '款项已结清'){
                      if(obj.confirmedStatus === 2){
                          obj.editState = 8;
                      }else if(obj.confirmedStatus === 4){
                          obj.editState = 9;
                      }
                  }else if(obj.progressReason === '款项未结清'){
                      if(obj.confirmedStatus === 2){
                          obj.editState = 10;
                      }else if(obj.confirmedStatus === 4){
                          obj.editState = 11;
                      }
                  }
              }
          }
      },
      getCaseStatusCN(status){
        // <!--0 已立案 1 未立案 2 已结案 3待签收 4已签收-->
        if(status === 0){
          return '已立案';
        }else if(status === 1){
          return '未立案';
        }else if(status === 2){
          return '已结案';
        }else if(status === 3){
          return '待签收';
        }else{
          return '已签收';
        }
      },
      imageFormat(arr) {
        return arr.map((v) => {
          return {src : v.pngUrl}
        });
      },
      // 点击图片
      handleShowImg(index,index2) {
        this.$refs['previewer' + index][0].show(index2);
      },
    },
  }
</script>

<style lang="scss" scoped>
@import "@/assets/style/scss/helper/_mixin.scss";
.progress-view{
  .color-yellow{
    color: rgb(240, 179, 0);
  }
  .color-red{
    color: rgb(204, 0, 0);
  }
  .color-green{
    color: #3CA028;
  }
  .color-gray{
    color: #717171;
  }
  .page-title{
    min-height : rem(76);
    line-height: rem(76);
    font-size: rem(24);
    padding-left: rem(29);
    border-bottom: 1px solid #eaeaea;
    overflow: hidden;
    .fl{
      width: 70vw;
    }
    .fr{
      margin-right: rem(42);
    }
  }
  li{
    list-style: none;
    margin-bottom: rem(10);
    img{
      width: rem(102);
      margin-right: rem(10);
      vertical-align: middle;
    }
  }
}

</style>