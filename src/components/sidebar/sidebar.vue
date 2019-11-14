<template>
    <div class="sidebar">
      <div class="sidebar_box">
        <div class="sidebar_box_content" ref="sidebar_box_content">
          <div v-for="(value,item) in sidebarData"  >
            <img class="sidebar_img" src="@/assets/public/img/sidebar/sidebar_hover.png" draggable="false">
           <router-link :to=value.routerPath><span @click="showBox(item)" @mouseenter="showBox1(item)" @mouseleave="showBox2(item)">{{value.name}}</span></router-link>
            <i  v-show="value.children" class="fa fa-sort-desc right_icon" aria-hidden="true"></i>
            <p class="bounceBox" v-show=value.children>
<!--              <img v-if="value.img" :src=value.img draggable="false">-->
              <span>
                <i v-for="(value,item) in value.children">  <router-link :to=value.path>{{value.name}} </router-link></i>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    export default {
        name: "sidebar",
        data(){
            return{
              sidebarData:[
                {
                  name:"海图监管",
                  routerPath:"/contentBox/chartManagement",
                  img:false,
                  children:false
                },
                {
                  name:"用户管理",
                  routerPath:"/contentBox/userManagement",
                  img:require("@/assets/public/img/select5.png"),
                  children:[
                    {name:"作业人员",path:"/contentBox/userManagement/busywork_group"},
                    {name:"岗位管理",path:"/contentBox/userManagement/personTask"},
                    {name:"部门管理",path:"/contentBox/userManagement/personGroup"},
                    {name:"权限管理",path:"/contentBox/userManagement/personRoot"},
                    {name:"用户日志",path:"/contentBox/userManagement/personRecord"},
                    {name:"打卡记录",path:"/contentBox/userManagement/personCensor"}
                    ]
                },
                {
                  name:"监控管理",
                  routerPath:"/contentBox/monitoringManagement/cameraManagement",
                  img:require("@/assets/public/img/sidebar/select2.png"),
                  children:[
                    {name:"摄像头管理",path:"/contentBox/monitoringManagement/cameraManagement"},
                    {name:"监控视频",path:"/contentBox/monitoringManagement/monitoringManagement"},
                  ]
                },
                {
                  name:"气象报告",
                  img:false,
                  children:false,
                  routerPath:"/contentBox/weatherReport"
                },
                {
                  name:"工单管理",
                  routerPath:"/contentBox/task_manager",
                  img:false,
                  children:false
                },
                {
                  name:"船舶管理",
                  routerPath:'/contentBox/shipManagement',
                  img:require("@/assets/public/img/sidebar/select2.png"),
                  children:[
                    {name:"船舶列表",path:"/contentBox/shipManagement/boat_list"},
                    {name:"出海条件",path:"/contentBox/shipManagement/sea_conditions"}
                    ]
                },
                {
                  name:"消息管理",
                  routerPath:'/contentBox/messageManage',
                  img:require("@/assets/public/img/sidebar/select2.png"),
                  children:[
                    {name:"消息列表",path:"/contentBox/messageManage/messageList"},
                    {name:"发送消息",path:"/contentBox/messageManage/sendMessage"}
                  ]
                },
                {
                  name:"设备管理",
                  routerPath:"/contentBox/deviceManagement",
                  img:require("@/assets/public/img/sidebar/select2.png"),
                  children:[
                    {name:"设备列表",path:"/contentBox/deviceManagement/deviceList"},
                    {name:"打卡记录",path:"/contentBox/deviceManagement/censorNote"}
                  ]
                }
              ],
              flag:true
            }
        },
        updated(){
            this.showBox(index)
        },
        methods:{
          // 点击的时候进行显示
          showBox(index){
            for(let i=0;i<this.$refs.sidebar_box_content.getElementsByTagName("div").length;i++){
            this.$refs.sidebar_box_content.getElementsByTagName("div")[i].getElementsByTagName("img")[0].style.opacity=0;
            this.$refs.sidebar_box_content.getElementsByTagName("div")[i].getElementsByTagName("p")[0].style.display="none";
            this.$refs.sidebar_box_content.getElementsByTagName("div")[i].getElementsByTagName("i")[0].style.opacity=0;
            };
            this.$refs.sidebar_box_content.getElementsByTagName("div")[index].getElementsByTagName("img")[0].style.opacity=1;
            this.$refs.sidebar_box_content.getElementsByTagName("div")[index].getElementsByTagName("p")[0].style.display="block";
            this.$refs.sidebar_box_content.getElementsByTagName("div")[index].getElementsByTagName("i")[0].style.opacity=1;
          },
          //鼠标移动到上面的时候进行显示
          showBox1(index){
            // for(let i=0;i<this.$refs.sidebar_box_content.getElementsByTagName("div").length;i++){
            //   // this.$refs.sidebar_box_content.getElementsByTagName("div")[i].getElementsByTagName("img")[0].style.opacity=0;
            //   this.$refs.sidebar_box_content.getElementsByTagName("div")[i].getElementsByTagName("p")[0].style.opacity=0;
            //   this.$refs.sidebar_box_content.getElementsByTagName("div")[i].getElementsByTagName("i")[0].style.opacity=0;
            //
            // };
            // // this.$refs.sidebar_box_content.getElementsByTagName("div")[index].getElementsByTagName("img")[0].style.opacity=1;
            // this.$refs.sidebar_box_content.getElementsByTagName("div")[index].getElementsByTagName("p")[0].style.opacity=1;
            // this.$refs.sidebar_box_content.getElementsByTagName("div")[index].getElementsByTagName("i")[0].style.opacity=1;
          },
          //鼠标离开上面的时候进行显示
          showBox2(index){
            // for(let i=0;i<this.$refs.sidebar_box_content.getElementsByTagName("div").length;i++){
            //   // this.$refs.sidebar_box_content.getElementsByTagName("div")[i].getElementsByTagName("img")[0].style.opacity=0;
            //   this.$refs.sidebar_box_content.getElementsByTagName("div")[i].getElementsByTagName("p")[0].style.opacity=0;
            //   this.$refs.sidebar_box_content.getElementsByTagName("div")[i].getElementsByTagName("i")[0].style.opacity=0;
            // };
          },
        }
    }
</script>
<style scoped>

  .sidebar{
    height: 91.8%;
    width:8.2%;
    top: 8.2%;
    position: absolute;
    z-index: 999;
  }
  .sidebar_box{
    width:100%;
    height: 70%;
    margin-top: 20px;
    position: relative;
    background-image: url("../../assets/public/img/sidebar/sidebar_box.png");
    background-size: 100% 100%;
  }
  .sidebar_box_content{
    width: 100%;
    height: 100%;
    /*position: absolute;*/
    /*z-index: 3;*/
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    box-sizing: border-box;
  }
  .sidebar_box_content>div{
    width: 95%;
    height: 8%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(108,172,189);
    position: relative;
    cursor: pointer;
    /*background-image: url("../../assets/public/img/sidebar/sidebar_hover.png");*/
    /*background-size: 100% 100%;*/
  }
  .sidebar_box_content>div>a{
    width: 200%;
    height: 100%;
    color: rgb(108,172,189);

  }
  .sidebar_box_content>div:first-child{
    margin-top:10%;
  }
  .sidebar_box_content>div:last-child{
    margin-bottom:10%;
  }
  .sidebar_box_content>img{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    top:-20%;
  }
  .sidebar_box_content>div>p{
     height: 280%;;
     width: 100%;
      /*border:1px solid red*/
  }
  .sidebar_img{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    top: 0;
    opacity: 0;
    transition: opacity 0.3s linear;
  }

  .right_icon{
    font-size: 1.5em;
    position: absolute;
    top: 25%;
    left: 93%;
    transform:rotate(-90deg);
    opacity: 0;
    /*transition: opacity 0.3s linear;*/
  }
  .bounceBox>span a{
    display: inline-block;
    width: 100%;
    height: 100%;
    color: rgb(108,172,189);
    text-decoration: none;
  }

  .bounceBox>span i{
    margin-right: 15%;
    font-style: normal;
  }
  .sidebar_box_content span{
    position:absolute;
    z-index: 666;
    display: inline-block;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bounceBox{
    display:none;
  }
  .bounceBox a{
    font-size: 10px;
  }
  /*第二个菜单*/
  .sidebar_box_content div:nth-of-type(2)>.bounceBox{
  /*opacity: 0;*/
    width: 70%;
    height: 192px;
    position: absolute;
    top: -200%;
    left:110%;
    margin-top: 5%;
    z-index: 5;
    background-image: url("../../assets/public/img/select5.png");
    background-size: 110% 100%;
    /*display: flex;*/
    align-content: space-around;
    display: none;
  }
  .sidebar_box_content div:nth-of-type(2)>.bounceBox>span{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  /*第三个到第八个菜单*/

  .sidebar_box_content div:nth-of-type(3)>.bounceBox,
  .sidebar_box_content div:nth-of-type(6)>.bounceBox,
  .sidebar_box_content div:nth-of-type(7)>.bounceBox,
  .sidebar_box_content div:nth-of-type(8)>.bounceBox {
    font-size: 14px;
    width: 70%;
    height: 86px;
    position: absolute;
    top: -68%;
    left:110%;
    margin-top: 5%;
    display: none;
    z-index: 5;

    background-image: url("../../assets/public/img/sidebar/select2.png");
    background-size: 100% 100%;
    /*display: flex;*/
    align-content: space-around;
  }

  .sidebar_box_content div:nth-of-type(3)>.bounceBox>span,
  .sidebar_box_content div:nth-of-type(6)>.bounceBox>span,
  .sidebar_box_content div:nth-of-type(7)>.bounceBox>span,
  .sidebar_box_content div:nth-of-type(8)>.bounceBox>span{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
.bounceBox a:hover{
  color: white;
}











  /*@media (min-width: 1366px){*/
  /*  .bounceBox>span a{*/
  /*    display: inline-block;*/
  /*    width: 100%;*/
  /*    height: 100%;*/
  /*    color: rgb(108,172,189);*/
  /*    text-decoration: none;*/
  /*    font-size: 14px;*/
  /*  }*/
  /*  .bounceBox>img{*/
  /*    width: 280%;*/
  /*    height: 100%;*/
  /*    position: absolute;*/
  /*    top: 0;*/
  /*    left: 0;*/
  /*  }*/
  /*  .bounceBox>span{*/
  /*    display: inline-block;*/
  /*    width: 280%;*/
  /*    height: 100%;*/
  /*    display: flex;*/
  /*    flex-direction: column;*/
  /*    justify-content: space-around;*/
  /*  }*/
  /*}*/
  /*@media (min-width: 1920px){*/
  /*  .bounceBox>span a{*/
  /*    display: inline-block;*/
  /*    width: 100%;*/
  /*    height: 100%;*/
  /*    color: rgb(108,172,189);*/
  /*    text-decoration: none;*/
  /*    font-size: 16px;*/
  /*  }*/
  /*  .bounceBox>img{*/
  /*    width: 200%;*/
  /*    height: 100%;*/
  /*    position: absolute;*/
  /*    top: 0;*/
  /*    left: 0;*/
  /*  }*/
  /*  .bounceBox>span{*/
  /*    display: inline-block;*/
  /*    width: 200%;*/
  /*    height: 100%;*/
  /*    display: flex;*/
  /*    flex-direction: column;*/
  /*    justify-content: space-around;*/
  /*  }*/
  /*}*/

</style>
