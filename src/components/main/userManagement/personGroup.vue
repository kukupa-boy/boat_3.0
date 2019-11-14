<!-- 用户管理-用户角色 -->

<template>
  <div class="personGroupBox">


    <div class="pgb-left">

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
        <div class="th-add" @click="openAdd=true">
          <theBtn content="添加部门" bgcolor="rgb(5, 33, 69)" fontcolor="rgb(0, 255, 255)" border="rgb(0, 255, 255)"></theBtn>
        </div>
      </div>

      <div class="thebody">
        <el-table
          :data="tables"
          :header-cell-style="{padding:'0',textAlign:'center'}"
          :cell-style="{padding:'0',textAlign:'center'}">
          <el-table-column prop="id" label="序号" width="80px"></el-table-column>
          <el-table-column prop="name" label="部门名称"></el-table-column>
          <el-table-column prop="parentGroup" label="上级部门" width="100px"></el-table-column>
          <el-table-column prop="creatTime" label="创建时间"></el-table-column>
          <el-table-column prop="ststus" label="状态" width="80px">
            <template slot-scope="scope">
              <span v-if="scope.row.status">正常</span>
              <span v-else style="color:rgb(215,156,33);">冻结</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template slot-scope="scope">
              <el-tooltip
                :content="scope.row.status?'冻结':'已冻结'"
                placement="left"
                effect="light"
                :open-delay="300"
                :enterable="false">
                <el-button type="text" size="small" @click="banIt(scope.$index,scope.row.status)">
                  <i :class="{'fa fa-lock':true,'locked':!scope.row.status}"></i>
                </el-button>
              </el-tooltip>

              <el-tooltip
                content="删除"
                placement="right"
                effect="light"
                :open-delay="300"
                :enterable="false">
                <el-button type="text" size="small" @click="deleteIt(scope.$index)">
                  <i class="fa fa-trash-o"></i>
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="thefoot">
        <pagination :perpage="perpage" :pagesize="tableData.length" @currentPageChange="pageChange"></pagination>
      </div>

    </div>


    <div class="pgb-right">
      <div>
        <p><i class="fa fa-empire"></i><span>部门信息</span></p>
        <strip-count :data="stripData" size="30" stripSize="10"></strip-count>
      </div>
    </div>




    <infoAddBox :show="openAdd" headInfo="添加部门" @back="addBack">
      <template v-slot:content>
        <div class="slotBody">
          <div class="sb-first sb-input">
            <span>分组名称</span>
            <div>
              <el-input placeholder="请输入内容" v-model="addData.name" clearable size="small"></el-input>
            </div>
          </div>


          <div>
            <span>上级部门</span>
            <div>
              <el-select v-model="addData.parentGroup" filterable placeholder="请选择">
                  <el-option
                    v-for="item in groupList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </div>
          </div>


          <div class="sb-textarea">
            <span>分组描述</span>
            <div>
              <el-input type="textarea" placeholder="请输入内容" 
              :rows="2" v-model="addData.describe"></el-input>
            </div>
          </div>
        </div>
      </template>
    </infoAddBox>

    <affirmBox :show="affirmDelete" type="dark" content="确定要删除吗？" @back="affirmDeleteBack"></affirmBox>

    <affirmBox :show="affirmBan" type="dark" :content="banContent" @back="affirmBanBack"></affirmBox>


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
  name: "personManagerL2",
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "电气运行专员",
          parentGroup: "维修部",
          creatTime: "2019-10-21 12:01:54",
          describe: "这里是描述",
          status:true,
        },
      ],
      // 存放编辑信息的临时容器
      updateData: [],
      // 搜索框的值
      search: "",
      // 添加分组的中间容器对象
      addData: {
        describe: "",
        name: "",
        parentGroup: "",
        status:true,//默认状态为true
      },
      perpage: 10, //每页数据条数
      openAdd: false,

      // 上级部门列表
      groupList:[
        { value: "维修部",label: "维修部"},
        { value: "后勤部",label: "后勤部"},
        { value: "测试部",label: "测试部"},
        { value: "安装部",label: "安装部"},
        { value: "监测部",label: "监测部"},
      ],
      // 删除项的index
      deleteIndex: undefined,
      // 禁用项的index
      banIndex:undefined,
      banContent:"",
      // 确认删除框
      affirmDelete: false,
      // 确认禁用框
      affirmBan:false,
      // 右侧条形数据
      stripData:[
        {
          label:'满洲里',
          value: 0,
          unit:'个',
        },
        {
          label:'米子尔',
          value: 26,
          unit:'个',
        },
        {
          label:'梅子色',
          value: 36,
          unit:'个',
        },
        {
          label:'梅子色',
          value: 36,
          unit:'个',
        },
        {
          label:'明珠思',
          value: 43,
          unit:'个',
        },
        {
          label:'米子尔',
          value: 26,
          unit:'个',
        },
        {
          label:'梅子色',
          value: 36,
          unit:'个',
        },
        {
          label:'明珠思',
          value: 43,
          unit:'个',
        }
      ],
      colorCan:[
        'rgb(236, 112, 107)',
        'rgb(235, 159, 88)',
        'rgb(236, 211, 69)',
        'rgb(169, 202, 50)',
        'rgb(126, 209, 70)',
        'rgb(86, 212, 143)',
        'rgb(87, 211, 194)',
        'rgb(87, 165, 211)',
        'rgb(102, 134, 223)',
        'rgb(147, 124, 231)',
        'rgb(192, 124, 231)',
        'rgb(231, 124, 213)',
        'rgb(231, 124, 178)'
      ],
      newData: {}
    };
  },
  computed: {
    tables: function() {
      var search = this.search.toLowerCase();
      
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
    saveData(prop, value, e) {
      if (value) {
        this.newData[prop] = value;
      } else {
        this.newData[prop] = e.target.value;
      }
    },
    // 换页回调函数
    pageChange(val) {
      console.log(val);
    },
    appendData() {
      this.newData.id = this.tableData.length + 1;
      this.tableData.push({ ...this.newData });
      this.openAdd = false;
    },

    selectAll(e) {
      let ele=$(e.target);
      if(ele.attr("isChecked")==="0"){
        ele.attr("isChecked","1").addClass("checkedAll");
        $(".isBasicRoot").attr("isChecked","1").addClass("isChecked");
      }else{
        ele.attr("isChecked","0").removeClass("checkedAll");
        $(".isBasicRoot").attr("isChecked","0").removeClass("isChecked");
      }
    },
    rootBtn(e){
      let ele=$(e.target);
      let isChecked=ele.attr("isChecked");
      if(isChecked==="1"){
        ele.attr("isChecked","0").removeClass("isChecked");
      }else{
        ele.attr("isChecked","1").addClass("isChecked");
      }
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
    // 删除分组的click函数
    deleteIt(index) {
      this.affirmDelete = true;
      this.deleteIndex = index;
    },
    // 禁用此项
    banIt(index,status) {
      if(!status){
        this.banContent="确定要解除冻结吗？";
      }else{
        this.banContent="确定要冻结吗？";
      }
      this.affirmBan = true;
      this.banIndex=index;
      
    },
    //‘是否删除面板’按钮返回
    affirmDeleteBack(res) {
      this.affirmDelete = false;
      if (res === "sure") {
        if (this.deleteIndex !== undefined) {
          this.tableData.splice(this.deleteIndex, 1);
          this.hint("删除成功！")
        }
      } else {
        this.deleteIndex = undefined;
      }
    },
    affirmBanBack(res){
      this.affirmBan = false;
      if(res==="sure"){
        if(this.banIndex!==undefined){
          this.tableData[this.banIndex].status=!this.tableData[this.banIndex].status;
        }
      }else{
        this.banIndex = undefined;
      }
    },
    // 添加分组返回的函数
    addBack(res) {
      if (res === "cancel") {
        this.openAdd = false;
        this.addData.name = "";
        this.addData.parentGroup = "";
      } else {
        if (!this.addData.name || !this.addData.parentGroup) {
          this.hint("请完善内容再提交！")
        } else {
          this.addData.creatTime = this.nowTime("datetime");
          this.addData.id = this.tableData[this.tableData.length - 1].id + 1;
          this.tableData.push(JSON.parse(JSON.stringify(this.addData)));
          this.openAdd = false;
          this.hint("添加成功！")
          this.addData.name = "";
          this.addData.parentGroup = "";
        }
      }
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
    // 随机颜色
    for(let i=0;i<this.stripData.length;i++){
      this.stripData[i].color=this.colorCan[~~(Math.random()*this.colorCan.length)];
      this.stripData[i].value=~~(Math.random()*160);
    }
  },
  mounted() {
  },
  components: {
    theBtn,
    theTable,
    searchBox,
    pagination,
    infoAddBox,
    affirmBox,
    'strip-count':stripCount,
  }
};
</script>


<style lang='less' scoped>
@import "../../../assets/ship_system/less/personGroup.less";
</style>

<style lang='less'>
/* 1080px下*/
@fontColor:rgb(89,252,255);
@bgColor:rgb(5, 33, 69);
@fontColorF:rgba(0, 255, 255, 0);
/* 1080px下 */
.personGroupBox{
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
  .slotBody > .sb-textarea textarea {
    border-radius: 0;
    resize: none;
  }
  .slotBody > .sb-input input {
    border-radius: 0;
  }
  .thebody table{
    width: 100%!important;
  }
  .el-input__inner,.el-textarea__inner{
    background-color: rgba(255, 255, 255, 0);
    color: @fontColor;
  }

  .el-button{
    border: 0;
  }
  // element 下拉菜单的样式
  .el-select{
    width: 100%;
    .el-input__icon{
      line-height: 24px;
    }
  }
}


// 滚动条样式
/* IE 浏览器 */
@hideColor:rgba(255, 255, 255, 0);
@lightColor:rgba(89, 252, 255, 0.3);
@halfColor:rgba(89, 252, 255, 0.5);
.personGroupBox .sb-textarea textarea{
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
.personGroupBox .sb-textarea textarea{
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
.personGroupBox{
  .sb-input input {
    border-radius: 0;
    height: 28px;
    line-height: 28px;
  }
  .thebody table{
    width: 100%!important;
  }
  .el-input__inner,.el-textarea__inner{
    background-color: rgba(255, 255, 255, 0);
    border: none;
    border-bottom: 1px dashed @halfColor;
    color: @fontColor;
    &:hover{
      border-color: @fontColor;
    }
    &:focus{
      border-color: @fontColor;
    }
    &::-webkit-input-placeholder { /* WebKit browsers */
      color: rgba(89, 252, 255, 0.7);
    }
    &::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: rgba(89, 252, 255, 0.7);
    }
    &:-ms-input-placeholder { /* Internet Explorer 10+ */
      color: rgba(89, 252, 255, 0.7);
    }  
  }
  .el-textarea__inner{
    
    border: 1px dashed @halfColor!important;
    // border-top: 1px solid rgba(89, 252, 255, 0.1);
  }
  .el-input__inner{
    height: 30px;
    line-height: 30px;
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
  .personGroupBox{

    .has-gutter tr th {
      height: 80px;
    }
    .el-table__row td {
      height: 64px;
    }
  }
}
@media screen and (max-height: 960px) {
  .personGroupBox{
      
    .has-gutter tr th {
      height: 70px;
    }
    .el-table__row td {
      height: 54px;
    }
  }
}
@media screen and (max-height: 840px) {
  .personGroupBox{
      
    .has-gutter tr th {
      height: 60px;
    }
    .el-table__row td {
      height: 40px;
    }
  }
}
</style>
