<template>
  <div class="sea_conditions">
    <div class="conditions_inner">
      <div class="boatList_header">
          <el-button @click="showBounceFlag" size="mini">新增</el-button>
      </div>
      <div class="boatList_table">
        <el-table
          class="getMessage_table"
          ref="multipleTable"
          :data="normalMessage.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          tooltip-effect="dark"
          style="width: 100%;text-align: center;color:rgb(160,253,255);"
          :header-cell-style="{'border-image':'linear-gradient(to right, #155372, #59fdff, #155372) 1 10','text-align':'center',color:'rgb(160,253,255)',backgroundColor:'transparent'}"
          :cell-style="{'text-align':'center',color:'rgb(160,253,255)'}"
          @selection-change="handleSelectionChange">
          <el-table-column
            prop="type"
            label="类型"
          >
          </el-table-column>
          <el-table-column
            prop="lwh"
            label="长/宽/高"
          >
          </el-table-column>
          <el-table-column
            prop="wind"
            label="风力"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="waveHeight"
            label="浪高"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop=" operation"
            label="操作"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tooltip content="删除" placement="top">
                <el-button style="padding: 0;background-color:transparent;color:rgb(160,253,255);border: none;" class="fa fa-trash trash" @click.native.prevent="open(scope.$index, normalMessage)" ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
    <div class="commonFooter">
      <el-pagination class="pagination" align='center' @current-change="handleCurrentChange"  :current-page="currentPage"
                     :page-size="pageSize" layout="slot,prev, pager, next, jumper" :total="normalMessage.length" >
      </el-pagination>
    </div>
    </div>
      <!-- 弹出框-->
      <div class="bounceBox" v-if="bounceFlag">
        <bounce-box @removeBounceBox="showBounceFlag"></bounce-box>
      </div>
    </div>
  </div>
</template>

<script>
  import bounceBox from "./second_component/bounceBox.vue"
  export default {
    name: "sea_conditions",
    data() {
      return {
        normalMessage:[
          {
            type:"巡视船",
            lwh:"长/宽/高",
            wind:"<=5",
            waveHeight:"1-2m",
            remark:"无",
            operation:"操作",
          },
          {
            type:"巡视船",
            lwh:"长/宽/高",
            wind:"<=5",
            waveHeight:"1-2m",
            remark:"无",
            operation:"操作",
          },
          {
            type:"巡视船",
            lwh:"长/宽/高",
            wind:"<=5",
            waveHeight:"1-2m",
            remark:"无",
            operation:"操作",
          },
        ],
        //弹窗的显示和隐藏
        bounceFlag:false,
        //分页的组件
        currentPage: 1, // 当前页码
        total: 20, // 总条数
        pageSize: 8 // 每页的数据条数
      }
    },
    mounted(){
      //修改分页下面的第一个文本节点，修改为“跳转至”
      this.$nextTick(function () { //使用这个是在dom加载完成的时候进行加载，比如axios和for循环都需要使用这个
        var textChildren=document.getElementsByClassName("el-pagination__jump")[0];
        //删除第一个文本节点（修改文本节点的值药使用nodeValue属性）
        textChildren.childNodes[0].nodeValue="跳转至";
      })

      //页面加载的时候，开始请求船舶出海条件的数据
      this.axios.get(`api/ship/seaConditions`)
        .then(
          (data) => {
            // id: 4
            // remark: "213111"
            // seaHigh: 123111
            // shipHigh: 1231231
            // shipWidth: 1232311
            // status: true
            // type: "渔船"
            // windSpd: 2131231

            //页面数据

            // type:"巡视船",
            //   lwh:"长/宽/高",
            //   wind:"<=5",
            //   waveHeight:"1-2m",
            //   remark:"无",
            //   operation:"操作",

            var listData = data.data.data;
            this.normalMessage = [];
            this.arr = [];
            this.total = listData.total;
            for (let i = 0; i < listData.list.length; i++) {
              var arr1 = {}
              arr1.trueId=listData.list[i].id;

              arr1.lwh = listData.list[i].cname;
              arr1.boat_id = listData.list[i].shipCode;
              arr1.call_letters = listData.list[i].callCode;
              arr1.type = listData.list[i].type;
              arr1.imo=listData.list[i].imo;
              if(listData.list[i].status==='normal'){
                arr1.state = "正常";
                arr1.colorStyle=false
              }else if(listData.list[i].status==='abnormal'){
                arr1.state = "异常";
                arr1.colorStyle=true
              }
              this.arr.push(arr1)
            }
            this.normalMessage = this.arr;
          }
        ).catch((err) => {
        console.log("这个请求消息列表中的错误");
        console.log(err);
      });

    },
    methods: {
      //用户进行删除的数据存放的地方
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //分页的函数
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      showBounceFlag(){
        this.bounceFlag=!this.bounceFlag;
      },
      //删除对应的条数
      //   deleteItem(index, list) {
      //     list.splice(index, 1);
      //   },
      deleteItem(index, list) {
        list.splice(index, 1);
      },

      //确定该要删除
      open(index, list) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteItem(index, list);
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
      }

    },
    components:{
      bounceBox
    }
  }
</script>

<style scoped>
  @import "../../../assets/public/icomoon/style.css";
  .boatList_header{
    height: 10%;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: left;

    /*margin-right: 5%;*/
  }
  .boatList_header>>>.el-button{
      background-color: transparent;
      border-radius: 20px;
      color: rgb(160,253,255);
      margin-right: 5%;
      border: 1px solid rgb(160,253,255);
      /*width: 80px;*/
      /*height: 40px;*/
        display: flex;
        justify-content: center;
        align-items: center;
  }
  .boatList_table{
    height: 85%;
    width: 100%;
  }
  .sea_conditions{
    width: 100%;
    height: 100%;
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    position: relative;
  }
  .conditions_inner{
    width: 82%;
    height: 78%;
    top: 11%;
    right: 4%;
    position: absolute;
    background-image: url("../../../assets/public/img/header/messagebox.png");
    background-size: 100% 100%;
  }
  .boatList_table{
    width: 100%;
    height: 85%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }
  .el-input .el-pagination__editor{
    border-radius: 50%;
  }
  /*设置分页的样式*/
  .pagination{
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    /*border: 1px solid red;*/
    color: rgb(160,253,255);
  }
  .pagination >>>.el-input__inner{
    width: 28px;
    height: 28px;
    border-radius:100%;
    border:2px solid rgb(160,253,255) ;
    background-color: transparent;
    color: rgb(160,253,255);
  }
  .boatList_table>>>.el-pagination button{
    background-color:transparent;
    color: rgb(160,253,255);
  }
  .pagination>>>.el-pager li{
    background-color: transparent;
  }
  .pagination>>>.el-pager li.active{
    color: white!important;
    border: 1px solid rgb(160,253,255)!important;
    background-color: rgb(160,253,255);
    width: 30px;
    height:30px;
    min-width: 30px;
    border-radius: 100%;
    padding: 0;
    text-align: center;
    line-height: 27px;
  }
  .commonFooter{
    width: 100%;
    height: 15%;
    /*border: 1px solid red;*/
    display: flex;
    justify-content: space-around;
  }
  .pagination>>>.el-pagination__jump{
    color: rgb(160,253,255);
  }
  .el-table{
    background-color: transparent;
  }
  .el-table>>>tr{
    background-color: transparent;
    border-bottom: 1px solid rgb(160,253,255);
  }
  .boatList_table >>> .el-table tr  td {
    border-image: linear-gradient(to right, #155372, #59fdff, #155372) 1 10;
  }
  .boatList_table >>> .el-table tr:hover td{
    background-color:rgba(160, 253, 255,0.6);
  }

  /*弹出框*/
  .bounceBox{
    position: absolute;
    width: 39%;
    height: 80%;
    top: 50%;
    left: 50%;
    margin-top: -25%;
    margin-left: -19.5%;
    background-image: url("./../../../assets/public/img/bounceBox.png");
    background-size:100% 100%;
  }
  .boatList_table>>>.el-table--enable-row-transition::before{
    border: none;
    height: 0;
  }
  .trash{
    color: white;
    font-size: 20px;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }
  .boatList_table>>>.el-table--enable-row-transition::before{
    border: none;
    height: 0;
  }
  .boatList_table>>>.el-table__header tr,
  .boatList_table>>>.el-table__header th {
    padding: 0;
    height: 40px;
  }
  .boatList_table>>>.el-table__body tr,
  .boatList_table>>>.el-table__body td {
    padding: 0;
    height: 40px;
  }
</style>
<style>
  .el-message-box{
    border: 1px solid rgb(160,253,255);
    background-color: rgb(12,30,67);
  }
  .el-message-box__title{
    color:rgb(160,253,255);
  }
  .el-message-box__headerbtn .el-message-box__close{
    color:rgb(160,253,255);
  }
  .el-message-box__status.el-icon-warning{
    color:rgb(160,253,255);
  }
  .el-message-box__message p{
    color:rgb(160,253,255);
  }
  .el-message-box__btns>>>.el-button{
    background-color: rgb(160,253,255);
    color: white;
    border-radius: 20px;
  }
  .el-button--small, .el-button--small.is-round{
    border:1px solid rgb(160,253,255);
    background-color:transparent;
    color:rgb(160,253,255) ;
    border-radius: 25px;
  }
</style>
