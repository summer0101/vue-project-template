<template>
  <div class="login_bg">
    <div class="login_box">
      <div class="login_title"></div>
      <div class="loginView">
        <component :is="layout">
          <form>
            <label>
              <span>用户名：</span>
              <el-input
                size="small"
                placeholder="User name"
                v-model="userName"
              ></el-input>
            </label>
            <label>
              <span>密 码：</span>
              <el-input
                size="small"
                placeholder="Password"
                type="password"
                v-model="password"
              ></el-input>
            </label>
            <el-button class="login_btn" type="primary" @click="handleLogin"
              >登录</el-button
            >
          </form>
          <div class="forget">
            <span @click="$router.push({ path: '*' })">忘记密码</span>
          </div>
        </component>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginLayout } from "@/components/layout"

const layout = "login-layout"

export default {
  components: {
    LoginLayout
  },
  data() {
    return {
      layout,
      userName: "",
      password: ""
    }
  },
  computed: {},
  methods: {
    handleLogin() {
      sessionStorage.setItem("username", this.userName)
      this.login({
        userName: this.userName,
        password: this.password
      })
      this.password = ""
    }
  }
}
</script>

<style scoped>
.login_bg {
  width: 100%;
  height: 100%;
}
.login_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
}
.login_title {
  width: 100%;
  height: 166px;
  margin: 0 auto 40px;
}
.loginView {
  width: 350px;
  padding: 35px;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
}
label {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
label span {
  flex-shrink: 0;
  white-space: pre-wrap;
}
.login_btn {
  width: 100%;
}
.forget {
  margin-top: 20px;
  text-align: right;
  color: #999999;
}
.forget span {
  cursor: pointer;
}
.loginView .el-button {
  background: rgb(228, 118, 67);
  border-color: rgb(228, 118, 67);
}
</style>
