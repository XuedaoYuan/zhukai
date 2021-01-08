import layout from '@/views/layout/layout.vue';
export const routerForBoard = [
  {
    path: '/board-config-manage',
    redirect: '/board-config-manage/index',
    name: 'BoardConfigManage',
    component: layout,
    children: [
      {
        path: 'index',
        name: 'BoardConfigManageIndex',
        component: () => import('@/views/BoardConfigManage/BoardConfigManage.vue')
      },
      /* 新增大屏 */
      {
        path: 'add',
        name: 'BoardAdd',
        component: () => import('@/views/BoardConfigManage/AddBoard.vue')
      },
      /* 新增模板 */
      {
        path: 'add-template',
        name: 'TemplateAdd',
        component: () => import('@/views/BoardConfigManage/AddTemplate.vue')
      }
    ]
  },
  {
    path: '/edit-chart-view',
    name: 'EditChartView',
    component: () => import('@/views/EditChartView/EditChartView.vue')
  },
  {
    path: '/board-preview',
    name: 'BoardPreview',
    component: () => import('@/views/EditChartView/BoardPreview.vue')
  }
];
