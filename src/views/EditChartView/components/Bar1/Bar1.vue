<template>
  <div class="bar1__wrapper"
       ref="Bar1WrapperRef">
    <div class="bar1__container"
         :style="{
            transform: 'scale('+componentConfig.scale+')'
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
      <div class="chart__container">
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
        <div class="chart-dom"
             ref="ChartDomRef"></div>

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
        titleFamily: 'Microsoft Yahei',
        titleTextAlign: 'left',
        titleFontWeight: 'normal',
        titleShowStatus: true,
        // 副标题的配置
        subTitleLabel: '副标题',
        subTitleColor: '#04c1ff',
        subTitleFontSize: 16,
        subTitleFamily: 'Microsoft Yahei',
        subTitleTextAlign: 'left',
        subTitleFontWeight: 'normal',
        subTitleShowStatus: false,
        // 注释的配置
        noteLabel: '注释',
        noteColor: '#fff',
        noteFontSize: 16,
        noteFamily: 'Microsoft Yahei',
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
          ]
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
    }
  },
  data() {
    return {};
  },
  created() {
    this._resizehandlerThrottle = throttle(this.resizehandler, 100);
  },
  mounted() {
    this._resizeObserver = new ResizeObserver(this._resizehandlerThrottle);
    this._resizeObserver.observe(this.$refs['Bar1WrapperRef']);
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
    initChart() {
      if (!this.chartIns) {
        this.chartIns = echarts.init(this.$refs['ChartDomRef']);
      }
      const _vm = this;
      // 模拟数据
      let series1Data = [
        2.0,
        4.9,
        7.0,
        23.2,
        25.6,
        76.7,
        135.6,
        162.2,
        32.6,
        20.0,
        6.4,
        3.3
      ];
      let series2Data = [
        2.6,
        5.9,
        9.0,
        26.4,
        28.7,
        70.7,
        175.6,
        182.2,
        48.7,
        18.8,
        6.0,
        2.3
      ];
      let series3Data = [
        2.0,
        4.9,
        7.0,
        23.2,
        25.6,
        76.7,
        135.6,
        162.2,
        32.6,
        20.0,
        6.4,
        3.3
      ];
      let series4Data = [
        2.6,
        5.9,
        9.0,
        26.4,
        28.7,
        70.7,
        175.6,
        182.2,
        48.7,
        18.8,
        6.0,
        2.3
      ];
      let lineSeriesData = [
        2.0,
        2.2,
        3.3,
        4.5,
        6.3,
        10.2,
        20.3,
        23.4,
        23.0,
        16.5,
        12.0,
        6.2
      ];
      let xAxisData = [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月'
      ];

      // 显示的柱状数量
      const barNum = this.componentConfig.chartOption.barNum;
      /* 
      if (barNum > 0 && barNum <= xAxisData.length) {
        xAxisData = xAxisData.slice(0, barNum);
        series1Data = series1Data.slice(0, barNum);
        series2Data = series2Data.slice(0, barNum);
        series3Data = series3Data.slice(0, barNum);
      } */
      const mockData = [
        {
          label: '蒸发量',
          type: 'bar',
          seriesData: series1Data
        },
        {
          label: '降水量',
          type: 'bar',
          seriesData: series2Data
        },
        {
          label: '其他水量',
          type: 'bar',
          seriesData: series3Data
        },
        {
          label: '平均温度',
          type: 'line',
          seriesData: lineSeriesData
        }
      ];
      let legendData = [];
      let series = [];
      mockData.forEach((item, index) => {
        legendData.push(item.label);
        if (item.type === 'bar') {
          series.push({
            name: item.label,
            type: 'bar',
            data: item.seriesData.slice(0, barNum),
            itemStyle: {
              color: this.componentConfig.chartOption.barBackgroundColorList[
                index
              ]
            }
          });
        } else if (item.type === 'line') {
          series.push({
            name: item.label,
            type: 'line',
            yAxisIndex: 1,
            data: item.seriesData.slice(0, barNum),
            // 线的样式
            lineStyle: {
              color: _vm.componentConfig.chartOption.lineStyleColor,
              type: _vm.componentConfig.chartOption.lineStyleType, // 实线solid、虚线dashed
              width: _vm.componentConfig.chartOption.lineWidth
            },
            // 折线是否光滑
            smooth: _vm.componentConfig.chartOption.lineSmooth
          });
        }
      });

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        grid: {
          bottom: '10%'
        },
        toolbox: {
          show: false
        },
        legend: {
          // bottom: 10,
          top: 10,
          data: legendData,
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: xAxisData,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'y轴1',
            min: 0,
            // max: 250,
            // interval: 50,
            axisLine: {
              show: true
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: 'y轴2',
            min: 0,
            // max: 25,
            // interval: 5,
            axisLine: {
              show: true
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: series
      };
      this.chartIns.setOption(option, true);
    },
    resizehandler(entries) {
      const dOMRectReadOnly = entries[0];
      const contentRect = dOMRectReadOnly.contentRect;
      this.$emit('resize', {
        contentRect,
        i: this.i,
        initialW: 480,
        initialH: 360,
        componentName: 'Bar1'
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.bar1__wrapper {
  width: 100%;
  height: 100%;
}

.bar1__container {
  width: 480px;
  height: 360px;
  transform-origin: left top;
  display: flex;
  flex-direction: column;

  .header {
    flex: 0 0 40px;
    line-height: 40px;
    color: rgb(83, 226, 255);
    font-size: 18px;
    text-align: left;
    font-weight: normal;

    .iconStyle {
      width: 9px;
      height: 15px;
      display: inline-block;
      vertical-align: baseline;
      fill: currentColor;
    }

    .title {
      margin-left: 6px;
      display: inline-block;
      line-height: 1;
    }
  }

  .chart__container {
    flex: 1;
    width: 100%;
    overflow: hidden;
    background-image: url('../../assets/bg-border.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    display: flex;
    flex-direction: column;

    .sub-title__container {
      flex: 0 0 30px;
      line-height: 30px;
      padding-left: 0px;
      position: relative;

      .icon {
        display: inline-block;
        width: 4px;
        height: 12px;
        background: #04c1ff;
        margin-right: 8px;
      }
    }

    .chart-dom {
      flex: 1;
      width: 100%;
      overflow: hidden;
    }
  }

  .note {
    flex: 0 0 40px;
    line-height: 40px;
    padding: 0 10px;
  }
}
</style>
