<template>
    <div class="boatList_table">
      <div class="search_component">
        <el-input v-model="inputData" class="leftHeaderInput" placeholder="请输入消息名称..." >
        </el-input>
        <i class="el-icon-search" @click="getSearchMessage"></i>
      </div>

      <div class="boatList_table1">
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
            prop="id"
            label="序号"
          >
          </el-table-column>
          <el-table-column
            prop="addresser"
            label="发件人"
          >
          </el-table-column>
          <el-table-column
            prop="receiver"
            label="收件人"
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="time"
            label="时间"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="message_type"
            label="消息类型"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="delete"
            label="删除"
            show-overflow-tooltip>

            <template slot-scope="scope">
              <el-tooltip content="删除" placement="top">
                <el-button :plain="true"   style="padding:0;background-color:transparent;color:rgb(160,253,255);border: none;" class="fa fa-trash trash" @click.native.prevent="open(scope.$index, normalMessage)" ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="commonFooter">
        <el-pagination class="pagination" align='center' @current-change="handleCurrentChange"  :current-page="currentPage"
                       :page-size="pageSize" layout="slot,prev, pager, next, jumper" :total="total" >
        </el-pagination>
      </div>
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
              addresser: "小陈",
              receiver: "全部用户",
              title: "台风",
              time: "2019.09.30 17：23：49",
              message_type: "公告消息",
              delete: "删除",
            },
          ],
          //分页的组件
          currentPage: 1, // 当前页码
          total: 24, // 总条数
          pageSize: 8,// 每页的数据条数
          arr: [],
          truePage: "",//真正请求的数据,
          searchParams: this.$store.state.messageParams,
          inputData:"",
        }
      },
      mounted() {
        //修改分页下面的第一个文本节点，修改为“跳转至”
        this.$nextTick(function () { //使用这个是在dom加载完成的时候进行加载，比如axios和for循环都需要使用这个
          var textChildren = document.getElementsByClassName("el-pagination__jump")[0];
          //删除第一个文本节点（修改文本节点的值药使用nodeValue属性）
          textChildren.childNodes[0].nodeValue = "跳转至";
        });

        this.axios.get(`api/message/getSendMessageList?pageIndex=${this.currentPage}&&pageSize=${this.pageSize}&&keys=${this.inputData}`)
          .then(
            (data) => {
              this.$nextTick(function () {
                console.log("params" + this.searchParams)
                this.normalMessage = [];
                this.arr = [];
                //取回来的数据
                var listData = data.data.data;
                this.normalMessage = listData.list;
                //页面中总的条数
                this.total = listData.total;
                for (let i = 0; i < listData.list.length; i++) {
                  var arr1 = {}
                  arr1.id = (listData.pageNum - 1) * 8 + i + 1;
                  arr1.addresser = listData.list[i].senderName;
                  arr1.receiver = listData.list[i].receiverName;
                  arr1.title = listData.list[i].messageName;
                  arr1.time = listData.list[i].createTime;
                  arr1.message_type = listData.list[i].type;
                  arr1.true_id = listData.list[i].id;
                  this.arr.push(arr1)
                  // console.log(this.arr)
                  this.normalMessage = this.arr;
                }
              })
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
          //页面开始的时候进行数据的请求
          //点击分页发起数据请求
          handleCurrentChange(val) {
            this.currentPage = 1;
            this.truePage=val
            console.log("当前点击的页数" + val)
            this.axios.get(`api/message/getSendMessageList?pageIndex=${this.truePage}&&pageSize=${this.pageSize}&&keys=${this.inputData}`)
              .then(
                (data) => {
                  //取回来的数据
                  var listData = data.data.data;
                  this.normalMessage = listData.list;
                  this.arr = [];
                  //页面中总的条数
                  this.total = listData.total;
                  for (let i = 0; i < listData.list.length; i++) {
                    var arr1 = {};
                    arr1.id = (listData.pageNum - 1) * 8 + i + 1;
                    arr1.addresser = listData.list[i].senderName;
                    arr1.receiver = listData.list[i].receiverName;
                    arr1.title = listData.list[i].messageName;
                    arr1.time = listData.list[i].createTime;
                    arr1.message_type = listData.list[i].type;
                    arr1.true_id = listData.list[i].id;
                    this.arr.push(arr1)
                  }
                  // console.log(listData.pageNum - 1);
                  // console.log(this.arr)
                  this.normalMessage = this.arr;
                }
              ).catch((err) => {
              console.log("这个请求消息列表中的错误")
              console.log(err)
            });
          },
          //点击删除进行删除请求
          deleteItem(index, list){
            //这个是当前页面后台需要进行操作的id:list[index].true_id
            this.currentPage = 1;
            console.log("list[index].true_id")
            console.log(list[index].true_id)
            this.axios.post(`api/message/deleteMessage?ids=${list[index].true_id}`)
              .then(
                (data) => {
                  //这个需要在删除之后进行数据表格的刷新
                  this.axios.get(`api/message/getSendMessageList?pageIndex=${this.truePage}&&pageSize=${this.pageSize}&&keys=${this.inputData}`)
                    .then(
                      (data) => {
                        this.normalMessage = [];
                        this.arr = [];
                        //取回来的数据
                        var listData = data.data.data;
                        this.normalMessage = listData.list;
                        //页面中总的条数
                        this.total = listData.total;
                        for (let i = 0; i < listData.list.length; i++) {
                          var arr1 = {}
                          arr1.id = (listData.pageNum - 1) * 8 + i + 1;
                          arr1.addresser = listData.list[i].senderName;
                          arr1.receiver = listData.list[i].receiverName;
                          arr1.title = listData.list[i].messageName;
                          arr1.time = listData.list[i].createTime;
                          arr1.message_type = listData.list[i].type;
                          arr1.true_id = listData.list[i].id;
                          this.arr.push(arr1)
                        }
                        this.normalMessage = this.arr;

                        //删除成功之后给数据化列表一个提示
                        this.$store.commit("deleteMessageIdFn",list[index].true_id)
                        console.log('this.$store.state.deleteMessageId'+this.$store.state.deleteMessageId)
                      }).catch((err) => {
                    console.log("这个请求消息列表中的错误")
                    console.log(err)
                  });
                }
              ).catch((err) => {
              console.log("这个请求消息列表中的错误");
              console.log(err)
            });
          },

          open(index, list) {
            this.$confirm('此操作将删除该条, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.deleteItem(index, list)
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

        //点击搜索框进行搜索
        getSearchMessage(){
          this.$store.commit("searchParams",this.inputData);
          this.axios.get(`api/message/getSendMessageList?pageIndex=${this.currentPage}&&pageSize=${this.pageSize}&&keys=${this.inputData}`)
            .then(
              (data) => {
                this.$nextTick(function () {
                  console.log("params" + this.searchParams)
                  this.normalMessage = [];
                  this.arr = [];
                  //取回来的数据
                  var listData = data.data.data;
                  this.normalMessage = listData.list;
                  //页面中总的条数
                  this.total = listData.total;
                  for (let i = 0; i < listData.list.length; i++) {
                    var arr1 = {}
                  arr1.id = (listData.pageNum - 1) * 8 + i + 1;
                  arr1.addresser = listData.list[i].senderName;
                  arr1.receiver = listData.list[i].receiverName;
                  arr1.title = listData.list[i].messageName;
                  arr1.time = listData.list[i].createTime;
                  arr1.message_type = listData.list[i].type;
                  arr1.true_id = listData.list[i].id;
                  this.arr.push(arr1)
                  // console.log(this.arr)
                  this.normalMessage = this.arr;
                }
                })
              }
            ).catch((err) => {
            console.log("这个请求消息列表中的错误");
            console.log(err);
          });
        }
        },
      }
</script>

<style scoped>
    .boatList_table{
      width: 100%;
      height: 100%;
      display: block;
    }
    .boatList_table1{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }
    .el-input .el-pagination__editor{
      border-radius: 50%;
    }
    /*这个是搜索框的样式*/

    .search_component{
      width: 100%;
      height: 10%;
      margin-top: -6%;
      padding-left:5%;
      display: flex;
      justify-content: left;
      box-sizing: border-box;
      align-items: center;
    }
    .search_component>i{
      margin-left: -2.5%;
      position: relative;
      z-index: 1000;
      color: rgb(160,253,255);
      /*color: red;*/
    }
    .search_component>i:hover{
      color: white;
    }
    .search_component>>>.el-input{
      width: 40%;
      background-color: transparent;
    }
    .search_component>>>.el-input__inner{
      background-color: transparent;
      border: 1px solid rgb(160,253,255);
      border-radius: 20px;
      color: rgb(160,253,255);
      height: 30px;
      line-height: 30px;
    }
    .search_component>>>.el-input__inner::-webkit-input-placeholder{
      color: rgb(160,253,255);
    }
    .search_component>>>.el-input__inner::-ms-input-placeholder{
      color: rgb(160,253,255);
      line-height: 30px;
    }
    .search_component>>>.el-input__icon{
      color: rgb(160,253,255);
      position: relative;
      line-height: 30px;
    }
    .leftHeaderInput>>>span{
      color: rgb(160,253,255);
    }
    .el-button{
      background-color: transparent;
      border: 1px solid  rgb(160,253,255);
      color:  rgb(160,253,255);
      border-radius: 20px;
      margin-right: -10%;
    }
    .add{
      text-align:center ;
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
      }
    /*  elementhover的时候修改样式*/
   /* .boatList_table>>>.el-table tr:hover>td{*/
   /*   background: -webkit-linear-gradient(top left, red, blue 25%, yellow 90%);;*/
   /* }*/
    .boatList_table >>> .el-table tr  td {
      border-image: linear-gradient(to right, #155372, #59fdff, #155372) 1 10;
    }
    .boatList_table >>> .el-table tr:hover td{
      background-color:rgba(160, 253, 255,0.6);
    }
  .trash{
    font-size: 18px;
    cursor: pointer;
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
  /*@media 1920 {*/
  /*  */
  /*}*/
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
