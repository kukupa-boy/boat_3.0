<template>
  <div class="shipmanager">
    <!-- 工具箱 -->
    <div class="toolBar">
      <div class="t-can">

        <div-adorn icon="fa fa-angle-left">
          <template v-slot:content>
            <div class="tb-box">
              <!-- 1.信息 -->
              <div>
                <p><span>信息</span> - - - - - - - - - - - - - - - - - - - - - - - - - - - - </p>

                <div class="btn-box">
                  <div class="btn-open" @click.stop="openMapTool($event,'openWeather')">
                    <switcher size="mini"></switcher>
                  </div>
                  <span>气象</span>
                </div>

                <div class="btn-box"  @click.stop="openMapTool($event,'openShip')">
                  <div class="btn-open">
                    <switcher size="mini" status="open"></switcher>
                  </div>
                  <span>船舶</span>
                </div>

                <div class="btn-box" @click.stop="openMapTool($event,'openPerson')">
                  <div class="btn-open">
                    <switcher size="mini" status="open"></switcher>
                  </div>
                  <span>人员</span>
                </div>
              </div>
              <!-- 2.工具 -->
              <div>
                <p><span>工具</span> - - - - - - - - - - - - - - - - - - - - - - - - - - - - </p>
                <div class="btn-box">
                  <div class="btn-open" @click.stop="openMapTool($event,'openMeasure')">
                    <switcher size="mini" status="open"></switcher>
                  </div>
                  <span>测距</span>
                </div>

                <div class="btn-box">
                  <div class="btn-open" @click.stop="openMapTool($event,'openArea')">
                    <switcher size="mini"></switcher>
                  </div>
                  <span>区域</span>
                </div>

                <div class="btn-box">
                  <div class="btn-open" @click.stop="openMapTool($event,'openRoute')">
                    <switcher size="mini"></switcher>
                  </div>
                  <span>航线</span>
                </div>

                <!-- <div class="btn-box">
                  <div class="btn-open" @click.stop="openMapTool($event,'openWeather')">
                    <switcher size="mini"></switcher>
                  </div>
                  <span>气象</span>
                </div> -->

                <div class="btn-box">
                  <div class="btn-open" @click.stop="openMapTool($event,'openTool')">
                    <switcher size="mini"></switcher>
                  </div>
                  <span>辅助</span>
                </div>

                <!-- <div class="btn-box">
                  <div class="btn-open" @click.stop="openMapTool($event,'openplayback')">
                    <switcher size="mini"></switcher>
                  </div>
                  <span>回放</span>
                </div> -->

              </div>
            </div>
          </template>
        </div-adorn>
      </div>

      <div class="tooltitle" v-show="toolShow">
        <span>工具箱</span>
      </div>
      <div class="t-btn" @click="switchTool">
        <p></p>
        <p></p>
      </div>
    </div>
    <!-- 地图组件 -->
    <sea-map :mapdata="mapData" :eye="eyeMapData"></sea-map>
  </div>
</template>



<script>
import seaMap from "./seaChart";
import divAdorn from "../common/basic_l/divAdorn";
import switcher from "../common/basic_l/switcher";
import switchgear from "../common/basic_l/switch";

export default {
  name: "shipManagerMent",
  data() {
    return {
      toolShow: true,
      toolcheckIndex: 0,
      mapData: {
        openMeasure: true,
        openShip: true,
        openPerson:true
      }, //控制地图组件的参数对象
      eyeMapData: false //由于对象传入子组件后无法被监听变化，加此属性用于辅助更新对象变化
    };
  },
  methods: {
    openMapTool(e, val) {
      this.mapData[val] = !this.mapData[val];
      this.eyeMapData = !this.eyeMapData;
    },
    switchTool() {
      this.toolcheckIndex = 0;
      if(this.toolShow){
        $('.t-btn').addClass('t-btn-close');
        $('.t-can').addClass('t-can-close')
      }else{
        $('.t-btn').removeClass('t-btn-close');
        $('.t-can').removeClass('t-can-close')
      }
      this.toolShow = !this.toolShow;
    },
    toolchecked(e) {
      let ele = e.target;
      let index = ele.getAttribute("index");
      if (this.toolcheckIndex == index) this.toolcheckIndex = 0;
      else this.toolcheckIndex = index;
    },
  },
  destroyed() {
    console.log("shipmanager页面被销毁");
  },
  activated() {
    console.log("keep-alive开始");
  },
  deactivated() {
    console.log("keep-alive结束");
  },
  components: {
    "sea-map": seaMap,
    'switchgear': switchgear,
    "div-adorn": divAdorn,
    'switcher': switcher
  }
};
</script>

<style scoped lang="less">
@import "../../../assets/ship_system/less/shipManage.less";
</style>
