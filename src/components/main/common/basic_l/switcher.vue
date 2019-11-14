<!-- "开关" 组件 ,参数 status：默认开或关 open/close -->
<!--  扩展：参数 type：开关类型（暂未创建）  -->

<template>
    <div :class="'switchbg '+ size">
        <p :class="{'switch':true,'open':innerStatus==='open','close':innerStatus==='close'}" @click="changeStatus">
            <i :class="icon+' dot'"></i>
        </p>   
    </div>
</template>


<script>
export default {
    name:'switchgear',
    data() {
        return {
            innerStatus:undefined
        };
    },
    methods:{
        changeStatus(){
            this.innerStatus=this.innerStatus=="open"?"close":"open";
        }
    },
    created(){
        this.innerStatus=this.status;
    },
    props:{
        icon:{default:"fa fa-circle"},
        status:{default:"close"},
        size:{default:'normal'},//small,mini,big,normal
    }
}
</script>


<style lang='less' scoped>

@green:#6bff91;
@blue:#59fdff;

.switchbg{
    .switch{
        position: relative;
        box-sizing: border-box;
        border-radius: 20px;
        user-select: none;
        cursor: pointer;
        >i{
            position: absolute;
            display: block;
            border-radius: 50%;
            text-align: center;
            border-style:dotted solid dashed dotted;
            transition: 0.3s;
        }
    }
    .open{
        border: 1px solid @green;
        >i{
            animation: blink 5s linear infinite;
            border-color: @green;
            color: @green;
            text-shadow: 0 0 6px @green;
        }
    }
    .close{
        border: 1px solid @blue;
        >i{
            border-color: #59fdff70;
            color: @blue;
            text-shadow: 0 0 6px @blue;
            &:hover{
                transform: rotate(90deg)
            }
        }
    }
}
.normal{
    .switch{
        border-radius: 10px;
        height: 18px;
        width: 38px;
        >i{
            width: 22px;
            height: 22px;
            font-size: 20px;
            line-height: 22px;
            border-width: 1.2px;
            top: -4.3px;
        }
    }
    .open{
        border: 1px solid @green;
        >i{
            left: 16px;
        }
    }
    .close{
        border: 1px solid @blue;
        >i{
            left: -4px;
        }
    }
}
.small{
    .switch{
        border-radius: 10px;
        height: 16px;
        width: 34px;
        >i{
            width: 20px;
            height: 20px;
            font-size: 18px;
            line-height: 20px;
            border-width: 1.2px;
            top: -4.3px;
        }
    }
    .open{
        border: 1px solid @green;
        >i{
            left: 14px;
        }
    }
    .close{
        border: 1px solid @blue;
        >i{
            left: -4px;
        }
    }
}
.mini{
    .switch{
        border-radius: 10px;
        height: 14px;
        width: 28px;
        >i{
            width: 18px;
            height: 18px;
            font-size: 16px;
            line-height: 18px;
            border-width: 1.2px;
            top: -4.3px;
        }
    }
    .open{
        border: 1px solid @green;
        >i{
            left: 10px;
        }
    }
    .close{
        border: 1px solid @blue;
        >i{
            left: -4px;
        }
    }
}
.big{
    .switch{
        border-radius: 10px;
        height: 20px;
        width: 42px;
        >i{
            width: 24px;
            height: 24px;
            font-size: 22px;
            line-height: 24px;
            border-width: 1.4px;
            top: -4.3px;
        }
    }
    .open{
        border: 1.5px solid @green;
        >i{
            left: 18px;
        }
    }
    .close{
        border: 1.5px solid @blue;
        >i{
            left: -5px;
        }
    }
}

@keyframes blink {
    0%{
        border-color: @green;
        transform: rotate(0deg)
    }
    5%{
        border-color: #fff0;
    }
    10%{
        border-color: @green;
    }
    15%{
        border-color: #fff0;
    }
    20%{
        border-color: @green;
    }
    25%{
        border-color: #fff0;
    }
    30%{
        border-color: @green;
        transform: rotate(360deg);
    }
    70%{
        border-color: @green;
        transform: rotate(180deg);
        color:@green;
    }
    75%{
        border-color: #fff0;
        color: #fff0;
    }
    80%{
        border-color: #fff0;
        color:@green;
    }
    100%{
        border-color: @green;
    }
}
</style>