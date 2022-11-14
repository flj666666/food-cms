import http from '@/utils/http'
const state ={
   list:[]
}
const getters={
    
}
const actions={
    addManage(context,payload){
       return http.post('/manage',payload)
    },
    findList(){
         return http.get('/manage')
        //  return http.get('/manage?_limit=5')
    },
    removeList(context,payload){
        
        return http.delete(`/manage/${payload}`)
        //  context.commit('setList',payload)
    },
    updataList(context,payload){
        return http.put(`/manage/${payload.id}`,payload.payload)
    }
}
const mutations={
    //添加
    addList(state,payload){
        state.list.unshift(payload)
    },
    //查询
    getList(state,payload){
        state.list=payload
    },
    //删除
    deleteList(state,payload){
       let index=state.list.findIndex(item=>item.payload===payload)
       state.list.splice(index,1)
       // console.log("state.list=============",state.list);
    },
    //更新
    setList(state,payload){
        //获取编写基础信息的下标
        let index=state.list.findIndex(item=>item.id===payload.id)
        state.list[index]=payload  
    }
}
export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations

}