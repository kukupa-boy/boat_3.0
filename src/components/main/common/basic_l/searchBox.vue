<!-- 搜索框组件 （基础，不可分）-->
<template>
  <div :class="{'searchbox':true,'border':border=='close'?false:true}" :style="{'background-color':bgcolor,'height':size+'px','line-height':size+'px'}">
    <input type="text" value="默认值" v-model="text" :placeholder="hint" @change="back" :style="{'height':size+'px'}">
    <i :class="classname" @click="clickBack" :style="{'font-size':(size-6)+'px'}"></i>
  </div>
</template>

<script>

export default {
  name:"searchBox",
  data () {
    return {
      text:''
    };
  },
  methods:{
    back(){
      this.$emit("back",this.text);
    },
    clickBack(){
      this.$emit("clickBack",this.text);
    }
  },
  props:{
    hint:{default:'请输入信息'},
    classname:{default:'fa fa-search'},
    bgcolor:{default:"#fff"},
    border:{default:"close"},
    size:{default:30}
  }
}


</script>

<style lang='less' scoped>
@placehoder-color:rgba(0, 255, 255, 0.6);
@searchbox-height:30px;
@fontColor:rgb(0, 255, 255);
.searchbox{
  position: relative;
  display: flex;
  border-radius: 30px;
  // line-height: @searchbox-height;
  // height: @searchbox-height;
  padding: 1px 4px 1px 8px;
  background-color: #fff;
  min-width: 60px;
  transition: 0.3s;
  >input{
    flex: 1;
    border: 0;
    min-width: 40px;
    outline: 0;
    // border-radius: 8px;
    background-color: rgba(255, 255, 255, 0);
    // height: @searchbox-height;
    color: @fontColor;
    &::-webkit-input-placeholder{
      color: @placehoder-color;
    }
  }
  // >span{
  //   width: 18px;
  //   text-align: center;
  //   cursor: pointer;
  //   height: 18px;
  //   border-radius: 50%;
  //   line-height: 18px;
  //   position: absolute;
  //   left: -20px;
  //   top: 8px;
  //   color: #fff;
  //   transition-delay: 0.3s;
  //   background-color: rgb(216, 216, 216);
  //   visibility: hidden;
  //   opacity: 0;
  // }
  >i{
    width: 24px;
    margin-top: 3px;
    // margin-left: 4px;
    font-size: 18px;
    margin-right: -4px;
    cursor: pointer;
    color: @placehoder-color;
    transition: 0.3s;
    &:hover{
      color:@fontColor;
      // transform: rotate(6deg);
    }
  }
  >.hide{
    display: none;
  }
  // &:hover{
  //   >.empty{
  //     display: block;
  //     visibility: visible;
  //     opacity: 1;
  //   }
  // }
}
.border{
  border: 1px solid @placehoder-color;
  &:hover{
    border: 1px solid @fontColor;
  }
  &:focus{
    border: 1px solid @fontColor;
  }
}
</style>
