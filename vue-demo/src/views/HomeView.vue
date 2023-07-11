<template>
  <div class="user">
    <el-container>
      <el-header>
        <el-button type="primary" @click="logout">退出登录</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="/user" router class="el-menu-vertical-demo">
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <location />
                </el-icon>
                <span>分类</span>
              </template>
            </el-sub-menu>
            <el-sub-menu index="/">
              <template #title>
                <el-icon>
                  <location />
                </el-icon>
                <span>用户</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/user">用户管理</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>



          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {Location,} from '@element-plus/icons-vue'



let router = useRouter()



const logout = () => {
  localStorage.removeItem('token');
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.user {
  width: 100%;
  height: 100%;

  .el-container {
    width: 100%;
    height: 100%;

    .el-header {
      display: flex;
      justify-content: right;
      align-items: center;
      background-color: #b3c0d2;
    }

    .el-container {
      height: 100%;

      .el-aside {
        // height: 100%;
        .el-menu{
          height: 100%;
        }
      }

      .el-main {
        padding: 20px;
        height: 100%;
      }
    }
  }


}</style>
