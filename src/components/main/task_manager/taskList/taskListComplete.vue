<template>
  <div class="box">
    <div class="main" ref="main"></div>
  </div>
</template>

<script>
    export default {
      name: "taskListComplete",
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
            tooltip : {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#37b048'
                },
              }
            },
            color: ["#0080ff","#4cd5ce"],
            // 设置右侧类型变换
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
                data : ['1月','2月','3月','4月','5月','6月'],
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
            // 数据区域缩放
            // dataZoom:[{
            //   type: 'slider',//图表下方的伸缩条
            // 　show : true, //是否显示
            // 　realtime : true, //拖动时，是否实时更新系列的视图
            // 　start : 0, //伸缩条开始位置（1-100），可以随时更改
            // 　end : 100, //伸缩条结束位置（1-100），可以随时更改
            // 　}],
            series : [
              {
                name:'完成总数',
                type:'line',
                smooth:true,//设置折线图平滑
                stack: '总量',
                itemStyle: {
                  normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
                        offset: 0, color: 'rgb(234,104,162)' // 0% 处的颜色
                      }, {
                        offset: 0.4, color: 'rgba(234,104,162,0.3)' // 100% 处的颜色
                      }, {
                        offset: 1, color: '#012046' // 100% 处的颜色
                      }]
                    ), //背景渐变色
                    lineStyle: {        // 系列级个性化折线样式
                      width: 3,
                      type: 'solid',
                      color: "rgba(234,104,162,0.5)" //折线的颜色
                    },
                  },
                  emphasis: {
                    color: 'rgb(234,104,162)',
                    lineStyle: {// 系列级个性化折线样式
                      width: 2,
                      type: 'dotted',
                      color: "rgb(234,104,162)"
                    }
                  }
                },//线条样式
                symbolSize:5, //折线点的大小
                //取消拐点的提示文字
                // label: {
                //   normal: {
                //     show: true,
                //     position: 'top',
                //     textStyle:{//拐点上标字体大小颜色
                //       color:'#36FFFF',
                //       fontSize:'12',
                //     }
                //   },
                // },
                // 这是设置下方区域
                areaStyle: {normal: {}},
                data:[150,300, 150,400,150,190]
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
