<template>
  <div class="m-tabbar">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import mTabbarItem from './tabbar-item'
export default {
  props: ['value'],
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/scss/helper/_mixin.scss";
.m-tabbar {
  position: absolute;
  z-index: 500;
  bottom: 0;
  width: 100%;
  background-color: #f7f7fa;
  display: flex;
  // flex-direction: row;
  // position: fixed;
  // bottom: 0;
  // left: 0;
  // right: 0;
  width: 100%;
  overflow: hidden;
  // height: 50px;
  height: rem(98);
  // line-height: rem(98);
  // background: #fff;
  border-top: 1px solid #e4e4e4;
}
</style>
