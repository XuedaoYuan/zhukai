<template>
  <div class="head-title1__wrapper"
       ref="LabelValue1WrapperRef">
    <!-- <div class="title1__container"
         :style="{
          transform: 'scale('+scale+')'
        }">
    </div> -->
    <div class="label-value__container"
         :style="{ transform: 'scale('+scale+')'}">
      <div class="label-value--wrapper">
        <span class="label"
              v-if="componentConfig.titleShowStatus"
              :style="{
          color: componentConfig.titleColor,
          fontSize: componentConfig.titleFontSize  + 'px',
          fontFamily: componentConfig.titleFamily,
          fontWeight: componentConfig.titleFontWeight,
      }">{{componentConfig.titleLabel}}</span>
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
      }">{{unitName}}</span>
      </div>
    </div>
  </div>

</template>

<script>
import throttle from 'lodash/throttle';
import { getKpiData } from '../../api';
export default {
  name: 'LabelValue4',
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
        titleFontSize: 14,
        titleFamily: 'sans-serif,Microsoft YaHei',
        titleFontWeight: 'normal',
        titleShowStatus: true,
        // 值的配置
        value: '23456',
        valueColor: '#87E7FF',
        valueFontSize: 20,
        valueFamily: 'sans-serif,Microsoft YaHei',
        valueFontWeight: 'bold',
        valueShowStatus: true,
        // 单位的配置
        unitShowStatus: true,
        unitName: '亿元',
        unitColor: '#53E2FF',
        unitFontSize: 12,
        unitFamily: 'sans-serif,Microsoft YaHei',
        unitFontWeight: 'bold',
        data: {}
      })
    }
  },
  data() {
    return {
      scale: 1,
      value: 23456,
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
                  this.value = res.data.data.map((_) => _[key])[0];
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
      const scale = width / 160;
      this.scale = scale;
      this.$emit('resize', {
        contentRect,
        i: this.i,
        initialW: 160,
        initialH: 40,
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
  width: 160px;
  height: 40px;
  position: relative;
}

.label-value--wrapper {
  min-width: 160px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  white-space: nowrap;
  padding-left: 12px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(83, 226, 255, 0.1) 1%, rgba(83, 226, 255, 0.01) 100%);

  &:before {
    content: ' ';
    position: absolute;
    width: 2px;
    background-color: #53E2FF;
    top: 0;
    left: 0;
    bottom: 0;
  }

  > span {
    display: block;
    line-height: 1;
  }

  .label {
    font-size: 12px;
    font-weight: normal;
    color: #FFFFFF;
    margin-right: 5px;
  }

  .value {
    font-size: 20px;
    font-weight: bold;
    color: #53E2FF;
  }

  .unit {
    color: #53E2FF;
    font-size: 12px;
    margin-left: 2px;
  }
}
</style>
