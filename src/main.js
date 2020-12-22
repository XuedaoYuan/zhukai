import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/common.styl';

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
  MessageBox
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
// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
