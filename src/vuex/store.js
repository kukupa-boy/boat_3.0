
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//state对象主要是储存数据
  var state={
    //这个是首页的header和slider组件之间的联系和传值
    sliderFlag:true,
    count:1,
    screenHeight:"",
    isCollapse: false,//这个用来重绘图表
  //  这个是用户的登录信息
    userInfomation:{
      name:"",
      detail:""
    },

    //这个是用于个人中心页面是否进行显示
    userCenter:false,

    //这个是消息管理列表的搜索的基本参数
    messageParams:"",
    //用户消息删除之后，给数据可视化的列表一个提示，然后进行重新更新
    deleteMessageId:1,
    //这个是消息点击传递的id值
    messageId:"",


    //船舶：
    //监听用户是否点击了header，监听了，就改变侧边栏
    changeSide:false,
    //用于监听是否进行了新增船舶的操作
    insertBoat:""

  }
//mutations主要是为了该bainstate里面的数据值
  var mutations={
    changeHeadName(state,name){//第一个对象必须是state，你也可以写这个参数，但是第一个参数必须是state
      state.headerName=name
    },
    commitCollapse(state, bool) {
      state.isCollapse = bool;
    },
    //用于进行暂时个人中心页面
    showUserCenter(state){
      state.userCenter=true;
    },
    deleteUserCenter(state){
      state.userCenter=false;
    },

    //消息页面
    //将消息的获取到的个人信息总的条数进行重新赋值
    searchParams(state,newValue){
      state.messageParams=newValue;
    },
    //获取到消息的传递过来的id值，然后进行改变
    changeMessageId(state,newValue){
      state.messageId=newValue;
    },
    //触发用户删除的id
    deleteMessageIdFn(state,newValue){
      state.deleteMessageId=newValue;
    },

    //船舶页面
    //触发新增船舶
    addEventInsertBoat(state,newValue){
      state.insertBoat=newValue;
    }


  }
//实例化vuex.store
const store=new Vuex.Store({
  state,
  mutations
})
export default  store;
