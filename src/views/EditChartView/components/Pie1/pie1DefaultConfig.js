const pie1DefaultConfig = {
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
  componentName: 'Pie1',
  componentAliasName: '饼图1',
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
    // 数据源配置
    data: {
      businessType: '', // 指标库导入、静态数据、自定义API
      /* 指标库导入 */
      businessDomain: '', // 业务域
      businessIndexSet: '', // 指标集
      businessParamList: [{ key: '', value: '' }],
      /* 静态数据 */
      staticData: JSON.stringify([
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ], null, 2), /* JSON.stringify(
        [
          { label: '1', value: '1' },
          { label: '3', value: '3' }
        ],
        null,
        4
      ) */ //  Array or Map 序列化的字符串
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
      bar1StyleColor: 'rgb(239, 187, 76)',
      bar2StyleColor: 'rgb(121, 212, 255)'
    }
  }
};

export default pie1DefaultConfig;
