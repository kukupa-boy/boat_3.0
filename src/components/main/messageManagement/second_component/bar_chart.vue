<template>
  <div class="bar_chart">
    <div class="icon">
      <i class="fa fa-caret-down" aria-hidden="true"></i><span>状态详情</span>
    </div>
    <div id="mainBox" style="height: 88%;">
    </div>
    <div style="opacity: 0">{{this.$store.state.messageParams}}{{this.$store.state.deleteMessageId}}</div>
  </div>
</template>

<script>
    export default {
        name: "bar_chart",
      data(){
        return{
          dataList:{
            noticNumber: "1022",
            alarmNumber: "0",
            generalNumber: "1",
            urgentNumber: "1"
          }
        }
      },
        mounted() {
          // this.bar_chart();
        //请求后台的数据并且赋值
        //请求后台的数据，将他赋值到饼图中
        this.axios.get(`api/message/getSendMessageView?keys=${this.$store.state.messageParams}`)
          .then(
            (data) => {
              var a=data.data.data;
              this.dataList.noticNumber=a.noticNumber;
              this.dataList.alarmNumber=a.alarmNumber;
              this.dataList.generalNumber=a.generalNumber;
              this.dataList.urgentNumber=a.urgentNumber;
              // console.log(this.dataList)
              this.bar_chart();
            }
          ).catch((err) => {
          console.log("这个请求消息列表中的错误")
          console.log(err)
        });
      },
      updated() {

        //请求后台的数据并且赋值
        //请求后台的数据，将他赋值到饼图中
        this.axios.get(`api/message/getSendMessageView?keys=${this.$store.state.messageParams}`)
          .then(
            (data) => {
              var a=data.data.data;
              this.dataList.noticNumber=a.noticNumber;
              this.dataList.alarmNumber=a.alarmNumber;
              this.dataList.generalNumber=a.generalNumber;
              this.dataList.urgentNumber=a.urgentNumber;
              // console.log(this.dataList)
              this.bar_chart();
            }
          ).catch((err) => {
          console.log("这个请求消息列表中的错误")
          console.log(err)
        });

      },

      methods:{
        bar_chart(){
          console.log(document.getElementById('mainBox'));
          var myChart =echarts.init(document.getElementById('mainBox'));
          var itemStyle = {
            normal: {
              opacity: 0,
              color: {
                // image: piePatternImg,
                repeat: 'repeat'
              },
              borderWidth: 3,
              borderColor: 'red'
            }
          };
          var option = {
            backgroundColor:"transparent",
            // legend: {
            //   data: ['直接访问', '邮件营销','联盟广告',]
            // },
            grid: {
              left: '3%',
              right: '6%',
              bottom: '10%',
              top:"10%",
              containLabel: true
            },
            tooltip: {
            },
            yAxis:  {
              type: 'value',
              splitLine:{show: false},//去除网格线
              axisLine:{
                show:true,
                onZero:true,
                lineStyle:{
                  color:"#2adfd9",
                  width: 2,
                  type: 'solid'
                }
              }
            },
            xAxis: {
              type: 'category',
              data: ['公告' ,'警报','普通', '紧急'],
              axisLine:{
                show:true,
                onZero:true,
                lineStyle:{
                  color:"#2adfd9",
                  width: 2,
                  type: 'solid'
                }
              },
              axisLabel: {
                interval: 0, //横轴信息全部显示
                textStyle: {
                  fontSize: 15, //X轴字体大小
                  colors: ["#a4bcff","#e7a71d", '#2adfd9','#d76662'] //X轴字体颜色
                },
              },
            },
            series: [
              {
                name: '消息数量',
                type: 'bar',
                stack: '总量',

                data: [this.dataList.noticNumber,this.dataList.alarmNumber,this.dataList.generalNumber,this.dataList.urgentNumber],
                 barWidth :20,
                color: function (params){
                  var colorList =["#a4bcff","#e7a71d", '#2adfd9','#d76662'];
                  return colorList[params.dataIndex];
                },
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      position: 'top',
                      distance:5,
                      color: '#F7EFBE',
                      formatter: '{c}条' //显示数值
                    }}}
              },
              // {
              //   name: '邮件营销',
              //   type: 'bar',
              //   stack: '总量',
              //   data: [5,5,5,5],
              //   barWidth :20,
              //   itemStyle:{
              //     color:"transparent"
              //   },
              //
              // },
              // {
              //
              //   name: '联盟广告',
              //   type: 'bar',
              //   stack: '总量',
              //   data: [5,5,5,5],
              //    barWidth :20,
              //   color: function (params){
              //     var colorList =["#a4bcff","#e7a71d", '#2adfd9','#d76662'];
              //     return colorList[params.dataIndex];
              //   }
              // },
              // {
              //
              //   name: '邮件营销',
              //   type: 'bar',
              //   stack: '总量',
              //   data: [5,5,5,5],
              //   barWidth :20,
              //   itemStyle:{
              //     color:"transparent"
              //   }
              // },
              // {
              //
              //   name: '联盟广告',
              //   type: 'bar',
              //   stack: '总量',
              //   data: [5,5,5,5],
              //   barWidth :20,
              //   color: function (params){
              //     var colorList =["#a4bcff","#e7a71d", '#2adfd9','#d76662'];
              //     return colorList[params.dataIndex];
              //   }
              // },
              // {
              //   name: '邮件营销',
              //   type: 'bar',
              //   stack: '总量',
              //   data: [5,5,5,5],
              //   barWidth : 20,
              //   itemStyle:{
              //     color:"transparent"
              //   }
              // },
              // {
              //
              //   name: '联盟广告',
              //   type: 'bar',
              //   stack: '总量',
              //   data: [5,5,5,5],
              //   barWidth :20,
              //   color: function (params){
              //     var colorList =["#a4bcff","#e7a71d", '#2adfd9','#d76662'];
              //     return colorList[params.dataIndex];
              //   }
              //
              // },
              // {
              //
              //   name: '邮件营销',
              //   type: 'bar',
              //   stack: '总量',
              //   data: [5,5,5,5],
              //   barWidth :20,
              //   itemStyle:{
              //     color:"transparent"
              //   }
              // },
              // {
              //
              //   name: '联盟广告',
              //   type: 'bar',
              //   stack: '总量',
              //   data: [5,5,5,5],
              //   barWidth :20,
              //   color: function (params){
              //     var colorList =["#a4bcff","#e7a71d", '#2adfd9','#d76662'];
              //     return colorList[params.dataIndex];
              //   }
              // },

          ],
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: 'black'
                }
              }
            }
          };
          myChart.setOption(option);
          window.addEventListener("resize",function(){
            myChart.resize();
          });
        }
      },


    }
</script>

<style scoped>
  .bar_chart{
    display: block;
    width: 100%;
    margin: 0 auto;
    height: 100%;
  }
  .icon{
    height: 10%;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 5%;
    box-sizing: border-box;
  }
  .icon i{
    transform: rotate(-90deg);
    font-size: 24px;
    color:  rgb(160,253,255);
    vertical-align: middle;
  }
  .icon span {
    padding-left: 2%;
    color: white;
    vertical-align: middle;
    font-size: 18px;
    display: inline-block;
    width: 60%;
  }
  #mainBox{
    width: 100%;
  }
</style>
