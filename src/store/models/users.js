import http from "@/utils/http";
 
const state = {
    token:'',
    email:''
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
    updateEmail(state,payload){
        state.email = payload;
    }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}