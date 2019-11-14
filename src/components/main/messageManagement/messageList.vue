<template>
  <div class="messageList">
    <div class="boatList_inner">
      <div class="boatListInner_left">
        <div>
          <search-input></search-input>
        </div>
        <div>
          <boat-table></boat-table>
        </div>
      </div>
      <div class="boatListInner_right">
        <div class="boatList_line"></div>
        <div class="boatListR_top">
          <!--扇形图-->
          <fan_diagram></fan_diagram>
        </div>
        <div class="boatListR_bottom">
          <!--柱状图-->
          <bar_chart></bar_chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchInput from "./second_component/search_component.vue"
import boatTable from "./second_component/boatList_table.vue"
import fan_diagram from "./second_component/fan_diagram.vue"
import bar_chart from "./second_component/bar_chart.vue"

    export default{
        name: "messageList",
        components:{
          boatTable,
          searchInput,
          fan_diagram,
          bar_chart
        }
    }
</script>

<style scoped>
  .messageList{
    width: 100%;
    height: 100%;
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    position: relative;
  }
  .boatList_inner{
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
