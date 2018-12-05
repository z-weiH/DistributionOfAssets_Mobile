<template>
  <div class="upload-box">
    
    <input @change="handleUpload" ref="file" type="file" class="file" accept="image/*" />
    <flexbox :gutter="0">
      <flexbox-item :span="1/5" v-for="(item,index) in imgList" :key="index">
        <div :style="{'background-image' : `url(${item.url})`}" class="m-img">
          <span @click="handleDeleteImg(index)" class="icon-close">x</span>
        </div>
      </flexbox-item>
      <flexbox-item :span="1/5" v-if="imgList.length <= max - 1">
        <img @click="handleClick" src="~@/assets/img/uploadimg.png" class="upload-img" />
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import {Flexbox, FlexboxItem} from 'vux'
  export default {
    components : {
      Flexbox,
      FlexboxItem,
    },
    props : {
      // 上传最大数量
      max : {
        type : Number,
        default : 5,
      },
      // 校验的文件 后缀
      accept : {
        type : Array,
        default : () => ['jpg','jpeg','png','gif'],
      },
      // 限制文件上传大小 M
      size : {
        type : Number,
        default : 5,
      },
      // 用于回显的 value
      value : {
        type : Array,
        default : () => [],
      },
    },
    watch : {
      value(val) {
        this.imgList = val;
      },
      imgList(val) {
        this.$emit('input',val);
      },
    },
    data() {
      return {
        imgList : [{url : 'https://image-static.segmentfault.com/260/413/2604130476-594b8f86e100f_articlex'}],
      }
    },
    mounted() {
      this.imgList = this.value;
    },
    methods : {
      handleClick() {
        this.$refs.file.click();
      },
      // 文件上传逻辑
      handleUpload(event) {
        let file = event.target.files[0];
        event.target.value = '';
        let fileName = file.name.split('.').pop();
        let fileSize = file.size;
        if(this.accept.indexOf(fileName) === -1) {
          return this.$vux.toast.show({
            text : `文件格式有误 仅支持${this.accept.join(',')}`,
            time : 3000,
          });
        };
        console.log(fileSize,this.size);
        if(fileSize > (this.size * 1024 * 1024) ) {
          return this.$vux.toast.show({
            text : `文件大小不能超过${this.size}M`,
            time : 3000,
          });
        }

        let formData = new FormData();
        formData.append("file",file);

        this.$http({
          method : 'post',
          url : '/file/upload.htm',
          data : formData,
          mheaders : true,
        }).then(() => {
          this.imgList.push({
            url : 'https://image-static.segmentfault.com/260/413/2604130476-594b8f86e100f_articlex' + +new Date(),
          });
        });
      },
      // 删除图片
      handleDeleteImg(index) {
        this.imgList.splice(index,1);
      },
    },
  }
</script>

<style lang="scss" scoped>
@import "@/assets/style/scss/helper/_mixin.scss";
.upload-box{
  .m-img{
    width: rem(100);
    height: rem(100);
    border-radius: 5px;
    position: relative;
    display: inline-block;
  }
  .icon-close{
    width: 16px;
    height: 16px;
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #f74c31;
    border-radius: 50%;
    line-height: 15px;
    text-align: center;
    color: #fff;
    display: inline-block;
    font-size:12px;
    cursor: pointer;
  }
  .upload-img{
    width: rem(100);
    height: rem(100);
    cursor: pointer;
  }
  .file{
    font-size: 0;
    display: none;
  }
}

</style>