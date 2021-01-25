<template>
  <div class="head-title1__wrapper"
       ref="LabelValue3WrapperRef">
    <!-- <div class="title1__container"
         :style="{
          transform: 'scale('+scale+')'
        }">
    </div> -->
    <div class="label-value__container"
         :style="{ 
           transform: 'scale('+scale+')',
           backgroundColor: componentConfig.backgroundShow ? componentConfig.backgroundColor : 'transparent',
           borderWidth: componentConfig.borderShow ? componentConfig.borderWidth + 'px' : 0,
           borderStyle: componentConfig.borderStyle,
           borderColor: componentConfig.borderColor
           }">
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
        }">{{value}}</span>
          <span>万人</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import throttle from 'lodash/throttle';
import { getKpiData } from '../../api';
export default {
  name: 'LabelValue3',
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
        titleLabel: '城镇职工基金预算',
        titleColor: '#FFFFFF',
        titleFontSize: 14,
        titleFamily: 'sans-serif,Microsoft YaHei',
        titleFontWeight: 'normal',
        titleTextAlign: 'center',
        titleShowStatus: true,
        // 值的配置
        valueColor: '#5AB3FE',
        valueFontSize: 14,
        valueFamily: 'sans-serif,Microsoft YaHei',
        valueFontWeight: 'normal',
        valueTextAlign: 'center',
        valueShowStatus: true,
        // 框样式
        backgroundColor: '#142A5D',
        backgroundShow: true,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#2F4184',
        borderShow: true,
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
        left: '-100px',
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
            left: '-100px',
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
            left: '-100px',
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
      this._resizeObserver.observe(this.$refs['LabelValue3WrapperRef']);
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
      const scale = width / 200;
      this.scale = scale;
      this.$emit('resize', {
        contentRect,
        i: this.i,
        initialW: 200,
        initialH: 88,
        scaleNew: scale,
        componentName: 'LabelValue3'
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
  background-color: #142A5D;
  border: 1px solid #2F4184;
  transform-origin: left top;
  width: 200px;
  height: 88px;
  white-space: nowrap;

  > div {
    text-align: center;
    line-height: 1;
  }

  .label {
    font-size: 14px;
    font-weight: normal;
    color: #FFFFFF;
    padding-top: 20px;
  }

  .value {
    font-weight: bold;
    color: #5AB3FE;
    margin-top: 20px;
    position: relative;
    line-height: 1;

    .text_container {
      width: 400px;
      position: absolute;
      top: 0;
      left: -100px;
    }

    .value-text {
    }
  }
}
</style>
