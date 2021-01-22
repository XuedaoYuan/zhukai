<template>
  <div class="pie1__wrapper"
       ref="Pie2WrapperRef">
    <div class="component__container"
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
        <div class="sub-title__container"
             v-if="componentConfig.tabsShow">
          <div :class="['tab', tabActiveIndex === index ?  'active' : '']"
               v-for="(tab, index) in componentConfig.tabs"
               :key="index">{{tab.label}}</div>
        </div>
        <div class="chart-dom">
          <div class="chart-dom__container"
               ref="ChartDomRef"></div>
          <div class="chart-title__container">
            <div class="note1"
                 :style="{
                   color: componentConfig.annotation1Color,
                   fontSize: componentConfig.annotation1FontSize + 'px',
                   fontFamily: componentConfig.annotation1Fontfamily
                 }"
                 v-if="componentConfig.annotation1Show">{{componentConfig.annotation1Label}}</div>
            <div class="note2"
                 :style="{
                   color: componentConfig.annotation2Color,
                   fontSize: componentConfig.annotation2FontSize + 'px',
                   fontFamily: componentConfig.annotation2Fontfamily
                 }"
                 v-if="componentConfig.annotation2Show">{{componentConfig.annotation2Label}}</div>
          </div>
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
export default {
  name: 'Pie2',
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
      default: () => ({
        // 标题的配置
        titleLabel: '标题',
        titleColor: 'rgb(83, 226, 255)',
        titleFontSize: 18,
        titleFamily: 'sans-serif,Microsoft YaHei',
        titleTextAlign: 'left',
        titleFontWeight: 'normal',
        titleShowStatus: true,

        // 注释的配置
        noteLabel: '注释',
        noteColor: '#fff',
        noteFontSize: 16,
        noteFamily: 'sans-serif,Microsoft YaHei',
        noteTextAlign: 'left',
        noteFontWeight: 'normal',
        noteShowStatus: false,

        // 标签栏配置
        tabsShow: false,
        tabSlidePeriod: 60, // 轮播间隔 单位秒
        tabActiveIndex: 0, // 当前高亮的标签
        tabKey: 'test', // 用于查询的key
        tabs: [
          { label: '标签1', value: '1' },
          { label: '标签2', value: '2' },
          { label: '标签3', value: '3' }
        ],

        // 环形图注释1
        annotation1Show: true,
        annotation1Label: '环形图注释1',
        annotation1Color: '#5ab3fe',
        annotation1FontSize: 14,
        annotation1Fontfamily: 'sans-serif,Microsoft YaHei',

        // 环形图注释2
        annotation2Show: true,
        annotation2Label: '环形图注释2',
        annotation2Color: '#5ab3fe',
        annotation2FontSize: 14,
        annotation2Fontfamily: 'sans-serif,Microsoft YaHei',

        data: {},

        chartOption: {}
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
    },
    'componentConfig.tabActiveIndex': {
      handler: function (newVal) {
        this.tabActiveIndex = this.componentConfig.tabActiveIndex;
      }
    },
    'componentConfig.tabSlidePeriod': {
      handler: function (newVal) {
        this.initTimer();
      }
    }
  },
  data() {
    return {
      scale: 1,
      tabActiveIndex: 0
    };
  },
  created() {
    this.tabActiveIndex = this.componentConfig.tabActiveIndex;
    this._resizehandlerThrottle = throttle(this.resizehandler, 100);
  },
  mounted() {
    this._resizeObserver = new ResizeObserver(this._resizehandlerThrottle);
    this._resizeObserver.observe(this.$refs['Pie2WrapperRef']);
    this.initChart();
    this.initTimer();
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
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    initTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      const tabSlidePeriod = parseInt(this.componentConfig.tabSlidePeriod);
      // 如果是0就不轮播
      if (!tabSlidePeriod || tabSlidePeriod === 0) {
        return;
      }
      this.timer = setInterval(() => {
        const index = this.tabActiveIndex + 1;
        this.tabActiveIndex = index % this.componentConfig.tabs.length;
        // TODO 需要在这里切换数据或者什么的
        console.log(this.tabActiveIndex, 'tabActiveIndex');
      }, tabSlidePeriod * 1000);
    },
    async initChart(chartData) {
      if (!this.chartIns) {
        this.chartIns = echarts.init(this.$refs['ChartDomRef']);
      }
      const _vm = this;
      let pieData = [
        { value: 335, name: '主指标1' },
        { value: 310, name: '主指标2' },
        { value: 234, name: '主指标3' }
      ];
      const data = this.componentConfig.data;
      if (data.businessType === '指标库导入') {
      } else if (data.businessType === '静态数据') {
        try {
          pieData = JSON.parse(data.staticData);
        } catch (error) {
          this.$message.error('静态数据解析出错');
          return;
        }
      } else if (data.businessType === '自定义API') {
      }
      const legendData = pieData.map((_) => _.name);
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          bottom: 6,
          data: legendData,
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        series: [
          {
            type: 'pie',
            radius: ['38%', '52%'],
            label: {
              show: true,
              color: '#ffffff',
              formatter: ['{b}', '{d}%'].join('\n'),
              padding: [0, -55],
              align: 'right',
              fontSize: 12,
              lineHeight: 22
            },
            labelLine: {
              show: true,
              length: 20,
              length2: 60,
              lineStyle: {
                width: 2
              }
            },

            data: pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
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
        componentName: 'Pie2'
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

.component__container {
  width: 400px;
  height: 300px;
  transform-origin: left top;
}

.sub-title__container {
  .tab {
    display: inline-block;
    font-size: 14px;
    line-height: 1;
    padding: 8px 0;
    color: #fff;
    padding: 0 12px;
    cursor: pointer;
    position: relative;

    &.active {
      color: #5ab3fe;

      &:after {
        display: block;
      }
    }

    &:after {
      content: ' ';
      background: #5ab3fe;
      width: 20px;
      height: 4px;
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      display: none;
    }
  }
}

.chart-dom {
  position: relative;
}

.chart-dom__container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.chart-title__container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.note1 {
  color: #5ab3fe;
  font-size: 14px;
  line-height: 1;
}

.note2 {
  margin-top: 4px;
  font-size: 14px;
  color: #5ab3fe;
  line-height: 1;
}
</style>
