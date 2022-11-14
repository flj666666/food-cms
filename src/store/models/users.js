import http from "@/utils/http";

const state = {
    token:''
};
const getters = {};
const actions = {

 login(context, payload){
      return http.post('/login', payload)
  },
    info(){
       return http.get('/users')
  }
};
const mutations = {
   updateToken(state,payload){
     state.token = payload;
  },
    updateUsername(state,payload){
    state.username = payload;
    },
     clearToken(state){
      state.token=''
   }

};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}