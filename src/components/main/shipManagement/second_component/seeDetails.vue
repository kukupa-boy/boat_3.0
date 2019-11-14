<template>
  <div class="bounceBox">
    <div class="bounceBox_inner">

      <div class="inner_box">
        <div class="bounceInnerBox">
          <h4>操作详情</h4>
          <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="船号" >
              <el-input readonly=true type="text" v-model="ruleForm.boat_id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="呼号" >
              <el-input readonly=true type="text" v-model="ruleForm.call_id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="mmsi号" >
              <el-input readonly=true type="text" v-model="ruleForm.mmsi_number"></el-input>
            </el-form-item>
            <el-form-item label="IMO号" >
              <el-input readonly=true type="text" v-model="ruleForm.imo_number" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="船舶类型" >
              <el-input readonly=true type="text" v-model="ruleForm.boat_type" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="高度" >
              <el-input readonly=true type="text" v-model="ruleForm.boat_height"></el-input>
            </el-form-item>
            <el-form-item label="长度" >
              <el-input readonly=true type="text" v-model="ruleForm.boat_width" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" >
              <el-input readonly=true type="text" v-model="ruleForm.boat_createTime"></el-input>
            </el-form-item>
            <el-form-item label="船舶状态" >
              <el-input readonly=true type="text" v-model="ruleForm.boat_state"></el-input>
            </el-form-item>
            <el-form-item  label="备注" >
              <el-input readonly=true type="text" v-model="ruleForm.boat_remark"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="button1" type="primary" size="mini" @click="submitForm('ruleForm')">提交</el-button>
              <el-button class="button2" size="mini" @click="deleteBounce" >取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "seeDetails",
      mounted(){
          this.axios.get(`api/ship/shipInfo?imo=${this.detail_data}`)
            .then(
              (data) => {
                  console.log(data)
                  var resData=data.data.data;
                  this.ruleForm.boat_id=resData.shipCode;
                  this.ruleForm.call_id=resData.callCode;
                  this.ruleForm.mmsi_number=resData.mmsi;
                  this.ruleForm.imo_number=resData.imo;
                  this.ruleForm.boat_type=resData.type;
                  if(resData.status==="normal"){
                    this.ruleForm.boat_state="正常";
                  }else{
                    this.ruleForm.boat_state="异常";
                  }
                  this.ruleForm.boat_height="\""+resData.high+"\""+"m";
                  this.ruleForm.boat_width="\""+resData.width+"\""+"m";
                  this.ruleForm.boat_createTime=resData.createTime;
                  this.ruleForm.boat_remark=resData.remark;
              }
            ).catch((err) => {
            console.log("这个请求消息列表中的错误");
            console.log(err);
          });
      },
      data() {
        return {
          ruleForm: {
            boat_id:1,
            call_id:1,
            mmsi_number:1,
            imo_number:"123421",
            boat_type:1,
            boat_height:"50m",
            boat_createTime:"2019-12-24",
            boat_state:1,
            boat_width:"50m",
            boat_remark:"无",
            typeList:""
          },
        };
      },
      props:{
         // listData1: this.detail_data,
        detail_data:{default:{}}
      },
      methods: {
        //下拉框中的函数
        selectItem(index){
          console.log(index)
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
              //子组件调用父组件中的函数，并且传递对应的index给父组件
              //注意：this.$emit里面的函数只能是小写，不能是大写
              this.$emit('deleteDetailBoxClick')
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        deleteBounce(){
          this.$emit('deleteDetailBoxClick')
        }
      }
    }
</script>

<style scoped>
  /*弹出框*/
  /*船舶弹出框*/
  .bounceBox{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2000;
    background-color:rgba(2,35,75,0.8)
  }
  .bounceBox_inner{
    width: 80.5%;
    height: 81%;
    margin-top: 4%;
    margin-left: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .inner_box{
    width: 35.5%;
    height: 86%;
    background-image: url("../../../../assets/public/img/boat_list_bounce.png");
    background-size: 100% 100%;
  }
  .bounceInnerBox{
    width: 100%;
    height:100%;
    display: block;
  }
  .bounceBox h4{
    color: rgb(160,253,255);
    padding-left:2% ;
    box-sizing: border-box;
    padding-top:1%;
    padding-bottom:1%;
  }
  .el-form{
    color: rgb(160,253,255);
    height: 94%;
    width: 70%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .bounceInnerBox>>>.el-form-item{
    padding: 0;
    margin-top: -6%;
    height: 30px;
  }
  .bounceInnerBox>>>.el-form-item:nth-last-child(1){
    height: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .bounceInnerBox>>>.el-form-item__label{
    color: rgb(160,253,255);
  }
  .bounceInnerBox>>>.el-input{
    height: 30px;
  }
  .bounceInnerBox>>>.el-input__inner{
    height: 30px;
    background-color: transparent;
    width: 70%;
    border: none;
    color:rgb(160,253,255);
  }
  body>>>.el-popper body>>>.el-select-dropdown{
    z-index: 10000;
  }

  .button1{
    margin-left: -60%;
    background-color: transparent;
    border-radius: 20px;
    border: 1px solid  rgb(160,253,255);
    color: rgb(160,253,255);
  }
  .button2{
    margin-left: 30%;
    margin-right: 10%;
    background-color: transparent;
    border-radius: 20px;
    color: rgb(160,253,255);
    border: 1px solid  rgb(160,253,255);
  }
</style>
