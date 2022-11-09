<template>
    <div class="common-layout">
    <el-container>
      <el-header>
        <h2>外卖管理平台</h2>
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
                  <span>首页</span>
                </el-menu-item>
                <el-sub-menu index="/shop">
                  <template #title>
                    <el-icon><Burger /></el-icon>
                    <span>店铺管理</span>
                  </template>
                    <el-menu-item index="/shop/setting">
                      <el-icon><Apple /></el-icon>店铺设置</el-menu-item>
                    <el-menu-item index="/shop/food">
                      <el-icon><GobletSquare /></el-icon>菜品设置</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="/order">
                  <template #title>
                    <el-icon><Sunny /></el-icon>
                    <span>订单管理</span>
                  </template>
                    <el-menu-item index="/order/list">
                      <el-icon><Moon /></el-icon>订单列表</el-menu-item>
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
    background: #f60;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-aside{
    background: #f6c1d4;
    height: calc(100vh);
  }
   .el-dropdown-link{
  display: flex;
  align-items: center;
} 
.el-menu, .el-menu-item{
  background: #f6c1d4;
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
  background: #9ff;
}
</style>
