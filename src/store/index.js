import { createStore } from 'vuex'
import users from '@/store/models/users'
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
    users,
    message,
    manage,
    activeManage
  }
})
