<template>
  <div class="header_box">
    <div class="header_left">
      <h2>海上风电智慧调度平台</h2>
      <div class="publicMessage">
        <span><i class="fa fa-volume-up" aria-hidden="true"></i></span>
        <div class="publicMessage_content">
          {{message}}
        </div>
      </div>
    </div>
    <div class="header_right">
      <div class="indexHight">
        <div class="indexHight_left">

         <router-link  to="/contentBox/taskNotification"> <span @click="yan">我的任务</span></router-link>
          <router-link  to="/contentBox/message"><span>消息通知</span></router-link>
        </div>
        <!-- 头部分隔线右边的内容-->
        <div class="indexHight_right">
            <div >
              <img src="@/assets/public/img/header/line_between.png" draggable="false"/>
            </div>
          <div class="list">
              <img class="header_photo" src="@/assets/public/img/pig.jpg" draggable="false"/>
              <img src="@/assets/public/img/header/pictureFrame.png" draggable="false"/>
            <el-dropdown trigger="click" placement="bottom" class="elDropdown">
              <span class="el-dropdown-link" >admin<i class="fa fa-sort-desc" aria-hidden="true"></i></span>
              <el-dropdown-menu style="background-color:rgb(2,35,75);border:1px solid rgb(102,179,181);" slot="dropdown" >
<!--                <router-link to="/contentBox/userCenter"></router-link>-->
               <el-dropdown-item style="color: rgb(102,179,181)" @click.native="showBox">个人中心</el-dropdown-item>
                <el-dropdown-item style="color: rgb(102,179,181);text-align: center">
                  <router-link to="/login">
                  退出
                  </router-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "head_box",
  data() {
    return {
      message:"2019年第21号台风“博罗依”多少级:0月2" +
        "0日造成5点钟距离日本冲绳县那霸市偏南方向约315公里，" +
        "就是北纬11.3度、东经152.0度 中心附近最大风力有9级（23米/秒）" +
        "，中心最低气压为992百帕，七级风圈半径120-230公里"
    };
  },
  created(){
  },
  mounted(){
    console.log(document.getElementsByClassName("el-select-dropdown__wrap")[0]);
    this.show()
  },
  methods: {
    showBox(){
       this.$store.commit("showUserCenter")
    },
    //跑马灯效果
    show:function(){
      setInterval(()=>{
        var start=this.message.substring(0,1);
        var end =this.message.substring(1);
        this.message=end+start;
      },500)
    },
    yan(){
      this.$store.state.changeSide="change";
    }
  }
};
</script>

<style  scoped>
/*引入全局css样式*/
@import "../../assets/public/css/getMessage.css";
/*header的样式部分的设计*/
.header_box {
  height: 8.3%;
  width: 100%;
  display: flex;
  z-index: 999;
  justify-content: space-between;
  font-size: 1em;
  position: absolute;
}
.header_left{
  height: 80.3%;
  width: 70.2%;
  position: relative;
  background-image: url("../../assets/public/img/header/header_left1.png");
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.indexHight_left a{
  color: rgb(102,179,181);
  text-decoration: none;
}
.header_left h2{
  color: rgb(102,179,181);
  padding-left:5%;
  width: 30%;
}
.header_right{
  height:100%;
  width: 29.8%;
  position: relative;
  background-image: url('../../assets/public/img/header/header_right.png');
  background-size:100% 100% ;
}
.header_left>img{
  width: 100%;
  height: 100%;
  position: absolute;

}
.header_right>img{
  width: 100%;
  height: 100%;
  position: absolute;

}
.indexHight{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 2;
}
.indexHight_left{
  width: 45%;
  height: 100%;
  display: flex;
  padding-left:10% ;
  box-sizing: border-box;
  justify-content:space-around ;
  align-items: center;
  box-sizing: border-box;
}
.indexHight_right{
  width: 55%;
  height: 100%;
}
.indexHight_left>span{
  /*padding-left:4%;*/
  /*padding-right:4%;*/
  box-sizing: border-box;
  color: rgb(102,179,181);
  cursor: pointer;
}
.indexHight_left>span:hover{
  color: white;
}

.indexHight_right{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.indexHight_right>div>img{
  vertical-align: middle;
}
/*用户登录的下拉框*/
.indexHight_right>div .el-dropdown-link{
  vertical-align: middle;
  padding-left: 5%;
  box-sizing: border-box;
  font-size: 18px;
  position: relative;
  color: rgb(102,179,181);
  cursor: pointer;
}
.indexHight_right>div .el-dropdown-link:hover{
  color: white;
}
.indexHight_right>div .el-dropdown-link>i{
  vertical-align:baseline;
  left: 110%;
  top: -2%;
  position: absolute;
  box-sizing: border-box;
}
.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
  background-color:rgb(102,179,181);
  color: rgb(17,28,33)!important;
}
.indexHight_right>>>.popper .popper__arrow::after{
  color: rgb(102,179,181);
  background-color: rgb(102,179,181);
}


.list{
  position: relative;
}
.header_photo{
  height: 28px;
  width: 28px;
  border-radius: 100%;
  position:absolute ;
  left: 5.5%;
  top: 12%;
}
.el-dropdown-menu__item a{
  width: 100%;
  height: 100%;
  display: inline-block;
  color: rgb(102,179,181);
  text-decoration: none;
}
.el-dropdown-menu__item:hover a{
  color: black;
}
.indexHight_left a:nth-of-type(1):hover{
  color: white;
}
.indexHight_left a:nth-of-type(2):hover{
  color: white;
}
.publicMessage{
  height: 100%;
  width:55%;
  display: flex;
}
.publicMessage>span{
  display: inline-block;
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.publicMessage>span>i{
  font-size: 26px;
  color: rgb(102,179,181);
}
.publicMessage_content{
  width:95%;
  height: 100%;
  overflow: hidden;
  font-size: 18px;
  color: rgb(102,179,181);
  display: flex;
  align-items: center;
  white-space: nowrap; /* //强制不换行*/
}

</style>

