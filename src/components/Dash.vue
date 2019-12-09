<template>
  <component :is="layout">
    <template #header>
      <div class="userinfo">
        <el-menu mode="horizontal">
          <el-submenu index="2">
            <template slot="title">{{ userName }}，您好，欢迎使用！</template>
            <el-menu-item index="" @click="toUserCenter">个人中心</el-menu-item>
            <el-menu-item index="" @click="handleLogout">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </template>
    <template #content>
      <router-view></router-view>
    </template>
  </component>
</template>

<script>
import { DefaultLayout } from "@/components/layout"

export default {
  components: {
    DefaultLayout
  },
  data() {
    return {
      layout: `default-layout`,
      userName: ""
    }
  },
  methods: {
    handleLogout() {
      this.logout()
    },
    toUserCenter() {
      //进入新的路由
      let path = "/userinfo"
      this.$router.push({
        path: path
      })
    }
  },
  created() {
    this.userName = sessionStorage.getItem("username")
  }
}
</script>

<style>
.el-menu--horizontal,
.el-submenu__title:hover {
  background: rgb(49, 53, 65) !important;
}
.el-submenu__title,
.el-submenu__title i {
  color: #ffffff !important;
  font-weight: 700;
}
.userinfo .el-menu.el-menu--horizontal,
.userinfo .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  border-bottom: none;
}
</style>
