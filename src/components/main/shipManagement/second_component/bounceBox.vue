<template>
  <div class="bounceInnerBox">
    <h4>新增船舶出海条件</h4>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="船高" prop="height">
        <el-input type="text" v-model="ruleForm.height" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="船宽" prop="width">
        <el-input type="text" v-model="ruleForm.width" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="风力" prop="wind">
        <el-input type="text" v-model="ruleForm.wind"></el-input>
      </el-form-item>
      <el-form-item label="浪高" prop="waveHeight">
        <el-input type="text" v-model="ruleForm.waveHeight" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-input type="text" v-model="ruleForm.state" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="text" v-model="ruleForm.remark"></el-input>
      </el-form-item>
      <el-form-item class="bottom">
        <el-button class="button1" type="primary" size="mini" @click="submitForm('ruleForm')">提交</el-button>
        <el-button class="button2" size="mini" @click="deleteBounce" >取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "bounceBox",
      data() {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入相应的字段'));
          } else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        return {
          ruleForm: {
            height:"",
            width:"",
            wind:"",
            waveHeight:"",
            state:"",
            remark:"",
          },
          rules: {
            height:[{ validator: validatePass, trigger: 'blur' }],
            width:[{ validator: validatePass, trigger: 'blur' }],
            wind:[{ validator: validatePass, trigger: 'blur' }],
            waveHeight:[{ validator: validatePass, trigger: 'blur' }],
            state:[{ validator: validatePass, trigger: 'blur' }],
            remark:[{ validator: validatePass, trigger: 'blur' }],
          },
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
                //子组件调用父组件中的函数，并且传递对应的index给父组件
                //注意：this.$emit里面的函数只能是小写，不能是大写
                this.$emit('removeBounceBox')
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        deleteBounce(){
          this.$emit('removeBounceBox')
        }
      }
    }
</script>

<style scoped>
  /*弹出框*/
    .bounceInnerBox{
      width: 100%;
      height:100%;
  }
  .bounceBox h4{
    color: rgb(160,253,255);
    padding-left:1% ;
    box-sizing: border-box;
    padding-top:1%;
    padding-bottom:1%;
  }
  .el-form{
    color: rgb(160,253,255);
    height: 94%;
    width: 70%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  /*.bounceInnerBox>>>.el-form-item:nth-last-child(1){*/
  /*  height: auto;*/
  /*  display: flex;*/
  /*  justify-content: space-around;*/
  /*  align-items: center;*/
  /*}*/
  .bottom{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .bounceInnerBox>>>.el-form-item__label{
    color: rgb(160,253,255);
  }
  .bounceInnerBox>>>.el-input__inner{
    background-color: transparent;
    width: 70%;
    border: none;
    border-bottom: 1px dashed rgb(160,253,255);
    /*border: 1px solid red;*/
  }
  .bounceInnerBox>>>.el-form-item{
    height: 20px;
  }
  .button1{
    margin-left: -30%;
    background-color: transparent;
    border-radius: 20px;
    border: 1px solid rgb(160,253,255);
    color: rgb(160,253,255);
  }
  .button2{
    margin-right: 20%;
    background-color: transparent;
    border-radius: 20px;
    border: 1px solid rgb(160,253,255);
    color: rgb(160,253,255);
  }
</style>
