<!-- 

nameList:[array],必选，对应柱子名字
valueList:[array],必选，对应柱子值
colorList:[array],可选，对应柱子颜色，默认随机

unit:[string],可选，数据的单位，默认空
-->

<template>
  <div class="box">
    <div class="main" ref="main"></div>
  </div>
</template>

<script>
  export default {
    name: "operationPersonnelStateDetails",
    data(){
      return{
        innerData:{},
        colorCan:[
          'rgb(236, 112, 107)',
          'rgb(235, 159, 88)',
          'rgb(236, 211, 69)',
          'rgb(169, 202, 50)',
          'rgb(126, 209, 70)',
          'rgb(86, 212, 143)',
          'rgb(87, 211, 194)',
          'rgb(87, 165, 211)',
          'rgb(102, 134, 223)',
          'rgb(147, 124, 231)',
          'rgb(192, 124, 231)',
          'rgb(231, 124, 213)',
          'rgb(231, 124, 178)'
        ],
      }
    },
    created(){

    },
    mounted(){
      this.innerData=this.data;
      this.randomColor();
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
            left: '20%',
            top: '12%',
          },
          xAxis: {
            type: "category",
            // data: [
            //   "正常",
            //   "危险",
            //   "冻结",
            // ],
            data: this.innerData.nameList,
            itemStyle: {
              narmal: {
                color: "#59fdff",
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
              // data: [120, 100, 150],
              data: this.innerData.valueList,
              type: "bar",
              barWidth: "40%",//柱子宽
              itemStyle: {
                normal: {
                  //每根柱子颜色设置
                  color: (params)=> {
                    // let colorList = [
                    //   "#2ADFD9",
                    //   "#D76662",
                    //   "#E7A71D",
                    // ]
                    let colorList = this.innerData.colorList;
                    return colorList[params.dataIndex];
                  }
                }
              },
              //柱状图上显示数据
              label: {
                show: "true",
                position: "top",
                color: "#59fdff",
                fontWeight: "normal",
                // backgroundColor: "auto",
                fontSize: "12",
                // formatter: '{c}'+'个',
                formatter: '{c}' + this.innerData.unit||'',
              },
            }
          ]
        };
        myChart.setOption(option);
        window.addEventListener("resize",function(){
          myChart.resize();
        });
      },
      randomColor(){
        if(!this.innerData.colorList||this.innerData.colorList.length<=0){
          this.innerData.colorList=[];
          for(let i=0;i<this.innerData.nameList.length;i++){
            this.innerData.colorList.push(this.colorCan[i%this.colorCan.length]);
          }
        }else{
          return;
        }
      }
    },
    props:{
      data:{default:{}},
    }
  }
</script>

<style scoped>
  .box{
    height: 80%;
    width: 100%;
    position: absolute;
    top: 20%;
    left: 0;
  }
  .box>div{
    height: 100%;
    width: 100%;
  }
</style>
