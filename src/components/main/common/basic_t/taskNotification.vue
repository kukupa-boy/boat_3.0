<template>
  <!--任务通知-->
  <div class="taskNotificationBox">
    <div>
      <div class="left">
        <div class="taskNotification">
          <div class="taskNotificationChild">
            <div class="taskNotificationHeader">
              <el-input placeholder="请输入任务名称" suffix-icon="el-icon-search" class="taskNotificationHeaderInput"  v-model="search" clearable>
              </el-input>
              <!--<searchBox class="alarmMessageHeaderInput" hint="请输入警报船队"></searchBox>-->
            </div>
            <div class="tabPage">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="任务通知"  name="first">
                  <ul class="taskListUl">
                    <li :class="flag===index?'taskListLi':'taskListLi1'"  v-for="(item,index) in operationList" :key="index" @click="all(index)"><span>{{item}}</span></li>
                  </ul>
                  <el-table
                    :data="tableData"
                    style="width: 100%"
                    >
                    <el-table-column
                      type="index"
                      label="序号"
                      header-align="center"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="taskName"
                      label="任务名称"
                      header-align="center"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="effectiveTime"
                      label="生效时间"
                      header-align="center"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="expirationTime"
                      label="失效时间"
                      header-align="center"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="任务类型"
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
                        <el-tooltip placement="top" content="这是详情" effect="light">
                          <span  @click="open();edit(scope.$index, scope.row)"><i class="bor icon-21"></i></span>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="我的提交"  name="second">
                  <ul class="taskListUl">
                    <li :class="flag===index?'taskListLi':'taskListLi1'"  v-for="(item,index) in operationList" :key="index" @click="all(index)"><span>{{item}}</span></li>
                  </ul>
                  <el-table
                    :data="tableData"
                    style="width: 100%"
                    >
                    <el-table-column
                      type="index"
                      label="序号"
                      header-align="center"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="taskName"
                      label="任务名称"
                      header-align="center"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="effectiveTime"
                      label="生效时间"
                      header-align="center"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="expirationTime"
                      label="失效时间"
                      header-align="center"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="任务类型"
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
                        <el-tooltip placement="top" content="这是详情" effect="light">
                          <span  @click="open();edit(scope.$index, scope.row)"><i class="bor icon-21"></i></span>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </div>
            <!--这是分页-->
            <div class="page">
              <Paging v-show="total>0" :total="total" :page.sync="page" :limit.sync="limit" @childFn="parentFn"></Paging>
            </div>
            <taskNotificationFrame :show.sync="show" :title1="title1" :sonData="sonData"></taskNotificationFrame>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-top">
          <div><i class="el-icon-caret-right"></i><span>工单类型</span></div>
          <div>
            <taskListType></taskListType>
          </div>
        </div>
        <div class="right-bottom">
          <div><i class="el-icon-caret-right"></i><span>工单完成</span></div>
          <div>
            <taskListComplete></taskListComplete>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Paging from "./Paging.vue"
  import taskListType from "../../task_manager/taskList/taskListType.vue"
  import taskListComplete from "../../task_manager/taskList/taskListComplete.vue"
  import taskNotificationFrame from "./taskNotificationFrame.vue"
  export default {
    name: "taskNotification",
    components: {
      Paging,
      taskNotificationFrame,
      taskListComplete,
      taskListType
    },
    data() {
      return {
        show: false,//详情弹框
        centerDialogVisible: false,//添加弹框
        dialogVisible:false,//控制弹框的隐藏和显示
        title1:'',//用于确定弹框的title
        data:'',//存放用户登录的一些值
        // currentPage:'',//当前页
        total:0,//数据总条数
        page: 1,//默认显示第1页
        limit: 7,//默认一次显示10条数据
        url:'',//存放url地址
        operationList:['所有工单','已完成','未完成'],//获取操作数据
        flag:0,//控制选中类
        ulTitle:'',//用于存放标签页的label
        sonData:{},//传给子组件的对象
        search:'',//用于全局搜索
        activeName: 'first',//默认显示任务通知
        tableList:[],//操作表格数据
        //存放表格数据
        tableData: [{
          relationId:'',
          taskName:'',
          effectiveTime:'',
          expirationTime:'',
          type:'',
        },
          ]
      }
    },
    created(){
      console.log(localStorage.getItem("userInfo"));
      this.data=JSON.parse(localStorage.getItem("userInfo"))
    },
    mounted(){
      this.getTaskNoticeData1(this.data.id,this.limit);
    },
    computed:{
      // tables:function(){
      //   let search=this.search;
      //   if(search){
      //     return  this.tableData.filter(function(dataNews){
      //       return Object.keys(dataNews).some(function(key){
      //         return String(dataNews[key]).toLowerCase().indexOf(search) > -1
      //       })
      //     })
      //   }
      //   return this.tableData
      // }
    },
    methods: {
      //获取任务通知数据
      getTaskNoticeData(x,y,z){
        console.log(this.data.id);
        this.url=`/api/task/taskNotice?loginId=${x}&&pageSize=${y}&&status=${z}`;
        this.axios.get(this.url).then((res)=>{
          console.log(res.data);
          this.tableData=res.data.data.list;
          this.total=res.data.data.total;
        }).catch((err)=>{
          console.log(err);
        })
      },
      //获取任务提交数据
      getTaskSubData(x,y,z){
        console.log(this.data.id);
        this.url=`/api/task/taskMySub?loginId=${x}&&pageSize=${y}&&status=${z}`;
        this.axios.get(this.url).then((res)=>{
          console.log(res.data);
          this.tableData=res.data.data.list;
          this.total=res.data.data.total;
        }).catch((err)=>{
          console.log(err);
        })
      },
      //获取任务通知数据
      getTaskNoticeData1(x,y){
        console.log(this.data.id);
        this.url=`/api/task/taskNotice?loginId=${x}&&pageSize=${y}`;
        this.axios.get(this.url).then((res)=>{
          console.log(res.data);
          this.tableData=res.data.data.list;
          this.total=res.data.data.total;
        }).catch((err)=>{
          console.log(err);
        })
      },
      //获取任务提交数据
      getTaskSubData1(x,y){
        console.log(this.data.id);
        this.url=`/api/task/taskMySub?loginId=${x}&&pageSize=${y}`;
        this.axios.get(this.url).then((res)=>{
          console.log(res.data);
          this.tableData=res.data.data.list;
          this.total=res.data.data.total;
        }).catch((err)=>{
          console.log(err);
        })
      },
      //获取工单数据
      all(index){
        let t = this;
        t.flag = index;
        console.log(index);
        console.log(this.ulTitle);
        if(this.ulTitle==='我的提交'){
          switch(index) {
            case 0:
              this.getTaskSubData1(this.data.id,this.limit);
              break;
            case 1:
              this.getTaskSubData(this.data.id,this.limit,3);
              break;
            case 2:
              this.getTaskSubData(this.data.id,this.limit,2);
              break;
          }
        }else{
          switch(index) {
            case 0:
              this.getTaskNoticeData1(this.data.id,this.limit);
              break;
            case 1:
              this.getTaskNoticeData(this.data.id,this.limit,3);
              break;
            case 2:
              this.getTaskNoticeData(this.data.id,this.limit,2);
              break;
          }
        }
      },
      // tableRowClassName({row, rowIndex}) {
      //   if (rowIndex === 1) {
      //     return 'warning-row';
      //   } else if (rowIndex === 3) {
      //     return 'success-row';
      //   }
      //   return '';
      // },
      //子组件传给父组件的值这是分页获取数据
      parentFn(payload) {
        // this.currentPage = payload;
        console.log(payload);
        let url=this.url+'&&pageIndex='+payload;
        this.axios.get(url).then((res)=>{
          console.log(res.data);
          this.tableData=res.data.data.list;
          // this.total=res.data.data.total;
        }).catch((err)=>{
          console.log(err);
        })
        // pageIndex
      },
      // 对应行的下标
      See(index, row) {
        console.log(index, row);
      },
      //打开弹框
      open () {
        this.show = true;
      },
      // 详情/修改数据
      edit(index,row){
        this.title1 ='任务详情';
        // console.log(index, row);
        this.sonData=row;
      },
      //这是表头标签页的点击事件
      handleClick(tab, event) {
        console.log(tab);
        console.log(tab.label);
        if(tab.label==='任务通知'){
          this.ulTitle=tab.label;
          this.getTaskNoticeData1(this.data.id,this.limit);
        }else{
          this.ulTitle=tab.label;
          this.getTaskSubData1(this.data.id,this.limit);
        }
      }
    },
  }
</script>

<style scoped>
  @import "../../../../assets/public/icomoon/style.css";
  .taskNotificationBox{
    width: 100%;
    height: 100%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .taskNotificationBox>div{
    width: 80%;
    height: 80%;
    margin-left:8%;
    display: flex;
    flex-wrap: nowrap;
    background-image: url("../../../../assets/public/img/border.png");
    background-size: 100% 100%;
  }
  .left{
    width: 79%;
    height: 100%;
  }
  .taskNotification{
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 10px;
    position: relative;
  }
  .taskNotificationChild{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    /*border: 1px solid red;*/
  }
  .taskNotificationHeader{
    height: 60px;
    width: 100%;
    line-height: 60px;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0);
  }
  .taskNotificationHeaderInput{
    width: 20%;
    height: 40px;
    margin-left: 1.5%;
    line-height: 40px;
    /*border: 1px solid red;*/
  }
  @font-face {
    font-family: 'icomoon';
    src: url('../../../../assets/public/icomoon/fonts/icomoon.eot');
    src: url('../../../../assets/public/icomoon/fonts/icomoon.eot?#iefix') format('embedded-opentype'),
    url('../../../../assets/public/icomoon/fonts/icomoon.woff') format('woff'),
    url('../../../../assets/public/icomoon/fonts/icomoon.ttf') format('truetype');
  }
  .taskListUl{
   color: #59fdff;
  }
  .taskListLi{
    background-color: rgba(89, 253, 255,0.2);
    border-image:linear-gradient(to right, #155372,#59fdff,#155372) 1 10;
  }
  .taskListLi1{
    background-color: rgba(89, 253, 255,0);
    border-image:linear-gradient(to right, #155372,#59fdff,#155372) 1 10;
  }
  .taskListUl li{
    width: 80px;
    height: 20px;
    line-height: 20px;
    list-style: none;
    float: left;
    text-align: center;
    /*margin-left: 1%;*/
    margin-right: 2%;
  }

  .page{
    position: absolute;
    bottom: 60px;
    left: 0;
    right: 0;
    margin: auto;
    width: 75%;
    text-align: center;
    /*border: 1px solid red;*/
  }
  .bor{
    display: inline-block;
    box-sizing: border-box;
    border-radius: 10px;
    /*border: 2px solid  #59fdff;*/
    padding: 5px;
    font-size: 14px;
    color: #59fdff;
  }
  .right{
    width: 21%;
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
    padding: 20px 0;
    box-sizing: border-box;
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
  .taskNotificationHeaderInput .el-input__inner {
    border-radius: 40px;
    height: 30px;
    line-height: 30px;
    background-color:transparent;
    display: inline-block;
    border: 1px solid #59fdff;
    color: #59fdff;
  }
  .tabPage .el-tabs__nav-wrap::after{
    background-color: #59fdff!important;
    background-image:linear-gradient(to right, #155372, #4ab6b8,#155372);
  }
  .tabPage  .el-tabs__nav{
    margin-left: 1.5%;
  }
  .tabPage .el-tabs__item.is-active{
    color:  #59fdff;
  }
  .tabPage .el-tabs__item{
    color: rgba(81, 225, 227, 0.86);
  }
  .tabPage .el-tabs__active-bar{
    background-color: #59fdff;
  }
  .tabPage .el-tabs__content table{
    width: 100% !important;
    background-color: transparent;
  }
  .tabPage .el-table, .el-table__expanded-cell{
    background-color: transparent;
  }
  .tabPage  .el-table thead{
    color: #59fdff!important;
    background-color: transparent;
  }
  .tabPage .el-table th,.tabPage .el-table tr{
    color: #59fdff;
    border-bottom: 1px solid #59fdff;
    border-image:linear-gradient(to right, #155372,#59fdff,#155372) 1 10;
    background-color: transparent;
  }
  .tabPage .el-table td{
    border-bottom: 1px solid #59fdff;
    border-image:linear-gradient(to right, #155372,#59fdff,#155372) 1 10;
  }
  .tabPage .el-table::before{
    background-color: transparent;
    border-bottom: 1px solid #59fdff;
    border-image:linear-gradient(to right, #155372,#59fdff,#155372) 1 10;
    /*background-image: linear-gradient(#253c79,#59fdff,#253c79);*/
  }

  .tabPage .el-table__body tr:hover>td{
    background-color: rgba(51, 131, 133, 0.73) !important;
    /*background-image:linear-gradient(to right, #155372, #4ab6b8,#155372);*/
  }
</style>
