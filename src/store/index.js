import { createStore } from 'vuex'
import cellInfo from './models/cellInfo'
import manage from '@/store/models/manage'
import activeManage from '@/store/models/activeManage'
import users from "@/store/models/users";
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
    manage,
    activeManage    
  },
  plugins: [vuexLocal.plugin]
  }

)
