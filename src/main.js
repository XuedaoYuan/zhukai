import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import echarts from './plugins/echarts';
/* 公共样式 */
import './styles/common.styl';
/* 全局自定义指令 */
import '@/directives/index.js';

Vue.config.productionTip = false;

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
  Tabs,
  TabPane,
  Tag,
  Option,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
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
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(MenuItemGroup);




// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.use(echarts);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
