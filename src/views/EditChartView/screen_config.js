/* 针对一个组件需要一个配套的配置项 */

const config = {
  /* 大屏分辨率 */
  screenRatio: {
    width: 1920,
    height: 1080
  },
  /* 背景 */
  background: {
    // 背景图片，优先级高于背景色
    backgroundImage: 'http://www.sss/xxx.png',
    // 背景色，一个元素就是单色，2个元素就是渐变色 渐变方向从左到右
    backgroundColor: ['#111', '#222']
  },
  // 组件的一些配置选项, 必然是多个组件
  components: [
    {
      /* 组件的类型，主要标明组件的用途，比如说是标题、导航、按钮、日期、图表、地图等。需要一个枚举类。
      根据不同的类型还要存储不同结构的数据 */
      type: '',
      /* 业务类型，可用于筛选，不一定要 */
      businessType: '',
      /* 业务主题， 同上 */
      businessTheme: '',
      /* 栅格位置大小信息 */
      x: 0,
      y: 0,
      w: 0, // w和col-num有关
      h: 0, // h和row-height有关
      /* grid-layout 栅格元素ID */
      gridId: '',
      // 栅格对应的组件名字，必须是已经注册的组件，而且必须唯一
      componentName: '',

      /* 组件配置 */
      // 组件本身的属性  比如标题的title color等  这块根据自己的组件自己定义好自己的规则即可
      componentConfig: {}
    }
  ]
};
