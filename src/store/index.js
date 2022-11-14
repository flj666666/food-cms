import { createStore } from 'vuex'
import cellInfo from './modules/cellInfo'

import users from "@/store/modules/users";
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => {
    return {
      users: {
        token: state.users.token
      }
    }
  },
})

// import users from '@/store/models/users'
import message from '@/store/models/message'
import manage from '@/store/models/manage'
import activeManage from '@/store/models/activeManage'


export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cellInfo,
    users,
    message,
    manage,
    activeManage    
  },
  plugins: [vuexLocal.plugin]
  }

)
