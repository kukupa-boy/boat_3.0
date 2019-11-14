<template>
<!--监控画面子组件-->
  <div class="monitoringManagementFrame">
    <div><img :src=url alt=""></div>
    <div class="monitoringManagementFrameHeader">
      <!--<el-input placeholder="请输入摄像头编号" suffix-icon="el-icon-search" class="operationPersonnelHeaderInput"  v-model="search" clearable></el-input>-->
      <span class="el-icon-back monitoringManagementFrameHeaderInput" @click="goBack()"></span>
      <!--<searchBox class="alarmMessageHeaderInput" hint="请输入警报船队"></searchBox>-->
      <span class="num">{{this.num}}</span>
      <div style="float: right">
        <el-button type="primary" @click="open();expel()" class=" button"><span class="icon-8"></span>&nbsp;&nbsp;驱逐外来船只</el-button>
        <el-button type="primary" @click="open();add()" class=" button"><span class="icon-22"></span>&nbsp;&nbsp;添加监控画面</el-button>
        <el-button type="primary" @click="historicalRecord()" class="button"><span class="icon-20"></span>&nbsp;&nbsp;历史记录</el-button>
      </div>
    </div>
    <add :show.sync="show" :title1="title1"></add>
  </div>
</template>

<script>
  import add from "./add.vue"
    export default {
      name: "monitoringManagementFrame",
      components: {
        add
      },
      data(){
        return{
          title1:'',
          show: false,
          num:'',//header编号
          url:'',//背景图片地址
          tableData: [
            {
            num:'1',//摄像头编号
            url:require('../../../../../assets/video_system/image/image_t/11.jpg'),//图片路径
            model:'BTWS',//型号
            longitude:'160°',//经度
            latitude:'118°',//纬度
            cameraStatus:'运行',//摄像头状态
            reportingTime:'20.19.10.16 15:30',//上报时间
            remarks:'无备注',//备注
          },
            {
              num:'2',//摄像头编号
              url:require('../../../../../assets/video_system/image/image_t/22.jpg'),//图片路径
              model:'',//型号
              longitude:'',//经度
              latitude:'118°',//纬度
              cameraStatus:'运行',//摄像头状态
              reportingTime:'20.19.10.16 15:30',//上报时间
              remarks:'无备注',//备注
            },
            {
              num:'3',//摄像头编号
              url:require('../../../../../assets/video_system/image/image_t/33.jpg'),//图片路径
              model:'',//型号
              longitude:'',//经度
              latitude:'118°',//纬度
              cameraStatus:'运行',//摄像头状态
              reportingTime:'20.19.10.16 15:30',//上报时间
              remarks:'无备注',//备注
            },
            {
              num:'4',//摄像头编号
              url:require('../../../../../assets/video_system/image/image_t/44.jpg'),//图片路径
              model:'',//型号
              longitude:'',//经度
              latitude:'118°',//纬度
              cameraStatus:'运行',//摄像头状态
              reportingTime:'20.19.10.16 15:30',//上报时间
              remarks:'无备注',//备注
            },
            {
              num:'5',//摄像头编号
              url:require('../../../../../assets/video_system/image/image_t/55.jpg'),//图片路径
              model:'',//型号
              longitude:'',//经度
              latitude:'118°',//纬度
              cameraStatus:'运行',//摄像头状态
              reportingTime:'20.19.10.16 15:30',//上报时间
              remarks:'无备注',//备注
            },
            {
              num:'6',//摄像头编号
              url:require('../../../../../assets/video_system/image/image_t/66.jpg'),//图片路径
              model:'',//型号
              longitude:'',//经度
              latitude:'118°',//纬度
              cameraStatus:'运行',//摄像头状态
              reportingTime:'20.19.10.16 15:30',//上报时间
              remarks:'无备注',//备注
            },
            {
              num:'7',//摄像头编号
              url:require('../../../../../assets/video_system/image/image_t/7.png'),//图片路径
              model:'',//型号
              longitude:'',//经度
              latitude:'118°',//纬度
              cameraStatus:'运行',//摄像头状态
              reportingTime:'20.19.10.16 15:30',//上报时间
              remarks:'无备注',//备注
            },
            {
              num:'8',//摄像头编号
              url:require('../../../../../assets/video_system/image/image_t/88.jpg'),//图片路径
              model:'',//型号
              longitude:'',//经度
              latitude:'118°',//纬度
              cameraStatus:'运行',//摄像头状态
              reportingTime:'20.19.10.16 15:30',//上报时间
              remarks:'无备注',//备注
            },
          ],
        }
      },
      mounted () {
        // console.log(this.$route.params.userId)
        this.num=this.$route.params.userId;
        console.log(this.num);
        for (let i=0;i<this.tableData.length;i++){
          if(this.num ==this.tableData[i].num){
            this.url=this.tableData[i].url;
          }
        }
      },
      methods:{
        open () {
          this.show = true;
        },
        //驱逐外来船只
        expel(){
          this.title1 ='驱逐外来船只';
        },
        //添加监控画面
        add(){
          this.title1 ='添加监控目标'
        },
        //历史记录
        historicalRecord(){
          this.$router.push({name:"historicalRecord",params:{ userId: this.num}})
        },
        goBack(){
          this.$router.push({name:"monitoringManagement",params:{ userId: this.num}})
        }
      }
    }
</script>

<style scoped>
  @import "../../../../../assets/public/icomoon/style.css";
.monitoringManagementFrame{
  height: 100%;
  padding: 20px;box-sizing: border-box;
  position: relative;
  border-radius: 30px;
  /*background-image: url('../../../../../assets/video_system/image/image_t/11.jpg');*/
  /*background-size: 100% 100%;*/
  /*background-repeat:no-repeat;*/
  background-color: rgb(239,239,239);
  /*border: 1px solid red;*/
  /*background-color: rgb(239,239,239);*/
}
  .monitoringManagementFrame >:nth-child(1){
    width: 100%;
    height: 100%;
    /*border: 1px solid red;*/
    border-radius: 10px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .monitoringManagementFrame >:nth-child(1) >img{
    width: 100%;
    height: 100%;
  }
.monitoringManagementFrameHeader{
  height: 50px;
  width: 100%;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0);
}
.monitoringManagementFrameHeaderInput{
  display: inline-block;
  font-size: 24px;
  width: 30px;
  height: 30px;
  color: white;
  line-height: 30px;
  text-align: center;
  border-radius: 40px;
  border: 2px solid white;
}
@font-face {
  font-family: 'icomoon';
  src: url('../../../../../assets/public/icomoon/fonts/icomoon.eot');
  src: url('../../../../../assets/public/icomoon/fonts/icomoon.eot?#iefix') format('embedded-opentype'),
  url('../../../../../assets/public/icomoon/fonts/icomoon.woff') format('woff'),
  url('../../../../../assets/public/icomoon/fonts/icomoon.ttf') format('truetype');
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
  .num{
    display: inline-block;
    font-size: 24px;
    width: 40px;
    height: 40px;
    background-color: #67a3e9;
    color: white;
    line-height: 40px;
    text-align: center;
    border-radius: 40px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
.button{
  padding: 10px;
  border-radius: 20px;
  color: rgb(44,100,228);
  font-size: 16px;
  background-color: #d9eaff;
}
</style>
