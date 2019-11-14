<!-- 打卡记录 -->

<template>
    <div class="censorNoteBox">

      <div class="cnb-left">

        <div class="thehead">
          <div class="th-search">
            <!-- <searchBox @back="searchChangeBack" @clickBack="searchClickBack" border="open"></searchBox> -->
            
            <searchBox
              classname="fa fa-search"
              size="24"
              border="open"
              bgcolor="rgba(255,255,255,0)"
              @back="searchChangeBack"
              @clickBack="searchClickBack"></searchBox>
          </div>
        </div>

        <div class="thebody">
          <el-table
            :data="tables"
            :header-cell-style="{padding:'0',textAlign:'center'}"
            :cell-style="{padding:'0',textAlign:'center'}">
            <el-table-column prop="id" label="设备序号" width="80px"></el-table-column>
            <el-table-column prop="deviceName" label="设备类型"></el-table-column>
            <el-table-column prop="userName" label="打卡用户"></el-table-column>
            <el-table-column prop="type" label="打卡类型" width="100px"></el-table-column>
            <el-table-column prop="createTime" label="打卡时间"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <!-- <el-table-column label="操作">
              <template slot-scope="scope">
                <div class="oprate">
                  <el-tooltip
                    content="删除"
                    placement="right"
                    effect="light"
                    :open-delay="300"
                    :enterable="false"
                  >
                    <el-button type="text" size="small">
                      <i class="icon--2" @click="deleteIt(scope.$index)"></i>
                    </el-button>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column> -->
          </el-table>
        </div>

        <div class="thefoot">
          <pagination :perpage="perpage" :pagesize="pageSize" @currentPageChange="pageChange"></pagination>
        </div>

      </div>

      <div class="cnb-right">

        <div class="r-first">
          <p><i class="fa fa-empire"></i><span>打卡类型</span></p>
          <pie-chart :data="piechartData"></pie-chart>
        </div>

        <div class="r-second">
          <p><i class="fa fa-empire"></i><span>打卡详情</span></p>
          <histogram :data="histogramData"></histogram>
        </div>

      </div>

      <affirmBox :show="showAffirm" type="dark" content="你确定要删除吗？" @back="affirmBack"></affirmBox>

    </div>
</template>


<script>
// import theBtn from "@/components/main/common/basic_l/theBtn";
// import theTable from "@/components/main/common/basic_l/theTable";
import searchBox from "@/components/main/common/basic_l/searchBox";
import pagination from "@/components/main/common/basic_l/pagination";
import affirmBox from "@/components/main/common/basic_l/affirmBox";

import histogram from "@/components/main/common/basic_l/histogram";
import pieChart from "@/components/main/common/basic_l/pieChart";


export default {
  name: "personManagerL",
  data() {
    return {
      tableData: [
        {
          // id: 1,
          name: "摄像头",
          // userName: "小明",
          // type: "检修",
          time: "2019-02-09 10:12:21",
          // remark: "这里是备注"
        },
        {
          createTime: "2019-11-12 19:45:55",
          deviceName: "风电机",
          did: "55",
          // id: "18",
          // remark: "1234758",
          // type: "检修",
          uid: "1",
          // userName: "admin",
        }
      ],
      perpage: 8, //每页数据条数,默认8
      pageSize: 0,
      nowPage:1,
      // 是否展示询问框
      showAffirm: false,
      theindex: undefined,//存放点前要删除的列的index,
      search:"",
      // 传入柱状图子组件的配置数据
      histogramData:{
        nameList:["检修","巡视","维护"],
        valueList:[18,59,49],
        // colorList:['red','blue','green'],
        unit:'次',
      },
      // 传入饼状图子组件的配置数据
      piechartData:{
        nameList:["检修","巡视","维护"],
        valueList:[18,59,49],
        // colorList:['red','blue','green']
      }
    };
  },
  methods: {
    // 换页回调函数
    pageChange(val) {
      this.nowPage=val;
      this.initTableData();
    },
    // 删除打卡记录的click函数
    deleteIt(index) {
      this.showAffirm = true;
      this.theindex = index;
    },
    searchChangeBack(val) {
      if(val===""){
        this.search="";
      }
    },
    searchClickBack(val) {
      this.search=val;
    },
    // 点击询问框的“确定”或“取消”后的返回函数，res返回“sure”或“cancel”
    affirmBack(res) {
      this.showAffirm = false;
      if (res === "sure") {
        if (this.theindex !== undefined) {
          this.tableData.splice(this.theindex, 1);
          const h = this.$createElement;
          this.$message({
            message: h("p", null, [
              h("span", { style: { color: "green" } }, "删除成功！ ")
            ]),
            type: "success"
          });
        }
      } else {
        this.theindex = undefined;
      }
    },
    // 表格筛选条件发生改变
    filterChange(val) {
      console.log(val);
    },
    // 获取当前登录用户的id
    getUserId(){
      return 1;
    },
    // 获取data
    getData(url,opt){
      let _url= url||'/api/device/getUserDeviceListPage';
      let _opt= {
          pageSize:this.perpage,//每页数据条数,默认为8
          pageIndex:this.nowPage,// 当前页,默认为1
          ...(opt?opt:{}),
      };
      this.search?_opt.nameKeys=this.search:'';
      /*url:请求地址，必须
      opt={
        nameKeys：设备名，可选
        pageIndex:请求页，可选
        pageSize：每页数据，可选
      }*/
      return new Promise((resolve,reject)=>{
        this.axios.get(_url,{
          params: _opt,
        }).then((res)=> {
          if(res.data.stateCode==="200"){
            resolve(res);
          }else{
            console.log("success but",res);
          }
        }).catch((error)=> {
          console.log("error",error);
        });
      });
    },
    initTableData(){
      this.getData(null,{userId:this.getUserId()}).then((res)=>{
        console.log(res);
        this.tableData=res.data.data.list;
        this.pageSize=res.data.data.total;
      });
    }
  },
  computed:{
    tables:function(){
      var search=this.search;
      if(search){
        return  this.tableData.filter(function(dataNews){
          return Object.keys(dataNews).some(function(key){
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1;
          })
        })
      }
      return this.tableData;
    }
  },
  mounted(){
    this.initTableData();
  },
  components: {
    // theBtn,
    // theTable,
    searchBox,
    pagination,
    affirmBox,
    histogram,//柱状图
    "pie-chart":pieChart,//饼状图

  }
};
</script>


<style lang='less' scoped>
@import "../../../assets/ship_system/less/censorNote.less";
</style>


<style lang='less'>
@fontColor:rgb(89,252,255);
@bgColor:rgb(5, 33, 69);
@fontColorF:rgba(0, 255, 255, 0);
.censorNoteBox{
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #04405f;
  }
  // 除去表格下的白线
  .el-table::before{
    height: 0;
  }
    // height:830px以上
  .has-gutter tr th {
    height: 72px;
    background-color: @bgColor;
    color: @fontColor;
  }
  .el-table__row td {
    height: 56px;
    background-color: @bgColor;
    color: @fontColor;
  }
  //--end
  .el-table td,.el-table th.is-leaf{
    border-image: -webkit-linear-gradient(to right,@fontColorF,@fontColor,@fontColorF) 30 5 30;
    border-image: -moz-linear-gradient(to right, @fontColorF,@fontColor,@fontColorF) 30 5 30;
    border-image: linear-gradient(to right, @fontColorF,@fontColor,@fontColorF) 30 5 30;
  }
  .el-table__empty-block{
    background-color: @bgColor;
    >span{
      color: @fontColor
    }
  }
  .el-table--striped .el-table__body tr.el-table__row--striped td{
    background-color: @bgColor;
    color: @fontColor;
  }
  .el-table__row td div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .slotBody > .sb-textarea textarea {
    border-radius: 0;
    resize: none;
  }
  
  .thebody table{
    width: 100%!important;
    background-color: @bgColor;
  }
}

// 滚动条样式
/* IE 浏览器 */
@hideColor:rgba(255, 255, 255, 0);
@lightColor:rgba(89, 252, 255, 0.3);
.censorNoteBox .sb-textarea textarea{
    scrollbar-arrow-color: @fontColor;/*三角箭头的颜色*/
    scrollbar-face-color: @bgColor;/*滚动条滑块按钮的颜色*/
    scrollbar-highlight-color: @bgColor;/*滚动条整体颜色*/
    scrollbar-shadow-color: @bgColor;/*滚动条阴影*/
    scrollbar-track-color: @bgColor;/*滚动条轨道颜色*/
    scrollbar-3dlight-color:@bgColor;/*滚动条3d亮色阴影边框的外观颜色——左边和上边的阴影色*/
    scrollbar-darkshadow-color: @bgColor;/*滚动条3d暗色阴影边框的外观颜色——右边和下边的阴影色*/
    scrollbar-base-color: @bgColor;/*滚动条基准颜色*/
}
/* chrome & safari 浏览器 */
.censorNoteBox .sb-textarea textarea{
  &::-webkit-scrollbar{/*滚动条整体部分,必须要设置*/
    width: 6px;
    height: 10px;
  }
  &::-webkit-scrollbar-track{/*滚动条的轨道*/
    background-color: @hideColor;
  }
  &::-webkit-scrollbar-thumb{/*滚动条的滑块按钮*/
    border-radius: 10;
    background-color: @lightColor;
  }
  &::-webkit-scrollbar-button{/*滚动条的上下两端的按钮*/
    height: 0;
    display: none;
  }
}

// 提示框样式
._hintBox{
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
._hintBox_show{
  visibility: visible;
  opacity: 1;
  top: 10%;
}

@import url("../../../assets/public/icomoon/style.css");
@font-face {
  font-family: "icomoon2";
  src: url("../../../assets/public/icomoon/fonts/icomoon.eot");
  /* IE9*/
  src: url("../../../assets/public/icomoon/fonts/icomoon.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("../../../assets/public/icomoon/fonts/icomoon.woff")
      format("woff"),
    /* chrome, firefox */
      url("../../../assets/public/icomoon/fonts/icomoon.ttf")
      format("truetype"),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
      url("../../../assets/public/icomoon/fonts/icomoon.svg#icomoon"); /* iOS 4.1- */
}
.icomoon {
  font-family: "icomoon2" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media screen and (max-height:830px) {
.censorNoteBox{
  .has-gutter tr th{
    height: 60px;
  }
  .el-table__row td{
    height: 52px;
  }
  }
}
@media screen and (max-height:780px) {
.censorNoteBox{
  .has-gutter tr th{
    height: 60px;
  }
  .el-table__row td{
    height: 48px;
  }
  }
}
@media screen and (max-height:740px) {
.censorNoteBox{
  .has-gutter tr th{
    height: 56px;
  }
  .el-table__row td{
    height: 44px;
  }
  }
}
@media screen and (max-height:690px) {
.censorNoteBox{
  .has-gutter tr th{
    height: 50px;
  }
  .el-table__row td{
    height: 40px;
  }
  }
}
@media screen and (max-height:660px) {
.censorNoteBox{
  .has-gutter tr th{
    height: 40px;
  }
  .el-table__row td{
    height: 40px;
  }
  }
}
// @media screen and (max-height:630px) {
// .censorNoteBox{
//   .thehead{
//     height: 50px;
//     line-height: 50px;
//   }
//   .has-gutter tr th{
//     height: 40px;
//   }
//   .el-table__row td{
//     height: 32px;
//   }
//   }
// }
</style>
