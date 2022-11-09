<template>
    <div class="common-layout">
    <el-container>
      <el-header>
        <h2>智慧物业管理系统</h2>
          <el-dropdown>
          <span class="el-dropdown-link">
            欢迎:管理员
            <el-icon><ArrowDown /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click="handleClear">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
              <el-menu default-active="dafaultActive" router>
              <el-menu-item index="/home">
                  <el-icon><Bicycle /></el-icon>
                  <span>工作台</span>
                </el-menu-item>
                <el-sub-menu index="/manager">
                  <template #title>
                    <el-icon><Burger /></el-icon>
                    <span>资料管理</span>
                  </template>
                    <el-menu-item index="/cell/Info">
                      <el-icon><Apple /></el-icon>小区信息</el-menu-item>
                    <el-menu-item index="/build/Man">
                      <el-icon><GobletSquare /></el-icon>楼座管理</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="/home">
                  <template #title>
                    <el-icon><Sunny /></el-icon>
                    <span>车行管理</span>
                  </template>
                    <el-menu-item>
                      <el-icon><Moon /></el-icon>区域管理</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="/build/Man">
                  <template #title>
                    <el-icon><Sunny /></el-icon>
                    <span>物业服务</span>
                  </template>
                </el-sub-menu>
                <el-sub-menu index="/cell/Info">
                  <template #title>
                    <el-icon><Sunny /></el-icon>
                    <span>缴费管理</span>
                  </template>
                    <el-menu-item>
                    <el-icon><Moon /></el-icon>账单管理</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="/">
                  <template #title>
                    <el-icon><Sunny /></el-icon>
                    <span>设备管理</span>
                  </template>
                    <el-menu-item>
                      <el-icon><Moon /></el-icon>区域管理</el-menu-item>
                </el-sub-menu>
              </el-menu>
                </el-aside>
                <el-main>
                  <el-breadcrumb separator="/">
                      <el-breadcrumb-item v-for="item in titles" :key="item">{{item}}</el-breadcrumb-item>
                  </el-breadcrumb>
                   <router-view></router-view>
                </el-main>
              </el-container>
            </el-container>
          </div>
</template>

<script>

export default {
  name: 'IndexView',
  computed:{
      dafaultActive(){
        return this.$route.path
      },
       titles(){
        return this.$route.meta && this.$route.meta.titles || []
       },
      //  username(){
      //    return this.$store.state.users.username
      //  }
     },
     methods:{
      handleClear(){
          this.$store.commit('users/clearToken')
          window.location.href='/login'
      }
     }
}
</script>
<style scoped>
  .el-header{
    background:#333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:antiquewhite
  }
  .el-header span{
    color:antiquewhite
  }
  .el-aside{
    background: #fff;
    height: calc(100vh);
  }
   .el-dropdown-link{
  display: flex;
  align-items: center;
} 
.el-menu, .el-menu-item{
  background: #fff;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.el-main{
  background: #fff;
}
</style>
