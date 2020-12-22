import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routerConfig';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  // 添加需要的逻辑  比如keep-alive控制， token判断等
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});

export default router;
