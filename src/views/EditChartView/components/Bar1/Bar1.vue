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
                fontSize: componentConfig.titleFontSize,
                fontFamily: componentConfig.titleFamily,
                textAlign: componentConfig.titleTextAlign,
                fontWeight: componentConfig.titleFontWeight
      }">
        <svg data-v-2283cbac=""
             data-v-1d47ddd8=""
             version="1.1"
             viewBox="0 0 1024 1024"
             class="iconStyle"
             style="opacity: 0.3;">
          <path data-v-2283cbac=""
                d="M475.428571 0H182.857143l365.714286 512-365.714286 512h292.571428l365.714286-502.857143z"
                stroke="transparent"></path>
        </svg>
        <svg data-v-2283cbac=""
             data-v-1d47ddd8=""
             version="1.1"
             viewBox="0 0 1024 1024"
             class="iconStyle"
             style="opacity: 0.7;">
          <path data-v-2283cbac=""
                d="M475.428571 0H182.857143l365.714286 512-365.714286 512h292.571428l365.714286-502.857143z"
                stroke="transparent"></path>
        </svg>
        <svg data-v-2283cbac=""
             data-v-1d47ddd8=""
             version="1.1"
             viewBox="0 0 1024 1024"
             class="iconStyle">
          <path data-v-2283cbac=""
                d="M475.428571 0H182.857143l365.714286 512-365.714286 512h292.571428l365.714286-502.857143z"
                stroke="transparent"></path>
        </svg>
        <span class="title">{{componentConfig.titleLabel}}</span>
      </div>
      <div class="chart__container"
           ref="ChartDomRef">
      </div>
      <div class="note"></div>
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
        scale: 1
      })
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
    }
  },
  methods: {
    initChart() {
      this.chartIns = echarts.init(this.$refs['ChartDomRef']);
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
        /*  grid:{
            bottom: "10%"
        }, */
        toolbox: {
          show: false
          /* feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          } */
        },
        legend: {
          bottom: 10,
          data: ['蒸发量', '降水量', '平均温度']
        },
        xAxis: [
          {
            type: 'category',
            data: [
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
            ],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '水量',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name: '蒸发量',
            type: 'bar',
            data: [
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
            ]
          },
          {
            name: '降水量',
            type: 'bar',
            data: [
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
            ]
          },
          {
            name: '平均温度',
            type: 'line',
            yAxisIndex: 1,
            data: [
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
            ]
          }
        ]
      };
      this.chartIns.setOption(option);
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
    }
  }

  .chart__container {
    flex: 1;
    width: 100%;
    background-image: url('../../assets/bg-border.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
  }

  .note {
    flex: 0 0 40px;
    line-height: 40px;
  }
}
</style>
