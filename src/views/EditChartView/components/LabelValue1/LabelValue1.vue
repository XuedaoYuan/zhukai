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
    </div>
  </div>

</template>

<script>
import throttle from 'lodash/throttle';
import { getKpiData } from '../../api';
export default {
  name: 'LabelValue1',
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
  filters: {
    
  },
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
      const scale = width / 150;
      this.scale = scale;
      this.$emit('resize', {
        contentRect,
        i: this.i,
        initialW: 150,
        initialH: 32,
        scaleNew: scale,
        componentName: 'LabelValue1'
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
  width: 150px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  white-space: nowrap;

  > span {
    display: block;
    line-height: 1;
  }

  .label {
    font-size: 14px;
    font-weight: normal;
    color: #FFFFFF;
    margin-right: 20px;
  }

  .value {
    font-size: 20px;
    font-weight: bold;
    color: #87E7FF;
  }
}
</style>
