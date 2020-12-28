/* =======注意： 是 >>>初始<<< 配置项 */
/* 对于所有组件的初始配置项, 也就是默认值 */
const COMPONENT_CONFIG = {
  // 标题1的配置项
  title1: {
    x: 0,
    y: 0,
    w: 240, // w和col-num有关
    h: 4, // h和row-height有关
    i: '',
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
      fontFamily: 'Microsoft Yahei, sans-serif',
      showStatus: true
    }
  },
  testLink: {
    x: 180,
    y: 2,
    w: 60, // w和col-num有关
    h: 8, // h和row-height有关
    i: '',
    type: '',
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
  }
};
export default COMPONENT_CONFIG;
