/* =======注意： 是 >>>初始<<< 配置项 */
/* 对于所有组件的初始配置项, 也就是默认值 */
import bar1DefaultConfig from '@/views/EditChartView/components/Bar1/bar1DefaultConfig.js';
import line1DefaultConfig from '@/views/EditChartView/components/Line1/line1DefaultConfig.js';
import pie1DefaultConfig from '@/views/EditChartView/components/Pie1/pie1DefaultConfig.js';
import chinaMap1DefaultConfig from '@/views/EditChartView/components/ChinaMap1/chinaMap1DefaultConfig.js';
import map1DefaultConfig from '@/views/EditChartView/components/Map1/map1DefaultConfig.js';
import pie2DefaultConfig from '@/views/EditChartView/components/Pie2/pie2DefaultConfig.js';
import line2DefaultConfig from "@/views/EditChartView/components/Line2/line2DefaultConfig.js"
import headTitle1DefaultConfig from "@/views/EditChartView/components/HeadTitle1/headTitle1DefaultConfig.js"
const COMPONENT_CONFIG = {
  // 标题1的配置项
  title1: {
    x: 60,
    y: 0,
    w: 120, // w和col-num有关
    h: 3, // h和row-height有关
    i: '',
    static: true,
    lock: false,
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
      fontFamily: 'sans-serif,Microsoft YaHei',
      fontWeight: 'normal',
      showStatus: true,
    }
  },
  testLink: {
    x: 180,
    y: 2,
    w: 60, // w和col-num有关
    h: 8, // h和row-height有关
    i: '',
    type: '',
    static: true,
    businessType: '',
    businessTheme: '',
    // 栅格对应的组件名字，必须是已经注册的组件，而且必须唯一
    componentName: 'TestLink',
    // 组件的中文名
    componentAliasName: '测试联动组件',
    componentConfig: {
      title: '测试联动组件',
      linkedListKey: [0]
    }
  },
  datePicker1: {
    x: 185,
    y: 0,
    w: 55,
    h: 6.3,
    i: 0,
    static: true,
    lock: false,
    /* 组件的类型，主要标明组件的用途，比如说是标题、导航、按钮、日期、图表、地图等。需要一个枚举类。
        根据不同的类型还要存储不同结构的数据 */
    type: '',
    /* 业务类型，可用于筛选，不一定要 */
    businessType: '',
    /* 业务主题， 同上 */
    businessTheme: '',
    // 栅格对应的组件名字，必须是已经注册的组件，而且必须唯一
    componentName: 'DatePicker1',
    componentAliasName: '日期选择器1',
    componentConfig: {
      title: '选择日期',
      color: '#e2f8ff',
      fontSize: 14,
      fontFamily: 'sans-serif,Microsoft YaHei',
      fontWeight: 'normal',
      showStatus: true,
    }
  },
  select1: {
    x: 185,
    y: 0,
    w: 55,
    h: 6.3,
    i: 0,
    static: true,
    lock: false,
    /* 组件的类型，主要标明组件的用途，比如说是标题、导航、按钮、日期、图表、地图等。需要一个枚举类。
        根据不同的类型还要存储不同结构的数据 */
    type: '',
    /* 业务类型，可用于筛选，不一定要 */
    businessType: '',
    /* 业务主题， 同上 */
    businessTheme: '',
    // 栅格对应的组件名字，必须是已经注册的组件，而且必须唯一
    componentName: 'Select1',
    componentAliasName: '下拉框',
    componentConfig: {
      title: '选择',
      color: '#fff',
      fontSize: 14,
      fontFamily: 'sans-serif,Microsoft YaHei',
      fontWeight: 'normal',
      showStatus: true,
      data: {
        businessType: '静态数据', // 指标库导入、静态数据、自定义API
        /* 指标库导入 */
        businessDomain: '', // 业务域
        businessIndexSet: '', // 指标集
        businessParamList: [],
        /* 静态数据 */
        staticData: JSON.stringify(
          [
            { label: '1', value: '1' },
            { label: '3', value: '3' }
          ],
          null,
          4
        ), //  Array or Map 序列化的字符串
        /* 自定义API */
        apiUrl: '',
        apiUrlParamList: [{ key: '', value: '' }]
      }
    }
  },
  map1: map1DefaultConfig,
  chinaMap1: chinaMap1DefaultConfig,
  bar1: bar1DefaultConfig,
  line1: line1DefaultConfig,
  pie1: pie1DefaultConfig,
  pie2: pie2DefaultConfig,
  line2: line2DefaultConfig,
  headTitle1: headTitle1DefaultConfig
};

// console.log('line1DefaultConfig ==> ', COMPONENT_CONFIG);
// export default COMPONENT_CONFIG;
export default COMPONENT_CONFIG;
