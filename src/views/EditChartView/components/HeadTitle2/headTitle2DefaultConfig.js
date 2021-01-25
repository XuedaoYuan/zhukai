const headTitle2DefaultConfig = {
  x: 180,
  y: 0,
  w: 60,
  h: 6,
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
  componentName: 'HeadTitle2',
  componentAliasName: '标题2',
  componentConfig: {
    // 标题的配置
    titleShowStatus: true,
    titleLabel: '基金预算情况',
    titleColor: 'rgb(83, 226, 255)',
    titleFontSize: 18,
    titleFamily: 'sans-serif,Microsoft YaHei',
    titleTextAlign: 'center',
    titleFontWeight: 'normal'
  }
};

export default headTitle2DefaultConfig;
