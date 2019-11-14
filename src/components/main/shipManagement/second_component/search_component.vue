<template>
    <div class="search_component">
      <el-input v-model="inputData" class="leftHeaderInput" placeholder="请输入船舶名称..."  >

      </el-input>
      <i class="el-icon-search" @click="searchBoat"></i>
      <el-button size="mini" class="add" @click="showBox">新增</el-button>
    </div>
</template>

<script>
    export default {
      name: "search_component",
       data(){
        return{
          inputData:""
        }
      },
      methods:{
        showBox(){
          this.$emit("showBoxButton")
        },
        searchBoat(){

        }
      }
    }
</script>

<style scoped>
  .search_component{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .search_component>>>.el-input{
    width: 40%;
    background-color: transparent;
    margin-left:-12%;
    line-height: 30px;
  }
  .search_component>i{
    position: relative;
    margin-left: -41%;
    z-index: 2;
    color:  rgb(160,253,255);
  }
  .search_component>i:hover{
    color: white;
  }
  .search_component>>>.el-input__inner{
    background-color: transparent;
    border: 1px solid rgb(160,253,255);
    border-radius: 20px;
    color: rgb(160,253,255);
    height: 30px;
    line-height: 30px;
  }
  .search_component>>>.el-input__inner::placeholder{
    color: rgb(160,253,255);
  }
  .search_component>>>.el-input__inner::-ms-input-placeholder{
    color: rgb(160,253,255);
    line-height: 30px;
  }
  .el-input>>>.el-input__icon{
    color: rgb(160,253,255);
    position: relative;
    line-height: 30px;
  }
  .leftHeaderInput>>>span{
    color: rgb(160,253,255);
  }
  .el-button{
    background-color: transparent;
    border: 1px solid  rgb(160,253,255);
    color:  rgb(160,253,255);
    border-radius: 20px;
    margin-right: -10%;
  }
  .add{
    text-align:center ;
  }
</style>
