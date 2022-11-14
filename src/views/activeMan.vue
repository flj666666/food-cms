<template>
    <div class="all">
           <h3>活动管理</h3>
           <div class="box1">
            <div>
                作者:
                <el-tree-select
                    v-model="value"
                    :data="data"
                    :render-after-expand="false"
                    placeholder="请选择"
                    show-checkbox
                /> 
            </div>
            <div>
                活动标题：<el-input v-model="input2" class="classInput" placeholder="请输入" />
            </div>
            <div>
                <el-button type="primary" @click="handleFind">查询</el-button>
                <el-button @click="handleReset">重置</el-button>
            </div>
        </div>
        <div class="box2">
              <h5>活动列表</h5>
           <div class="boxchildren">
             <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon>新建</el-button>
             <el-button>批量操作</el-button>
           </div>
           <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">

                <el-table-column prop="title" label="活动标题" width="160">
                  
                </el-table-column>
                <el-table-column prop="author" label="作者" width="160">
                  
                </el-table-column>
                <el-table-column prop="number" label="浏览量" width="160">
                  
                </el-table-column>
                <el-table-column prop="pushDate" label="发布日期" width="160">
                  
                </el-table-column>
                <el-table-column prop="name" label="发布人" width="160">
                  
                </el-table-column>
                <el-table-column label="操作" width="160">
                  <template  #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                 </template>
                </el-table-column> 
           </el-table>
     <!-- ------------------------------------------------>
           <el-dialog
         v-model="dialogVisible"
         title="基础信息"
         width="30%"
        >
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="80px"
         >
         <el-form-item label="活动标题" prop="title">
            <el-input
            v-model="ruleForm.title"
            type="title"
            autocomplete="off"
            placeholder="请输入"
            />
         </el-form-item>
         <el-form-item label="作者" prop="author">
            <el-input
            v-model="ruleForm.author"
            type="author"
            autocomplete="off"
            placeholder="请输入"
            />
         </el-form-item>
         <el-form-item label="活动详情" prop="detail">
            <el-input
                v-model="ruleForm.detail"
                :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea"
                placeholder="请展示你的文采"
            />
         </el-form-item>
         <el-form-item>
            <el-button class="login-button" type="primary" @click="submitForm($refs.ruleFormRef)">添加</el-button>
            <el-button class="login-button" type="primary" @click="submitForm2($refs.ruleFormRef)">更新</el-button>
          <el-button @click="resetForm($refs.ruleFormRef)">重置</el-button>
         </el-form-item>
     </el-form>
     </el-dialog>

     <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            layout="total,prev, pager, next,jumper"
            :total="total"
            v-model:current-page="currentPage"
            v-model:page-size="pagesize"
            
        />
        </div>
    </div>
</template>

<script>
    import { ElMessage } from 'element-plus';
    //import { split } from 'lodash';
    export default {
        name:'ActiveMan',
        data(){
            return{
                total:this.total,
                currentPage:1,
                pagesize:5,
                dialogVisible:false,
                input2:'',
                value:'物业服务中心',
                // data:[],
                data:[
                {
                    value: '1',
                    label: '物业服务中心'
                },
                {
                    value: '2',
                    label: '其它',
                }
            ],
            ruleForm:{
               author:'',
               title:'',
               detail:''
            },
            rules: {
               author: [
                  { required: true, message: '请输入作者', trigger: 'blur' }
               ],
               title: [
                  { required: true, message: '请输入活动标题', trigger: 'blur' }
               ],
               detail: [
                  { required: true, message: '请输入活动详情', trigger: 'blur' }
               ]
            },
         }    
    },
    created(){
            this.$store.dispatch('activeManage/findList').then((res)=>{
                if(res){
                    this.$store.commit('activeManage/getList',res.data)
                }
                 this.total = this.$store.state.activeManage.list.length
            })
        },
    methods:{
        handleSizeChange(val){
           this.pagesize=val;
           this.page=1
        },
        handleFind(){
            this.$store.dispatch('activeManage/findList').then((res)=>{
               
                if(res.data.filter((v)=>v.title.includes(this.input2))){
                     let tableData = res.data.filter((v)=>v.title.includes(this.input2))
                     this.$store.commit('activeManage/getList',tableData)
                     ElMessage.success('查询成功')
                   } 
            })
        },
        handleReset(){
            this.input2=''
        },
        handleEdit(index,row){
            this.dialogVisible=true;
            this.id=row.id
        },
        handleDelete(index,row){
            
            this.$store.dispatch('activeManage/removeList',row.id).then((res)=>{
                    //   console.log("newList================",res.data);
                    if(res){
                        this.$store.commit('activeManage/deleteList',row.id)
                        ElMessage.success('删除成功') 
                    }
                    
             }).catch(()=>{
                ElMessage.success('删除失败') 
             })
           

        },
        handleCurrentChange(val){
           this.currentPage=val
        },
        handleAdd(){
           this.dialogVisible=true;
        },
        submitForm(formEl){
               if (!formEl) return
               formEl.validate((valid) => {
               if (valid) {
                    this.$store.dispatch('activeManage/addManage',this.ruleForm).then((res)=>{     

                          this.$store.commit('activeManage/addList',res.data)
                          ElMessage.success('提交成功')
                          this.dialogVisible=false;
                   })
               } else {
                  console.log('error submit!')
                  return false
               }
               })
          },
          submitForm2(formEl){
               if (!formEl) return
               formEl.validate((valid) => {
               if (valid) {
                // console.log(this.id);
                    this.$store.dispatch('activeManage/updataList',{id:this.id,payload:this.ruleForm}).then((res)=>{
                    this.$store.commit('activeManage/setList',res.data)
                    ElMessage.success('更新成功')
                    this.dialogVisible=false;
                 })
               } else {
                  console.log('error submit!')
                  return false
               }
               })
          },
          resetForm(formEl){
                if (!formEl) return
                formEl.resetFields()
         },
        //  handleSelect(houseuse){
        //     return this.ruleForm.houseuse=houseuse
        //  }
    },
    computed:{
      tableData(){
           return this.$store.state.activeManage.list
        },
     }
    
 }

</script>

<style lang="scss" scoped>
  .all{
    width: 1000px;
    margin-left: 100px;
    margin: 20px auto;
    h3{
        margin-top: 15px;
        margin-left: 5px;
    }
  }
  .box1{
    border: 1px solid #ccc;
    height: 80px;
    margin-top: 15px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .classInput{
    width: 250px;
  }
  h5{
    margin-top: 15px;
    margin-left: 5px;
  }
  .box2{
    margin-top: 30px;
    border: 1px solid #ccc;
    .boxchildren{
      margin-left: 800px;
  }
  }
  .el-pagination{
    margin-top: 20px;
    display: flex;
    justify-content: end;
  }
</style>