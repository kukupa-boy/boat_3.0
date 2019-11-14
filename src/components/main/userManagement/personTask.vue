<!-- 用户管理-岗位管理 -->

<template>
  <div class="personTaskBox">


    <div class="ptb-left">

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
          <theBtn content="添加岗位" bgcolor="rgb(5, 33, 69)" fontcolor="rgb(0, 255, 255)" border="rgb(0, 255, 255)"></theBtn>
        </div>
      </div>

      <div class="thebody">
        <el-table
          :data="tables"
          :header-cell-style="{padding:'0',textAlign:'center'}"
          :cell-style="{padding:'0',textAlign:'center'}">
          <el-table-column label="序号" width="70px">
              <template slot-scope="scope">
              {{(nowPage-1)*perpage+scope.$index+1}}
            </template>
          </el-table-column>
          <!-- <el-table-column prop="id" label="设备id" width="70px"></el-table-column> -->
          <el-table-column prop="roleName" label="岗位名称"></el-table-column>
          <el-table-column prop="duty" label="岗位职责" width="120px"></el-table-column>
          <el-table-column prop="department" label="所属部门" width="100px"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="roleStatus" label="状态" width="80px">
            <template slot-scope="scope">
              <span v-if="scope.row.roleStatus==='1'">正常</span>
              <span v-else style="color:rgb(215,156,33);">冻结</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template slot-scope="scope">

              <el-tooltip
                :content="scope.row.roleStatus==='0'?'冻结':'已冻结'"
                placement="left"
                effect="light"
                :open-delay="300"
                :enterable="false">
                <el-button type="text" size="small" @click="banIt(scope.row.id,scope.row.roleStatus)">
                  <i :class="{'fa fa-lock':true,'locked':scope.row.roleStatus==='0'}"></i>
                </el-button>
              </el-tooltip>

              <el-tooltip
                content="详情"
                placement="top"
                effect="light"
                :open-delay="300"
                :enterable="false">
                <el-button type="text" size="small" @click="lookMore(scope)">
                  <i class="fa fa-list-ul"></i>
                </el-button>
              </el-tooltip>

              <el-tooltip
                content="删除"
                placement="right"
                effect="light"
                :open-delay="300"
                :enterable="false">
                <el-button type="text" size="small" @click="deleteIt(scope.row.id)">
                  <i class="fa fa-trash-o"></i>
                </el-button>
              </el-tooltip>

            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="thefoot">
        <pagination :perpage="perpage" :pageSize="pageSize" @currentPageChange="pageChange"></pagination>
      </div>

    </div>


    <div class="ptb-right">
      <div>
        <p><i class="fa fa-empire"></i><span>岗位信息</span></p>
        <strip-count :data="stripData" size="30" stripSize="10"></strip-count>
      </div>
      
    </div>


    <infoAddBox :show="openAdd" headInfo="添加岗位" @back="addBack">
      <template v-slot:content>
        <div class="slotBody">
          <div class="sb-first sb-input">
            <span>岗位名称</span>
            <div>
              <el-input placeholder="请输入内容" v-model="addData.roleName" clearable size="small"></el-input>
            </div>
          </div>

          <div class="sb-input">
            <span>所属部门</span>
            <div>
              <!-- <el-input placeholder="请输入内容" v-model="addData.department" clearable size="small"></el-input> -->
              <el-select v-model="addData.groupId" filterable placeholder="请选择">
                <el-option
                  v-for="item in groupList"
                  :key="item.id"
                  :label="item.groupName"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="sb-input">
            <span>岗位职责</span>
            <div>
              <el-input placeholder="请输入内容" v-model="addData.duty" clearable size="small"></el-input>
            </div>
          </div>

          <div class="sb-textarea">
            <span>岗位描述</span>
            <div>
              <el-input type="textarea" placeholder="请输入内容" 
              :rows="2" v-model="addData.description"></el-input>
            </div>
          </div>

        </div>
      </template>
    </infoAddBox>


    <affirmBox :show="affirmDelete" type="dark" content="确定要删除吗？" @back="affirmDeleteBack"></affirmBox>


    <!-- 确认弹框 -->
    <affirmBox :show="affirmBan" type="dark" :content="banContent" @back="affirmBanBack"></affirmBox>


    <!-- 数据详情和修改 -->
    <infoAddBox :show="modifyAndDetail.openModifyOrDetail" :hideBtn="true" headInfo="岗位详情">
      <template v-slot:content>
        <div class="modifyDetailBox">

          <div class="head">
            <span>详细信息</span>
          </div>

          <div class="body">

            <div>
              <span>岗位名称：</span>
              <div>
                <p v-show="!modifyAndDetail.openModify">{{updateData.roleName}}</p>
                <el-input v-show="modifyAndDetail.openModify" placeholder="请输入岗位名" v-model="updateData.roleName" clearable size="small"></el-input>
              </div>
            </div>

            <div>
              <span>职责：</span>
              <div>
                <p v-show="!modifyAndDetail.openModify">{{updateData.duty}}</p>
                <el-input v-show="modifyAndDetail.openModify" placeholder="请输入职位名" v-model="updateData.duty" clearable size="small"></el-input>
              </div>
            </div>

            <div>
              <span>所属部门：</span>
              <div>
                <p v-show="!modifyAndDetail.openModify">{{updateData.department}}</p>
                 <el-select v-show="modifyAndDetail.openModify" v-model="updateData.groupId"  filterable placeholder="请选择">
                  <el-option
                    v-for="item in groupList"
                    :key="item.id"
                    :label="item.groupName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>

            <div>
              <span>状态：</span>
              <div>
                <p>{{updateData.roleStatus?'正常':'冻结'}}</p>
              </div>
            </div>

            <div>
              <span>创建时间：</span>
              <div>
                <p>{{updateData.createTime}}</p>
              </div>
            </div>

            <div>
              <span>描述：</span>
              <div>
                <p v-show="!modifyAndDetail.openModify">{{updateData.description?updateData.description:'空'}}</p>
                <!-- <el-input type="textarea" v-model="updateData.description" v-show="modifyAndDetail.openModify" placeholder="请输入描述" :autosize="{ minRows: 1, maxRows: 3}"></el-input> -->
                <el-input type="textarea" v-model="updateData.description" v-show="modifyAndDetail.openModify" placeholder="请输入描述" :rows="2"></el-input>
              </div>
            </div>

          </div>

          <div class="foot">
            <!-- 详情页 -->
            <div @click="modifyAndDetail.openModifyOrDetail=false;updateIndex=undefined;" v-show="!modifyAndDetail.openModify">
              <theBtn content="退出" bgcolor="rgb(5, 33, 69)" fontcolor="rgba(255, 255, 255,0.7)" border="rgba(255, 255, 255,0.7)" size="20"></theBtn>
            </div>
            <div @click="modifyAndDetail.openModify=true" v-show="!modifyAndDetail.openModify">
              <theBtn content="修改" bgcolor="rgb(5, 33, 69)" fontcolor="rgb(0, 255, 255)" border="rgb(0, 255, 255)" size="20"></theBtn>
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
import affirmBox from "@/components/main/common/basic_l/affirmBox";

import stripCount from "@/components/main/common/basic_l/stripCount";

export default {
  name: "personTask",
  data() {
    return {
      tableData: [],
      // 存放编辑信息的临时容器
      updateData: {},

      // 存放添加信息的临时容器
      // 修改项的index
      updateIndex:undefined,
      addData1: {
        roleName: "",
        department:"",
        description: "",
        duty:"",
        roleStatus:true,
      },
      addData:{},
      // 搜索框的值
      search: "",
      perpage: 8, //每页数据条数
      pageSize:0,
      nowPage:1,// 当前页,默认为1
      openAdd: false,
      modifyAndDetail:{
        openModifyOrDetail: false,// 详情页面
        openModify: false,
      },
      // 上级部门列表
      partmentList:[
        { value: "维修部",label: "维修部"},
        { value: "后勤部",label: "后勤部"},
        { value: "测试部",label: "测试部"},
        { value: "安装部",label: "安装部"},
        { value: "监测部",label: "监测部"},
      ],
      // 删除项的index
      deleteIndex: undefined,
      // 禁用项的index
      banInfo:{
        index:undefined,
        status:undefined,
      },
      banContent:"",//禁用||解禁时弹框提示文字
      // 确认删除框
      affirmDelete: false,
      // 确认禁用框
      affirmBan: false,
      // 上级部门列表
      groupList:[],
      // 右侧条形数据
      stripData:[
        {
          label:'满洲里',
          value: 0,
          unit:'个',
        },
        {
          label:'孟子义',
          value: 5,
          unit:'个',
        },
        {
          label:'米子尔',
          value: 26,
          unit:'个',
        },
        {
          label:'梅子色',
          value: 36,
          unit:'个',
        },
        {
          label:'明珠思',
          value: 43,
          unit:'个',
        },
       
        {
          label:'梅子色',
          value: 36,
          unit:'个',
        },
        {
          label:'明珠思',
          value: 43,
          unit:'个',
        },
        {
          label:'明珠思',
          value: 43,
          unit:'个',
        },
        {
          label:'米子尔',
          value: 26,
          unit:'个',
        },
        {
          label:'梅子色',
          value: 36,
          unit:'个',
        },
        {
          label:'明珠思',
          value: 43,
          unit:'个',
        }
      ],
      colorCan:[
        'rgb(236, 112, 107)',
        'rgb(235, 159, 88)',
        'rgb(236, 211, 69)',
        'rgb(169, 202, 50)',
        'rgb(126, 209, 70)',
        'rgb(86, 212, 143)',
        'rgb(87, 211, 194)',
        'rgb(87, 165, 211)',
        'rgb(102, 134, 223)',
        'rgb(147, 124, 231)',
        'rgb(192, 124, 231)',
        'rgb(231, 124, 213)',
        'rgb(231, 124, 178)'
      ],
      newData: {}
    };
  },
  computed: {
    tables: function() {
      var search = this.search;
      if (search) {
        return this.tableData.filter(function(dataNews) {
          return Object.keys(dataNews).some(function(key) {
            return (
              String(dataNews[key]).toLowerCase().indexOf(search) > -1);
          });
        });
      }
      return this.tableData;
    }
  },
  methods: {
    // 换页回调函数
    pageChange(val){
      this.nowPage=val;
      this.getData().then((res)=>{
        this.nowPage=val;
        console.log(res);
        this.tableData=res.data.data.list;
        this.pageSize=res.data.data.total;
      })
    },
    appendData() {
      this.newData.id = this.tableData.length + 1;
      this.tableData.push({...this.newData });
      this.openAdd = false;
    },
    lookMore(item) {
      // $(".selectAll").attr("isChecked","0").removeClass("checkedAll");
      // $(".isBasicRoot").attr("isChecked","0").removeClass("isChecked");
      // this.updateData = [];
      // this.updateData.push({ ...item.row });
      this.updateData={ ...item.row };
      this.updateIndex=item.$index;
      this.modifyAndDetail.openModifyOrDetail=true;
    },
    rootBtn(e){
      let ele=$(e.target);
      let isChecked=ele.attr("isChecked");
      if(isChecked==="1"){
        ele.attr("isChecked","0").removeClass("isChecked");
      }else{
        ele.attr("isChecked","1").addClass("isChecked");
      }
    },
    // 点击详情页的修改的“确定”和“取消”按钮时触发
    submitUpdate(res){
      if(res==="sure"){//确定修改
        let isempty=false;
        let _updateData={};
        _updateData.roleName=this.updateData.roleName;
        _updateData.duty=this.updateData.duty;
        _updateData.groupId=this.updateData.groupId;
        _updateData.id=this.updateData.id;
        _updateData.description=this.updateData.description;
        	// "description": "",
          // "duty": "",
          // "groupId": "",
          // "id": "",
          // "remark": "",
          // "roleName": ""

          //** */ "description": "",
          //** */ "duty": "",
          //** */ "groupId": "",
          //** */ "id": "",
          // "remark": "",
          //** */ "roleName": ""
          console.log(_updateData);
          // return;
        if(!this.updateData.roleName||!this.updateData.duty||!this.updateData.groupId){
          this.hint("输入信息不能为空");
        }else{
          this.postData('update',_updateData).then((res)=>{
            console.log(res);
            this.initTableData();
          })
          this.modifyAndDetail.openModify=false;
          this.tableData[this.updateIndex]={...this.updateData};
          this.hint("修改成功！");
        }
      }else{//取消修改
          this.updateData={...this.tableData[this.updateIndex]};
          this.modifyAndDetail.openModify=false;
      }
    },
    // 搜索框改变的返回触发函数
    searchChangeBack(res) {
      if (res === "") {
        this.search = res;
      }
    },
    // 搜索框点击的返回触发函数
    searchClickBack(res) {
      console.log(res);
      this.search = res;
    },
    // 删除分组的click函数
    deleteIt(index) {
      this.affirmDelete = true;
      this.deleteIndex = index;
    },
    // 禁用此项
    banIt(index,status) {
      console.log(index,status)
      if(!status){
        this.banContent="确定要解除冻结吗？";
      }else{
        this.banContent="确定要冻结吗？";
      }
      this.affirmBan = true;
      this.banInfo.index=index;
      this.banInfo.status=status==='1'?'0':'1';
    },
    //确定删除返回函数
    affirmDeleteBack(res) {
      this.affirmDelete = false;
      if (res === "sure") {
        if (this.deleteIndex !== undefined) {
          console.log(this.deleteIndex);
          this.postData('delete',{id:this.deleteIndex}).then(res=>{
            console.log(res);
            this.hint("删除成功！");
            this.deleteIndex = undefined;
            this.initTableData();
          })
          
        }
      } else {
        this.deleteIndex = undefined;
      }
    },
    //确定冻结或解冻返回函数
    affirmBanBack(res){
      this.affirmBan = false;
      if(res==="sure"){
        if(!!this.banInfo.index&&this.banInfo.status!==undefined){
          this.postData("ban",this.banInfo).then(res=>{
            this.banInfo.index = undefined;
            this.banInfo.status = undefined;
            this.initTableData();
          });
        }
      }else{
        this.banInfo.index = undefined;
        this.banInfo.status = undefined;
      }
    },
    // 添加分组返回的函数
    addBack(res) {
      if (res === "cancel") {
        this.openAdd = false;
        this.addData={};
      } else {
        if (!this.addData.roleName || this.addData.groupId===undefined||this.addData.groupId==='' || !this.addData.duty) {
          this.hint("请完善内容再提交！");
        } else {
          this.postData('add',this.addData).then((res)=>{
            this.initTableData();
            this.openAdd = false;
            this.addData={};
            this.hint("添加成功！");
          });
        }
      }
    },
    nowTime(type) {
      // 参数 type为需要的时间类型,默认为time
      // time : 12:10:22
      // date : 2019-10-10
      // datetime : 2019-10-10 12:10:22
      // timestamp: 1571294661250
      return (() => {
        let myDate = new Date();
        let year = myDate.getFullYear();
        let month = myDate.getMonth() + 1;
        let date = myDate.getDate();
        let h = myDate.getHours(); //获取当前小时数(0-23)
        let m = myDate.getMinutes(); //获取当前分钟数(0-59)
        let s = myDate.getSeconds();
        //获取当前时间
        if (type == "date") {
          return `${conver(year)}-${conver(month)}-${conver(date)}`;
        } else if (type == "datetime") {
          return `${conver(year)}-${conver(month)}-${conver(date)} ${conver(
            h
          )}:${conver(m)}:${conver(s)}`;
        } else if (type == "time") {
          return `${conver(h)}:${conver(m)}:${conver(s)}`;
        } else if (type == "timestamp") {
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
      /*url:请求地址
        opt={
          nameKeys：设备名，可选
          pageIndex:请求页，可选
          pageSize：每页数据，可选 
        }*/
      let _url=url||'/api/user/getRolePageList';
      let _opt={
          pageSize:this.perpage,//每页数据条数,默认为8
          pageIndex:this.nowPage,// 当前页,默认为1
      };
      this.search?_opt.nameKeys=this.search:'';
      
      return new Promise((resolve,reject)=>{
        this.axios.get(_url,{
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
    initTableData(){
      this.getData().then(res=>{
        console.log(res);
        this.tableData=res.data.data.list;
        this.pageSize=res.data.data.total;
      });
    },
    postData(type,theData){
      /*type:add/update,添加/编辑
      data:{
        id：设备id，修改，删除必须，添加不传
        ...,
      },*/
      return new Promise((resolve,reject)=>{
        let url='';
        if(type==='add'){//添加
          if(!theData||theData.id){console.log("多余值：ID");reject({error:"多余值：ID"});
          }else{
            url='/api/user/addRole';
            theData.userId=this.getUserId();
            this.axios.post(url,{...theData}).then((res)=> {
              if(res.data.stateCode==="200"){
                resolve(res);
              }
            }).catch((error)=> {
              console.log(error);reject(error);
            });
          }
        }
        else if(type==="update"){//修改
          // if(theData&&theData.id){
            theData.userId=this.getUserId();
            url='/api/user/updateRole';
            this.axios.put(url,theData).then((res)=> {
              if(res.status===200){
                resolve(res);
              }
            }).catch((error)=> {
              console.log(error);reject(error);
            });
          // }else{
          //   console.log("缺少值：ID");reject({error:"缺少值：ID"});
          // }
        }
        else if(type==="delete"){//删除
          if(theData&&theData.id){
            url=`/api/user/deleteRole?id=${theData.id}`;
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
        }
        else if(type==='ban'){//上传图片文件 /api/user/updateStationStatus
          if(theData&&theData.index){
            url=`/api/user/updateStationStatus?id=${theData.index}&status=${theData.status}`;
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
        }
        else{//类型错误
          console.log("类型参数错误");reject({error:"类型参数错误"});
        }
      });
    }

  },
  created(){
    // 随机颜色
    for(let i=0;i<this.stripData.length;i++){
      this.stripData[i].color=this.colorCan[~~(Math.random()*this.colorCan.length)];
      this.stripData[i].value=~~(Math.random()*160);
    }
  },
  mounted() {
    this.getData('/api/user/getGroupDataList').then(res=>{
      console.log("111",res);
      this.groupList=res.data.data.list;
    })
    this.initTableData();
  },
  components: {
    theBtn,
    theTable,
    searchBox,
    pagination,
    infoAddBox,
    affirmBox,
    'strip-count':stripCount,
  }
};
</script>


<style lang='less' scoped>
@import "../../../assets/ship_system/less/personTask.less";
</style>

<style lang="less">

@fontColor:rgb(89,252,255);
@bgColor:rgb(5, 33, 69);
@fontColorF:rgba(0, 255, 255, 0);
/* 1080px下 */
.personTaskBox{
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #04405f;
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
  // element 下拉菜单的样式
  .el-select{
    width: 100%;
    .el-input__icon{
      line-height: 24px;
    }
  }
  .el-button--small, .el-button--small.is-round{
    border: none;
  }
}
// 滚动条样式
/* IE 浏览器 */
@hideColor:rgba(255, 255, 255, 0);
@lightColor:rgba(89, 252, 255, 0.3);
@halfColor:rgba(89, 252, 255, 0.5);
.personTaskBox .sb-textarea textarea{
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
.personTaskBox .sb-textarea textarea{
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
.personTaskBox{
  .sb-input input {
  border-radius: 0;
  height: 28px;
  line-height: 28px;
  }
  .thebody table{
    width: 100%!important;
  }
  .el-input__inner,.el-textarea__inner{
    background-color: rgba(255, 255, 255, 0);
    border: none;
    border-bottom: 1px dashed @halfColor;
    color: @fontColor;
    &:hover{
      border-color: @fontColor;
    }
    &:focus{
      border-color: @fontColor;
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
    border: 1px dashed @halfColor!important;
  }
  .el-input__inner{
    height: 30px;
    line-height: 30px;
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
@media screen and (max-height:830px) {
.personTaskBox{
  .has-gutter tr th{
    height: 60px;
  }
  .el-table__row td{
    height: 52px;
  }
  }
}
@media screen and (max-height:780px) {
.personTaskBox{
  .has-gutter tr th{
    height: 60px;
  }
  .el-table__row td{
    height: 48px;
  }
  }
}
@media screen and (max-height:740px) {
.personTaskBox{
  .has-gutter tr th{
    height: 56px;
  }
  .el-table__row td{
    height: 44px;
  }
  }
}
@media screen and (max-height:690px) {
.personTaskBox{
  .has-gutter tr th{
    height: 50px;
  }
  .el-table__row td{
    height: 40px;
  }
  }
}
@media screen and (max-height:660px) {
.personTaskBox{
  .has-gutter tr th{
    height: 40px;
  }
  .el-table__row td{
    height: 40px;
  }
  }
}
@media screen and (max-height:630px) {
.personTaskBox{
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
