import Vue from 'vue'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import VueCookie from 'vue-cookie'

import '@/components' // 引入全局注册的组件

// 导航守卫
// import guard from '@/utils/guard';

Vue.prototype.$http = axios;
Vue.prototype.$cookie = VueCookie;

// 进入路由前校验
// router.beforeEach((to, from, next) => {
//   guard(to, from, next);
// })


Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
