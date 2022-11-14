<template>
    <div class="all">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="60px"
    >
    <el-form-item  prop="email">
        
        <el-input v-model="ruleForm.email" type="text" autocomplete="off" placeholder="用户名" clearable prefix-icon="User"
        >   
        </el-input>
      </el-form-item>
      <el-form-item  prop="password">
        <el-input v-model="ruleForm.password" type="text" autocomplete="off" show-password placeholder="密码" clearable prefix-icon="Lock" />
      </el-form-item>
      <el-form-item>
        <el-radio-group  class="ml-4">
      <el-radio label="1" size="large">自动登录</el-radio>
    </el-radio-group>
      </el-form-item>
      <el-form-item >
        <el-button type="info" class="login-button" @click="submitForm($refs.ruleFormRef)">登录</el-button>
      </el-form-item>
      <el-form-item >
        <el-button type="success" class="login-button">注册</el-button>
      </el-form-item>
    </el-form>
      </div>

</template>

<script>
import {ElMessage} from 'element-plus'
   export default {
       name:'LoginView',
       data(){
        return {
          ruleForm:{
            email:'',
            password:'',
          },
          rules:{
            email:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的email', trigger: 'blur' }
            ],
            password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 6, message: '请输入六位数字密码', trigger: 'blur' }        
            ],
          }
        }
       },
       methods:{
        submitForm(formEl){
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          this.$store.dispatch('users/login', this.ruleForm).then((res)=>{
            this.$store.commit('users/updateToken', res.data.accessToken)
             ElMessage.success('登录成功')
            this.$router.push('/')
         }).catch(()=>{
            ElMessage.error('登录失败')
         })
        } else {
          console.log('error submit!')
          return false
        }                       
      })
    }, 
        
       }
   }
</script>

<style scoped>

.all{background: url(../assets/2.png) no-repeat ;height: 100vh; background-size:100% 100%;background-position: center center;background-size: cover;display: flex;align-items: center;justify-content: center;}
.el-form{width: 500px;margin:0 auto;}
.login-button{width: 100%;}
.el-radio{color: white;}

</style>