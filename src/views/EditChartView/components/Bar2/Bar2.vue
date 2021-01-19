<template>
  <div class="bar2__wrapper" ref="Bar2WrapperRef">
    <div
      class="component__container bar2__container"
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
import _attempt from 'lodash/attempt';
import _isError from 'lodash/isError';
import _get from 'lodash/get';
import _map from 'lodash/map';
import { getKpiData } from '../../api';
export default {
  name: 'Bar2',
  props: {
    i: {
      type: String | Number,
      required: true,
    },
    moduleId: {
      // 需要组件的模块 ID，用来查询指标集，当前 moduleId 暂未入库，后续 required 需为 true
      type: String,
      required: false,
      default: '0011a239-3357-4b7e-bde8-ede0920d0e01',
    },
    componentConfig: {
      type: Object,
      default: () => ({
        // 标题的配置
        titleLabel: '标题1',
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
          bar1StyleColor: 'rgb(239, 187, 76)',
          bar2StyleColor: 'rgb(121, 212, 255)',
        },
      }),
    },
  },
  data() {
    return {
      scale: 1,
      chartIns: null,
      componentData: [],
    };
  },
  watch: {
    // 监听静态数据是否变化
    'componentConfig.data.staticData': {
      immediate: true,
      handler: function (val, oldVal) {
        const data = _attempt(() => {
          return JSON.parse(val);
        });
        if (_isError(data)) {
          this.componentData = [];
        } else {
          this.componentData = data;
        }
        this.$nextTick(() => {
          this.initChart();
        });
      },
    },
    'componentConfig.data': {
      immediate: true,
      handler: function (val, oldVal) {
        if (_get(val, 'businessIndexSet')) {
          this.fetchKpiData();
        }
        // const data = _attempt(() => {
        //   return JSON.parse(val);
        // });
        // if (_isError(data)) {
        //   this.componentData = [];
        // } else {
        //   this.componentData = data;
        // }
        // this.$nextTick(() => {
        //   this.initChart();
        // });
      },
    },
  },
  created() {
    this._resizehandlerThrottle = _throttle(this.resizehandler, 100);
  },
  mounted() {
    this._resizeObserver = new ResizeObserver(this._resizehandlerThrottle);
    this._resizeObserver.observe(this.$refs['Bar2WrapperRef']);
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
    fetchKpiData() {
      // 获取指标字段
      getKpiData({ 
        moduId: this.moduleId,
        kpiId: this.componentConfig.data.businessIndexSet,
      }).then(({ data }) => {
        const xField = _get(this.componentConfig.data, 'businessX');
        const yField = _get(this.componentConfig.data, 'businessY');
        const seriesData = 
        this.chartIns.setOption({
          xAxis: {
            name: _get(data, ['propNames', xField]) + (_get(data, ['propUnits', xField]) || ''),
          },
          yAxis: {
            name: _get(data, ['propNames', yField]) + (_get(data, ['propUnits', yField]) || ''),
          },
          grid: {
            left: _get(data, ['propNames', yField], '').length * 6 + 16,
            right: _get(data, ['propNames', xField], '').length * 12 + 32,
          },
          series: [{
            type: 'line',
            data: _map(_get(data, 'data'), item => (
              [_get(item, xField), _get(item, yField)]
            ))
          }]
        })
      })
    },
    initChart() {
      if (!this.chartIns) {
        this.chartIns = this.$echarts.init(this.$refs['ChartDomRef']);
      }
      const options = {
        xAxis: {
          type: 'category',
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          type: 'line',
          data: [['周一', 20], ['周二', 30], ['周三', 10], ['周四', 44], ['周五', 88], ['周六', 33], ['周日', 47]]
        }],
      };
      this.chartIns.setOption(options, true);
    },
    resizehandler(entries) {
      const dOMRectReadOnly = entries[0];
      const contentRect = dOMRectReadOnly.contentRect;
      const width = contentRect.width;
      const scale = width / 388;
      this.scale = scale;
      this.$emit('resize', {
        contentRect,
        i: this.i,
        scaleNew: scale,
        initialW: 388,
        initialH: 291,
        componentName: 'Bar2',
      });
    },
  },
};
</script>
<style scoped lang="stylus">
.bar2__container {
  width: 388px;
  height: 291px;
}
</style>
