<template>
  <div class="pie3__wrapper" ref="Pie3WrapperRef">
    <div
      class="component__container pie3__container"
      :style="{ transform: 'scale(' + scale + ')' }"
    >
      <div
        class="header"
        v-if="componentConfig.titleShowStatus"
        :style="{
          color: componentConfig.titleColor,
          fontSize: componentConfig.titleFontSize + 'px',
          fontFamily: componentConfig.titleFamily,
          textAlign: componentConfig.titleTextAlign,
          fontWeight: componentConfig.titleFontWeight,
        }"
      >
        <svg
          version="1.1"
          viewBox="0 0 1024 1024"
          class="iconStyle"
          style="opacity: 0.3"
        >
          <path
            d="M475.428571 0H182.857143l365.714286 512-365.714286 512h292.571428l365.714286-502.857143z"
            stroke="transparent"
          ></path>
        </svg>
        <svg
          version="1.1"
          viewBox="0 0 1024 1024"
          class="iconStyle"
          style="opacity: 0.7"
        >
          <path
            d="M475.428571 0H182.857143l365.714286 512-365.714286 512h292.571428l365.714286-502.857143z"
            stroke="transparent"
          ></path>
        </svg>
        <svg version="1.1" viewBox="0 0 1024 1024" class="iconStyle">
          <path
            d="M475.428571 0H182.857143l365.714286 512-365.714286 512h292.571428l365.714286-502.857143z"
            stroke="transparent"
          ></path>
        </svg>
        <span class="title">{{ componentConfig.titleLabel }}</span>
      </div>
      <el-row class="main" type="flex" align="middle" justify="center">
        <div class="content">
          <div class="circle">
            <div class="circle-title">{{ circleTitle }}</div>
            <div>
              <b class="circle-number">{{ circleNumber }}</b>
              <b class="circle-unit">{{ circleUnit }}</b>
            </div>
          </div>
        </div>
      </el-row>
      <el-row class="footer" type="flex" justify="center" align="middle">
        <div class="footer-title">{{ footerTitle }}</div>
        <div class="footer-number">{{ footerNumber }}</div>
        <div class="footer-unit">{{ footerUnit }}</div>
      </el-row>
    </div>
  </div>
</template>
<script>
import _throttle from 'lodash/throttle';
import _attempt from 'lodash/attempt';
import _isError from 'lodash/isError';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _map from 'lodash/map';
import { getKpiData } from '../../api';
import { sourceTypeOptions } from '../../constant';
export default {
  name: 'Pie3',
  props: {
    moduleId: {
      type: String,
      required: true,
    },
    i: {
      type: String | Number,
      required: true,
    },
    componentConfig: {
      type: Object,
      default: () => ({
        titleShowStatus: true,
        titleLabel: '执业药师评价情况',
      }),
    },
  },
  data() {
    return {
      scale: 1,
      chartIns: null,
      chartContainerDOM: null,
      componentData: [{}, {}],
    };
  },
  watch: {
    // 监听数据是否变化
    'componentConfig.data': {
      immediate: true,
      handler: function (val, oldVal) {
        const type = _get(val, 'businessType');
        if (type === sourceTypeOptions[0].value) {
          // 指标库导入
          if (_get(val, 'businessIndexSet')) {
            this.fetchKpiData();
          }
        } else if (type === sourceTypeOptions[2].value) {
          // 自定义 API
        } else {
          // 静态数据
          const staticData = _get(val, 'staticData', '');
          const data = _attempt(() => {
            return JSON.parse(staticData);
          });
          if (_isError(data)) {
            this.componentData = [];
          } else {
            this.componentData = data;
          }
        }
      },
    },
  },
  computed: {
    circleTitle: function () {
      return _get(this.componentData, '0.title', '--');
    },
    circleNumber: function () {
      return _get(this.componentData, '0.number', '--');
    },
    circleUnit: function () {
      return _get(this.componentData, '0.unit', '');
    },
    footerTitle: function () {
      return _get(this.componentData, '1.title', '--');
    },
    footerNumber: function () {
      return _get(this.componentData, '1.number', '--');
    },
    footerUnit: function () {
      return _get(this.componentData, '1.unit', '');
    },
  },
  created() {
    this._resizehandlerThrottle = _throttle(this.resizehandler, 100);
  },
  mounted() {
    this._resizeObserver = new ResizeObserver(this._resizehandlerThrottle);
    this._resizeObserver.observe(this.$refs['Pie3WrapperRef']);
  },
  beforeDestroy() {},
  methods: {
    fetchKpiData() {
      // 获取指标字段
      getKpiData({
        moduId: this.moduleId,
        kpiId: this.componentConfig.data.businessIndexSet,
      }).then(({ data }) => {
        const fieldList = _get(this.componentConfig.data, 'fieldList');
        const arr = [];
        fieldList.forEach((field, index) => {
          arr.push({
            title: _get(data, ['propNames', field]),
            number: _get(data, ['data', '0', field]),
            unit:  _get(data, ['propUnits', field])
          });
        });
        this.componentData = arr;
      });
    },
    resizehandler(entries) {
      const dOMRectReadOnly = entries[0];
      const contentRect = dOMRectReadOnly.contentRect;
      const width = contentRect.width;
      const scale = width / 300;
      this.scale = scale;
      this.$emit('resize', {
        contentRect,
        i: this.i,
        scaleNew: scale,
        initialW: 302,
        initialH: 302,
        componentName: 'Pie3',
      });
    },
  },
};
</script>
<style scoped lang="stylus">
.pie3__container {
  width: 302px;
  height: 302px;

  .main {
    margin-top: 60px;
  }

  .content {
    width: 161px;
    height: 161px;
    background-image: url('./imgs/circle@2x.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    position: relative;

    .circle {
      position: absolute;
      width: 118px;
      height: 118px;
      top: 24px;
      left: 24px;
      border: 20px solid #F4B869;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .circle-title {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 14px;
        margin-bottom: 15px;
      }

      .circle-number {
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #F4B869;
        line-height: 18px;
        margin-right: 2px;
      }

      .circle-unit {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #F4B869;
        line-height: 12px;
      }
    }
  }

  .footer {
    margin-top: 21px;

    .footer-title {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 14px;
      margin-right: 11px;
    }

    .footer-number {
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #F4B869;
      line-height: 18px;
      margin-right: 2px;
    }

    .footer-unit {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #F4B869;
    }
  }
}
</style>
