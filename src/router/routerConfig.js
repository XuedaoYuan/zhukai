import Page404 from '@/views/Page404/Page404.vue';
import Login from '@/views/Login/Login.vue';
import layout from '@/views/layout/layout.vue';
import EditChartView from '@/views/EditChartView';
import { routerForBoard } from './routerForBoard';
const routerConfig = [
  {
    path: '/',
    component: layout,
    children: [
      {
        path: '',
        name: 'Index',
        meta: { title: '首页' },
        component: {
          // 测试用而已
          render: (h) => h('h1', {}, ['首页', h('span', { style: { color: 'red' } }, ['index'])])
        }
      }
    ]
  },
  {
    path: '/test',
    component: layout,
    children: [
      {
        path: '',
        name: 'Test',
        component: () => import(/* webpackChunkName: "test" */ '../views/Test')
      }
    ]
  },
  {
    path: '/',
    name: 'BasicDataManagement',
    component: layout,
    children: [
      {
        path: 'basicDataManagement',
        component: () => import(/* webpackChunkName: "test" */ '../views/basicDataManagement/basicDataManagement'),
        meta: { title: '基础数据管理' }
      },
      {
        path: '/businessDataManagement',
        component: () =>
          import(
            /* webpackChunkName: "businessDataManagement" */ '../views/businessDataManagement/businessDataManagement'
          ),
        meta: { title: '业务数据管理' }
      },
      {
        path: '/externalDataManagement',
        component: () =>
          import(
            /* webpackChunkName: "externalDataManagement" */ '../views/externalDataManagement/externalDataManagement'
          ),
        meta: { title: '外部数据管理' }
      },
      {
        path: '/screeningOfMonitoringIndicators',
        component: () => import('@/views/screeningOfMonitoringIndicators/screeningOfMonitoringIndicators.vue'),
        meta: { title: '监测指标筛选' }
      },
      {
        path: '/listOfTopics',
        component: () => import('@/views/screeningOfMonitoringIndicators/listOfTopics.vue'),
        meta: { title: '主题列表' }
      },
      {
        path: '/theIndexList',
        component: () => import('@/views/screeningOfMonitoringIndicators/theIndexList.vue'),
        meta: { title: '指标列表' }
      },
      {
        path: '/serviceMonitoringManagement',
        component: () => import('@/views/serviceMonitoringManagement/serviceMonitoringManagement.vue'),
        meta: { title: '服务监测' }
      },
      {
        path: '/logQuery',
        component: () => import('@/views/logQuery/logQuery.vue'),
        meta: { title: '日志查询' }
      }
    ]
  }
  // {
  //   path: '/businessDataManagement',
  //   name: 'businessDataManagement',
  //   component: layout,
  //   children: [
  //     {
  //       path: '',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "businessDataManagement" */ '../views/businessDataManagement/businessDataManagement'
  //         )
  //     }
  //   ]
  // },
  // {
  //   path: '/externalDataManagement',
  //   name: 'externalDataManagement',
  //   component: layout,
  //   children: [
  //     {
  //       path: '',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "externalDataManagement" */ '../views/externalDataManagement/externalDataManagement'
  //         )
  //     }
  //   ]
  // },
  // {
  //   path: '/screeningOfMonitoringIndicators',
  //   name: 'screeningOfMonitoringIndicators',
  //   component: layout,
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/screeningOfMonitoringIndicators/screeningOfMonitoringIndicators.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/listOfTopics',
  //   name: 'listOfTopics',
  //   component: layout,
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/screeningOfMonitoringIndicators/listOfTopics.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/theIndexList',
  //   name: 'theIndexList',
  //   component: layout,
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/screeningOfMonitoringIndicators/theIndexList.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/serviceMonitoringManagement',
  //   name: 'serviceMonitoringManagement',
  //   component: layout,
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/serviceMonitoringManagement/serviceMonitoringManagement.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/logQuery',
  //   name: 'logQuery',
  //   component: layout,
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/logQuery/logQuery.vue')
  //     }
  //   ]
  // },
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

const routes = [...routerConfig, ...routerForBoard, ...routerConfigMenuOut];
export default routes;
