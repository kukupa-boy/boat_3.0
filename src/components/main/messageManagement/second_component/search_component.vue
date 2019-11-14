<template>
    <div >
<!--  <el-input v-model="inputData" class="leftHeaderInput" placeholder="请输入消息名称..." >-->
<!--  </el-input>-->
<!--  <i class="el-icon-search" @click="getSearchMessage"></i>-->
</div>
</template>

<script>
    export default {
      name: "search_component",
      data(){
      return{
        inputData:"",
      }
    },
      methods:{
        getSearchMessage(){
        this.$store.commit("searchParams",this.inputData);
        }
      },


    }
</script>

<style scoped>
  .search_component{
    width: 100%;
    height: 100%;
    /*display: flex;*/
    /*justify-content: left;*/
    padding-left: 12%;
    padding-top: 3%;
    /*box-sizing: border-box;*/
    /*align-items: center;*/
    display: block;

  }
  .search_component>i{
    margin-left: -5%;
    position: relative;
    z-index: 1000;
    color: rgb(160,253,255);
  }
  .search_component>i:hover{
    color: white;
  }
  .search_component>>>.el-input{
    width: 40%;
    background-color: transparent;
    margin-left: -10%;
  }
  .search_component>>>.el-input__inner{
    background-color: transparent;
    border: 1px solid rgb(160,253,255);
    border-radius: 20px;
    color: rgb(160,253,255);
    height: 30px;
    line-height: 30px;
  }
  .search_component>>>.el-input__inner::-webkit-input-placeholder{
    color: rgb(160,253,255);
  }
  .search_component>>>.el-input__inner::-ms-input-placeholder{
    color: rgb(160,253,255);
    line-height: 30px;
  }
  .search_component>>>.el-input__icon{
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
