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
    static: true,
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
    static: true,
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
  },
  pie1: {
    /* 栅格位置大小信息 */
    x: 180,
    y: 0,
    w: 60, // w和col-num有关
    h: 20, // h和row-height有关
    /* grid-layout 栅格元素ID 因为用了sync修饰符，所以这里必须写成i*/
    i: 0,
    static: true,
    /* 组件的类型，主要标明组件的用途，比如说是标题、导航、按钮、日期、图表、地图等。需要一个枚举类。
        根据不同的类型还要存储不同结构的数据 */
    type: "",
    /* 业务类型，可用于筛选，不一定要 */
    businessType: "",
    /* 业务主题， 同上 */
    businessTheme: "",
    // 栅格对应的组件名字，必须是已经注册的组件，而且必须唯一
    componentName: "Pie1",
    /* 组件配置 */
    // 组件本身的属性  比如标题的title color等  这块根据自己的组件自己定义好自己的规则即可
    componentConfig: {
      titleShow: true,
      title: "测试标题",
      color: "#fff",
      textAlign: "left",
      fontSize: "16px",
      fontFamily: "Microsoft Yahei",
      showStatus: true,
      fontWeight: "bold",
      data: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" },
            ],
          },
        ],
      }
    },
  }
};
export default COMPONENT_CONFIG;
