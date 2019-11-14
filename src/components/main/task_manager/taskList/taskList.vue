<template>
  <!--作业人员-->
  <div class="taskList">
    <div class="taskListLeft">
      <div class="leftHeader">
        <el-input placeholder="请输入姓名/账号"  suffix-icon="el-icon-search" class="leftHeaderInput"  v-model="search" clearable>
        </el-input>
        <!--<searchBox class="alarmMessageHeaderInput" hint="请输入警报船队"></searchBox>-->
        <div  @click="add()" class="leftAdd">新增</div>
      </div>
      <div class="taskListTable">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="序号"
            header-align="center"
            type="index"
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
              <div class="center">
                <!--<el-tooltip placement="top" content="任务下发" effect="light" class="bor">-->
                  <!--<span  @click="assignment(scope.$index, scope.row)"><i class="icon-14"></i></span>-->
                <!--</el-tooltip>-->
                <el-tooltip placement="top" content="任务详情" class="bor1" effect="light">
                  <span  @click="open();edit(scope.$index, scope.row)"><i class="icon-21"></i></span>
                </el-tooltip>
                <!--<el-tooltip placement="top" content="删除" class="bor2" effect="light">-->
                  <!--<span  @click="del(scope.$index,scope.row)"><i class="icon&#45;&#45;2"></i></span>-->
                <!--</el-tooltip>-->
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--这是分页-->
      <div class="page">
        <Paging v-show="total>0" :total="total" :page.sync="page" :limit.sync="limit" @childFn="parentFn"></Paging>
      </div>
      <taskListFrame :show.sync="show" :title1="title1" :sonData="sonData"></taskListFrame>
      <!--<addFrame :show.sync="centerDialogVisible"></addFrame>-->
      <!--这是选择作业人员弹框-->
        <el-dialog
          title="选择作业人员"
          :visible.sync="dialogVisible"
          :modal="false"
          width="20%"
          custom-class="elastic-box11"
          center>
          <!--这是复选框-->
          <div class="box-title"><span>选择作业人员</span></div>
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            style='margin:0 30% '
          >
            <!--:default-checked-keys="[5]"默认选中-->
          </el-tree>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
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
</template>

<script>
  import Paging from "../../common/basic_t/Paging.vue"
  import taskListFrame from "./taskListFrame.vue"
  import addFrame from "./addFrame.vue"
  import taskListType from "./taskListType.vue"
  import taskListComplete from "./taskListComplete.vue"
  export default {
    name: "taskList",
    components: {
      Paging,
      taskListFrame,
      addFrame,
      taskListType,
      taskListComplete
    },
    data() {
      return {
        show: false,//详情弹框
        // centerDialogVisible: false,//添加弹框
        dialogVisible:false,//控制弹框的隐藏和显示
        title1:'',//用于确定弹框的title
        sonData:{},//传给子组件的对象
        total:0,//数据总条数
        page: 1,//默认显示第1页
        limit: 8,//默认一次显示10条数据
        search:'',//用于全局搜索
        // src:require('../../../../assets/public/img/fengxiang.svg'),
        data1:'',//存放用户登录的一些值
        tableList:[],//操作表格数据
        //存放表格数据
        tableData: [{
          id:'1',//工号
          taskName:'VRBQ6',//任务名称
          effectiveTime:'2019.10.17',//生效时间
          expirationTime:'2019',//失效时间
          type:'普通任务',//任务类型
          creationTime:'19-10-16 10:40',//创建时间
          taskStatus:'',//任务状态
          overdue:'',//逾期
        }],
        //复选框
        data: [{
          id: 1,
          label: '全选',
          children: [{
            id: 3,
            label: '电气运行专责',
            children: [{
              id: 4,
              label: '电气运行专员',
              children:[
                {
                  id: 8,
                  label: '小刘',
                },
                {
                  id: 9,
                  label: '小张',
                },
                {
                  id: 10,
                  label: '小李',
                }
              ]
            }, {
              id: 5,
              label: '电气管理专员',
              // disabled: true
            }]
          }, {
            id: 2,
            label: '设备运行专责',
            // disabled: true,
            children: [{
              id: 6,
              label: '设备管理专员'
            }, {
              id: 7,
              label: '设备运行专员',
              // disabled: true
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    created(){
      // console.log(localStorage.getItem("userInfo"));
      this.data1=JSON.parse(localStorage.getItem("userInfo"))
    },
    mounted(){
      this.getData();
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
      // tableRowClassName({row, rowIndex}) {
      //   if (rowIndex === 1) {
      //     return 'warning-row';
      //   } else if (rowIndex === 3) {
      //     return 'success-row';
      //   }
      //   return '';
      // },
      //初始化获取任务管理数据
      getData(){
        console.log(this.data1.id);
        this.axios.get(`/api/task/getPageTask?login_id=${this.data1.id}&&pageSize=8`).then((res)=>{
          console.log(res.data);
          this.tableData=res.data.data.list;
          this.total=res.data.data.total;
        }).catch((err)=>{
          console.log(err);
        })
      },
      //子组件传给父组件的值
      parentFn(payload) {
        // this.currentPage = payload;
        console.log(payload);
      },
      parentAdd(){

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
        // this.centerDialogVisible=true;
        this.$router.push({name:"addFrame"})
      },
      //选择作业人员
      assignment(index,row){
        this.dialogVisible=true;
      },
      // 详情/修改数据
      edit(index,row){
        this.title1 ='任务详情';
        // console.log(index, row);
        this.sonData=row;
      },
      //这是删除
      // del(index,row){
      //   console.log(index, row);
      //   this.tableData.splice(index,1);
      // },
    },
  }
</script>

<style scoped>
  @import "../../../../assets/public/icomoon/style.css";
  .taskList{
    height: 100%;
    width: 100%;
    /*padding: 20px;*/
    /*border-radius: 10px;*/
    box-sizing: border-box;
    display: flex;
    color: #59fdff;
    background-image: url("../../../../assets/public/img/border.png");
    background-size: 100% 100%;
    /*position: relative;*/
    /*border: 1px solid red;*/
  }
  .taskListLeft{
    height: 100%;
    width: 83%;
    padding: 20px;
    /*border-radius: 10px;*/
    box-sizing: border-box;
    position: relative;
    background-color: transparent;
    /*background-image: url("../../../../assets/public/img/rectangle.png");*/
    /*background-size: 100% 100%;*/
    /*overflow: hidden;*/
  }
  .leftHeader{
    height: 50px;
    width: 100%;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0);
  }
  .leftHeaderInput{
    width: 25%;
    height: 30px;
    border-radius: 30px;
    line-height: 30px;
    /*border: 1px solid red;*/
  }
  .leftAdd{
    width: 70px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #59fdff;
    color: #59fdff;
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
    /*border: 1px solid red;*/
  }

  @font-face {
    font-family: 'icomoon';
    src: url('../../../../assets/public/icomoon/fonts/icomoon.eot');
    src: url('../../../../assets/public/icomoon/fonts/icomoon.eot?#iefix') format('embedded-opentype'),
    url('../../../../assets/public/icomoon/fonts/icomoon.woff') format('woff'),
    url('../../../../assets/public/icomoon/fonts/icomoon.ttf') format('truetype');
  }

  .bor,.bor1,.bor2, .bor3{
    display: inline-block;
    height: 28px;
    width: 28px;
    padding: 1px 3px  3px 3px;
    /*margin-right: 3px;*/
    box-sizing: border-box;
    font-size: 18px;
    margin: auto;
    text-align: center;
    border-radius: 10px;
  }
  .center{
    width: 132px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .bor{
    /*border: 2px solid #59fdff;*/
    color: #59fdff;
    position: absolute;
    top: 10px;
    left: 15px;
    /*margin-left: 2px;*/
  }
  .bor1{
    /*border: 2px solid #59fdff;*/
    /*padding: 3px;*/
    font-size: 14px;
    position: absolute;
    top: 10px;
    left: 50px;
    color: #59fdff;
  }
  .bor2{
    /*border: 2px solid #59fdff;*/
    color: #59fdff;
    position: absolute;
    top: 10px;
    left: 87px;
  }
  .bor3{
    /*border: 2px solid #ff861a;*/
    color: #ff861a;
    font-size: 16px;
    position: absolute;
    top: 10px;
    left: 87px;
  }
  .right{
    width: 22%;
    height: 100%;
    color: white;
    padding: 20px 0;
    box-sizing: border-box;
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
  .taskListTable >div{
    width: 100%;
    height: auto;
    background-color: transparent;
    color: #59fdff!important;
    font-size: 12px;
  }
  .taskListTable table{
    width: 100%!important;
  }
  .taskListTable  .el-table thead{
    color: #59fdff!important;
    background-color: transparent;
  }
  .taskListTable .el-table th,.taskListTable .el-table tr{
    border-bottom: 1px solid #59fdff;
    border-image:linear-gradient(to right, #155372,#59fdff,#155372) 1 10;
    background-color: transparent;
  }
  .taskListTable .el-table td{
    border-bottom: 1px solid #59fdff;
    border-image:linear-gradient(to right, #155372,#59fdff,#155372) 1 10;
  }
  .taskListTable .el-table::before{
    background-color: transparent;
    border-bottom: 1px solid #59fdff;
    border-image:linear-gradient(to right, #155372,#59fdff,#155372) 1 10;
    /*background-image: linear-gradient(#253c79,#59fdff,#253c79);*/
  }
  .taskListTable .el-table__body tr:hover>td{
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
    line-height: 30px;
    background-color: transparent;
    color: #59fdff;
    border: 1px solid #59fdff;
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
  .elastic-box11{
    width: 30%;
    background-image: url("../../../../assets/public/img/monitoringPicture.png");
    background-size: 100% 100%;
    position: relative;
  }
  .elastic-box11>:nth-child(1) .el-dialog__title{
    background-color: transparent;
    color: transparent;
  }
  .elastic-box11 .el-tree{
    margin: 0 10%!important;
    background-color: transparent;
    color: #59fdff;
  }
  .elastic-box11 .el-tree-node__content:hover{
    background-color: #3ca5a7;
    background-image: linear-gradient(to right, #155372, #4ac9cb,#155372);
  }
  .box-title{
    position: absolute;
    top: 5px;
    left: 10px;
    color: #59fdff;
  }
  .elastic-box11 .el-checkbox__input.is-checked .el-checkbox__inner, .elastic-box11 .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color:transparent;
    border-color: #59fdff;
  }
  .elastic-box11 .el-checkbox__inner::after{
    box-sizing: content-box;
    content: "";
    border: 1px solid  #59fdff;
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
  }
  .elastic-box11 .el-dialog__footer .el-button{
    background-color: transparent;
    border-radius: 40px;
    border: 1px solid #59fdff;
    color: #59fdff;
  }
  .elastic-box11 .el-button:active{
    background-color: #59fdff;
    color: white;
  }
  .elastic-box11 .el-dialog__headerbtn .el-dialog__close{
    color: #59fdff;
  }
</style>
