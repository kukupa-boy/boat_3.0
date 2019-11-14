<template>
  <!--任务弹框-->
  <div class="elastic10">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="560px"
      :modal="false"
      center
      custom-class="elastic-box10"
      @close="$emit('update:show', false)"
      :show="show">
      <div class="taskTitle"><span>工单详情</span></div>
      <el-form  :label-position="labelPosition" label-width="180px" :model="formLabelAlign">
        <el-form-item label="工单名称: ">
          <el-input disabled v-model="formLabelAlign.taskName"  class="form-input7"></el-input>
        </el-form-item>
        <el-form-item label="生效时间: ">
          <el-input disabled v-model="formLabelAlign.effectiveTime" class="form-input7"></el-input>
        </el-form-item>
        <el-form-item label="失效时间: ">
          <el-input disabled v-model="formLabelAlign.expirationTime" class="form-input7"></el-input>
        </el-form-item>
        <el-form-item label="工单类型: ">
          <el-input disabled v-model="formLabelAlign.type" class="form-input7"></el-input>
        </el-form-item>
        <el-form-item label="分发人员: " >
          <el-input disabled v-model="formLabelAlign.uid" class="form-input7"></el-input>
        </el-form-item>
        <el-form-item label="创建时间: " >
          <el-input disabled v-model="formLabelAlign.createTime" class="form-input7"></el-input>
        </el-form-item>
        <el-form-item label="工单描述: ">
          <el-input disabled v-model="formLabelAlign.description" class="form-input7"></el-input>
        </el-form-item>
      </el-form>
      <div class="bottomBorder"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        visible: this.show,//监控弹框显示/隐藏
        title:'1',
        labelPosition: 'right',//默认表单对齐方式
        formLabelAlign: {
          taskName:'',//任务名称
          effectiveTime:'',//生效时间
          expirationTime:'',//失效时间
          type:'',//任务类型
          description:'',//任务描述
          createTime:'',//创建时间
          uid:'',//分发人员
        }
      };
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      title1: {
        type: String,
        default: false
      },
      sonData:{
        type: Object,
        default:false,
      }
    },
    watch: {
      show () {
        this.visible = this.show;
        console.log(this.sonData.id);
        this.axios.get(`/api/task/taskInfo?taskId=${this.sonData.id}`).then((res)=>{
          console.log(res.data);
          this.formLabelAlign.taskName=res.data.data.taskName;
          this.formLabelAlign.effectiveTime=res.data.data.effectiveTime;
          this.formLabelAlign.expirationTime=res.data.data.expirationTime;
          this.formLabelAlign.type=res.data.data.type;
          this.formLabelAlign.description=res.data.data.description;
          this.formLabelAlign.createTime=res.data.data.createTime;
          this.formLabelAlign.uid=res.data.data.uid.join(' ');
        }).catch((err)=>{
          console.log(err);
        })
      }
    }
  };
</script>

<style scoped>
  .elastic-box10>:nth-child(1){
    /*color: #59fdff;*/
    background-color: transparent;
  }
  .elastic-box10>:nth-child(2) > form > div{
    margin-bottom: 10px;
  }
  .box-input >div{
    width: 220px;
  }
  .box-textarea >div{
    width: 300px;
  }
  .bottomBorder{
    width: 80%;
    height: 1px;
    background-color: #59fdff;
    background-image:linear-gradient(to right, #155372, #59fdff,#155372);
    margin: auto;
  }
</style>
<style>
  .form-input7 .el-input__inner {
    width: 220px;
    height: 30px;
    border-radius: 0px!important;
    display: inline-block;
  }
  .input>div>input{
    height: 30px;
    border-radius: 40px;
  }
  .elastic-box10{
    background-color:transparent!important;
    background-image: url("../../../../assets/public/img/monitoringPicture.png")!important;
    background-size: 100% 100%!important;
    position: relative;
  }
  .elastic-box10 .taskTitle{
    position: absolute;
    left: 10px;
    top: 10px;
    color: #59fdff;
  }
  .elastic-box10 label{
    color: #59fdff;
  }
  .elastic-box10>div:nth-child(1){
    height: 30px;
    line-height: 30px;
    background-color: transparent;
  }
  .elastic-box11 .el-dialog__header{
    padding: 0;
  }
  .elastic-box10>div:nth-child(1) >span{
    color: transparent;
    font-size: 14px;
    margin-left: 10px;
  }
  .elastic-box10>div:nth-child(2) > form > div{
    margin-bottom: 10px;
  }
  .form-input7 .el-input__inner {
    width: 200px;
    height: 30px;
    color: white;
    /*border-radius: 100px;*/
    background-color: transparent;
    border-top: 1px solid transparent;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    border-bottom: 1px dashed #59fdff;
    display: inline-block;
  }

  /*覆盖disable样式*/
  .el-input.is-disabled .el-input__inner{
    border-top: 1px solid transparent!important;
    border-left: 1px solid transparent!important;
    border-right: 1px solid transparent!important;
    border-bottom: 1px dashed #59fdff!important;
    background-color: transparent!important;
    color:#ACA899!important;
  }
  .elastic-box10 .el-dialog__footer{
    text-align: center!important;
    padding: 0;
  }
  .elastic-box10 .el-dialog__footer .el-button{
    padding: 6px 12px;
    background-color: transparent;
    color: #59fdff;
    border-radius: 30px;
    border: 1px solid #59fdff;
    box-sizing: border-box;
    margin-bottom: 30px;
  }
</style>
