import http from "@/utils/http";

const state = {
  token: '',
  temporaryToken: ''
};
const getters = {};
const actions = {

  login(context, payload) {
    return http.post('/login', payload)
  },
  info() {
    return http.get('/users')
  },
  register(context, payload) {
    return http.post('/register', payload)
  }
};
const mutations = {

  temporary(state,payload) {
    state.temporaryToken = payload;
  },
  updateToken(state, payload) {
    state.token = payload;
  },
  updateUsername(state, payload) {
    state.username = payload;
  },
  clearToken(state) {
    state.token = ''
  }

};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}