<template>
  <div class="bar1__wrapper"
       ref="Bar2WrapperRef">
    <div class="component__container bar1__container"
         :style="{
            transform: 'scale(' + scale + ')',
         }">
      <div class="header"
           v-if="componentConfig.titleShowStatus"
           :style="{
                color: componentConfig.titleColor,
                fontSize: componentConfig.titleFontSize + 'px',
                fontFamily: componentConfig.titleFamily,
                textAlign: componentConfig.titleTextAlign,
                fontWeight: componentConfig.titleFontWeight
      }">
        <svg version="1.1"
             viewBox="0 0 1024 1024"
             class="iconStyle"
             style="opacity: 0.3;">
          <path d="M475.428571 0H182.857143l365.714286 512-365.714286 512h292.571428l365.714286-502.857143z"
                stroke="transparent"></path>
        </svg>
        <svg version="1.1"
             viewBox="0 0 1024 1024"
             class="iconStyle"
             style="opacity: 0.7;">
          <path d="M475.428571 0H182.857143l365.714286 512-365.714286 512h292.571428l365.714286-502.857143z"
                stroke="transparent"></path>
        </svg>
        <svg version="1.1"
             viewBox="0 0 1024 1024"
             class="iconStyle">
          <path d="M475.428571 0H182.857143l365.714286 512-365.714286 512h292.571428l365.714286-502.857143z"
                stroke="transparent"></path>
        </svg>
        <span class="title">{{componentConfig.titleLabel}}</span>
      </div>
      <div class="chart__container grid-bg">
        <div class="sub-title__container"
             v-if="componentConfig.subTitleShowStatus"
             :style="{
            color: componentConfig.subTitleColor,
            fontSize: componentConfig.subTitleFontSize + 'px',
            fontFamily: componentConfig.subTitleFamily,
            textAlign: componentConfig.subTitleTextAlign,
            fontWeight: componentConfig.subTitleFontWeight,
      }">
          <span class="icon"
                :style="{backgroundColor: componentConfig.subTitleColor}"></span>
          {{componentConfig.subTitleLabel}}
        </div>
        <div class="chart-dom">
          <div class="left-title__container"
               v-if="titleList && titleList.length > 0">
            <div class="title-text "
                 v-for="(title, index) in titleList"
                 :key="index">
              <div :class="{active: title.length * 16 > 70}">{{title}}</div>
            </div>
          </div>
          <div class="chart-canvas-dom"
               ref="ChartDomRef"></div>
        </div>

        <div class="note"
             v-if="componentConfig.noteShowStatus"
             :style="{
            color: componentConfig.noteColor,
            fontSize: componentConfig.noteFontSize + 'px',
            fontFamily: componentConfig.noteFamily,
            textAlign: componentConfig.noteTextAlign,
            fontWeight: componentConfig.noteFontWeight,
      }">{{componentConfig.noteLabel}}</div>
      </div>

    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle';
import * as echarts from 'echarts';
const colors = [
  new echarts.graphic.LinearGradient(1, 0, 0, 0, [
    {
      offset: 0,
      color: 'rgb(81, 179, 254)'
    },
    {
      offset: 1,
      color: 'rgb(63, 95, 242)'
    }
  ]),
  new echarts.graphic.LinearGradient(1, 0, 0, 0, [
    {
      offset: 0,
      color: 'rgb(70, 162, 212)'
    },
    {
      offset: 1,
      color: 'rgb(91, 211, 254)'
    }
  ])
];
export default {
  name: 'Bar1',
  props: {
    i: {
      type: String | Number,
      required: true
    },
    componentConfig: {
      type: Object,
      default: () => ({
        // 标题的配置
        titleLabel: '标题',
        titleColor: 'rgb(83, 226, 255)',
        titleFontSize: 18,
        titleFamily: 'sans-serif,Microsoft YaHei',
        titleTextAlign: 'left',
        titleFontWeight: 'normal',
        titleShowStatus: true,
        // 副标题的配置
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
        scale: 1,
        data: {},
        chartOption: {
          lineSmooth: true, // 曲线 折线
          lineStyleType: 'solid', // 实线solid、虚线dashed
          // 折线的颜色
          lineStyleColorType: 'single', // 单色single、渐变 gradient
          lineStyleColor: '#F0AB4C',
          lineWidth: 2, // 线粗细
          barNum: 12, //  显示柱状的个数
          barStyleColorType: 'single',
          barBackgroundColorList: [
            'rgb(239, 187, 76)',
            'rgb(121, 212, 255)',
            'rgb(186, 144, 255)',
            'rgb(239, 155, 149)'
          ],
          // 图例的配置
          legendShow: true,
          legendColor: '#ffffff',
          legendPosition: 'top', // top bottom
          legendFontSize: 12,
          legendFontWeight: 'normal',
          legendFontFamily: 'sans-serif,Microsoft YaHei',
          // x轴
          xAxisLabelShow: true,
          xAxisLabelColor: '#5B5D66',
          xAxisLabelFontSize: 12,
          xAxisLabelFontFamily: 'sans-serif,Microsoft YaHei',
          xAxisLineShow: true,
          xAxisLineColor: '#5B5D66',
          xAxisLineWidth: 1,
          // y轴的一些配置
          yAxisLabelShow: true,
          yAxisLabelColor: '#5B5D66',
          yAxisLabelFontSize: 16,
          yAxisLabelFontFamily: 'sans-serif,Microsoft YaHei',
          yAxisLineShow: true,
          yAxisLineColor: '#5B5D66',
          yAxisLineWidth: 1,
          // 浮框
          tooltipShow: true
        }
      })
    }
  },
  watch: {
    //  监听chartOption的改变， 修改了就重新合并
    'componentConfig.chartOption': {
      handler: function (newVal) {
        this.initChart();
      },
      deep: true
    },
    //  监听data
    'componentConfig.data': {
      handler: function (newVal) {
        this.initChart();
      },
      deep: true
    }
  },
  data() {
    return {
      scale: 1,
      titleList: []
    };
  },
  created() {
    this._resizehandlerThrottle = throttle(this.resizehandler, 100);
  },
  mounted() {
    this._resizeObserver = new ResizeObserver(this._resizehandlerThrottle);
    this._resizeObserver.observe(this.$refs['Bar2WrapperRef']);
    this.initChart();
    // dom大小改变需要resize图表
    this._chartObserver = new ResizeObserver(
      throttle((entries) => {
        this.chartIns && this.chartIns.resize();
      }, 400)
    );
    this._chartObserver.observe(this.$refs['ChartDomRef']);
  },
  beforeDestroy() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    if (this._chartObserver) {
      this._chartObserver.disconnect();
      this._chartObserver = null;
    }
    if (this.chartIns) {
      this.chartIns.clear();
      this.chartIns.dispose();
      this.chartIns = null;
    }
  },
  methods: {
    async initChart(chartData) {
      if (!this.chartIns) {
        this.chartIns = echarts.init(this.$refs['ChartDomRef']);
      }
      const _vm = this;

      let yAxisData = ['50天', '40天', '30天', '20天', '10天'];
      let seriesData = [10, 20, 30, 40, 50];
      let titleList = [
        '医院1',
        '医院2医院3医院3医院4医院5医院6医院7医院8',
        '医院3',
        '医院4',
        '医院5'
      ];
      this.titleList = [...titleList];

      const option = {
        title: {
          show: false,
          text: '世界人口总量',
          subtext: '数据来自网络'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          show: false
        },
        grid: {
          left: 0,
          top: 0,
          right: '9%',
          bottom: 0
          // containLabel: true
        },
        xAxis: {
          show: false,
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          show: true,
          position: 'right',
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: yAxisData
        },
        series: [
          {
            type: 'bar',
            itemStyle: {
              color: function (params) {
                return colors[params.dataIndex % 2];
              },
              barBorderRadius: 7
            },
            barWidth: 14,
            showBackground: true,
            backgroundStyle: {
              barBorderRadius: 7
            },
            data: seriesData
          }
        ]
      };

      this.chartIns.setOption(option, true);
    },
    resizehandler(entries) {
      const dOMRectReadOnly = entries[0];
      const contentRect = dOMRectReadOnly.contentRect;
      const width = contentRect.width;
      const scale = width / 480;
      this.scale = scale;
      this.$emit('resize', {
        contentRect,
        i: this.i,
        scaleNew: scale,
        initialW: 480,
        initialH: 360,
        componentName: 'Bar2'
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.bar1__container {
  width: 480px;
  height: 360px;
}

.chart-dom {
  display: flex;
  position: relative;

  .left-title__container {
    /* position: absolute;
    width: 120px;
    left: 0;
    top: 0;
    bottom: 0; */
    flex: 0 0 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title-text {
      flex: 1;
      overflow: hidden;
      position: relative;

      > div {
        color: #fff;
        line-height: 1;
        position: absolute;
        white-space: nowrap;
        left: 10%;
        top: 50%;
        font-size: 16px;
        margin-top: -8px;
        letter-spacing: 0;

        &.active {
          animation: swiper-animation 4s linear infinite;
        }
      }
    }
  }
}

.chart-canvas-dom {
  flex: 1;
  height: 100%;
}

@keyframes swiper-animation {
  from {
    left: 10%;
  }

  to {
    left: -180%;
  }
}
</style>
