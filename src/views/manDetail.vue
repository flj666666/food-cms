<template>
    <div class="all">
       <h3>报修详情</h3>
       <div class="box">
         <h5>维修流程</h5>
         <el-steps :active="2" finish-status="success">
            <el-step title="提交维修信息" description="提交成功 2020.09.09 10:12"/>
            <el-step title="审核中" description="物业审核中 2020.09.09 10:12" />
            <el-step title="维修指派" description="指派维修人员" />
            <el-step title="完成维修" description="填写维修记录" />
        </el-steps>
       </div>

       <div class="box1">
          <div class="box1Children">
            <h5>维修信息</h5> <el-button type="primary" @click="handleEdit">编辑</el-button>
          </div>
          <ul>
            <li>
               报修房屋：南航碧桂园小区01栋2单元402
            </li>
            <li>维修项目：水暖-浴霸</li>
            <li>标题：浴霸没有水</li>
            <li>问题描述</li>
            <li>手机号码： 16589000078</li>
            <li>预约日期：2022/09/09</li>
            <li>报修人：蒋锋 住户详情</li>
            <li>提交时间：2019-09-09 10:40</li>
            <li>提交人：林莉莉</li>
          </ul>

       </div>
       <div class="box2">
          <h5>审核</h5>
          <h5>审核意见:</h5>
          <el-input
            v-model="textarea"
            :rows="5"
            type="textarea"
            placeholder="请给出宝贵意见:"
         />
            <el-button type="primary" @click="handlePass">审核通过</el-button>
            <el-button type="danger" @click="handleNoPass">审核不通过</el-button>
            <el-button @click="handleReturn1">返回</el-button>
       </div>

       <!-- 表单提交 -->
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
            <el-form-item label="维修状态" prop="status">
            <el-input
            v-model="ruleForm.status"
            type="status"
            autocomplete="off"
            />
         </el-form-item>
            <el-form-item label="问题附件" prop="results">
                <el-input
                v-model="ruleForm.results"
                type="results"
                autocomplete="off"
                />
            </el-form-item>
            <el-form-item>
                <el-button class="login-button" type="primary" @click="submitForm($refs.ruleFormRef)">提交</el-button>
                <el-button class="login-button" type="primary"  @click="resetForm($refs.ruleFormRef)">重置</el-button>
            <el-button @click="handleReturn">返回</el-button>
            </el-form-item>
        </el-form>
        </el-drawer>
    </div>
</template>

<script>
    import { ElMessage } from 'element-plus';
    export default {
        name:'ManDetail',
        data(){
            return{
                drawer:false,
                textarea:'',
                ruleForm:{
                    houserepair:'',
                    Equip:'',
                    title:'',
                    desc:'',
                    telephone:'',
                    people:'',
                    predata:'',
                    results:'',
                    status:''
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
                ],
                status:
                [
                    { required: true, message: '请输入内容', trigger: 'blur' }
                ]
                },
                }
        },
        methods:{
            handleEdit(){
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
          resetForm(formEl){
                if (!formEl) return
                formEl.resetFields()
         },
          handleReturn(){
            this.drawer=false;
          },
          handlePass(){
             
             this.$store.dispatch('mainteMan/findList').then((res)=>{
                console.log(res.data);
                //  if(res.data.status==='审核通过'){
                //     ElMessage.success('审核通过')
                //  }
             })
             this.$router.push('/mainte/Man')
          },
          handleNoPass(){
             ElMessage.success('审核未通过')
             this.$router.push('/mainte/Man')
          },
          handleReturn1(){
            this.$router.push('/mainte/Man')
          }

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
  .box{
    margin-top: 30px;
    border: 1px solid #ccc;
    h5{
    margin-top: 15px;
    margin-left: 5px;
    }
    .el-steps{
        margin-top: 30px;
    }
  }
  .box1{
    margin-top: 30px;
    border: 1px solid #ccc;
    h5{
    margin-top: 15px;
    margin-left: 5px;
  }
}
.box1Children{
    overflow: hidden;
    h5{
        float: left;
        margin-right: 20px;
    }
    .el-button{
        margin-top: 10px;
        float: left;
    }
}
ul{
    margin-top: 35px;
    display: flex;
    justify-content: space-evenly;
    flex-wrap:wrap;
    list-style: none;
    li{
       width: 280px;
       height: 60px;
    //    border: 1px solid #000;
       list-style: none;
    }
}
.box2{
    margin-top: 30px;
    border: 1px solid #ccc;
    h5{
    margin-top: 15px;
    margin-left: 5px;
    margin-bottom: 10px;
    }
    .el-button{
        margin-top: 25px;
        margin-left: 20px;
    }
}



</style>