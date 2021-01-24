const chartData = {
  xAxisData: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
  yAxisData: [
    {
      label: '折线1',
      type: 'line',
      seriesData: [20.0, 4.9, 7.0, 23.2, 25.6, 76.7, 130.6, 102.2]
    },
    {
      label: '折线2',
      type: 'line',
      seriesData: [26, 55.9, 9.0, 26.4, 28.7, 70.7, 15.6, 12.2]
    },
    {
      label: '折线3',
      type: 'line',
      seriesData: [5.0, 4.9, 9.0, 23.2, 25.6, 76.7, 35.6, 62.2]
    },
    {
      label: '折线',
      type: 'line',
      seriesData: [50, 89.2, 67.3, 88.5, 6.3, 10.2, 20.3, 23.4]
    }
  ]
};
const line2DefaultConfig = {
  x: 180,
  y: 0,
  w: 60,
  h: 36,
  i: 0,
  static: true,
  lock: false,
  /* 组件的类型，主要标明组件的用途，比如说是标题、导航、按钮、日期、图表、地图等。需要一个枚举类。
          根据不同的类型还要存储不同结构的数据 */
  type: 'line',
  /* 业务类型，可用于筛选，不一定要 */
  businessType: '',
  /* 业务主题， 同上 */
  businessTheme: '',
  // 栅格对应的组件名字，必须是已经注册的组件，而且必须唯一
  componentName: 'Line2',
  componentAliasName: '折线图2',
  moduleId: '1c62cff8682349218e0fdf78fbe9647f',
  componentConfig: {
    // 标题的配置
    titleLabel: '标题',
    titleColor: 'rgb(83, 226, 255)',
    titleFontSize: 18,
    titleFamily: 'sans-serif,Microsoft YaHei',
    titleTextAlign: 'left',
    titleFontWeight: 'normal',
    titleShowStatus: true,

    // 数据源配置
    data: {
      businessType: '静态数据', // 指标库导入、静态数据、自定义API
      /* 指标库导入 */
      businessDomain: '', // 业务域
      businessIndexSet: '', // 指标集
      businessX: '', // x 轴字段
      businessY: '', // y 轴字段
      businessYList: [], // y轴字段多选
      businessParamList: [{ key: '', value: '' }],
      /* 静态数据 */
      staticData: JSON.stringify(chartData, null, 2), //  Array or Map 序列化的字符串
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
      tooltipShow: true,
      // symbol
      symbol: 'none'
    }
  }
};
export default line2DefaultConfig;
