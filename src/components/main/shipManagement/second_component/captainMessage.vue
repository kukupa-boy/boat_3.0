<template>
  <div class="bounceBox">
    <div class="bounceBox_inner">
      <div class="inner_box">
        <div class="bounceInnerBox">
          <h4>船长信息</h4>
          <div style="height: 90%;display: flex;flex-direction: column;justify-content: space-around">
          <div class="captain_img"><img  src="../../../../assets/public/img/pig.jpg"></div>
          <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="boat_id">
              <el-input readonly type="text" v-model="ruleForm.boat_id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="call_id">
              <el-input readonly type="text" v-model="ruleForm.call_id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="mmsi_number">
              <el-input readonly type="text" v-model="ruleForm.mmsi_number"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="imo_number">
              <el-input readonly type="text" v-model="ruleForm.imo_number" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button class="button1" type="primary" size="mini" @click="submitForm">确定</el-button>
              <el-button class="button2" size="mini" @click="deleteBounce" >取消</el-button>
            </el-form-item>
          </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "captainMessage",
      data() {
        return {
          ruleForm: {
            boat_id:"yan",
            call_id:"男",
            mmsi_number:"42",
            imo_number:"17780576951",
          },

        };
      },
      methods: {
        //下拉框中的函数
        selectItem(index){
          console.log(index)
        },
        submitForm() {
          this.$emit("deleteCaptainBoxClick")
        },
        deleteBounce(){
          this.$emit("deleteCaptainBoxClick")
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
    background-color:rgba(2,35,75,0.8);
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
    height: 10%;
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
  .bounceInnerBox>>>.el-form-item:nth-last-child(1){
    height: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .bounceInnerBox>>>.el-form-item__content{
    height: 40px;
  }
  .bounceInnerBox>>>.el-form-item__label{
    color: rgb(160,253,255);
  }
  .bounceInnerBox>>>.el-input__inner{
    background-color: transparent;
    width: 90%;
    height: 30px;
    color:rgb(160,253,255);
    border: none;
    border-bottom: 1px solid rgb(160,253,255)
  }
  body>>>.el-popper body>>>.el-select-dropdown{
    z-index: 10000;
  }
  .bounceInnerBox>>>.el-form-item{
    height: 20px;
  }
  .button1{
    margin-left: -50%;
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
  .captain_img{
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .captain_img img{
    width: 80px;
    height: 80px;
    border-radius: 100%
  }
</style>
