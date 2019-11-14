import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

export default new Router({

  routes: [
    {
      path: '/',
      name: 'App',
      component:() => import('@/App.vue'),
      redirect:"/login"
      // redirect:"/login"
    },
    //登录的路由
    {
      path: '/login',
      name: 'login',
      component:() => import('@/components/login.vue')
    },
    //main
    {
      path: '/contentBox',
      name: 'contentBox',
      redirect:"/contentBox/chartManagement",
      component:() => import('@/components/contentBox.vue'),
      children:[
        //海图路由
        {
          path: '/contentBox/chartManagement',
          name: 'chartManagement',
          component:() => import('@/components/main/chartManagement/shipManagerMent.vue')
        },
        //个人中心的路由
        {
          path: '/contentBox/userMessage',
          name: 'userMessage',
          component:() => import('@/components/main/userCenter/userMessage.vue')
        },
        //海图路由
        //海图路由
        //气象路由
        {
          path: '/contentBox/weatherReport',
          name: 'weatherReport',
          component:() => import('@/components/main/weatherReport/weatherReport.vue')
        },
        //工单管理路由
        {
          path: '/contentBox/task_manager',
          name: 'task_manager',
          component:() => import('@/components/main/task_manager/task_manager.vue')
        },
        //工单管理新增任务的路由
        {
          path: '/contentBox/addFrame',
          name: 'addFrame',
          component:() => import('@/components/main/task_manager/taskList/addFrame.vue')
        },
        //工单通知的路由
        {
          path: '/contentBox/taskNotification',
          name: 'taskNotification',
          component:() => import('@/components/main/common/basic_t/taskNotification.vue')
        },
        //船舶的路由
        {
          path: '/contentBox/shipManagement',
          name: 'shipManagement',
          component:() => import('@/components/main/shipManagement/shipManagement.vue'),
          redirect:"/contentBox/shipManagement/boat_list",
          children:[
            //船舶列表
            {
              path: '/contentBox/shipManagement/boat_list',
              name: 'boat_list',
              component:() => import('@/components/main/shipManagement/boat_list.vue'),
            },
            //船舶条件
            {
              path: '/contentBox/shipManagement/sea_conditions',
              name: 'sea_conditions',
              component:() => import('@/components/main/shipManagement/sea_conditions.vue'),
            }
          ]
        },
        //用户管理列表
        {
          path: '/contentBox/userManagement',
          name: 'userManagement',
          component:() => import('@/components/main/userManagement/userManagement.vue'),
          redirect:"/contentBox/userManagement/busywork_group",
          children:[
            //用户角色
            {
              path: '/contentBox/userManagement/busywork_group',
              name: 'boat_list',
              component:() => import('@/components/main/userManagement/busywork_group.vue'),
            },
            //岗位管理
            {
              path: '/contentBox/userManagement/personTask',
              name: 'personTask',
              component:() => import('@/components/main/userManagement/personTask.vue'),
            },
            //部门管理
            {
              path: '/contentBox/userManagement/personGroup',
              name: 'personGroup',
              component:() => import('@/components/main/userManagement/personGroup.vue'),
            },
            //用户日志
            {
              path: '/contentBox/userManagement/personRecord',
              name: 'personRecord',
              component:() => import('@/components/main/userManagement/personRecord.vue'),
            },
            //打卡记录
            {
              path: '/contentBox/userManagement/personCensor',
              name: 'personCensor',
              component:() => import('@/components/main/userManagement/personCensor.vue'),
            },
            // 权限管理
            {
              path: '/contentBox/userManagement/personRoot',
              name: 'personRoot',
              component:() => import('@/components/main/userManagement/personRoot.vue'),
            }
          ]
        },
        //消息路由
        {
          path: '/contentBox/message',
          name: 'message',
          component:() => import('@/components/main/message/message.vue')
        },
        //消息详细页面
        {
          path: '/contentBox/messageDetail',
          name: 'messageDetail',
          component:() => import('@/components/main/message/messageDetail.vue')
        },
        //消息管理
        {
          path: '/contentBox/messageManage',
          name: 'messageManage',
          component:() => import('@/components/main/messageManagement/messageManagement.vue'),
          redirect:"/contentBox/messageManage/messageList",
          children:[
            //消息列表
            {
              path: '/contentBox/messageManage/messageList',
              name: 'messageList',
              component:() => import('@/components/main//messageManagement/messageList.vue'),
            },
            //船舶条件
            {
              path: '/contentBox/messageManage/sendMessage',
              name: 'sendMessage',
              component:() => import('@/components/main/messageManagement/sendMessage.vue'),
            }
          ]
        },
        //监控管理的路由
        {
          path: '/contentBox/monitoringManagement',
          name: 'monitoringManagement',
          component:() => import('@/components/main/monitoringManagement/monitoringManagement.vue'),
          redirect:"/monitoringManagement/cameraManagement",
          children:[
            //摄像头管理
            {
              path: '/contentBox/monitoringManagement/cameraManagement',
              name: 'cameraManagement',
              component:() => import('@/components/main/monitoringManagement/cameraManagement/cameraManagement.vue'),
            },
            //监控视频管理
            {
              path: '/contentBox/monitoringManagement/monitoringManagement',
              name: 'monitoringManagement',
              component:() => import('@/components/main/monitoringManagement/monitoringManagement/monitoringManagement.vue'),
            },
            {
              path: '/contentBox/monitoringManagement/historicalRecord',
              name: 'historicalRecord',
              component:() => import('@/components/main/monitoringManagement/monitoringManagement/historicalRecord.vue'),
            }
          ]
        },
        //设备管理
        {
          path: '/contentBox/deviceManagement',
          name: 'deviceManagement',
          component:() => import('@/components/main/deviceManagement/deviceManagement.vue'),
          redirect:"/contentBox/deviceManagement/deviceList",
          children:[
            //用户角色
            {
              path: '/contentBox/deviceManagement/deviceList',
              name: 'deviceList',
              component:() => import('@/components/main/deviceManagement/deviceList.vue'),
            },
            //岗位管理
            {
              path: '/contentBox/deviceManagement/censorNote',
              name: 'censorNote',
              component:() => import('@/components/main/deviceManagement/censorNote.vue'),
            }
          ]
        },
      ]
    },
  ]
})
