<template>
    <div class="changePhone">
      <div class="account_information">
        <span>修改绑定手机</span>
      </div>
      <div id="updatePassword">
        <div class="updatePassword_inner">
          <div class="imageAndInformation">
            <!--表单部分-->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
              <el-form-item label="手机号：" prop="number">
                <el-input type="text" v-model="ruleForm.number" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item style="position: relative" class="second_item" label="获取验证码：" prop="statusCode" >
                <el-input style="width: 60%;" type="text" v-model="ruleForm.statusCode"  autocomplete="off">

                </el-input><el-button @click="getCode" type="primary" class="getScode" size="mini" round>获取验证码</el-button>
              </el-form-item>
            </el-form>

          </div>
          <div>
            <div class="confirmButton">
                <el-button @click="submitForm('ruleForm')" type="primary" size="mini" round>
                  确定
                </el-button>
                <el-button @click="backTo" type="info" size="mini" round>
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
        name: "changePhone",
      created(){
        this.ruleForm.userId=JSON.parse(localStorage.getItem("userInfo")).id;
      },
      data() {
        var validatePass3 = (rule, value, callback) => {
          if (!(/^1[3456789]\d{9}$/.test(value))) {
            callback(new Error('手机号码有误，请重填'));
          } else {
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value==="") {
            callback(new Error('验证码不能为空'));
          }else{
            callback();
          }
        };
        return {
          ruleForm: {
            number: "",
            statusCode:"",
            userId:""
          },
          rules: {
            number: [
              { validator: validatePass3, trigger: 'blur'}
            ],
            statusCode: [
              { validator: validatePass2, trigger: 'blur'}
            ]
          }
        }
      },

      methods:{
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
              //修改手机号
              this.axios.post(`api/personCenter/updatePersonPhone?phone=${this.ruleForm.number}&&userId=${this.ruleForm.userId}&&code=${this.ruleForm.statusCode}`).then(
                (data)=>{
                  this.$store.commit("deleteUserCenter");
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
        backTo(){
          this.$emit("backToM1");
        },
        //获取验证码
        getCode(){
          this.axios.get(`api/personCenter/getCode?phone=${this.ruleForm.number}`).then(
            (data)=>{
              console.log(data)
              // localStorage.setItem("userInfo",JSON.stringify(data.data.data));
              // this.$router.push("/contentBox");
            }
          ).catch( (err)=>{
            console.log("这个是错误")
            console.log(err)
          });
        }
      }
    }
</script>

<style scoped>
  .changePhone{
    width: 430px;
    height: 210px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -105px;
    margin-left: -215px;
    background-image: url("../../../assets/public/img/sidebar/changePhone.png");
    background-size: 100% 100%;
  }
  .account_information{
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    color:rgb(160,253,255);
    font-size: 16px;
  }
  #updatePassword{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

  }
  .updatePassword_inner{
    height: 83.4%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: space-around;
    border-radius: 10px;
  }
  .imageAndInformation .el-form{
    margin:0 auto;
    width: 80%;
  }
  .imageAndInformation>>>.el-form-item__label{
    color:rgb(160,253,255)
  }
  .imageAndInformation .el-form-item{
    height: 40px;
    margin-top: -10px;
  }
  .imageAndInformation>>>.el-input__inner{
    border: none;
    background-color: transparent;
    border-bottom: 1px dashed rgb(160,253,255);
  }
  .second_item>>>.el-form-item__content{
    width: 180px;
  }
  .getScode{
    position: absolute;
    left: 70%;
    top: 15%;
    border: none;
    background-color: transparent;
    color:rgb(160,253,255)
  }
  .confirmButton .el-button:nth-of-type(2){
    margin-left: 20%;
  }
  .confirmButton .el-button{
    background-color: transparent;
    color:rgb(160,253,255);
    border: 1px solid rgb(160,253,255);
  }
  .confirmButton{
    width: 100%;
    margin-top: 5px;
    display: flex;
    justify-content: space-around;
    padding-right: 20%;
    padding-left: 20%;
    box-sizing: border-box;
  }
</style>
