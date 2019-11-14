<!-- "开关" 组件 ,参数 def：默认开或关 open/close -->
<!--  扩展：参数 type：开关类型（暂未创建）  -->

<template>
    <p :class="{'btn':true,'btn-open':innerDef=='open','btn-close':innerDef=='close'}" @click="change()">
        <span class="dot"></span>
    </p>
</template>


<script>
export default {
    name:'switchgear',
    data() {
        return {
            innerDef:undefined
        };
    },
    methods:{
        change(){
            this.innerDef=this.innerDef=="open"?"close":"open";
        }
    },
    created(){
        this.innerDef=this.def;
    },
    props:{def:{default:"close"},type:{default:"normal"},text:{default:""}},
}
</script>


<style lang='less' scoped>
.btn{
    position: relative;
    display: block;
    width: 36px;
    height: 20px;
    border-radius: 10px;
    overflow: hidden;
    transition: 0.3s;
}
.btn-open{
    background-color: rgb(19,206,102);
}
.btn-close{
    background-color: rgb(177, 177, 177);
    >span{
        margin-left: 18px;
    }
}
.dot{
    position: absolute;
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin: 2px;
    transition: 0.3s;
    background-color: #ffffff;
}
</style>