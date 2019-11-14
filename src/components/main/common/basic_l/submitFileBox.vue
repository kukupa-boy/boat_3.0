<!--  -->

<template>
    <div class="fileBox">
        <div class="fileSubmit">
            <i :class="icon"></i>
            <span>{{hint}}</span>
            <input type="file" multiple="">
        </div>
        <div class="fileWall">

        </div>
    </div>
</template>


<script>
export default {
    name:'submitfileBox',
    data() {
        return {};
    },
    props:{
        icon:{default:"fa fa-picture-o"},
        hint:{default:"点击上传"},
    }
}
</script>


<style lang='less' scoped>
@fontColor:rgb(89,252,255);
@bgColor:rgb(5, 33, 69);
@lightColor:rgba(89, 252, 255, 0.3);
.fileBox{
    display: inline-block;
    position: relative;
    font-size: 0;
    height: 30px;
    >div{
        font-size: 16px;
        display: inline-block;
        vertical-align: middle;
    }
    >.fileSubmit{
        position: relative;
        height: 100%;
        padding: 0 6px; 
        overflow: hidden;
        // color: @fontColor;
        >*{
            vertical-align: middle;
            color: @fontColor;
        }
        >i{
            display: inline-block;
            width: 36px;
            text-align: center;
            font-size: 24px;
            cursor: pointer;
        }
        >span{
            font-size: 14px;
        }
        >input{
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
        }
        &:hover{
            >i{
                color: @fontColor;
            }
        }
    }
    >.fileWall{
        padding: 0 6px;
        position: relative;
        height: 100%;
        width: 60px;
    }
}
</style>