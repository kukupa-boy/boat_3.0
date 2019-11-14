<template>
    <div class="message">
        <div class="message_inner">
          <div id="message">
            <div class="message_innerBox">
              <p class="message_header">
                <el-input
                  placeholder="请输入内容"
                  suffix-icon="el-icon-search"
                  v-model="input1">
                </el-input>
              </p>
              <div class="message_content">
                <el-tabs v-model="activeName" @tab-click="handleClick" >
                  <el-tab-pane label="公告消息" name="first">
                    <public-message></public-message>
                  </el-tab-pane>
                  <el-tab-pane label="警报消息" name="second">
                    <warn-message></warn-message>
                  </el-tab-pane>
                  <el-tab-pane label="紧急消息" name="third">
                    <urgent-message></urgent-message>
                  </el-tab-pane>
                  <el-tab-pane label="普通消息" name="fourth">
                    <normal-message></normal-message>
                  </el-tab-pane>
                </el-tabs>
              </div>
              <!--      <transition>-->
              <!--        <router-view></router-view>-->
              <!--      </transition>-->
            </div>
          </div>

        </div>
    </div>
</template>

<script>

      import normalMessage from '@/components/main/message/secondComponents/normalMessage.vue'
      import publicMessage from '@/components/main/message/secondComponents/publicMessage.vue'
      import urgentMessage from '@/components/main/message/secondComponents/urgentMessage.vue'
      import warnMessage from '@/components/main/message/secondComponents/warnMessage.vue'
      export default {
        name: "message",
        data() {
          return {
            input1:"",
            activeName: 'second',
            itemsData:{
            }
          };
        },
        methods: {
          handleClick(tab, event) {
            console.log(tab, event);
          }
        },
        components:{
          normalMessage,
          publicMessage,
          urgentMessage,
          warnMessage,
        }
      }
</script>

<style scoped>
  .message{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .message_inner{
    position: absolute;
    width: 82%;
    height: 78%;
    top: 11%;
    right: 4%;
    display: flex;
    background-image: url("../../../assets/public/img/header/messagebox.png");
    background-size: 100% 100%;
      /*position: relative;*/
     }
  #message{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
  }
  .message_innerBox{
    height: 100%;
    width: 100%;
    /*display: flex;*/
    /*flex-direction: column;*/
    /*align-content: space-around;*/
    /*border-radius: 10px;*/
  }
  .message_header{
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    padding-left: 5%;
    box-sizing: border-box;
  }
  .message_header>>>.el-input{
    width: 40%;
    height: 30px;
    border-radius: 20px;
  }
  .message_header>>>.el-input__inner{
    border-radius: 20px;
    background-color: transparent;
    border: 1px solid rgb(160,253,255);
    color:rgb(160,253,255) ;
    height: 30px;
    line-height: 30px;
  }
  .message_header>>>.el-input__inner::placeholder{
    color:rgb(160,253,255) ;
  }
  .message_header>>>.el-input--suffix i{
    color:rgb(160,253,255);
    position: relative;
    top: -5px;
  }
  .message_content{
    width: 90%;
    height: 83%;
    margin: 0 auto;
    margin-top: 1%;
  }
  .message_content>>>.el-tabs__nav-scroll{
    border: none;
  }
  .message_content>>>.el-tabs__item{
    color:rgb(160,253,255);
  }

  .message_content>>>.el-tabs{
    height: 100%;
    width: 100%;
  }
  .message_content>>>.el-tabs__content{
    height: 88.5%;
  }
  .message_content>>>.el-tab-pane{
    height: 100%;
  }
</style>
