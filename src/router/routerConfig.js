import Page404 from '@/views/Page404/Page404.vue';
import Login from '@/views/Login/Login.vue';
import layout from '@/views/layout/layout.vue';
const routerConfig = [
  {
    path: '/',
    name: 'Index',
    component: {
      // 测试用而已
      render: (h) => h('h1', {}, ['首页', h('span', { style: { color: 'red' } }, ['index'])])
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: layout,
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "test" */ '../views/Test')
      }
    ]
  }
];
const routerConfigMenuOut = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {}
  },
  {
    path: '*',
    component: Page404
  }
];

const routes = [...routerConfig, ...routerConfigMenuOut];
export default routes;
