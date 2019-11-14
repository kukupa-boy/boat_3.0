<!-- 
参数
show：[boolean],是否显示此框
headInfo：[string],头部信息
content: [string],提示的内容文字
type：[normal/error/warning],询问框的颜色（类型）
sureBtn：[string],确定按钮的文字
cancelBtn：[string],取消按钮的文字
 -->

<template>
    <div class="affirmBoxBg" v-show="show">
        <div :class="'affirmBox '+ type">
            <p class="ab-head" v-show="headInfo!=''">{{headInfo}}</p>
            <div class="ab-body">{{content}}</div>
            <div class="ab-foot">
                <span class="sure" @click.stop="affirmBack('sure')">{{sureBtn}}</span>
                <span class="cancel" @click.stop="affirmBack('cancel')">{{cancelBtn}}</span>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name:'affirmBox',
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
        content:{default:'询问内容……'},
        type:{default:'normal'},
        sureBtn:{default:'确定'},
        cancelBtn:{default:'取消'}

    }
}
</script>


<style lang='less' scoped>
@typeC:rgb(74, 105, 243);
@errorC:rgb(236, 99, 99);
@warningC:rgb(231, 153, 52);
@typeBorderC:rgba(74, 105, 243, 0.3);
@errorBorderC:rgba(236, 99, 99, 0.3);
@warningBorderC:rgba(231, 153, 52, 0.3);
.affirmBoxBg{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-color: rgba(5, 33, 69, 0.7);
    z-index: 999;
}
.affirmBox{
    user-select: none;
    margin: 100px auto;
    padding: 0 16px;
    width: 360px;
    text-align: center;
    >.ab-head{
        height: 36px;
        font-size: 18px;
        line-height: 36px;
        border-bottom: 1px dashed @typeBorderC;
    }
    >.ab-body{
        padding: 16px 0;
        line-height: 24px;
        border-bottom: 1px dashed @typeBorderC;
    }
    >.ab-foot{
        height: 60px;
        line-height: 60px;
        >span{
            display: inline-block;
            height:24px;
            line-height: 24px;
            border-radius: 15px;
            padding: 0 16px;
            cursor: pointer;
            user-select: none;
            margin: 0 56px;
            &:hover{
                opacity: 0.9;
            }
        }
        >.sure{
            background-color: @typeC;
            color: #fff;
        }
        >.cancel{
            background-color: rgb(214, 214, 214);
            color: #000;
        }
    }
}
@fontColor:rgb(89,252,255);
@bgColor:rgb(5, 33, 69);
// 暗黑
.dark{
    background-color: @bgColor;
    box-shadow: 1px 1px 4px @fontColor;
    // border-top: 8px solid @fontColor;
    // border-bottom: 8px solid @fontColor;
    >.ab-head{
        border-bottom: 1px dashed @bgColor;
    }
    >.ab-body{
        border-bottom: 1px dashed @bgColor;
        color: @fontColor;
    }
    >.ab-foot{
        >.sure{
            border: 1px solid @fontColor;
            background-color: @bgColor;
            color: @fontColor;
        }
        >.cancel{
            border: 1px solid rgba(201, 201, 201, 0.7);
            background-color: @bgColor;
            color: rgba(201, 201, 201, 0.7);
        }
    }
}
.error{
    background-color: rgb(255, 255, 255);
    box-shadow: 1px 1px 4px rgb(201, 201, 201);
    border-top: 16px solid @typeC;
    border-top: 8px solid @errorC;
    border-bottom: 8px solid @errorC;
    border-radius: 16px;
    >.ab-head{
        border-bottom: 1px dashed @errorBorderC;
    }
    >.ab-body{
        border-bottom: 1px dashed @errorBorderC;
    }
    >.ab-foot{
        >.sure{
            background-color: @errorC;
            color: #fff;
        }
        >.cancel{
            background-color: rgb(214, 214, 214);
            color: #000;
        }
    }
}
.warning{
    background-color: rgb(255, 255, 255);
    box-shadow: 1px 1px 4px rgb(201, 201, 201);
    border-top: 16px solid @typeC;
    border-top: 8px solid @warningC;
    border-bottom: 8px solid @warningC;
    border-radius: 16px;
    >.ab-head{
        border-bottom: 1px dashed @warningBorderC;
    }
    >.ab-body{
        border-bottom: 1px dashed @warningBorderC;
    }
    >.ab-foot{
        >.sure{
            background-color: @warningC;
            color: #fff;
        }
        >.cancel{
            background-color: rgb(214, 214, 214);
            color: #000;
        }
    }
}
</style>