<template>
  <div class="register-container">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="80px" label="red" class="register-form">

      <h2 class="title-zc">注册</h2>
      
        <el-form-item label="用户名" prop="email" >
        <el-input v-model.email="form.email" type="text" autocomplete="off" clearable prefix-icon="User"></el-input>
      </el-form-item>
      
     

      <el-form-item label="密码" prop="password" >
        <el-input type="password" v-model="form.password" autocomplete="off" show-password clearable prefix-icon="Lock">
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" >
        <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm2($refs.form)">提交</el-button>
        <el-button type="danger"  @click="resetForm($refs.form)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
   
<script>
import { ElMessage } from 'element-plus';
export default {
  name: 'RegisterView',
  data() {
    return {
      form: {
        email: "",
        password: "",
        checkPass: "",
      },
      rules: {
        email: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的email', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 6, message: '请输入六位数字密码', trigger: 'blur' }
        ],
        checkPass:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 6, message: '请输入六位数字密码', trigger: 'blur' }
        ],

      }
    }
  },
  computed:{
     change(){
      return{
        email: this.form.email,
        password:this.form.password
      }
     }
  },

  methods: {
    submitForm2(formEl) {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          this.$store.dispatch('users/register', this.change).then(() => {
              //    console.log(res.data);
              // // this.$store.cmmito('users/updateToken', res.data.accessToken)
            
            ElMessage.success('注册成功')
            this.$router.push('/')
          }).catch(() => {
            ElMessage.error('注册失败')
          })
          if(this.form.password !== this.form.checkPass){
            ElMessage.error("密码不一致");
          }
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    resetForm(formEl) {
      if (!formEl) return
      formEl.resetFields()      
    },
  },
};
</script>
   
<style scoped>
.register-container {
  background: url(../assets/2.png) no-repeat;
  height: 100vh;
  background-size: 100% 100%;
  background-position: center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

}

.register-form {
  width: 350px;
  margin: 150px auto;
  padding: 30px;
  border-radius: 20px;
}

.title-zc {
  text-align: center;
  color: white;
  margin-bottom: 10px;
}



.el-button {
  padding: 8px 49px
}
</style>
<style>
.register-container .el-form-item__label {
  color: white !important;
}
</style>