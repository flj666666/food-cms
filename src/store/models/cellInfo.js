
import http from "@/utils/http";

const state = { };
const getters = { };
const actions = {
   update(context,payload){
  //   let params = new FormData()
  //   for(let attr in payload){
  //     params.append(attr,payload[attr])
  //   }
  //   return http.post('/message',params,{'Content-Type': 'multipart/form-data'})
  
   return http.post('/message',payload)
}
};
const mutations = { }


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}