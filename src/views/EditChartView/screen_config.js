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

/* 
id int 可以设定为传了id是编辑， 否则是新增
boardTitle String 大屏名称，也就是看板中文名字
boardCode String 看板code编码
type Enum 'board' | template 保存的类型  是大屏 还是 模板
status Enum 状态的编码  使用中 待审核 待发布 退回 已删除 理解业务流程后端可以自己定 
statusName 状态的中文名使用中 待审核 待发布 退回 已删除 
createDate yyyy-MM-dd 创建日期
updateDate yyyy-MM-dd 更新日期
xxxDate yyyy-MM-dd 流程改变的日期，有需要可以记录下来，比如审核通过的日期
boardConfig String ，主要用于保存看板的各种配置项，需要数据库一个比较长的类型，比如varchar或者text
*/

// 图表存储的数据
/* const a = {
  data: {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 10,
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
      textStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1548, name: '搜索引擎' }
        ]
      }
    ]
  }
}; */

const componentConfig = {
  data: {
    businessType: '', // 指标库导入、静态数据、自定义API
    /* 指标库导入 */
    businessDomain: '', // 业务域
    businessIndexSet: '', // 指标集
    businessParamList: [{ key: '', value: '' }]
    /* 静态数据 */
    staticData: '', //  Array or Map 序列化的字符串
    /* 自定义API */
    apiUrl: '',
    apiUrlParamList: [{ key: '', value: '' }]
  }
};
