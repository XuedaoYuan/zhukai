const title1DefaultConfig = {
  x: 60,
  y: 0,
  w: 120, // w和col-num有关
  h: 3, // h和row-height有关
  i: '',
  static: true,
  lock: false,
  type: 'common',
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
    showStatus: true
  }
};

export default title1DefaultConfig;
