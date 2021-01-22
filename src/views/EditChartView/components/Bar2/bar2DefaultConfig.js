

const bar2DefaultConfig = {
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
  componentName: 'Bar2',
  componentAliasName: '柱状图2',
  componentConfig: {
    // 标题的配置
    titleLabel: '标题',
    titleColor: 'rgb(83, 226, 255)',
    titleFontSize: 18,
    titleFamily: 'sans-serif,Microsoft YaHei',
    titleTextAlign: 'left',
    titleFontWeight: 'normal',
    titleShowStatus: true,
    // 副标题
    subTitleLabel: '副标题',
    subTitleColor: '#04c1ff',
    subTitleFontSize: 16,
    subTitleFamily: 'sans-serif,Microsoft YaHei',
    subTitleTextAlign: 'left',
    subTitleFontWeight: 'normal',
    subTitleShowStatus: false,
    // 注释的配置
    noteLabel: '注释',
    noteColor: '#fff',
    noteFontSize: 16,
    noteFamily: 'sans-serif,Microsoft YaHei',
    noteTextAlign: 'left',
    noteFontWeight: 'normal',
    noteShowStatus: false,
    // 缩放比例
    scale: 1,
    // 数据源配置
    data: {
      businessType: '', // 指标库导入、静态数据、自定义API
      /* 指标库导入 */
      businessDomain: '', // 业务域
      businessIndexSet: '', // 指标集
      businessX: '', // x 轴字段
      businessY: '', // y 轴字段
      businessParamList: [{ key: '', value: '' }],
      /* 静态数据 */
      staticData: null, // JSON.stringify(chartData, null, 2), //  Array or Map 序列化的字符串
      /* 自定义API */
      apiUrl: '',
      apiUrlParamList: [{ key: '', value: '' }]
    },
    chartOption: {
      lineSmooth: true, // 曲线 折线
      lineStyleType: 'solid', // 实线solid、虚线dashed
      // 折线的颜色
      lineStyleColorType: 'single', // 单色single、渐变 gradient
      lineStyleColor: '#F0AB4C',
      lineWidth: 2, // 线粗细
      barNum: 12, //  柱状显示数
      barStyleColorType: 'single', // 柱状图的样式
      barBackgroundColorList: ['rgb(239, 187, 76)', 'rgb(121, 212, 255)', 'rgb(186, 144, 255)', 'rgb(239, 155, 149)'],
      // 图例的配置
      legendShow: true,
      legendColor: '#ffffff',
      legendPosition: 'top', // top bottom
      legendFontSize: 12,
      legendFontWeight: 'normal',
      legendFontFamily: 'sans-serif,Microsoft YaHei',
      // x轴的一些配置
      xAxisLabelShow: true,
      xAxisLabelColor: '#5B5D66',
      xAxisLabelFontSize: 12,
      xAxisLabelFontFamily: 'sans-serif,Microsoft YaHei',
      xAxisLineShow: true,
      xAxisLineColor: '#5B5D66',
      xAxisLineWidth: 1,
      // y轴的一些配置
      yAxisLabelShow: true,
      yAxisLabelColor: '#5B5D66',
      yAxisLabelFontSize: 12,
      yAxisLabelFontFamily: 'sans-serif,Microsoft YaHei',
      yAxisLineShow: true,
      yAxisLineColor: '#5B5D66',
      yAxisLineWidth: 1,
      // 浮框
      tooltipShow: true
    }
  }
};

export default bar2DefaultConfig;
