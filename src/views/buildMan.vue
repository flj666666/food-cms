<template>
    <div class="all">
           <h3>楼座管理</h3>
           <div class="box1">
            <div>
                房屋用途:
                <!-- <el-tree-select
                    v-model="value"
                    :data="data"
                    :render-after-expand="false"
                    placeholder="请选择"
                    show-checkbox
                    @ente="handleSelect(value)"
                />  -->
                <el-select v-model="value" class="m-2" placeholder="Select">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    @click="handleSelect(value)"
                    />
                </el-select>
            </div>
            <div>
                楼座名称：<el-input v-model="input2" class="classInput" placeholder="请输入" />
            </div>
            <div>
                <el-button type="primary" @click="handleFind">查询</el-button>
                <el-button @click="handleReset">重置</el-button>
            </div>
        </div>
        <div class="box2">
              <h5>楼座列表</h5>
           <div class="boxchildren">
             <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon>新建</el-button>
             <el-button>批量操作</el-button>
           </div>
           <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">

                <el-table-column prop="name" label="楼座名称" width="160">
                  
                </el-table-column>
                <el-table-column prop="houseuse" label="房屋用途" width="160">
                  
                </el-table-column>
                <el-table-column prop="datetime" label="建成日期" width="160">
                  
                </el-table-column>
                <el-table-column prop="cellnum" label="单元数量" width="160">
                  
                </el-table-column>
                <el-table-column prop="housenum" label="楼层数量" width="160">
                  
                </el-table-column>
                <!-- <el-table-column prop="notes" label="备注" width="160"/> -->
                <!-- <el-table-column prop="operate" label="操作" width="160" >  
                </el-table-column> -->
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
         <el-form-item label="楼座名称" prop="name">
            <el-input
            v-model="ruleForm.name"
            type="name"
            autocomplete="off"
            placeholder="请输入"
            />
         </el-form-item>
         <el-form-item label="建成日期" prop="datetime">
                <div class="block">
                <el-date-picker
                    v-model="ruleForm.datetime"
                    type="datetime"
                    placeholder="请输入日期"
                />
                </div>
         </el-form-item>
         <el-form-item label="房屋用途" prop="houseuse">
            <!-- <el-input
            v-model="ruleForm.houseuse"
            type="houseuse"
            autocomplete="off"
            placeholder="请选择"
            /> -->
            <!-- <el-select v-model="ruleForm.houseuse" class="m-2" placeholder="请选择" size="large"> -->
                <el-tree-select
                v-model="ruleForm.houseuse"
                :data="list"
                :render-after-expand="false"
                placeholder="请选择"
                show-checkbox
            />
            <!-- </el-select> -->
         </el-form-item>
         <el-form-item label="楼宇面积" prop="buildarea">
            <el-input
            v-model="ruleForm.buildarea"
            type="buildarea"
            autocomplete="off"
            />
         </el-form-item>
         <el-form-item label="单元数量" prop="cellnum">
            <el-input
            v-model="ruleForm.cellnum"
            type="number"
            autocomplete="off"
            />
         </el-form-item>
         <el-form-item label="楼层数量" prop="housenum">
            <el-input
            v-model="ruleForm.housenum"
            type="number"
            autocomplete="off"
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
        name:'BuildMan',
        data(){
            return{
                total:this.total,
                currentPage:1,
                pagesize:5,
                dialogVisible:false,
                input2:'',
                value:'全部',
                // data:[],
                options:[
                {
                    value: '全部',
                    label: '全部'
                },
                {
                    value: '普通住宅',
                    label: '普通住宅',
                },
                {
                    value: '商业用地',
                    label: '商业用地',
                },
                {
                    value: '商住两用',
                    label: '商住两用',
                },
            ],
            ruleForm:{
               name:'',
               houseuse:'',
               buildarea:'',
               cellnum:'',
               housenum:'',
               datetime:''
            },
            rules: {
               name: [
                  { required: true, message: '请输入楼座名称', trigger: 'blur' }
               ],
               datetime: [
                  { required: true, message: '请输入建成日期', trigger: 'blur' }
               ],
               houseuse: [
                  { required: true, message: '请输入房屋用途', trigger: 'blur' }
               ],
               buildarea: [
                  { required: true, message: '请选择楼宇面积', trigger: 'blur' }
               ],
               cellnum: [
                  { required: true, message: '请选择单元数量', trigger: 'blur' }
               ],
               housenum: [
                  { required: true, message: '请选择楼层数量', trigger: 'blur' }
               ]
            },
            // tableData:[
            //     {
            //         name: 'A座',
            //         houseuse: '普通住宅',
            //         data: '2020/08/09',
            //         cellnum:3,
            //         housenum:5,
            //         // notes:'优质楼盘',
            //         // operate:''
            //     },

            list:[
                { value: '普通住宅',
                  label: '普通住宅',
                },
                {
                    value: '商业用地',
                    label: '商业用地',
                },
                {
                    value: '商住两用',
                    label: '商住两用',
                },
            ]
         }    
    },
    created(){
            this.$store.dispatch('manage/findList').then((res)=>{
                if(res){
                    this.$store.commit('manage/getList',res.data)
                }
                //  console.log("res=============",res.data);
                //   console.log("manage.list=============",this.$store.state.manage.list);
                 this.total = this.$store.state.manage.list.length
            })
        },
    methods:{
        handleSelect(value){
            this.$store.dispatch('manage/findList').then((res)=>{
                if(res.data.filter((v)=>v.houseuse=== value || '全部' === value)){
                    let tableData = res.data.filter((v)=>v.houseuse=== value || '全部' === value)
                 this.$store.commit('manage/getList',tableData)
                }
           })
        },
        handleSizeChange(val){
           this.pagesize=val;
        //    this.currentPage=1
        },
        handleFind(){
            this.$store.dispatch('manage/findList').then((res)=>{
               
                if(res.data.filter((v)=>v.name.includes(this.input2))){
                     let tableData = res.data.filter((v)=>v.name.includes(this.input2))
                     this.$store.commit('manage/getList',tableData)
                     ElMessage.success('查询成功')

                    //  this.tableData = tableData
                    //  console.log(tableData)
                   } 
            })

    //    this.input2 = this.$store.state.manage.list
    //                 .filter((v)=>v.name.includes(this.input2))
    //         if(this.input2){
    //           this.tableData = this.$store.commit('manage/setList',this.input2)
    //         }
            
        },
        handleReset(){
            this.input2=''
        },
        handleEdit(index,row){
            this.dialogVisible=true;
            this.id=row.id
        },
        handleDelete(index,row){
           
            this.$store.dispatch('manage/removeList',row.id).then((res)=>{
                    //   console.log("newList================",res.data);
                    if(res){
                        this.$store.commit('manage/deleteList',index)
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
                //    console.log(this.ruleForm)
                    this.$store.dispatch('manage/addManage',this.ruleForm).then((res)=>{        
                //   this.$store.dispatch('manage/findList')
                //   console.log("findList----------------",this.$store.state.manage.list)     
                          this.$store.commit('manage/addList',res.data)
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
                    this.$store.dispatch('manage/updataList',{id:this.id,payload:this.ruleForm}).then((res)=>{
                    this.$store.commit('manage/setList',res.data)
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
           return this.$store.state.manage.list
            // return []
        },
    //   selectData(){
    //            return this.$store.state.manage.list
    //                 .filter((v)=>v.name.includes(this.ruleForm.name))
    //                 .filter((v)=>v.houseuse=== this.ruleForm.houseuse || '全部' === this.ruleForm.houseuse)
    //           }
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