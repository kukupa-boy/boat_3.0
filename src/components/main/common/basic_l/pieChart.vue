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
        // 判断是否需要处理颜色
        this.randomColor();
        // 将传入的数据格式处理，如nameList=['a','b'],valueList=[1,2] ==> data=[{name:'a',value:1}];
        this.dealData=this.dealNameAndValue();
        this.draw();
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
            // color: ['#2ADFD9', '#D76662', '#E7A71D'],
            color: this.innerData.colorList,
            legend: {
              x : 'center',
              y : 'bottom',
              // data:['正常','危险','冻结'],
              data:this.innerData.nameList,
              textStyle: { //图例文字的样式
                // color:  ['#2ADFD9', '#D76662', '#E7A71D'],
                color: this.innerData.colorList,
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
                // data:[
                //   {value:30, name:'正常'},
                //   {value:25, name:'危险'},
                //   {value:15, name:'冻结'},
                // ],
                data:this.dealData,
              }
            ]
          };
          myChart.setOption(option);
          window.addEventListener("resize",function(){
            myChart.resize();
          });
        },
        dealNameAndValue(){
          let data=[];
          for(let i=0;i<this.innerData.nameList.length;i++){
            data.push({'name':this.innerData.nameList[i],'value':this.innerData.valueList[i]});
          }
          return data;
        },
        randomColor(){
          if(!this.innerData.colorList||this.innerData.colorList.length<=0){
            this.innerData.colorList=[];
            for(let i=0;i<this.innerData.nameList.length;i++){
              this.innerData.colorList.push(this.colorCan[i%this.colorCan.length]);
            }
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
