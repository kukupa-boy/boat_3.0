<template>
  <!--历史记录子组件-->
  <div class="historicalRecordFrame">
    <div><img :src=url alt=""></div>
    <div class="historicalRecordFrameHeader">
      <!--<el-input placeholder="请输入摄像头编号" suffix-icon="el-icon-search" class="operationPersonnelHeaderInput"  v-model="search" clearable></el-input>-->
      <span class="el-icon-back historicalRecordFrameHeaderInput" @click="goBack()"></span>
      <span class="num">{{this.num}}</span>
    </div>
    <div class="time"><span>2019-10-25</span></div>
  </div>
</template>

<script>
  export default {
    name: "historicalRecordFrame",
    components: {

    },
    data(){
      return{
        num:'',//父路由传过来的id
        fatherNum:'',//返回给父路由的id
        url:'',//背景图片的路径
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
      console.log(this.$route.params.Id);
      this.num=this.$route.params.Id;
      console.log(this.$route.params.userId);
      this.fatherNum=this.$route.params.userId;
      for (let i=0;i<this.tableData.length;i++){
        if(this.num ==this.tableData[i].num){
          this.url=this.tableData[i].url;
        }
      }
    },
    methods:{
      goBack(){
        this.$router.push({name:"historicalRecord",params:{userId: this.fatherNum}})
      }
    }
  }
</script>

<style scoped>
  .historicalRecordFrame{
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    /*border: 1px solid red;*/
    border-radius: 30px;
    background-image: url('../../../../../assets/video_system/image/image_t/11.jpg');
    background-size: 100% 100%;
    background-repeat:no-repeat;

    /*border: 1px solid red;*/
    /*background-color: rgb(239,239,239);*/
  }
  .historicalRecordFrameHeader{
    height: 50px;
    width: 100%;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0);
  }
  .historicalRecordFrameHeaderInput{
    display: inline-block;
    font-size: 24px;
    width: 30px;
    height: 30px;
    color: white;
    line-height: 30px;
    text-align: center;
    border-radius: 40px;
    border: 3px solid white;
  }
  .historicalRecordFrame >:nth-child(1){
    width: 100%;
    height: 100%;
    /*border: 1px solid red;*/
    border-radius: 10px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .historicalRecordFrame >:nth-child(1) >img{
    width: 100%;
    height: 100%;
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
  .time{
    position: absolute;
    right: 40px;
    bottom: 40px;
    font-size: 24px;
    color: white;
  }
</style>
