<template>
  <div  class="monitoringManagement">
    <div class="left">
      <div id="divPlugin" class="plugin"></div>
    </div>
    <div class="right">
      <span class="cloudControl">云控制</span>
      <!--这是监控控制按钮-->
      <div>
        <div class="direction">
          <ul>
            <li><span class="icon-arrow-up-left" @mousedown="mouseDownPTZControl(5);" @mouseup="mouseUpPTZControl(0);"></span></li>
            <li><span class="icon-arrow-up"></span></li>
            <li><span class="icon-arrow-up-right"></span></li>
            <li><span class="icon-arrow-left"></span></li>
            <li><span class="icon-xuanzhuan"></span></li>
            <li><span class="icon-arrow-right"></span></li>
            <li><span class="icon-arrow-down-left"></span></li>
            <li><span class="icon-arrow-down"></span></li>
            <li><span class="icon-arrow-down-right"></span></li>
          </ul>
        </div>
        <div class="zoom">
          <ul>
            <li>
              <span class="icon-xiangshangbeifen"></span>
              <p><span class="icon-3"></span></p>
              <span class="icon-xiangxiabeifen"></span>
            </li>
            <li>
              <span class="icon-xiangshangbeifen"></span>
              <p><span class="icon-41"></span></p>
              <span class="icon-xiangxiabeifen"></span>
            </li>
            <li>
              <span class="icon-xiangshangbeifen"></span>
              <p><span class="icon-uniE94F"></span></p>
              <span class="icon-xiangxiabeifen"></span>
            </li>
          </ul>
        </div>
      </div>
      <!--下边按钮-->
      <div class="right-botton">
        <div>录制</div>
        <div @click="history">历史记录</div>
      </div>
    </div>
  </div>
</template>

<script>
  // import Paging from "../../../common/common_t/Paging.vue"
  // import monitoringManagementFrame from "./monitoringManagementFrame.vue"
    import {WebVideoCtrl} from '../../../../../static/webVideoCtrl.js'
    // import {demo} from '../../../../../static/demo.js'
    export default {
      name: "monitoringManagement",
      components: {
        // Paging,
        // monitoringManagementFrame
      },
      data(){
        return{
          // flag:true,
          // search:'',//用于全局搜索
          // childNum:'',//给子路由的编号
          // tableList:[],//操作摄像头数据

          // 这是监控相关
          hkvInfo: {
            ip: '192.168.1.64',//海康威视摄像头/硬盘录像机的ip地址
            port: '80',//海康威视摄像头/硬盘录像机的端口
            username: 'admin',//海康威视摄像头/硬盘录像机的用户名
            password: 'hnp67893344'//海康威视摄像头/硬盘录像机的密码
          },
          g_iWndIndex: 0,//当前选中的窗口
          g_bPTZAuto: false,
          iWidth: 500,
          iHeight: 300,
          iProtocol: 1,
          iStreamType: 1,
          bZeroChannel: false,
          iRtspPort: 0,
        }
      },
      created(){
        // this.tableList = this.tableData;
      },
      mounted(){
        this.videoInitPlugin();
        this.onLogin();
        this.clickStartRealPlay();
        this.changeWndNum(1);
        $('object')[0].width='100%';
        $('object')[0].height='100%';
      },
      destroyed() {
        // debugger
        WebVideoCtrl.I_Stop({iWndIndex: 0});
        var iRet = WebVideoCtrl.I_Logout(this.hkvInfo.ip);

        if (iRet !== 0) {
          console.log("WebVideoCtrl I_Logout failed");
        } else {
          console.log("WebVideoCtrl I_Logout success");
        }
      },
      computed:{

      },
      methods: {
        onLogin() {
          if (!this.hkvInfo.ip) {
            console.log('no ip ')
          }
          var that = this;
          // 登录设备
          WebVideoCtrl.I_Login(that.hkvInfo.ip, that.iProtocol, that.hkvInfo.port, that.hkvInfo.username, that.hkvInfo.password, {
            async: false,
            success: function (xmlDoc) {
              console.log('xmlDoc2', xmlDoc);//不能删除
              //TODO 获取通道信息
              getChannelInfo();
              that.getDevicePort(that.hkvInfo.ip + "_" + that.hkvInfo.port);
            },
            error: function () {
              console.log("login error");
            }
          });
        },
        clickStartRealPlay() {
          // 开始预览
          var that = this;
          var szDeviceIdentify = that.hkvInfo.ip + "_" + that.hkvInfo.port;
          setTimeout(that.startRealPlay(szDeviceIdentify, 0, 1), 500); // 这里需要修改成你自己的摄像头 or 硬盘录像机的通道
        },
        history(){
          this.$router.push({name:"historicalRecord"})
        },
        videoInitPlugin() {
          var iRet = WebVideoCtrl.I_CheckPluginInstall();
          if (iRet === -1) {
            alert("您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装！");
            return;
          }
          this.initPlugin()
        },
        initPlugin() {
          var that = this;
          WebVideoCtrl.I_InitPlugin(500, 300, {
            bWndFull: true,//是否支持单窗口双击全屏，默I_CheckPluginInstall
            iWndowType: 2,
            cbSelWnd: function (xmlDoc) {
              console.log("xmlDoc1", xmlDoc);
              var giWndIndex = parseInt($(xmlDoc).find("SelectWnd").eq(0).text(), 10);
              var szInfo = "当前选择的窗口编号：" + giWndIndex;
              console.log("szInfo", szInfo);
            },
            cbInitPluginComplete: function () {
              WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
              // 检查插件是否最新
              if (WebVideoCtrl.I_CheckPluginVersion() === -1) {
                alert("检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！");
                return;
              }
            }
          });
        },
        getDevicePort (szDeviceIdentify) {
          var oPort = WebVideoCtrl.I_GetDevicePort(szDeviceIdentify);
          this.iRtspPort = oPort.iRtspPort;
        },
        startRealPlay (szDeviceIdentify, iWndIndex, iChannelID) {
          var that = this;
          console.log("startRealPlay: ", szDeviceIdentify, that.iRtspPort, iWndIndex, iChannelID);

          WebVideoCtrl.I_StartRealPlay(szDeviceIdentify, {
            iRtspPort: that.iRtspPort,
            iWndIndex: iWndIndex,
            iStreamType: 1,
            iChannelID: iChannelID,
            bZeroChannel: false,
            success: function () {
              console.log("开始预览成功 ");
            },
            error: function (status, xmlDoc2) {
              console.log(xmlDoc2)//不能删除
              if (status === 403) {
                console.log("szInfo 设备不支持Websocket取流！");
              } else {
                console.log("开始预览失败 ", status, xmlDoc2);
              }
            }
          });
        },
        mouseDownPTZControl(iPTZIndex) {
          var oWndInfo = WebVideoCtrl.I_GetWindowStatus(0);
          if (oWndInfo !== null) {
            if (iPTZIndex === 9 && this.g_bPTZAuto) {
              iPTZSpeed = 0;
            } else {
              this.g_bPTZAuto = false;
            }
            // console.log('===================1');
            // WebVideoCtrl.I_PTZControl(1,false,4);
            // console.log('===================2');
            WebVideoCtrl.I_PTZControl(iPTZIndex, false, {
              iPTZSpeed: 4,
              success: (xmlDoc) =>{
                // console.log(xmlDoc);
                // if (iPTZIndex === 9 && this.g_bPTZAuto) {
                //   console.log(oWndInfo.szDeviceIdentify + " 停止云台成功！");
                // } else {
                //   console.log(oWndInfo.szDeviceIdentify + " 开启云台成功！");
                // }
                if (iPTZIndex === 9) {
                  this.g_bPTZAuto = !this.g_bPTZAuto;
                }
              },
              error:  (status, xmlDoc)=> {
                console.log(oWndInfo.szDeviceIdentify + " 开启云台失败！", status, xmlDoc);
              }
            });
          }
        },
        mouseUpPTZControl () {
          var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex);
          if (oWndInfo !== null) {
            WebVideoCtrl.I_PTZControl(1, true, {
              success: function (xmlDoc) {
                console.log(oWndInfo.szDeviceIdentify + " 停止云台成功！", xmlDoc)
              },
              error: function (status, xmlDoc) {
                console.log(oWndInfo.szDeviceIdentify + " 停止云台失败！", status, xmlDoc);
              }
            });
          }
        },
        changeWndNum(iType) {
          iType = parseInt(iType, 10);
          WebVideoCtrl.I_ChangeWndNum(iType);
        }
      }
    }
</script>

<style scoped>
  @import "../../../../assets/public/icomoon/style.css";
  @font-face {
    font-family: 'icomoon';
    src: url('../../../../assets/public/icomoon/fonts/icomoon.eot');
    src: url('../../../../assets/public/icomoon/fonts/icomoon.eot?#iefix') format('embedded-opentype'),
    url('../../../../assets/public/icomoon/fonts/icomoon.woff') format('woff'),
    url('../../../../assets/public/icomoon/fonts/icomoon.ttf') format('truetype');
  }
  ul li{
    list-style: none;
  }
  .monitoringManagement{
    height: 100%;
    width: 100%;
    display: flex;
    position: relative;
  }
  .left{
    width: 82%;
    height: 100%;
    /*background-color: wheat;*/
    background-image: url("../../../../assets/public/img/rectangle.png");
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items:center;
  }
  /*监控*/
  .plugin{
    width: 99%;
    height: 99%;
    /* border: 1px solid red; */
  }
  .right{
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    border: 1px solid transparent;
    overflow: hidden;
  }
  .right>:nth-child(2){
    height: 75.8%;
    width: 87%;
    background-image: url(../../../../assets/public/img/monitoringPicture.png);
    background-size: 100% 100%;
    overflow: hidden;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
  }
  .cloudControl{
    color: white;
    position: absolute;
    top: 1%;
    left: 15%;
    z-index: 999;
    /*border: 1px solid red;*/
  }
  .direction ul li{
    width: 50px;
    height: 50px;
    /*border: 1px solid red;*/
    line-height: 50px;
    margin: auto;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    text-align: center;
    font-size: 24px;
    color: #59fdff;
  }

  .right-botton{
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 80%;
    height: 25%;
    /*border: 1px solid red;*/
  }
  .zoom p{
    border: 1px solid #59fdff;
  }
  .right-botton>:nth-child(1){
    position: absolute;
    top: 20px;
    margin: auto;
    height: 30px;
    line-height: 30px;
    width: 100%;
    color: #59fdff;
    border: 1px solid #59fdff;
    text-align: center;
    cursor: pointer;
  }
  .right-botton>:nth-child(2){
    position: absolute;
    top: 80px;
    margin: auto;
    height: 30px;
    line-height: 30px;
    width: 100%;
    color: #59fdff;
    border: 1px solid #59fdff;
    text-align: center;
    cursor: pointer;
  }
  @media (min-width: 1366px) {
    .right>:nth-child(2){
      height: 70%;
      width: 85%;
    }
    .direction ul{
      width: 100%;
      height: 80%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      color: white;
      margin-top: 20px;
    }
    .direction ul li, .zoom p{
      width: 30%;
      margin-bottom: 10px;
    }
    .direction ul li >span{
      display: inline-block;
      width: 50px;
      height: 50px;
      line-height: 50px;
      border: 1px solid #59fdff;
    }
    .zoom ul >:nth-child(1) p{
      font-size: 44px;
    }
    .zoom ul >:nth-child(3) p{
      font-size: 40px;
    }
    .zoom ul li >p{
      width: 50px;
      height: 50px;
      margin: auto;
      font-size: 36px;
      line-height: 50px;
      text-align: center;
      /*background-color: #2c64e4;*/
    }
    .zoom{
      height: 30%;
      width: 100%;
      margin-top: 30px;
      /*position: absolute;*/
      /*bottom: 2.5%;*/
      /*left: 4.5%;*/
      /*border: 1px solid red;*/
    }
    .zoom ul{
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }
    .zoom ul li{
      width: 33.3%;
      height: 100%;
      margin: auto;
      text-align: center;
      /* border: 1px solid red; */
      color: #59fdff;
    }
  }
  @media (min-width: 1920px) {
    .right>:nth-child(2){
      height: 70%;
      width: 87%;
    }
    .direction ul{
      width: 100%;
      height: 80%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      color: white;
      margin-top: 40px;
    }
    .direction ul li{
      width: 30%;
      height: 80px;
      line-height: 80px;
    }
    .direction ul li >span{
      display: inline-block;
      width: 80px;
      height: 80px;
      line-height: 80px;
      border: 1px solid #59fdff;
      cursor: pointer;
    }
    .zoom{
      height: 30%;
      width: 100%;
      margin-top: 40px;
    }
    .zoom ul >:nth-child(1) p{
      font-size: 64px;
    }
    .zoom ul >:nth-child(3) p{
      font-size: 60px;
    }
    .zoom ul li >p{
      width: 80px;
      height: 80px;
      margin: auto;
      font-size: 56px;
      line-height: 80px;
      text-align: center;
    }
    .zoom ul{
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }
    .zoom ul li{
      width: 30.3%;
      height: 100%;
      margin: auto;
      text-align: center;
      color: #59fdff;
    }
  }


</style>
<style>
  /*.monitoringManagementHeaderInput*/
  /*.monitoringManagementHeaderInput .el-input__inner{*/
    /*border-radius: 40px;*/
    /*background-color: rgb(247,247,247);*/
  /*}*/
</style>
