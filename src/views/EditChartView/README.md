##### 1、大屏编辑的一些文档

1. `component_config.js` 每个组件的默认配置项
2. `BoardPreview.vue` 预览页面
3. `constant.js` 一些常量可以保存在这里
4. 图片的前缀可以使用`process.env.VUE_APP_IMG_HOST`获取。后续再`.env.prod`再维护正式的版本即可
5. `src/views/BoardConfigManage`是大屏配置管理的几个页面
6. `EditChartView.vue` 大屏编辑的主控件

##### 2、大屏和模板的新建、编辑逻辑

主路由都是`/edit-chart-view`,利用参数query来区分

|          | 参数code | url                          |
| -------- | -------- | ---------------------------- |
| 大屏新建 | 无       | `/edit-chart-view`           |
| 大屏编辑 | 有       | `/edit-chart-view?code=xxxx` |

有code 就去后端拿详情的数据, 然后渲染

##### 3、待办

1. ~~保存的时候可能需要用htmltocanvas生成一个图片传上去，这部分已实现。优化的点在于截的图如何变得小一点~~。（已实现）


##### 4、如何新建一个新的组件，举例新建一个Title2组件

1. 在`src/views/EditChartView/components`新建文件夹**Title2**,在文件夹下新建两个组件分别叫做 `Title2.vue`、`Title2Config.vue`。第一个是主组件，第二个是针对这个组件的配置组件
   `Title2.vue`**组件的name必须是Title2**，同时传入针对这个组件的一些配置项，比如标题，颜色居中等，这块自定义。
   `Title2Config.vue`组件的最外层最好是`el-collapse-item`。如果有多个item，用div包裹也不是不可

   ```vue
   <el-collapse-item class="title1-config" title="标题">
   </el-collapse-item>
   ```

   ​

2. 在`src/views/EditChartView/component_config.js`新建一个key，这里保存的是这个组件新增时的默认配置.
   其中**componentName**为这个组件的名字，必须保持一致叫**Title2**。componentAliasName是组建的中文名字， 这个可以自己取名，比如叫 标题2。xy是位置。 wh是宽高，240就是全款，其他值按照比例。h的基数目前默认为**10**，4的话就是40px。不过这要求屏幕的实际宽度和设定的宽度一致， 否则就是按等比例缩放的。
   最主要的是 **componentConfig**， 这是针对这个组件的一些配置项，可以修改。如果是css样式，最好还是遵循camelCase的写法。

   ```js
   {
       x: 0,
       y: 0,
       w: 240, // w和col-num有关
       h: 4, // h和row-height有关
       i: '',
       static: true,
       type: '',
       businessType: '',
       businessTheme: '',
       // 栅格对应的组件名字，必须是已经注册的组件，而且必须唯一
       componentName: 'Title1',
       // 组件的中文名
       componentAliasName: '标题1',
       componentConfig: {
         title: '看板标题',
         color: '#fff',
         textAlign: 'center',
         fontSize: 16,
         fontFamily: 'Microsoft YaHei',
         fontWeight: 'normal',
         showStatus: true
       }
     }
   ```

3. 在 `src/views/EditChartView/EditChartView.vue`编辑页面中，注册这两个组件

   ```js
   components: {
       Title2: () => import('./components/Title2/Title2'),
       Title2Config: () => import('./components/Title2/Title2Config'),
   }
   ```

   其中Config组件需要写到 <el-collapse class="custom-collapse">组件内，比如

   ```html
   <Title2Config v-if="handlingIndex >= 0 && boardConfig.components[handlingIndex].componentName ==='Title2'" :componentConfig="boardConfig.components[handlingIndex].componentConfig" @change="handleTitleConfigChange"></Title2Config>

   ```

   其中需要注册change事件，配置修改时需要同步到 主编辑页面的 `$data.boardConfig`中。

4. 在`src/views/EditChartView/BoardPreview.vue`**预览页面**中注册`Title2`,比如

   ```
   components: {
       Title2: () => import('./components/Title2/Title2')
   }
   ```

   注册即可

5. 剩下的就是侧边栏如何加组件。截图这个组件加到文件夹 `src/views/EditChartView/components/SideBar/imgs`
   在`src/views/EditChartView/components/SideBar/ComponentPopover.vue` 组件中添加img。**这部分后续可能会从后端过来，**只要配置数据库即可。

6. 到此为止基本的一个组件就完成了

7. DatePicker1、Select1等组件的等比例缩放，需要组件自己新建`ResizeObserver`实例，观察父元素的**size**变化， 一旦变化就触发`resize`事件。在编辑页注册了 resize事件，命名叫做`onComponentResize`，定义在`src/views/EditChartView/EditChartViewMixin.js`。通过mixin的方式编辑页和预览页同时要用的

##### 5、组件的data（也就是数据源配置）·

`componentConfig.data`属性里面定义这些内容

**业务类型**`componentConfig.data.businessType`, 有三个值 *指标库导入、静态数据、自定义API*
数据可以先定义好默认的格式一些

```js
{
  data: {
    businessType: '', // 指标库导入、静态数据、自定义API
    /* 指标库导入 */
    businessDomain: '', // 业务域
    businessIndexSet: '', // 指标集
    businessParamList: [{ key: '', value: '' }]
    /* 静态数据 */
    staticData: '', //  Array or Map 序列化的字符串 JSON.stringify(jsonData, null, 2)
    /* 自定义API */
    apiUrl: '',
    apiUrlParamList: [{ key: '', value: '' }]
  }
}
```

