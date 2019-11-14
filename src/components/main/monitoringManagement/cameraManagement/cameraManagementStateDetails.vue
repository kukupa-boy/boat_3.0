<template>
  <div class="box">
    <div class="main" ref="main"></div>
  </div>
</template>

<script>
  export default {
    name: "cameraManagementStateDetails",
    data(){
      return{

      }
    },
    created(){

    },
    mounted(){
      this.draw()
    },
    methods:{
      draw(){
        var myChart = echarts.init(this.$refs.main);
        // 使用刚指定的配置项和数据显示图表。
        let option = {
          //标题配置信息
          title : {
            text: '',
            subtext: '',
            x:'center'
          },
          grid: {
            left: '15%',
            top: '12%',
          },
          xAxis: {
            type: "category",
            data: [
              "启用",
              "禁用",
            ],
            itemStyle: {
              narmal: {
                color: "#59fdff"
              }
            },
            axisLine: { //坐标轴轴线相关设置。
              show: true,
              lineStyle: {//设置轴线颜色和粗细
                color:'#59fdff',
                width:2,//这里是为了突出显示加上的
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#59fdff',
                // fontSize: '38',//字体大小
              },
              fontSize: 14,//字体大小
            },
          },
          yAxis: {
            type: "value",
            splitLine: {
              show: false,
              lineStyle: {
                color: '#59fdff'
              }
            },
            axisLine: { //坐标轴轴线相关设置。
              show: true,
              lineStyle: {//设置轴线颜色和粗细
                color:'#59fdff',
                width:2,//这里是为了突出显示加上的
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#59fdff',
                // fontSize: '38',//字体大小
              },
              fontSize: 14,//字体大小
            },
          },
          series: [
            {
              data: [25, 5],
              type: "bar",
              barWidth: "50%",
              itemStyle: {
                normal: {
                  //每根柱子颜色设置
                  color: function(params) {
                    let colorList = [
                      "#2ADFD9",
                      "#D76662",
                    ];
                    return colorList[params.dataIndex];
                  }
                }
              },
              //柱状图上显示数据
              label: {
                show: "true",
                position: "top",
                color: "#59fdff",
                fontWeight: "bolder",
                // backgroundColor: "auto",
                fontSize: "14",
                formatter: '{c}'+'人',
              },
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
  .box{
    height: 80%;
    width: 100%;
    position: absolute;
    top: 10%;
    left: 0;
  }
  .box>div{
    height: 100%;
    width: 100%;
  }
</style>
