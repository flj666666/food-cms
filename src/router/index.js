import { createRouter, createWebHistory } from 'vue-router'

import Index from '@/views/index.vue'
import Home from '@/views/home.vue'
import Login from '@/views/login.vue'
import BuildMan from '@/views/buildMan.vue'
import CellInfo from '@/views/cellInfo.vue'

import ActiveMan from '@/views/activeMan.vue'
import VisitMan from '@/views/visitMan.vue'
import ComplaMan from '@/views/complaMan.vue'
import MainteMan from '@/views/mainteMan.vue'
import Register from '@/views/register.vue'

import ManDetail from '@/views/manDetail.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'index',
    redirect:'/home',
    component: Index,
    meta:{ auth : true},
    children:[
      {
        path: 'home',
        name: 'home',
        component: Home,
        meta:{titles:['首页']}
      },
      {
        path: 'cell/Info',
        name: 'cellInfo',
        component: CellInfo,
        meta:{titles:['资料管理','小区信息']}
      },
      {
        path: 'build/Man',
        name: 'buildMan',
        component: BuildMan,
        meta:{titles:['资料管理','楼座管理']}
      },
      {
        path: 'mainte/Man',
        name: 'mainteMan',
        component:  MainteMan,
        meta:{titles:['物业服务','维修管理']}
      },
      {
        path: 'visit/Man',
        name: 'visitMan',
        component:  VisitMan,
        meta:{titles:['物业服务','访客管理']}
      },
      {
        path: 'compla/Man',
        name: 'complaMan',
        component: ComplaMan,
        meta:{titles:['物业服务','投诉管理']}
      },
      {
        path: 'active/Man',
        name: 'activeMan',
        component: ActiveMan,
        meta:{titles:['物业服务','活动管理']}
      },
      {
        path: 'man/Detail',
        name: 'manDetail',
        component: ManDetail,
        meta:{titles:['物业服务','维修管理','报修详情']}
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta:{ auth : false}
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta:{titles:['注册页']}
    
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{

  //console.log( to.matched[0].meta  );  //找当前路由对应的一级meta值

  if( to.matched[0].meta.auth && !store.state.users.token ){ //需要权限
    store.dispatch('users/info').then((res)=>{
      if(res.data.token){   // 有权限
        store.commit('users/updateUsername', res.data.token)
        next()
      }
      else{   // 没权限或伪造的token
        next('/login')
      }
    })

  }
  else{  
    next()
  }

   })


export default router
