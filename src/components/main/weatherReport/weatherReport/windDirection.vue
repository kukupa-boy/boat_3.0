<template>
  <div>
    <div class="windDirection">
      <!--这是顶部-->
      <div>
        <img src="../../../../assets/public/img/Meteorological/realTimeAirWindDirection.png" alt="">
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
    name: "windDirection",
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
        let y=[100,150,180,200,300,80,100,200,200];
        let y1=[120,180,190,220,320,100,120,220,220];
        let breakPoint ='circle';//控制风向折点形状
        breakPoint = 'image:///static/img/fengxiang.1cb3c85.svg'
        let symbolRotateNum = y;// 旋转的度数
        let valueNum = y;// 数值
        let symbolRotateNum1 = y1;// 旋转的度数
        let valueNum1 = y1;// 数值
        let data = echarts.util.map(symbolRotateNum, function (item, index) {
          return {
            value: valueNum[index],
            symbolRotate:180-symbolRotateNum[index],
          };
        });
        let data1 = echarts.util.map(symbolRotateNum1, function (item, index) {
          return {
            value: valueNum1[index],
            symbolRotate:180-symbolRotateNum1[index],
          };
        });
        var myChart = echarts.init(this.$refs.main);
        // 使用刚指定的配置项和数据显示图表。
        let option = {
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#37b048'
              },
            }
          },
          legend: {
            data:['风力','风向'],
            x: 'left',
            textStyle:{//图例文字的样式
              color:"#36FFFF",
              fontSize:14
            }
          },
          color: ["#0080ff","#4cd5ce"],
          // toolbox: {
          //   feature: {
          //     saveAsImage: {}
          //   }
          // },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : ['0','2:00','4:00','6:00','8:00','10:00','12:00','14:00','16:00'],
              axisLine: { //坐标轴轴线相关设置。
                show: true,
                lineStyle: {//设置轴线颜色和粗细
                  color:"#36FFFF",
                  width:2,//这里是为了突出显示加上的
                }
              },
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
              name:'风力',
              type:'line',
              stack: '总量',
              symbolSize:50, //折线点的大小
              symbol: breakPoint,
              itemStyle:{
                normal:{
                  color:"#36FFFF",
                  borderColor:"#36FFFF",
                }
              },
              // 这是设置下方区域
              // areaStyle: {normal: {}},
              data:data
            },
            {
              name:'风向',
              type:'line',
              stack: '总量',
              smooth:false,//关键点，为true是不支持虚线的，实线就用true
              symbolSize:40, //折线点的大小
              symbol: breakPoint,
              itemStyle:{
                normal:{
                  color:"#36FFFF",
                  borderColor:"#36FFFF",
                  lineStyle:{
                    width:2,
                    type:'dotted'  //'dotted'虚线 'solid'实线
                  }
                }
              },
              // 设置折点字体
              // label: {
              //   normal: {
              //     show: true,
              //     position: 'top'
              //   }
              // },
              // 这是设置下方区域
              // areaStyle: {normal: {}},
              data:data1
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
  .windDirection{
    width:100%;
    height: 100%;
    /*border-radius: 10px;*/
    padding: 10px;
    position: relative;
    box-sizing: border-box;
    color: #59fdff;
  }
  .windDirection>:nth-child(1){
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
