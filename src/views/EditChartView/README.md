##### 大屏编辑的一些文档

1. `component_config.js` 每个组件的默认配置项
2. `BoardPreview.vue` 预览页面
3. `constant.js` 一些常量可以保存在这里
4. 图片的前缀可以使用`process.env.VUE_APP_IMG_HOST`获取。因为这个后续会变
5. `src/views/BoardConfigManage`是大屏配置管理的几个页面
6. `EditChartView.vue` 大屏编辑的主控件

##### 大屏和模板的新建、编辑逻辑

主路由都是`/edit-chart-view`,利用参数来区分

|          | 参数type | 参数code | url                                        |
| -------- | -------- | -------- | ------------------------------------------ |
| 大屏新建 | board    | 无       | `/edit-chart-view?type=board`              |
| 大屏编辑 | board    | 有       | `/edit-chart-view?type=board&code=xxxx`    |
| 模板新建 | template | 无       | `/edit-chart-view?type=template`           |
| 模板编辑 | template | 有       | `/edit-chart-view?type=template&code=xxxx` |

根据不同的type可能需要对保存和提交审核做一些区分

##### 待办

1. 保存的时候可能需要用htmltocanvas生成一个图片传上去



