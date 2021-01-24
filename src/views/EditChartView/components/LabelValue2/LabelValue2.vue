<template>
  <div class="head-title1__wrapper"
       ref="LabelValue2WrapperRef">
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
      <div class="value"
           v-if="componentConfig.valueShowStatus"
           :style="{
          color: componentConfig.valueColor,
          fontSize: componentConfig.valueFontSize  + 'px',
          fontFamily: componentConfig.valueFamily,
          fontWeight: componentConfig.valueFontWeight,
      }">
        <div class="text_container"
             :style="valueContainerStyle">
          <span class="value-text"
                :style="{
          color: componentConfig.valueColor,
          fontSize: componentConfig.valueFontSize  + 'px',
          fontFamily: componentConfig.valueFamily,
          fontWeight: componentConfig.valueFontWeight,
        }">{{value | seperator}}</span>
          <span class="unit-name"
                :style="{
          fontSize: parseInt(componentConfig.valueFontSize / 1.7)  + 'px',
        }">万人</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import throttle from 'lodash/throttle';
import { getKpiData } from '../../api';
export default {
  name: 'LabelValue2',
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
        titleLabel: '评价数',
        titleColor: 'rgb(255, 255, 255)',
        titleFontSize: 21,
        titleFamily: 'sans-serif,Microsoft YaHei',
        titleFontWeight: 'normal',
        titleTextAlign: 'center',
        titleShowStatus: true,
        // 值的配置
        value: '23456',
        valueColor: '#87E7FF',
        valueFontSize: 36,
        valueFamily: 'sans-serif,Microsoft YaHei',
        valueFontWeight: 'bold',
        valueTextAlign: 'center',
        valueShowStatus: true,
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
  computed: {
    valueContainerStyle: function () {
      let style = {
        left: '-60px',
        textAlign: 'center'
      };
      switch (this.componentConfig.valueTextAlign) {
        case 'left':
          style = {
            left: 0,
            right: 'auto',
            textAlign: 'left'
          };
          break;
        case 'center':
          style = {
            left: '-60px',
            right: 'auto',
            textAlign: 'center'
          };
          break;
        case 'right':
          style = {
            left: 'auto',
            right: 0,
            textAlign: 'right'
          };
          break;

        default:
          style = {
            left: '-60px',
            textAlign: 'center'
          };
          break;
      }
      return style;
    }
  },
  filters: {
    seperator: function (str) {
      if (str) {
        return str
          .toString()
          .split('')
          .reverse()
          .reduce((prev, next, index) => {
            return (index % 3 ? next : next + ',') + prev;
          });
      }
      return '0';
    }
  },
  created() {
    this.initValue();
    this._resizehandlerThrottle = throttle(this.resizehandler, 100);
  },
  mounted() {
    this._resizeObserver = new ResizeObserver(this._resizehandlerThrottle);
    this.$nextTick(() => {
      this._resizeObserver.observe(this.$refs['LabelValue2WrapperRef']);
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
      const scale = width / 120;
      this.scale = scale;
      this.$emit('resize', {
        contentRect,
        i: this.i,
        initialW: 120,
        initialH: 88,
        scaleNew: scale,
        componentName: 'LabelValue2'
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
  width: 120px;
  height: 88px;
  white-space: nowrap;

  > div {
    text-align: center;
    line-height: 1;
  }

  .label {
    font-size: 21px;
    font-weight: normal;
    color: #FFFFFF;
  }

  .value {
    font-weight: bold;
    color: #87E7FF;
    margin-top: 30px;
    position: relative;
    height: 36px;

    .text_container {
      width: 240px;
      position: absolute;
      top: 0;
      left: -60px;
    }

    .value-text {
    }

    .unit-name {
      margin-left: 7px;
    }
  }
}
</style>
