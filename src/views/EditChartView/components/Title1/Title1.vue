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
           :style="{textAlign: componentConfig.textAlign}"
           >
        <span :style="{
        fontWeight: componentConfig.fontWeight,
        color: componentConfig.color,
        fontSize: componentConfig.fontSize + 'px',
        fontFamily: componentConfig.fontFamily}">{{componentConfig.title}}</span>
      </div>

    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle';
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
        showStatus: true
      })
    }
  },
  data() {
    return {
      scale: 1
    };
  },
  computed: {
    justifyContent: function () {
      switch (this.componentConfig.textAlign) {
        case 'left':
          return 'flex-start';
        case 'center':
          return 'center';
        case 'right':
          return 'flex-end';

        default:
          return 'center';
      }
    }
  },
  created() {
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
  },
  methods: {
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

  .text_container {
    position: absolute;
    z-index: 2;
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
