<!-- 用户管理-用户角色 -->

<template>
  <div class="personRootBox">
    <div class="prb-left">
      <div class="title">
        <span>权限分配</span>
      </div>

      <div class="head">
        <div class="menu">
          <span class="m-btn checked" @click="changeMenu($event,true)">部门</span>
          <span class="m-btn " @click="changeMenu($event,false)">岗位</span>
        </div>
        <div class="search">
          <searchBox size="22" border="open" bgcolor="rgba(255,255,255,0)"></searchBox>
          <!-- <searchBox class="fa fa-search" size="20" border="open" bgcolor="rgba(255,255,255,0)"></searchBox> -->
        </div>
      </div>

      <div class="body">
        <div class="menuList" v-show="nowIsPartment">

          <div class="partmentBox">
            <div class="child_deep1 parent" v-for="(item,index) in partmentList" :key="index">
              <p class="label mpb-first">
              <i class="switcher fa fa-minus-square-o" v-show="!!item.children" isopen="1" @click.stop="switcherMenu($event,'child_deep1')"></i>
                <span>{{item.name}}</span>
              </p>
              <div class="child_deep2" v-for="(item,index) in item.children" :key="index">
                <p class="label mpb-second">
                  <span class="mpbs-btn" isChecked="0" @click="checked_p($event,'partmentBox')">{{item.name}}</span>
                </p>
              </div>
            </div>
          </div>


        </div>
        <div class="menuList" v-show="!nowIsPartment">
          
          <div class="groupBox">
            <div class="child_deep1 parent" v-for="(item,index) in groupList" :key="index">
              <p class="label mpb-first">
                <!--  isopen="1" -->
              <i class="switcher fa fa-minus-square-o" v-show="!!item.children" isopen="1" @click.stop="switcherMenu($event,'child_deep1')"></i>
                <span>{{item.name}}</span>
              </p>
              <div class="child_deep2" v-for="(item,index) in item.children" :key="index">
                <p class="label mpb-second">
                  <span class="mpbs-btn" isChecked="0" @click="checked_p($event,'groupBox')">{{item.name}}</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="prb-right">
      <div class="head">
        <div class="select-all">
          <span>所有权限</span>
          <i
            :class="'label fa '+(rootCan.has?'fa-check-square-o':'fa-square-o')"
            @click="checkChild(rootCan,!rootCan.has)"
          ></i>
        </div>
      </div>
      <div class="body">
        <div class="rootBox addScroll">
          <p>-----------------------start-----------------------</p>
          <div class="deep1_line">
            <div
              v-for="(item) in rootCan.children"
              :class="{'child_deep1':true,'parent':true,'red':!item.children}"
              :key="item.index">
              <p :class="{'rbr-first':true,'checked':item.has}">
                <i
                  class="switcher fa fa-minus-square-o"
                  v-show="!!item.children"
                  isopen="1"
                  @click.stop="switcher(item,$event,'child_deep1')"></i>
                <i :class="{'basic':true,'fa':true,'fa-circle':item.has,'fa-circle-thin':!item.has}" v-show="!item.children"></i>
                <span :class="{'isBasicRoot':!item.children}">{{item.name}}</span>
                <i
                  :class="'label fa '+(item.has?'fa-check-square-o':'fa-square-o')"
                  @click="checkChild(item,!item.has)"></i>
              </p>
              <div class="deep2_line" v-if="item.children">
                <div
                  v-for="(item) in item.children"
                  :class="{'child_deep2':true,'parent':true,'red':!item.children}"
                  :key="item.index">
                  <p :class="{'rbr-second':true,'checked':item.has}">
                    <i
                      class="switcher fa fa-minus-square-o"
                      v-show="!!item.children"
                      isopen="1"
                      @click.stop="switcher(item,$event,'child_deep2')"
                    ></i>
                    <i :class="{'basic':true,'fa':true,'fa-circle':item.has,'fa-circle-thin':!item.has}"  v-show="!item.children"></i>
                    <span :class="{'isBasicRoot':!item.children}">{{item.name}}</span>
                    <i
                      :class="'label fa '+(item.has?'fa-check-square-o':'fa-square-o')"
                      @click="checkChild(item,!item.has)"></i>
                  </p>

                  <div class="deep3_line" v-if="item.children">
                    <div
                      v-for="(item) in item.children"
                      :class="{'child_deep3':true,'parent':true,'red':!item.children}"
                      :key="item.index">
                      <p :class="{'rbr-third':true,'checked':item.has}">
                        <i
                          class="switcher fa fa-minus-square-o"
                          v-show="!!item.children"
                          isopen="1"
                          @click.stop="switcher(item,$event,'child_deep3')"></i>
                        <i :class="{'basic':true,'fa':true,'fa-circle':item.has,'fa-circle-thin':!item.has}" v-show="!item.children"></i>
                        <span :class="{'isBasicRoot':!item.children}">{{item.name}}</span>
                        <i
                          :class="'label fa '+(item.has?'fa-check-square-o':'fa-square-o')"
                          @click="checkChild(item,!item.has)"></i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p>-----------------------end-----------------------</p>
        </div>
      </div>
      <div class="foot"></div>
    </div>

    <!-- <div class="rootManageCan" v-show="openRoot">
      <div class="rootBox">
        <div class="rb-body2">
          <p>
            <i class="fa fa-check-circle selectAll" ></i>
            <span>全选</span>
          </p>
        </div>

        <div class="rb-foot">
          <div>
            <theBtn content="确定" type="normal"></theBtn>
          </div>
          <div>
            <theBtn content="取消" type="#ccc"></theBtn>
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>


<script>
import theBtn from "@/components/main/common/basic_l/theBtn";
import searchBox from "@/components/main/common/basic_l/searchBox";

export default {
  name: "personRootBox",
  data() {
    return {
      nowIsPartment:true,
      //权限数据盒子
      rootCan: {
        has: false, //全选
        // 权限分配列表
        children: [
          {
            has: false,
            inedx: "1",
            name: "海图监管",
            childNum: 1,
            children: [{ has: false, index: "1", name: "海图监管" }]
          },
          {
            has: false,
            inedx: "2",
            name: "区域监管",
            childNum: 1,
            children: [{ has: false, index: "1", name: "区域监管" }]
          },
          {
            has: false,
            inedx: "3",
            name: "任务管理",
            childNum: 1,
            children: [{ has: false, index: "1", name: "任务管理" }]
          },
          {
            has: false,
            inedx: "4",
            name: "气象报告",
            childNum: 1,
            children: [{ has: false, index: "1", name: "气象报告" }]
          },
          {
            has: false,
            inedx: "5",
            name: "用户管理",
            childNum: 4,
            children: [
              {
                has: false,
                inedx: "5.1",
                name: "作业人员"
              },
              {
                has: false,
                inedx: "5.2",
                name: "岗位",
                childNum: 2,
                children: [
                  {
                    has: false,
                    inedx: "5.2.1",
                    name: "添加"
                  },
                  {
                    has: false,
                    inedx: "6.2.2",
                    name: "编辑"
                  }
                ]
              },
              {
                has: false,
                inedx: "5.3",
                name: "部门"
              }
            ]
          },
          {
            has: false,
            inedx: "6",
            name: "监控管理",
            childNum: 3,
            children: [
              {
                has: false,
                inedx: "6.1",
                name: "摄像头管理"
              },
              {
                has: false,
                inedx: "6.2",
                name: "监控视频管理",
                childNum: 2,
                children: [
                  {
                    has: false,
                    inedx: "6.2.1",
                    name: "添加视频"
                  },
                  {
                    has: false,
                    inedx: "6.2.2",
                    name: "删除视频"
                  }
                ]
              }
            ]
          },
          {
            has: false,
            inedx: "7",
            name: "船舶管理",
            childNum: 5,
            children: [
              {
                has: false,
                inedx: "7.1",
                name: "船舶列表",
                childNum: 3,
                children: [
                  {
                    has: false,
                    inedx: "7.1.1",
                    name: "添加船舶"
                  },
                  {
                    has: false,
                    inedx: "7.1.2",
                    name: "编辑船舶"
                  },
                  {
                    has: false,
                    inedx: "7.1.3",
                    name: "删除船舶"
                  }
                ]
              },
              {
                has: false,
                inedx: "7.2",
                name: "船舶出海条件",
                childNum: 2,
                children: [
                  {
                    has: false,
                    inedx: "7.2.1",
                    name: "添加出海条件"
                  },
                  {
                    has: false,
                    inedx: "7.2.2",
                    name: "编辑出海条件"
                  }
                ]
              }
            ]
          },
          {
            has: false,
            inedx: "8",
            name: "消息管理",
            childNum: 2,
            children: [
              {
                has: false,
                inedx: "8.1",
                name: "发送消息"
              },
              {
                has: false,
                inedx: "8.2",
                name: "接受消息"
              }
            ]
          },
          {
            has: false,
            inedx: "9",
            name: "设备管理",
            childNum: 3,
            children: [
              {
                has: false,
                inedx: "9.1",
                name: "设备列表",
                childNum: 2,
                children: [
                  {
                    has: false,
                    inedx: "9.1.1",
                    name: "添加设备"
                  },
                  {
                    has: false,
                    inedx: "9.1.2",
                    name: "编辑设备"
                  }
                ]
              },
              {
                has: false,
                inedx: "9.2",
                name: "打卡记录"
              }
            ]
          }
        ]
      },
      partmentList: [
        {
          id: "w",
          name: "运维部",
          children: [
            {
              id: "wsada",
              name: "维修组"
            },
            {
              id: "wosss",
              name: "检修组"
            },
            {
              id: "wosss",
              name: "日维组"
            }
          ]
        },
        {
          id: "w",
          name: "运维部",
          children: [
            {
              id: "wsada",
              name: "维修部"
            },
            {
              id: "wosss",
              name: "维修部"
            }
          ]
        },
        {
          id: "w",
          name: "运维部",
          children: [
            {
              id: "wsada",
              name: "维修部"
            },
            {
              id: "wosss",
              name: "维修部"
            }
          ]
        },
        {
          id: "w",
          name: "运维部",
          children: [
            {
              id: "wsada",
              name: "维修部"
            },
            {
              id: "wosss",
              name: "维修部"
            }
          ]
        },
        {
          id: "w",
          name: "运维部",
          children: [
            {
              id: "wsada",
              name: "维修部"
            },
            {
              id: "wosss",
              name: "维修部"
            }
          ]
        },
        {
          id: "w",
          name: "运维部",
          children: [
            {
              id: "wsada",
              name: "维修部"
            },
            {
              id: "wosss",
              name: "维修部"
            }
          ]
        },
        {
          id: "w",
          name: "运维部",
          children: [
            {
              id: "wsada",
              name: "维修部"
            },
            {
              id: "wosss",
              name: "维修部"
            }
          ]
        },
        {
          id: "w",
          name: "运维部",
          children: [
            {
              id: "wsada",
              name: "维修部"
            },
            {
              id: "wosss",
              name: "维修部"
            }
          ]
        },
        {
          id: "w",
          name: "运维部",
          children: [
            {
              id: "wsada",
              name: "维修部"
            },
            {
              id: "wosss",
              name: "维修部"
            }
          ]
        },
        {
          id: "w",
          name: "运维部",
          children: [
            {
              id: "wsada",
              name: "维修部"
            },
            {
              id: "wosss",
              name: "维修部"
            }
          ]
        }
      ],
      groupList: [
        {
          id: "w",
          name: "运维部",
          children: [
            {
              id: "wsada",
              name: "维修组"
            },
            {
              id: "wosss",
              name: "检修组"
            },
            {
              id: "wosss",
              name: "日维组"
            }
          ]
        },
        {
          id: "w",
          name: "运维部",
          children: [
            {
              id: "wsada",
              name: "维修部"
            },
            {
              id: "wosss",
              name: "维修部"
            }
          ]
        }
      ]
    };
  },
  computed: {},
  methods: {
    // ***************************start
    switcher(data, e, parentClassName) {
      // fa-minus-square-o
      let ele = $(e.target);
      let elep = ele.parents("." + parentClassName);
      let heightVal = elep.find(".label").length;
      if (ele.attr("isopen") === "1") {
        ele
          .attr("isopen", "0")
          .addClass("fa-plus-square-o")
          .removeClass("fa-minus-square-o");
        elep.css({ height: "30px" });
        if (parentClassName === "child_deep2") {
          let parentHeight = ele.parents(".child_deep1").height();
          ele
            .parents(".child_deep1")
            .css({ height: parentHeight - (heightVal - 1) * 30 + "px" });
        }
      } else {
        ele
          .attr("isopen", "1")
          .addClass("fa-minus-square-o")
          .removeClass("fa-plus-square-o");
        elep.css({ height: heightVal * 30 + "px" });
        if (parentClassName === "child_deep2") {
          let parentHeight = ele.parents(".child_deep1").height();
          ele
            .parents(".child_deep1")
            .css({ height: parentHeight + (heightVal - 1) * 30 + "px" });
        } else if (parentClassName === "child_deep1") {
          elep.find(".child_deep2").each((index, ele) => {
            let len = $(ele).find(".label").length;
            $(ele)
              .css({ height: len * 30 + "px" })
              .find(".switcher")
              .attr("isopen", "1")
              .addClass("fa-minus-square-o")
              .removeClass("fa-plus-square-o");
          });
        }
      }
    },
    switcherMenu(e,parentClassName){
      // 'fa-check-square-o':'fa-square-o'
      let ele=$(e.target);
      let elep=ele.parents('.'+parentClassName);
      if(ele.attr('isopen')==='1'){
        ele.attr('isopen','0').addClass("fa-plus-square-o").removeClass("fa-minus-square-o");
        elep.css({'height':'30px'});
      }else{
        ele.attr('isopen','1').addClass("fa-minus-square-o").removeClass("fa-plus-square-o");
      let len=elep.find('.mpb-second').length;
        elep.css({'height':(len+1)*30+'px'});
      }
    },
    initHeight() {
      $(".parent").each((index, ele) => {
        let h = $(ele).find(".label").length;
        $(ele).css({ height: h * 30 + "px" });
      });
    },
    checkChild(item, p_has) {
      item.has = p_has;
      if (!!item.children) {
        for (let i = 0; i < item.children.length; i++) {
          this.checkChild(item.children[i], p_has);
        }
      }
    },
    // ************************end
    changeMenu(e,status){
      let ele=$(e.target);
      if(!ele.hasClass('checked')){
        $('.m-btn').removeClass("checked");
        ele.addClass('checked');
        this.nowIsPartment=status;
      }
    },
    checked_p(e,parentClassName){
      let ele=$(e.target);
      if(ele.attr('isChecked')==='0'){
        ele.parents('.'+parentClassName).find('.mpbs-btn').removeClass('checked-p').attr('isChecked','0');
        ele.addClass('checked-p').attr('isChecked','1');
      }
    },
    // *****************************
    nowTime(type) {
      // 参数 type为需要的时间类型,默认为time
      // time : 12:10:22
      // date : 2019-10-10
      // datetime : 2019-10-10 12:10:22
      // timestamp: 1571294661250
      return (() => {
        let myDate = new Date();
        let year = myDate.getFullYear();
        let month = myDate.getMonth() + 1;
        let date = myDate.getDate();
        let h = myDate.getHours(); //获取当前小时数(0-23)
        let m = myDate.getMinutes(); //获取当前分钟数(0-59)
        let s = myDate.getSeconds();
        //获取当前时间
        if (type == "date") {
          return `${conver(year)}-${conver(month)}-${conver(date)}`;
        } else if (type == "datetime") {
          return `${conver(year)}-${conver(month)}-${conver(date)} ${conver(
            h
          )}:${conver(m)}:${conver(s)}`;
        } else if (type == "time") {
          return `${conver(h)}:${conver(m)}:${conver(s)}`;
        } else if (type == "timestamp") {
          return myDate.getTime();
        }
        return `${conver(h)}:${conver(m)}:${conver(s)}`;
      })();
      //日期时间处理
      function conver(s) {
        return s < 10 ? "0" + s : s;
      }
    },
    hint(text, fc, bgc, interval) {
      // 提示信息,text:展示文字（必须），fc：字体颜色（默认亮青），bgc：背景颜色（默认蓝黑）,interval：显示时间
      let _fc = fc || "rgb(0, 255, 255)";
      let _bgc = bgc || "rgb(5, 33, 69)";
      let hint = document.createElement("div");
      let _interval = interval || 3000;
      hint.className = "_hintBox";
      hint.innerText = text;
      $("body").append(hint);
      $(hint).css({
        color: _fc,
        backgroundColor: _bgc,
        boxShadow: "0.5px 0.5px 4px " + _fc
      });
      setTimeout(() => {
        $(hint).addClass("_hintBox_show");
      }, 300);
      setTimeout(() => {
        $(hint).removeClass("_hintBox_show");
        setTimeout(() => {
          $(hint).remove();
        }, 300);
      }, _interval);
    }
  },
  created() {},
  mounted() {
    this.initHeight();
  },
  components: {
    theBtn,
    searchBox
  }
};
</script>


<style lang='less' scoped>
@import "../../../assets/ship_system/less/personRoot.less";
</style>

<style lang='less'>
/* 1080px下*/
@fontColor: rgb(89, 252, 255);
@bgColor: rgb(5, 33, 69);
@fontColorF: rgba(0, 255, 255, 0);
/* 1080px下 */

// 滚动条样式
/* IE 浏览器 */
@hideColor: rgba(255, 255, 255, 0);
@lightColor: rgba(89, 252, 255, 0.3);
.personRootBox .sb-textarea textarea {
  scrollbar-arrow-color: @fontColor; /*三角箭头的颜色*/
  scrollbar-face-color: @bgColor; /*滚动条滑块按钮的颜色*/
  scrollbar-highlight-color: @bgColor; /*滚动条整体颜色*/
  scrollbar-shadow-color: @bgColor; /*滚动条阴影*/
  scrollbar-track-color: @bgColor; /*滚动条轨道颜色*/
  scrollbar-3dlight-color: @bgColor; /*滚动条3d亮色阴影边框的外观颜色——左边和上边的阴影色*/
  scrollbar-darkshadow-color: @bgColor; /*滚动条3d暗色阴影边框的外观颜色——右边和下边的阴影色*/
  scrollbar-base-color: @bgColor; /*滚动条基准颜色*/
}
/* chrome & safari 浏览器 */
.personRootBox .sb-textarea textarea {
  &::-webkit-scrollbar {
    /*滚动条整体部分,必须要设置*/
    width: 6px;
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    /*滚动条的轨道*/
    background-color: @hideColor;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条的滑块按钮*/
    border-radius: 10;
    background-color: @lightColor;
  }
  &::-webkit-scrollbar-button {
    /*滚动条的上下两端的按钮*/
    height: 0;
    display: none;
  }
}
.personRootBox .sb-input input {
  border-radius: 0;
  height: 28px;
  line-height: 28px;
}


// 提示框样式
._hintBox {
  visibility: hidden;
  opacity: 0;
  transition: 0.3s;
  position: absolute;
  top: 8%;
  width: 360px;
  left: 50%;
  margin-left: -180px;
  padding: 8px;
  text-align: center;
  z-index: 1001;
}
._hintBox_show {
  visibility: visible;
  opacity: 1;
  top: 10%;
}

@media screen and (max-height: 1080px) {
  .personGroupBox {
    .has-gutter tr th {
      height: 80px;
    }
    .el-table__row td {
      height: 64px;
    }
  }
}
@media screen and (max-height: 960px) {
  .personGroupBox {
    .has-gutter tr th {
      height: 70px;
    }
    .el-table__row td {
      height: 54px;
    }
  }
}
@media screen and (max-height: 840px) {
  .personGroupBox {
    .has-gutter tr th {
      height: 60px;
    }
    .el-table__row td {
      height: 40px;
    }
  }
}
</style>
