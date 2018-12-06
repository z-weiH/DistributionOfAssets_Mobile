<template>
    <div class="searchBox">
      <div class="hot_wrapper">
        <div class="title">热搜</div>
        <div class="hot_cont">
          <v-touch v-on:tap="onSelectorTab" v-for="(v,k) in hotkeyWords"  :key="k" tag="label" class="hot_tabtext">{{v}}</v-touch>
        </div>
      </div>
      <div class="history_wrapper">
        <div class="title">历史搜索</div>
        <Group :gutter="0" class="history_cont">
          <v-touch tag="div" class="cellItem"  v-for="(v,k) in keyItems" :key="k" v-on:tap="onSelectorTab">{{v}}</v-touch>
        </Group>
      </div>
      <div class="search_ctrl">
        <v-touch tag="div" v-on:tap="clearhistoryFoo" class="delete_history_btn">清空历史搜索</v-touch>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { Cell, Group } from 'vux'
export default {
	props: {
		param: {
			type: String,
		},
		onSelectorTab: {
			type: Function,
			required: true,
			default: () => {},
		},
	},
	watch: {
		param: {
			handler(newValue, oldValue) {
				//父组件param对象改变会触发此函数
				console.log('newValue: ', newValue)
				console.log('oldValue: ', oldValue)
				console.log('this.htArr---------', this.htArr)
				console.log('this.htArr---------', this.htArr.includes(newValue))
				if (newValue != oldValue) {
					console.log('不等')
					if (this.htArr.length <= 4) {
						console.log('htArr----', this.htArr.length)
						this.htArr.unshift(newValue)
						console.log('去重----', this.$arrUnique(this.htArr))
						this.htArr = this.$arrUnique(this.htArr)
						localStorage.setItem('$historyResult', this.htArr.join(','))
					} else {
						console.log('新值已经在数组中存在', this.htArr.indexOf(newValue) != -1)
						if (this.htArr.indexOf(newValue) != -1) {
							console.log(this.htArr.indexOf(newValue))
							console.log(this.htArr[0])
							let $end = this.htArr.indexOf(newValue) + 1,
								$start = 1
							let changeArr = this.$changeArrPos({
								arr: this.htArr,
								start: $start,
								end: $end,
							})
							console.log('changeArr   --- ', changeArr)
						} else {
							this.htArr.pop()
							this.htArr.unshift(newValue)
						}

						console.log('htarr-大于5', this.htArr.length)
						localStorage.setItem('$historyResult', this.htArr.join(','))
						this.keyItems = this.htArr

						// if (this.$arrUnique(this.htArr)) {
						// 	console.log('htarr-大于5 -去重boolean', true)
						// 	console.log('htarr-大于5 -去重boolean-成功', this.$arrUnique(this.htArr))
						// 	// this.htArr = this.$arrUnique(this.htArr)
						// } else {
						// 	console.log('htarr-大于5 -去重boolean', false)
						// 	console.log('htarr-大于5 -去重boolean-失败', this.$arrUnique(this.htArr))
						// }
					}

					let get_historyResult = localStorage.getItem('$historyResult')
					let get_historyResult_arr = get_historyResult.split(',')
					console.log('get_historyResult----', get_historyResult_arr)

					if (get_historyResult_arr.length < 6) {
						this.keyItems = get_historyResult_arr
					} else {
						console.log('大于5')
					}
				}
			},
			deep: true,
		},
	},
	data() {
		return {
			hotkeyWords: ['1147', '1146', '1145', '1143', '1142', '1140'], //热搜 关键字
			htArr: [], //历史搜索 数组
			keyItems: [],
		}
	},
	created() {
		if (localStorage.getItem('$historyResult')) {
			let get_historyResult = localStorage.getItem('$historyResult'),
				get_historyResult_Arr = get_historyResult.split(',')
			console.log(get_historyResult_Arr)
			let initHtArr = this.htArr.concat(get_historyResult_Arr)
			console.log('initHtArr---', initHtArr)
			this.htArr = this.htArr.concat(get_historyResult_Arr)
			console.log('HtArr -------  ---', this.htArr)
			this.keyItems = get_historyResult_Arr
		}
	},
	mounted() {},
	methods: {
		clearhistoryFoo() {
			// 清空历史记录fun
			localStorage.removeItem('$historyResult')
			this.htArr = []
			this.keyItems = []
		},
	},
	components: {
		Cell,
		Group,
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/scss/helper/_mixin.scss';
//搜索界面 公共padding样式
%common_size {
	padding: 0 rem(30);
}

.searchBox {
	color: #666666;
	font-size: rem(24);
	height: 100vh;
	// background-color: #fff;
	.title {
		color: #000;
		font-weight: bold;
		font-size: rem(30);
		text-align: left;
	}
	.hot_wrapper {
		@extend %common_size;
		background-color: #fff;
		margin-bottom: rem(14);
		border-bottom: 1px solid #e4e4e4;
		.title {
			padding-top: rem(34);
			padding-bottom: rem(27);
		}
		.hot_cont {
			@include clearfix;
			padding-bottom: rem(15);
			> div {
				float: left;
			}
		}
		.hot_tabtext {
			display: inline-block;
			min-width: rem(90);
			width: auto;
			padding: rem(9) rem(12);
			border-radius: 5px;
			background-color: #eeeeee;
			font-size: rem(24);
			text-align: center;
			margin-right: rem(28);
			margin-bottom: rem(16);
			@include hover-bg(rgba(199, 199, 199, 0.699));
		}
	}
	.history_wrapper {
		border-top: 1px solid #e4e4e4;
		background-color: #fff;
		.title {
			@extend %common_size;
			padding-top: rem(12);
			padding-bottom: rem(16);
		}
		.history_cont {
			.vux-label {
				span {
					font-size: rem(26);
				}
			}
			text-align: left;
		}
	}
	.search_ctrl {
		padding-top: rem(73);
		// height: 100%;
		padding-bottom: rem(73);
		background-color: #fff;
		.delete_history_btn {
			color: #727272;
			border: 1px solid #dcdcdc;
			border-radius: 5px;
			width: rem(350);
			height: rem(64);
			line-height: rem(64);
			text-align: center;
			font-size: rem(24);
			margin: 0 auto;
			&:before {
				content: '';
				display: inline-block;
				background-image: url(~@/assets/img/con@2x004.png);
				width: rem(30);
				height: rem(30);
				background-repeat: no-repeat;
				background-size: contain;
				vertical-align: middle;
				margin-right: rem(15);
			}
			@include hover-def;
		}
	}
}
.cellItem {
	display: block;
	@extend %common_size;
	font-size: rem(26);
	padding-top: rem(19);
	padding-bottom: rem(20);
	border-top: 1px solid #eeeeee;
	@include hover-def;
	&:nth-child(1) {
		border-top: 0;
	}
}
</style>
