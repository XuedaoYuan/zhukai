<template>
  <div class="head-title1__wrapper"
       ref="HeadTitle3WrapperRef">
    <div class="title1__container"
         :style="{
          transform: 'scale('+scale+')'
        }">
      <div class="title">
        <i class="icon"
           :style="{backgroundColor: componentConfig.titleColor,
                height: componentConfig.titleFontSize - 4 + 'px'
           }"></i>
        <span :style="{
                color: componentConfig.titleColor,
                fontSize: componentConfig.titleFontSize + 'px',
                fontWeight: componentConfig.titleFontWeight,
                fontFamily: componentConfig.titleFamily
      }">{{componentConfig.titleLabel}}</span>
      </div>

    </div>
  </div>

</template>

<script>
import throttle from 'lodash/throttle';
export default {
  name: 'HeadTitle3',
  props: {
    i: {
      type: String | Number,
      required: true
    },
    componentConfig: {
      type: Object,
      required: true,
      default: () => ({
        // 标题的配置
        titleLabel: '医疗服务综合价格指数',
        titleColor: '#0DA2D2',
        titleFontSize: 14,
        titleFamily: 'sans-serif,Microsoft YaHei',
        titleFontWeight: 'normal',
        titleIconShowStatus: true
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
    this._resizeObserver.observe(this.$refs['HeadTitle3WrapperRef']);
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
      const scale = width / 154;
      this.scale = scale;
      this.$emit('resize', {
        contentRect,
        i: this.i,
        initialW: 154,
        initialH: 14,
        scaleNew: scale,
        componentName: 'HeadTitle3'
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
  width: 154px;
  height: 14px;
  transform-origin: left top;

  .title {
    width: 100%;
    color: #0DA2D2;
    font-size: 14px;
    line-height: 1;
    white-space: nowrap;
    display: flex;
    align-items: center;

    i.icon {
      flex: 0 0 4px;
      height: 10px;
      background-color: #0DA2D2;
      margin-right: 8px;
    }

    span {
      display: inline-block;
    }
  }
}
</style>
