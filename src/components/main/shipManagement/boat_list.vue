<template>
    <div class="boat_list">
      <div class="boatList_inner">
        <div class="boatListInner_left">
          <div>
            <search-input @showBoxButton="showBoxButton"></search-input>
          </div>
          <!--船舶列表-->
          <div>
          <boat-table @showCaptain="showCaptain" @showDetailBoxClick="showDetailBoxClick" ></boat-table>
          </div>
        </div>
        <div class="boatListInner_right">
          <div class="boatList_line"></div>
          <div class="boatListR_top" >
          <!--扇形图-->
            <fan_diagram></fan_diagram>
          </div>
          <div class="boatListR_bottom">
          <!--柱状图-->
            <bar_chart></bar_chart>
          </div>
        </div>
      </div>
<!--      新增加船舶的组件-->
            <bounce-box v-if="showBox" @deleteBoxButton="deleteBoxButton"></bounce-box>
<!--      查看船舶详情的组件-->
            <see-message  :detail_data="listData" v-if="showDetailBox" @deleteDetailBoxClick="deleteDetailBoxClick" ></see-message>
      <!--      查看船长详情的组件-->
      <captain-message  v-if="showCaptainBox" @deleteCaptainBoxClick="deleteCaptainBoxClick"  ></captain-message>
    </div>
</template>

<script>
  import searchInput from "./second_component/search_component.vue"
  import boatTable from "./second_component/boatList_table.vue"
  import fan_diagram from "./second_component/fan_diagram.vue"
  import bar_chart from "./second_component/bar_chart.vue"
  import bounceBox from "./second_component/bounce2.vue"
  import seeMessage from "./second_component/seeDetails.vue"
  import captainMessage  from "./second_component/captainMessage.vue"
    export default {
        name: "boat_list",
      data(){
          return{
            showBox:false,
            showDetailBox:false,
            showCaptainBox:false,
            //这个是向显示详情页面进行传值
            listData:"1"
          }
      },
      methods:{
          //显示弹出框
        showBoxButton(){
          this.showBox=true
        },
        //删除弹出框
        deleteBoxButton(){
          this.showBox=false
        },
        //显示详情弹出框
        showDetailBoxClick(data){
          this.listData=data;
          this.showDetailBox=true
        },
        deleteDetailBoxClick(){
          this.showDetailBox=false
        },

        //删除船长的显示框
        showCaptain(){
          this.showCaptainBox=true;
        },
        deleteCaptainBoxClick(){
          this.showCaptainBox=false
        }
      },
        components:{
          boatTable,
          searchInput,
          fan_diagram,
          bar_chart,
          bounceBox,
          seeMessage,
          captainMessage
        }
    }
</script>

<style scoped>

  .boat_list{
    width: 100%;
    height: 100%;
    position: relative;

  }
  .boatList_inner{
      /*border: 1px solid red;*/
    position: absolute;
      width: 82%;
      height: 78%;
      top: 11%;
      right: 4%;
      display: flex;
      background-image: url("../../../assets/public/img/header/messagebox.png");
      background-size: 100% 100%;
    }
  .boatList_inner>.boatListInner_left{
    width: 78.5%;
    height: 100%;
    border: 1px solid transparent;
    display: block;
  }
  .boatListInner_left>div:nth-of-type(1){
    height: 10%;
    width: 100%;
    /*border: 1px solid green;*/
  }
  .boatListInner_left>div:nth-of-type(2){
    /*border: 1px solid red;*/
    height: 90%;
    width: 100%;
  }
  .boatListInner_right {
    width: 21.5%;
    height: 100%;
    display: block;
    position: relative;
  }
  .boatListR_top{
    height: 50%;
  }
  .boatListR_bottom{
    height: 50%;
  }
  .boatList_line{
    width: 3px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-image: url("../../../assets/public/img/boatList_line.png");
    background-size: 100% 100%;
  }


</style>
