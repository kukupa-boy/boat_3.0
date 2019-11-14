<template>
  <div class="bar_chart">
    <div class="icon">
      <i class="fa fa-caret-down" aria-hidden="true"></i><span>状态详情</span>
    </div>
    <div id="mainBox" style="height: 90%;">
    </div>
  </div>
</template>

<script>
    export default {
        name: "bar_chart",
      data(){
        return{
          dataList:{
            noticNumber: "11111",
            alarmNumber: "11111",
            generalNumber: "11111",
            urgentNumber: "11111",
            yan:this.$store.state.messageParams,
            normal:"",
            abnormal:""
          }
        }
      },
      mounted(){
        this.axios.get(`api/ship/visualizationShip`)
          .then(
            (data) => {
              console.log(data)
              var resData=data.data.data
              //正常数据
              this.normal=resData.normal;
              //异常数据
              this.abnormal=resData.abnormal;
              this.bar_chart()
            }
          ).catch((err) => {
          console.log("这个请求消息列表中的错误")
          console.log(err)
        });
      },
      // updated(){
      //   this.axios.get(`api/ship/visualizationShip`)
      //     .then(
      //       (data) => {
      //         console.log(data)
      //         this.bar_chart()
      //         var resData=data.data.data
      //         //正常数据
      //         this.normal=resData.normal;
      //         //异常数据
      //         this.abnormal=resData.abnormal;
      //       }
      //     ).catch((err) => {
      //     console.log("这个请求消息列表中的错误")
      //     console.log(err)
      //   });
      // },
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
              data: ['正常','异常'],
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
            series: [
              {
                name: '船舶数量',
                type: 'bar',
                stack: '总量',
                data: [parseInt(this.normal),parseInt(this.abnormal)],
                 barWidth : 60,
                color: function (params){
                  var colorList = [ '#2adfd9','#d76662'];
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
      computed: {
        //监听新增船舶中是否进行了新增加
        addBoat() {
          return this.$store.state.insertBoat
        }
      },
      watch: {
        addBoat(newCount, oldCount) {
          if(newCount!==oldCount){
            this.axios.get(`api/ship/visualizationShip`)
              .then(
                (data) => {
                  console.log(data)
                  var resData=data.data.data
                  //正常数据
                  this.normal=resData.normal;
                  //异常数据
                  this.abnormal=resData.abnormal;
                  this.bar_chart()
                }
              ).catch((err) => {
              console.log("这个请求消息列表中的错误")
              console.log(err)
            });
          }
        }
      },
    }
</script>

<style scoped>
  .bar_chart{
    display: block;
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
