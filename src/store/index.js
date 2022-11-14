import { createStore } from 'vuex'
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
    users,    
  },
  plugins: [vuexLocal.plugin]


})
