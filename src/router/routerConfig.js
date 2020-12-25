import Page404 from '@/views/Page404/Page404.vue';
import Login from '@/views/Login/Login.vue';
import layout from '@/views/layout/layout.vue';
import EditChartView from '@/views/EditChartView';
const routerConfig = [
  {
    path: '/',
    name: 'Index',
    component: layout,
    children: [
      {
        path: '',
        component: {
          // 测试用而已
          render: (h) => h('h1', {}, ['首页', h('span', { style: { color: 'red' } }, ['index'])])
        }
      }
    ]
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
  },
  {
    path: '/basicDataManagement',
    name: 'BasicDataManagement',
    component: layout,
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "test" */ '../views/basicDataManagement/basicDataManagement')
      }
    ]
  },
  {
    path: '/businessDataManagement',
    name: 'businessDataManagement',
    component: layout,
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "businessDataManagement" */ '../views/businessDataManagement/businessDataManagement')
      }
    ]
  },
  {
    path: '/externalDataManagement',
    name: 'externalDataManagement',
    component: layout,
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "externalDataManagement" */ '../views/externalDataManagement/externalDataManagement')
      }
    ]
  },
  {
    path: '/screeningOfMonitoringIndicators',
    name: 'screeningOfMonitoringIndicators',
    component: layout,
    children: [
      {
        path: '',
        component: () => import('@/views/screeningOfMonitoringIndicators/screeningOfMonitoringIndicators.vue')
      }
    ]
  },
  {
    path: '/listOfTopics',
    name: 'listOfTopics',
    component: layout,
    children: [
      {
        path: '',
        component: () => import('@/views/screeningOfMonitoringIndicators/listOfTopics.vue')
      }
    ]
  },
  {
    path: '/theIndexList',
    name: 'theIndexList',
    component: layout,
    children: [
      {
        path: '',
        component: () => import('@/views/screeningOfMonitoringIndicators/theIndexList.vue')
      }
    ]
  },
  {
    path: '/serviceMonitoringManagement',
    name: 'serviceMonitoringManagement',
    component: layout,
    children: [
      {
        path: '',
        component: () => import('@/views/serviceMonitoringManagement/serviceMonitoringManagement.vue')
      }
    ]
  },
  {
    path: '/logQuery',
    name: 'logQuery',
    component: layout,
    children: [
      {
        path: '',
        component: () => import('@/views/logQuery/logQuery.vue')
      }
    ]
  },
  {

    path: '/edit-chart-view',
    name: 'EditChartView',
    component: EditChartView
    /* children: [
      {
        path: '',
        component: EditChartView,
        meta: {}
      }
    ] */
  },
  {
    path: '/TestVueGridLayout',
    name: 'TestVueGridLayout',
    component: () => import('@/views/EditChartView/TestVueGridLayout.vue')
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
