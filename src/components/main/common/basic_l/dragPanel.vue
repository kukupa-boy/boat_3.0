<!-- 
参数
width：[string],面板宽度，默认80px;
height:[string],面板高度，默认80px;
headInfo：[string],头部标题信息，默认为空，
close：['open'/'colse'],是否显示关闭按钮，默认close
minify：['open'/'colse'],是否显示最小化按钮，默认close
headColor:[color],头部字体颜色，默认 #fff
parentDOM：[class/id],拖拽框的父级容器的类名或id，默认为上级父元素
loc:[obj].[left/right/top/bottom],//拖拽框初始位置

响应
minifyBack：[fn],点击缩小按钮触发回调函数（传递给父组件）
closeBack：[fn],点击关闭按钮触发回调函数（传递给父组件）

插槽
content:面板内容

 -->

<template>
  <div class="_dragPanel" :style="{'height':height,'width':width,'left':left,'right':right,'top':top,'bottom':bottom}" v-show="show">
    <div class="head" type="candrag" @mousedown.stop="watchDrag($event)">
      <span type="candrag" :style="{'color':headColor}">{{headInfo}}</span>
      <p v-show="minify==='open'||close==='open'">
        <i
          class="fa fa-minus-circle minify"
          v-show="minify==='open'"
          isminify="0"
          @click="minifyfn($event)"
        ></i>
        <i class="fa fa-times-circle close" v-show="close==='open'" @click="closefn"></i>
      </p>
    </div>
    <slot name="content"></slot>
  </div>
</template>


<script>
export default {
  name: "dragPanel",
  data() {
    return {
      status: true,
      dragPanel: null,
      doc: null,
      dpWidth: undefined,
      dpHeight: undefined,
      parentWidth: undefined,
      parentHeight: undefined,
      innerParentDOM:null,
    };
  },
  methods: {
    init() {
      this.doc = $(document);
      $(window).resize(e => {
        setTimeout(() => {
          this.parentWidth = this.innerParentDOM.width();
          this.parentHeight = this.innerParentDOM.height();
        }, 360);
      });
    },
    watchDrag(e) {
      e.stopPropagation();
      if ($(e.target).attr("type") !== "candrag") {
        return;
      }
      this.dragPanel = $(e.target).parents("._dragPanel");

      $("._dragPanel").removeClass("zindexHigh");
      this.dragPanel.addClass("zindexHigh");

      this.dpWidth = this.dragPanel.width();
      this.dpHeight = this.dragPanel.height();
      if (this.status) {
        this.parentWidth = this.innerParentDOM.width();
        this.parentHeight = this.innerParentDOM.height();
        this.status = false;
      }
      let locX = this.dragPanel.position().left;
      let locY = this.dragPanel.position().top;

      let oldX = e.clientX,
        oldY = e.clientY;
      this.doc.on("mousemove", e => {
        locX += e.clientX - oldX;
        locY += e.clientY - oldY;
        // 判断是否出界
        if (locX < 0 || locX > this.parentWidth - this.dpWidth) {
          if (locX < 0) {
            locX = 0;
          } else {
            locX = this.parentWidth - this.dpWidth;
          }
        }
        if (locY < 0 || locY > this.parentHeight - this.dpHeight) {
          if (locY < 0) {
            locY = 0;
          } else {
            locY = this.parentHeight - this.dpHeight;
          }
        }
        this.dragPanel.css({ left: locX + "px", top: locY + "px" });
        oldX = e.clientX;
        oldY = e.clientY;
      });
      this.doc.on("mouseup", e => {
        this.doc.off("mousemove");
      });
    },
    minifyfn(e) {
      let ele = $(e.target);
      let h = this.height;
      ele.parents("._dragPanel").addClass("trans");
      if (ele.attr("isminify") === "1") {//是最小化，就展开
        ele
          .removeClass("fa-chevron-circle-down")
          .addClass("fa-minus-circle")
          .attr("isminify", "0")
          .parents("._dragPanel")
          .css({ height: h });
      } else {
        ele
          .removeClass("fa-minus-circle")
          .addClass("fa-chevron-circle-down")
          .attr("isminify", "1")
          .parents("._dragPanel")
          .css({ height: "30px" });
      }
      setTimeout(() => {
        ele.parents("._dragPanel").removeClass("trans");
      }, 300);
      this.$emit("minifyBack");
    },
    closefn() {
      this.$emit("closeBack");
    }
  },
  destroyed() {
    $(document).off("mousedown");
    $(document).off("mouseup");
  },
  mounted() {
    if(!!this.parentDOM){
        this.innerParentDOM=$("._dragPanel").parent();
    }else{
        this.innerParentDOM=$(this.parentDOM);
    }
    this.init();
  },
  props: {
    width: { default: "80px" },
    height: { default: "80px" },
    headInfo: { default: "" },
    close: { default: "close" },
    minify: { default: "close" },
    parentDOM: { default: "#map" },
    show: { default: false },
    headColor:{default:"#fff"},
    left:{default:"auto"},
    top:{default:"auto"},
    right:{default:"auto"},
    bottom:{default:"auto"}
  }
};
</script>


<style lang='less' scoped>
._dragPanel {
  position: absolute;
  // top: 125px;
  // left: 125px;
  z-index: 1001;
  overflow: hidden;
  background-color: rgb(5, 33, 69);
  box-shadow: 1px 1px 3px rgb(17, 63, 124);
  user-select: none;
  .head {
    position: relative;
    background-color: rgb(5, 33, 69);
    border-bottom: 1px double rgba(52, 255, 255, 0.5);
    height: 30px;
    color: #fff;
    user-select: none;
    cursor: move;
    overflow: hidden;
    > span {
      display: inline-block;
      line-height: 30px;
      height: 30px;
      padding-left: 6px;
    }
    > p {
      position: absolute;
      right: 0;
      display: inline-block;
      cursor: pointer;
      font-size: 0;
      > i {
        font-size: 18px;
        line-height: 30px;
        margin-right: 6px;
        color: rgba(255, 255, 255, 0.4);
      }
      .minify {
        &:hover {
          color: rgb(109, 172, 255);
        }
      }
      .close {
        &:hover {
          color: rgb(245, 133, 133);
        }
      }
    }
  }
}
.zindexHigh {
  z-index: 1002;
}
.trans {
  transition: 0.3s;
}
</style>