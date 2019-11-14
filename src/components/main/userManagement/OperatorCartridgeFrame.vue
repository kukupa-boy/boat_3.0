<template>
    <!--作业人员弹框-->
  <div class="elastic">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="430px"
      :modal="false"
      custom-class="elastic-box2"
      @close="$emit('update:show', false)"
      :show="show">
      <!--这是头像-->
      <div class="img">
        <div v-show="head">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div v-show="edit">
          <!--<img :src=formLabelAlign.headPortrait alt="">-->
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <!--这是增删改查的弹框-->
      <el-form  :label-position="labelPosition" label-width="150px" :model="formLabelAlign">
        <el-form-item label="账号: ">
          <el-input v-model="formLabelAlign.accountNumber" :disabled="edit"  class="form-input2"></el-input>
        </el-form-item>
        <el-form-item label="姓名: ">
          <el-input v-model="formLabelAlign.name" class="form-input2"></el-input>
        </el-form-item>
        <el-form-item label="状态: " v-if="edit">
          <el-select v-model="value" placeholder="请选择状态" class="input">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄: ">
          <el-input v-model="formLabelAlign.age" class="form-input2"></el-input>
        </el-form-item>
        <el-form-item label="性别: ">
          <!--<el-input v-model="formLabelAlign.gender" class="form-input2"></el-input>-->
          <el-select v-model="value2" placeholder="请选择性别" class="input">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位: ">
          <el-select v-model="value1" placeholder="请选择岗位" class="input">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资质: ">
          <el-input v-model="formLabelAlign.Qualifications" :disabled="edit" class="form-input2"></el-input>
        </el-form-item>
        <el-form-item label="手机号码: ">
          <el-input v-model="formLabelAlign.phone" :disabled="edit" class="form-input2"></el-input>
        </el-form-item>
        <el-form-item label="创建时间: " v-if="edit">
          <el-input v-model="formLabelAlign.time" class="form-input2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        visible: this.show,//监控弹框显示/隐藏
        title:'添加用户',
        head:false,//添加时隐藏
        edit:false,//编辑时显示
        imageUrl: '',//存储img路径
        labelPosition: 'right',//默认表单对齐方式
        formLabelAlign: {
          SerialNum:'',//工号(需要注释的)
          headPortrait:'',//头像
          age:'',//年龄
          name:'',//员工姓名
          gender:'',//性别
          accountNumber:'',//账号
          post:'',//岗位
          Qualifications:'',//资质
          time:'',//创建时间
          personStatus:'正常',//人员状态
          phone:''//员工电话
        },
        options: [
          {
          value: '选项1',
          label: '正常'
        }, {
          value: '选项2',
          label: '落水'
        }, {
          value: '选项3',
          label: '呼救'
        }],
        value: '',//状态的绑定
        options1: [
          {
          value: '电气运行专员',
          label: '电气运行专员'
        }, {
          value: '电气巡检专员',
          label: '电气巡检专员'
        },
          {
            value: '设备运行专员',
            label: '设备运行专员'
          },
          {
            value: '设备巡检专员',
            label: '设备巡检专员'
          }],
        value1: '',//岗位的绑定
        options2: [
          {
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
        }],
        value2: '',//性别的绑定
      };
    },
    methods:{
      add(){
        this.visible =false;
      },
      //这是上传img的方法
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
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
        this.title = this.title1;
        // console.log(this.title);
        // console.log(this.title === '添加用户');
        if(this.title === '添加用户'){
          this.head=true;
          this.edit=false;
        }else {
          this.head=false;
          this.edit=true;
        }
        if(this.title === '添加用户'){
          this.formLabelAlign.name='';
          this.formLabelAlign.age='';
          // this.formLabelAlign.gender='';
          this.formLabelAlign.accountNumber='';
          this.formLabelAlign.phone='';
          this.value1='';
          this.value='';
          this.value2='';
          this.imageUrl = '';
        }else {
          this.formLabelAlign.SerialNum=this.sonData.SerialNum;
          this.formLabelAlign.name=this.sonData.name;
          this.formLabelAlign.age=this.sonData.age;
          this.imageUrl=this.sonData.headPortrait;
          this.value2=this.sonData.gender;
          this.formLabelAlign.accountNumber=this.sonData.accountNumber;
          this.formLabelAlign.phone=this.sonData.phone;
          this.value1=this.sonData.post;
          this.value=this.sonData.personStatus;
        }
      }
    }
  };
</script>

<style scoped>

</style>
<style>
  .elastic-box2 .el-dialog__body{
    padding: 0 20px!important;
  }
  .elastic >div >div{
    height: 510px;
    width: 430px;
  }
  .elastic-box2{
    background-color:transparent!important;
    background-image: url("../../../assets/public/img/bounceBox.png")!important;
    background-size: 100% 100%!important;
  }
  .elastic-box2 label{
    color: #59fdff;
  }
  /*.el-dialog, .el-pager li {*/
    /*background: transparent!important;*/
    /*-webkit-box-sizing: border-box;*/
  /*}*/
  .elastic-box2>div:nth-child(1){
    color: white;
    height: 30px;
    line-height: 30px;
    background-color: transparent;
  }
  .elastic-box2 .el-dialog__header{
    padding: 0;
  }
  .elastic-box2>div:nth-child(1) >span{
   color: #59fdff;
    font-size: 14px;
    margin-left: 10px;
  }
  .elastic-box2>div:nth-child(2) > form > div{
    margin-bottom: 0px;
  }
  .form-input2 .el-input__inner {
    width: 140px;
    height: 30px;
    color: white;
    background-color: transparent;
    border-top: 1px solid transparent;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    border-bottom: 1px dashed #59fdff;
    display: inline-block;
  }

  /*覆盖disable样式*/
  .el-input.is-disabled .el-input__inner{
    border-top: 1px solid transparent;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    border-bottom: 1px dashed #59fdff;
    background-color: transparent!important;
    color:#ACA899;
  }
  /*.box-input >div{*/
    /*!*width: 120px;*!*/
  /*}*/
  .box-textarea >div{
    width: 300px;
  }
  .input>div>input{
    width: 140px;
    height: 30px;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 40px;
    color:white;
  }
  .img{
    width: 100%;
    height: 50px;
    text-align: center;
    position: relative;
  }
  .img >div{
    width: 48px;
    height: 48px;
    /*background-color: rgba(0, 0, 0, 0.69);*/
    background-image: url("../../../assets/public/img/imgHead.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: white;
    text-align: center;
    line-height: 48px;
    overflow: hidden;
    border-radius: 48px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    /*bottom: 0;*/
    margin: auto;
  }
  .img >div  img{
    width: 100%;
    height: 100%;
    /*border-radius: 100px;*/
    /*border: 1px solid rgb(247,247,247);*/
  }
  .el-dialog, .el-pager li{
    background-color: transparent;
  }
  /*这是img上传的css*/
  .avatar-uploader .el-upload {
    /*border: 1px dashed #d9d9d9;*/
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #fff;
    width: 48px;
    height: 48px;
    line-height: 48px;
    text-align: center;
  }
  .avatar {
    width: 48px;
    height: 48px;
    display: block;
  }
  .elastic-box2 .el-dialog__footer{
    text-align: center!important;
    padding: 0;
    margin-top: 20px;
  }
  .elastic-box2 .el-dialog__footer .el-button{
    padding: 6px 12px;
    background-color: transparent;
    color: #59fdff;
    border-radius: 30px;
    border: 1px solid #59fdff;
    box-sizing: border-box;
  }
</style>
