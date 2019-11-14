<template>
  <div>
    <div class="precipitation">
      <!--这是顶部-->
      <div>
        <img src="../../../../assets/public/img/Meteorological/realTimeAirPrecipitation.png" alt="">
      </div>
      <!--这是中间的部分-->
      <div class="middle">
        <div>
          <div class="main" ref="main"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Precipitation",
    data(){
      return{
        cor:'',//温度颜色
        date:'',//当前日期
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
          color:"#36FFFF",
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#37b048'
              },
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              axisLine: { //坐标轴轴线相关设置。
                show: true,
                lineStyle: {//设置轴线颜色和粗细
                  color:"#36FFFF",
                  width:2,//这里是为了突出显示加上的
                }
              },
              data : ['0','2:00','4:00','6:00','8:00','10:00','12:00','14:00','16:00'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} ',
              fontSize:12
            },
            axisTick: {//坐标轴刻度相关设置。
              show: false
            },
            axisLine: { //坐标轴轴线相关设置。
              show: true,
              lineStyle: {//设置轴线颜色和粗细
                color:"#36FFFF",
                width:2,//这里是为了突出显示加上的
              }
            },
            splitLine: { //坐标轴在 grid 区域中的分隔线
              show: false
            },
          },
          series : [
            {
              name:'直接访问',
              type:'bar',
              barWidth: '60%',
              data:[10, 20, 30, 40, 50, 60, 30,50,50]
            }
          ]
        };
        myChart.setOption(option);
        window.addEventListener("resize",function(){
          myChart.resize();
        });
      }
    }
  }
</script>

<style scoped>
  .precipitation{
    width:100%;
    height: 100%;
    /*border-radius: 10px;*/
    padding: 10px;
    position: relative;
    box-sizing: border-box;
    color: #59fdff;
  }
  .precipitation>:nth-child(1){
    width: 100%;
    text-align: center;
  }
  /*这是中间*/
  .middle{
    width:100%;
    height: 80%;
    color: red;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .middle >div{
    height: 100%;
    width: 100%;
  }
  .main{
    /*background-color: #55a532;*/
    width: 100%;
    height: 100%;
  }
</style>
