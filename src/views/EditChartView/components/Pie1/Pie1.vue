<template>
  <div class="pie1__wrapper"
       ref="Pie1WrapperRef">
    <div class="pie1__container"
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
          fontWeight: componentConfig.titleFontWeight,
        }">
        <svg version="1.1"
             viewBox="0 0 1024 1024"
             class="iconStyle"
             style="opacity: 0.3">
          <path d="M475.428571 0H182.857143l365.714286 512-365.714286 512h292.571428l365.714286-502.857143z"
                stroke="transparent"></path>
        </svg>
        <svg version="1.1"
             viewBox="0 0 1024 1024"
             class="iconStyle"
             style="opacity: 0.7">
          <path d="M475.428571 0H182.857143l365.714286 512-365.714286 512h292.571428l365.714286-502.857143z"
                stroke="transparent"></path>
        </svg>
        <svg version="1.1"
             viewBox="0 0 1024 1024"
             class="iconStyle">
          <path d="M475.428571 0H182.857143l365.714286 512-365.714286 512h292.571428l365.714286-502.857143z"
                stroke="transparent"></path>
        </svg>
        <span class="title">{{ componentConfig.titleLabel }}</span>
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
                :style="{ backgroundColor: componentConfig.subTitleColor }"></span>
          {{ componentConfig.subTitleLabel }}
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
          }">
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
export default {
  name: 'Pie1',
  props: {
    i: {
      type: String | Number,
      required: true
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
          bar2StyleColor: 'rgb(121, 212, 255)'
        }
      })
    }
  },
  data() {
    return {
      scale: 1,
      chartIns: null,
      chartContainerDOM: null,
      componentData: []
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
      }
    }
  },
  created() {
    this._resizehandlerThrottle = _throttle(this.resizehandler, 100);
  },
  mounted() {
    this._resizeObserver = new ResizeObserver(this._resizehandlerThrottle);
    this._resizeObserver.observe(this.$refs['Pie1WrapperRef']);
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
            data: this.componentData
          }
        ]
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
        componentName: 'Pie1'
      });
    }
  }
};
</script>
<style scoped lang="stylus">
.pie1__wrapper {
  width: 100%;
  height: 100%;
}

.pie1__container {
  width: 388px;
  height: 291px;
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
