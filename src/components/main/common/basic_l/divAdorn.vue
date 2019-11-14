<!-- 
参数：
show:[bool],//是否显示此盒子
icon:[string],//四角图标的类名
bgColor:[string(color)],
fontColor:[string(color)],
slot：插槽content
 -->

<template>
    <div class="div-adorn" :style="{'backgroundColor':bgColor}" v-show="show">
        <!-- fa fa-share -->
        <i v-for="(item,index) in icons" :key="index" :class="item +' '+ icon" :style="{'color':fontColor,'textShadow':'0px 0px 12px '+fontColor}"></i>
        <slot name="content"></slot>
    </div>
</template>


<script>
export default {
    name:'divAdorn',
    data() {
        return {
            icons:['left-top','left-bottom','right-top','right-bottom']
        };
    },
    props:{
        icon:{default:"fa fa-share"},
        bgColor:{default:"rgb(5,33,69)"},
        fontColor:{default:"rgb(89,253,255)"},
        show:{default:true}
    }
}
</script>


<style lang='less' scoped>
    .div-adorn{
        position: relative;
        display: inline-block;
        min-width: 60px;
        min-height: 60px;
        >i{
            position: absolute;
            font-size: 24px;
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
        }
        .left-top{
            left: 0;
            top: 0;
            transform: rotate(45deg)
        }
        .right-top{
            right: 0;
            top: 0;
            transform: rotate(135deg);
        }
        .left-bottom{
            left: 0;
            bottom: 0;
            transform: rotate(-45deg);
        }
        .right-bottom{
            right: 0;
            bottom: 0;
            transform: rotate(-135deg);
        }
    }
</style>