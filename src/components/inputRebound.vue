<template>
  <div class="input-rebound">

  </div>
</template>

<script>
  /*

    处理 输入时底部操作栏或者按钮依然固定在底部问题
     - el 固定的容器class
     - elParent 自适应固定元素的容器
  */

  export default {
    props : {
      // 元素的 id或者类名
      'el' : {
        type : Array,
        required : true,
      },
      'elParent' : {
        type : String,
        required : true,
      },
    },
    data() {
      return {
        // 获取页面原始高度
        clientHeight : '',
        disabled : false,
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        window.addEventListener('resize',this.fn)
        // this.$isAndroid() ? window.addEventListener('resize',this.fn) : void 0;
      });
    },
    methods : {
      fn() {
        let btns = this.el.map(e => document.querySelector(e));
        let parent = document.querySelector(this.elParent);
        let nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //键盘弹出的事件处理
        if (this.clientHeight > nowClientHeight) {
          console.log('弹出');
          // 固定按钮 position 修改
          btns.map(e => {
            e.style.position = 'static';
          });
          // 容器 height自适应
          parent.style.height = 'auto';
        //键盘收起的事件处理
        }else {
          console.log('收起');
          btns.map(e => {
            e.style.position = '';
          });
          parent.style.height = '';
        }
      },
    },
    beforeDestroy() {
      window.removeEventListener('resize',this.fn);
    },
  }
</script>

<style lang="scss" scoped>

.input-rebound{

}

</style>
