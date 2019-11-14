<template>
  <div class="task_manager">
    <taskList></taskList>
  </div>
</template>

<script>
  import taskList from './taskList/taskList.vue'
    export default {
        name: "task_manager",
      components:{
        taskList
      }
    }
</script>

<style scoped>
  .task_manager{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .task_manager >div{
    width: 82%;
    height: 78%;
    position: absolute;
    right: 4%;
    top: 11%;
  }
</style>
