<template>
  <div class="chinaMap1__wrapper" ref="ChinaMap1WrapperRef">
    <div
      class="component__container chinaMap1__container"
      :style="{
        transform: 'scale(' + scale + ')',
      }"
    >
      <div
        class="header"
        v-if="componentConfig.titleShowStatus"
        :style="{
          color: componentConfig.titleColor,
          fontSize: componentConfig.titleFontSize + 'px',
          fontFamily: componentConfig.titleFamily,
          textAlign: componentConfig.titleTextAlign,
          fontWeight: componentConfig.titleFontWeight,
        }"
      >
        <svg
          version="1.1"
          viewBox="0 0 1024 1024"
          class="iconStyle"
          style="opacity: 0.3"
        >
          <path
            d="M475.428571 0H182.857143l365.714286 512-365.714286 512h292.571428l365.714286-502.857143z"
            stroke="transparent"
          ></path>
        </svg>
        <svg
          version="1.1"
          viewBox="0 0 1024 1024"
          class="iconStyle"
          style="opacity: 0.7"
        >
          <path
            d="M475.428571 0H182.857143l365.714286 512-365.714286 512h292.571428l365.714286-502.857143z"
            stroke="transparent"
          ></path>
        </svg>
        <svg version="1.1" viewBox="0 0 1024 1024" class="iconStyle">
          <path
            d="M475.428571 0H182.857143l365.714286 512-365.714286 512h292.571428l365.714286-502.857143z"
            stroke="transparent"
          ></path>
        </svg>
        <span class="title">{{ componentConfig.titleLabel }}</span>
      </div>
      <div class="chart__container">
        <div
          class="sub-title__container"
          v-if="componentConfig.subTitleShowStatus"
          :style="{
            color: componentConfig.subTitleColor,
            fontSize: componentConfig.subTitleFontSize + 'px',
            fontFamily: componentConfig.subTitleFamily,
            textAlign: componentConfig.subTitleTextAlign,
            fontWeight: componentConfig.subTitleFontWeight,
          }"
        >
          <span
            class="icon"
            :style="{ backgroundColor: componentConfig.subTitleColor }"
          ></span>
          {{ componentConfig.subTitleLabel }}
        </div>
        <div class="chart-dom" ref="ChartDomRef"></div>

        <div
          class="note"
          v-if="componentConfig.noteShowStatus"
          :style="{
            color: componentConfig.noteColor,
            fontSize: componentConfig.noteFontSize + 'px',
            fontFamily: componentConfig.noteFamily,
            textAlign: componentConfig.noteTextAlign,
            fontWeight: componentConfig.noteFontWeight,
          }"
        >
          {{ componentConfig.noteLabel }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _throttle from 'lodash/throttle';
import _omit from 'lodash/omit';
import _attempt from 'lodash/attempt';
import _isError from 'lodash/isError';
import axios from 'axios';
export default {
  name: 'ChinaMap1',
  props: ['i', 'componentConfig'],
  data() {
    return {
      scale: 1,
      chartIns: null,
      chinaJSON: '/static/mapData/china.json',
    };
  },
  watch: {
    // "componentConfig.titleShow": function (val, oldVal) {
    //   this.resize();
    // },
    // "componentConfig.fontSize": function (val, oldVal) {
    //   this.resize();
    // },
    // "componentConfig.data": function(val, oldVal){
    //   this.chartInstance.setOption(this.componentConfig.data);
    // },
  },
  created() {
    this._resizehandlerThrottle = _throttle(this.resizehandler, 100);
  },
  mounted() {
    this._resizeObserver = new ResizeObserver(this._resizehandlerThrottle);
    this._resizeObserver.observe(this.$refs['ChinaMap1WrapperRef']);
    this.initChart();
    // dom大小改变需要resize图表
    this._chartObserver = new ResizeObserver(
      _throttle((entries) => {
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
        this.chartIns = this.$echarts.init(this.$refs['ChartDomRef']);
      }
      const options = {
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
      };
      axios.get(this.chinaJSON).then(({ data }) => {
        this.$echarts.registerMap('china', data);
        this.chartIns.hideLoading();
        this.chartIns.setOption(options, true);
      });
    },
    resizehandler(entries) {
      const dOMRectReadOnly = entries[0];
      const contentRect = dOMRectReadOnly.contentRect;
      const width = contentRect.width;
      const scale = width / 777;
      this.scale = scale;
      this.$emit('resize', {
        contentRect,
        i: this.i,
        scaleNew: scale,
        initialW: 777,
        initialH: 583,
        componentName: 'Pie1',
      });
    },
  },
};
</script>
<style scoped lang="stylus">
.chinaMap1__container {
  width: 777px;
  height: 583px;
}
</style>