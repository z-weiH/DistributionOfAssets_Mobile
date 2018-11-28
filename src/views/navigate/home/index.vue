<template>
 <div class="page">
   <scroller  :probeType="1" :data="{}" :pulldown="true"   @pulldown="getLoginMsg" >
   <Group :gutter="0" >
     <div class="top padding-30">
       <div class="icon">
          <i>
            <img src="../../../assets/img/home_icon_01.png" alt="">
          </i>
         通知
       </div>
       <div class="title">
         <div class="animation_title">
           <template v-if="item.caseCount != 0">
             <span class="welcome">有{{item.caseCount}}个案件等待您的处理，辛苦您啦!</span>
           </template>
           <template v-else>
             <span class="welcome">暂时没有案件等待处理，放松一会儿吧！</span>
           </template>
         </div>
       </div>
     </div>
   </Group>
   <Group :gutter="15">
     <Flexbox class="dclaj padding-30">
       <flexbox-item>
         待处理案件<span>({{item.caseCount}})</span>
       </flexbox-item>
     </Flexbox>
     <Flexbox class="padding-30">
       <flexbox-item :span="6">
         <div class="cellBox zcy_cell flex_center" @click="zcyReviewFoo">
           <div class="ico_panel ico_zcy ">
             <img class="ml5" src="../../../assets/img/homeIcon_01.png" alt="">
             <badge v-if="item.arbitratorCaseCount" class="icon" :text="item.arbitratorCaseCount"></badge>
           </div>
           <div>仲裁员审核</div>
         </div>
       </flexbox-item>
       <flexbox-item :span="6">
         <div class="cellBox cjs_cell flex_center" @click="cjsReviewFoo">
           <div class="ico_panel ico_cjs">
             <img class="ml10" src="../../../assets/img/homeIcon_02.png" alt="">
             <badge v-if="item.adjudicationCaseCount" class="icon" :text="item.adjudicationCaseCount"></badge>
           </div>
           <div>裁决书审核</div>
         </div>
       </flexbox-item>
     </Flexbox>
   </Group>
   <Group :gutter="15">
     <Flexbox class="dclaj padding-30">
       <flexbox-item>
         系统功能
       </flexbox-item>
     </Flexbox>
     <Flexbox class="padding-30">
       <flexbox-item :span="6">
         <div class="cellBox zcy_cell flex_center" @click="mineCaseFoo">
           <div class="ico_panel ico_wdaj">
             <img src="../../../assets/img/homeIcon_03.png" alt="">
           </div>
           <div>本委案件</div>
         </div>
       </flexbox-item>
       <flexbox-item :span="6">
         <div class="cellBox cjs_cell flex_center" @click="tjReviewFoo">
           <div class="ico_panel ico_tjbb">
             <img src="../../../assets/img/homeIcon_04.png" alt="">
             <span class="comimgsoon">敬请期待</span>
           </div>
           <div>统计报表</div>
         </div>
       </flexbox-item>
     </Flexbox>
     <Flexbox class="padding-30">
       <flexbox-item :span="6">
         <div class="cellBox zcy_cell flex_center" @click="personalCenterFoo">
           <div class="ico_panel ico_grzx">
             <img src="../../../assets/img/homeIcon_05.png" alt="">
           </div>
           <div>个人中心</div>
         </div>
       </flexbox-item>
     </Flexbox>
   </Group>
   </scroller>
 </div>
</template>

<script type="text/ecmascript-6">
import qs from 'qs'
import { Flexbox, FlexboxItem, Group, Cell, Badge } from 'vux'
export default {
	data() {
		return {
			openId: '',
			arbName: '',
			info: null,
			item: {
				adjudicationCaseCount: 0,
				arbitratorCaseCount: 0,
				caseCount: 0,
			},
		}
	},
	methods: {
		tjReviewFoo() {
			this.$vux.toast.text('敬请期待')
		},
		zcyReviewFoo() {
			if (this.item.arbitratorCaseCount > 0) {
				this.$router.push('/arbitratorReviewList')
			}
			// 仲裁员审核
		},
		cjsReviewFoo() {
			// 裁决书审核
			if (this.item.adjudicationCaseCount > 0) {
				this.$router.push('/awardReviewList')
			}
		},
		mineCaseFoo() {
			// 本委案件
			this.$router.push('/caseSummary')
		},
		personalCenterFoo() {
			// 个人中心
			this.$router.push('/mineCenter')
		},
		getLoginMsg() {
			this.$api.post('/mobile/case/statistics.htm', { openId: this.openId }).then(res => {
				this.item = res.data.result
			})
		},
	},
	components: {
		Flexbox,
		FlexboxItem,
		Group,
		Cell,
		Badge,
	},
	created() {
		this.arbName = qs.parse(localStorage.getItem('$arbname'))['shortName']
		this.openId = localStorage.getItem('currentOpenId')
		this.info = qs.parse(localStorage.getItem('$userInfo'))
		document.title = `${this.arbName}移动欢迎您，${this.info.userName}${this.info.roleName}`
		this.getLoginMsg()
	},
}
</script>

<style lang="scss" scoped >
@import '@/assets/style/scss/helper/_mixin.scss';
.top {
	display: flex;
	height: rem(80);
	line-height: rem(80);
	.icon {
		align-items: center;
		display: flex;
		i {
			display: inline-block;
			width: rem(54);
			height: rem(54);
			background: #fead25;
			align-items: center;
			justify-content: center;
			display: flex;
			margin-right: rem(20);
			/*margin-top: rem(13);*/
			/*vertical-align: top;*/
			border-radius: rem(8);
			text-align: center;
			img {
				width: 80%;
			}
		}
		font-size: rem(30);
		width: rem(280);
	}
	.title {
		overflow: hidden;
		flex: 1;
		color: #a0a0a0;
		.welcome {
			font-size: rem(24);
		}
	}
}
.padding-30 {
	padding-left: rem(30);
	padding-right: rem(30);
	border-bottom: 1px solid #eee;
	.cellBox {
		height: rem(189);
		/*border-bottom: 1px solid #eee;*/
		&:nth-child(odd) {
			border-right: 1px solid #eee;
		}
		> div {
			display: table-cell;
			vertical-align: middle;

			&:last-child {
				font-size: rem(30);
				padding-left: 12px;
				color: #666;
			}
		}
	}
}
.dclaj {
	height: rem(100);
}

.ml5 {
	margin-left: rem(-5);
}
.ml10 {
	margin-left: rem(10);
}

.ico_panel {
	width: rem(100);
	height: rem(100);
	border-radius: 6px;
	align-items: center;
	display: flex !important;
	justify-content: center;
	position: relative;

	img {
		width: rem(64);
	}

	.icon {
		position: absolute;
		top: 0;
		right: 0;
		-webkit-transform: translate(50%, -50%);
		-moz-transform: translate(50%, -50%);
		transform: translate(50%, -50%);
	}
}
.ico_zcy {
	background-color: #00c7ad;
}
.ico_cjs {
	background-color: #ffc000;
}
.ico_wdaj {
	background: #2a9dfe;
}
.ico_tjbb {
	background-color: #823634;
}
.ico_grzx {
	background-color: #fd8920;
}
.comimgsoon {
	font-size: rem(20);
	display: inline-block;
	line-height: rem(35);
	width: rem(70);
	letter-spacing: rem(5);
	height: rem(70);
	/*margin-left: rem(8);*/
	text-align: center;
	color: #fff;
	position: absolute;
}
.animation_title {
	animation: 10s move linear 0s infinite normal;
}
@keyframes move {
	0% {
		transform: translateX(100%);
	}
	50% {
		transform: translateX(0);
	}

	100% {
		transform: translateX(-100%);
	}
}
</style>
