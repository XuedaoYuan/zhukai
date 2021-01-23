<template>
  <div class="pie3__wrapper"
       ref="Pie3WrapperRef">
    <div class="component__container pie3__container"
       :style="{transform: 'scale(' + scale + ')'}"
    >
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
      <el-row class="main" type="flex" align="middle" justify="center">
        <div class="content">
          <div class="circle">
            <div class="circle-title">采集数</div>
            <div>
              <b class="circle-number">12.1</b>
              <b class="circle-unit">万人</b>
            </div>
          </div>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
import _throttle from 'lodash/throttle';
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
        titleShowStatus: true,
        titleLabel: '执业药师评价情况',
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
    // 'componentConfig.data.staticData': {
    //   immediate: true,
    //   handler: function (val, oldVal) {
    //     const data = _attempt(() => {
    //       return JSON.parse(val);
    //     });
    //     if (_isError(data)) {
    //       this.componentData = [];
    //     } else {
    //       this.componentData = data;
    //     }
    //     this.$nextTick(() => {
    //       this.initChart();
    //     });
    //   }
    // }
  },
  created() {
    this._resizehandlerThrottle = _throttle(this.resizehandler, 100);
  },
  mounted() {
    this._resizeObserver = new ResizeObserver(this._resizehandlerThrottle);
    this._resizeObserver.observe(this.$refs['Pie3WrapperRef']);
  },
  beforeDestroy() {
  },
  methods: {
    resizehandler(entries) {
      const dOMRectReadOnly = entries[0];
      const contentRect = dOMRectReadOnly.contentRect;
      const width = contentRect.width;
      const scale = width / 300;
      this.scale = scale;
      this.$emit('resize', {
        contentRect,
        i: this.i,
        scaleNew: scale,
        initialW: 302,
        initialH: 302,
        componentName: 'Pie3'
      });
    }
  }
};
</script>
<style scoped lang="stylus">
.pie3__container {
  width: 302px;
  height: 302px;

  .main {
    margin-top: 60px;
  }
  
  .content {
    width: 161px;
    height: 161px;
    background-image: url('./imgs/circle@2x.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    position: relative;

    .circle{
      position: absolute;
      width: 118px;
      height: 118px;
      top: 24px;
      left: 24px;
      border: 20px solid #F4B869;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .circle-title {
        width: 42px;
        height: 14px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 14px;
        margin-bottom: 15px;
      }

      .circle-number {
        width: 31px;
        height: 18px;
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #F4B869;
        line-height: 18px;
        margin-right: 2px;
      }

      .circle-unit {
        width: 24px;
        height: 12px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #F4B869;
        line-height: 12px;
      }
    }
  }
}
</style>
