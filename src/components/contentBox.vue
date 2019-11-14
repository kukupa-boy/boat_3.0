<template>
  <div class="contentBox">
    <header-box></header-box>
    <sidebar></sidebar>
    <router-view></router-view>
    <user-center v-if="this.$store.state.userCenter"></user-center>
    <div class="yanyanyan">
      <img src="../assets/public/img/pageLogo1.png">
    </div>
  </div>
</template>
<script>
  import headerBox from "@/components/header/head_box.vue"
  import sidebar from "@/components/sidebar/sidebar.vue"
  import mainBox from "@/components/main/mainBox.vue"
  import userCenter from "@/components/main/userCenter/userCenter.vue"
  export default {
    name: 'contentBox',
    components:{
      headerBox,
      sidebar,
      mainBox,
      userCenter
    },
    created(){

    },
    methods: {
      data(){
        return {
          aspect_ratio:""
        }
      },
      created(){
      },
    }
  }
</script>

<style>
  .contentBox{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .yanyanyan{
    position: absolute;
    height: 10%;
    width: 100%;
    bottom: 0.2%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .yanyanyan img{
    width: 336px;
    height:18px ;
  }

</style>
