/* =======注意： 是 >>>初始<<< 配置项 */
/* 对于所有组件的初始配置项, 也就是默认值 */
import bar1DefaultConfig from "@/views/EditChartView/components/Bar1/bar1DefaultConfig.js"
const COMPONENT_CONFIG = {
  // 标题1的配置项
  title1: {
    x: 60,
    y: 0,
    w: 120, // w和col-num有关
    h: 3, // h和row-height有关
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
      fontFamily: 'Microsoft Yahei',
      fontWeight: 'normal',
      showStatus: true,
      scale: 1
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
    h: 30, // h和row-height有关
    /* grid-layout 栅格元素ID 因为用了sync修饰符，所以这里必须写成i*/
    i: 0,
    static: true,
    /* 组件的类型，主要标明组件的用途，比如说是标题、导航、按钮、日期、图表、地图等。需要一个枚举类。
        根据不同的类型还要存储不同结构的数据 */
    type: '',
    /* 业务类型，可用于筛选，不一定要 */
    businessType: '',
    /* 业务主题， 同上 */
    businessTheme: '',
    // 栅格对应的组件名字，必须是已经注册的组件，而且必须唯一
    componentName: 'Pie1',
    // 组件的中文名
    componentAliasName: '饼图1',
    /* 组件配置 */
    // 组件本身的属性  比如标题的title color等  这块根据自己的组件自己定义好自己的规则即可
    componentConfig: {
      titleShow: true,
      title: '测试标题',
      color: '#fff',
      textAlign: 'left',
      fontSize: '16px',
      fontFamily: 'Microsoft Yahei',
      showStatus: true,
      fontWeight: 'bold',
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
    }
  },
  datePicker1: {
    x: 185,
    y: 0,
    w: 55,
    h: 6,
    i: 0,
    static: true,
    /* 组件的类型，主要标明组件的用途，比如说是标题、导航、按钮、日期、图表、地图等。需要一个枚举类。
        根据不同的类型还要存储不同结构的数据 */
    type: '',
    /* 业务类型，可用于筛选，不一定要 */
    businessType: '',
    /* 业务主题， 同上 */
    businessTheme: '',
    // 栅格对应的组件名字，必须是已经注册的组件，而且必须唯一
    componentName: 'DatePicker1',
    componentAliasName: '日期选择器1',
    componentConfig: {
      title: '选择日期',
      color: '#e2f8ff',
      fontSize: 14,
      fontFamily: 'Microsoft Yahei',
      fontWeight: 'normal',
      showStatus: true,
      scale: 1
    }
  },
  select1: {
    x: 185,
    y: 0,
    w: 55,
    h: 6,
    i: 0,
    static: true,
    /* 组件的类型，主要标明组件的用途，比如说是标题、导航、按钮、日期、图表、地图等。需要一个枚举类。
        根据不同的类型还要存储不同结构的数据 */
    type: '',
    /* 业务类型，可用于筛选，不一定要 */
    businessType: '',
    /* 业务主题， 同上 */
    businessTheme: '',
    // 栅格对应的组件名字，必须是已经注册的组件，而且必须唯一
    componentName: 'Select1',
    componentAliasName: '下拉框',
    componentConfig: {
      title: '选择',
      color: '#fff',
      fontSize: 14,
      fontFamily: 'Microsoft Yahei',
      fontWeight: 'normal',
      showStatus: true,
      scale: 1,
      data: {
        businessType: '静态数据', // 指标库导入、静态数据、自定义API
        /* 指标库导入 */
        businessDomain: '', // 业务域
        businessIndexSet: '', // 指标集
        businessParamList: [],
        /* 静态数据 */
        staticData: JSON.stringify(
          [
            { label: '1', value: '1' },
            { label: '3', value: '3' }
          ],
          null,
          4
        ), //  Array or Map 序列化的字符串
        /* 自定义API */
        apiUrl: '',
        apiUrlParamList: [{ key: '', value: '' }]
      }
    }
  },
  map1: {
    x: 160,
    w: 80,
    h: 80,
    i: 0,
    static: true,
    /* 组件的类型，主要标明组件的用途，比如说是标题、导航、按钮、日期、图表、地图等。需要一个枚举类。
        根据不同的类型还要存储不同结构的数据 */
    type: '',
    /* 业务类型，可用于筛选，不一定要 */
    businessType: '',
    /* 业务主题， 同上 */
    businessTheme: '',
    // 栅格对应的组件名字，必须是已经注册的组件，而且必须唯一
    componentName: 'Map1',
    componentAliasName: '海南省地图',
    componentConfig: {
      titleShow: true,
      title: '海南省地图',
      data: {
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            if (params.name && params.data.value) {
              return params.name + ' : ' + params.data.value;
            }
          }
        },
        geo: {
          map: 'hainan',
          zoom: 4,
          roam: true,
          show: false,
          center: [110.037218, 18.505006],
          itemStyle: {
            normal: {
              areaColor: '#013C62',
              shadowColor: '#182f68',
              shadowOffsetX: 0,
              shadowOffsetY: 10
            },
            emphasis: {
              areaColor: '#2AB8FF',
              borderWidth: 0,
              color: 'green',
              label: {
                show: false
              }
            }
          }
        },
        series: [
          {
            type: 'map',
            roam: true,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              },
              emphasis: {
                textStyle: {
                  color: '#fff'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#2ab8ff',
                borderWidth: 1.5,
                areaColor: '#12235c'
              },
              emphasis: {
                areaColor: '#2AB8FF',
                borderWidth: 0,
                color: 'green'
              }
            },
            zoom: 4,
            roam: true,
            center: [110.037218, 18.505006],
            map: 'hainan', //使用
            data: []
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            showEffectOn: 'render',
            rippleEffect: {
              period: 15,
              scale: 4,
              brushType: 'fill'
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: 'rgba(220,180,150,0.7)',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            data: []
          }
        ]
      }
    }
  },
  chinaMap1: {
    x: 160,
    w: 80,
    h: 80,
    i: 0,
    static: true,
    /* 组件的类型，主要标明组件的用途，比如说是标题、导航、按钮、日期、图表、地图等。需要一个枚举类。
        根据不同的类型还要存储不同结构的数据 */
    type: '',
    /* 业务类型，可用于筛选，不一定要 */
    businessType: '',
    /* 业务主题， 同上 */
    businessTheme: '',
    // 栅格对应的组件名字，必须是已经注册的组件，而且必须唯一
    componentName: 'ChinaMap1',
    componentAliasName: '中国地图',
    componentConfig: {
      titleShow: true,
      title: '中国地图',
      data: {
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            if (params.name && params.data.value) {
              return params.name + ' : ' + params.data.value;
            }
          }
        },
        geo: {
          map: 'china',
          show: false
        },
        series: [
          {
            type: 'map',
            roam: true,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              },
              emphasis: {
                textStyle: {
                  color: '#fff'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#2ab8ff',
                borderWidth: 1.5,
                areaColor: '#12235c'
              },
              emphasis: {
                areaColor: '#2AB8FF',
                borderWidth: 0,
                color: 'green'
              }
            },
            zoom: 1,
            roam: true,
            center: [109.5996, 35.6396],
            map: 'china', //使用
            data: []
          }
          /* {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              showEffectOn: 'render',
              rippleEffect: {
                  period: 15,
                  scale: 4,
                  brushType: 'fill'
              },
              hoverAnimation: true,
              itemStyle: {
                  normal: {
                      color: 'rgba(220,180,150,0.7)',
                      shadowBlur: 10,
                      shadowColor: '#333'
                  }
              },
              data: mapDate                
          } */
        ]
      }
    }
  },
  bar1: bar1DefaultConfig
};
export default COMPONENT_CONFIG;
