<template>
    <div class="changePassword">
      <div id="updatePassword">
        <div class="account_information">
          <span>修改密码</span>
        </div>
        <div class="updatePassword_inner">
          <div class="imageAndInformation">
            <div class="updatePassword_form" >
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
                <el-form-item label="原密码：" prop="pass1">
                  <el-input type="password" v-model="ruleForm.pass1"  autocomplete="off"></el-input>
                </el-form-item >
                <el-form-item label="新密码：" prop="pass">
                  <el-input type="password" v-model="ruleForm.pass"  autocomplete="off"></el-input>
                </el-form-item >

                <el-form-item label="确认密码：" prop="checkPass">
                  <el-input type="password" v-model="ruleForm.checkPass"  autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div>
            <div class="confirmButton">
                <el-button  @click="submitForm('ruleForm')" style="background-color: transparent;border: 1px solid rgb(160,253,255);color: rgb(160,253,255);" size="mini"  round>
                  确定
                </el-button>
                <el-button @click="backTo" style="background-color: transparent;border: 1px solid rgb(160,253,255);color: rgb(160,253,255);" size="mini" round>
                  取消
                </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "changePassword",


      created(){
        var data=JSON.parse(localStorage.getItem('userInfo'));
        //拿取原本的个人中心的数据
          this.ruleForm.number=data.phone;
          this.ruleForm.userId=data.id
      },
      data(){
        //新密码判断
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          }else if(value === this.ruleForm.pass1) {
            callback(new Error('和原密码一致!'));
          } else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        //第二次输入密码判断
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
          }else {
            callback();
          }
        };
        return{
          ruleForm:{
            pass1:"",
            pass:"",
            checkPass:"",
            number:"",
            userId:""
          },
          rules:{
            pass1: [
              { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: ['blur','change']}
            ],
            pass: [
              {validator: validatePass, trigger: 'blur' },
              { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger:  ['blur','change'] }
            ],
            checkPass: [
              { validator: validatePass2, trigger:  ['blur','change'] }
            ]
          }
        }
      },
      methods:{
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
              //验证规则通过跳转页面
              this.axios.post("api/personCenter/updatePersonPassWord",
                {
                  confirmPwd: this.ruleForm.checkPass,
                  newPwd: this.ruleForm.pass,
                  oldPwd: this.ruleForm.pass1,
                  phone: this.ruleForm.number,
                  userId: this.ruleForm.userId
                }
              )
                .then(
                  (data)=>{
                    console.log("data");
                    console.log(data)
                    // this.$store.commit("deleteUserCenter");
                  }
                ).catch( (err)=>{
                console.log("这个是错误")
                console.log(err)
              });

              this.$store.commit("deleteUserCenter");
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        //跳转会修改个人信息页面
        backTo(){
          this.$emit("backToM1");
        }
      }
    }
</script>

<style scoped>
  .changePassword{
    width: 430px;
    height: 260px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -215px;
    margin-top:-130px;
    background-image: url("../../../assets/public/img/sidebar/changePassword.png");
    background-size: 100% 100%;
  }
  #updatePassword{
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
  .account_information{
    width: 100%;
    box-sizing: border-box;
    color:rgb(160,253,255) ;
    padding-left: 5px;
    box-sizing: border-box;
  }
  .account_information span{
    font-size: 16px;
    line-height: 30px;
  }
  .updatePassword_inner{
    height: 83.4%;
    width: 60%;
    display: flex;
    flex-direction: column;
    align-content: space-around;
    border-radius: 10px;
    /*border: 1px solid red;*/
    margin: 0 auto;
  }
  .updatePassword_form{
    margin: 0 auto;
    margin-top: 8%;
  }
  .updatePassword_form>div{
    margin-top: 20px;
  }
  .updatePassword_form>>>.el-form-item{
    /*border: 1px solid red;*/
    margin-top: -15px;
  }
  .updatePassword_form>>>.el-input__inner{
    height: 30px;
    outline: none;
    text-indent: 8px;
    background-color: transparent;
    border: none;
    border-bottom: 1px dashed rgb(160,253,255);
    color: rgb(160,253,255);
  }
  .updatePassword_form>>>.el-input__suffix{
    color: rgb(160,253,255);
  }
  .updatePassword_form>>>.el-form-item__label{
    color: rgb(160,253,255);
  }
  .updatePassword_form>div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8%;
  }
  .confirmButton{
    width: 100%;
    /*border: 1px solid yellow;*/
    display: flex;
    justify-content: space-around;
    padding-left: 8%;
    padding-right: 8%;
    box-sizing: border-box;
  }
  .confirmButton>>>.el_button{
    background-color: transparent;
    color: rgb(160,253,255);
  }
</style>
