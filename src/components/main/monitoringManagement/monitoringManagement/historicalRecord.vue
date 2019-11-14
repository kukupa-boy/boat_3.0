<template>
  <div  class="historicalRecord">
    <div class="historicalRecordHeader">
      <span class="el-icon-back historicalRecordHeaderInput1" @click="goBack()"></span>
      <!--<searchBox class="alarmMessageHeaderInput" hint="请输入警报船队"></searchBox>-->
      <div style="float: right">
        <el-input placeholder="请输入摄像头编号" suffix-icon="el-icon-search" class="historicalRecordHeaderInput2"  v-model="search" clearable>
        </el-input>
      </div>
    </div>
    <!--这是中间图片展示-->
    <div class="middle">
      <!--<router-link :to="">-->
      <div  v-for="(item,index) in tableData" class="div-hover" :key="index">
        <div class="num-hover">{{item.num}}</div>
        <div class="tips">
          <p>编号；<span>{{item.num}}</span></p>
          <p>型号；<span>{{item.model}}</span></p>
          <p>经度；<span>{{item.longitude}}</span></p>
          <p>纬度；<span>{{item.latitude}}</span></p>
          <p>摄像头状态；<span>{{item.cameraStatus}}</span></p>
          <p>上报时间；<span>{{item.reportingTime}}</span></p>
          <p>备注；<span>{{item.remarks}}</span></p>
        </div>
        <div>
          <img @click="specific(index)" :src="item.url" alt="">
        </div>
        <div class="time">2019-10-25</div>
        <!--<img src="" alt="">-->
        <div v-if="derive" class="select" @click="select(index)">
           <span v-if="item.select1" class="icon-2"></span>
        </div>
      </div>
      <!--</router-link>-->
    </div>
    <div class="bottom">
      <div>
        <el-button  @click="historicalRecord()" class="button">批量下载</el-button>
        <el-button  v-show="download" @click="batchDownload()" class="button1">视频导出</el-button>
      </div>
      <div class="page">
        <!--@childFn="parentFn"-->
        <Paging :list="tableList" ></Paging>
      </div>
    </div>
    <!--<monitoringManagementFrame></monitoringManagementFrame>-->
  </div>
</template>

<script>
  import Paging from "../../common/basic_t/Paging.vue"
  // import monitoringManagementFrame from "./monitoringManagementFrame.vue"
  export default {
    name: "historicalRecord",
    components: {
      Paging,
      // monitoringManagementFrame
    },
    data(){
      return{
        flag:true,
        derive:false,//批量下载时的显示
        download:false,//视频导出的显示
        search:'',//用于全局搜索
        childNum:'',//给子路由的编号
        fatherNum:'',//父路由的编号
        tableList:[],//操作摄像头数据

        tableData: [{
          num:'1',//摄像头编号
          url:require('../../../../assets/video_system/image/image_t/1.png'),//图片路径
          model:'BTWS',//型号
          longitude:'160°',//经度
          latitude:'118°',//纬度
          cameraStatus:'运行',//摄像头状态
          reportingTime:'20.19.10.16 15:30',//上报时间
          remarks:'无备注',//备注
          select1:false,//点击视频选择
        },
          {
            num:'1',//摄像头编号
            url:require('../../../../assets/video_system/image/image_t/2.png'),//图片路径
            model:'',//型号
            longitude:'',//经度
            latitude:'118°',//纬度
            cameraStatus:'运行',//摄像头状态
            reportingTime:'20.19.10.16 15:30',//上报时间
            remarks:'无备注',//备注
            select1:false,//点击视频选择
          },
          {
            num:'1',//摄像头编号
            url:require('../../../../assets/video_system/image/image_t/3.png'),//图片路径
            model:'',//型号
            longitude:'',//经度
            latitude:'118°',//纬度
            cameraStatus:'运行',//摄像头状态
            reportingTime:'20.19.10.16 15:30',//上报时间
            remarks:'无备注',//备注
            select1:false,//点击视频选择
          },
          {
            num:'1',//摄像头编号
            url:require('../../../../assets/video_system/image/image_t/4.png'),//图片路径
            model:'',//型号
            longitude:'',//经度
            latitude:'118°',//纬度
            cameraStatus:'运行',//摄像头状态
            reportingTime:'20.19.10.16 15:30',//上报时间
            remarks:'无备注',//备注
            select1:false,//点击视频选择
          },
          {
            num:'1',//摄像头编号
            url:require('../../../../assets/video_system/image/image_t/5.png'),//图片路径
            model:'',//型号
            longitude:'',//经度
            latitude:'118°',//纬度
            cameraStatus:'运行',//摄像头状态
            reportingTime:'20.19.10.16 15:30',//上报时间
            remarks:'无备注',//备注
            select1:false,//点击视频选择
          },
          {
            num:'1',//摄像头编号
            url:require('../../../../assets/video_system/image/image_t/6.png'),//图片路径
            model:'',//型号
            longitude:'',//经度
            latitude:'118°',//纬度
            cameraStatus:'运行',//摄像头状态
            reportingTime:'20.19.10.16 15:30',//上报时间
            remarks:'无备注',//备注
            select1:false,//点击视频选择
          },
          {
            num:'1',//摄像头编号
            url:require('../../../../assets/video_system/image/image_t/7.png'),//图片路径
            model:'',//型号
            longitude:'',//经度
            latitude:'118°',//纬度
            cameraStatus:'运行',//摄像头状态
            reportingTime:'20.19.10.16 15:30',//上报时间
            remarks:'无备注',//备注
            select1:false,//点击视频选择
          },
          {
            num:'1',//摄像头编号
            url:require('../../../../assets/video_system/image/image_t/8.png'),//图片路径
            model:'',//型号
            longitude:'',//经度
            latitude:'118°',//纬度
            cameraStatus:'运行',//摄像头状态
            reportingTime:'20.19.10.16 15:30',//上报时间
            remarks:'无备注',//备注
            select1:false,//点击视频选择
          },
        ],
      }
    },
    created(){
      this.tableList = this.tableData;
    },
    mounted(){
      this.fatherNum=this.$route.params.userId;
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
    methods:{
      // //子组件传给父组件的值
      // parentFn(payload) {
      //   // this.currentPage = payload;
      //   console.log(payload);
      //   this.tableData = payload
      // },
      // 历史记录
      historicalRecord(){
        // console.log(111);
        this.derive=!this.derive;
        this.download=!this.download
      },
      //点击的具体展示
      specific(index){
        // console.log(index);
        this.childNum=index+1;
        this.flag=!this.flag;
        this.$router.push({name:"historicalRecordFrame",params:{ Id: this.childNum,userId:this.fatherNum}})
      },
      //返回上一页
      goBack(){
        this.$router.push({name:"monitoringManagement"})
      },
      //批量选择
      select(index){
        // this.download =true;
        for(let i=0;i<this.tableData.length;i++){
          if(index === i){
            this.tableData[i].select1=!this.tableData[i].select1;
          }
        }
        console.log(index);
      },
      //视频导出
      batchDownload(){

      }
    },
  }
</script>

<style scoped>
  @import "../../../../assets/public/icomoon/style.css";
  .historicalRecord{
    height: 100%;
    padding: 20px;
    border-radius: 10px;
    box-sizing: border-box;
    position: relative;
    /*border: 1px solid red;*/
    background-color: transparent;
  }
  .historicalRecordHeaderInput1{
    display: inline-block;
    font-size: 24px;
    width: 30px;
    height: 30px;
    /*margin-left: 2%;*/
    color:#59fdff;
    line-height: 30px;
    text-align: center;
    border-radius: 40px;
    border: 2px solid #59fdff;
  }
  @font-face {
    font-family: 'icomoon';
    src: url('../../../../assets/public/icomoon/fonts/icomoon.eot');
    src: url('../../../../assets/public/icomoon/fonts/icomoon.eot?#iefix') format('embedded-opentype'),
    url('../../../../assets/public/icomoon/fonts/icomoon.woff') format('woff'),
    url('../../../../assets/public/icomoon/fonts/icomoon.ttf') format('truetype');
  }
  #iconStyle:before{
    font-size: 30px;
  }
  .iconfont{
    font-family: "icomoon" !important;
    font-size: 36px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .historicalRecordHeader{
    height: 10%;
    width: 100%;
    position: relative;
    /*border: 1px solid red;*/
  }
  .historicalRecordHeaderInput2{
    width: 200px;
    height: 40px;
    line-height: 40px;
  }
  .middle{
    width: 100%;
    /*margin: 20px 5%;*/
    height: 80%;
    /*border: 1px solid red;*/
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
  }
  .middle >div{
    display: flex;
    margin: auto;
    width: 24%;
    height: 48%;
    border-radius: 15px;
    /*background-color: #55a532;*/
    position: relative;
    /*border: 1px solid red;*/
  }
  .middle >div >:nth-of-type(1){
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 20px;
    background-color: #59fdff;
    position: absolute;
    left: 10px;
    top: 10px;
  }
  .tips{
    color: #59fdff;
    width: 70%;
    height: 70%;
    padding: 10px;
    box-sizing: border-box;
    position: absolute;
    font-size: 10px;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /*border: 1px solid red;*/
    border-radius: 10px;
    background-color: rgba(13, 13, 13, 0.77);
    display: none;
  }
  .div-hover:hover   .tips{
    display: block;
  }
  .div-hover> :nth-of-type(3){
    width: 100%;
    height: 100%;
  }
  .div-hover> :nth-of-type(3)>img{
    width: 100%;
    height: 100%;
    /*border: 1px solid black;*/
  }
  .page{
    position: absolute;
    bottom: 0;
    top: 0;
    margin: auto;
    right: 20px;
    /*margin: auto;*/
    /*width: 30%;*/
    /*border: 1px solid red;*/
    width: 28%;
    height: 50%;
    text-align: center;
  }
  .bottom{
    /*height: auto;*/
    width: 100%;
    height: 10%;
    line-height: 10%;
    /*border: 1px solid red;*/
    /*margin-top: 60px;*/
    position: relative;
    /*bottom: 0;*/
    /*left: 0;*/
  }
  .button{
    width: auto;
    height: 40px;
    border-radius: 20px;
    background-color:transparent;
    border: 1px solid #59fdff;
    color: #59fdff;
    position: absolute;
    bottom: 0;
    top: 0;
    margin: auto;
    left: 0;
  }
  .button1{
    width: auto;
    height: 40px;
    background-color:transparent;
    border: 1px solid #59fdff;
    color: #59fdff;
    border-radius: 20px;
    position: absolute;
    bottom: 0;
    top: 0;
    margin: auto;
    left: 10%;
  }
.time{
  color: #59fdff;
  font-size: 18px;
  position: absolute;
  top: 14px;
  left: 32%;
  margin: auto;
}
  .select{
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #59fdff;
    font-size: 24px;
    border-radius: 5px;
    border: 2px solid #59fdff;
    position: absolute;
    bottom: 5%;
    left: 5%;
    /*z-index: 999;*/
  }
</style>
<style>
  .historicalRecordHeaderInput2 .el-input__inner{
    border-radius: 40px;
    background-color: transparent;
    border: 1px solid #59fdff;;
  }
</style>
