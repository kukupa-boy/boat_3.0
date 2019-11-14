<template>
  <!--摄像头管理弹框-->
  <div class="elastic">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="560px"
      top="30vh"
      :modal="false"
      center
      custom-class="elastic-box"
      @close="$emit('update:show', false)"
      :show="show">
      <div>{{this.status}}</div>
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
        title:'驱逐外来船只',
        status:'',//编辑时的显示
        labelPosition: 'right',//默认表单对齐方式
        formLabelAlign: {
          num:'1',//编号
          model:'BTWS',//型号
          longitude:'117°',//经度
          latitude:'118°',//纬度
          cameraStatus:'运行',//摄像头状态
          reportingTime:'20.19.10.16 15:30',//上报时间
          remarks:'无备注',//备注
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
    },
    watch: {
      show () {
        this.visible = this.show;
        this.title = this.title1;
        if(this.title==='驱逐外来船只'){
          this.status='确定驱逐外来船只';
        }else {
          this.status='是否添加下面的风电场为监控目标';
        }
      }
    },
    methods:{
      open2() {
        if(this.title==='添加摄像头'){
          this.$message({
            message: '恭喜你，添加成功',
            type: 'success'
          });
        }else {
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
  .elastic-box>:nth-child(1){
    background-color: rgb(232,232,232);
  }
  .elastic-box>:nth-child(2) > form > div{
    margin-bottom: 10px;
  }
  .form-input .el-input__inner {
    width: 140px;
    height: 30px;
    border-radius: 10px;
    display: inline-block;
  }
  .box-input >div{
    width: 150px;
  }
</style>
