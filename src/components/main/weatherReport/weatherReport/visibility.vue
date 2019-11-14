<template>
  <div>
    <div class="visibility">
      <!--这是时间-->
      <div>
        <img src="../../../../assets/public/img/Meteorological/realTimeAirVisibility.png" alt="">
      </div>
      <!--这是中间的部分-->
      <div class="middle">
        <div>
          <div id="main" ref="main"></div>
        </div>
      </div>
      <!--这是下边部分-->
      <div class="bottom">
        <span>能见度</span>
        <span>6~9级</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "visibility",
    data(){
      return{
        cor:'',//温度颜色
        date:'',//当前日期
        thermometer:28, //温度
        humidity:'70%', //湿度
        winddir:'180°', //风向
        pressure:'1100hpa', //压强
        visibility:'2km' //能见度
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
      // addDate() {
      //   let nowDate = new Date();
      //   let date = {
      //     year: nowDate.getFullYear(),
      //     month: nowDate.getMonth() + 1,
      //     date: nowDate.getDate(),
      //   };
      //   if (date.month >= 1 && date.month <= 9) {
      //     date.month = "0" + date.month;
      //   }
      //   if (date.date >= 0 && date.date <= 9) {
      //     date.date = "0" + date.date;
      //   }
      //   this.date = date.year + '/'  + date.month + '/'  + date.date;
      // },
      draw(){
        var myChart = echarts.init(this.$refs.main);
        // 使用刚指定的配置项和数据显示图表。
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          // legend: {
          //   orient: 'vertical',
          //   x: 'left',
          //   data:['直接访问']
          // },
          series: [
            {
              name:'访问来源',
              type:'pie',
              radius: ['50%', '70%'],
              clockWise:false,
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '14',
                    // fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0.5,
                y2: 1,
                colorStops: [//{
                  {offset: 0.5, color: '#59fdff' // 50% 处的颜色
                  },
                ],
              },
              data:[
                {value:28, name:'气温'}
              ]
            }
          ]
        };
        myChart.setOption(option);
        // window.onresize = myChart.resize;
        window.addEventListener("resize",function(){
          myChart.resize();
        });
      }
    }
  }
</script>

<style scoped>
  .visibility{
    width:100%;
    height: 100%;
    /*border-radius: 10px;*/
    padding: 10px;
    position: relative;
    box-sizing: border-box;
    /*background-color: rgb(2,28,29);*/
    color: #59fdff;
  }
  .visibility>:nth-child(1){
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
