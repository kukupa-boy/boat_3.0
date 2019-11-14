<template>
<div class="box_inner">
  <!--这个是气象的路由-->
    <defualtComponnets></defualtComponnets>
</div>
</template>

<script>
    import defualtComponnets from './weatherReport/defaultComponents'
    export default {
      name: "weatherReport",
      components:{
        defualtComponnets,
      }
    }
</script>

<style scoped>
  .box_inner{
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
    position: relative;
 }
  .box_inner >div{
    width: 88%;
    height: 88%;
    position: absolute;
    left: 10%;
    top: 8.3%;
  }
</style>
