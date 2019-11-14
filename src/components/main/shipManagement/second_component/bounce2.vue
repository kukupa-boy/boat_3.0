<template>
  <div class="bounceBox">
    <div class="bounceBox_inner">
      <div class="inner_box">
        <div class="bounceInnerBox">
    <h4>新增船舶</h4>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="船号" prop="boat_id">
        <el-input type="text" v-model="ruleForm.boat_id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="呼号" prop="call_id">
        <el-input type="text" v-model="ruleForm.call_id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="mmsi号" prop="mmsi_number">
        <el-input type="text" v-model="ruleForm.mmsi_number"></el-input>
      </el-form-item>
      <el-form-item label="IMO号" prop="imo_number">
        <el-input type="text" v-model="ruleForm.imo_number" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="船舶类型" prop="boat_type">
        <el-select  v-model="ruleForm.typeList" @change="selectItem" >
          <el-option v-for="(value,index) in ruleForm.boat_type" :label=value :value=value ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="高度" prop="boat_height">
        <el-input type="text" v-model="ruleForm.boat_height"></el-input>
      </el-form-item>
      <el-form-item label="长度" prop="boat_width">
        <el-input type="text" v-model="ruleForm.boat_width" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="boat_remark">
        <el-input type="text" v-model="ruleForm.boat_remark"></el-input>
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
    name: "bounce2",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入相应的字段'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        ruleForm: {
          boat_id:"",
          call_id:"",
          mmsi_number:"",
          imo_number:"",
          boat_type:["讯视船","小船","大船"],
          boat_height:"",
          boat_width:"",
          boat_remark:"",
          typeList:"",
          userId:""
        },
        rules: {
          boat_id:[{ validator: validatePass, trigger: 'blur' }],
          call_id:[{ validator: validatePass, trigger: 'blur' }],
          mmsi_number:[{ validator: validatePass, trigger: 'blur' }],
          imo_number:[{ validator: validatePass, trigger: 'blur' }],
          boat_type:[{ validator: validatePass, trigger: 'blur' }],
          boat_height:[{ validator: validatePass, trigger: 'blur' }],
          boat_width:[{ validator: validatePass, trigger: 'blur' }],
          boat_remark:[{ validator: validatePass, trigger: 'blur' }],
        },
        numberI:0
      };
    },
    created(){
      this.userId=JSON.parse(localStorage.getItem("userInfo")).id
      console.log("this.userId")
      console.log(this.userId)
    },
    methods: {
      //下拉框中的函数
      selectItem(index){
        console.log(index)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //子组件调用父组件中的函数，并且传递对应的index给父组件
            //注意：this.$emit里面的函数只能是小写，不能是大写
            this.axios.post(`api/ship/insertShip`,{
                login_id:parseInt(this.userId),
                imo:this.ruleForm.imo_number,
                mmsi:this.ruleForm.mmsi_number,
                shipCode:this.ruleForm.boat_id,
                callCode:this.ruleForm.call_id,
                high:this.ruleForm.boat_height,
                remark:this.ruleForm.boat_remark,
                type:this.ruleForm.typeList,
                width:this.ruleForm.boat_width
            })
              .then(
                (data) => {
                  this.$nextTick(function () {
                    console.log("123456");
                    console.log(data)
                    if(data.data.message!=="undefined"){
                      this.$store.commit("addEventInsertBoat",data.data.data)
                      alert("新增成功");
                    }else{
                      alert(data.data.errorMsg);
                    }
                    this.$emit('deleteBoxButton');
                  })
                }
              ).catch((err) => {
              console.log("这个请求消息列表中的错误");
              console.log(err);
            });



          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      deleteBounce(){
        this.$emit('deleteBoxButton')
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
    width: 70%;
    border: none;
    border-bottom: 1px dashed rgb(160,253,255);
    height: 30px;
    color:rgb(160,253,255);
    /*border: 1px solid red;*/
  }
  body>>>.el-popper body>>>.el-select-dropdown{
    z-index: 10000;
  }
  .bounceInnerBox>>>.el-form-item{
    height: 20px;
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
