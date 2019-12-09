import Vue from 'vue'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import VueCookie from 'vue-cookie'

//引入公共组件
import "@/components" // 引入全局注册的组件

// 导航守卫
// import guard from '@/utils/guard';

Vue.prototype.$http = axios;
Vue.prototype.$cookie = VueCookie;

// 进入路由前校验
// router.beforeEach((to, from, next) => {
//   guard(to, from, next);
// })

import "element-ui/lib/theme-chalk/index.css"
//引入elementUI
import {
  Button,
  Select,
  Option,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Form,
  FormItem,
  Table,
  TableColumn,
  Menu,
  MenuItem,
  Submenu,
  DatePicker,
  TimeSelect,
  TimePicker,
  Pagination,
  Icon,
  Row,
  Col,
  Upload,
  Cascader,
  MessageBox,
  Message,
  Dialog,
} from "element-ui"
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm

Vue.use(Dialog)
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Pagination)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Cascader)




Vue.prototype.$message = Message;

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
