<!-- 
size:[int],高度和行高
stripSize:条形的高度，默认16px
data:[
    {
        label：名字
        value: 数量
        unit：单位，默认无
        bgcolor：颜色条背景色，默认透明
        color：颜色条颜色，默认 未设
    }
]
 -->

<template>
  <div class="stripCountBox">
    <div
      class="stripCount"
      v-for="(item,index) in innerData"
      :key="index"
      :style="{'height':size+'px','line-height':size+'px'}">
      <span class="label">{{item.label}}</span>
      <span class="count" :style="{'color':item.color}">{{item.value}}({{item.unit||unit||''}})</span>
      <p
        class="stripCan"
        :style="{'background-color':item.bgcolor||'rgba(255,255,255,0)','height':stripSize+'px'}">
        <span
          class="strip"
          :val="item.value"
          :style="{'background-image':'linear-gradient(to right, rgba(255,255,255,0),'+item.color+')','width':item.width,'height':stripSize+'px'}"
        ></span>
      </p>
    </div>
  </div>
</template>


<script>
export default {
  name: "stripCount",
  data() {
    return {
      innerData: [],
      maxValue: 0
    };
  },
  created() {
    this.innerData = this.data;
    for (let i = 0; i < this.innerData.length; i++) {
      if (this.innerData[i].value > this.maxValue) {
        this.maxValue = this.innerData[i].value;
      }
    }
    for (let i = 0; i < this.innerData.length; i++) {
      this.innerData[i].width =((this.innerData[i].value / this.maxValue) * 80+20).toFixed(2) + "%";
    }
  },
  mounted() {
    // console.log(this.innerData);
  },
  props: {
    data: { default: {} },
    size: { default: 30 },
    unit: { default: "" },
    stripSize: { default: 12 }
  }
};
</script>


<style lang='less' scoped>
@fontColor:rgb(89,252,255);
@bgColor:rgb(5, 33, 69);
@lightColor:rgba(89, 252, 255, 0.3);
.stripCount {
  position: relative;
  overflow: hidden;
  width: 100%;
  margin-top: 4px;
  font-size: 0;
  > * {
    display: inline-block;
    font-size: 14px;
    vertical-align: middle;
    color: @fontColor;
  }
  > .label {
    width: 25%;
    text-align: center;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  > .count {
    position: absolute;
    left: 25%;
  }
  > .stripCan {
    // box-sizing: border-box;
    // border: 1px solid red;
    width: 75%;
    font-size: 0;
    background-color: rgb(94, 219, 110);
    > .strip {
      vertical-align: top;
      display: inline-block;
      border-radius: 0 50px 50px 0;
    }
  }
}
</style>