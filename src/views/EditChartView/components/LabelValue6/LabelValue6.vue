<template>
  <div class="head-title1__wrapper"
       ref="LabelValue1WrapperRef">
    <div class="label-value__container"
         :style="{ transform: 'scale('+scale+')'}">

      <div class="value-unit">
        <span class="value"
              v-if="componentConfig.valueShowStatus"
              :style="{ 
          color: componentConfig.valueColor,
          fontSize: componentConfig.valueFontSize  + 'px',
          fontFamily: componentConfig.valueFamily,
          fontWeight: componentConfig.valueFontWeight,
      }">{{value | separateWithComma}}</span>
        <span class="unit"
              v-if="componentConfig.unitShowStatus"
              :style="{ 
          color: componentConfig.unitColor,
          fontSize: componentConfig.unitFontSize  + 'px',
          fontFamily: componentConfig.unitFamily,
          fontWeight: componentConfig.unitFontWeight,
      }">{{componentConfig.unitName}}</span>
      </div>
      <span class="label"
            v-if="componentConfig.titleShowStatus"
            :style="{
          color: componentConfig.titleColor,
          fontSize: componentConfig.titleFontSize  + 'px',
          fontFamily: componentConfig.titleFamily,
          fontWeight: componentConfig.titleFontWeight,
      }">{{componentConfig.titleLabel}}</span>
      <!-- {{89}}{{componentConfig.titleLabelUnit}} -->

    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle';
import { getKpiData } from '../../api';
export default {
  name: 'LabelValue6',
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
        titleLabel: '征缴率:',
        titleLabelUnit: '%',
        titleColor: '#ffffff',
        titleFontSize: 16,
        titleFamily: 'sans-serif,Microsoft YaHei',
        titleFontWeight: 'normal',
        titleShowStatus: true,
        // 值的配置
        valueColor: '#99E1FF',
        valueFontSize: 26,
        valueFamily: 'sans-serif,Microsoft YaHei',
        valueFontWeight: 'bold',
        valueShowStatus: true,
        // 单位的配置
        unitName: '万元',
        unitShowStatus: true,
        unitColor: '#99E1FF',
        unitFontSize: 16,
        unitFamily: 'sans-serif,Microsoft YaHei',
        unitFontWeight: 'normal',
        data: {}
      })
    }
  },
  data() {
    return {
      scale: 1,
      value: 78,
      unitName: '万元'
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
                if (res.code == 0 && res.data) {
                  const key = data.fieldList[0];
                  this.value = res.data.data.map((_) => _[key])[0] * 100;
                  this.unitName = res.data.propUnits[key];
                }
              } catch (error) {}
            });
            break;
          }
          case '静态数据': {
            try {
              const staticData = JSON.parse(data.staticData);
              this.value = staticData.value;
              this.unitName = staticData.unitName;
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
      const scale = width / 205;
      this.scale = scale;
      this.$emit('resize', {
        contentRect,
        i: this.i,
        initialW: 205,
        initialH: 155,
        scaleNew: scale,
        componentName: 'LabelValue4'
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
  width: 205px;
  height: 155px;
  position: relative;
  background-image: url('./imgs/bg.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;

  .value-unit {
    padding-top: 42px;
    text-align: center;
    font-size: 26px;
    line-height: 1;

    .value {
      font-size: 26px;
      font-weight: bold;
      color: #99E1FF;
    }

    .unit {
      color: #99E1FF;
      font-size: 16px;
    }
  }

  .label {
    font-size: 16px;
    font-weight: normal;
    color: #FFFFFF;
    display: block;
    text-align: center;
    line-height: 1;
    margin-top: 44px;
  }
}
</style>
