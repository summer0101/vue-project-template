import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/**
 * router入口文件只负责管理所有页面的路由
 * 这里将具体的路由下放到各业务模块处理，
 */

/**
 * 可以自行设置默认路由
 * 如添加首页或者404页面
 */
let routers = [
  {
    path: '/',
    meta: {
      title: "vue项目基础模板"
    }
  }
];

/**
 * require.context 实现流程自动化
 * @description 自动遍历业务侧路由
 * @param directory { String } -读取的文件路径
 * @param useSubdirectories { Boolean } -是否遍历文件子目录
 * @param regExp { RegExp } -匹配文件的正则
 */
const routerContext = require.context('./views', true, /_router\.js$/);
routerContext.keys().forEach(route => {
  const routerModule = routerContext(route);
  /**
  * 兼容 import export 和 require module.export 两种规范
  */
  routers = [...routers, ...(routerModule.default || routerModule)]
});

export default new Router({
  mode:'history',
  base:'/vue项目基础模板/',
  routes: routers
});
