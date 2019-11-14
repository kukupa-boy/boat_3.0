<!-- 
参数
show：[boolean],是否显示此框
headInfo：[string],头部信息，为空则不显示头部
//(已移除) type：[normal/error/warning],询问框的颜色（类型）
sureBtn：[string],确定按钮的文字
cancelBtn：[string],取消按钮的文字
hideBtn:[bool],是否隐藏“确定”“取消”按钮，默认：false不隐藏
solt插槽插入

 -->
<template>
    <div class="bulletBoxBg" v-if="show">
        <div class="bulletBox">
            <p class="ab-head" v-if="!!headInfo">{{headInfo}}</p>
            <div class="ab-body">
                <slot name="content"></slot>
            </div>
            <div class="ab-foot" v-if="!hideBtn">
                <span class="sure" @click.stop="affirmBack('sure')">{{sureInfo}}</span>
                <span class="cancel" @click.stop="affirmBack('cancel')">{{cancelInfo}}</span>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name:'infoAddBox',
    data() {
        return {};
    },
    methods:{
        affirmBack(res){
            this.$emit("back",res);
        }
    },
    props:{
        show:{default:false},
        headInfo:{default:''},
        sureInfo:{default:'确定'},
        cancelInfo:{default:'取消'},
        hideBtn:{default:false}
    }
}
</script>


<style lang='less' scoped>
@typeC:rgb(74, 105, 243);
@errorC:rgb(236, 99, 99);
@warningC:rgb(231, 153, 52);
@typeBorderC:rgba(74, 105, 243, 0.3);
@errorBorderC:rgba(236, 99, 99, 0.3);
@warningBorderC:rgba(231, 153, 52, 0.3  );

@fontColor:rgb(89,252,255);
@bgColor:rgb(5, 33, 69);
@halfColor:rgba(89, 252, 255, 0.7);
@hideColor:rgba(255,255,255,0);

.bulletBoxBg{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-color: rgba(5, 33, 69 ,0.7);
    z-index: 999;
}
.bulletBox{
    margin: 0 auto;
    margin-top: 120px;
    width: 40%;
    min-width: 360px;
    background-color: @bgColor;
    background-image: url('../../../../assets/person_system/image/image_l/boxBg.png');
    background-size:100% 100%;
    overflow: hidden;
    box-shadow: 2px 2px 4px @fontColor;
    >.ab-head{
        background:url('../../../../assets/person_system/image/image_l/boxHead.png') right 0 no-repeat;
        display: inline-block;
        padding-right: 54px;
        padding-left: 12px;
        height: 28px;
        font-size: 16px;
        line-height: 28px;
        letter-spacing: 3px;
        color: @fontColor;
        border-bottom: 2px solid #fff;
        border-image: -webkit-linear-gradient(to right,@fontColor,@fontColor,@fontColor,@hideColor,@hideColor) 30 30;
        border-image: -moz-linear-gradient(to right,@fontColor,@fontColor,@fontColor,@hideColor,@hideColor) 30 30;
        border-image: linear-gradient(to right,@fontColor,@fontColor,@fontColor,@hideColor,@hideColor) 30 30;
    }
    >.ab-body{
    text-align: center;
        padding: 16px 0;
        line-height: 24px;
    }
    >.ab-foot{
    text-align: center;
        height: 60px;
        line-height: 60px;
        >span{
            display: inline-block;
            height:26px;
            border-radius: 50px;
            line-height: 26px;
            padding: 0 12px;
            cursor: pointer;
            user-select: none;
            margin: 0 60px;
            &:hover{
                opacity: 0.9;
            }
        }
        >.sure{
            border: 1px solid @fontColor;
            color: @fontColor;
        }
        >.cancel{
            border: 1px solid rgba(255, 255, 255, 0.7);
            color: rgba(255, 255, 255, 0.7);
        }
    }
}
@media screen and (max-height:840px) {
    .bulletBox{
        margin-top: 80px;
    }
}
@media screen and (max-height:740px) {
    .bulletBox{
        margin-top: 30px;
    }
}
</style>