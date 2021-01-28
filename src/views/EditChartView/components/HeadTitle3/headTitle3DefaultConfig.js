const headTitle3DefaultConfig = {
  x: 180,
  y: 0,
  w: 19,
  h: 6,
  i: 0,
  static: true,
  lock: false,
  /* 组件的类型，主要标明组件的用途，比如说是标题、导航、按钮、日期、图表、地图等。需要一个枚举类。
            根据不同的类型还要存储不同结构的数据 */
  type: 'common',
  /* 业务类型，可用于筛选，不一定要 */
  businessType: '',
  /* 业务主题， 同上 */
  businessTheme: '',
  // 栅格对应的组件名字，必须是已经注册的组件，而且必须唯一
  componentName: 'HeadTitle3',
  componentAliasName: '标题1',
  componentConfig: {
    // 标题的配置
    titleLabel: '医疗服务综合价格指数',
    titleColor: '#0DA2D2',
    titleFontSize: 14,
    titleFamily: 'sans-serif,Microsoft YaHei',
    titleFontWeight: 'normal',
    titleIconShowStatus: true
  }
};

export default headTitle3DefaultConfig;
