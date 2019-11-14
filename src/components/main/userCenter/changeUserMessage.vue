<template>
  <div class="userCenter">
    <div class="account_information">用户信息</div>
    <div id="userCenter1">
      <div class="userCenter1_inner">
        <div class="imageAndInformation">
          <div class="user_image">
            <el-upload
              class="avatar-uploader"
              action="123"
              :http-request="upLoad"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="user_information">
            <el-form
              :rules="rules"
              ref="ruleForm"
              :model="userData"
              label-width="85px">
              <el-form-item label="姓名："  prop="UserName">
                <el-input v-model="userData.UserName" ></el-input>
              </el-form-item>
              <el-form-item  label="性别：">
                <el-select class="yan" v-model="userData.gender" placeholder="请选择">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="年龄：" prop="age">
                <el-input v-model="userData.age"></el-input>
              </el-form-item>
              <el-form-item label=" 密码：">
<!--                <p><span><router-link to="/contentBox/updatePhoneNumber">修改</router-link></span></p>-->
                    <p @click="updatePassword"><span>修改</span></p>
              </el-form-item>
              <el-form-item label=" 手机密码：">
                <p @click="updatePhone"><span>修改</span></p>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div>
          <div class="confirmButton">
            <el-button  type="primary" size="mini" @click="submitForm('ruleForm')" round>
              确定
            </el-button>
            <el-button type="info" size="mini" @click="userCenterCancel" round>
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
        name: "changeUserMessage",

      //页面开始的时候，拿取数据，进行页面的显示
      created(){
        var data=JSON.parse(localStorage.getItem('userInfo'));
        //拿取原本的个人中心的数据
        this.userData.UserName=data.account;
        if(data.sex===true){
          this.userData.gender="男";
        }else{
          this.userData.gender="女";
        }
        this.userData.age=data.age;
        this.userData.id=data.id;
      },
      mounted(){
      },
      data(){
        return{
          //图片上传的url
          imageUrl: '',
          userData:{
            UserName:"",
            age:"",
            gender:""
          },
          //表单的验证规则
          rules: {
            UserName: [
              {
               message: '姓名不能为空', trigger: 'blur'
              },
            ],
            age: [
              { message: '请输入3位数以内的整数', trigger: 'blur' },
              { min: 1, max: 2, message: '长度在 1到 2 个字符', trigger: 'blur' }
            ]
          }
        }
      },
      methods:{
        // userCenterComfirm(){
        //   this.$router.push("/contentBox/userCenter");
        // },
        //用户进行上传的函数
        upLoad(file) {
          const formData = new FormData();
          formData.append('multipartFile', file.file);
          this.axios.post(`file/fileUpLoad`,formData).then((res) => {
            console.log(res);
            console.log('上传成功');
            if (res.data.code == 200) {
              this.successUrl = res.data.data; // 请求之后将返回的URL给修改的接口在进行一次修改请求
              this.imageUrl = res.data.data; // 请求成功之后赋给头像的URL
              this.$message('头像上传成功');
              //这里可以将图片的数据在vuex中进行一次显示： this.$store.dispatch('person/setAvatar', this.successUrl);
              // const obj = {
              //   headUrl: this.successUrl
              // };
              // this.edit(obj);
              // this.getAccount();
            } else {
              this.$message('头像上传失败');
            }
          });
        },

        //头像上传后调用的·函数
        handleAvatarSuccess(res, file) {
          console.log("这个是头像上传成功后进行显示的数据")
          console.log(res);
          console.log(file)
          // this.imageUrl = URL.createObjectURL(file.raw);
        },

        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt3M = file.size / 1024 / 1024 < 3;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt3M) {
            this.$message.error('上传头像图片大小不能超过 3MB!');
          }
          return isJPG && isLt3M;
        },

        //用户进行提交的时候进行触发的函数
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
              //验证规则通过跳转页面
              if(this.userData.gender==="男"){
                this.userData.gender=1
              }else{
                this.userData.gender=0
              }
              this.axios.put("api/personCenter/updatePersonByIdOne",{
                age:this.userData.age,
                name:this.userData.UserName,
                sex:this.userData.gender,
                userId:this.userData.id
              })
                .then(
                (data)=>{
                  console.log(data)
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

        //跳转到修改密码组件
        updatePassword(){
          this.$emit("changePassword1")
        },

        //跳转到手机组件
        updatePhone(){
          this.$emit("changePhone1")
        },

        //跳转到个人信息界面
        userCenterCancel(){
          this.$emit('backM')
        },
      }
    }
</script>

<style scoped>
  /*弹出框的样式*/
  .userCenter{
    width:430px;
    height:430px;
    position: absolute;
    background-image: url("../../../assets/public/img/sidebar/changeInformation.png");
    background-size: 100% 100%;
    top: 50%;
    left: 50%;
    margin-left:-215px;
    margin-top: -215px;
    z-index: 9999;
    background-color:rgb(17,33,68);
  }
  .account_information{
    width: 100%;
    padding-left: 5px;
    font-size: 16px;
    box-sizing: border-box;
    color: rgb(160,253,255);
    padding-top:3px;
    padding-bottom:3px;
  }
  #userCenter1{
    width: 100%;
    height: 100%;
  }
  .userCenter1_inner{
    height: auto;
    width: 74%;
    margin: 20px auto;
  }
  .account_information span{
    font-size: 16px;
    line-height: 30px;
  }
  .user_image{
    margin: 0 auto;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background-image:url("../../../assets/public/img/header/pictureFrame.png") ;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .user_image img{
    width: 45px;
    height: 45px;
    border-radius: 100%;
  }
  /*这个是控制输入框的样式*/
  .user_information{
    margin-top: 4%;
    height: auto;
    text-align: center;
  }
  .user_information>>>.el-form{
    width: 60%;
    margin: 20px auto;
  }
  .user_information>>>.el-form-item{
    margin-top: -15px;
    height: 40px;
  }
  .user_information>>>.el-form-item__label{
    color: rgb(160,253,255);
    box-sizing: border-box;
  }
  .user_information>>>.el-input__inner{
    width: 100px;
    border: none;
    background-color: transparent;
    border-bottom: 1px dashed rgb(160,253,255) ;
    color:rgb(160,253,255);
    height: 30px;
    font-size: 14px;
  }
  .user_information>>>.el-select__inner>span{
    font-size: 12px;
  }
  .user_information>>>.el-select__inner::placeholder{
    color:rgb(160,253,255);
  }
  .user_information p{
    text-align: center;
  }

  /*页面的按钮的排版*/
  .confirmButton{
    display: flex;
    justify-content: space-around;
  }
  .confirmButton .el-button:nth-of-type(1){
    margin-left: 20%;
    box-sizing: border-box;
    background-color: transparent;
    color:rgb(160,253,255);
    border: 1px solid rgb(160,253,255);
  }
  .confirmButton .el-button:nth-of-type(2){
    margin-right: 20%;
    box-sizing: border-box;
    background-color: transparent;
    color:rgb(160,253,255);
    border: 1px solid rgb(160,253,255);
  }
  p>span{
    color:rgb(160,253,255);
  }
  /*  用户上传的style*/
  /*el-icon-plus avatar-uploader-icon*/
  .avatar-uploader .el-upload {
    border-radius: 100%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon{
    font-size: 28px;
    color:rgb(160,253,255);
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .avatar {
    width: 60px;
    height: 60px;
    display: block;
  }
  .user_image>>>.el-upload i{
    text-align: center;

  }

/*  修改弹出框的样式*/

.el-select >>>.el-select-dropdown {
  background-color: transparent;
}
  .el-select >>>.el-popper {
    background-color: transparent;
  }
</style>
