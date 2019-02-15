
<template>
  <div :class="c()">
    <transition :name="maskTransition">
      <div
        v-show="show"
        :class="[c('__mask'), ...maskClass]"
        :style="maskStyle"
        @click="maskClick"
      />
    </transition>

    <transition :name="popupTransition">
      <div
        v-show="show"
        ref="popup"
        :class="[c('__popup'), c(`__popup--${popupPosition}`), ...popupClass]"
        :style="popupStyle"
        class="hahah123213123"
      >
        <slot/>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import mixin from "./mixins";
// @touchmove.prevent="preventDefault"
export default {
  name: "SlimPopup",
  components: {},
  mixins: [mixin],
  data(){
    return {
      preHandler:function(e){
        e.preventDefault();
      },
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.$emit("open", val);
        document.body.addEventListener(
        "touchmove",
        this.preHandler,
        { passive: false }
      ); //passive 参数不能省略，用来兼容ios和android
      } else {
        this.$emit("close", val);
         console.log('show:hide')
         document.body.removeEventListener(
        "touchmove",
        this.preHandler,
        { passive: true }
      ); //passive 参数不能省略，用来兼容ios和android
      }
    }
  },
  props: {
    show: {
      // .sync 是否显示
      type: Boolean,
      default: false
    },
    hideOnMaskClick: {
      // 点击遮罩是否关闭弹窗
      type: Boolean,
      default: false
    },
    maskTransition: {
      // 遮罩动画
      type: String,
      default: "slim-fade"
    },
    popupTransition: {
      // 弹窗动画，内置 'slim-scale', 'slim-zoom', 'slim-radius', 'slim-fade-in-bottom', 'slim-slide-in-bottom'
      type: String,
      default: "slim-scale"
    },
    maskClass: {
      // 遮罩的样式类
      type: Array,
      default: null
    },
    popupClass: {
      // 弹窗的样式类
      type: Array,
      default: null
    },
    maskStyle: {
      // 遮罩的样式
      type: Object,
      default: null
    },
    popupStyle: {
      // 弹窗的样式
      type: Object,
      default: null
    },
    popupPosition: {
      // 弹窗的位置，可选 'center', 'top', 'bottom'
      type: String,
      default: "center"
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    touchfix() {},
    // 初始化
    init() {
      console.log('init************');

    },

    // 隐藏
    hide() {
      this.$emit("update:show", false);


    },

    // 遮罩点击 handle
    maskClick() {
      this.hideOnMaskClick && this.hide();
    },

    // 阻止默认事件
    preventDefault(e) {
      console.log(e);
      //  e.preventDefault();
    }
  }
};
</script>

<style lang="stylus">

@import './stylus/index.stylus'
$ = vue-slim-popup
.{$}
  &__mask
    position fixed
    z-index 999
    top 0
    bottom 0
    left 0
    right 0
    background rgba(0, 0, 0, 0.6)
    touch-action none
    backdrop-filter blur(5px)
  &__popup
    position fixed
    z-index 1000
    margin auto
    left 0
    right 0
    &--center
      top 0
      bottom 0
    &--top
      top 0
    &--bottom
      bottom 0
</style>
