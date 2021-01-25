<template>
  <div class="head-title1__wrapper"
       ref="HeadTitle2WrapperRef">
    <div class="title1__container"
         :style="{
          transform: 'scale('+scale+')'
        }">
      <div class="title"
           :style="{
                color: componentConfig.titleColor,
                fontSize: componentConfig.titleFontSize + 'px',
                fontWeight: componentConfig.titleFontWeight,
                justifyContent: justifyContent
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
        <span class="title-text"
              :style="{fontFamily: componentConfig.titleFamily}">{{componentConfig.titleLabel}}</span>

        <svg version="1.1"
             viewBox="0 0 1024 1024"
             class="iconStyle rotate180">
          <path d="M475.428571 0H182.857143l365.714286 512-365.714286 512h292.571428l365.714286-502.857143z"
                stroke="transparent"></path>
        </svg>
        <svg version="1.1"
             viewBox="0 0 1024 1024"
             class="iconStyle rotate180"
             style="opacity: 0.7;">
          <path d="M475.428571 0H182.857143l365.714286 512-365.714286 512h292.571428l365.714286-502.857143z"
                stroke="transparent"></path>
        </svg>
        <svg version="1.1"
             viewBox="0 0 1024 1024"
             class="iconStyle rotate180"
             style="opacity: 0.3;">
          <path d="M475.428571 0H182.857143l365.714286 512-365.714286 512h292.571428l365.714286-502.857143z"
                stroke="transparent"></path>
        </svg>

      </div>

    </div>
  </div>

</template>

<script>
import throttle from 'lodash/throttle';
export default {
  name: 'HeadTitle2',
  props: {
    i: {
      type: String | Number,
      required: true
    },
    componentConfig: {
      type: Object,
      required: true,
      default: () => ({
        titleLabel: '标题',
        titleColor: 'rgb(83, 226, 255)',
        titleFontSize: 18,
        titleFamily: 'sans-serif,Microsoft YaHei',
        titleTextAlign: 'left',
        titleFontWeight: 'normal',
        titleShowStatus: true
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
      switch (this.componentConfig.titleTextAlign) {
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
    this._resizeObserver.observe(this.$refs['HeadTitle2WrapperRef']);
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
      const scale = width / 320;
      this.scale = scale;
      this.$emit('resize', {
        contentRect,
        i: this.i,
        initialW: 320,
        initialH: 40,
        scaleNew: scale,
        componentName: 'HeadTitle2'
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.head-title1__wrapper {
  width: 100%;
  height: 100%;
}

.title1__container {
  width: 320px;
  height: 40px;
  transform-origin: left top;

  .title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    // overflow: hidden;
    white-space: nowrap;
    // text-overflow: ellipsis;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    .iconStyle {
      width: 10px;
      height: 16px;
      display: inline-block;
      vertical-align: baseline;
      fill: currentColor;

      &.rotate180 {
        transform: rotate(180deg);
        transform-origin: center;
      }
    }

    .title-text {
      margin: 0 20px;
      display: inline-block;
      line-height: 1;
      // flex: 1;
     /*  overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis; */
    }
  }
}
</style>
