<template>
  <div class="boatList_table">
    <el-table
      class="getMessage_table"
      ref="multipleTable"
      :data="normalMessage.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      tooltip-effect="dark"
      style="width: 100%;text-align: center;color:rgb(160,253,255);"
      :header-cell-style="{'border-image':'linear-gradient(to right, #155372, #59fdff, #155372) 1 10' ,'text-align':'center',color:'rgb(160,253,255)',backgroundColor:'transparent'}"
      :cell-style="{'text-align':'center',color:'rgb(160,253,255)'}"
      @selection-change="handleSelectionChange">
      <el-table-column
        prop="id"
        label="序号"
      >
        <!--          <template slot-scope="scope">{{ scope.row.date }}</template>-->
      </el-table-column>
      <el-table-column
        prop="boat_name"
        label="船长姓名"
      >
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="船长信息" placement="top">
            <span
              @click="captain_message(scope.$index, normalMessage)">{{ normalMessage[scope.$index].boat_name}}
            </span>
          </el-tooltip>
        </template>

        <!--          <template slot-scope="scope">{{ scope.row.date }}</template>-->
      </el-table-column>
      <el-table-column
        prop="boat_id"
        label="船号"
      >
      </el-table-column>
      <el-table-column
        prop="call_letters"
        label="呼号"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-bind:class="{'colorStyle':normalMessage[scope.$index].colorStyle}">{{normalMessage[scope.$index].state}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="operation"
        label="操作"
        show-overflow-tooltip
        ref="errorBox"
      >

        <!-- 禁用和查看详情 -->
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="normalMessage[scope.$index].state" placement="top">
              <span v-bind:class="{'colorStyle':normalMessage[scope.$index].colorStyle}">
              <i @click="open(scope.$index, normalMessage)" class="icon-23 boatList_table_i "></i>
                </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="详情" placement="top">
            <i @click="showDetails(scope.$index, normalMessage)" class="fa fa-bars boatList_table_i"
               aria-hidden="true"></i>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div style="opacity: 0">我{{this.$store.state.insertBoat}}</div>
    <div class="commonFooter">
      <el-pagination class="pagination" align='center' @current-change="handleCurrentChange"  :current-page="currentPage"
                     :page-size="pageSize" layout="slot,prev, pager, next, jumper" :total="total" >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "boatList_table",
    data() {
      return {
        normalMessage: [
          {
            id: "001",
            boat_name: "yan",
            boat_id: "308",
            call_letters: "BYQ612",
            type: "巡视船",
            state: "正常",
            operation: "操作",
            colorStyle: false,
          }
        ],
        //分页的组件
        currentPage: 1, // 当前页码
        total: 20, // 总条数
        pageSize: 8 ,// 每页的数据条数
        userId:"",//这个是用户进行登录的时候的id
        truePage:""
      }
    },
    created(){
      this.userId=JSON.parse(localStorage.getItem("userInfo")).id
    },
    mounted() {
      //修改分页下面的第一个文本节点，修改为“跳转至”
      this.$nextTick(function () { //使用这个是在dom加载完成的时候进行加载，比如axios和for循环都需要使用这个
        var textChildren = document.getElementsByClassName("el-pagination__jump")[0];
        //删除第一个文本节点（修改文本节点的值药使用nodeValue属性）
        textChildren.childNodes[0].nodeValue = "跳转至";
      });
      //&&keys=${this.inputData}
      this.axios.get(`api/ship/getPageShip?pageIndex=${this.currentPage}&&pageSize=${this.pageSize}`)
        .then(
          (data) => {
              //取回来的数据
            console.log(data);
               var listData = data.data.data;
              this.normalMessage = [];
              this.arr = [];
              console.log(listData.total)
              this.total = listData.total;
              for (let i = 0; i < listData.list.length; i++) {
                var arr1 = {}
                arr1.id = (listData.pageNum - 1) * 8 + i + 1;
                arr1.trueId=listData.list[i].id;
                arr1.boat_name = listData.list[i].cname;
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
    //监听vuex中数据是否新增，然后进行列表的新增
    computed: {
      //监听新增船舶中是否进行了新增加
      addBoat() {
        return this.$store.state.insertBoat
      }
    },
    watch: {
      addBoat(newCount, oldCount) {
        if(newCount!==oldCount){
          this.axios.get(`api/ship/getPageShip?pageIndex=${this.currentPage}&&pageSize=${this.pageSize}`)
            .then(
              (data) => {
                //取回来的数据
                console.log(data);
                var listData = data.data.data;
                this.normalMessage = [];
                this.arr = [];
                console.log(listData.total)
                this.total = listData.total;
                for (let i = 0; i < listData.list.length; i++) {
                  var arr1 = {}
                  arr1.id = (listData.pageNum - 1) * 8 + i + 1;
                  arr1.trueId=listData.list[i].id;
                  arr1.boat_name = listData.list[i].cname;
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
        }
      }
    },
    methods: {
      //用户进行删除的数据存放的地方
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      handleCurrentChange(val) {
        this.currentPage = 1;
        this.truePage=val
        console.log("当前点击的页数" + val)
        this.axios.get(`api/ship/getPageShip?pageIndex=${this.truePage}&&pageSize=${this.pageSize}`)
          .then(
            (data) => {
              //取回来的数据
              console.log(data);
              var listData = data.data.data;
              this.normalMessage = [];
              this.arr = [];
              console.log(listData.total)
              this.total = listData.total;
              for (let i = 0; i < listData.list.length; i++) {
                var arr1 = {}
                arr1.id = (listData.pageNum - 1) * 8 + i + 1;
                arr1.trueId=listData.list[i].id;
                arr1.boat_name = listData.list[i].cname;
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
      errorNormal(index, list) {
        //当为异常的时候进行发起请求
        if (list[index].state === "异常") {
          list[index].state = "正常"
          list[index].colorStyle = false
        }
        if (list[index].state === "正常"){
          list[index].state = "异常"
          list[index].colorStyle = true
        }
      },
      //显示详情页
      showDetails(index, list) {
        this.$emit("showDetailBoxClick", list[index].imo);
      },
      //显示船长的个人信息

      //修改锁定的颜色和样式
      captain_message(index, list) {
        console.log(index)
        this.$emit("showCaptain")
      },
      //禁用
      open(index, list) {
        this.$confirm('此操作将禁用该条, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var state="";
          if(list[index].state==="异常"){
             state="1"
          }else if(list[index].state==="正常"){
             state="2"
          }
          this.axios.get(`api/ship/updateShip?login_id=${this.userId}&&id=${list[index].trueId}&&type=${list[index].type}&&status=${state}`)
            .then(
              (data) => {
                this.$nextTick(function () {
                  this.errorNormal(index, list);
                  this.$store.commit("addEventInsertBoat",data.data.data)
                })
              }
            ).catch((err) => {
            console.log("这个请求消息列表中的错误");
            console.log(err);
          });
          //调用成功的时候，发起一个axios请求，将数据进行改变
          this.$message({
            type: 'success',
            message: '禁用成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用'
          });
        });
      }
    }
  }
</script>

<style scoped>
  @import "./../../../../assets/public/icomoon/style.css";

  .boatList_table {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }

  .el-input .el-pagination__editor {
    border-radius: 50%;
  }

  /*设置分页的样式*/
  .pagination {
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    /*border: 1px solid red;*/
    color: rgb(160, 253, 255);
  }

  .pagination >>> .el-input__inner {
    width: 28px;
    height: 28px;
    border-radius: 100%;
    border: 2px solid rgb(160, 253, 255);
    background-color: transparent;
    color: rgb(160, 253, 255);
  }

  .boatList_table >>> .el-pagination button {
    background-color: transparent;
    color: rgb(160, 253, 255);
  }

  .pagination >>> .el-pager li {
    background-color: transparent;
  }

  .pagination >>> .el-pager li.active {
    color: white !important;
    border: 1px solid rgb(160, 253, 255) !important;
    background-color: rgb(160, 253, 255);
    width: 30px;
    height: 30px;
    min-width: 30px;
    border-radius: 100%;
    padding: 0;
    text-align: center;
    line-height: 27px;
  }

  .commonFooter {
    width: 100%;
    height: 15%;
    /*border: 1px solid red;*/
    display: flex;
    justify-content: space-around;
  }

  .pagination >>> .el-pagination__jump {
    color: rgb(160, 253, 255);
  }

  .el-table {
    background-color: transparent;
  }

  .el-table >>> tr {
    background-color: transparent;
  }

  .boatList_table >>> .el-table tr  td {
    border-image: linear-gradient(to right, #155372, #59fdff, #155372) 1 10;
  }
  .boatList_table >>> .el-table tr:hover td{
    background-color:rgba(160, 253, 255,0.6);
  }

  .boatList_table_i {
    font-size: 16px;
    vertical-align: middle;
    cursor: pointer
  }

  .boatList_table >>> .el-table--enable-row-transition::before {
    border: none;
    height: 0;
  }


  /*  设置每一个表格的高度*/
  .boatList_table >>> .el-table__header tr,
  .boatList_table >>> .el-table__header th {
    padding: 0;
    height: 40px;
  }

  .boatList_table >>> .el-table__body tr,
  .boatList_table >>> .el-table__body td {
    padding: 0;
    height: 40px;
  }

  /*  点击进行颜色样式的改变*/
  .colorStyle {
    color: rgb(215, 102, 98);
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
