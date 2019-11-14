<template>
  <div class="fan_diagram">
  <div class="icon">
    <i class="fa fa-caret-down" aria-hidden="true"></i><span>船舶状态</span>
  </div>
  <div id="main" style="height: 90%;"></div>
  </div>
</template>

<script>
    export default {
        name: "fan_diagram",
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
              this.fan_diagram()
            }
          ).catch((err) => {
          console.log("这个请求消息列表中的错误")
          console.log(err)
        });
      },
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
            legend: {
              type:"plain",
              show:true,
              tooltip:{
                show:true
              },
              width:10,
              height:10,
              orient:'vertical',
              left:"10%",
              bottom:"10%",
              formatter: function (name) {
                return name;
              },
              textStyle:{
                color:['#d76662', '#2adfd9'],
              }
            },
            series: [{
              name: 'pie',
              type: 'pie',
              selectedMode: 'single',
              selectedOffset: 30,
              radius:"40%",
              center:["50%","40%"],
              color:['#d76662', '#2adfd9'],
              clockwise: true,
              label: {
                normal: {
                  textStyle: {
                    fontSize: 14,
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
                {value:parseInt(this.abnormal), name:'异常'},
                {value:parseInt(this.normal), name:'正常'},
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
  }

</style>
