<template>
  <div class="monitoringManagement">
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "monitoringManagement"
    }
</script>

<style scoped>
  .monitoringManagement{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .monitoringManagement >div{
    width: 82%;
    height: 78%;
    position: absolute;
    right: 4%;
    top: 11%;
  }

</style>
