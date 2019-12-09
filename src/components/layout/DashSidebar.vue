<template>
  <div class="dash__nav">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#313541"
      :unique-opened="true"
      text-color="#bdbdbd"
      active-text-color="#ffffff"
      :router="true"
    >
      <template v-for="(item, index) in navList">
        <el-submenu
          :index="item.routerLink"
          :key="index"
          v-if="item.children.length"
        >
          <template slot="title">{{ item.name }}</template>
          <template v-for="(itemc, i) in item.children">
            <el-menu-item :index="itemc.routerLink" :key="i">{{
              itemc.name
            }}</el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item :index="item.routerLink" :key="index" v-else>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          name: "示例1",
          routerLink: "examplepage1",
          children: [
            {
              name: "示例代码1-1",
              routerLink: "examplepage1"
            }
          ]
        },
        {
          name: "示例2",
          routerLink: "examplepage2",
          children: [
            {
              name: "示例代码2-1",
              routerLink: "examplepage2"
            }
          ]
        },
        {
          name: "登录",
          routerLink: "login",
          children: []
        }
      ]
    }
  }
}
</script>

<style scoped>
.dash__nav {
  flex: 1;
}

.el-menu {
  border-right: none;
}
</style>
