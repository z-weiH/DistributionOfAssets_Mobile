<template>
  <a
    class="m-tabbar-item"
    :class="{'is-active':isActive}"
    @click="$parent.$emit('input',id),onItemClick(true)"
  >
    <div class="m-box">
      <div>
        <span class="m-tabbar-item-icon" v-show="!isActive">
          <slot name="icon-normal"></slot>
        </span>
        <span class="m-tabbar-item-icon" v-show="isActive">
          <slot name="icon-active"></slot>
        </span>
      </div>
      <div>
        <span class="m-tabbar-item-text">
          <slot></slot>
        </span>
      </div>
    </div>
  </a>
</template>

<script type="text/ecmascript-6">
import { go } from "@/tools/router";
export default {
  props: {
    id: {
      type: String,
      default: false
    },
    link: [String, Object],
  },
  computed: {
    isActive() {
      if (this.$parent.value === this.id) {
        return true;
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    onItemClick(hasLink) {
      if (hasLink === true) {
        go(this.link, this.$router);
      }
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/scss/helper/_mixin.scss";
.m-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  > div {
    display: table-cell;
    vertical-align: middle;
  }
}
.m-tabbar-item {
  flex: 1;
  text-align: center;
  .m-tabbar-item-icon {
    display: block;
    // padding-top: 2px;
    img {
      // width: 28px;
      // height: 28px;
      // height: rem(40);
      vertical-align: middle;
    }
  }
  .m-tabbar-item-text {
    display: block;
    font-size: rem(28);
    color: #949494;
  }
  &.is-active {
    .m-tabbar-item-text {
      color: #0d428e;
    }
  }
}
</style>
