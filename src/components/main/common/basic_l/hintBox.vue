<!-- 弹出提示框 -->
<!-- 传入的值
head：title信息，（可选）
content：提示内容，（必须）
type：弹框字体颜色，默认黑灰色，可传入类型或颜色，（可选）
 -->
<template>
    <div class="hintBox" :style="'color:'+typeColor">
        <p class="head" v-show="head!==undefined">{{head}}</p>
        <p class="content">{{content}}</p>
    </div>
</template>


<script>
export default {
    data() {
        return {
            typeColor:''
        };
    },
    props:{
        head:{default:undefined},
        content:{default:undefined},
        type:{default:"normal"}
    },
    mounted(){
        switch(this.type){
            case "normal":this.typeColor="rgb(60,60,60)";break;
            case "warning":this.typeColor="rgb(234, 161, 0)";break;
            case "success":this.typeColor="rgb(70, 185, 45)";break;
            case "error":this.typeColor="rgb(239, 92, 92)";break;
            default:this.typeColor=this.type;
        }
    }
}
</script>


<style lang='less' scoped>
.hintBox{
    position: absolute;
    // width: 600px;
    top: 10px;
    // left: 60px;
    // margin-left: -300px;
    background-color: rgb(255, 255, 255);
    border-radius: 4px;
    z-index: 9999;
    text-align: center;
    padding: 6px;
    cursor: pointer;
    >.head{
        display: block;
        border-bottom: 1px solid rgb(230, 230, 230);
        font-size: 20px;
        padding-bottom: 4px;
        margin-bottom: 6px;
    }
}
</style>