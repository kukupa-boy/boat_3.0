<template>
    <div class="login">
        <div style="width: 100%;">
            海上风电智慧调度平台
        </div>
        <div class="login_box"  >
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
            <el-form-item  label="" prop="userName">
              <i style="color:rgb(160,253,255) ;font-size: 24px;padding-right: 2%;box-sizing: border-box;vertical-align: middle" class="fa fa-address-book-o" aria-hidden="true"></i>
              <el-input type="text" v-model="ruleForm.userName"  autocomplete="off" placeholder="登录账号"></el-input>
            </el-form-item>
            <el-form-item  label="" prop="userPassword">
<!--              <i style="color:rgb(160,253,255) ;font-size: 22px;padding-right: 2%;box-sizing: border-box;vertical-align: middle" class="fa fa-keyboard-o" aria-hidden="true"></i>-->
              <i style="color:rgb(160,253,255) ;font-size: 22px;padding-right: 2%;box-sizing: border-box;vertical-align: middle" class="fa fa-key" aria-hidden="true"></i>
              <el-input type="password" v-model="ruleForm.userPassword" placeholder="登录密码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item  class="submit_button">
              <div class="yan" style="" @click="submitForm('ruleForm')" >登录</div>
            </el-form-item>
          </el-form>
        </div>

      <div class="yanyanyan">
        <img src="../assets/public/img/pageLogo1.png">
      </div>
    </div>
</template>

<script>

  export default {
    name: 'login',
    mounted(){

    },
    data(){
      var validator1 = (rule, value, callback) => {
        console.log(value.length);
        if (value === '') {
          callback(new Error('用户名不能为空!'));
        } else if (value.length<2||value.length>16) {
          callback(new Error('账号在2到16位'));
        } else {
          callback();
        }
      };
      var validator2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('密码不能为空!'));
        } else if (value.length<3||value.length>16) {
          callback(new Error('账号在6到16位!'));
        } else {
          callback();
        }
      };
      return {
        //登录的值部分
        ruleForm: {
          userName: '',
          userPassword: ''
        },
        rules: {
          userName: [
            {validator:validator1, trigger: ['blur','change'] },
            // { min:2,max:16,message:"账号在2到16位", trigger: ['blur','change'] }
          ],
          userPassword: [
            {validator:validator2, trigger: ['blur','change'] },
            // { min:6,max:16,message:"密码在6到16位", trigger:  ['blur','change'] }
          ],
        }
      };
    },
    methods: {
      //登录时验证码判断部分
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //向后台发起登录验证
            this.axios.post(`api/login/userLogin?userAccount=${this.ruleForm.userName}&&userPwd=${this.ruleForm.userPassword}`).then(
              (data)=>{
                console.log(data)
                localStorage.setItem("userInfo",JSON.stringify(data.data.data));
                this.$router.push("/contentBox");
              }
            ).catch( (err)=>{
              console.log("这个是错误")
              console.log(err)
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },

  }
</script>

<style scoped>
    @import '../assets/public/icomoon/style.css';
    .login{
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1000;
      background-image: url("../assets/public/img/login.jpg");
      background-size: 100% 100%;
    }
    .login>div:nth-of-type(1){
      height: 45px;
      /*height: auto;*/
      /*margin-top: 7.1%;*/
      text-align: center;
      background-color: transparent;
      font-size: 26px;
      color: rgb(160,253,255) ;
      margin-top: 8%;
    }
    .login_box{
      width:29.2%;
      height: 42%;
      margin-left: 35.5%;
      margin-top:1%;
      text-align: center;
      position: relative;
      /*border: 1px solid red;*/
      display: block;
    }
    .login_box>>>.el-form{
      height: 100%;
      display: flex;
      align-content: space-around;
      margin-top: -2%;
    }
    .login_box>>>.el-form-item:nth-of-type(1),.login_box>>>.el-form-item:nth-of-type(2){
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      height:45px;
    }
    .login_box>>>.el-form-item__label{
        color: rgb(160,253,255);
      }
    .login_box>>>.el-form-item:nth-of-type(1){
      margin-top: 10%;
    }
    .login_box>>>.el-form-item:nth-of-type(2){
    margin-top: 3%;
  }
    .login_box>>>.el-input{
      width: 85%;
    }
    .login_box>>>.el-form{
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .login_box>>>.el-input__inner{
      border-radius: 30px;
      border: 1px solid rgb(160,253,255);
      height: 30px;
      color: rgb(160,253,255);
      background-color: transparent;
      line-height: 30px;
    }
    .login_box>>>.el-input ::placeholder{
      color: rgb(160,253,255);
      font-size: 14px;
    }
    /*输入框错误部分*/
   .el-form-item>>>.el-form-item__error{
      margin-top: -2.5%;
      padding-left: 18%;
     box-sizing: border-box;
    }
    /*button部分*/
    .yan{
      display: block;
      width: 60px;
      height:60px;
      border-radius: 100%;
      background-color: transparent;
      color: rgb(160,253,255);
      line-height: 60px;
      text-align: center;
      background-image: url("../assets/public/img/circle.png");
      background-size: 100% 100%;
    }
    .login_box>>>.submit_button{
      margin: 6%;
      display: flex;
      justify-content: center;
      align-items: center;

    }
  .yanyanyan{
    position: absolute;
    height: 10%;
    width: 100%;
    bottom: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .yanyanyan img{
    width: 336px;
    height: 18px;
  }
</style>
