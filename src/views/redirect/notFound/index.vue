<template>
  <div class="page">
    <flexbox orient="vertical" class="part">
      <flexbox-item>
        <div class="flex-1">
          <img src="./../../../assets/img/picnotfound.gif" />
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-2">
          <router-link to='/'>
            <box gap="20px 10px">
              <x-button :gradients="['#1D62F0', '#19D5FD']">返回首页</x-button>
            </box>
          </router-link>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import Vue from 'vue'
import { Flexbox, FlexboxItem, XButton } from 'vux'
export default {
  methods:{

  },
	created() {
	},
	components: {
		Flexbox,
		FlexboxItem,
		XButton,
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/scss/helper/_mixin.scss';
html,
body {
	height: 100%;
}

.part {
	text-align: center;
}

.page {
	background-color: #fff;
	height: 100%;
	// padding: 0 60px;
}

img {
	display: block;
	width: 100%;
}

.flex-1 {
	padding-top: 100px;
}

// .flex-2 {
// 	button {
// 		// height: 28px;
// 		padding: 16px 80px;
// 		font-size: pxToem(16);
// 	}
// }

.page {
	height: 100%;
}
</style>
