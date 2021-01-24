<template>
  <div class="title1__wrapper"
       ref="Title1WrapperRef">
    <div class="title1__container"
         :style="{
          transform: 'scale('+scale+')'
        }">
      <div class="bg"></div>
      <div class="text_container"
           v-if="componentConfig.showStatus"
           :style="{textAlign: componentConfig.textAlign}">
        <span :style="{
        fontWeight: componentConfig.fontWeight,
        color: componentConfig.color,
        fontSize: componentConfig.fontSize + 'px',
        fontFamily: componentConfig.fontFamily}">{{componentConfig.title}}</span>
      </div>
      <div class="time-container"
           v-if="componentConfig.timeShowStatus"
           :style="{
        textAlign: componentConfig.timeTextAlign,
      }">
        <span :style="{
            fontFamily: componentConfig.timeFontFamily,
            color: componentConfig.timeColor,
            fontSize: componentConfig.timefontSize + 'px',
            fontWeight: componentConfig.timeFontWeight
        }">当前时间：{{time}}</span>
      </div>

    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle';
import { formatDateTime } from '@/views/EditChartView/utils.js';
export default {
  name: 'Title1',
  props: {
    i: {
      type: String | Number,
      required: true
    },
    componentConfig: {
      type: Object,
      required: true,
      default: () => ({
        title: '看板标题',
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'sans-serif,Microsoft YaHei, sans-serif',
        showStatus: true,
        // 时间的一些设定
        timeShowStatus: true,
        timeFontFamily: 'sans-serif,Microsoft YaHei',
        timeColor: '#62D2FF',
        timefontSize: 14,
        timeTextAlign: 'right',
        timeFontWeight: 'normal'
      })
    }
  },
  data() {
    return {
      scale: 1,
      time: formatDateTime()
    };
  },
  computed: {},
  created() {
    this.initTimer();
    this._resizehandlerThrottle = throttle(this.resizehandler, 100);
  },
  mounted() {
    this._resizeObserver = new ResizeObserver(this._resizehandlerThrottle);
    this._resizeObserver.observe(this.$refs['Title1WrapperRef']);
  },
  beforeDestroy() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    this.clearTimer();
  },
  methods: {
    initTimer() {
      this.clearTimer();
      this.timer = setInterval(() => {
        this.time = formatDateTime();
      }, 1000);
    },
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    resizehandler(entries) {
      const dOMRectReadOnly = entries[0];
      const contentRect = dOMRectReadOnly.contentRect;
      const width = contentRect.width;
      const scale = width / 1200;
      this.scale = scale;
      this.$emit('resize', {
        contentRect,
        i: this.i,
        initialW: 1200,
        initialH: 30,
        scaleNew: scale,
        componentName: 'Title1'
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.title1__wrapper {
  width: 100%;
  height: 100%;
}

.title1__container {
  width: 1200px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transform-origin: left top;

  .bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 200px;
    right: 200px;
    background-image: url('../../assets/title1_bg.png');
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
    z-index: 1;
  }

  .time-container {
    position: absolute;
    z-index: 3;
    left: 20px;
    right: 20px;
    top: 0;
    bottom: 0;
    line-height: 30px;
    text-align: right;

    span {
      font-family: sans-serif, Microsoft YaHei;
      color: #62D2FF;
      font-size: 16px;
    }
  }

  .text_container {
    position: absolute;
    z-index: 4;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    line-height: 30px;

    span {
      font-family: sans-serif, Microsoft YaHei;
    }
  }
}
</style>
