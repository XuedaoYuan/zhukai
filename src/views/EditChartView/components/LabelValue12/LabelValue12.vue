<template>
  <div class="head-title1__wrapper"
       ref="LabelValue1WrapperRef">

    <div class="label-value__container"
         :style="{
      transform: 'scale('+scale+')'
    }">
      <span :class="['value', deltaValue > 0 ? 'red' : 'green']">{{value | separateWithComma}}</span>
      <span class="icon icon-up"
            v-if="deltaValue > 0"></span>
      <span class="icon icon-down"
            v-else></span>
      <span :class="['delta-value', deltaValue > 0 ? 'red' : 'green']">{{deltaValue | separateWithComma}}</span>
      <span :class="['delta-percent', deltaValue > 0 ? 'red' : 'green']">(
        <template v-if="deltaPercent > 0">+</template>{{deltaPercent + '%'}})
      </span>
      <div class="divide"></div>
      <span class="last-month-label">上月</span>
      <span :class="['last-month-value', deltaValue > 0 ? 'green' : 'red']">{{lastMonthValue | separateWithComma}}</span>
    </div>
  </div>

</template>

<script>
import throttle from 'lodash/throttle';
import { getKpiData } from '../../api';
export default {
  name: 'LabelValue12',
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
        data: {}
      })
    }
  },
  data() {
    return {
      scale: 1,
      value: 3414,
      deltaValue: 35,
      deltaPercent: 1.05,
      lastMonthValue: 3379.2
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
  filters: {},
  created() {
    this.initValue();
    this._resizehandlerThrottle = throttle(this.resizehandler, 100);
  },
  mounted() {
    this._resizeObserver = new ResizeObserver(this._resizehandlerThrottle);
    this.$nextTick(() => {
      this._resizeObserver.observe(this.$refs['LabelValue1WrapperRef']);
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
                if (res && res.code == 0 && res.data) {
                  const valueKey = data.fieldList[0];
                  const deltaValueKey = data.fieldList[1];
                  const deltaPercentKey = data.fieldList[2];
                  const lastMonthValueKey = data.fieldList[3];
                  const dataMap = res.data.data[0];
                  if (valueKey) {
                    this.value = dataMap[valueKey];
                  }
                  if (deltaValueKey) {
                    this.deltaValue = dataMap[deltaValueKey];
                  }
                  if (deltaPercentKey) {
                    this.deltaPercent = dataMap[deltaPercentKey];
                  }
                  if (lastMonthValueKey) {
                    this.lastMonthValue = dataMap[lastMonthValueKey];
                  }
                }
              } catch (error) {
                this.$message.error('数据配置出错');
              }
            });
            break;
          }
          case '静态数据': {
            try {
              const staticData = JSON.parse(data.staticData);
              this.value = staticData.value;
              this.deltaValue = staticData.deltaValue;
              this.deltaPercent = staticData.deltaPercent;
              this.lastMonthValue = staticData.lastMonthValue;
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
      const scale = width / 378;
      this.scale = scale;
      this.$emit('resize', {
        contentRect,
        i: this.i,
        initialW: 378,
        initialH: 50,
        scaleNew: scale,
        componentName: 'LabelValue12'
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
  width: 378px;
  height: 50px;
  position: relative;
  padding: 0 30px;
  display: flex;
  align-items: center;
  white-space nowrap

  > span {
    display: block;
    line-height: 1;
  }

  > span.red {
    color: red;
  }

  >span.green {
    color: #42F03B;
  }

  .icon {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 3px;
    margin: 0 10px;
  }

  .icon-up {
    border-color: transparent transparent #FF0000 transparent;
  }

  .icon-down {
    border-color: #42F03B transparent transparent transparent;
    position: relative;
    top: 5px;
  }

  .value {
    font-size: 18px;
  }

  .delta-value, .delta-percent {
    font-size: 12px;
  }

  .divide {
    background-color: #2F4184;
    flex: 0 0 1px;
    height: 18px;
    margin: 0 30px;
  }

  .last-month-label {
    font-size: 14px;
    color: #fff;
    margin-right: 15px;
  }

  .last-month-value {
    font-size: 14px;
  }
}
</style>
