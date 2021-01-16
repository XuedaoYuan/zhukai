<template>
  <div class="map1__wrapper" ref="Map1WrapperRef">
    <div
      class="component__container map1__container"
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
import { hainan } from './data';
export default {
  name: 'Map1',
  props: ['i', 'componentConfig'],
  data() {
    return {
      scale: 1,
      chartInstance: null,
      chartContainerDOM: null,
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
  computed: {
    // titleStyle: function () {
    //   return _omit(this.componentConfig, ["title", "titleShow"]);
    // },
  },
  created() {
    this._resizehandlerThrottle = _throttle(this.resizehandler, 100);
  },
  mounted() {
    this._resizeObserver = new ResizeObserver(this._resizehandlerThrottle);
    this._resizeObserver.observe(this.$refs['Map1WrapperRef']);
    this.initChart();
    // dom大小改变需要resize图表
    this._chartObserver = new ResizeObserver(
      _throttle((entries) => {
        this.chartIns && this.chartIns.resize();
      }, 400)
    );
    this._chartObserver.observe(this.$refs['ChartDomRef']);

    // const chartContainerDOM = this.$refs['ChartContainer'];
    // this.chartContainerDOM = chartContainerDOM;
    // this.$nextTick(() => {
    //   this.chartInstance = this.$echarts.init(chartContainerDOM);
    //   this.chartInstance.showLoading();
    //   axios.get(hainan).then(({ data }) => {
    //     this.$echarts.registerMap('hainan', data);
    //     this.chartInstance.hideLoading();
    //     this.chartInstance.setOption(this.componentConfig.data);
    //   });
    // });
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
          formatter: function (params) {
            if (params.name && params.data.value) {
              return params.name + ' : ' + params.data.value;
            }
          },
        },
        geo: {
          map: 'hainan',
          zoom: 4,
          roam: true,
          show: false,
          center: [109.839996,19.03557],
          itemStyle: {
            normal: {
              areaColor: '#013C62',
              shadowColor: '#182f68',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
            },
            emphasis: {
              areaColor: '#2AB8FF',
              borderWidth: 0,
              color: 'green',
              label: {
                show: false,
              },
            },
          },
        },
        series: [
          {
            type: 'map',
            roam: true,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff',
                },
              },
              emphasis: {
                textStyle: {
                  color: '#fff',
                },
              },
            },
            itemStyle: {
              normal: {
                borderColor: '#2ab8ff',
                borderWidth: 1.5,
                areaColor: '#12235c',
              },
              emphasis: {
                areaColor: '#2AB8FF',
                borderWidth: 0,
                color: 'green',
              },
            },
            zoom: 8,
            roam: true,
            center: [109.839996,19.03557],
            map: 'hainan', //使用
            data: [],
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            showEffectOn: 'render',
            rippleEffect: {
              period: 15,
              scale: 4,
              brushType: 'fill',
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: 'rgba(220,180,150,0.7)',
                shadowBlur: 10,
                shadowColor: '#333',
              },
            },
            data: [],
          },
        ],
      };
      axios.get(hainan).then(({ data }) => {
        this.$echarts.registerMap('hainan', data);
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
.map1__container {
  width: 777px;
  height: 583px;
}
</style>