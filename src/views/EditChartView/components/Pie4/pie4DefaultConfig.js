const pie4DefaultConfig = {
  x: 188,
  y: 0,
  w: 52,
  h: 36,
  i: 0,
  static: true,
  lock: false,
  /* 组件的类型，主要标明组件的用途，比如说是标题、导航、按钮、日期、图表、地图等。需要一个枚举类。
          根据不同的类型还要存储不同结构的数据 */
  type: 'pie',
  moduleId: 'dc63cff8682349218e0fdf78fbe9647g',
  /* 业务类型，可用于筛选，不一定要 */
  businessType: '',
  /* 业务主题， 同上 */
  businessTheme: '',
  // 栅格对应的组件名字，必须是已经注册的组件，而且必须唯一
  componentName: 'Pie4',
  componentAliasName: '饼图4',
  componentConfig: {
    // 图的系列name
    seriesName: '投诉举报情况',
    // 图例标题配置
    titleColor: '#FFFFFF',
    titleFontSize: 12,
    titleFontFamily: 'sans-serif,Microsoft YaHei',
    // 图例值的配置
    valueColor: '#FFFFFF',
    valueFontSize: 16,
    valueFontFamily: 'sans-serif,Microsoft YaHei',

    chartOption: {},
    // 数据源配置
    data: {
      businessType: '静态数据', // 指标库导入、静态数据、自定义API
      /* 指标库导入 */
      businessDomain: '', // 业务域
      businessIndexSet: '', // 指标集
      businessX: '', // x 轴字段
      businessYList: [], // y轴字段多选
      fieldList: [], // 多选字段
      businessParamList: [{ key: '', value: '' }],
      /* 静态数据 */
      staticData: JSON.stringify(
        [
          { value: 35, name: '医师药师类', unit: '个' },
          { value: 30, name: '医疗机构类', unit: '个' },
          { value: 23, name: '经办类', unit: '个' },
          { value: 13, name: '就诊满意度类', unit: '个' },
          { value: 15, name: '欺诈骗保行为类', unit: '个' },
          { value: 15, name: '其它类', unit: '个' }
        ],
        null,
        2
      ), // //  Array or Map 序列化的字符串
      /* 自定义API */
      apiUrl: '',
      apiUrlParamList: [{ key: '', value: '' }]
    }
  }
};

export default pie4DefaultConfig;
