<template>
  <div>
    <div class="pressure">
      <!--这是时间-->
      <div>
        <img src="../../../../assets/public/img/Meteorological/realTimeAirPressure.png" alt="">
      </div>
      <!--这是中间的部分-->
      <div class="middle">
        <div>
          <div id="main" ref="main"></div>
        </div>
      </div>
      <!--这是下边部分-->
      <div class="bottom">
        <span>气压</span>
        <span>90~120kpa</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "pressure",
    data(){
      return{

      }
    },
    created(){
      // this.addDate();
      // this.axios.get('http://api.shipxy.com/apicall/GetWeatherTime?k=e38ef584670348ceae168fe5f3985fa4').then((res,req)=>{
      //   // console.log(res)
      //   let arr=res.data.data;
      //   console.log(arr[2])
      //   this.axios.get(`http://api.shipxy.com/apicall/GetWeatherByPoint?k=e38ef584670348ceae168fe5f3985fa4&type=11,12,17&time=${arr[2]}&lon=155.2134&lat=24.1234`).then((res)=>{
      //     // console.log(res)
      //     // console.log(res.data.data[0]);
      //     let arr2 =res.data.data[0]
      //     this.thermometer =arr2.temperature;
      //     this.humidity =arr2.humidity +'%';
      //     this.winddir =arr2.winddir +'°';
      //     this.visibility =arr2.visibility +'km';
      //     this.pressure =arr2.pressure +'hpa';
      //     // console.log(this.thermometer)
      //     this.draw(this.thermometer)
      //   })
      // })
    },
    mounted(){
      this.draw()
    },
    methods:{
      draw(){
        var myChart = echarts.init(this.$refs.main);
        // 使用刚指定的配置项和数据显示图表。
        let option = {
          // backgroundColor: '#1b1b1b',
          tooltip : {
            formatter: "{a} <br/>{c} {b}"
          },
          series : [
            {
              name:'速度',
              type:'gauge',
              min:0,
              max:110,
              splitNumber:11,
              radius: '80%',
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
                  width: 3,
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              axisLabel: {// 坐标轴小标记仪表盘刻度
                textStyle: {// 属性lineStyle控制线条样式
                  // fontWeight: 'bolder',
                  color: '#fff',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 1
                }
              },
              axisTick: {            // 坐标轴小标记
                length :4,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: 'auto',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              splitLine: {           // 分隔线
                length :8,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                  width:3,
                  color: '#fff',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              pointer: {           //仪表盘指针
                shadowColor : '#fff', //默认透明
                shadowBlur: 5
              },
              title : {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  fontWeight: 'bolder',
                  fontSize: 14,
                  fontStyle: 'italic',
                  color: '#fff',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              detail : {//仪表盘详情
                backgroundColor: 'rgba(30,144,255,0.8)',
                borderWidth: 1,
                borderColor: '#fff',
                shadowColor : '#fff', //默认透明
                shadowBlur: 2,
                offsetCenter: [0, '70%'],       // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  // fontWeight: 'bolder',
                  fontSize:12,
                  color: '#fff'
                }
              },
              data:[{value: 100, name: 'kpa'}]
            },
          ]
        };
        setInterval(function (){
          // option.series[0].data[0].value = (Math.random()*2).toFixed(2) - 0;
          myChart.setOption(option);
        },2000)

        //屏幕缩小重新渲染
        // myChart.setOption(option);
        // // window.onresize = myChart.resize;
        window.addEventListener("resize",function(){
          myChart.resize();
        });
      }
    }
  }
</script>

<style scoped>
  .pressure{
    width:100%;
    height: 100%;
    /*border-radius: 10px;*/
    padding: 10px;
    position: relative;
    box-sizing: border-box;
    /*background-color: rgb(2,28,29);*/
    color: #59fdff;
  }
  .pressure>:nth-child(1){
    text-align: center;
    /*border: 1px solid red;*/
  }
  /*这是中间*/
  .middle{
    width:100%;
    height: 80%;
    color: red;
    /*background-color: #2c64e4;*/
    position: absolute;
    top: 10%;
    left: 0;
  }
  .middle >div{
    width: 100%;
    height: 100%;
  }
  .middle > div:nth-child(1){
    /*border: 1px solid red;*/
    position: absolute;
  }

  /*这是底部*/
  .bottom{
    width:70%;
    height: 15%;
    font-size: 14px;
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    /*background-color: red;*/
    /*text-align: center;*/
  }
  .bottom>:nth-child(1){
    margin-right: 10%;
  }
  #main{
    /*background-color: #55a532;*/
    width: 100%;
    height: 100%;
  }
</style>
