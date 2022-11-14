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
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta:{ auth : false}
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next)=>{
//   if( to.matched[0].meta.auth ){ 
//     store.dispatch('users/info').then((res)=>{
//       console.log(res.data)   
//       // if(res.data){
//       //   // store.commit('users/updateUsername', res.data.email)
//       //   // next()
//       // }
//       // else{   
//       //   next('/login')
//       // }
//     })

//   }

// })

export default router
