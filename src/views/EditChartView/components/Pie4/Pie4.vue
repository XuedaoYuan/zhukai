<template>
  <div class="pie4__container"
       ref="Pie4WrapperRef">
    <div class="pie4__content"
         :style="{
            transform: 'scale(' + scale + ')',
         }">

      <div class="chart-container"
           ref="ChartDomRef"></div>
      <div class="values-container"
           :style="{
          justifyContent: seriesData.length < 3 ? 'center' : 'flex-start'
      }">
        <div class="item_container"
             v-for="(item, index) in seriesData"
             :key="index">
          <div class="title">
            <div class="circle-icon"
                 :style="{
                backgroundColor: colors[index]
            }"></div>
            <div class="title-text"
                 :style="{
              color: componentConfig.titleColor,
              fontSize: componentConfig.titleFontSize + 'px',
              fontFamily: componentConfig.titleFontFamily,
            }">{{item.name}}</div>
          </div>
          <div class="value"
               :style="{
              color: componentConfig.valueColor,
              fontSize: componentConfig.valueFontSize + 'px',
              fontFamily: componentConfig.valueFontFamily,
            }">{{item.value | separateWithComma}}{{item.unit}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle';
import * as echarts from 'echarts';
import { getKpiData } from '../../api';
export default {
  name: 'Pie4',
  props: {
    i: {
      type: String | Number,
      required: true
    },
    moduleId: {
      // 需要组件的模块 ID，用来查询指标集，当前 moduleId 暂未入库，后续 required 需为 true
      type: String,
      required: false,
      default: '0011a239-3357-4b7e-bde8-ede0920d0e01'
    },
    componentConfig: {
      type: Object,
      defalt: () => ({
        // 图的系列name
        seriesName: '投诉举报情况',
        // 图例标题配置
        titleColor: '#FFFFFF',
        titleFontSize: 12,
        titleFontFamily: 'sans-serif,Microsoft YaHei',
        // 图例值的配置
        valueColor: '#FFFFFF',
        valueFontSize: 16,
        valueFontFamily: 'sans-serif,Microsoft YaHei',
        data: {}
      })
    }
  },
  watch: {
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
      seriesData: []
    };
  },
  created() {
    this._resizehandlerThrottle = throttle(this.resizehandler, 100);
    const colors = [
      '#B7A0F8',
      '#7EE2CC',
      '#F77688',
      '#5AB8FF',
      '#ABEC61',
      '#FDC94F'
    ];
    this.colors = [...colors, ...colors, ...colors];
  },
  mounted() {
    this._resizeObserver = new ResizeObserver(this._resizehandlerThrottle);
    this._resizeObserver.observe(this.$refs['Pie4WrapperRef']);
    this.initChart();
  },
  beforeDestroy() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    if (this.chartIns) {
      this.chartIns.clear();
      this.chartIns.dispose();
      this.chartIns = null;
    }
  },
  methods: {
    async initChart() {
      if (!this.chartIns) {
        this.chartIns = echarts.init(this.$refs['ChartDomRef']);
      }
      const _vm = this;
      const data = _vm.componentConfig.data;
      if (!data) return;
      let seriesData = [];
      switch (data.businessType) {
        case '静态数据': {
          const staticData = data.staticData;
          try {
            seriesData = JSON.parse(staticData);
          } catch (error) {
            this.$message.error('静态数据解析出错');
          }
          break;
        }
        case '指标库导入': {
          debugger;
          /* 额外的参数 */
          const extraParams = {};
          try {
            const businessParamList = data.businessParamList;
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
            if (res && res.code === 0 && res.data) {
              const fieldList = data.fieldList;
              seriesData = [];
              const dataFromDb = res.data.data[0];
              const propNames = res.data.propNames;
              const propUnits = res.data.propUnits;
              fieldList.forEach((key) => {
                seriesData.push({
                  value: dataFromDb[key],
                  name: propNames[key],
                  unit: propUnits[key]
                });
              });
            }
          } catch (error) {
            this.$message.error('数据获取失败');
          }

          break;
        }
        case '自定义API': {
          break;
        }

        default:
          break;
      }
      this.seriesData = seriesData;
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        legend: {
          show: false
        },
        series: [
          {
            name: _vm.componentConfig.seriesName,
            type: 'pie',
            radius: ['48%', '94%'],
            avoidLabelOverlap: false,
            hoverOffset: 2,
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              color: function (params) {
                return _vm.colors[params.dataIndex];
              }
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
      const scale = width / 420;
      this.scale = scale;
      this.$emit('resize', {
        contentRect,
        i: this.i,
        scaleNew: scale,
        initialW: 420,
        initialH: 141,
        componentName: 'Pie4'
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.pie4__container {
  width: 100%;
  height: 100%;
}

.pie4__content {
  width: 420px;
  height: 141px;
  transform-origin: top left;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .chart-container {
    width: 140px;
    height: 141px;
  }

  .values-container {
    width: 240px;
    height: 141px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;

    .item_container {
      width: 120px;
      height: 47px;
      padding-top: 5px;

      .title {
        display: flex;
        align-items: center;

        .circle-icon {
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #B7A0F8;
        }

        .title-text {
          margin-left: 8px;
          font-size: 12px;
          line-height: 1;
          font-weight: 400;
          color: #FFFFFF;
        }
      }

      .value {
        margin-top: 8px;
        font-size: 16px;
        line-height: 1;
        font-weight: 500;
        color: #FFFFFF;
        padding-left: 18px;
      }
    }
  }
}
</style>
