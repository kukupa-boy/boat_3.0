<template>
  <div class="addFrame">
     <div class="addLeft">
       <div class="title"><span>新增任务</span></div>
       <div class="back" @click="backTo()">返回</div>
       <el-form  :label-position="labelPosition" class="inputtttt" label-width="180px" :model="formLabelAlign">
         <el-form-item label="工单名称: ">
           <el-input  v-model="formLabelAlign.taskName"  class="form-input5"></el-input>
         </el-form-item>
         <el-form-item label="工单类型: ">
           <!--<el-input  v-model="formLabelAlign.entryIntoForceTime" class="form-input"></el-input>-->
           <el-select v-model="value" placeholder="请选择" class="input5">
             <el-option
               v-for="item in options"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="生效时间: ">
           <div class="box-input">
             <!--<el-input v-model="formLabelAlign.entryIntoForceTime"  class="form-input"></el-input>-->
             <el-date-picker
               v-model="value3"
               type="datetime"
               class="input5"
               placeholder="选择日期时间">
             </el-date-picker>
             <span>失效时间：</span>
             <!--<el-input v-model="formLabelAlign.failureTime" class="form-input"></el-input>-->
             <el-date-picker
               v-model="value4"
               type="datetime"
               class="input5"
               placeholder="选择日期时间">
             </el-date-picker>
           </div>
         </el-form-item>

         <el-form-item label="选择作业人员: " class="person">
           <div  v-model="formLabelAlign.operationPersonnel" @click="dialogVisible =true" class="button" >
             <span class="el-icon-plus add-2" @click="dialogVisible =true"></span>
           </div>
         </el-form-item>
         <el-form-item label="任务描述: ">
           <el-input
             type="textarea"
             :rows="2"
             placeholder="请输入内容"
             class="textarea-input"
             v-model="formLabelAlign.taskDescription">
           </el-input>
         </el-form-item>
       </el-form>
       <div class="release"><span @click="OperationSon()">发布</span></div>
     </div>
    <div class="addRight">
      <el-tree
        :data="treeData"
        show-checkbox
        accordion
        node-key="id"
        ref="tree"
        :default-expanded-keys="[2, 3]"
        style='margin:0 30% '
      >
        <!--:default-checked-keys="[5]"默认选中-->
      </el-tree>
    </div>
  </div>
</template>

<script>
    export default {
        name: "addFrame",
        data(){
          return{
            centerDialogVisible: this.show,//监控弹框显示/隐藏
            labelPosition: 'right',//默认表单对齐方式
            textarea:'',//任务描述
            list:[],//存放选中的id
            count:1,//存放一二级列表长度
            formLabelAlign: {
              SerialNum:'',//工号
              taskName:'',//任务名称
              entryIntoForceTime:'',//生效时间
              operationPersonnel:'',//选择作业人员
              taskDescription:'',//任务描述
              taskCycle:'',//任务周期
              creationTime:'',//创建时间
              distributor:'',//分发人员
            },
            failureTime:'',//失效时间
            taskType:'',//任务类型
            data1:'',//存放登录相关
            id:1,//树形id计数
            value1: '',//任务类型的绑定
            //任务类型
            options: [
              {
              value: '普通任务',
              label: '普通任务'
            }, {
              value: '紧急任务',
              label: '紧急任务'
            }],
            value: '',//任务类型
            //复选框
            treeData: [
              {
                id:1,
                label:'所有人员',
                children:[]
              }
            ],
            // treeData: [{
            //   id: 1,
            //   label: '全选',
            //   children: [{
            //     id: 3,
            //     label: '电气运行专责',
            //     children: [{
            //       id: 4,
            //       label: '电气运行专员',
            //       children:[
            //         {
            //           id: 8,
            //           label: '小刘',
            //         },
            //         {
            //           id: 9,
            //           label: '小张',
            //         },
            //         {
            //           id: 10,
            //           label: '小李',
            //         }
            //       ]
            //     }, {
            //       id: 5,
            //       label: '电气管理专员',
            //       // disabled: true
            //     }]
            //   }, {
            //     id: 2,
            //     label: '设备运行专责',
            //     // disabled: true,
            //     children: [{
            //       id: 6,
            //       label: '设备管理专员'
            //     }, {
            //       id: 7,
            //       label: '设备运行专员',
            //       // disabled: true
            //     }]
            //   }]
            // }],
            value3:'',//生效时间
            value4:'',//失效时间
            defaultProps: {
              children: 'children',
              label: 'label'
            }
          }
        },
        props: {
          show: {
            type: Boolean,
            default: false
          },
          },
      watch: {
        show () {
          this.centerDialogVisible = this.show;
        }
      },
      created(){
        this.data1=JSON.parse(localStorage.getItem("userInfo"))
        this.getOperationPersonnel();
      },
      methods: {
        //获取作业人员的数据
        getOperationPersonnel(){
          let arr=[];
          //获取所有分组
          this.axios.get(`/api/task/selectOperators?login_id=${this.data1.id}`).then((res)=>{
            // console.log(res.data.data);
            let len=res.data.data.length;
            for(let i=0;i<len;i++){
              let obj={};
              this.id++;
              obj.id=this.id;
              obj.label=res.data.data[i].groupName;
              obj.GroupingId=res.data.data[i].id;
              obj.groupName=res.data.data[i].groupName;
              obj.children=res.data.data[i].dataRoles;
              // this.treeData[0].children.push(obj);
              arr.push(obj)
            };
            for(let j=0;j<arr.length;j++){
              var arr1=[];
              for(let k=0;k<arr[j].children.length;k++){
                let obj={};
                this.id++;
                obj.id=this.id;
                obj.label=arr[j].children[k].roleName;
                obj.roleId=arr[j].children[k].id;
                obj.roleName=arr[j].children[k].roleName;
                obj.children=arr[j].children[k].maps;
                arr1.push(obj)
              }
              arr[j].children=arr1;
            }
            for(let j=0;j<arr.length;j++){
              for(let k=0;k<arr[j].children.length;k++){
                var arr2=[];
                for(let i=0;i<arr[j].children[k].children.length;i++){
                  let obj={};
                  this.id++;
                  obj.id=this.id;
                  obj.label=arr[j].children[k].children[i].uname;
                  obj.uId=arr[j].children[k].children[i].id;
                  obj.uname=arr[j].children[k].children[i].uname;
                  arr2.push(obj);
                }
                arr[j].children[k].children=arr2;
              }
            }
            // console.log('====================11111============');
            // console.log(arr);
            this.treeData[0].children=arr;
          }).catch((err)=>{
            console.log(err);
          });
        },
        //作业人员选择后的回调
        OperationSon(){
          let res = this.$refs.tree.getCheckedNodes();
          let arr = []
          this.count=1;
          this.list=[];
          let obj={};
          res.forEach((item) => {
            arr.push(item.id)
          })
          console.log(res);
          console.log(arr);
          console.log(this.treeData[0].children);
          this.count=this.count+this.treeData[0].children.length;
          for(let i=0;i<this.treeData[0].children.length;i++){
            this.count+=this.treeData[0].children[i].children.length
          }
          console.log(this.count);
          var arr2 = arr.filter((value,index)=>{
            return value>this.count
          });
          console.log(arr2);
          for(let i=0;i<arr2.length;i++){
            for(let j=0;j<res.length;j++){
              if(arr2[i]===res[j].id){
                this.list.push(res[j].uId)
              }
            }
          }
          obj.description=this.formLabelAlign.taskDescription;
          obj.taskName=this.formLabelAlign.taskName;
          obj.ids=this.list
          let a=this.dateTime(this.value3);
          let b=this.dateTime(this.value4);
          obj.effectiveTime=a;
          obj.expirationTime=b;
          if(this.value==='紧急任务'){
            obj.type=1;
          }else{
            obj.type=2;
          }
          obj.uid=this.data1.id;
          console.log(obj);
          this.axios.post('/api/task/insertTask',obj).then((res)=>{
            console.log(res);
          }).catch((err)=>{
            console.log(err);
          })
        },
        //时间转换start
        dateTime(x){
          let d = new Date(x);
          let resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate());
          let resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds());
          x=resDate+' '+resTime;
          return x;
        },
        p(s) {
          return s < 10 ? '0' + s : s
        },
        //时间转换end
        //返回工单
        backTo(){
          this.$router.push({name:"task_manager"})
        },
      }
    }
</script>
<style scoped>
  .addFrame{
    width: 83%;
    height: 80%;
    position: absolute;
    left: 12.5%;
    top: 12%;
    /*padding: 20px;*/
    box-sizing: border-box;
    background-image: url("../../../../assets/public/img/border.png");
    background-size: 100% 100%;
    display: flex;
    color: #59fdff;
  }
  .title{
    height: 30px;
    width: 15%;
    position: absolute;
    line-height: 30px;
    top: 0;
    left: 2px;
    background-image: url("../../../../assets/public/img/title.png");
    background-size: 100% 100%;
  }
  .title span{
    margin-left: 20px;
  }
  .back{
    width: 80px;
    height: 30px;
    line-height: 30px;
    position: absolute;
    right: 20px;
    top: 10px;
    cursor: pointer;
    text-align: center;
    border: 1px solid #59fdff;
    border-radius: 30px;
  }
  .addLeft{
    height: 100%;
    width: 80%;
    padding: 20px;
    /*border-radius: 10px;*/
    box-sizing: border-box;
    position: relative;
    /*background-color: transparent;*/
    /*background-image: url("../../../../assets/public/img/rectangle.png");*/
    background-size: 100% 100%;
    /*overflow: hidden;*/
  }
  .inputtttt{
    margin-top: 50px;
  }
  .box-input >div{
    width: 24%;
    margin-right: 10%;
  }
  .form-input5{
    width: 24%;
    /*border: 1px solid red;*/
    position: relative;
  }
  .input5{
    width: 24%;
    /*border: 1px solid red;*/
    position: relative;
  }

    /*//作业人员的点击*/
  .person{
    position: relative;
    /*width: 30%;*/
  }
  .person  span{
    display: inline-block;
    width: 18px;
    height: 18px;
    /*margin-right: 10px;*/
    text-align: center;
    line-height: 20px;
    border-radius: 20px;
    color: #59fdff;
    border: 2px solid #59fdff;
  }
  .div{
    display: block;
    margin-left: 60px;
  }
  .button{
    width: 24%;
    height: 30px;
    line-height: 30px;
    text-align: right;
    background-color: transparent;
    border-bottom: 1px solid #59fdff;
    /*border-radius: 30px;*/
    position: relative;
  }

  .release span{
    display: inline-block;
    width: 80px;
    border-radius: 30px;
    background-color: transparent;
    border: 1px solid #59fdff;
  }
  .addRight{
    width: 20%;
    height: 100%;
    color: white;
    /*border: 1px solid #59fdff;*/
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
  }

  @media (min-width: 1366px){
    .inputtttt >div{
      margin-bottom: 25px;
    }
    .release{
       width: 100%;
       height: 30px;
       line-height: 30px;
       text-align: center;
       position: absolute;
       bottom: 5%;
       left: 0;
     }
  }
  @media (min-width: 1920px){
    .inputtttt >div{
      margin-bottom: 60px;
    }
    .release{
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      position: absolute;
      bottom: 10%;
      left: 0;
    }
  }
</style>
<style>
  .inputtttt label{
    color:  #59fdff;
  }
  .form-input5 .el-input__inner {
    width: 100%;
    height: 30px;
    border-radius: 0px;
    background-color: transparent;
    display: inline-block;
    border-top: transparent;
    border-left: transparent;
    border-right: transparent;
    border-bottom: 1px solid #59fdff;
  }
  .el-scrollbar{
    background-color: rgb(0,30,68);
  }
  .el-select-dropdown{
    border: 1px solid #59fdff;
  }
  .el-select-dropdown__item{
    color: #59fdff;
  }
  .popper__arrow::after{

  }
  .input5 .el-input__inner{
    background-color:transparent;
    height: 30px;
    border-radius: 0px;
    border-top: transparent;
    border-left: transparent;
    border-right: transparent;
    border-bottom: 1px solid #59fdff;
  }
  .textarea-input .el-textarea__inner{
    background-color: transparent;
    border: 1px solid #59fdff;
    border-radius: 0px;
    width: 90%;
    overflow-y:hidden!important;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: transparent;
    border-color: #59fdff;
  }
  .el-checkbox__inner::after {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border: 1px solid #59fdff;
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
  }
  .addRight .el-tree{
    margin: 50px 0px!important;
    color: #59fdff;
    background-color: transparent;
    width: 80%;
  }
  .addRight .el-tree>.el-tree-node>:nth-child(1){
    border-bottom: 1px solid #59fdff;
    border-image:linear-gradient(to right, #155372,#59fdff,#155372) 1 10;
  }
  .el-tree-node__content:hover{
    background-color: #3ca5a7;
    background-image: linear-gradient(to right, #155372, #4ac9cb,#155372);
  }
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background-color: #3ca5a7;
    background-image: linear-gradient(to right, #155372, #4ac9cb,#155372);
    background-image:  -ms-linear-gradient(to right, #155372, #4ac9cb,#155372);
    /*filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#155372', endColorstr='#4ac9cb',GradientType=0 );*/
  }
  .el-select:hover .el-input__inner{
    border-color:#59fdff;
  }
  .el-input__inner,.el-textarea__inner{
    color:#59fdff;
  }
</style>
