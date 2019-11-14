<template>
  <div class="OperationPersonnel">
    <OperationPersonnel></OperationPersonnel>
  </div>
</template>

<script>
  import OperationPersonnel from "./OperationPersonnel.vue"
    export default {
        name: "busywork_group",
      components:{
        OperationPersonnel
      }
    }
</script>

<style scoped>
  div{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .OperationPersonnel >div{
    width: 80%;
    height: 80%;
    margin-left: 8%;
    /*margin-top: 10%;*/
  }
</style>
