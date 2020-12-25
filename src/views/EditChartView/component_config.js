/* =======注意： 是 >>>初始<<< 配置项 */
/* 对于所有组件的初始配置项, 也就是默认值 */
const COMPONENT_CONFIG = {
  // 标题1的配置项
  title1: {
    x: 0,
    y: 0,
    w: 240, // w和col-num有关
    h: 4, // h和row-height有关
    i: 'title1',
    type: '',
    businessType: '',
    businessTheme: '',
    // 栅格对应的组件名字，必须是已经注册的组件，而且必须唯一
    componentName: 'Title1',
    componentConfig: {
      title: '看板标题',
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
      fontFamily: 'Microsoft Yahei, sans-serif',
      showStatus: true
    }
  }
};
export default COMPONENT_CONFIG;
