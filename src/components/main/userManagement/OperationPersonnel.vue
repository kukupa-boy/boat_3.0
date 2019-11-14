<template>
    <!--作业人员-->
<div class="operationPersonnel">
  <!--这是左边-->
  <div class="left">
    <div class="leftHeader">
      <el-input placeholder="请输入姓名/账号" suffix-icon="el-icon-search" class="leftHeaderInput"  v-model="search" clearable>
      </el-input>
      <div  @click="open();add()" class="leftAdd"><span>新增</span></div>
    </div>
    <div class="operationPersonnelTable">
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column
          prop="SerialNum"
          label="序号"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="headPortrait"
          label="头像"
          header-align="center"
          align="center"
        >
          <!--这是显示头像-->
          <template slot-scope="scope">
            <!--<img :src="scope.row.headPortrait"  class="head_pic"/>-->
            <el-popover
              placement="right-start"
              title=""
              popper-class="elasticFrame"
              offset="1 3"
              trigger="click">
              <img :src="scope.row.headPortrait"/>
              <img slot="reference" :src="scope.row.headPortrait" :alt="scope.row.headPortrait"  class="head_pic" style="max-height: 50px;max-width: 130px">
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="accountNumber"
          label="账号"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="personStatus"
          label="人员状态"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
              <span :class="scope.row.style?'org':'blue'">
                {{scope.row.personStatus}}
              </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="post"
          label="岗位"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop=""
          label="操作"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <div class="center">
              <el-tooltip placement="top" :content="scope.row.style?txt1:txt" :class="scope.row.style?'bor3':'bor2'" effect="light">
                <span  @click="prohibit(scope.$index,scope.row)"><i class="icon-23"></i></span>
              </el-tooltip>
              <el-tooltip placement="top" content="详情/编辑" effect="light" class="bor">
                <span  @click="open();edit(scope.$index, scope.row)"><span class=" icon-21"></span></span>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--这是分页-->
    <div class="page">
      <Paging v-show="total>0" :total="total" :page.sync="page" :limit.sync="limit" @childFn="parentFn"></Paging>
    </div>
    <OperatorCartridgeFrame :show.sync="show" :title1="title1" :sonData="sonData"></OperatorCartridgeFrame>
  </div>
  <!--这是右边-->
  <div class="right">
    <div class="right-top">
      <div><i class="el-icon-caret-right"></i><span>人员状态</span></div>
      <div>
        <OperationPersonnelState></OperationPersonnelState>
      </div>
    </div>
    <div class="right-bottom">
      <div><i class="el-icon-caret-right"></i><span>状态详情</span></div>
      <div>
        <OperationPersonnelStateDetails></OperationPersonnelStateDetails>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import Paging from "../../main/common/basic_t/Paging.vue"
  import OperatorCartridgeFrame from "./OperatorCartridgeFrame.vue"
  import OperationPersonnelState from "./OperationPersonnelState.vue"
  import OperationPersonnelStateDetails from "./operationPersonnelStateDetails.vue"
    export default {
      name: "OperationPersonnel",
      components: {
        Paging,
        OperatorCartridgeFrame,
        OperationPersonnelState,
        OperationPersonnelStateDetails
      },
      data() {
        return {
          show: false,
          dialogVisible:false,//控制弹框的隐藏和显示
          title1:'',//用于确定弹框的title
          sonData:{},//传给子组件的对象
          txt:'禁用',
          txt1:'启用',
          total:1,//数据总条数
          page: 1,//默认显示第1页
          limit: 8,//默认一次显示10条数据
          search:'',//用于全局搜索
          tableList:[],//操作表格数据
          //存放表格数据
          tableData: [{
            SerialNum:'1',//工号
            headPortrait:require('../../../assets/person_system/image/image_t/portrait1.jpg'),//头像
            age:'25',//年龄
            name:'小白',//员工姓名
            gender:'女',//性别
            accountNumber:'VRBQ6',//账号
            post:'电气运行专员',//岗位
            personStatus:'启用',//人员状态
            phone:'9090980',//员工电话
            style:false,//存放class类名
            // date: '2016-05-02',//时间
          },
            {
              SerialNum:'2',//工号
              headPortrait:require('../../../assets/person_system/image/image_t/portrait2.jpg'),//头像
              age:'26',//年龄
              name:'小黑',//员工姓名
              gender:'男',//性别
              accountNumber:'VRBQ7',//账号
              post:'电气巡检专员',//岗位
              personStatus:'启用',//人员状态
              phone:'9090940',//员工电话
              style:false,//存放class类名
              // date: '2016-05-02',//时间
            },
            {
              SerialNum:'3',//工号
              headPortrait:require('../../../assets/person_system/image/image_t/portrait3.jpg'),//头像
              age:'20',//年龄
              name:'小彭',//员工姓名
              gender:'女',//性别
              accountNumber:'VRBQ7',//账号
              post:'设备运行专员',//岗位
              personStatus:'启用',//人员状态
              phone:'9090940',//员工电话
              style:false,//存放class类名
              // date: '2016-05-02',//时间
            },
            {
              SerialNum:'4',//工号
              headPortrait:require('../../../assets/person_system/image/image_t/portrait4.jpg'),//头像
              age:'21',//年龄
              name:'小范',//员工姓名
              gender:'女',//性别
              accountNumber:'VRBQ7',//账号
              post:'设备巡检专员',//岗位
              personStatus:'禁用',//人员状态
              phone:'9090940',//员工电话
              style:true,//存放class类名
              // date: '2016-05-02',//时间
            },]
        }
      },
      created(){
        this.tableList = this.tableData;
        //这是判断一页显示几条数据
        let arr=[];
        if(this.tableData.length>9){
          for(let i=0;i<9;i++){
            arr.push(this.tableData[i]);
          }
          this.tableData =arr;
        }
      },
      computed:{
        tables:function(){
          let search=this.search;
          if(search){
            return  this.tableData.filter(function(dataNews){
              return Object.keys(dataNews).some(function(key){
                return String(dataNews[key]).toLowerCase().indexOf(search) > -1
              })
            })
          }
          return this.tableData
        }
      },
      methods: {
        tableRowClassName({row, rowIndex}) {
          if (rowIndex === 1) {
            return 'warning-row';
          } else if (rowIndex === 3) {
            return 'success-row';
          }
          return '';
        },
        //子组件传给父组件的值
        parentFn(payload) {
          // this.currentPage = payload;
          console.log(payload);
          this.tableData = payload
        },
        // 对应行的下标
        See(index, row) {
          console.log(index, row);
        },
        //打开弹框
        open () {
          this.show = true;
        },
        //新增数据
        add(){
          this.title1 ='添加用户'
        },
        // 详情/修改数据
        edit(index,row){
          this.title1 ='用户信息'
          // console.log(index, row);
          this.sonData=row;
        },
        //禁用/启用
        prohibit(index,row){
          // console.log(index, row);
          let statu='';
          if(row.style==='禁用'){
            statu='启用'
          }else{
            statu='禁用';
          }
          this.$confirm(`此操作将${statu}该文件, 是否继续?`, `${statu}`, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: `${statu}成功！`
            });
            for(let i=0;i<this.tableData.length;i++){
              if(index === i){
                row.style=!row.style;
                if(row.style){
                  this.tableData[index].personStatus='禁用';
                }else{
                  this.tableData[index].personStatus='启用';
                }
              }
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: `已取消${statu}！`
            });
          });
        }
      },
    }
</script>

<style scoped>
  @import "../../../assets/public/icomoon/style.css";
  .operationPersonnel{
    height: 100%;
    width: 100%;
    padding: 20px;
    /*border-radius: 10px;*/
    box-sizing: border-box;
    display: flex;
    position: relative;
    /*border: 1px solid red;*/
    /*background-color: rgb(1,34,73);*/
    background-image: url("../../../assets/public/img/border.png");
    background-size: 100% 100%;
  }
  .left{
    height: 100%;
    width: 80%;
    padding: 20px;
    border-radius: 10px;
    box-sizing: border-box;
    position: relative;
    /*border: 1px solid red;*/
    background-color: transparent;
  }
  .leftHeader{
    height: 50px;
    width: 100%;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0);
  }
  .leftHeaderInput{
    width: 20%;
    height: 30px;
    border-radius: 30px;
    line-height: 30px;
    /*border: 1px solid red;*/
  }
  @font-face {
    font-family: 'icomoon';
    src: url('../../../assets/public/icomoon/fonts/icomoon.eot');
    src: url('../../../assets/public/icomoon/fonts/icomoon.eot?#iefix') format('embedded-opentype'),
    url('../../../assets/public/icomoon/fonts/icomoon.woff') format('woff'),
    url('../../../assets/public/icomoon/fonts/icomoon.ttf') format('truetype');
  }
  .head_pic{
    height: 30px;
    width: 30px;
    border-radius: 30px;
  }
  .elasticFrame img{
    width: 400px;
    height: 400px;
    overflow: hidden;
  }
  .iconfont{
    font-family: "icomoon" !important;
    font-size: 36px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .leftAdd{
    width: 70px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #59fdff;
    color: #59fdff;
    /*border: 1px solid red;*/
    /*margin-right: 10px;*/
    border-radius: 40px;
    position: absolute;
    right: 10px;
    top: 0;
    cursor: pointer;
  }
  .page{
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    margin: auto;
    width: 85%;
    text-align: center;
  }
  .center{
    width: 90px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .bor,.bor2,.bor3{
    display: inline-block;
    padding: 1px 3px 3px 3px;
    height: 28px;
    width: 28px;
    margin-right: 5px;
    box-sizing: border-box;
    font-size: 20px;
    text-align: center;
    border-radius: 10px;
  }
  .bor{
    /*border: 2px solid #59fdff;*/
    color: #59fdff;
    /*padding: 5px;*/
    padding: 2px 4px 4px 4px;
    font-size: 14px;
    position: absolute;
    top: 10px;
    left: 50px;
  }
  .bor2{
    /*border: 2px solid #59fdff;*/
    color: #59fdff;
    /*font-size: 18px;*/
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .blue{
    color: #59fdff;
  }
  .org{
    color: #ff861a;
  }
  .bor3{
    /*border: 2px solid #ff861a;*/
    color: #ff861a;
    font-size: 20px;
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .right{
    width: 20%;
    height: 100%;
    color: white;
    /*border: 1px solid red;*/
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
  }
  .right-top{
    /*color: white;*/
    width: 100%;
    height: 50%;
    position: relative;
    /*background-color: #36c0ff;*/
  }
  .right-top >:nth-child(1){
    height: 10%;
    width: 100%;
    /*background-color: red;*/
  }
  .right-bottom{
    /*color: white;*/
    width: 100%;
    height: 50%;
    /*background-color: #31bd48;*/
    position: relative;
  }
  .right-bottom >:nth-child(1){
    height: 10%;
    width: 100%;
    /*background-color: red;*/
  }
</style>
<style>
  /*这是表格覆盖样式*/
  .operationPersonnelTable >div{
    background-color: transparent;
    color: #59fdff!important;
  }
  .operationPersonnelTable  .el-table thead{
    color: #59fdff!important;
    background-color: transparent;
  }
  .operationPersonnelTable .el-table th,.operationPersonnelTable .el-table tr{
     border-bottom: 1px solid #59fdff;
     border-image:linear-gradient(to right, #155372,#59fdff,#155372) 1 10;
     background-color: transparent;
    }
  .operationPersonnelTable .el-table td{
    border-bottom: 1px solid #59fdff;
    border-image:linear-gradient(to right, #155372,#59fdff,#155372) 1 10;
  }
  .operationPersonnelTable .el-table::before{
    background-color: transparent;
    border-bottom: 1px solid #59fdff;
    border-image:linear-gradient(to right, #155372,#59fdff,#155372) 1 10;
    /*background-image: linear-gradient(#253c79,#59fdff,#253c79);*/
  }
  .operationPersonnelTable table{
    width: 100%!important;
    /*margin-left: -40px;*/
  }
  .operationPersonnelTable .el-table__body tr:hover>td{
    background-color: rgba(51, 131, 133, 0.73) !important;
    /*background-image:linear-gradient(to right, #155372, #4ab6b8,#155372);*/
  }
  .el-table .warning-row {
    /*background: oldlace;*/
  }
  .el-table .success-row {
    /*background: #f0f9eb;*/
  }
  . .el-table{
    background-color: transparent;
  }

  /*//这是头部覆盖样式*/
  .leftHeaderInput .el-input__inner{
    height: 30px;
    border-radius: 40px;
    background-color: transparent;
    color: #59fdff;
    border: 1px solid #59fdff;
    line-height: 30px;
  }
  .leftHeaderInput input::-webkit-input-placeholder{
    font-size: 12px;
    color: #59fdff;
  }
  .leftHeaderInput input:-ms-input-placeholder{
    font-size: 12px;
    color: #59fdff;
  }
  .leftHeaderInput input::-moz-placeholder{
    font-size: 12px;
    color: #59fdff;
  }
  .leftHeaderInput .el-input__icon{
    line-height: normal!important;
    color: #59fdff;
  }
</style>
