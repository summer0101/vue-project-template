<template>
  <div class="dash_header">
    <div class="toolbar">
      <a href="#" class="logo">
        <img src="../../assets/images/logo.jpeg" />
        <span>管理后台模板</span>
      </a>
      <slot name="header" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.dash_header {
  flex: 1;
  display: flex;
  background: #1d2127;
}

.logo {
  display: flex;
  height: 70px;
  align-items: center;
  position: relative;
  margin: 0;
  padding-left: 35px;
  box-sizing: border-box;
  color: #fff;
  font-size: 20px;
}

.logo img {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}

.toolbar {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
}
</style>
