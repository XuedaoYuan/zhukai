<template>
  <div class="title1__wrapper"
       ref="Title3WrapperRef">
    <div class="title1__container"
         :style="{
          transform: 'scale('+scale+')'
        }">
      <div class="left"></div>
      <div class="middle-title"
           v-show="componentConfig.showStatus"
           :style="{
          color: componentConfig.color,
          textAlign: componentConfig.textAlign,
          fontSize:componentConfig.fontSize + 'px',
          fontFamily: componentConfig.fontFamily,
          fontWeight: componentConfig.fontWeight
      }">{{componentConfig.title}}</div>
      <div class="right"></div>

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
        title: '待遇政策基金支出',
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'sans-serif,Microsoft YaHei',
        fontWeight: 'normal',
        showStatus: true
      })
    }
  },
  data() {
    return {
      scale: 1
    };
  },
  computed: {},
  created() {
    this._resizehandlerThrottle = throttle(this.resizehandler, 100);
  },
  mounted() {
    this._resizeObserver = new ResizeObserver(this._resizehandlerThrottle);
    this._resizeObserver.observe(this.$refs['Title3WrapperRef']);
  },
  beforeDestroy() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  },
  methods: {
    resizehandler(entries) {
      const dOMRectReadOnly = entries[0];
      const contentRect = dOMRectReadOnly.contentRect;
      const width = contentRect.width;
      const scale = width / 948;
      this.scale = scale;
      this.$emit('resize', {
        contentRect,
        i: this.i,
        initialW: 948,
        initialH: 16,
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
  width: 948px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transform-origin: left top;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    flex: 0 0 370px;
    height: 12px;
    background-image: url('./img/bg.png');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    transform: rotateY(180deg);
    transform-origin: center;
  }

  .middle-title {
    flex: 1;
    color: #fff;
    text-align: center;
  }

  .right {
    flex: 0 0 370px;
    height: 12px;
    background-image: url('./img/bg.png');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>
