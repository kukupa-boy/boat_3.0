<template>
  <div>
    <div class="tem_sun_moon_pre">
      <div class="left">
        <!--能见度-->
        <div>
          <visibility></visibility>
        </div>
        <!--天气-->
        <div class="temperature">
        <Thermometer></Thermometer>
        </div>
        <!--气压-->
        <div>
          <pressure></pressure>
        </div>
      </div>
      <div class="middle">
        <!--地球-->
        <div class="announcement">
          <img src="../../../../assets/public/img/Meteorological/gonggao.png" alt="">
          <span>可出海船舶:</span>
          <span>{{gonggao}}</span>
        </div>
        <div class="earth"></div>
        <!--day-->
        <div class="day">
          <div><div></div><span>10-30</span></div>
          <div><div></div><span>10-31</span></div>
          <div><div></div><span>11-01</span></div>
          <div><div></div><span>11-02</span></div>
          <div><div></div><span>11-03</span></div>
          <div><div></div><span>11-04</span></div>
          <div><div></div><span>11-05</span></div>
        </div>
      </div>
      <div class="right">
        <!--浪高-->
        <div>
          <waveHeight></waveHeight>
        </div>
        <!--风向-->
        <div>
          <windDirection></windDirection>
        </div>
        <!--降水量-->
        <div>
          <Precipitation></Precipitation>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Thermometer from "../weatherReport/Thermometer.vue"
  import waveHeight from "../weatherReport/waveHeight.vue"
  import windDirection from "../weatherReport/windDirection.vue"
  import Precipitation from "../weatherReport/Precipitation.vue"
  import visibility from "../weatherReport/visibility.vue"
  import pressure from "../weatherReport/pressure.vue"
  // import BrokenLineDiagram from "../../../common/common_t/BrokenLineDiagram.vue"
  // import OperationPersonnel from "../../../common/common_t/OperationPersonnel.vue"
  export default {
    name: 'defualtComponnets',
    components:{
      Thermometer,
      // BrokenLineDiagram,
      waveHeight,
      windDirection,
      Precipitation,
      visibility,
      pressure
      // OperationPersonnel
    },
    data(){
      return{
        toSonData:'temperature',
        gonggao:"001，002,003,004,005,006,007,008,009,010",
      }
    },
    created(){

    },
    mounted(){
      this.lang()
    },
    methods:{
      // 实现公告轮播
      lang(){
        setInterval(()=>{
          //获取到头的第一个字符
          let start = this.gonggao.substring(0,1);
          //获取到后面所有的字符
          let end = this.gonggao.substring(1);
          //重新拼接得到新的字符串，并复制给this.msg
          this.gonggao=end+start;
        },1000)
      },
    }
  }
</script>

<style scoped>
  /*温度，sun，moon总体的布局*/
  .tem_sun_moon_pre{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    /*background-color: rgba(1,32,70,0.8);*/
    display: flex;
  }
  .tem_sun_moon_pre >div{
    display: flex;
    justify-content: center;
  }
  .left{
    width: 15%;
    height: 100%;
    /*border: 1px solid red;*/
    display: flex;
    flex-wrap: wrap;
  }
  .left>div{
    height: 33.3%;
    width: 100%;
    /*border: 1px solid red;*/
  }
  .left>div>div{
    height: 100%;
    width: 100%;
  }
  /*动画*/
  @-webkit-keyframes rotate{from{-webkit-transform: rotate(0deg)}
    to{-webkit-transform: rotate(360deg)}
  }
  @-moz-keyframes rotate{from{-moz-transform: rotate(0deg)}
    to{-moz-transform: rotate(359deg)}
  }
  @-o-keyframes rotate{from{-o-transform: rotate(0deg)}
    to{-o-transform: rotate(359deg)}
  }
  @keyframes rotate{from{transform: rotate(0deg)}
    to{transform: rotate(359deg)}
  }
  /*动画*/

  .middle{
    width: 50%;
    height:100%;
    background-image: url("../../../../assets/public/img/Meteorological/background.png");
    background-size: cover;
    background-position: 40% 30%;
    position: relative;
    /*border: 2px solid red;*/
    overflow: hidden;
  }
  /*公告*/
  .announcement{
    width: 80%;
    height: 40px;
    color: #59fdff;
    line-height: 40px;
    background-image: url("../../../../assets/public/img/Meteorological/bjk.png");
    background-size: 100% 100%;
    position: relative;
    overflow: hidden;
  }
  .announcement img{
    position: absolute;
    left: 25px;
    top: 30%;
  }
  .announcement>:nth-child(2){
    position: absolute;
    left: 50px;
  }
  .announcement>:nth-child(3){
    position: absolute;
    left: 150px;
  }
  .earth{
    height: 500px;
    width: 500px;
    background-image: url("../../../../assets/public/img/Meteorological/earthBackGround.png");
    background-size: cover;
    position: absolute;
    top: 30%;
    /*bottom: 0;*/
    left: 0;
    right: 0;
    margin: auto;
  }
  @media screen and (max-width: 1400px) {
    .earth {
      height: 355px;
      width: 355px;
    }
  }
  .day >div{
    height: 60px;
    width: 60px;
    line-height: 60px;
    text-align: center;
    /*border: 1px solid red;*/
    position: absolute;
  }
  .day >div>div{
    background-image: url("../../../../assets/public/img/Meteorological/dayBackGround.png");
  }
  .day>:nth-child(1)>div,
  .day>:nth-child(3)>div,
  .day>:nth-child(5)>div,
  .day>:nth-child(7)>div{
    height: 100%;
    width: 100%;
    animation: rotate 3s linear infinite;
  }
  .day>:nth-child(2)>div,
  .day>:nth-child(4)>div,
  .day>:nth-child(6)>div{
    height: 100%;
    width: 100%;
    animation: rotate 6s linear infinite;
  }

  .day>:nth-child(1)>span,
  .day>:nth-child(2)>span,
  .day>:nth-child(3)>span,
  .day>:nth-child(4)>span,
  .day>:nth-child(5)>span,
  .day>:nth-child(6)>span,
  .day>:nth-child(7)>span{
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 99;
  }
  .day>:nth-child(1),
  .day>:nth-child(2),
  .day>:nth-child(3),
  .day>:nth-child(4),
  .day>:nth-child(5),
  .day>:nth-child(6),
  .day>:nth-child(7){
    position: absolute;
  }
  .day>:nth-child(1){
    top: 55%;
    left: 25%;
  }
  .day>:nth-child(2){
    top: 37%;
    left: 18%;
  }
  .day>:nth-child(3){
    top: 22%;
    left: 30%;
  }
  .day>:nth-child(4){
    top: 18%;
    right: 40%;
  }
  .day>:nth-child(5){
    top: 26%;
    right: 23%;
  }
  .day>:nth-child(6){
    top: 42%;
    right: 18%;
  }
  .day>:nth-child(7){
    top: 57%;
    right: 26%;
  }
  .right{
    width: 35%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .right>div{
    width: 100%;
    height: 33.3%;
    /*border: 1px solid red;*/
  }
  .right>div>div{
    height: 100%;
    width: 100%;
  }
  /*要移植的气温css*/
  .temperature{
    width: 100%;
    height: 100%;
    border-radius:10px;
    /*margin: 1px;*/
  }
  .temperature>div{
    width: 100%;
    height: 100%;
  }


</style>
