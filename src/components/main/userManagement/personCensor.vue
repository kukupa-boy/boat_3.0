<!-- 用户管理-用户角色 -->

<template>
  <div class="personCensorBox">


    <div>
      <div class="thehead">
        <div class="th-search">
          <searchBox
            classname="fa fa-search"
            size="24"
            border="open"
            bgcolor="rgba(255,255,255,0)"
            @back="searchChangeBack"
            @clickBack="searchClickBack">
          </searchBox>
        </div>
      </div>
      <div class="thebody">
        <el-table
          :data="tables"
          :header-cell-style="{padding:'0',textAlign:'center'}"
          :cell-style="{padding:'0',textAlign:'center'}">
          <el-table-column prop="id" label="序号" width="80px"></el-table-column>
          <el-table-column prop="name" label="用户账号"></el-table-column>
          <el-table-column prop="lat" label="经度" width="100px"></el-table-column>
          <el-table-column prop="lng" label="纬度" width="100px"></el-table-column>
          <el-table-column prop="time" label="打卡时间"></el-table-column>
          <el-table-column prop="remark" label="描述"></el-table-column>
        </el-table>
      </div>
      <div class="thefoot">
        <pagination :perpage="perpage" :pagesize="tableData.length" @currentPageChange="pageChange"></pagination>
      </div>

    </div>


  </div>
</template>


<script>
import theBtn from "@/components/main/common/basic_l/theBtn";
import theTable from "@/components/main/common/basic_l/theTable";
import searchBox from "@/components/main/common/basic_l/searchBox";
import pagination from "@/components/main/common/basic_l/pagination";
import infoAddBox from "@/components/main/common/basic_l/infoAddBox";
import affirmBox from "@/components/main/common/basic_l/affirmBox";
import stripCount from "@/components/main/common/basic_l/stripCount";

export default {
  name: "personCensorBox",
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "电气运行专员",
          lat:113.21,
          lng: 35,
          time: "2019-10-21 12:01:54",
          remark: "这里是描述"
        },
        {
          id: 1,
          name: "电气运行专员",
          lat:113.21,
          lng: 35,
          time: "2019-10-21 12:01:54",
          remark: "这里是描述"
        },
        {
          id: 1,
          name: "电气运行专员",
          lat:113.21,
          lng: 35,
          time: "2019-10-21 12:01:54",
          remark: "这里是描述"
        }
      ],
      // 搜索框的值
      search: "",
      perpage: 10, //每页数据条数
    };
  },
  computed: {
    tables: function() {
      let search = this.search.toLowerCase();
      if (search) {
        return this.tableData.filter(function(dataNews) {
          return Object.keys(dataNews).some(function(key) {
            return (
              String(dataNews[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.tableData;
    }
  },
  methods: {
    // 换页回调函数
    pageChange(val) {
      console.log(val);
    },
    // 搜索框改变的返回触发函数
    searchChangeBack(res) {
      if (res === "") {
        this.search = res;
      }
    },
    // 搜索框点击的返回触发函数
    searchClickBack(res) {
      console.log(res);
      this.search = res;
    },
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
    // 提示信息,text:展示文字（必须），fc：字体颜色（默认亮青），bgc：背景颜色（默认蓝黑）,interval：显示时间
    hint(text,fc,bgc,interval){
      let _fc=fc || "rgb(0, 255, 255)";
      let _bgc=bgc || "rgb(5, 33, 69)";
      let hint=document.createElement('div');
      let _interval=interval || 3000;
      hint.className="_hintBox";
      hint.innerText=text;
      $('body').append(hint);
      $(hint).css({"color":_fc,'backgroundColor':_bgc,'boxShadow':'0.5px 0.5px 4px '+_fc});
      setTimeout(()=>{
        $(hint).addClass("_hintBox_show");
      },300);
      setTimeout(()=>{
        $(hint).removeClass("_hintBox_show");
        setTimeout(()=>{
          $(hint).remove();
        },300);
      },_interval);
    },
  },
  created(){
  },
  components: {
    // theBtn,
    // theTable,
    searchBox,
    pagination,
    // infoAddBox,
    affirmBox,
    'strip-count':stripCount,
  }
};
</script>


<style lang='less' scoped>
@import "../../../assets/ship_system/less/personCensor.less";
</style>

<style lang='less'>
/* 1080px下*/
@fontColor:rgb(89,252,255);
@bgColor:rgb(5, 33, 69);
@fontColorF:rgba(0, 255, 255, 0);
/* 1080px下 */
.personCensorBox{
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #04405f;
  }
  // 除去表格下的白线
  .el-table::before{
    height: 0;
  }
  .has-gutter tr th {
    height: 80px;
    background-color: @bgColor;
    color: @fontColor;
  }
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
  .el-table__row td {
    height: 60px;
    background-color: @bgColor;
    color: @fontColor;
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
  .thebody table{
    width: 100%!important;
    background-color: @bgColor;
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

@media screen and (max-height: 1080px) {
  .personCensorBox{
    .has-gutter tr th {
      height: 80px;
    }
    .el-table__row td {
      height: 64px;
    }
  }
}
@media screen and (max-height: 960px) {
  .personCensorBox{
    .has-gutter tr th {
      height: 70px;
    }
    .el-table__row td {
      height: 54px;
    }
  }
}
@media screen and (max-height: 840px) {
  .personCensorBox{
      
    .has-gutter tr th {
      height: 60px;
    }
    .el-table__row td {
      height: 40px;
    }
  }
}
</style>
