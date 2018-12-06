<template>
  <div>
    <div v-transfer-dom>
      <x-dialog v-model="rejectFlag" class="dialog-demo">
        <div style="padding:15px;">
          <p class="dialog-text">
            <template v-if="actionCode === 51">
              将对{{caseItem.caseNo}}申请人{{caseItem.applicants}}和被申请人{{caseItem.respondents}}{{caseItem.caseCause}}的仲裁员选择进行驳回。确定要驳回{{caseItem.arberName}}作为此案的仲裁员么？
            </template>
            <template v-if="actionCode === 52">
              将对{{caseItem.caseNo}}申请人{{caseItem.applicants}}和被申请人{{caseItem.respondents}}{{caseItem.caseCause}}的裁决书进行驳回。确定要驳回{{caseItem.arberName}}的裁决书么？
            </template>
          </p>
          <!--<x-button @click.native="doShowToast" type="primary">show toast</x-button>-->
          <x-textarea @on-change="approvedReasonChange" v-model="approvedReason" style="border: 1px solid #aaa;padding: 0;" :max="200" placeholder="请输入理由" :show-counter="false"  :rows="3" :cols="30"></x-textarea>
          <p class="warning-text" v-if="showWarningText" >必须输入驳回理由</p>
          <div class="dialog-btns">
            <span class="btn" @click="rejectFlagHandle">确定</span>
            <span class="btn" @click="rejectFlagCancel">取消</span>
          </div>
        </div>

        <div @click="showToast=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
      <!--<alert v-model="show1">将对2017衢仲网裁字8号申请人杭州钱呗网络科技悠闲公司和被申请人冰河借款合同纠纷的仲裁员选择进行驳回。确定要驳回程青林作为此案的仲裁员么？</alert>-->
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="passFlag">
        <div style="padding:15px;">
          <p class="dialog-text">
            {{caseItem.caseNo}}<span style="color: #399E2B;">已通过</span>，您可进入本委案件进行查看
          </p>
          <div class="dialog-btns">
            <span class="btn" @click="passFlagHandle">确定</span>
          </div>
        </div>
      </x-dialog>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="allPassFlag">
        <div style="padding:15px;">
          <p class="dialog-text">
            {{caseItem.count}}个案件的仲裁员审核<span style="color: #399E2B;">已通过</span>，您可进入本委案件进行查看
          </p>
          <div class="dialog-btns">
            <span class="btn" @click="allPassFlag = false">确定</span>
          </div>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="confirmRejectFlag">
        <div style="padding:15px;">
          <p class="dialog-text">
            <template v-if="actionCode === 51">
              {{caseItem.caseNo}}仲裁员<span style="color: #E54444;">已驳回</span>，您可进入本委案件进行查看
            </template>
            <template v-if="actionCode === 52">
              {{caseItem.caseNo}}裁决书<span style="color: #E54444;">已驳回</span>，您可进入本委案件进行查看
            </template>
          </p>
          <div class="dialog-btns">
            <span class="btn" @click="confirmRejectFlagHandle">确定</span>
          </div>
        </div>
      </x-dialog>
    </div>


  </div>
</template>

<script>
import { XDialog, XTextarea, TransferDom } from 'vux'
export default {
	name: 'dialogs',
	data() {
		return {
			openId: '',
			rejectFlag: false, //驳回
			confirmRejectFlag: false, //驳回确认
			passFlag: false, //通过
			allPassFlag: false, // 全部通过
			resolve: null,
			caseItem: {}, //案件對象,
			showWarningText: false, //显示错误提示
			approvedReason: '',
			actionCode: 0,
		}
	},
	directives: {
		TransferDom,
	},
	components: {
		XDialog,
		XTextarea,
	},
	methods: {
		approvedReasonChange() {
			if (this.showWarningText && this.approvedReason) {
				this.showWarningText = false
			}
		},

		showDialog(options) {
			this.caseItem = options.item
			this.actionCode = options.actionCode
			if (options.type === 0) {
				this.$http
					.post('/mobile/case/approved.htm', {
						actionCode: options.actionCode,
						approvedCode: 1,
						caseId: options.item.caseId,
						openId: this.openId,
					})
					.then(res => {
						this.passFlag = true
					})
			} else if (options.type === 1) {
				this.allPassFlag = true
			} else if (options.type === 2) {
				this.rejectFlag = true
			}
			return new Promise(resolve => {
				this.resolve = resolve
			})
		},
		passFlagHandle() {
			console.log('确定按钮点击')
			this.passFlag = false;
      console.log(this.caseItem);
			this.resolve(this.caseItem.caseId)
		},
		rejectFlagHandle() {
			if (!this.approvedReason) {
				this.showWarningText = true
				return
			}
			this.$http
				.post('/mobile/case/approved.htm', {
					actionCode: this.actionCode,
					approvedCode: 2,
					approvedReason: this.approvedReason,
					caseId: this.caseItem.caseId,
					openId: this.openId,
				})
				.then(res => {
					this.rejectFlag = false
					this.confirmRejectFlag = true
				})
		},
		rejectFlagCancel() {
			this.rejectFlag = false
			this.resolve(false)
		},
		confirmRejectFlagHandle() {
			this.confirmRejectFlag = false
			this.resolve(this.caseItem.caseId)
		},
	},
	created() {
		this.openId = localStorage.getItem('currentOpenId')
	},
}
</script>

<style scoped lang="scss">
@import '@/assets/style/scss/helper/_mixin.scss';
.dialog-text {
	margin-bottom: rem(40);
}
.dialog-btns {
	margin-top: rem(38);
	margin-bottom: rem(28);
	.btn {
		background: #999;
		padding: rem(18) rem(48);
		font-size: rem(28);
		color: #fff;
		border-radius: rem(12);
		&:first-child {
			background: #f0b300;
			margin-right: rem(40);
		}
	}
}
.warning-text {
	color: red;
	line-height: rem(40);
	height: rem(40);
	font-size: rem(20);
}
</style>
