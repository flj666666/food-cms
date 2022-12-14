import { createStore } from 'vuex'
import cellInfo from './models/cellInfo'
import manage from '@/store/models/manage'
import activeManage from '@/store/models/activeManage'
import users from "@/store/models/users";
import VuexPersistence from 'vuex-persist'
import mainteMan from './models/mainteMan';

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
    activeManage,
    mainteMan    
  },
  plugins: [vuexLocal.plugin]
  }

)
