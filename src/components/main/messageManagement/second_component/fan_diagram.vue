<template>
  <div class="fan_diagram">
  <div class="icon">
    <i class="fa fa-caret-down" aria-hidden="true"></i><span>人员状态</span>
  </div>
    <div id="main" style="height: 90%;"></div>
    <div style="opacity: 0">{{this.$store.state.messageParams}}{{this.$store.state.deleteMessageId}}</div>
  </div>
</template>

<script>
    export default {
        name: "fan_diagram",
      data(){
        return{
          dataList:{
            noticNumber: "11111",
            alarmNumber: "11111",
            generalNumber: "11111",
            urgentNumber: "11111",
            yan:this.$store.state.messageParams
          }
        }
      },
         mounted(){
           // this.fan_diagram();
           //请求后台的数据，将他赋值到饼图中
           this.axios.get(`api/message/getSendMessageView?keys=${this.$store.state.messageParams}`)
             .then(
               (data) => {
                 console.log("发起饼图的请求");
                 console.log(data)
                 var a=data.data.data;
                 this.dataList.noticNumber=a.noticNumber;
                 this.dataList.alarmNumber=a.alarmNumber;
                 this.dataList.generalNumber=a.generalNumber;
                 this.dataList.urgentNumber=a.urgentNumber;
                 this.fan_diagram();
               }
             ).catch((err) => {
             console.log("这个请求消息列表中的错误")
             console.log(err)
           });
          },
        updated(){
          this.axios.get(`api/message/getSendMessageView?keys=${this.$store.state.messageParams}`)
            .then(
              (data) => {
                console.log("发起饼图的请求");
                console.log(data)
                var a=data.data.data;
                this.dataList.noticNumber=a.noticNumber;
                this.dataList.alarmNumber=a.alarmNumber;
                this.dataList.generalNumber=a.generalNumber;
                this.dataList.urgentNumber=a.urgentNumber;
                this.fan_diagram();
              }
            ).catch((err) => {
            console.log("这个请求消息列表中的错误")
            console.log(err)
          });
        },
        //饼图中的数据
        methods:{
          fan_diagram(){
            var myChart =echarts.init(document.getElementById('main'));
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
              backgroundColor:'transparent',
              // title: {
              //   text: '船舶状态',
              //   top:"5%",
              //   left:"5%",
              //   textStyle: {
              //     color: 'white',
              //     fontSize:16,
              //   }
              // },
              tooltip: {
                background_colors:"transparent"
              },
              // roseType:true,
              legend: [
                {
                  x:'center',
                  data:['公告消息' ,'警报消息'],
                  bottom:"18%",
                  textStyle:{
                    color:[ '#2adfd9','#d76662',],
                  }
                },
                {
                  x:'center',
                  bottom:"10%",
                  data:['普通消息', '紧急消息'],
                  textStyle:{
                    color:[ "#a4bcff","#e7a71d",],
                  }
                }

              ],
              series: [{
                name: 'pie',
                type: 'pie',
                selectedMode: 'single',
                selectedOffset: 30,
                radius:"30%",
                center:["50%","40%"],
                //表格饼图红色：d76662
                //     表格饼图黄色：e7a71d
                // 表格饼图蓝色：2adfd9
                // 表格饼图紫色：a4bcff
                color:["#a4bcff","#e7a71d", '#2adfd9','#d76662'],
                clockwise: true,
                label: {
                  normal: {
                    textStyle: {
                      fontSize: 11,
                    }
                  }
                },
                labelLine: {
                  normal: {
                    length:5,
                    length2:5,
                    lineStyle: {
                      color: '#235894'
                    }
                  }
                },
                data:[
                  {value:this.dataList.noticNumber, name:'公告消息'},
                  {value: this.dataList.alarmNumber, name:'警报消息'},
                  {value: this.dataList.generalNumber, name:'普通消息'},
                  {value:this.dataList.urgentNumber, name:'紧急消息'},
                ],
                itemStyle: {
                  normal:{
                    label: {
                      show: true,
                      position: ['inner','outside'],
                      formatter: '{b}:{d}%',
                    },
                    labelLine: {
                      show: true,
                      length:1,
                      lineStyle:{
                        color:"red",
                        fontSize:"12px"
                      }
                    },

                  }
                },

              }]
            }
            myChart.setOption(option);

          },
        },

    }

</script>

<style scoped>
  .fan_diagram{
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
  #main{
    width: 100%;
    height:90%;
  }

</style>
