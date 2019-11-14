<template>
  <!--摄像头管理弹框-->
  <div class="elastic1">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="500px"
      :modal="false"
      center
      custom-class="elastic-box1"
      @close="$emit('update:show', false)"
      :show="show">
      <el-form :label-position="labelPosition" label-width="60px" :model="formLabelAlign">
        <!--<el-form-item label="编号: ">-->
          <!--<el-input :disabled="bank"  v-model="formLabelAlign.num"  class="form-input1"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="型号: ">
          <el-input :disabled="bank"  v-model="formLabelAlign.version"  class="form-input1"></el-input>
        </el-form-item>
        <el-form-item label="经度: ">
          <el-input v-model="formLabelAlign.lon" class="form-input1"></el-input>
        </el-form-item>
        <el-form-item label="纬度: ">
          <el-input v-model="formLabelAlign.lat" class="form-input1"></el-input>
        </el-form-item>
        <el-form-item label="状态: " v-if="status">
            <!--<el-input v-model="formLabelAlign.status" class="form-input1"></el-input>-->
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注: ">
          <el-input type="textarea" v-model="formLabelAlign.remark" class="form-input1"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false;open2()" :plain="true">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        visible: this.show,//监控弹框显示/隐藏
        title:'新增信息',
        data1:'',//存放登录相关
        bank:false,//控制input的禁用
        status:false,//编辑时的显示
        options: [{
          value: '禁用',
          label: '禁用'
        }, {
          value: '启用',
          label: '启用'
        }],
        value: '',
        labelPosition: 'right',//默认表单对齐方式
        formLabelAlign: {
          id:'',
          version:'',
          lon:'',
          lat:'',
          remark:'',
          status:''
        },

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
    created(){
      this.data1=JSON.parse(localStorage.getItem("userInfo"))
    },
    watch: {
      show () {
        this.visible = this.show;
        this.title = this.title1;
        if(this.title==='添加摄像头'){
          this.status=false;
          // this.formLabelAlign.num= '';
          this.formLabelAlign.version= '';
          this.formLabelAlign.lon='';
          this.formLabelAlign.lat='';
          this.formLabelAlign.remark='';
          this.formLabelAlign.status='';
          this.bank = false;
        }else {
          this.status=true;
          // this.formLabelAlign.num=this.sonData.num;
          this.formLabelAlign.id=this.sonData.id;
          this.formLabelAlign.version=this.sonData.version;
          this.formLabelAlign.lon=this.sonData.lon;
          this.formLabelAlign.lat=this.sonData.lat;
          this.formLabelAlign.remark=this.sonData.remark;
          this.formLabelAlign.status=this.sonData.status;
          this.value=this.sonData.status;
          this.bank = true;
        }
      }
    },
    methods:{
      //新增或编辑
      open2() {
        if(this.title==='添加摄像头'){
          this.$message({
            message: '恭喜你，添加成功',
            type: 'success'
          });
          let obj={};
          obj.userId=this.data1.id;
          obj.version=this.formLabelAlign.version;
          obj.lat=this.formLabelAlign.lat;
          obj.lon=this.formLabelAlign.lon;
          obj.remark=this.formLabelAlign.remark;
        // ,{emulateJSON:true}
          this.axios.post('/api/monitor/addMonitor',obj).then((res)=>{
            console.log(res);
          }).catch((err)=>{
            console.log(err);
          });
          this.$message({
            message: '恭喜你，添加成功',
            type: 'success'
          });
        }else {
          let obj={};
          obj.id=this.formLabelAlign.id;
          obj.version=this.formLabelAlign.version;
          obj.lat=this.formLabelAlign.lat;
          obj.lon=this.formLabelAlign.lon;
          obj.remark=this.formLabelAlign.remark;
          obj.userId=this.data1.id;
          if(this.value==='禁用'){
            obj.status=0;
          }else{
            obj.status=1;
          }
          this.axios.put('/api/monitor/updateMonitor',obj).then((res)=>{
            console.log(res);
          }).catch((err)=>{
            console.log(err);
          });
          this.$message({
            message: '恭喜你，编辑成功',
            type: 'success'
          });
        }
      },
    }
  };
</script>

<style scoped>

</style>
<style>
  .elastic1 >div >div{
    height: 382px;
    width: 500px;
    overflow: hidden;
  }
  .elastic-box1{
    background-image: url("../../../../assets/public/img/cameraManagementAdd.png")!important;
    background-size: 100% 100%!important;
    background-color:transparent!important;
  }
  .elastic-box1 label{
    color: #59fdff;
  }
  .elastic-box1>:nth-child(1){
    color: white;
    height: 30px;
    line-height: 30px;
    background-color: transparent;
  }
  .elastic-box1 .el-dialog__header{
    padding: 0;
    text-align: left;
  }
  .elastic-box1>:nth-child(2) > form > div{
    margin-bottom: 10px;
  }
  .elastic-box1>div:nth-child(1) >span{
    color: #59fdff;
    font-size: 14px;
    margin-left: 10px;
  }
  .form-input1 .el-input__inner {
    /*width: 140px;*/
    height: 30px;
    color: #fff;
    /*border-radius: 100px;*/
    background-color: transparent;
    border-top: 1px solid transparent;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    border-bottom: 1px dashed #59fdff;
    display: inline-block;
    overflow-y:hidden!important;
  }
  .form-input1 .el-textarea__inner{
    background-color: transparent;
    border: 1px dashed #59fdff;
    color:#fff;
  }
  /*覆盖disable样式*/
  .el-input.is-disabled .el-input__inner{
    border-top: 1px solid transparent!important;
    border-left: 1px solid transparent!important;
    border-right: 1px solid transparent!important;
    border-bottom: 1px dashed #59fdff!important;
    background-color: transparent!important;
    color:#59fdff!important;
  }
  /*.box-input1 >div{*/
    /*width: 100%;*/
  /*}*/
  .elastic-box1 .el-dialog__footer{
    text-align: center!important;
    padding: 0;
  }
  .elastic-box1 .el-dialog__footer .el-button{
    padding: 6px 12px;
    background-color: transparent;
    color: #59fdff;
    border-radius: 30px;
    border: 1px solid #59fdff;
    box-sizing: border-box;
  }
  .elastic-box1 .el-select{
    width: 20%;
  }
  .elastic-box1 .el-select .el-input__inner{
    background-color: transparent;
    /*border: 1px solid;*/
    border: 0px;
    color: #fff;
  }
</style>
