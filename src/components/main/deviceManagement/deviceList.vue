<!-- 用户管理-用户角色 -->

<template>
  <div class="deviceManageBox">

    <div class="dmb-left">
      <div class="thehead">

        <div class="th-search">
          <searchBox
            classname="fa fa-search"
            size="24"
            border="open"
            bgcolor="rgba(255,255,255,0)"
            @back="searchChangeBack"
            @clickBack="searchClickBack"></searchBox>
        </div>
        <div class="th-add" @click="openAdd=true;">
          <theBtn content="新增" bgcolor="rgb(5, 33, 69)" fontcolor="rgb(0, 255, 255)" border="rgb(0, 255, 255)"></theBtn>
        </div>

      </div>
      <div class="thebody">
        <el-table :data="tables" :header-cell-style="{padding:'0',textAlign:'center'}" :cell-style="{padding:'0',textAlign:'center'}">

          <!-- <el-table-column prop="id" label="设备ID" width="80px"></el-table-column> -->
          <el-table-column label="序号" width="80px">
            <template slot-scope="scope">
              {{(nowPage-1)*perpage+scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column prop="deviceName" label="设备名称"></el-table-column>
          <el-table-column prop="type" label="类型" width="80px"></el-table-column>

          <el-table-column prop="QRcode" label="二维码" width="100px">
            <template slot-scope="scope">
              <div class="imageCan" v-if="!!scope.row.qcUrl">
                <!-- http://192.168.0.116:8089/api/device/getQrCodeClockInUrl?deviceId= -->
                <!-- <img class="deviceImg"  :src="scope.row.qcUrl" alt="[二维码]" @dblclick="showBigImg($event)"> -->
                <img class="deviceImg"  :src="'http://192.168.0.116:8089/api/device/getQrCodeClockInUrl?deviceId='+scope.row.id" alt="[二维码]" @dblclick="showBigImg($event)">
              </div>
              <i v-else class="fa fa-qrcode" aria-hidden="true"></i>
            </template>
          </el-table-column>

          <el-table-column prop="imgUrl" label="图片" min-width="80px">
            <template slot-scope="scope">
              <div class="imageCan" v-if="!!scope.row.imgUrl">
                <img class="deviceImg"  :src="scope.row.imgUrl" alt="[设备图片]" @dblclick="showBigImg($event)">
              </div>
              <i v-else class="fa fa-picture-o" aria-hidden="true"></i>
            </template>
          </el-table-column>

          <el-table-column prop="createTme" label="上报时间" width="180px"></el-table-column>

          <!-- <el-table-column prop="describe" label="描述" :show-overflow-tooltip="true"></el-table-column>

          <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column> -->

          <el-table-column label="操作">

            <template slot-scope="scope">
              <div class="oprate">
                <el-tooltip content="详情" placement="left" effect="light" :open-delay="300" :enterable="false">
                  <el-button type="text" size="small" @click="lookMore(scope)"><i class="fa fa-list-ul"  ></i></el-button>
                </el-tooltip>

                <el-tooltip content="删除" placement="right" effect="light" :open-delay="300" :enterable="false">
                  <el-button type="text" size="small" @click="deleteIt(scope.row.id)"><i class="icon--2"></i></el-button>
                </el-tooltip>

              </div>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <div class="thefoot">
        <pagination :perpage="perpage" :pagesize="pageSize" @currentPageChange="pageChange"></pagination>
      </div>
    </div>
    
    <div class="dmb-right">
      
        <div class="r-first">
          <p><i class="fa fa-empire"></i><span>设备类型</span></p>
          <pie-chart :data="piechartData"></pie-chart>
        </div>

        <div class="r-second">
          <p><i class="fa fa-empire"></i><span>设备详情</span></p>
          <histogram :data="histogramData"></histogram>
        </div>

    </div>
 

    <infoAddBox :show="openAdd" headInfo="新增设备" @back="addBack">
      <template v-slot:content >
        <div class="slotBody">
          <div class="sb-first sb-input">
            <span>设备名称</span>
            <div>
              <el-input  placeholder="请输入内容（必填）" v-model="addData.deviceName" clearable size="small"></el-input>
            </div>
          </div>
          <div class="sb-file">
            <span>设备图片</span>
            <div>
              <submitImageBox hint="上传" @back="addImgs"></submitImageBox>
            </div>
          </div>
                
          <div class="sb-select">
            <span>设备类型</span>
            <div>
              <el-select v-model="addData.type" filterable placeholder="请选择（必选）">
                <el-option
                  v-for="(item,index) in deviceTypeList"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="sb-textarea">
            <span>设备描述</span>
            <div>
              <el-input type="textarea" placeholder="请输入内容" :rows="2" v-model="addData.description"></el-input>
            </div>
          </div>
          <div  class="sb-textarea">
            <span>备注</span>
            <div>
              <el-input type="textarea" placeholder="请输入内容" :rows="2" v-model="addData.remark"></el-input>
            </div>
          </div>
        </div>
      </template>
    </infoAddBox>



    <affirmBox :show="showAffirm" type="dark" content="你确定要删除吗？" @back="affirmBack"></affirmBox>


    <div class="bigImgWallBg" v-show="showImgWall">
      <div class="bigImgWall">
        <i class="icon-39" @click="showImgWall=false"></i>
        <img v-if="!!showImgSrc" :src="showImgSrc" alt="not find!">
      </div>
    </div>

    
    <!-- 数据详情和修改 -->
    <infoAddBox :show="modifyAndDetail.openModifyOrDetail" :hideBtn="true" :headInfo="modifyAndDetail.openModify?'编辑信息':'详细信息'">
      <template v-slot:content>
        <div class="modifyDetailBox">

          <div class="body">
            <div class="deviceimg">
              <p v-if='!!updateData.imgUrl'>
                <img :src="updateData.imgUrl" alt="not find">
              </p>
              <div v-show="modifyAndDetail.openModify">
                <submitImageBox :hint="updateData.imgUrl?'更换图片':'添加图片'" @back="updateImgs"></submitImageBox>
              </div>
            </div>
            <div>
              <span>设备序号：</span>
              <div>
                <p>{{updateData.id}}</p>
              </div>
            </div>
            <div>
              <span>设备名称：</span>
              <div>
                <p v-show="!modifyAndDetail.openModify">{{updateData.deviceName}}</p>
                <el-input v-show="modifyAndDetail.openModify" placeholder="请输入设备名" v-model="updateData.deviceName" clearable size="small"></el-input>
              </div>
            </div>
            <div>
              <span>设备二维码：</span>
              <div>
                <p>
                  <i class="fa fa-qrcode"></i>
                </p>
              </div>
            </div>
            <div>
              <span>设备类型：</span>
              <div>
                <p>{{updateData.type}}</p>
              </div>
            </div>
            <div>
              <span>创建时间：</span>
              <div>
                <p>{{updateData.createTme}}</p>
              </div>
            </div>
            <!-- <div class="sb-file">
              <span>设备图片：</span>
              <div>
                <submitImageBox hint="上传" @back="editImgs"></submitImageBox>
              </div>
            </div> -->
            <div class="sb-textarea">
              <span>设备描述：</span>
              <div>
                <p v-show="!modifyAndDetail.openModify">{{updateData.description}}</p>
                <el-input v-show="modifyAndDetail.openModify" type="textarea" placeholder="请输入描述内容" :rows="2" v-model="updateData.description"></el-input>
              </div>
            </div>
            <div class="sb-textarea">
              <span>备注：</span>
              <div>
                <p v-show="!modifyAndDetail.openModify">{{updateData.remark}}</p>
                <el-input v-show="modifyAndDetail.openModify" type="textarea" placeholder="请输入备注内容" :rows="2"  v-model="updateData.remark"></el-input>
              </div>
            </div>


          </div>

          <div class="foot">
            <!-- 详情页 -->
            <!-- 
          // 还原addData
          // this.updateData.description="";
          // this.updateData.remark="";
          // this.updateData.deviceName="";
          // this.updateData.imgUrl="";
           -->
            <div @click="modifyAndDetail.openModify=true" v-show="!modifyAndDetail.openModify">
              <theBtn content="修改设备" bgcolor="rgb(5, 33, 69)" fontcolor="rgb(0, 255, 255)" border="rgb(0, 255, 255)" size="20"></theBtn>
            </div>
            <div @click="modifyAndDetail.openModifyOrDetail=false" v-show="!modifyAndDetail.openModify">
              <theBtn content="退出窗口" bgcolor="rgb(5, 33, 69)" fontcolor="rgba(255, 255, 255,0.7)" border="rgba(255, 255, 255,0.7)" size="20"></theBtn>
            </div>
            <!-- 修改页 -->
            <div @click="submitUpdate('sure')" v-show="modifyAndDetail.openModify">
              <theBtn content="提交" bgcolor="rgb(5, 33, 69)" fontcolor="rgb(0, 255, 255)" border="rgb(0, 255, 255)" size="20"></theBtn>
            </div>
            <div @click="submitUpdate('cancel')" v-show="modifyAndDetail.openModify">
              <theBtn content="取消" bgcolor="rgb(5, 33, 69)" fontcolor="rgba(255, 255, 255,0.7)" border="rgba(255, 255, 255,0.7)" size="20"></theBtn>
            </div>
          </div>

        </div>
      </template>
    </infoAddBox>
  </div>
</template>


<script>
import theBtn from "@/components/main/common/basic_l/theBtn";
import theTable from "@/components/main/common/basic_l/theTable";
import searchBox from "@/components/main/common/basic_l/searchBox";
import pagination from "@/components/main/common/basic_l/pagination";
import infoAddBox from "@/components/main/common/basic_l/infoAddBox";
import submitImageBox from "@/components/main/common/basic_l/submitImageBox";
import affirmBox from "@/components/main/common/basic_l/affirmBox";

import histogram from "@/components/main/common/basic_l/histogram";
import pieChart from "@/components/main/common/basic_l/pieChart";

export default {
  name: "deviceManage",
  data() {
    return {
      tableData: [],//表格数据
      perpage:8,//每页数据条数
      nowPage:1,// 当前页,默认为1
      pageSize:undefined,
      // 初始隐藏添加框
      openAdd: false,
      newData: {},
      partment:"",
      deviceTypeList:[
        {id:"1",name:"监控器"},
        {id:"2",name:"风电机"},
        {id:"3",name:"变压器"},
      ],

      // 添加设备上传的图片容器
      addDataFile:null,
      //添加设备时输入的新数据
      addData:{
        description:"",
        remark:"",
        deviceName:"",
        imgUrl:"",
        type:"",
      },
      // 修改设备上传的图片容器
      updateDataFile:null,
      updateData:{
        // description:"",
        // remark:"",
        // deviceName:"",
        // imgUrl:"",
        // type:"",
      },
      // 详情和修改框是否开始
      modifyAndDetail:{
        openModifyOrDetail: false,// 详情页面
        openModify: false,
      },
      // 初始不显示询问框
      showAffirm:false,
      deleteIndex:undefined,
      updateIndex:undefined,
      // 搜索内容
      search:"",
      // 展示的大图的src
      showImgSrc:"",
      showImgWall:false,
      // 传入柱状图子组件的配置数据
      histogramData:{
        nameList:["船舶","摄像头","风电机"],
        valueList:[22,16,49],
        // colorList:['red','blue','green'],
        unit:'个',
      },
      // 传入饼状图子组件的配置数据
      piechartData:{
        nameList:["船舶","摄像头","风电机"],
        valueList:[22,16,49],
        // colorList:['red','blue','green']
      }
    };
  },
  computed:{
    tables:function(){
      var search=this.search;
      if(search){
        return  this.tableData.filter(function(dataNews){
          return Object.keys(dataNews).some(function(key){
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1;
          })
        })
      }
      return this.tableData;
    }
  },
  methods: {
    appendData(){
      this.newData.id=this.tableData.length+1;
      this.tableData.push(this.newData);
      this.openAdd=false;
    },
    lookMore(item) {
      this.updateData={ ...item.row};
      this.updateIndex=item.$index;
      this.modifyAndDetail.openModifyOrDetail=true;
    },
    // 换页回调函数
    pageChange(val){
      this.nowPage=val;
      this.getData("api/device/getDeviceList").then((res)=>{
        this.nowPage=val;
        this.tableData=res.data.data.list;
        this.pageSize=res.data.data.total;
      })
    },
    // 删除设备的click函数
    deleteIt(dataid){
      this.showAffirm=true;
      this.deleteIndex=dataid;
    },
    // 点击询问框的“确定”或“取消”后的返回函数，res返回“sure”或“cancel”
    affirmBack(res){
      this.showAffirm=false;
      if(res==="sure"){
        if(this.deleteIndex!==undefined){
          this.postData("delete",{id:this.deleteIndex}).then((res)=>{
            console.log(res);
            this.hint(res.data.message||"删除成功！");
            this.getData("api/device/getDeviceList").then((res)=>{
              this.tableData=res.data.data.list;
              this.pageSize=res.data.data.total;
            })
          })
        }
      }else{
        this.deleteIndex=undefined;
      }
    },
    addBack(res){
      if(res==="cancel"){
        this.openAdd=false;
      }else if(res==="sure"){
        if(!this.addData.deviceName||!this.addData.type){
          this.hint('信息不完善，无法提交！');
        }else{
          // 判断是否上传图片，如果是，则先上传图片，得到返回路径，再上传其他数据
          if(this.addDataFile){
            
            let filedata=new FormData();
            filedata.append("multipartFile",this.addDataFile);
            this.postData('file',filedata).then((res)=>{
              this.addData.imgUrl=res.data.data;
              this.addDataFile=null;
              // 确认提交其他数据
              this.postData("add",this.addData).then((res)=>{
                // 还原addData
                this.addData.description="";
                this.addData.remark="";
                this.addData.deviceName="";
                this.addData.imgUrl="";
                this.openAdd=false;// 关闭“添加盒子”
                this.hint("添加成功！");
                this.getData("api/device/getDeviceList").then((res)=>{
                  this.tableData=res.data.data.list;
                  this.pageSize=res.data.data.total;
                })
              });
            })
          }else{
            // 确认提交其他数据
            this.postData("add",this.addData).then((res)=>{
              // 还原addData
              this.addData.description="";
              this.addData.remark="";
              this.addData.deviceName="";
              this.addData.imgUrl="";
              this.openAdd=false;// 关闭“添加盒子”
              this.getData("api/device/getDeviceList").then((res)=>{
              this.tableData=res.data.data.list;
              this.pageSize=res.data.data.total;
            })
          });
          }

        }
      }
    },
    // 点击详情页的修改的“确定”和“取消”按钮时触发
    submitUpdate(res){
      if(res==="sure"){
        // for(let i=0;i<)
        // if(this.tableData[this.updateIndex])
        let isempty=false;
        if(!this.updateData.deviceName){
          this.hint("输入信息不能为空");
        }else{
           // 判断是否上传图片，如果是，则先上传图片，得到返回路径，再上传其他数据
          if(this.updateDataFile){
            
            let filedata=new FormData();
            filedata.append("multipartFile",this.updateDataFile);
            this.postData('file',filedata).then((res)=>{
              this.updateData.imgUrl=res.data.data;
              this.updateDataFile=null;
              // 确认提交其他数据
              this.postData("update",this.updateData).then((res)=>{
                this.modifyAndDetail.openModify=false;// 切换“修改”为“详情”
                this.updateDataFile=null;
                this.hint("修改成功！");
                this.getData("api/device/getDeviceList").then((res)=>{
                  this.tableData=res.data.data.list;
                  this.pageSize=res.data.data.total;
                })
              });
            })
          }
          this.postData("update",this.updateData).then((res)=>{
            this.modifyAndDetail.openModify=false;
            this.tableData[this.updateIndex]={...this.updateData};
            this.hint("修改成功！");
          });
        }
      }else{
          this.updateData={...this.tableData[this.updateIndex]};
          this.modifyAndDetail.openModify=false;
      }
    },
    // 双击图片查看大图
    showBigImg(e){
      let ele=$(e.target);
      let src=ele.attr("src");
      this.showImgSrc=src;
      this.showImgWall=true;
      
    },
    // 上传图片发生改变的回调函数
    addImgs(imgs){
      this.addDataFile=imgs[0];
    },
    // 修改图片发生改变的回调函数
    updateImgs(imgs){
      this.updateDataFile=imgs[0];
    },
    editImgs(imgs){
      this.updateData.imgUrl=[];
      // for(let i=0;i<imgs.length;i++){
        this.updateData.imgUrl=URL.createObjectURL(imgs[0]);
      // }
    },
    // 搜索框点击返回
    searchChangeBack(res){
      if(res===""){
        this.search=res;
      }
    },
    searchClickBack(res){
      console.log(res)
      this.search=res;
    },
    nowTime(type) {
      // 参数 type为需要的时间类型,默认为time
      // time : 12:10:22
      // date : 2019-10-10
      // datetime : 2019-10-10 12:10:22
      // timestamp: 1571294661250
      return (()=> {
        let myDate = new Date();
        let year = myDate.getFullYear();
        let month = myDate.getMonth() + 1;
        let date = myDate.getDate();
        let h = myDate.getHours(); //获取当前小时数(0-23)
        let m = myDate.getMinutes(); //获取当前分钟数(0-59)
        let s = myDate.getSeconds();
        //获取当前时间
        if(type=="date"){
          return `${conver(year)}-${conver(month)}-${conver(date)}`;
        }else if(type=="datetime"){
          return `${conver(year)}-${conver(month)}-${conver(date)} ${conver(h)}:${conver(m)}:${conver(s)}`;
        }else if(type=="time"){
          return `${conver(h)}:${conver(m)}:${conver(s)}`;
        }else if(type=="timestamp"){
          return myDate.getTime();
        }
        return `${conver(h)}:${conver(m)}:${conver(s)}`;
      })();
      //日期时间处理
      function conver(s) {
        return s < 10 ? "0" + s : s;
      }
    },
    // 提示信息,text:展示文字（必须），fc：字体颜色（默认亮青），bgc：背景颜色（默认蓝黑）,interval：显示时间
    hint(text,fc,bgc,interval){
      let _fc=fc || "rgb(0, 255, 255)";
      let _bgc=bgc || "rgb(5, 33, 69)";
      let hint=document.createElement('div');
      let _interval=interval || 3000;
      hint.className="_hintBox";
      hint.innerText=text;
      $('body').append(hint);
      $(hint).css({"color":_fc,'backgroundColor':_bgc,'boxShadow':'0.5px 0.5px 4px '+_fc});
      setTimeout(()=>{
        $(hint).addClass("_hintBox_show");
      },300);
      setTimeout(()=>{
        $(hint).removeClass("_hintBox_show");
        setTimeout(()=>{
          $(hint).remove();
        },300);
      },_interval);
    },
    // 获取当前登录用户的id
    getUserId(){
      return 1;
    },
    getData(url){
      let _opt={
          pageSize:this.perpage,//每页数据条数,默认为8
          pageIndex:this.nowPage,// 当前页,默认为1
      };
      this.search?_opt.nameKeys=this.search:'';
      /*url:请求地址，必须
        opt={
          nameKeys：设备名，可选
          pageIndex:请求页，可选
          pageSize：每页数据，可选
        }*/
      return new Promise((resolve,reject)=>{
        this.axios.get(url,{
          params: {..._opt}
        }).then((res)=> {
          if(res.data.stateCode==="200"){
            resolve(res);
          }else{
            console.log("success but",res);
          }
        }).catch((error)=> {
          console.log("error",error);
        });
      });
    },
    postData(type,theData){
      /*type:add/update,添加/编辑
        data:{
          id：设备id，修改必须，添加不传
          ...,
        },*/
      return new Promise((resolve,reject)=>{
        let url='';
        if(type==='add'){//添加设备
          if(!theData||theData.id){
            console.log("多余值：ID");
            reject({error:"多余值：ID"});
          }else{
            url='/api/device/addDevice';
            theData.userId=this.getUserId();
            this.axios.post(url,{...theData}).then((res)=> {
              if(res.data.stateCode==="200"){
                resolve(res);
              }
            }).catch((error)=> {
              console.log(error);
              reject(error);
            });
          }
        }else if(type==="update"){//修改设备
          if(theData&&theData.id){
            theData.userId=this.getUserId();
            url='/api/device/updateDevice';
            this.axios.put(url,{...theData}).then((res)=> {
              if(res.status===200){
                resolve(res);
              }
            }).catch((error)=> {
              console.log(error);
              reject(error);
            });
          }else{
            console.log("缺少值：ID");
            reject({error:"缺少值：ID"});
          }
        }else if(type==="delete"){

          if(theData&&theData.id){
            url=`/api/device/deleteDevice?id=${theData.id}&userId=${this.getUserId()}`;
            this.axios.post(url).then((res)=> {
              if(res.data.stateCode==="200"){
                resolve(res);
              }
            }).catch((error)=> {
              console.log(error);reject(error);
            });
          }else{
            console.log("多余值：ID");reject({error:"多余值：ID"});
          }
        }else if(type==='file'){//类型不合法 /file/fileUpLoad
            url='file/fileUpLoad';
            this.axios.post(url,theData).then((res)=> {
              console.log(res.data)
              if(res.data.code==="200"){
                resolve(res);
              }
            }).catch((error)=> {
              console.log(error);
              reject(error);
            });
        }else{
          console.log("类型参数错误");
          reject({error:"类型参数错误"});
        }
      });
    }
  },
  mounted(){
    this.getData("api/device/getDeviceList").then((res)=>{
      console.log(res)
      this.tableData=res.data.data.list;
      this.pageSize=res.data.data.total;
    })
  },
  components: {
    theBtn,
    theTable,
    searchBox,
    pagination,
    infoAddBox,
    submitImageBox,
    affirmBox,
    histogram,//柱状图
    "pie-chart":pieChart,//饼状图
  }
};
</script>


<style lang='less' scoped>
@import "../../../assets/ship_system/less/deviceList.less";
</style>

<style lang='less'>
@fontColor:rgb(89,252,255);
@bgColor:rgb(5, 33, 69);
@fontColorF:rgba(0, 255, 255, 0);
.deviceManageBox{
  // 表格鼠标移入后背景颜色
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: rgb(4,64,95);
  }
  // 除去表格下的白线
  .el-table::before{
    height: 0;
  }
  // height:830px以上
  .has-gutter tr th {
    height: 72px;
    background-color: @bgColor;
    color: @fontColor;
  }
  .el-table__row td {
    height: 56px;
    background-color: @bgColor;
    color: @fontColor;
  }
  //--end
  
  .el-table td,.el-table th.is-leaf{
    // border-bottom-color: red;
    border-image: -webkit-linear-gradient(to right,@fontColorF,@fontColor,@fontColorF) 30 5 30;
    border-image: -moz-linear-gradient(to right, @fontColorF,@fontColor,@fontColorF) 30 5 30;
    border-image: linear-gradient(to right, @fontColorF,@fontColor,@fontColorF) 30 5 30;
  }
  .el-table__empty-block{
    background-color: @bgColor;
    >span{
      color: @fontColor
    }
  }
  .el-table--striped .el-table__body tr.el-table__row--striped td{
    background-color: @bgColor;
    color: @fontColor;
  }
  .el-table__row td div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .slotBody > .sb-textarea textarea {
    border-radius: 0;
    resize: none;
  }
  .el-table th, .el-table tr{
    background-color: @bgColor;
  }
  .el-table, .el-table__expanded-cell{
    background-color: @bgColor;
  }
  .thebody table{
    width: 100%!important;
    background-color: @bgColor;
  }
  .el-button{
    border: 0;
  }
}
.slotBody{
   // element 下拉菜单的样式
  .el-select{
    width: 100%;
    .el-input__icon{
      line-height: 24px;
    }
  }
}

// 滚动条样式
/* IE 浏览器 */
@hideColor:rgba(255, 255, 255, 0);
@lightColor:rgba(89, 252, 255, 0.3);
@halfColor:rgba(89, 252, 255, 0.5);
.deviceManageBox .sb-textarea textarea{
    resize: none;
    scrollbar-arrow-color: @fontColor;/*三角箭头的颜色*/
    scrollbar-face-color: @bgColor;/*滚动条滑块按钮的颜色*/
    scrollbar-highlight-color: @bgColor;/*滚动条整体颜色*/
    scrollbar-shadow-color: @bgColor;/*滚动条阴影*/
    scrollbar-track-color: @bgColor;/*滚动条轨道颜色*/
    scrollbar-3dlight-color:@bgColor;/*滚动条3d亮色阴影边框的外观颜色——左边和上边的阴影色*/
    scrollbar-darkshadow-color: @bgColor;/*滚动条3d暗色阴影边框的外观颜色——右边和下边的阴影色*/
    scrollbar-base-color: @bgColor;/*滚动条基准颜色*/
}
/* chrome & safari 浏览器 */
.deviceManageBox .sb-textarea textarea{
  resize: none;
  &::-webkit-scrollbar{/*滚动条整体部分,必须要设置*/
    width: 6px;
    height: 10px;
  }
  &::-webkit-scrollbar-track{/*滚动条的轨道*/
    background-color: @hideColor;
  }
  &::-webkit-scrollbar-thumb{/*滚动条的滑块按钮*/
    border-radius: 10;
    background-color: @lightColor;
  }
  &::-webkit-scrollbar-button{/*滚动条的上下两端的按钮*/
    height: 0;
    display: none;
  }
}
.deviceManageBox div{
    scrollbar-arrow-color: @fontColor;/*三角箭头的颜色*/
    scrollbar-face-color: @bgColor;/*滚动条滑块按钮的颜色*/
    scrollbar-highlight-color: @bgColor;/*滚动条整体颜色*/
    scrollbar-shadow-color: @bgColor;/*滚动条阴影*/
    scrollbar-track-color: @bgColor;/*滚动条轨道颜色*/
    scrollbar-3dlight-color:@bgColor;/*滚动条3d亮色阴影边框的外观颜色——左边和上边的阴影色*/
    scrollbar-darkshadow-color: @bgColor;/*滚动条3d暗色阴影边框的外观颜色——右边和下边的阴影色*/
    scrollbar-base-color: @bgColor;/*滚动条基准颜色*/
}
/* chrome & safari 浏览器 */
.deviceManageBox div{
  &::-webkit-scrollbar{/*滚动条整体部分,必须要设置*/
    width: 6px;
    height: 10px;
  }
  &::-webkit-scrollbar-track{/*滚动条的轨道*/
    background-color: @hideColor;
  }
  &::-webkit-scrollbar-thumb{/*滚动条的滑块按钮*/
    border-radius: 10px;
    background-color: @lightColor;
  }
  &::-webkit-scrollbar-button{/*滚动条的上下两端的按钮*/
    height: 0;
    display: none;
  }
}
// end

.deviceManageBox {
  // 输入框的高度
  .sb-input input {
    border-radius: 0;
    height: 26px;
    line-height: 26px;
  }
  .el-input__inner,.el-textarea__inner{
    background-color: rgba(255, 255, 255, 0);
    border: none;
    border-bottom: 1px dashed @halfColor;
    color: @fontColor;
    &:hover{
      border-color: @halfColor;
    }
    &:focus{
      border-color: @halfColor;
    }
    &::-webkit-input-placeholder { /* WebKit browsers */
      color: rgba(89, 252, 255, 0.7);
    }
    &::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: rgba(89, 252, 255, 0.7);
    }
    &:-ms-input-placeholder { /* Internet Explorer 10+ */
      color: rgba(89, 252, 255, 0.7);
    }  
  }
  .el-textarea__inner{
    border: 1px dashed @halfColor;
    border-radius: 0;
  }
  .el-input__inner{
    height: 30px;
    line-height: 30px;
  }
  .el-select-dropdown__item{
    color: @fontColor;
  }
   /*  */
  .el-select-dropdown{
    border: 1px solid #25758c!important;
  }
  .el-select-dropdown .el-select-dropdown__item{
    color: #59fdff!important;
  }

}

// 提示框样式
._hintBox{
  visibility: hidden;
  opacity: 0;
  transition: 0.3s;
  position: absolute;
  top: 8%;
  width: 360px;
  left: 50%;
  margin-left: -180px;
  padding: 8px;
  text-align: center;
  z-index: 1001;
}
._hintBox_show{
  visibility: visible;
  opacity: 1;
  top: 10%;
}
@import url("../../../assets/public/icomoon/style.css");
@font-face {
  font-family: "icomoon2";
  src: url("../../../assets/public/icomoon/fonts/icomoon.eot");
  /* IE9*/
  src: url("../../../assets/public/icomoon/fonts/icomoon.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("../../../assets/public/icomoon/fonts/icomoon.woff")
      format("woff"),
    /* chrome, firefox */
      url("../../../assets/public/icomoon/fonts/icomoon.ttf") format("truetype"),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
      url("../../../assets/public/icomoon/fonts/icomoon.svg#icomoon"); /* iOS 4.1- */
}

.icomoon {
  font-family: "icomoon2" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media screen and (max-height:830px) {
.deviceManageBox{
  .has-gutter tr th{
    height: 60px;
  }
  .el-table__row td{
    height: 52px;
  }
  }
}
@media screen and (max-height:780px) {
.deviceManageBox{
  .has-gutter tr th{
    height: 60px;
  }
  .el-table__row td{
    height: 48px;
  }
  }
}
@media screen and (max-height:740px) {
.deviceManageBox{
  .has-gutter tr th{
    height: 56px;
  }
  .el-table__row td{
    height: 44px;
  }
  }
}
@media screen and (max-height:690px) {
.deviceManageBox{
  .has-gutter tr th{
    height: 50px;
  }
  .el-table__row td{
    height: 40px;
  }
  }
}
@media screen and (max-height:660px) {
.deviceManageBox{
  .has-gutter tr th{
    height: 40px;
  }
  .el-table__row td{
    height: 40px;
  }
  }
}
@media screen and (max-height:630px) {
.deviceManageBox{
  .thehead{
    height: 50px;
    line-height: 50px;
  }
  .has-gutter tr th{
    height: 40px;
  }
  .el-table__row td{
    height:40px;
  }
  }
}
</style>
