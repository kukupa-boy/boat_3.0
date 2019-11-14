<template>
  <div class="normalMessage">
    <div class="boatList_table">
      <el-table
        class="getMessage_table"
        ref="multipleTable"
        :show-header=false
        @row-click="enterDetail"
        :data="normalMessage.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        tooltip-effect="dark"
        style="width: 100%;text-align: center;color:rgb(160,253,255);"
        :header-cell-style="{'text-align':'left',color:'rgb(160,253,255)',backgroundColor:'transparent'}"
        :cell-style="cellStyle"
        @selection-change="handleSelectionChange">
        <el-table-column min-width="10%"
                         prop=""
                         label="图片"
        >
          <template slot-scope="scope">
            <img :src="normalMessage[scope.$index].img" style="width: 55px;height: 55px;color: red;">
          </template>
        </el-table-column>

        <el-table-column min-width="70%"
                         prop="messageContent"
                         label="消息内容"
        >
          <template slot-scope="scope">
            <div class="message_content_center">
              <p>{{normalMessage[scope.$index].typeMessage}}</p>
              <p>{{normalMessage[scope.$index].messageContent}}</p>
            </div>
          </template>
        </el-table-column>

        <el-table-column min-width="20%"
                         prop="messageTime"
                         label="时间"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <div>
              <p class="message_number">
                <span>{{normalMessage[scope.$index].number}}</span>
              </p>
              <p class="message_time">{{normalMessage[scope.$index].messageTime}}</p>
            </div>
          </template>
        </el-table-column>

      </el-table>
      <div class="commonFooter">
        <el-pagination class="pagination" align='center' @current-change="handleCurrentChange"  :current-page="currentPage"
                       :page-size="pageSize" layout="slot,prev, pager, next, jumper" :total="normalMessage.length" >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "warnMessage",
    data() {
      return {
        normalMessage: [
          {
            img:require("@/assets/public/img/header_left.png"),
            typeMessage: "系统",
            messageContent: "台风“木恩”于10月25日登录海南",
            messageTime: "2019.10.17  12:20",
            number:0
          },
        ],
        //分页的组件
        currentPage: 1, // 当前页码
        total: 20, // 总条数
        pageSize: 5 // 每页的数据条数
      }
    },
    mounted(){
      //修改分页下面的第一个文本节点，修改为“跳转至”
      this.$nextTick(function () { //使用这个是在dom加载完成的时候进行加载，比如axios和for循环都需要使用这个
        var textChildren=document.getElementsByClassName("el-pagination__jump")[0];
        //删除第一个文本节点（修改文本节点的值药使用nodeValue属性）
        textChildren.childNodes[0].nodeValue="跳转至";
      });
      //页面开始的时候发送ajax请求
      this.axios.get(`api/message/getUserMessage?type=3&&userId=2&&pageIndex=${this.currentPage}&&pageSize=${this.pageSize}`)
        .then(
          (data) => {
            console.log("这个是警报消息");
            //这个是消息返回回来的数据，赋值给total
            var listData=data.data.data;

            //这个是消息返回回来的数据，然后进行消息的处理

            //数据处理
            //id,这个代表当前的消息是哪个
            // createTime: "2019-11-12 15:35:44",  messageTime
            // 消息内容：description: "123456",messageContent
            // 发送消息名称：messageName: "1234567", typeMessage
            // status: "已发送",  number

            this.normalMessage = [];
            this.arr = [];
            //取回来的数据
            this.normalMessage = listData.list;

            //页面中总的条数
            this.total = listData.total;
            for (let i = 0; i < listData.list.length; i++) {
              var arr1 = {}
              arr1.id = listData.list[i].id;
              arr1.img=require("@/assets/public/img/header_left.png");
              arr1.messageTime= listData.list[i].createTime;
              arr1.messageContent = listData.list[i].description;
              arr1.typeMessage= listData.list[i].messageName;
              if(listData.list[i].status==='已发送'){
                arr1.number="未读"
              }else if(listData.list[i].status==='已收到'){
                arr1.number="已读"
              }
              this.arr.push(arr1)
              // console.log(this.arr)
              this.normalMessage = this.arr;
            }


          }).catch((err) => {
        console.log("这个请求消息列表中的错误");
        console.log(err);
      });
    },
    methods: {
      //修改element指定行的数据
      cellStyle({row, column, rowIndex, columnIndex}) {
        if(columnIndex===0){
          return "text-align:center"
        }
      },
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
      //当点击某一个tr的时候进行触发
      enterDetail(row, event, column){
        //将点击的当前的消息传递到vuex中
        this.$store.commit("changeMessageId",row.id);
        //传递当前参数到messageDetail
        this.$router.push("/contentBox/messageDetail");
      }
    }
  }
</script>

<style scoped>
  .normalMessage{
    width: 100%;
    height: 100%;
  }
  @import "./../../../../assets/public/icomoon/style.css";
  .boatList_table{
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
  .boatList_table>>>.el-table tr:hover td{
    border-image:linear-gradient(to right, #155372,#59fdff,#155372) 1 10;
    background-color: transparent;
  }
  .boatList_table_i{
    font-size: 16px;
    vertical-align: middle;
    cursor: pointer
  }
  .boatList_table>>>.el-table--enable-row-transition::before{
    border: none;
    height: 0;
  }
  /*  设置每一个表格的高度*/
  .boatList_table>>>.el-table__header tr,
  .boatList_table>>>.el-table__header th {
    padding: 0;
    height: 60px;
  }
  .boatList_table>>>.el-table__body tr,
  .boatList_table>>>.el-table__body td {
    padding: 0;
    height: 60px;
  }

  .boatList_table>>>.el-table__body tr:hover{
    background-color:rgba(160,253,255,.6);
  }
  /*  点击进行颜色样式的改变*/
  .colorStyle{
    color: rgb(215,102,98);
  }

  /*设置第一行下面的td的样式*/
  .el_table>>>.el-table__row td:nth-of-type(1) .cell{
    text-align: center;
  }
  /*设置提示的信息的number值*/
  .message_number{
    /*height: 20px;*/
    /*width: 20px;*/
    /*border-radius: 100%;*/
    /*background-color:rgb(160,253,255);*/
    text-align: center;
    line-height: 20px;
    margin-left: 62%
  }
  .message_number span{
    color: red;
  }
  .message_number span{
    color: red;
  }
  .message_time{
    text-align: center
  }
  .message_content_center{
    padding-left: 5%;
    box-sizing: border-box;
  }
</style>
