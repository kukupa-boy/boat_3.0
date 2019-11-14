<template>
        <div class="userCenter">
          <div class="userCenter_inner">
          <!--用户信息界面，点击可以跳转到修改信息页面-->
          <user-message v-if="userMessage" @userMessage1="userMessage1"></user-message>
          <change-password v-if="changePassword" @backToM1="backToM1"></change-password>

          <!--修改个人信息的界面，点击可以进入修改密码和手机号码的组件 @changeMessage1="changeMessage1"-->
          <change-message v-if="changeMessage"  @backM="backM"  @changePassword1="changePassword1" @changePhone1="changePhone1"></change-message>
          <change-phone v-if="changePhone" @backToM1="backToM1" ></change-phone>
          </div>
        </div>
</template>

<script>
    import changePassword from "@/components/main/userCenter/changePassword.vue"
    import userMessage from "@/components/main/userCenter/userMessage.vue"
    import changeMessage from "@/components/main/userCenter/changeUserMessage.vue"
    import changePhone from "@/components/main/userCenter/changePhone.vue"
    export default {
        name: "userCenter",
        data(){
          return{
              userMessage:true,
              changePassword:false,
              changeMessage:false,
              changePhone:false,
            }
        },
        components:{
          userMessage,
          changePassword,
          changeMessage,
          changePhone
        },
        methods:{
          //message跳转到changeMessage
        userMessage1(){
          this.userMessage=false;
          this.changePassword=false;
          this.changeMessage=true;
          this.changePhone=false;
        },
        //changeMessage中跳转修改手机号，修改密码，和取消弹出框和返回message页面
        changePassword1(){
          this.userMessage=false;
          this.changePassword=true;
          this.changeMessage=false;
          this.changePhone=false;
        },
        changePhone1(){
          this.userMessage=false;
          this.changePassword=false;
          this.changeMessage=false;
          this.changePhone=true;
        },
        backM(){
          this.userMessage=true;
          this.changePassword=false;
          this.changeMessage=false;
          this.changePhone=false;
        },
        backToM1(){
          this.userMessage=false;
          this.changePassword=false;
          this.changeMessage=true;
          this.changePhone=false;
        }
      }
    }
</script>

<style scoped>
  /*弹出框的样式*/
  .userCenter{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2000;
    background-color:rgba(2,35,75,0.8);
  }
  .userCenter_inner{
    width: 100%;
    height: 100%;
    position:relative;
    left: 0;
    top: 0;
  }
</style>
