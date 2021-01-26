<template>
  <div class="bar1__wrapper"
       ref="Line2WrapperRef">
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
      <div class="chart__container">
        <div class="chart-dom"
             ref="ChartDomRef"></div>
      </div>

    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle';
import * as echarts from 'echarts';
import { getKpiData } from '../../api';
const lineColors = [
  '#D0021B',
  '#FDC94F',
  '#B7A0F8',
  '#61a0a8',
  '#d48265',
  '#91c7ae',
  '#749f83',
  '#ca8622',
  '#bda29a',
  '#6e7074',
  '#546570',
  '#c4ccd3'
];
export default {
  name: 'Line2',
  props: {
    i: {
      type: String | Number,
      required: true
    },
    moduleId: {
      // 需要组件的模块 ID，用来查询指标集，当前 moduleId 暂未入库，后续 required 需为 true
      type: String,
      required: false
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

        data: {},
        chartOption: {
          lineSmooth: true, // 曲线 折线
          lineStyleType: 'solid', // 实线solid、虚线dashed
          // 折线的颜色
          lineStyleColorType: 'single', // 单色single、渐变 gradient
          lineStyleColor: '#F0AB4C',
          lineWidth: 2, // 线粗细
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
          yAxisLabelFontSize: 12,
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
      scale: 1
    };
  },
  created() {
    this._resizehandlerThrottle = throttle(this.resizehandler, 100);
  },
  mounted() {
    this._resizeObserver = new ResizeObserver(this._resizehandlerThrottle);
    this._resizeObserver.observe(this.$refs['Line2WrapperRef']);
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
    if (this.timer2) {
      clearInterval(this.timer2);
    }
  },
  methods: {
    initShowTooltip(length) {
      let dataIndex = 0;
      if (this.timer2) {
        clearInterval(this.timer2);
      }
      this.timer2 = setInterval(() => {
        if (this.chartIns) {
          this.chartIns.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: dataIndex++ % length
            //   position: [10, 10]
          });
        }
      }, 2000);
    },
    async initChart(chartData) {
      if (!this.chartIns) {
        this.chartIns = echarts.init(this.$refs['ChartDomRef']);
      }
      const _vm = this;
      // 模拟数据
      let xAxisData = [],
        /* 
      mockDataInterface Array<{
          label: string;
          type: string;
          seriesData: Array<string>
          }>
      */
        mockData = [];

      /* 处理数据来源 */
      const businessType = _vm.componentConfig.data.businessType;
      if (businessType === '静态数据') {
        try {
          const staticData = JSON.parse(_vm.componentConfig.data.staticData);
          xAxisData = staticData.xAxisData;
          mockData = staticData.yAxisData;
        } catch (error) {
          this.$message.error('静态数据解析错误');
          return;
        }
      } else if (businessType === '指标库导入') {
        /* 额外的参数 */
        const extraParams = {};
        try {
          const businessParamList = this.componentConfig.data.businessParamList;
          if (businessParamList && businessParamList.length > 0) {
            businessParamList.forEach((param) => {
              if (param.key && param.value) {
                extraParams[param.key] = param.value;
              }
            });
          }
        } catch (error) {}
        const res = await getKpiData({
          moduId: this.moduleId,
          kpiId: this.componentConfig.data.businessIndexSet,
          ...extraParams
        });
        if (res.code === 0 && res.data) {
          const dataConfig = this.componentConfig.data;
          const xAxisKey = dataConfig.businessX;
          const yAxisKeys = dataConfig.businessYList;
          const dataFromApi = res.data.data;
          const propNames = res.data.propNames;
          const propUnits = res.data.propUnits;
          xAxisData = dataFromApi.map((_) => _[xAxisKey]);
          mockData = [];
          yAxisKeys.forEach((yAxisKey) => {
            mockData.push({
              // label: `${propNames[yAxisKey]}(${propUnits[yAxisKey]})`,
              label: `${propNames[yAxisKey]}`,
              type: 'line',
              seriesData: dataFromApi.map((_) => _[yAxisKey])
            });
          });
        } else {
          this.$message.warning('指标数据获取失败');
        }
        // debugger
      } else if (businessType === '自定义API') {
        // await getFromUrl()
      }
      /* 先设定好颜色 */
      let barBackgroundColorListResult = [];
      if (this.componentConfig.chartOption.barStyleColorType === 'gradient') {
        const colorList = this.componentConfig.chartOption
          .barBackgroundColorList;
        for (let i = 0, len = colorList.length; i < len; i += 2) {
          barBackgroundColorListResult.push(
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: colorList[i] },
              { offset: 1, color: colorList[i + 1] }
            ])
          );
        }
      } else {
        barBackgroundColorListResult = this.componentConfig.chartOption
          .barBackgroundColorList;
      }

      let legendData = [];
      let series = [];
      mockData.forEach((item, index) => {
        legendData.push({
          name: item.label,
          icon: 'rect'
        });
        if (item.type === 'bar') {
          series.push({
            name: item.label,
            type: 'bar',
            data: item.seriesData,
            itemStyle: {
              color: barBackgroundColorListResult[index]
            }
          });
        } else if (item.type === 'line') {
          series.push({
            name: item.label,
            symbol: _vm.componentConfig.chartOption.symbol,
            type: 'line',
            data: item.seriesData,
            // 线的样式
            lineStyle: {
              color: lineColors[index],
              type: _vm.componentConfig.chartOption.lineStyleType, // 实线solid、虚线dashed
              width: _vm.componentConfig.chartOption.lineWidth
            },
            itemStyle: {
              color: lineColors[index]
            },
            // 折线是否光滑
            smooth: _vm.componentConfig.chartOption.lineSmooth
          });
        }
      });

      this.initShowTooltip(xAxisData.length);

      const option = {
        tooltip: {
          show: _vm.componentConfig.chartOption.tooltipShow,
          trigger: 'axis',
          confine: true
          /*  backgroundColor: "rgba(0,0,0)",
          textStyle: {
              color: '#ffffff',
              fontSize: 12,
              lineHeight: 14
          },
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          } */
        },
        grid: {
          left: '7%',
          bottom:
            _vm.componentConfig.chartOption.legendPosition === 'bottom'
              ? 48
              : 28,
          right: 20,
          top: 20
        },
        toolbox: {
          show: false
        },
        legend: {
          show: _vm.componentConfig.chartOption.legendShow,
          bottom:
            _vm.componentConfig.chartOption.legendPosition === 'bottom'
              ? 4
              : 'auto',
          top:
            _vm.componentConfig.chartOption.legendPosition === 'top'
              ? 0
              : 'auto',
          data: legendData,
          itemWidth: 10,
          itemHeight: 4,
          textStyle: {
            color: _vm.componentConfig.chartOption.legendColor,
            fontSize: _vm.componentConfig.chartOption.legendFontSize,
            fontWeight: _vm.componentConfig.chartOption.legendFontWeight,
            fontFamil: _vm.componentConfig.chartOption.legendFontFamily
          }
        },
        xAxis: [
          {
            type: 'category',
            data: xAxisData,
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              show: _vm.componentConfig.chartOption.xAxisLabelShow,
              color: _vm.componentConfig.chartOption.xAxisLabelColor,
              fontSize: _vm.componentConfig.chartOption.xAxisLabelFontSize,
              fontFamily: _vm.componentConfig.chartOption.xAxisLabelFontFamily
            },
            axisLine: {
              show: _vm.componentConfig.chartOption.xAxisLineShow,
              lineStyle: {
                color: _vm.componentConfig.chartOption.xAxisLineColor,
                width: _vm.componentConfig.chartOption.xAxisLineWidth
              }
            },
            axisTick: {
              show: _vm.componentConfig.chartOption.xAxisLineShow
            }
          }
        ],
        yAxis: {
          type: 'value',
          // name: 'y轴1',
          min: 'dataMin',
          // max: 250,
          // interval: 50,
          axisLine: {
            show: _vm.componentConfig.chartOption.yAxisLineShow,
            lineStyle: {
              color: _vm.componentConfig.chartOption.yAxisLineColor,
              width: _vm.componentConfig.chartOption.yAxisLineWidth
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: _vm.componentConfig.chartOption.yAxisLineShow
          },
          axisLabel: {
            formatter: '{value}',
            show: _vm.componentConfig.chartOption.yAxisLabelShow,
            color: _vm.componentConfig.chartOption.yAxisLabelColor,
            fontSize: _vm.componentConfig.chartOption.yAxisLabelFontSize,
            fontFamily: _vm.componentConfig.chartOption.yAxisLabelFontFamily
          }
        },
        series: series
      };
      this.chartIns.setOption(option, true);
    },
    resizehandler(entries) {
      const dOMRectReadOnly = entries[0];
      const contentRect = dOMRectReadOnly.contentRect;
      const width = contentRect.width;
      const scale = width / 400;
      this.scale = scale;
      this.$emit('resize', {
        contentRect,
        i: this.i,
        scaleNew: scale,
        initialW: 400,
        initialH: 300,
        componentName: 'Line2'
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.bar1__container {
  width: 400px;
  height: 300px;
}
</style>
