const pie2DefaultConfig = {
  x: 180,
  y: 0,
  w: 60,
  h: 36,
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
  componentName: 'Pie2',
  componentAliasName: '饼图2',
  componentConfig: {
    // 标题的配置
    titleLabel: '标题',
    titleColor: 'rgb(83, 226, 255)',
    titleFontSize: 18,
    titleFamily: 'sans-serif,Microsoft YaHei',
    titleTextAlign: 'left',
    titleFontWeight: 'normal',
    titleShowStatus: true,

    // 注释的配置
    noteLabel: '注释',
    noteColor: '#fff',
    noteFontSize: 16,
    noteFamily: 'sans-serif,Microsoft YaHei',
    noteTextAlign: 'left',
    noteFontWeight: 'normal',
    noteShowStatus: false,

    // 标签栏配置
    tabsShow: false,
    tabSlidePeriod: 60, // 轮播间隔 单位秒
    tabActiveIndex: 0, // 当前高亮的标签
    tabKey: 'test', // 用于查询的key
    tabs: [
      { label: '标签1', value: '1' },
      { label: '标签2', value: '2' },
      { label: '标签3', value: '3' }
    ],

    // 环形图注释1
    annotation1Show: true,
    annotation1Label: '环形图注释1',
    annotation1Color: '#5ab3fe',
    annotation1FontSize: 14,
    annotation1Fontfamily: 'sans-serif,Microsoft YaHei',

    // 环形图注释2
    annotation2Show: true,
    annotation2Label: '环形图注释2',
    annotation2Color: '#5ab3fe',
    annotation2FontSize: 14,
    annotation2Fontfamily: 'sans-serif,Microsoft YaHei',

    // 数据源配置
    data: {
      businessType: '静态数据', // 指标库导入、静态数据、自定义API
      /* 指标库导入 */
      businessDomain: '', // 业务域
      businessIndexSet: '', // 指标集
      businessX: '', // x 轴字段
      businessY: '', // y 轴字段
      businessParamList: [{ key: '', value: '' }],
      /* 静态数据 */
      staticData: JSON.stringify(
        [
          { value: 335, name: '主指标1' },
          { value: 310, name: '主指标2' },
          { value: 234, name: '主指标3' }
        ],
        null,
        2
      ), // //  Array or Map 序列化的字符串
      /* 自定义API */
      apiUrl: '',
      apiUrlParamList: [{ key: '', value: '' }]
    },
    chartOption: {}
  }
};

export default pie2DefaultConfig;
