<template>
   <!--这是分页-->
<div class="box">
  <div class="block">
    <el-pagination
      background
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :page-sizes.sync="pageSizes"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</div>
</template>

<script>
    export default {
      name: "Paging",
      props: {
        total: {
          required: true,
          type: Number
        },
        page: {
          type: Number,
          default: 1
        },
        limit: {
          type: Number,
          default: 10
        },
        pageSizes: {
          type: Array,
          default() {
            return [10,20,30]
          }
        },
        layout: {
          type: String,
          default: 'prev, pager, next, jumper'
        },
      },
      computed: {
        currentPage: {
          get() {
            return this.page;
          },
          set(val) {
            this.$emit('update:page', val);
          }
        },
        pageSize: {
          get() {
            return this.limit;
          },
          set(val) {
            this.$emit('update:limit', val);
          }
        }
      },
      methods: {
          handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            },
          handleCurrentChange(val) {
            console.log(val);
            this.$emit('childFn', val);
        }
      }
    }
</script>

<style scoped>
  .box{
    width: 100%;
    height: 30px;
    /*position: relative;*/
  }
  ul{
    height: 30px;
    line-height: 30px;
  }
  ul li{
    width: 30px;
    height: 30px;
    margin-right: 20px;
    border-radius: 20px;
  }
</style>
<style>
  .block ul {
    height: 30px;
    line-height: 30px;
  }
  .block ul li{
    height: 30px;
    width: 30px;
    line-height: 30px;
    border-radius: 30px!important;
    background-color: #59fdff!important;
  }
  .block button {
    width: 30px;
    height: 30px;
    background-color: transparent!important;
  }
  .block button i{
    color:  #59fdff!important;
  }
  .block span{
    width: 30px;
    height: 30px!important;
    color:  #59fdff!important;
    line-height: 30px!important;
  }
  .block span input{
    height: 30px;
    width: 30px;
    border-radius: 30px;
    border: 2px solid  #59fdff;
    background-color: transparent;
    color:  #59fdff!important;
  }
</style>
