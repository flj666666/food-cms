<template>
    <div class="all">
           <h3>报修管理</h3>
           <div class="box1">
            <div>
                报修状态:
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
                <div class="block">
                预约日期：
                <el-date-picker
                    v-model="ruleForm.predata"
                    type="predata"
                />
                </div>
            </div>
            <div>
                <el-button type="primary" @click="handleFind">查询</el-button>
                <el-button @click="handleReset">重置</el-button>
            </div>
        </div>
        <div class="box2">
              <h5>报修列表</h5>
           <div class="boxchildren">
             <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon>新建</el-button>
             <el-button>批量操作</el-button>
           </div>
           <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">

                <el-table-column prop="houserepair" label="报修房屋">

                </el-table-column>
                <el-table-column prop="Equip" label="维修项目">

                </el-table-column>
                <el-table-column prop="title" label="标题">
                </el-table-column>
                <el-table-column prop="people" label="报修人">
                </el-table-column>
                <el-table-column prop="predata" label="预约日期">
                </el-table-column>
                <el-table-column prop="status" label="维修状态">
                  
                </el-table-column>
                <el-table-column label="操作" width="200">
                  <template  #default="scope">
                    <el-button size="small" @click="handleAudit(scope.$index, scope.row)">审核</el-button>
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
           <!-- <el-dialog
         v-model="dialogVisible"
         title="基础信息"
         width="30%"
        >
     </el-dialog> -->

     <el-drawer 
     v-model="drawer" 
     title="I am the title" 
     :with-header="false"
     >
       <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="80px"
         >
         <el-form-item label="关联房屋" prop="houserepair">
            <el-input
            v-model="ruleForm.houserepair"
            type="houserepair"
            autocomplete="off"
            placeholder="请输入"
            />
         </el-form-item>
         <el-form-item label="维修项目" prop="Equip">
            <el-input
            v-model="ruleForm.Equip"
            type="Equip"
            autocomplete="off"
            placeholder="请输入"
            />
         </el-form-item>
         <el-form-item label="标题" prop="title">
                <!-- <el-tree-select
                v-model="ruleForm.Equipapp"
                :data="Equipapp"
                :render-after-expand="false"
                placeholder="请选择"
                show-checkbox
            /> -->
            <el-input
            v-model="ruleForm.title"
            type="title"
            autocomplete="off"
            placeholder="请输入"
            />
         </el-form-item>
         <el-form-item label="问题描述" prop="desc">
            <el-input
            v-model="ruleForm.desc"
            type="desc"
            autocomplete="off"
            />
         </el-form-item>
         <el-form-item label="手机号码" prop="telephone">
            <el-input
            v-model="ruleForm.telephone"
            type="telephone"
            autocomplete="off"
            />
         </el-form-item>
         <el-form-item label="维修住户" prop="people">
            <el-input
            v-model="ruleForm.people"
            type="people"
            autocomplete="off"
            />
         </el-form-item>
         <el-form-item label="预约日期" prop="predata">
            <div class="block">
                <el-date-picker
                    v-model="ruleForm.predata"
                    type="predata"
                    placeholder="请输入日期"
                />
                </div>
         </el-form-item>
         <el-form-item label="问题附件" prop="results">
            <el-input
            v-model="ruleForm.results"
            type="results"
            autocomplete="off"
            />
         </el-form-item>
         <el-form-item>
            <el-button class="login-button" type="primary" @click="submitForm($refs.ruleFormRef)">添加</el-button>
            <el-button class="login-button" type="primary" @click="submitForm2($refs.ruleFormRef)">更新</el-button>
          <el-button @click="resetForm($refs.ruleFormRef)">重置</el-button>
         </el-form-item>
     </el-form>
    </el-drawer>

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
        name:'BuildMan',
        data(){
            return{
                total:this.total,
                currentPage:1,
                pagesize:5,
                drawer:false,
                input2:'',
                value:'审核中',
                // data:[],
                options:[
                {
                    value: '审核中',
                    label: '审核中'
                },
                {
                    value: '审核通过',
                    label: '审核通过',
                },
                {
                    value: '审核未通过',
                    label: '审核未通过',
                }
            ],
            ruleForm:{
               houserepair:'',
               Equip:'',
               title:'',
               desc:'',
               telephone:'',
               people:'',
               predata:'',
               results:'',
            },
            rules: {
                houserepair: [
                  { required: true, message: '请输入内容', trigger: 'blur' }
               ],
               Equip: [
                  { required: true, message: '请输入内容', trigger: 'blur' }
               ],
               title: [
                  { required: true, message: '请输入内容', trigger: 'blur' }
               ],
               Area: [
                  { required: true, message: '请输入内容', trigger: 'blur' }
               ],
               telephone: [
                  { required: true, message: '请输入内容', trigger: 'blur' }
               ],
               people: [
                  { required: true, message: '请输入内容', trigger: 'blur' }
               ],
               desc: [
                  { required: true, message: '请输入内容', trigger: 'blur' }
               ],
               results: [
                  { required: true, message: '请输入内容', trigger: 'blur' }
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
            this.$store.dispatch('mainteMan/findList').then((res)=>{
                if(res){
                    this.$store.commit('mainteMan/getList',res.data)
                }
                //  console.log("res=============",res.data);
                //   console.log("mainteMan.list=============",this.$store.state.mainteMan.list);
                 this.total = this.$store.state.mainteMan.list.length
            })
        },
    methods:{
        //审核
        handleAudit(){
              this.$router.push('/man/Detail')
            // window.location.href = '/manDetail'
        },
        handleSelect(value){
            this.$store.dispatch('mainteMan/findList').then((res)=>{
                if(res.data.filter((v)=>v.status=== value || '审核中' === value)){
                    let tableData = res.data.filter((v)=>v.status=== value || '审核中' === value)
                 this.$store.commit('mainteMan/getList',tableData)
                }
           })
        },
        handleSizeChange(val){
           this.pagesize=val;
           this.page=1
        },
        handleFind(){
            this.$store.dispatch('mainteMan/findList').then((res)=>{
               
                if(res.data.filter((v)=>v.predata.includes(this.predata))){
                     let tableData = res.data.filter((v)=>v.predata.includes(this.predata))
                     this.$store.commit('mainteMan/getList',tableData)
                     ElMessage.success('查询成功')

                    //  this.tableData = tableData
                    //  console.log(tableData)
                   } 
            })

    //    this.input2 = this.$store.state.mainteMan.list
    //                 .filter((v)=>v.name.includes(this.input2))
    //         if(this.input2){
    //           this.tableData = this.$store.commit('mainteMan/setList',this.input2)
    //         }
            
        },
        handleReset(){
            this.input=''
        },
        handleEdit(index,row){
            this.drawer=true;
            this.id=row.id
        },
        handleDelete(index,row){
            
            this.$store.dispatch('mainteMan/removeList',row.id).then((res)=>{
                    if(res){
                        this.$store.commit('mainteMan/deleteList',index)
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
           this.drawer=true;
        },
        submitForm(formEl){
               if (!formEl) return
               formEl.validate((valid) => {
               if (valid) {
                    this.$store.dispatch('mainteMan/addManage',this.ruleForm).then((res)=>{        
                          this.$store.commit('mainteMan/addList',res.data)
                          ElMessage.success('添加成功')
                          this.drawer=false;
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
                    this.$store.dispatch('mainteMan/updataList',{id:this.id,payload:this.ruleForm}).then((res)=>{
                    this.$store.commit('mainteMan/setList',res.data)
                    ElMessage.success('更新成功')
                    this.drawer=false;
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
    },
    computed:{
      tableData(){
           return this.$store.state.mainteMan.list
            // return []
        },
    //   selectData(){
    //            return this.$store.state.mainteMan.list
    //                 .filter((v)=>v.name.includes(this.ruleForm.name))
    //                 .filter((v)=>v.houseuse=== this.ruleForm.houseuse || '全部' === this.ruleForm.houseuse)
    //           }
     }
    
 }

</script>

<style scoped lang="scss">
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