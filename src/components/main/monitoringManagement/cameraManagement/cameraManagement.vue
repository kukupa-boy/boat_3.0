<template>
  <!--摄像头管理-->
  <div class="cameraManagement">
    <div class="left">
      <div class="leftHeader">
        <el-input placeholder="请输入摄像头型号/型号" class="leftHeaderInput"  v-model="search">
        </el-input>
        <span class="search fa fa-search" @click="reconnoitre()"></span>
        <!--<searchBox class="alarmMessageHeaderInput" hint="请输入警报船队"></searchBox>-->
        <div  @click="open();add()" class="leftAdd">新增</div>
      </div>
      <div class="cameraManagementTable">
        <!--:row-class-name="tableRowClassName"-->
        <el-table
          :data="tableData"
          style="width: 100%"
         >
          <el-table-column
            label="编号"
            type="index"
            header-align="center"
            align="center"
            width="60px"
          >
          </el-table-column>
          <el-table-column
            prop="version"
            label="型号"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="lon"
            label="经度"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="lat"
            label="维度"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span :class="scope.row.status==='禁用'?'bor3':'bor2'">
                {{scope.row.status}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="上报时间"
            header-align="center"
            align="center"
            width="150px"
          >
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="remarks"-->
            <!--label="备注"-->
            <!--header-align="center"-->
            <!--align="center"-->
          <!--&gt;-->
          <!--</el-table-column>-->
          <el-table-column
            prop=""
            label="操作"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <el-tooltip placement="top" :content="scope.row.status==='禁用'?txt1:txt" :class="scope.row.status==='禁用'?'bor3':'bor2'" effect="light">
                <span  @click="prohibit(scope.$index,scope.row)"><i class="icon-23"></i></span>
              </el-tooltip>
              <el-tooltip placement="top" content="详情/编辑"  effect="light">
                <span @click="open();edit(scope.$index, scope.row)"><i class="bor icon-48"></i></span>
              </el-tooltip>
              <el-tooltip placement="top" content="删除"  effect="light">
                <span @click="del(scope.$index, scope.row)" :plain="true"> <i class="bor1 icon--2"></i></span>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--这是分页-->
      <div class="page">
        <Paging v-show="total>0" :total="total" :page.sync="page" :limit.sync="limit" @childFn="parentFn"></Paging>
      </div>
      <cameraManagementFrame :show.sync="show" :title1="title1" :sonData="sonData"></cameraManagementFrame>
    </div>
    <!--这是右边-->
    <div class="right">
      <div class="right-top">
        <div><i class="el-icon-caret-right"></i><span>状态</span></div>
        <div>
          <cameraManagementState></cameraManagementState>
        </div>
      </div>
      <div class="right-bottom">
        <div><i class="el-icon-caret-right"></i><span>状态详情</span></div>
        <div>
          <cameraManagementStateDetails></cameraManagementStateDetails>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Paging from "../../common/basic_t/Paging.vue"
  import cameraManagementFrame from "./cameraManagementFrame.vue"
  import cameraManagementState from "./cameraManagementState.vue"
  import cameraManagementStateDetails from "./cameraManagementStateDetails.vue"
  export default {
    name: "cameraManagement",
    components: {
      Paging,
      cameraManagementFrame,
      cameraManagementState,
      cameraManagementStateDetails,
    },
    data() {
      return {
        show: false,
        dialogVisible:false,//控制弹框的隐藏和显示
        title1:'',//用于确定弹框的title
        cla:false,
        data1:'',//存放登录相关
        total:0,//数据总条数
        page: 1,//默认显示第1页
        limit: 8,//默认一次显示10条数据
        sonData:{},//传给子组件的对象
        txt:'禁用',
        txt1:'启用',
        search:'',//用于全局搜索
        tableList:[],//操作表格数据
        //存放表格数据
        tableData: [{
          id:'',
          lat:'',
          lon:'',
          remark:'',
          status:'',
          version:'',
          createTime:''
        }]
      }
    },
    created(){
      this.data1=JSON.parse(localStorage.getItem("userInfo"))
    },
    mounted(){
      this.getData();
    },
    computed:{
      //前端实现模糊搜索
      // tables:function(){
      //   let search=this.search;
      //   if(search){
      //     return  this.tableData.filter(function(dataNews){
      //       return Object.keys(dataNews).some(function(key){
      //         return String(dataNews[key]).toLowerCase().indexOf(search) > -1
      //       })
      //     })
      //   }
      //   // this.axios.get(`api/monitor/getMonitorPageList?keys=${this.search}&&pageSize=8`).then((res)=>{
      //   //   console.log(res.data);
      //   //   this.tableData=res.data.data.list;
      //   // }).catch((err)=>{
      //   //   console.log(err);
      //   // });
      //   return this.tableData
      // }
    },
    methods: {
      //获取数据
      getData(){
        this.axios.get(`api/monitor/getMonitorPageList?pageSize=${this.limit}`).then((res)=>{
          console.log(res);
          this.tableData=res.data.data.list;
          this.total=res.data.data.total;
        }).catch((error) => {
          console.log(error);
        });
      },
      //前端实现模糊搜索
      // tableRowClassName({row, rowIndex}) {
      //   if (rowIndex === 1) {
      //     return 'warning-row';
      //   } else if (rowIndex === 3) {
      //     return 'success-row';
      //   }
      //   return '';
      // },
      //搜索
      reconnoitre(){
        let search=this.search;
        this.axios.get(`api/monitor/getMonitorPageList?keys=${search}&&pageSize=8`).then((res)=>{
          console.log('==========================');
          console.log(res.data);
          this.tableData=res.data.data.list;
        }).catch((err)=>{
          console.log(err);
        });
      },
      //子组件传给父组件的值
      parentFn(payload) {
        // this.currentPage = payload;
        console.log(payload);
        this.axios.get(`api/monitor/getMonitorPageList?pageIndex=${payload}&&pageSize=${this.limit}`).then((res)=>{
          console.log(res);
          this.tableData=res.data.data.list;
          this.total=res.data.data.total;
        }).catch((error) => {
          console.log(error);
        });
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
        this.title1 ='添加摄像头'
      },
      // 修改数据
      edit(index,row){
        this.title1 ='编辑摄像头';
        console.log(index, row);
        this.sonData=row;
      },
      //删除数据
      del(index,row){
        this.title1 ='删除信息';
        console.log(row.id);
        this.$confirm('此操作将永久删除数据, 是否继续?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post(`/api/monitor/deleteMonitorByIds?userId=${this.data1.id}&&ids=${row.id}`).then((res)=>{
            console.log(res.data);
          }).catch((err)=>{
            console.log(err);
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //启用/禁用
      prohibit(index,row){
        console.log(row);
        let obj={};
        obj.id=row.id;
        obj.lat=row.lat;
        obj.lon=row.lon;
        obj.remark=row.remark;
        obj.userId=this.data1.id;
        let statu='';
        if(row.status==='禁用'){
          statu='启用'
        }else{
          statu='禁用';
        }
        this.$confirm(`此操作将${statu}该文件, 是否继续?`, `${statu}`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass:'meseeage'
        }).then(() => {
          this.$message({
            type: 'success',
            message: `${statu}成功！`
          });
          if(row.status==='禁用'){
            this.tableData[index].status='启用'
            obj.status=1;
          }else{
            this.tableData[index].status='禁用'
            obj.status=0;
          }
          //禁用启用的请求
          this.axios.put('/api/monitor/updateMonitor',obj).then((res)=>{
            console.log(res);
          }).catch((err)=>{
            console.log(err);
          });
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
  @import "../../../../assets/public/icomoon/style.css";
  .cameraManagement{
    height: 100%;
    width: 100%;
    /*border-radius: 10px;*/
    box-sizing: border-box;
    display: flex;
    /*position: relative;*/
    /*border: 1px solid red;*/
    background-image: url("../../../../assets/public/img/border.png");
    background-size: 100% 100%;
  }
  .left{
    height: 100%;
    width: 80%;
    padding: 20px;
    /*border-radius: 10px;*/
    box-sizing: border-box;
    position: relative;
    background-size: 100% 100%;
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
  .search{
    height: 20px;
    position: absolute;
    left: 22%;
    top: 15%;
    bottom: 0px;
    color: #3e9a9c;
    /*border: 1px solid red;*/
  }
  .search:hover{
    color: #59fdff;
    cursor: pointer;
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
  .cameraManagementTable{
    /*border: 1px solid red;*/
    position: absolute;
    width: 100%;
  }
  @font-face {
    font-family: 'icomoon';
    src: url('../../../../assets/public/icomoon/fonts/icomoon.eot');
    src: url('../../../../assets/public/icomoon/fonts/icomoon.eot?#iefix') format('embedded-opentype'),
    url('../../../../assets/public/icomoon/fonts/icomoon.woff') format('woff'),
    url('../../../../assets/public/icomoon/fonts/icomoon.ttf') format('truetype');
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
  .bor,.bor1,.bor2,.bor3{
    display: inline-block;
    /*height: auto;*/
    /*width: auto;*/
    padding: 3px;
    margin-right: 5px;
    box-sizing: border-box;
    font-size: 16px;
    text-align: center;
    border-radius: 7px;
  }
  .bor2{
    color: #59fdff;
    padding: 0 1px;
  }
  .bor3{
    color: #ff861a;
    padding: 0 1px;
  }
  .bor{
    color: #59fdff;
  }
  .bor1{

    /*color: ;*/
  }
  .right{
    width: 20%;
    height: 100%;
    color: white;
    padding: 20px 0px;
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
  .cameraManagementTable >div{
    width: 96%!important;
    height: auto;
    background-color: transparent;
    color: #59fdff!important;
    font-size: 12px;
  }
  .cameraManagementTable table{
    width: 96%!important;
    /*margin-left: -40px;*/
  }
  .cameraManagementTable  .el-table thead{
    color: #59fdff!important;
    background-color: transparent;
  }
  .cameraManagementTable .el-table th,.cameraManagementTable .el-table tr{
    border-bottom: 1px solid #59fdff;
    border-image:linear-gradient(to right, #155372,#59fdff,#155372) 1 10;
    background-color: transparent;
  }
  .cameraManagementTable .el-table td{
    border-bottom: 1px solid #59fdff;
    border-image:linear-gradient(to right, #155372,#59fdff,#155372) 1 10;
  }
  .cameraManagementTable .el-table::before{
    background-color: transparent;
    border-bottom: 1px solid #59fdff;
    width: 96%!important;
    border-image:linear-gradient(to right, #155372,#59fdff,#155372) 1 10;
    /*background-image: linear-gradient(#253c79,#59fdff,#253c79);*/
  }

  .cameraManagementTable .el-table__body tr:hover>td{
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

  .el-message-box{
    background-color: rgb(12, 22, 69)!important;
    color:#59fdff;
    border: 1px solid transparent!important;
  }
  .el-message-box__title{
    color:#59fdff!important;
  }
  .el-message-box__message{
    color:#59fdff!important;
  }
  /*.el-message-box__btns >button{*/
    /*height: 30px!important;*/
    /*line-height: 30px!important;*/
    /*text-align: center!important;*/
    /*border-radius: 30px!important;*/
    /*padding: 6px 12px!important;*/
  /*}*/
  /*.el-button--mini, .el-button--small{*/
    /*border-radius: 30px!important;*/
  /*}*/
  /*.el-button--small, .el-button--small.is-round{*/
    /*padding: 6px 12px!important;*/
  /*}*/
</style>
