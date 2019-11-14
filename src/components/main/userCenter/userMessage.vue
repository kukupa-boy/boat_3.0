<template>
  <div class="userCenter">
    <div class="account_information">账号信息<span><i @click='cancleBox' class="fa fa-times" aria-hidden="true"></i></span></div>
    <div class="userCenter_inner">
      <div class="imageAndInformation">
        <div class="user_image">
          <img src="@/assets/public/img/pig.jpg">
        </div>
        <div class="user_information">
          <p><span>账号</span>   <span>{{this.userInfo.account}}</span></p>
          <p><span>手机号码</span>   <span>{{this.userInfo.number}}</span></p>
          <p><span>姓名</span>   <span>{{this.userInfo.UserName}}</span></p>
          <p><span>性别</span>   <span>{{this.userInfo.gender}}</span></p>
          <p><span>年龄</span>   <span>{{this.userInfo.age}}</span></p>
          <p><span>创建时间</span>   <span >{{this.userInfo.time}}</span></p>
        </div>
      </div>
      <div>
        <div class="confirmButton">
          <div>
            <el-button size="mini" type="mini" round @click="toChangeUserMessage">
              修改
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "userMessage",
      created(){
        this.userId=JSON.parse(localStorage.getItem("userInfo")).id
        console.log(this.userId)
      },
      mounted(){
          this.axios.get(`api/personCenter/getPersonData?userId=${this.userId}`).then(
            (data)=>{
              //将后台获取到的数据进行重新渲染
              var userInfo=data.data.data;
              this. userInfo.account=userInfo.account;
              this. userInfo.number=userInfo.phone;
              this. userInfo.UserName=userInfo.name;
              this. userInfo.gender=userInfo.sex;
              this. userInfo.age=userInfo.age;
              this. userInfo.time=userInfo.createTime;
            }
          ).catch( (err)=>{
            console.log("这个是错误")
            console.log(err)
          });
      },
      data(){
        return {
          userInfo: {
            account: "",
            number: "",
            // UserName: JSON.parse(localStorage.getItem("userName")),
            UserName: "",
            gender: "",
            age: "",
            time: ""
          },
           userId:""
        }
      },
      methods:{
        toChangeUserMessage(){
          this.$emit("userMessage1")
        },
        //取消弹出框
        cancleBox(){
          this.$store.commit('deleteUserCenter')
        }
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
  .userCenter_inner{
    height: auto;
    width: 80%;
    margin: 5% auto;
    /*border: 1px solid red;*/
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-content: space-around;
    border-radius: 10px;
  }
  .account_information{
    width: 100%;
    padding: 5px;
    font-size: 18px;
    color: rgb(160,253,255);
    display: flex;
    justify-content: space-between;
  }
  .account_information span{
    padding-right: 5%;
    box-sizing: border-box;
    font-size: 24px;
  }
  .user_image{
    margin: 0 auto;
    width: 60px;
    height: 60px;
    background-image:url("../../../assets/public/img/header/pictureFrame.png") ;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .user_image img{
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }
  .user_information{
    text-align: center;
    height: 31.8%;
    color:rgb(160,253,255) ;
  }
  .user_information p{
    /*border: 1px solid red;*/
    width:100%;
    margin: 5% auto;
  }
  .user_information p span{
    display: inline-block;
    width: 40%;
    font-size: 14px;
    /*border: 1px solid yellow;*/
  }
  .user_information p span:nth-of-type(1){
    text-align:right;
    padding-right: 5%;
    box-sizing: border-box;
  }
  .user_information p span:nth-of-type(2){
    margin-left: 5%;
    text-align:left;
  }
  .confirmButton{
    width: 100%;
    margin-top: 5%;

  }
  .confirmButton {
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: black;
    display: flex;
    justify-content: center;
  }
 .userCenter_inner .confirmButton>>>.el-button{
    color: rgb(160,253,255);
    border: 1px solid rgb(160,253,255);
    background-color: transparent;
  }
  .confirmButton .el-button:hover a{
    color: white;
  }
</style>
