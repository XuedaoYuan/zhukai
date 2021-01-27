<template>
  <div class="bar1__wrapper"
       ref="Bar3WrapperRef">
    <div class="component__container bar3__container"
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
      <!--  grid-bg -->
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
        <div class="chart-dom">
          <div class="left-title__container"
               v-show="componentConfig.chartOption.yAxisLabelShow"
               :style="{
                  paddingBottom: componentConfig.chartOption.xAxisLabelShow ? '30px' : 0
                }"
               v-if="titleList && titleList.length > 0">
            <div class="title-text"
                 v-for="(title, index) in titleList"
                 :key="index">
              <div :style="{
                color: componentConfig.chartOption.yAxisLabelColor,
                fontSize: componentConfig.chartOption.yAxisLabelFontSize + 'px',
                fontFamily: componentConfig.chartOption.yAxisLabelFontFamily,
                marginTop: (0 - componentConfig.chartOption.yAxisLabelFontSize / 2) + 'px'
              }"
                   :class="{active: (title.length - 2) * componentConfig.chartOption.yAxisLabelFontSize > 80}">{{title}}</div>
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
import { getKpiData } from '../../api';

export default {
  name: 'Bar3',
  props: {
    i: {
      type: String | Number,
      required: true
    },
    moduleId: {
      type: String,
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
        // 副标题
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
        // 数据源配置
        data: {},
        chartOption: {
          // x轴的一些配置
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
          yAxisLabelFontSize: 12,
          yAxisLabelFontFamily: 'sans-serif,Microsoft YaHei',
          yAxisLineShow: true,
          yAxisLineColor: '#5B5D66',
          yAxisLineWidth: 1,
          // 浮框
          tooltipShow: true,
          // 柱状图的一些配置
          barItemColor: '#53E2FF',
          barBackgroundColor: '#2C547C',
          barWidth: 10
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
    this._resizeObserver.observe(this.$refs['Bar3WrapperRef']);
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

      const data = this.componentConfig.data;
      let yAxisData = ['10天', '20天', '30天', '40天', '50天'];
      let seriesData = [10, 20, 30, 40, 50];
      let titleList = ['医院1', '医院2名字长一点', '医院3', '医院4', '医院5'];
      this.titleList = [...titleList];
      switch (data.businessType) {
        case '指标库导入': {
          const extraParams = {};
          try {
            const businessParamList = this.componentConfig.data
              .businessParamList;
            if (businessParamList && businessParamList.length > 0) {
              businessParamList.forEach((param) => {
                if (param.key && param.value) {
                  extraParams[param.key] = param.value;
                }
              });
            }
            const res = await getKpiData({
              moduId: this.moduleId,
              kpiId: this.componentConfig.data.businessIndexSet,
              ...extraParams
            });
          } catch (error) {}

          break;
        }
        case '静态数据': {
          try {
            const staticData = JSON.parse(data.staticData);
            seriesData = staticData.map((_) => _.value);
            yAxisData = seriesData;
            this.titleList = staticData.map((_) => _.name);
          } catch (error) {
            this.$message.error('静态数据解析出错');
          }

          break;
        }
        case '自定义API': {
          // data.apiUrl
          // data.apiUrlParamList
          break;
        }

        default:
          break;
      }

      const xAxisLabelShow = _vm.componentConfig.chartOption.xAxisLabelShow;

      const option = {
        title: {
          show: false,
          text: ''
        },
        tooltip: {
          show: _vm.componentConfig.chartOption.tooltipShow,
          trigger: 'axis',
          formatter: '{b}',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          show: false
        },
        grid: {
          left: 10,
          top: 0,
          right: 10,
          bottom: xAxisLabelShow ? 30 : 0
        },
        xAxis: {
          show: xAxisLabelShow,
          type: 'value',
          boundaryGap: [0, 0.01],
          splitLine: {
            show: false
          },
          axisLabel: {
            color: _vm.componentConfig.chartOption.xAxisLabelColor
          },
          axisLine: {
            show: _vm.componentConfig.chartOption.xAxisLineShow,
            lineStyle: {
              color: _vm.componentConfig.chartOption.xAxisLineColor,
              width: _vm.componentConfig.chartOption.xAxisLineWidth
            }
          },
          axisTick: {
            show: _vm.componentConfig.chartOption.xAxisLineShow,
            lineStyle: {
              color: _vm.componentConfig.chartOption.xAxisLineColor,
              width: _vm.componentConfig.chartOption.xAxisLineWidth
            }
          }
        },
        yAxis: {
          show: false,
          position: 'right',
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#fff'
          },
          data: yAxisData
        },
        series: [
          {
            type: 'bar',
            itemStyle: {
              color: _vm.componentConfig.chartOption.barItemColor,
              barBorderRadius: _vm.componentConfig.chartOption.barWidth / 2
            },
            barWidth: _vm.componentConfig.chartOption.barWidth,
            showBackground: true,
            backgroundStyle: {
              barBorderRadius: _vm.componentConfig.chartOption.barWidth / 2,
              color: _vm.componentConfig.chartOption.barBackgroundColor
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
      const scale = width / 416;
      this.scale = scale;
      this.$emit('resize', {
        contentRect,
        i: this.i,
        scaleNew: scale,
        initialW: 416,
        initialH: 876,
        componentName: 'Bar3'
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.bar3__container {
  width: 416px;
  height: 876px;
  background-color: rgba(19, 62, 107, 0.3);
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

.chart__container {
  padding: 30px;
}

.chart-canvas-dom {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

@keyframes swiper-animation {
  from {
    left: 10%;
  }

  to {
    left: -140%;
  }
}
</style>
