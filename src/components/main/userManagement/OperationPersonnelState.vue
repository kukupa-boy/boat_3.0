<template>
  <div class="box">
    <div class="main" ref="main"></div>
  </div>
</template>

<script>
    export default {
      name: "operationPersonnelState",
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
            title : {
              text: '',
              subtext: '',
              x:'center'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color: ['#2ADFD9', '#D76662', '#E7A71D'],
            legend: {
              x : 'center',
              y : 'bottom',
              data:['正常','危险','冻结'],
              textStyle: { //图例文字的样式
                color:  ['#2ADFD9', '#D76662', '#E7A71D'],
                fontSize: 12
              },
              formatter: function (name) {
                return name;
              },
            },
            // toolbox: {
            //   show : true,
            //   feature : {
            //     mark : {show: true},
            //     dataView : {show: true, readOnly: false},
            //     magicType : {
            //       show: true,
            //       type: ['pie', 'funnel']
            //     },
            //     restore : {show: true},
            //     saveAsImage : {show: true}
            //   }
            // },
            calculable : true,
            series : [
              {
                name:'状态总计',
                type:'pie',
                radius : [10, 40],
                center : ['50%', '50%'],
                roseType : 'area',
                data:[
                  {value:30, name:'正常'},
                  {value:25, name:'危险'},
                  {value:15, name:'冻结'},
                ],

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
