<template>
    <div class="sendMessage">
      <div class="sendMessage_inner">
        <div id="sendMessage">
        <!--这个是放置接受消息的表格的地方-->
        <div class="sendMessage_form">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="消息类型">
              <el-select  v-model="drop.region" @change="selectItem" >
                <el-option v-for="(value,index) in drop.data" :label=value.label :value=value.value1 ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="消息标题" class="message_type">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="消息内容">
              <el-input  type="textarea" v-model="form.desc"></el-input>
            </el-form-item>

            <el-form-item label="消息对象">
              <el-select  v-model="value1" multiple filterable :filter-method="dataFilter" @change="selectItem1" >
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item class="lastButton">
              <div>
                <el-button size="mini" type="primary" @click="onSubmit" round>发送</el-button>
                <el-button size="mini" round>取消</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>

        <!--这个是消息的弹出框 -->
        <div class="checkBoxInformation" v-if="checkBoxInformation">
          <div class="checkBoxInformation_icon">
            <div>
              <i class="el-icon-close"  @click="confirmOk"></i>
            </div>
          </div>
          <div class="checkBoxInformation_img">
            <i class="icon-2"></i>
          </div>
          <div class="checkBoxInformation_content">
            <h3>添加成功</h3>
            <p>稍后可以在消息页面进行查看</p>
          </div>
          <el-button type="primary" class="confirm_button" @click="confirmOk" size="middle" round>确认</el-button>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "sendMessage",
        mounted(){
        //在页面开始的时候请求可以发送的人的信息
          this.userId=JSON.parse(localStorage.getItem("userInfo")).id
          this.axios.get(`api/message/UiObject29Vo?userId=${this.userId}`)
            .then(
              (data) => {
                console.log("receiverId")
                var receiverId=data.data.data;
                this.options = [];
                for (let i = 0; i < receiverId.length; i++) {
                  var arr1 = {}
                    arr1.value=""+receiverId[i].receiverId
                    arr1.label=receiverId[i].name;
                  // console.log(this.arr)
                  this.options.push(arr1);
                }
                this.options.unshift({
                  value:"ALL_SELECT",
                  receiverId:"",
                  label:"全部"
                })
                this.optionsCopy=this.options;
                console.log("options");
                console.log(this.optionsCopy)
              }
            ).catch((err) => {
            console.log("这个请求消息列表中的错误");
            console.log(err);
          });
        },
        data() {
          return {
            //下拉框中的值
            drop: {
              data: [
                {
                  label: "普通消息",
                  value1: "normalMessage",
                  id:3
                },
                {
                  label: "紧急消息",
                  value1: "urgentMessage",
                  id:4
                },
                {
                  label: "公告消息",
                  value1: "publicMessage",
                  id:1
                },
                {
                  label: "警报消息",
                  value1: "warnMessage",
                  id:2
                },
              ],
              region:"publicMessage",
              region1:""
            },
            //是否进行显示隐藏弹出
            //发送消息下拉框中的值
            oldOptions: [],
            optionsCopy: [
              {
                value: 'ALL_SELECT',
                label: '全部'
              },
              {
                value: '1',
                label: '小陈'
              },
              {
                value: '2',
                label: '小文'
              }, {
                value: '3',
                label: '小何'
              },
              {
                value: '4',
                label: "小雨"
              },
              {
                value: '5',
                label: '小彭'
              }],
            options: [
              {
                value: 'ALL_SELECT',
                label: '全部'
              },
              {
                value: '1',
                label: '小陈'
              },
              {
                value: '2',
                label: '小文'
              },
              {
                value: '3',
                label: '小何'
              },
              {
                value: '4',
                label: '小雨'
              },
              {
                value: '5',
                label: '小彭'
              }],
            //选中的value值会放入到这个里面
            value1: [],
            checkBoxInformation:false,
            //多选框的data
            checkAll: false,
            isIndeterminate: true,
            form: {
              name: '',
              desc:""
            },
            //接收人的数组
            reciverArr:[],

            //发送人的数组
            userId:""
          }
        },
        methods: {
          //选择下拉框选中的函数
          selectItem(index){
            console.log("这个是下拉框中的函数")
            console.log(index)
          },
          onSubmit() {
            //转换所有的reciverid的值
            if(this.value1[0]==="ALL_SELECT"){
              for(let i=1;i<this.value1.length;i++){
                this.reciverArr.push(this.value1[i]);
              }
            }else{
              for(let i=0;i<this.value1.length;i++){
                this.reciverArr.push(this.value1[i]);
              }
            }

            // normalMessage
            // urgentMessage
            // publicMessage
            // warnMessage
              //将消息类型进行转换
            if(this.drop.region==='normalMessage'){
              this.drop.region1=3;
            }else if(this.drop.region==='urgentMessage'){
              this.drop.region1=4;
            }else if(this.drop.region==='publicMessage'){
              this.drop.region1=1;
            }else if(this.drop.region==='warnMessage'){
              this.drop.region1=2;
            }


            //开始发送axios的请求
            this.axios.post( `api/message/addMessage`,{
                  "description": this.form.desc,
                  "messageName": this.form.name,
                  "receiverId": this.reciverArr,
                  "senderId": this.userId,
                  "status": "",
                  "type": this.drop.region1
                })
              .then(
                (data) => {
                 console.log(data);
                  //点击发送成功之后，发送消息成功的提示框
                  console.log(data)
                  this.checkBoxInformation=true;
                }
              ).catch((err) => {
              console.log("这个请求消息列表中的错误");
              console.log(err);
            });
          },
          confirmOk(){
            //弹窗上面的取消的按钮
            this.checkBoxInformation=false
          },
          //下拉框中的函数
          handleCheckAllChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
          },
          handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
          },
          //下拉多选框中的函数
          dataFilter(val) {
            if (val) {
              this.options = this.optionsCopy.filter((item) => {
                if (!!~item.label.indexOf(val) || !!~item.label.toUpperCase().indexOf(val.toUpperCase())) {
                  return true
                }
              })
              this.options.unshift({
                value: 'ALL_SELECT',
                label: '全部'
              })
              console.log(this.options)
            } else { //val为空时，还原数组
              this.options = this.optionsCopy;
            }
          },
          selectItem1(val) {//val是多选框中的选中的数据的集合
            const allValues = [];
            // 保留所有值
            for (const item of this.options) {
              allValues.push(item.value)
            }
            // 用来储存上一次的值，可以进行对比
            const oldVal = this.oldOptions.length === 1 ? this.oldOptions[0] : [];
            // 若是全部选择
            if (val.includes('ALL_SELECT')) {
              this.value1 = allValues;
            }
            // 取消全部选中 上次有 当前没有 表示取消全选
            if (oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
              this.value1 = []
            };

            // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
            // 新老数据都有全部选中
            if (oldVal.includes('ALL_SELECT') && val.includes('ALL_SELECT')) {
              const index = val.indexOf('ALL_SELECT');
              val.splice(index, 1); // 排除全选选项
              this.value1 = val
            }
            // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
            if (!oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
              if (val.length === allValues.length - 1) this.value1 = ['ALL_SELECT'].concat(val)
            }
            // 储存当前最后的结果 作为下次的老数据
            this.oldOptions[0] = this.value1;
          },
        }
    }
</script>

<style scoped>
  /*字体图标文件*/
  @import './../../../assets/public/icomoon/style.css';
  .sendMessage{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sendMessage_inner{
    position: absolute;
    width: 82%;
    height: 78%;
    top: 11%;
    right: 4%;
    display: flex;
    background-image: url("../../../assets/public/img/header/messagebox.png");
    background-size: 100% 100%;
  }
  #sendMessage{
    position: relative;
    /*border: 1px solid red;*/
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sendMessage_form{
    height: 90%;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .el-select {
    width: 100%;
    border-radius: 10px;
  }
  .sendMessage_form>>>.el-input__inner{
    background-color: transparent;
    color: rgb(160,253,255);
  }
  .sendMessage_form>>>.el-select__caret{
    color: rgb(160,253,255);
  }
  .sendMessage_form>>>.el-select__input{
    color: rgb(160,253,255);
  }
  .sendMessage_form>>>.el-input__inner::placeholder{
    color: rgb(160,253,255);
  }
  .sendMessage_form>>>.el-form-item__label{
    color: rgb(160,253,255);
  }
  .el-select>>>.el-input__inner,.el-input>>>.el-input__inner{
    border: none;
    border-bottom: 1px solid rgb(160,253,255);
  }
  .el-textarea>>>.el-textarea__inner{
    border: 1px solid rgb(160,253,255);
  }
  .el-textarea{
    height: 200px;
  }
  .el-textarea>>>.el-textarea__inner{
    height: 200px;
    background-color: transparent;
  }
  .sendMessage_form>>>.el-form-item{
    margin-top: -0.2%;
  }
  .sendMessage_form>>>.el-form-item:nth-of-type(1){
    margin-top: 1.6%;
  }
  .lastButton div{
    display: flex;
    justify-content: space-around;
  }
  .lastButton div .el-button{
    color: rgb(160,253,255);
    border: 1px solid rgb(160,253,255);
    background-color: transparent;
  }
  .el-form-item{
    margin-top: 4%;
  }
  .sendMessage_form>>>textarea{
    overflow: hidden;
  }

  /*修改下拉框的样式*/
  .el-select >>>.el-popper,.el-select >>>.el-select-dropdown{
    background-color: transparent!important;
  }
  /*  弹出框*/
  /*删除信息确认框*/
  .checkBoxInformation{
    background-image: url("../../../assets/public/img/sendMessageBox.png");
    background-size:100% 100%;
    width: 390px;
    height: 340px;
    position:absolute;
    top: 50%;
    margin-top: -170px;
    left: 50%;
    margin-left: -195px;
    z-index:999;
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: space-around;
  }
  .checkBoxInformation_icon{
    width: 100%;
    color:rgb(160,253,255);
  }
  .checkBoxInformation_icon>div{
    font-size: 20px;
    text-align:right;
    margin-right: 10px
  }
  .checkBoxInformation_img{
    width:80px;
    height:80px;
    background-color:rgb(158,253,255);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
  }
  .checkBoxInformation_img i{
    font-size: 55px;
    color: rgb(16,35,73);
    font-weight: 900;
  }
  .checkBoxInformation_content{
    width: 100%;
  }
  .checkBoxInformation_content h3{
    width: 100%;
    text-align: center;
    color: rgb(158,253,255);
  }
  .checkBoxInformation_content p{
    margin-top:30px;
    width: 100%;
    text-align: center;
    color:rgb(158,253,255);
  }
  .checkBoxInformation_content>>>.confirm_button{

  }
  .checkBoxInformation .el-button{
    margin-bottom: 30px;
    border: 1px solid rgb(158,253,255);
    color: rgb(158,253,255);
    background-color: transparent;
  }
  /*修改最后的样式框的颜色*/
  .el-select>>>.el-tag{
    background-color:transparent;
    border: 1px solid rgb(158,253,255);
    color:rgb(158,253,255);
  }
  .el-select>>>.el-tag__close{
    background-color:rgb(158,253,255);
  }
  .el-select>>>.el-tag__close::before{
    color:black;
  }
  .el-select>>>.selected {
    background-color:red ;
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
  .el-select-dropdown__item.selected{
    background-color: transparent;
  }
  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
    color: #3ca5a7;
    background-color: transparent;
  }
  .el-select:hover .el-input__inner{
    border-color:#59fdff;
  }
  .el-input__inner,.el-textarea__inner{
    color:#59fdff;
  }
</style>
