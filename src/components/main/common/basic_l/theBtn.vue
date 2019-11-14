<!-- 按钮组件 -->
<!-- 参数

content：按钮文字
bgcolor:背景颜色
fontcolor：背景颜色
border:[color],//默认false,有颜色

-->

<template>
    <div class="btn" :style="{'background-color':bgcolor,'color':fontcolor,'border':'1px solid '+border,'height':size+'px','line-height':size+'px'}">
        <span class="content">{{btnContent}}</span>
    </div>
</template>


<script>
export default {
    name:'theBtn',
    data() {
        return {
            typeColor:"",
            btnContent:"按钮",
        };
    },
    mounted(){
        // switch(this.type){
        //     case "normal":this.typeColor="rgb(95, 124, 226)";break;
        //     case "warning":this.typeColor="rgb(234, 161, 0)";break;
        //     case "success":this.typeColor="rgb(70, 185, 45)";break;
        //     case "error":this.typeColor="rgb(239, 92, 92)";break;
        //     default:this.typeColor=this.type;
        // }
        if(this.content){
            this.btnContent=this.content
        }
    },
    props:{
        content:{default:"按钮"},
        border:{default:"rgba(255,255,255,0)"},
        bgcolor:{default:"red"},
        fontcolor:{default:"#fff"},
        size:{default:24}
    }
}
</script>


<style lang='less' scoped>
.btn{
    display: inline-block;
    font-size: 14px;
    // height: 24px;
    // line-height: 24px;
    padding: 2px 8px;
    border-radius: 16px;
    // box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    &:hover{
        opacity: 0.9;
    }
    &:active{
        opacity: 0.8;
    }
}
</style>