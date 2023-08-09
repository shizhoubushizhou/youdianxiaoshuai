<template>
  <div class="home">
    <el-container>
      <el-aside :width="isCollapse?'60px':'200px'">

        <el-menu active-text-color="#669df3" :collapse="isCollapse" router background-color="#364252" class="el-menu-vertical-demo"
          :default-active="route.path" text-color="#fff" >

          <el-menu-item index="/management">
            <el-icon>
              <Platform />
            </el-icon>
            <span>商品管理</span>
          </el-menu-item>
          <el-menu-item index="/goods">
            <el-icon>
              <Grid />
            </el-icon>
            <span>商品列表</span>
          </el-menu-item>
          <el-menu-item index="/card">
            <el-icon>
              <Postcard />
            </el-icon>
            <span>购物车列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="left">
            
            <el-icon v-if="!isCollapse" @click="isCollapse = true">
              <Fold />
            </el-icon>
            <el-icon v-else @click="isCollapse = false">
              <Expand />
            </el-icon>


            <el-breadcrumb separator-icon="ArrowRight">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{ route.meta.title }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="right">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                {{ username }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'


let route = useRoute()
let router = useRouter()
let username = localStorage.getItem('token')
const isCollapse = ref(false)


const logout = () => {
  localStorage.removeItem('token')
  router.go()
}

</script>

<style lang="scss" scoped>
.home {
  height: 100%;

  .el-container {
    height: 100%;

    .el-container {
      .el-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          display: flex;
          .el-breadcrumb{
            margin-left: 20px;
          }
        }
      }
    }

    .el-menu {
      height: 100%;
    }
  }


}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
