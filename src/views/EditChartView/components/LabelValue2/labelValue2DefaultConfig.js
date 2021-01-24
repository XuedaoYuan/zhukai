const labelValue1DefaultConfig = {
  x: 222,
  y: 0,
  w: 18,
  h: 10,
  i: 0,
  static: true,
  lock: false,
  /* 组件的类型，主要标明组件的用途，比如说是标题、导航、按钮、日期、图表、地图等。需要一个枚举类。
              根据不同的类型还要存储不同结构的数据 */
  type: 'common',
  moduleId: 'dc63cff8682349218e0fdf78fbe9647f',
  /* 业务类型，可用于筛选，不一定要 */
  businessType: '',
  /* 业务主题， 同上 */
  businessTheme: '',
  // 栅格对应的组件名字，必须是已经注册的组件，而且必须唯一
  componentName: 'LabelValue2',
  componentAliasName: '标题与值2',
  componentConfig: {
    // 标题的配置
    titleLabel: '评价数',
    titleColor: 'rgb(255, 255, 255)',
    titleFontSize: 21,
    titleFamily: 'sans-serif,Microsoft YaHei',
    titleFontWeight: 'normal',
    titleTextAlign: 'center',
    titleShowStatus: true,
    // 值的配置
    value: '23456',
    valueColor: '#87E7FF',
    valueFontSize: 36,
    valueFamily: 'sans-serif,Microsoft YaHei',
    valueFontWeight: 'bold',
    valueTextAlign: 'center',
    valueShowStatus: true,
    data: {
      businessType: '静态数据', // 指标库导入、静态数据、自定义API
      /* 指标库导入 */
      businessDomain: '', // 业务域
      businessIndexSet: '', // 指标集
      businessX: '', // x 轴字段
      businessY: '', // y 轴字段
      businessYList: [], // y轴字段多选
      fieldList: [],
      businessParamList: [{ key: '', value: '' }],
      /* 静态数据 */
      staticData: JSON.stringify({ value: 345 }, null, 2), //  Array or Map 序列化的字符串
      /* 自定义API */
      apiUrl: '',
      apiUrlParamList: [{ key: '', value: '' }]
    }
  }
};

export default labelValue1DefaultConfig;
