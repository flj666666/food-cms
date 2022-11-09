import { createRouter, createWebHistory } from 'vue-router'

import Index from '@/views/index.vue'
import Home from '@/views/home.vue'
import Login from '@/views/login.vue'
import BuildMan from '@/views/buildMan.vue'
import CellInfo from '@/views/cellInfo.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
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
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
