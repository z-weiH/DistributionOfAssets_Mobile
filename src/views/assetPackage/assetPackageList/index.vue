<template>
  <div class="page">
    <view-box ref="viewBox">
      <div slot="header" class="tab_card">
        <Flexbox class="t_wrap" :gutter="0">
          <template v-for="(it,index) in tabList">
            <FlexboxItem>
              <v-touch
                tag="a"
                v-on:tap="tabSearch(it,index)"
                :class="{active: index === selected}"
              >{{it.name}}</v-touch>
            </FlexboxItem>
          </template>
        </Flexbox>
      </div>
      <scroller
        :probeType="1"
        :data="ListItem"
        :pulldown="true"
        :pullup="true"
        @scrollToEnd="loadMore"
        @pulldown="refreshList"
        :loadOver="loadOver"
      >
        <!--BEGIN 暂无案件 -->
        <div class="nfcase_panel" v-if="ListItem.length === 0">当前阶段暂无数据</div>
        <div class="scroll_item_wrapper">
          <template v-for="(it,index) in ListItem">
            <Group :gutter="0" :class="['card_item',bgClass(it)]">
              <Cell class="card_tit" :border-intent="false">
                <span slot="title">{{it.clientName}}</span>
                <template v-if="it.packageStatus == 1">
                  <slot>
                    <template v-if="it.timeout == 'file'">
                      <span class="f_red">已过48小时</span>
                      <span class="flag_btn orange">待签收</span>
                    </template>
                    <template v-else>
                      <span class="flag_btn yellow">待签收</span>
                    </template>
                  </slot>
                </template>
                <template v-if="it.packageStatus == 2">
                  <slot>
                    <span v-if="it.timeout == 'file'" class="f_red">已过48小时</span>
                    <span class="flag_btn green">已确认</span>
                  </slot>
                </template>
                <template v-if="it.packageStatus == 3">
                  <slot>
                    <span v-if="it.timeout == 'file'" class="f_red">已过48小时</span>
                    <span class="flag_btn gray">已退回</span>
                  </slot>
                </template>
              </Cell>
              <v-touch v-on:tap="gotoDetail(it)">
                <Flexbox class="card_conts" :gutter="0" wrap="wrap">
                  <flexbox-item :span="1/3">
                    <div class="flex_cont">
                      <span>
                        <em class="dollor">{{it.estimateAmt}}</em>
                      </span>
                      <span class="dollor">元</span>
                    </div>
                  </flexbox-item>
                  <flexbox-item :span="1/3">
                    <div class="flex_cont">
                      <span>{{it.caseQuantity}}</span>
                    </div>
                  </flexbox-item>
                  <flexbox-item :span="1/3">
                    <div class="flex_cont">
                      <span>{{it.entrustPeriod}}</span>
                      <span>个月</span>
                    </div>
                  </flexbox-item>
                  <flexbox-item :span="1/3">
                    <div class="flex_cont">
                      <span>预计总标的金额</span>
                    </div>
                  </flexbox-item>
                  <flexbox-item :span="1/3">
                    <div class="flex_cont">
                      <span>案件量</span>
                    </div>
                  </flexbox-item>
                  <flexbox-item :span="1/3">
                    <div class="flex_cont">
                      <span>委托期</span>
                    </div>
                  </flexbox-item>
                </Flexbox>
              </v-touch>
              <flexbox :gutter="0">
                <flexbox-item class="fs_btn">
                  <v-touch
                    tag="div"
                    v-on:tap="showPopop('show_leaveMsg'),getCurrentItem(it)"
                    class="linkA"
                  >发送留言</v-touch>
                </flexbox-item>
              </flexbox>
            </Group>
          </template>
        </div>
      </scroller>
    </view-box>
    <!-- 留言 panel -->
    <SlimPopup
      :show.sync="show_leaveMsg"
      :popupClass="['popup']"
      popupTransition="slim-slide-in-bottom"
      popupPosition="bottom"
      @open="open"
      @close="close"
      class="b_popup"
    >
      <div class="popup_title">
        留言
        <v-touch class="close-btn" tag="span" v-on:tap="cancelFoo"></v-touch>
      </div>
      <div class="popup_content">
        <group :gutter="0">
          <div slot="title" :border-intent="false">
            <div class="popup_text">
              <div>(遇到问题，可以在此发送留言至平台，工作人员知晓后会联系你们)</div>
              <div>请上传截图</div>
            </div>
          </div>
          <x-textarea :max="100" name="description" placeholder="备注说明100字以内" v-model="leave_msg"></x-textarea>
          <div class="popup_uploader">
            <!-- <v-touch tag="div" v-on:tap="openLocalImg" class="cameraImg"></v-touch> -->
            <upload v-model="pngUrl" class="m-upload"></upload>
          </div>
        </group>
      </div>
      <div class="popop_ctrl">
        <div>
          <v-touch tag="a" class="optionBtn blueBtn" v-on:tap="confirmReceipt">确认提交</v-touch>
        </div>
      </div>
    </SlimPopup>
    <!-- end -->
  </div>
</template>

<script type="text/ecmascript-6">
import {
  Flexbox,
  FlexboxItem,
  Group,
  Cell,
  XHeader,
  ViewBox,
  XTextarea
} from "vux";
import upload from "@/components/upload.vue";
/****
 *@param ListItem 案件列表数据
 *@param selected 默认0 代表未选中
 *@param packageStatus 列表类型 默认-1
 */
export default {
  components: {
    Flexbox,
    FlexboxItem,
    Group,
    Cell,
    XHeader,
    ViewBox,
    upload,
    XTextarea
  },
  data() {
    return {
      openId: "",
      show_btn: false,
      show_nfdata: false,
      selected: 3,
      packageStatus: null,
      loadOver: false,
      pngUrl: [],
      show_leaveMsg: false,
      leave_msg: "",
      tabList: [
        {
          name: "待签收",
          currentNum: 1,
          packageStatus: 1
        },
        {
          name: "已退回",
          currentNum: 1,
          packageStatus: 3
        },
        {
          name: "已确认",
          currentNum: 1,
          packageStatus: 2
        },
        {
          name: "全部",
          currentNum: 1
        }
      ],
      pager: {
        count: 0,
        currentNum: 1,
        pageSize: 10,
        keyWord: ""
      },
      // 主键
      packageId: "",
      ListItem: []
    };
  },
  methods: {
    scrollBottom(isBottom) {
      /****
       * 关闭滚动条-自动定位popup到页面底部
       * @param isBottom {boolean}
       * */
      if (isBottom) {
        // var ele = document.getElementsByTagName("html")[0];
        // ele.scrollTop = ele.scrollHeight;
        document.documentElement.style.overflowY = "hidden";
      } else {
        document.documentElement.style.overflowY = "auto";
      }
    },
    open(val) {
      console.log("open", val);
      this.scrollBottom(true);
    },
    close(val) {
      console.log("close", val);
      this.scrollBottom(false);
      // let _page = this.$refs.inside;
      // console.log("_page", _page);
      // _page.addEventListener("touchmove", function(e) {
      //   _page.removeEventListener("touchmove", function(e) {
      //     console.log("解绑-touchmove");
      //   });
      // });
    },
    getCurrentItem(it) {
      // 获取遍历列表的主键id 和其它键
      this.packageId = it.packageId;
    },
    showPopop(type) {
      // 显示留言popup层
      if (type == "show_leaveMsg") {
        this.show_leaveMsg = true;
      }
    },
    cancelFoo() {
      // 隐藏popup层
      if (this.show_leaveMsg) {
        // 留言
        this.show_leaveMsg = false;
      }
    },
    PopupVerifyFn() {
      //弹层 提交 校验逻辑
      if (this.pngUrl.length === 0 && this.leave_msg === "") {
        return this.$vux.toast.show("请上传图片或留言");
      }
      return true;
    },
    confirmReceipt() {
      // 提交 - 留言
      // targetType->1=case，2=package
      let success = this.PopupVerifyFn();
      if (success) {
        this.$http
          .post("/mobile/message/leave.htm", {
            content: this.leave_msg,
            imgUrls: this.pngUrl.join(","),
            targetId: this.packageId,
            targetType: 2
          })
          .then(res => {
            console.log(res);
            if (res.data.code === "0000") {
              this.cancelFoo();
              this.$vux.toast.text("发送留言成功!");
              // 清空当前留言的输入文本
              this.pngUrl = [];
              this.packageId = "";
              this.leave_msg = "";
            }
          });
      }
    },
    // 点击筛选条件
    handleActive(item, index) {
      this.searchList = this.searchList.map((v, k) => {
        v.active = index === k;
        return v;
      });
      this.currentPage = 1;
      this.loadOver = false;
      this.doQuery();
    },
    tabSearch(item, index) {
      // this.$vux.loading.show({
      //   text: "加载中"
      // });
      this.loadOver = false;
      this.selected = index;
      this.packageStatus = item.packageStatus ? item.packageStatus : "";
      this.pager.currentNum = 1; //重置
      this.ListItem = []; //先清空-之前搜索结果
      this.doQuery();
    },
    loadMore() {
      if (this.loadOver === true) {
        return;
      }
      this.pager.currentNum++;
      this.doQuery("push");
    },
    refreshList() {
      this.loadOver = false;
      // 重置pager对象
      this.pager.currentNum = 1;
      this.pager.pageNum = 10;
      // 关闭暂无搜索结果样式
      // this.show_nfdata = false;
      this.doQuery();
    },
    bgClass(item) {
      return item.timeout == "file" ? "stale" : false;
    },
    gotoDetail(item) {
      this.$router.push({
        name: "assetPackageDetail",
        query: item
      });
    },
    doQuery(plus, callback) {
      console.log("**************doQuery");

      // this.$vux.loading.show({
      //   text: "加载中"
      // });
      // 资产包列表
      // rap:/46/mobile/queryAssetsList.htm
      // online:/mobile/queryAssetsList.htm
      this.$http
        .post("/mobile/queryAssetsList.htm", {
          // mock: 1,
          // token: this.openId,
          packageStatus: this.packageStatus, //this.searchList.filter(v => v.active)[0].value
          pageSize: this.pager.pageSize,
          currentNum: this.pager.currentNum
        })
        .then(res => {
          // let _data = res;
          // console.log(_data);
          console.log("eeee", res.data);
          if (res.data.code === "0000") {
            // this.$vux.loading.hide();
            res = res.data;
            this.pager.count = res.result.count;

            if (plus === "push") {
              this.ListItem = this.ListItem.concat(res.result.list);
              console.log(
                "res.data.result.list.length:",
                res.result.list.length
              );
              console.log("pager.pageSize:", this.pager.pageSize);
            } else {
              console.log("res.result.list---", res.result.list);
              this.ListItem = res.result.list;
            }
            callback && callback();
            this.$nextTick(() => {
              if (
                this.pager.pageSize * this.pager.currentNum >=
                this.pager.count
              ) {
                this.loadOver = true;
              }
            });
          }
        })
        .catch(err => {
          // this.$vux.loading.hide();
          console.log('catch-',err)
          // this.$vux.toast.text(err.data.description);
        });
    },
    resetHeight() {
      let vux_body = document.getElementById("vux_view_box_body");
      console.log(vux_body);
      if (vux_body) {
        vux_body.removeAttribute("style");
      }
    }
  },
  created() {
    if (localStorage.getItem("currentOpenId")) {
      this.openId = localStorage.getItem("currentOpenId");
    } else {
      this.openId = "";
    }
    document.title = "资产包";
  },
  beforeMount() {
    // 重置子页面设置的容器样式fixed-bug
    // this.resetHeight();
  },
  mounted() {
    this.doQuery();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/scss/helper/_mixin.scss";
$def_fontColor: rgb(0, 56, 136);
.page {
  color: #333333;
  background-color: #eeeeee;
  height: 100%;
  a {
    color: #333333;
  }
}
.tab_card {
  position: relative;
  z-index: 1;
}

.scroll_item_wrapper {
  overflow: auto;
  box-sizing: border-box;
  height: calc(100% - 1.09333rem);
  * {
    box-sizing: border-box;
  }
}

.fs_btn {
  text-align: center;
  .linkA {
    background-color: #fff;
    font-size: 14px;
    padding: rem(15) 0;
    color: $def_fontColor;
    border-top: 1px solid #efefef;
  }
}
.b_popup {
  .popop_ctrl {
    a {
      color: #fff;
    }
  }
}
</style>
