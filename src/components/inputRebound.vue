<template>
  <div class="input-rebound">

  </div>
</template>

<script>
  /* 
  
    处理安卓下 输入时 底部操作栏依然固定在底部问题
     - cont 容器
     - fixed 容器

    cont基本样式： 
      height: calc(100vh - 1.33333rem); 减去的为 fixed容器的height
      overflow: auto;
    fixed 为自然排列
  */

 //检测-android终端
  const isAndroid = () => {
    return navigator.userAgent.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  }
  export default {
    props : {
      // 元素的 id或者类名
      'el' : {
        type : String,
        required : true,
      },
      // fix 元素的 height
      fix : {
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
        isAndroid() && window.addEventListener('resize',this.fn);
      });
    },
    methods : {
      fn() {
        let cont = document.querySelector(this.el);
        let nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //键盘弹出的事件处理
        if (this.clientHeight > nowClientHeight) {
          console.log('弹出');
          cont.style.height = 'auto';
        //键盘收起的事件处理
        }else {
          console.log('收起');
          cont.style.height = `calc(100vh - ${this.fix})`;
        }
      },
    },
    beforeDestroy() {
      isAndroid() && window.removeEventListener('resize',this.fn);
    },
  }
</script>

<style lang="scss" scoped>

.input-rebound{

}

</style>