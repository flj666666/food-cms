<template>
    <div class="common-layout">
    <el-container>
      <el-header>
        <h2>智慧物业管理系统</h2>
          <el-dropdown>
          <span class="el-dropdown-link">
            欢迎:{{username}}
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
                <el-sub-menu index="/shop">
                  <template #title>
                    <el-icon><Burger /></el-icon>
                    <span>资料管理</span>
                  </template>
                    <el-menu-item index="/cell/Info">
                      <el-icon><Apple /></el-icon>小区信息</el-menu-item>
                    <el-menu-item index="/build/Man">
                      <el-icon><GobletSquare /></el-icon>楼座管理</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="/order">
                  <template #title>
                    <el-icon><Sunny /></el-icon>
                    <span>车行管理</span>
                  </template>
                    <el-menu-item index="/order/list">
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
    <router-view></router-view>
</template>

<script>

export default {
  name: 'IndexView',
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
