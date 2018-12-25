<template>
  <div class="page">
    <div class="head_portrait">
      <div class="head_logo"></div>
      <!-- <div class="more_link"></div> -->
    </div>

    <Group :gutter="0">
      <Cell class="cell_line" :border-intent="false">
        <div slot="title">姓名：</div>
        <div class="text">{{userName}}</div>
      </Cell>
      <Cell class="cell_line" :border-intent="false">
        <div slot="title">手机：</div>
        <div class="text">{{userPhone}}</div>
      </Cell>
      <Cell class="cell_line" :border-intent="false">
        <div slot="title">角色类型：</div>
        <div class="text">
          <template v-if="type == 0">员工</template>
          <template v-if="type == 1">公司负责人</template>
        </div>
      </Cell>
      <Cell class="cell_line" :border-intent="false">
        <div slot="title">绑定微信：</div>
        <div class="text">已绑定</div>
      </Cell>
      <Cell class="cell_line" :border-intent="false">
        <div slot="title">所在渠道：</div>
        <div class="text">{{agencyName}}</div>
      </Cell>
    </Group>

    <Group :gutter="0" class="ctrl_boot">
      <Cell class="cell_line" :border-intent="false" @click.native="setpwd">
        <div slot="title" >
          <div class="pic_box">
            <span class="ico_wheelgear"></span>
            <span>修改密码</span>
          </div>
        </div>
      </Cell>
    </Group>


    <div class="button_ctrl">
      <v-touch tag="a" v-on:tap="exitFoo" class="exit_btn"><span>退出登录</span></v-touch>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Flexbox, FlexboxItem, Group, Cell } from "vux";
import qs from 'qs';
export default {
  components: {
    Flexbox,
    FlexboxItem,
    Group,
    Cell
  },
  data() {
    return {
      userName:'',
      userPhone:'',
      type:'',
      agencyName:'',
    };
  },
  methods: {
    getParams(){
      let _users =  qs.parse(localStorage.getItem('$userInfo'));
      console.log('_users:',_users);
      this.userName = _users.userName;
      this.userPhone = _users.userPhone;
      this.type = _users.type;
      this.agencyName = _users.agencyName;
    },
    setpwd(){
      // 修改旧密码
      this.$router.replace({
        name:'resetInfo'
      })

    },
    exitFoo(){
      // 退出登录
      localStorage.removeItem('$userInfo')
      this.$router.replace({
        name:'login'
      })
    }
  },
  created() {
    document.title = "我的";
    this.getParams();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/scss/helper/_mixin.scss";
/* 公共-边距padding */
%cm_padding {
  padding-left: rem(30);
  padding-right: rem(30);
}

.head_portrait {
  height: rem(252);
  position: relative;
  .head_logo {
    width: rem(148);
    height: rem(148);
    background-image: url("~@/assets/img/picture.png");
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 100%;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
  .more_link {
    width: rem(17);
    height: rem(32);
    background-image: url("~@/assets/img/rightA.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    margin: auto;
    right: rem(30);
    top: 0;
    bottom: 0;
  }
}

.cell_line {
  font-size: rem(28);
  .text {
    font-size: rem(24);
    color: #666666;
  }
}

.ctrl_boot{
  margin-top: rem(9);
}
.pic_box {
  span {
    display: inline-block;
    vertical-align: middle;
  }
}
.ico_wheelgear {
  width: rem(52);
  height: rem(52);
  position: relative;
  border-radius: 3px;
  background-color: #003888;

  &:after {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    content: "";
    display: inline-block;
    background-image: url("~@/assets/img/zlun.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-color: #003888;
    background-position: 0 0;
    width: rem(33);
    height: rem(33);
  }
}
.button_ctrl{
  $yel: #F0B300;
  padding-top: rem(66);
  .exit_btn{
    display: block;
    width: rem(498);
    text-align: center;
    padding-top: rem(27);
    padding-bottom: rem(21);
    font-size:rem(30);
    color:$yel;
    border:1px solid $yel;
    border-radius: 3px;
    background-color: #fff;
    margin:0 auto;
    &:before{
      content:'';
      display: inline-block;
      vertical-align:middle;
      background-image: url('~@/assets/img/close.png');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: 0 0;
      width: rem(32);
      height: rem(34);
      margin-right: rem(13);
    }
    span{
      display: inline-block;
      vertical-align:middle;
    }
  }
}
</style>
