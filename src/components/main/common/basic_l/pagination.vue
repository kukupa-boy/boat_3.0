<!-- 
参数
pagesize：数据总数量
perpage：单页数量

换页回调函数 currentPageChange
页面数量改变 perpageSizeChange
 -->

<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :background="true"
      :page-size="perpage"
      layout="prev, pager, next, jumper"
      :total="pagesize"
    ></el-pagination>
  </div>
</template>


<script>
export default {
  name: "pagination",
  data() {
    return {
      currentPage: 0
    };
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("perpageSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("currentPageChange", val);
    }
  },
  mounted(){
    
  },
  props: {
    perpage: { default: 10 },
    pagesize: { default: 0 }
  }
};
</script>


<style lang='less' scoped>
</style>
<style lang="less">
@fontColor: rgb(0, 255, 255);
@bgColor: rgb(5, 33, 69);
.pagination {
  display: inline-block;
  .el-pagination {
    .el-pager {
      li {
        border-radius: 50%!important;
      }
    }
    .btn-next,
    .btn-prev {
      background-color: #0000;
    }
    span {
      position: relative;
      div {
        top: -4px;
        width: 32px;
        height: 32px;
        // line-height: 32px;
        border-radius: 50%!important;
        margin: 0 8px;
        border: 2px solid @fontColor;
        vertical-align: middle;
        input {
          border: none;
          background-color: rgba(255, 255, 255, 0);
        }
      }
    }
  }
  .el-input__inner {
    color: @fontColor;
  }
  .el-pagination__jump {
    color: @fontColor;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: @fontColor;
    color: @bgColor;
  }
  .el-pagination .btn-next,
  .el-pagination .btn-prev {
    background-color: rgba(255, 255, 255, 0);
  }
  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev, 
  .el-pagination.is-background .el-pager li{
    color: @fontColor;
    background-color: @bgColor;
  }
  .el-pagination.is-background .btn-next.disabled,
  .el-pagination.is-background .btn-next:disabled,
  .el-pagination.is-background .btn-prev.disabled,
  .el-pagination.is-background .btn-prev:disabled,
  .el-pagination.is-background .el-pager li.disabled {
    color: rgba(0, 255, 255, 0.3);
  }
}
</style>