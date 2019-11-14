<template>
  <!--任务弹框-->
  <div class="elastic11">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="430px"
      :modal="false"
      center
      custom-class="elastic-box11"
      @close="$emit('update:show', false)"
      :show="show">
      <div class="taskTitle"><span>工单详情</span></div>
      <el-form  :label-position="labelPosition" label-width="180px" :model="formLabelAlign">
        <el-form-item label="工单名称: ">
          <el-input disabled v-model="formLabelAlign.taskName"  class="form-input6"></el-input>
        </el-form-item>
        <el-form-item label="生效时间: ">
          <el-input disabled v-model="formLabelAlign.effectiveTime" class="form-input6"></el-input>
        </el-form-item>
        <el-form-item label="失效时间: ">
          <el-input disabled v-model="formLabelAlign.expirationTime" class="form-input6"></el-input>
        </el-form-item>
        <el-form-item label="工单类型: ">
          <el-input disabled v-model="formLabelAlign.type" class="form-input6"></el-input>
        </el-form-item>
        <el-form-item label="分发人员: " >
          <el-input disabled v-model="formLabelAlign.uname" class="form-input6"></el-input>
        </el-form-item>
        <el-form-item label="创建时间: " >
          <el-input disabled v-model="formLabelAlign.createTime" class="form-input6"></el-input>
        </el-form-item>
        <el-form-item label="工单描述: ">
          <el-input disabled v-model="formLabelAlign.description" class="form-input6"></el-input>
        </el-form-item>
      </el-form>
      <div class="bottomBorder"></div>
      <div class="taskState">
        <div>
          <el-checkbox v-model="checked" v-show="complete2">标记为已完成</el-checkbox>
          <span v-show="complete1">已解决</span>
        </div>
        <div v-show="complete2">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </div>
      </div>
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
        title:'',
        complete1:'',//已完成显示
        complete2:'',//未完成显示
        labelPosition: 'right',//默认表单对齐方式
        checked: true,//复选框
        textarea: '',//多行文本框
        formLabelAlign: {
          SerialNum:'',//工号
          taskName:'',//任务名称
          effectiveTime:'',//生效时间
          expirationTime:'',//失效时间
          type:'',//任务类型
          description:'',//任务描述
          createTime:'',//创建时间
          uname:'',//分发人员
          complete:'',//已完成，未完成
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
        this.title=this.title1;
        console.log(this.title);
        console.log(this.sonData);
        this.axios.get(`/api/task/taskNoticeInfo?id=${this.sonData.id}`).then((res)=>{
          console.log(res.data);
          this.formLabelAlign.taskName=res.data.data.taskName;
          this.formLabelAlign.effectiveTime=res.data.data.effectiveTime;
          this.formLabelAlign.expirationTime=res.data.data.expirationTime;
          this.formLabelAlign.type=res.data.data.type;
          this.formLabelAlign.description=res.data.data.description;
          this.formLabelAlign.uname=res.data.data.uname;
          this.formLabelAlign.createTime=res.data.data.createTime;
          if(res.data.data.taskStatus==='confirm'){
            this.complete1=true;
            this.complete2=false;
          }else{
            this.complete1=false;
            this.complete2=true;
          }
          // this.formLabelAlign.uid=res.data.data.uid;
        }).catch((err)=>{
          console.log(err);
        })
        // if(this.sonData.complete){
        //   this.complete1=true;
        //   this.complete2=false;
        // }else{
        //   this.complete1=false;
        //   this.complete2=true;
        // }
      }
    }
  };
</script>

<style scoped>
  .elastic-box11>:nth-child(1){
    /*color: #59fdff;*/
    background-color: transparent;
  }
  .elastic-box11>:nth-child(2) > form > div{
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
  .taskState{
    color:#59fdff;
    width: 80%;
    margin-top: 10px;
    margin-left: 10%;
  }
</style>
<style>
  .form-input6 .el-input__inner {
    width: 220px;
    height: 30px;
    border-radius: 0px!important;
    display: inline-block;
  }
  .input>div>input{
    height: 30px;
    border-radius: 40px;
  }
  .elastic-box11{
    background-image: url("../../../../assets/public/img/monitoringPicture.png")!important;
    background-size: 100% 100%!important;
    position: relative;
  }
  .elastic-box11 .taskTitle{
    position: absolute;
    left: 10px;
    top: 10px;
    color: #59fdff;
  }
  .elastic-box11 label{
    color: #59fdff;
    width: 120px!important;
  }
  .elastic-box11>div:nth-child(1){
    height: 30px;
    line-height: 30px;
    background-color: transparent;
  }
  .elastic-box11 .el-dialog__header{
    padding: 0;
  }
  .elastic-box11>div:nth-child(1) >span{
    color: transparent;
    font-size: 14px;
    margin-left: 10px;
  }
  .elastic-box11>div:nth-child(2) > form > div{
    margin-bottom: 10px;
  }
  .form-input6 .el-input__inner {
    width: 140px;
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
  .elastic-box11 .el-form-item__content{
    margin-left: 120px!important;
  }
  /*覆盖disable样式*/
  .el-input.is-disabled .el-input__inner{
    border-top: 1px solid transparent!important;
    border-left: 1px solid transparent!important;
    border-right: 1px solid transparent!important;
    border-bottom: 1px dashed #59fdff!important;
    background-color: transparent!important;
    color: #4cced0!important;
  }
  .elastic-box11 .el-dialog__footer{
    text-align: center!important;
    padding: 0;
  }
  .elastic-box11 .el-dialog__footer .el-button{
    padding: 6px 12px;
    background-color: transparent;
    color: #59fdff;
    border-radius: 30px;
    border: 1px solid #59fdff;
    box-sizing: border-box;
    margin-bottom: 30px;
  }
  .taskState .el-checkbox__inner{
    background-color: transparent!important;
    border: 1px solid #59fdff;
  }
  .taskState .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #59fdff;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner
  .taskState .el-checkbox__input.is-checked{
    border-color: #59fdff;
  }
  .taskState .el-checkbox__inner::after{
    border-color: #59fdff;
  }
  .taskState .el-textarea__inner{
    margin-top: 10px;
    background-color: transparent!important;
    color: #59fdff;
    border-radius: 0;
    border: 1px  solid #59fdff;;
  }
</style>
