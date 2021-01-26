import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import echarts from './plugins/echarts';
/* 公共样式 */
import './styles/common.styl';
import './styles/custom-chart.styl';
/* 全局自定义指令 */
import '@/directives/index.js';

/* 全局过滤器 */
import * as filters from '@/filters';
for (let filter in filters) {
  if (Object.hasOwnProperty.call(filters, filter)) {
    Vue.filter(filter, filters[filter]);
  }
}

Vue.config.productionTip = false;

Vue.prototype.$eventBus = new Vue();

import {
  Button,
  Pagination,
  Dialog,
  Input,
  Table,
  TableColumn,
  Form,
  FormItem,
  Loading,
  Message,
  MessageBox,
  Col,
  Row,
  Select,
  Option,
  Tabs,
  TabPane,
  Tag
} from 'element-ui';
Vue.prototype.$ELEMENT = { size: 'mini', zIndex: 3000 };
Vue.use(Button);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Col);
Vue.use(Row);
Vue.use(Select);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Option);
Vue.use(Loading.directive);

// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.use(echarts);

Vue.config.errorHandler = function(err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
  console.log('%c ==================>>>>>>error start<<<<<<=====================', 'color: red');
  console.error(err);
  console.log(vm);
  console.warn(info);
  console.log('%c ==================>>>>>>error start<<<<<<=====================', 'color: red');
};

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
