<template>
  <div class="head-title1__wrapper"
       ref="LabelValue11WrapperRef">
    <!-- <div class="title1__container"
         :style="{
          transform: 'scale('+scale+')'
        }">
    </div> -->
    <div class="label-value__container"
         :style="{ transform: 'scale('+scale+')'}">
      <div class="label"
           v-if="componentConfig.titleShowStatus"
           :style="{
          color: componentConfig.titleColor,
          fontSize: componentConfig.titleFontSize  + 'px',
          fontFamily: componentConfig.titleFamily,
          fontWeight: componentConfig.titleFontWeight,
          textAlign: componentConfig.titleTextAlign
      }">{{componentConfig.titleLabel}}</div>
      <div class="progress__container" :style="{
        backgroundColor: componentConfig.barBackgroundColor,
        height: componentConfig.barHeight + 'px',
        borderRadius: componentConfig.barHeight / 2 + 'px'
      }">
        <div class="foreground-bar" :style="{
          backgroundColor: componentConfig.barForegroundColor,
          borderRadius: componentConfig.barHeight / 2 + 'px'
        }"></div>
      </div>
      <div class="value"
           v-if="componentConfig.valueShowStatus"
           :style="{
          color: componentConfig.valueColor,
          fontSize: componentConfig.valueFontSize  + 'px',
          fontFamily: componentConfig.valueFamily,
          fontWeight: componentConfig.valueFontWeight,
      }">
        <span class="value-text"
              :style="{
          color: componentConfig.valueColor,
          fontSize: componentConfig.valueFontSize  + 'px',
          fontFamily: componentConfig.valueFamily,
          fontWeight: componentConfig.valueFontWeight,
        }">{{value | separateWithComma}}</span>
        <span class="unit-name"
              v-if="componentConfig.unitShowStatus"
              :style="{
                fontSize: componentConfig.unitFontSize + 'px',
                color: componentConfig.unitColor,
                fontSFamily: componentConfig.unitFamily,
                fontWeight: componentConfig.unitFontWeight
        }">{{componentConfig.unitName}}</span>
      </div>
    </div>
  </div>

</template>

<script>
import throttle from 'lodash/throttle';
import { getKpiData } from '../../api';
export default {
  name: 'LabelValue11',
  props: {
    i: {
      type: String | Number,
      required: true
    },
    moduleId: {
      type: String,
      required: true
    },
    componentConfig: {
      type: Object,
      required: true,
      default: () => ({
        // 标题的配置
        titleLabel: '医疗服务新增数',
        titleColor: 'rgb(255, 255, 255)',
        titleFontSize: 14,
        titleFamily: 'sans-serif,Microsoft YaHei',
        titleFontWeight: 'normal',
        titleTextAlign: 'center',
        titleShowStatus: true,
        // 进度条的配置
        barForegroundColor: '#53E2FF',
        barBackgroundColor: '#2C547C',
        barHeight: 10,
        barShowStatus: false,
        // 值的配置
        value: '23',
        valueColor: '#80DFF7',
        valueFontSize: 20,
        valueFamily: 'sans-serif,Microsoft YaHei',
        valueFontWeight: 'bold',
        valueTextAlign: 'center',
        valueShowStatus: true,
        // 单位的配置
        unitName: '个',
        unitColor: '#F3D175',
        unitFontSize: 20,
        unitFamily: 'sans-serif,Microsoft YaHei',
        unitFontWeight: 'bold',
        unitShowStatus: true,
        data: {}
      })
    }
  },
  data() {
    return {
      scale: 1,
      value: 23456
    };
  },
  watch: {
    'componentConfig.data': {
      deep: true,
      handler: function (newVal) {
        this.initValue();
      }
    }
  },
  computed: {},

  created() {
    this.initValue();
    this._resizehandlerThrottle = throttle(this.resizehandler, 100);
  },
  mounted() {
    this._resizeObserver = new ResizeObserver(this._resizehandlerThrottle);
    this.$nextTick(() => {
      this._resizeObserver.observe(this.$refs['LabelValue11WrapperRef']);
    });
  },
  beforeDestroy() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  },
  methods: {
    initValue() {
      this.value = this.componentConfig.value;
      const data = this.componentConfig.data;
      if (data) {
        switch (data.businessType) {
          case '指标库导入': {
            getKpiData({
              moduId: this.moduleId,
              kpiId: data.businessIndexSet
            }).then((res) => {
              try {
                if (res.code == 0 && res.data) {
                  const key = data.fieldList[0];
                  this.value = res.data.data.map((_) => _[key])[0];
                }
              } catch (error) {}
            });
            break;
          }
          case '静态数据': {
            try {
              const staticData = JSON.parse(data.staticData);
              this.value = staticData.value;
            } catch (error) {
              this.$message.error('静态数据解析失败');
            }
            break;
          }

          case '自定义API':
            break;

          default:
            break;
        }
      }
    },
    resizehandler(entries) {
      const dOMRectReadOnly = entries[0];
      const contentRect = dOMRectReadOnly.contentRect;
      const width = contentRect.width;
      const scale = width / 270;
      this.scale = scale;
      this.$emit('resize', {
        contentRect,
        i: this.i,
        initialW: 270,
        initialH: 74,
        scaleNew: scale,
        componentName: 'LabelValue11'
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

.label-value__container {
  // background-color: #ccc;
  transform-origin: left top;
  width: 270px;
  height: 74px;
  white-space: nowrap;

  .label {
    font-size: 14px;
    text-align: left;
    font-weight: normal;
    color: #FFFFFF;
    line-height: 1;
  }

  .progress__container {
    width: 100%;
    height: 10px;
    background-color: #2C547C;
    border-radius: 5px;
    margin-top: 20px;

    .foreground-bar {
      width: 30%;
      height: 100%;
      background-color: #53E2FF;
    }
  }

  .value {
    font-weight: bold;
    color: #87E7FF;
    position: relative;
    line-height 1
    margin-top: 10px;

    .value-text {
    }

    .unit-name {
      margin-left: 2px;
    }
  }
}
</style>
